<template>
  <q-splitter v-model="split" unit="%" :style="{ height }">
    <!-- Left: vertical tabs -->
    <template #before>
      <q-tabs v-model="current" vertical class="text-teal" switch-indicator>
        <q-tab
          v-for="it in items"
          :key="it.name"
          :name="it.name"
          :label="it.label ?? it.name"
          class="vertile-tab-title"
        />
      </q-tabs>
    </template>

    <!-- Right: panels -->
    <template #after>
      <q-tab-panels
        v-model="current"
        animated
        :swipeable="swipeable"
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
        class="q-pa-md"
      >
        <q-tab-panel v-for="(it, idx) in items" :key="it.name" :name="it.name" class="q-pr-sm">
          <!-- Optional consumer override -->
          <slot name="panel" :item="it" :index="idx">
            <div v-if="it.title" class="text-h3 verticle-tab-inner-title q-mb-sm">
              {{ it.title }}
            </div>
            <q-separator class="q-mb-md" />
            <!-- HTML takes precedence -->
            <!-- HTML takes precedence -->
            <!-- If html is a string, split into <p> by full stops -->
            <div v-if="isString(it.html)" class="verticle-description">
              <p v-for="(para, i) in splitSentences(it.html as string)" :key="i">
                {{ para }}
              </p>
            </div>

            <!-- If html is already an array (you may provide string[] in the future), render each as <p> -->
            <div v-else-if="Array.isArray(it.html)" class="verticle-description">
              <p v-for="(para, i) in it.html as string[]" :key="i">
                {{ (para || '').trim() }}
              </p>
            </div>

            <div v-else class="text-grey-7">No content.</div>

            <!-- Reply button -->
            <div v-if="it.reply" class="q-mt-md">
              <q-btn
                class="glass-btn q-pa-md"
                :label="it.replyLabel ?? 'Reply'"
                @click="onReplyClick(it, idx)"
                dense
                unelevated
              />
            </div>

            <!-- Reply JSON (pretty) -->
            <q-slide-transition>
              <div v-show="replyOpen[it.name]" class="q-mt-sm">
                <div class="reply-text">
                  {{ isString(it.replyData) ? it.replyData : pretty(it.replyData) }}
                </div>
              </div>
            </q-slide-transition>
          </slot>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';

type TabItem = {
  /** unique key for the tab/panel */
  name: string;
  /** tab label (defaults to name) */
  label?: string;
  /** optional icon for the tab (Quasar/QIcon name) */
  icon?: string;
  /** panel title */
  title?: string;
  /** panel body: string or bullet points */
  description?: string | string[];
  /** OR raw HTML (renders if provided) */
  html?: string;
  /** show the Reply button */
  reply?: boolean;
  /** optional custom label for the button */
  replyLabel?: string;
  /** JSON you want to show when Reply is clicked */
  replyData?: unknown;
};

const props = withDefaults(
  defineProps<{
    items: TabItem[];
    /** v-model selected tab (defaults to first item's name) */
    modelValue?: string;
    /** initial splitter percent for left side */
    splitPercent?: number;
    /** component height (CSS size) */
    height?: string;
    /** enable swipe on panels */
    swipeable?: boolean;
  }>(),
  {
    items: () => [],
    modelValue: '',
    splitPercent: 22,
    height: '360px',
    swipeable: true,
  },
);

const splitSentences = (text: string) => {
  if (!text) return [];
  // Grab sentences and keep end punctuation (.?! …)
  const parts = text.match(/[^.?!…]+[.?!…]+|[^.?!…]+$/g) || [];
  return parts.map((s) => s.trim());
};

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void;
  (e: 'update:splitPercent', v: number): void;
  (e: 'reply-click', payload: { item: TabItem; index: number }): void;
}>();

/** current tab (v-model) */
const current = computed({
  get: () => props.modelValue || props.items?.[0]?.name || '',
  set: (v) => emit('update:modelValue', v),
});

/** splitter percent — make it draggable & sync to parent */
const split = computed({
  get: () => props.splitPercent,
  set: (v: number) => emit('update:splitPercent', v),
});

/** reply visibility toggles by item name */
const replyOpen = reactive<Record<string, boolean>>({});

watch(
  () => props.items,
  (items) => {
    for (const it of items) {
      if (!(it.name in replyOpen)) replyOpen[it.name] = false;
    }
  },
  { immediate: true },
);

const isString = (v: unknown): v is string => typeof v === 'string';
const pretty = (v: unknown) => {
  try {
    return JSON.stringify(v ?? {}, null, 2);
  } catch {
    return String(v);
  }
};

function onReplyClick(item: TabItem, index: number) {
  replyOpen[item.name] = !replyOpen[item.name];
  emit('reply-click', { item, index });
}
</script>

<style scoped>
.reply-json {
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  padding: 12px;
  max-height: 40vh;
  overflow: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
  font-size: 12.5px;
  line-height: 1.4;
  white-space: pre-wrap;
}

/* dark mode */
:global(.body--dark) .reply-json {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
}
.glass-btn {
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  font-weight: bold;
  font-size: 1rem;
  font-family: var(--font-playwrite);
  color: #3a0ca3;
  transition:
    background 0.2s,
    box-shadow 0.2s;
}
.glass-btn:hover {
  background: rgba(255, 255, 255, 0.25) !important;
  box-shadow: 0 6px 32px 0 rgba(0, 0, 0, 0.15);
  color: #b5179e;
}

.reply-text {
  font-family: var(--font-playwrite);
  font-size: 1.5rem;
  font-weight: bold;
  color: #b5179e;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  padding: 12px;
  max-height: 40vh;
  overflow: auto;

  line-height: 1.6;
  white-space: pre-wrap;
} /* dark mode */
:global(.body--dark) .reply-text {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
}
</style>
