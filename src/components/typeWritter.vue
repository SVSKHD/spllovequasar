<template>
    <div class="tw-container">
        <div class="tw-wrap">
            <!-- 1) Type this first -->
            <div class="tw-line" :style="{ color: messageColor }">
                {{ visible }}
            </div>

            <!-- 2) Title wrapper holds canvas + halo -->
            <div class="tw-title-slot">
                <!-- Always-present hidden sizer: reserves exact space so layout doesn't shift -->
                <div class="tw-title-wrap" aria-hidden="true">
                    <div class="tw-title tw-title-sizer">{{ title }}</div>
                </div>

                <!-- Actual animated title (toggles in/out) -->
                <transition name="fade">
                    <div v-if="showTitle" ref="titleWrapRef" class="tw-title-wrap">
                        <div ref="titleRef" class="tw-title">{{ title }}</div>

                        <!-- Confetti canvas, sized to title -->
                        <canvas ref="confettiRef" class="tw-confetti"></canvas>

                        <!-- Settled hearts halo -->
                        <div v-if="showHalo" class="tw-halo" aria-hidden="true">
                            <span v-for="n in 10" :key="n">❤</span>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import type { Options, CreateTypes } from 'canvas-confetti'

type Props = {
    title?: string
    message?: string
    speed?: number
    startDelay?: number
    gap?: number
    messageColor?: string
    confettiDurationMs?: number
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Hithesh 💖 Spoorthy',
    message: 'Hello There',
    speed: 60,
    startDelay: 400,
    gap: 500,
    messageColor: '#e91e63',
    confettiDurationMs: 900
})

const visible = ref('')
const showTitle = ref(false)
const showHalo = ref(false)
let timer: number | null = null

/* Title + canvas refs */
const titleWrapRef = ref<HTMLDivElement | null>(null)
const titleRef = ref<HTMLDivElement | null>(null)
const confettiRef = ref<HTMLCanvasElement | null>(null)

/* Confetti instance typed (no any) */
let confettiApi: CreateTypes | null = null

function clearTimer(): void {
    if (timer !== null) {
        window.clearTimeout(timer)
        timer = null
    }
}

/* Size the canvas to the title wrapper (so origin (0.5,1) = bottom-center of title) */
function sizeConfettiToTitle(): void {
    const wrap = titleWrapRef.value
    const canvas = confettiRef.value
    if (!wrap || !canvas) return
    const rect = wrap.getBoundingClientRect()
    canvas.width = Math.max(1, Math.floor(rect.width))
    canvas.height = Math.max(1, Math.floor(rect.height))
}

/* Create or reuse confetti instance bound to title's canvas */
function ensureConfetti(): void {
    const canvas = confettiRef.value
    if (!canvas) return
    if (confettiApi) return
    // lazy-load; explicit void to silence no-floating-promises
    void import('canvas-confetti').then(({ default: confetti }) => {
        confettiApi = confetti.create(canvas, { resize: false, useWorker: true })
    }).catch(() => { /* ignore */ })
}

/* Fire a gentle burst from bottom-center of the title area, upward */
function fireConfettiAtTitle(): void {
    if (!confettiApi) return
    // origin is relative to *this canvas* because we used confetti.create(canvas,...)
    // bottom-center of title canvas -> x:0.5, y:1
    const opts: Options = {
        particleCount: 60,
        spread: 70,
        startVelocity: 35,
        ticks: 160,
        scalar: 0.9,
        origin: { x: 0.5, y: 1 },
        angle: 90 // shoot upward
    }
    void confettiApi(opts)
}

/* Show halo of tiny hearts along top edge of title */
function showSettledHalo(): void {
    showHalo.value = true
}

async function afterTitleVisible(): Promise<void> {
    await nextTick()
    sizeConfettiToTitle()
    ensureConfetti()

    // give the fade-in a moment, then fire burst
    window.setTimeout(() => {
        fireConfettiAtTitle()
        // after duration, reveal the halo (the “aligned on top” effect)
        window.setTimeout(showSettledHalo, props.confettiDurationMs)
    }, 250)
}

function runTypewriter(): void {
    clearTimer()
    showTitle.value = false
    showHalo.value = false
    visible.value = ''

    let charIdx = 0
    const step = () => {
        if (charIdx <= props.message.length) {
            visible.value = props.message.slice(0, charIdx)
            charIdx++
            timer = window.setTimeout(step, props.speed)
        } else {
            timer = window.setTimeout(() => {
                showTitle.value = true
                void afterTitleVisible()
            }, props.gap)
        }
    }

    timer = window.setTimeout(step, props.startDelay)
}

/* Keep canvas in sync if viewport resizes */
function onResize(): void {
    if (!showTitle.value) return
    sizeConfettiToTitle()
}

onMounted(() => {
    runTypewriter()
    window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
    clearTimer()
    window.removeEventListener('resize', onResize)
})
watch(() => props.message, runTypewriter)
</script>

<style scoped>
/* Center the whole greeting card */
.tw-container {
    display: flex;
    justify-content: center;
    /* center horizontally */
    padding-top: 40px;
    /* distance from top of page */
    width: 100%;
    text-align: center;
}


.tw-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Typed line */
.tw-line {
    font-family: var(--font-playwrite, 'Playwrite HU', sans-serif);
    font-size: clamp(18px, 3.5vw, 26px);
    font-weight: 500;
    min-height: 1.5em;
}

/* Title (Pacifico) */
.tw-title-wrap {
    position: relative;


    /* anchor canvas + halo */
    display: inline-block;
    margin-top: 12px;
}

/* Slot that holds either the sizer or the animated title */
.tw-title-slot {
    display: block;
    width: 100%;
}

/* Hidden sizer uses the exact same typography/padding as .tw-title to reserve space */
.tw-title-sizer {
    visibility: hidden;
    /* keep space without showing text */
}

.tw-title {
    /* padding: 8px !important; */
    font-family: var(--font-pacifico, 'Pacifico', cursive);
    font-size: clamp(32px, 6vw, 56px);
    font-weight: 400;
    background: linear-gradient(90deg, #ff4081, #ff6d00);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    padding: 0 6px;
    /* small breathing space for halo edges */
}

/* Confetti canvas sits over the title bounds */
.tw-confetti {
    position: absolute;
    inset: 0;
    /* exactly overlay the title wrapper */
    pointer-events: none;
}

/* Halo: tiny hearts aligned along the top of the title */
.tw-halo {
    /* position: absolute; */

    left: 0;
    right: 0;
    top: -0.6em;
    /* sit just above the title */
    display: flex;
    justify-content: space-evenly;
    font-size: 14px;
    opacity: 0.9;
    pointer-events: none;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.tw-halo span {
    color: #ff4d8d;
}

/* Fade animation for title */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
