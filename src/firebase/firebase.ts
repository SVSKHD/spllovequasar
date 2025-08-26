// src/firebase/firebase.ts
// Firebase v9+ modular SDK — TypeScript edition (strict & ESLint-friendly)

import type { FirebaseApp } from 'firebase/app';
import { initializeApp, getApps, getApp } from 'firebase/app';
import type { Analytics } from 'firebase/analytics';
import { getAnalytics, isSupported as analyticsSupported } from 'firebase/analytics';
import type { User, Auth } from 'firebase/auth';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type {
  Firestore,
  DocumentData,
  QueryConstraint,
  DocumentReference,
  Query,
  Timestamp,
  WhereFilterOp,
} from 'firebase/firestore';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where as _where,
  orderBy as _orderBy,
  limit as _limit,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';

// ---- Your Firebase config ----
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// ---- Initialize (idempotent + SSR-safe) ----
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  void analyticsSupported()
    .then((ok) => {
      if (ok) analytics = getAnalytics(app);
    })
    .catch(() => {});
}

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

// ---------- Types ----------
export type DocWithId<T> = T & { id: string };

// Use Firestore's WhereFilterOp instead of a manual string union
export type WhereTuple = [field: string, op: WhereFilterOp, value: unknown];
export type OrderByTuple = [field: string, direction?: 'asc' | 'desc'];

export interface QueryOptions {
  where?: WhereTuple[];
  orderBy?: OrderByTuple[];
  limit?: number;
}

// Optional timestamp enrichment helper
export type WithTimestamps<T> = T & {
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

// ---------- Auth (Google) ----------
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export async function loginWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export function onUserChanged(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}

// ---------- Query builder ----------
export function buildQuery(
  collectionName: string,
  { where = [], orderBy = [], limit }: QueryOptions = {},
): Query<DocumentData> {
  const colRef = collection(db, collectionName);
  const constraints: QueryConstraint[] = [];

  where.forEach(([field, opStr, value]) => constraints.push(_where(field, opStr, value)));
  orderBy.forEach(([field, direction]) => constraints.push(_orderBy(field, direction)));
  if (typeof limit === 'number') constraints.push(_limit(limit));

  return constraints.length ? query(colRef, ...constraints) : colRef;
}

// ---------- Firestore CRUD (generic) ----------

/**
 * Create a new document with auto ID.
 * Adds `createdAt`/`updatedAt` server timestamps.
 */
export async function createDoc<T extends object>(
  collectionName: string,
  data: T,
): Promise<DocumentReference<DocumentData>> {
  const colRef = collection(db, collectionName);
  const payload: WithTimestamps<T> = {
    ...data,
    createdAt: serverTimestamp() as unknown as Timestamp,
    updatedAt: serverTimestamp() as unknown as Timestamp,
  };
  const ref = await addDoc(colRef, payload);
  return ref;
}

/**
 * Upsert (set with merge option). Useful for deterministic IDs (e.g., user.uid).
 * NOTE: with exactOptionalPropertyTypes, do NOT pass `{ merge: undefined }`.
 */
export async function upsertDoc<T extends object>(
  collectionName: string,
  id: string,
  data: T,
  opts: { merge?: boolean } = { merge: true },
): Promise<DocumentReference<DocumentData>> {
  const docRef = doc(db, collectionName, id);

  const inputWithTs = data as WithTimestamps<T>;
  const payload: WithTimestamps<T> = {
    ...data,
    createdAt:
      typeof inputWithTs.createdAt !== 'undefined'
        ? inputWithTs.createdAt
        : (serverTimestamp() as unknown as Timestamp),
    updatedAt: serverTimestamp() as unknown as Timestamp,
  };

  if (opts.merge) {
    await setDoc(docRef, payload, { merge: true });
  } else {
    // overwrite behavior when merge is falsy or explicitly false
    await setDoc(docRef, payload);
  }
  return docRef;
}

/**
 * Update specific fields (document must already exist).
 */
export async function updateDocById<T extends object>(
  collectionName: string,
  id: string,
  data: Partial<T>,
): Promise<DocumentReference<DocumentData>> {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
  return docRef;
}

/**
 * Delete a document by ID.
 */
export async function deleteDocById(collectionName: string, id: string): Promise<boolean> {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
  return true;
}

/**
 * Get a document by ID. Returns `{ id, ...data }` or `null`.
 */
export async function getDocById<T = DocumentData>(
  collectionName: string,
  id: string,
): Promise<DocWithId<T> | null> {
  const docRef = doc(db, collectionName, id);
  const snap = await getDoc(docRef);
  return snap.exists() ? { id: snap.id, ...(snap.data() as T) } : null;
}

/**
 * Get many docs using `buildQuery` options.
 */
export async function getMany<T = DocumentData>(
  collectionName: string,
  opts: QueryOptions = {},
): Promise<Array<DocWithId<T>>> {
  const q = buildQuery(collectionName, opts);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}

// ---------- Real-time listeners ----------

/**
 * Subscribe to a collection (optionally with query options).
 * Callback receives an array of `{ id, ...data }`.
 * Returns unsubscribe function.
 */
export function subscribeCollection<T = DocumentData>(
  collectionName: string,
  opts: QueryOptions,
  callback: (rows: Array<DocWithId<T>>) => void,
): () => void {
  const q = buildQuery(collectionName, opts);
  return onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
    callback(items);
  });
}

/**
 * Subscribe to a single document by ID.
 * Callback receives `{ id, ...data }` or `null` if missing.
 * Returns unsubscribe function.
 */
export function subscribeDoc<T = DocumentData>(
  collectionName: string,
  id: string,
  callback: (doc: DocWithId<T> | null) => void,
): () => void {
  const ref = doc(db, collectionName, id);
  return onSnapshot(ref, (snap) => {
    callback(snap.exists() ? { id: snap.id, ...(snap.data() as T) } : null);
  });
}

// ---------- Exports ----------
export { app, analytics, auth, db, serverTimestamp };
