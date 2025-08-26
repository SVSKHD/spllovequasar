import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';

const HOME = '/';
const HITHESH = '/hithesh';
const SPOORTHY = '/spoorthy';

type AuthBlob = { login?: boolean; hithesh?: boolean; spoorthy?: boolean } | null;

function readAuth(): AuthBlob {
  try {
    const raw = localStorage.getItem('login');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function computeTarget(auth: AuthBlob) {
  const isLoggedIn = auth?.login === true;
  const canHithesh = auth?.hithesh === true;
  const canSpoorthy = auth?.spoorthy === true;
  if (!isLoggedIn) return HOME;
  if (canHithesh) return HITHESH;
  if (canSpoorthy) return SPOORTHY;
  return HOME;
}

export default defineRouter(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // --- Normal per-navigation guard ---
  Router.beforeEach((to, _from, next) => {
    const auth = readAuth();
    const target = computeTarget(auth);
    const userObj = JSON.parse(localStorage.getItem('login') || '{}');

    const now = Date.now();
    if (!userObj.time || now - userObj.time > 30 * 60 * 1000) {
      // More than 30 minutes or no time, clear login
      localStorage.removeItem('login');
    }

    // if not logged in, only allow HOME
    if (target === HOME && to.path !== HOME) {
      return next({ path: HOME, replace: true });
    }

    // if logged in but on wrong root path (/ or the other profile), normalize:
    const rootSet = new Set([HOME, HITHESH, SPOORTHY]);
    if (rootSet.has(to.path) && to.path !== target) {
      return next({ path: target, replace: true });
    }

    next();
  });

  // --- Live watch: react to localStorage changes without refresh ---
  if (typeof window !== 'undefined') {
    const applyAuthChange = () => {
      const target = computeTarget(readAuth());
      const current = Router.currentRoute.value.path;
      if (current !== target) {
        Router.replace(target).catch(() => {});
      }
    };

    // 1) Cross-tab updates
    window.addEventListener('storage', (e) => {
      if (e.key === 'login') applyAuthChange();
    });

    // 2) Same-tab changes (including DevTools delete): tiny diff-poll
    let last = localStorage.getItem('login');
    const POLL_MS = 800;
    setInterval(() => {
      const now = localStorage.getItem('login');
      if (now !== last) {
        last = now;
        applyAuthChange();
      }
    }, POLL_MS);
  }

  return Router;
});
