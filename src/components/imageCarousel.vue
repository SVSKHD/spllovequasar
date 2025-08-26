<!-- src/components/ImageCarousel.vue -->
<template>
  <div class="text-center" v-if="showSlide">
    <h1 class="text-title">Hey, do you want to see what I’ve been hiding from you</h1>
    <q-btn
      class="glass-btn love-btn text-center"
      @click="showSlide = false"
      unelevated
      color="white"
      text-color="red-900"
      icon="eva-heart"
    />
  </div>
  <div v-else class="q-pa-md">
    <q-carousel
      v-model="active"
      v-model:fullscreen="fullscreen"
      animated
      infinite
      :height="height"
      class="nc-carousel"
      @dblclick="fullscreen = !fullscreen"
    >
      <q-carousel-slide
        v-for="(s, i) in normalizedSlides"
        :key="s.name"
        :name="s.name"
        class="nc-slide"
      >
        <!-- Image stage (centered; no crop) -->
        <div
          class="nc-stage"
          tabindex="0"
          aria-label="Image slide"
          @mouseenter="pauseTimer"
          @mouseleave="resumeTimer"
        >
          <img
            class="nc-media"
            :class="fit"
            :src="s.image"
            :alt="s.name || `slide-${i + 1}`"
            loading="lazy"
          />
        </div>

        <!-- Edge vignette -->
        <div v-if="showVignette" class="nc-vignette"></div>

        <!-- Countdown badge -->
        <div class="nc-countdown" aria-live="polite">{{ countdownDisplay }}</div>

        <!-- Left | center | right grid; text lives only in side columns -->
        <div class="nc-hero" :style="{ '--side': sideWidth }">
          <div class="nc-left">
            <h2 class="nc-title">{{ s.name }}</h2>
          </div>
          <div class="nc-right" v-if="s.caption">
            <p class="nc-desc">{{ s.caption }}</p>
          </div>
        </div>
      </q-carousel-slide>

      <!-- Custom corner arrows + fullscreen -->
      <template #control>
        <div class="nav-corners">
          <button class="nav-btn nav-left" aria-label="Previous" @click.stop="go(-1)">
            <q-icon name="chevron_left" size="22px" />
          </button>

          <!-- Center button between arrows -->
          <button
            class="nav-btn nav-center"
            aria-label="Center Action"
            @click.stop="showSlide = !showSlide"
          >
            <q-icon name="star" size="22px" />
          </button>

          <button class="nav-btn nav-right" aria-label="Next" @click.stop="go(1)">
            <q-icon name="chevron_right" size="22px" />
          </button>
        </div>
      </template>
    </q-carousel>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue';

export type CarouselSlide = { name?: string; image: string; caption?: string };

// props (same as before)
const {
  slides = [] as CarouselSlide[],
  fit = 'contain' as 'contain' | 'cover',
  height = 'min(60vh, 90vw)',
  sideWidth = 'clamp(140px, 22vw, 320px)',
  showVignette = true,
  keyboard = true,
} = defineProps<{
  slides?: CarouselSlide[];
  fit?: 'contain' | 'cover';
  height?: string;
  sideWidth?: string;
  showVignette?: boolean;
  keyboard?: boolean;
}>();

const showSlide = ref(true);

// ✅ normalize to a type with a guaranteed name
type NormalizedSlide = { name: string; image: string; caption?: string };

const normalizedSlides = computed<NormalizedSlide[]>(() =>
  slides.map((s, i) => {
    const base = { name: s.name ?? `slide-${i + 1}`, image: s.image };
    return s.caption !== undefined ? { ...base, caption: s.caption } : base;
  }),
);

const fullscreen = ref(false);

// keep active as a string
const active = ref<string>(normalizedSlides.value[0]?.name ?? 'slide-1');

/* slide navigation (no TS errors now) */
function go(delta: number) {
  const list = normalizedSlides.value;
  const len = list.length;
  if (len === 0) return;

  if (len === 1) {
    if (list[0]) {
      active.value = list[0].name;
    }
    return;
  }

  const mod = (n: number, m: number) => ((n % m) + m) % m;

  const idx = list.findIndex((s) => s.name === active.value);
  const start = idx === -1 ? 0 : idx;
  const nextIndex = mod(start + delta, len);

  if (list[nextIndex]) {
    active.value = list[nextIndex].name;
  }
}

/* keyboard navigation (global) */
function onKeydown(e: KeyboardEvent) {
  if (!keyboard) return;
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    go(+1);
    resetCountdown();
  }
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    go(-1);
    resetCountdown();
  }
}
onMounted(() => window.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown));

/* --- NEW: 60s countdown + auto-advance, pause on hover --- */
const COUNTDOWN_SECS = 60;
const countdown = ref<number>(COUNTDOWN_SECS);
const isPaused = ref<boolean>(false);
let intervalId: number | undefined;

const countdownDisplay = computed(() => {
  const mm = Math.floor(countdown.value / 60);
  const ss = countdown.value % 60;
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  return `${mm}:${pad(ss)}`;
});

function tick() {
  if (isPaused.value) return;
  if (countdown.value > 0) {
    countdown.value -= 1;
  } else {
    go(+1);
    resetCountdown();
  }
}

function startTimer() {
  stopTimer();
  intervalId = window.setInterval(tick, 1000);
}

function stopTimer() {
  if (intervalId !== undefined) {
    clearInterval(intervalId);
    intervalId = undefined;
  }
}

function resetCountdown() {
  countdown.value = COUNTDOWN_SECS;
}

function pauseTimer() {
  isPaused.value = true;
}

function resumeTimer() {
  isPaused.value = false;
}

onMounted(() => {
  if (!showSlide.value) startTimer();
});

onBeforeUnmount(() => {
  stopTimer();
});

// Start/stop the timer when the intro screen is shown/hidden
watch(showSlide, (v) => {
  if (v) {
    stopTimer();
  } else {
    resetCountdown();
    startTimer();
  }
});

// Also reset countdown whenever the active slide changes (e.g., via arrows)
watch(active, () => {
  resetCountdown();
});
</script>

<style scoped>
/* container */
.nc-carousel {
  border-radius: 20px;
  overflow: hidden;
}
.nc-carousel :deep(.q-carousel__slides-container) {
  position: relative;
}

/* slide */
.nc-slide {
  position: relative;
  height: 100%;
  overflow: hidden;
}

/* stage (image area) */
.nc-stage {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000; /* letterbox bars */
  outline: none;
}
.nc-media {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
}
.nc-media.cover {
  object-fit: cover;
}

/* vignette */
.nc-vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(
      to right,
      rgba(0, 0, 0, 0.55) 0%,
      rgba(0, 0, 0, 0.28) 22%,
      rgba(0, 0, 0, 0) 48%,
      rgba(0, 0, 0, 0.28) 78%,
      rgba(0, 0, 0, 0.55) 100%
    ),
    linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 40%);
  opacity: 0.92;
  transition: opacity 0.25s ease;
}

/* countdown badge */
.nc-countdown {
  position: absolute;
  top: 10px;
  right: 12px;
  padding: 6px 10px;
  border-radius: 9999px;
  font-size: 12px;
  line-height: 1;
  color: #fff;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(4px);
  pointer-events: none; /* avoid stealing hover */
}

/* hero overlay grid: left | center | right (text only in sides) */
.nc-hero {
  --side: clamp(140px, 22vw, 320px); /* fallback */
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: var(--side) 1fr var(--side);
  align-items: center;
  color: #fff;
  pointer-events: none; /* keep hover on image */
}

/* side columns */
.nc-left {
  grid-column: 1;
  justify-self: start;
  padding-inline: clamp(8px, 1.6vw, 16px);
  max-width: 100%;
}
.nc-right {
  grid-column: 3;
  justify-self: end;
  padding-inline: clamp(8px, 1.6vw, 16px);
  max-width: 100%;
  text-align: right;
}

/* text */
.nc-title,
.nc-desc {
  margin: 0;
  white-space: normal;
  word-break: break-word;
  text-wrap: pretty;
}
.nc-title {
  font-weight: 800;
  line-height: 1.3 !important;
  word-spacing: 0.6em;
  font-size: clamp(22px, 5vw, 48px);
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.55);
  font-family: var(--font-pacifico, sans-serif);
}
.nc-desc {
  font-size: clamp(14px, 2vw, 18px);
  line-height: 1.3;
  text-align: left;
  color: rgba(255, 255, 255, 0.96);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.55);
  font-family: var(--font-Inconsolata, sans-serif);
  display: block;
  padding-left: 1.2em;
  overflow-y: auto;
}
.nc-desc br + br {
  display: none;
}
.nc-desc br + span::before {
  content: '\2022  ';
  position: absolute;
  left: 0;
  color: #fff;
}

/* hover-to-reveal left/right text */
.nc-left,
.nc-right {
  opacity: 0;
  transform: translateY(12px);
  filter: blur(3px);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease,
    filter 0.35s ease;
}
.nc-stage:hover ~ .nc-hero .nc-left,
.nc-stage:hover ~ .nc-hero .nc-right,
.nc-stage:focus-within ~ .nc-hero .nc-left,
.nc-stage:focus-within ~ .nc-hero .nc-right {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}
.nc-stage:hover ~ .nc-vignette {
  opacity: 1;
}

/* --- Custom corner arrows --- */
.nav-corners {
  position: absolute;
  inset: 0;
  pointer-events: none; /* only buttons receive events */
}
.nav-btn {
  position: absolute;
  bottom: 12px;
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(0, 0, 0, 0); /* transparent by default */
  backdrop-filter: blur(2px);
  opacity: 0; /* hidden until hover */
  transform: translateY(6px); /* subtle lift-in */
  transition:
    opacity 0.2s ease,
    background 0.2s ease,
    transform 0.15s ease;
  pointer-events: auto; /* accept clicks */
}
.nav-left {
  left: 12px;
}
.nav-right {
  right: 12px;
}
.nav-center {
  left: 50%;
  transform: translateX(-50%);
}

.nc-carousel:hover .nav-btn,
.nc-carousel:focus-within .nav-btn {
  opacity: 1;
  transform: translateY(0);
}
.nav-btn:hover {
  background: rgba(128, 128, 128, 0.6); /* grey background on hover */
}

/* Touch: always show buttons */
@media (hover: none) {
  .nav-btn {
    opacity: 1;
    transform: none;
    background: rgba(128, 128, 128, 0.5);
  }
}

/* mobile layout: stack text */
@media (max-width: 900px) {
  .nc-hero {
    grid-template-columns: 1fr;
    justify-items: start;
    gap: 10px;
    padding: 16px;
  }
  .nc-right {
    text-align: left;
  }
}
</style>
