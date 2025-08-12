<template>
    <q-layout>
        <q-page-container>
            <q-page class="love-page">
                <!-- Floating hearts layer -->
                <div class="hearts-layer" aria-hidden="true">
                    <span v-for="b in bubbles" :key="b.id" class="heart" :style="{
                        left: b.left + '%',
                        top: b.top + '%',
                        fontSize: b.size + 'px',
                        animationDuration: b.duration + 's',
                        animationDelay: b.delay + 's',
                        filter: `blur(${b.blur}px)`,
                        opacity: b.opacity,
                        color: b.color
                    }">❤</span>
                </div>
                <q-card>
                    <router-view />
                </q-card>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'



type Bubble = {
    id: number
    left: number
    top: number
    size: number
    duration: number
    delay: number
    blur: number
    opacity: number
    color: string
}

const bubbles = ref<Bubble[]>([])
const palette = ['#e91e63', '#ff1744', '#f50057', '#d500f9', '#ff6d00'] as const
function pick<T>(arr: readonly T[]): T { return arr[Math.floor(Math.random() * arr.length)]! }
function rand(min: number, max: number) { return Math.random() * (max - min) + min }

onMounted(() => {
    const arr: Bubble[] = []
    const count = 28
    for (let i = 0; i < count; i++) {
        arr.push({
            id: i,
            left: rand(0, 100),
            top: rand(0, 100),
            size: rand(12, 32),
            duration: rand(8, 18),
            delay: rand(-10, 6),
            blur: rand(0, 2),
            opacity: rand(0.35, 0.9),
            color: pick(palette)
        })
    }
    bubbles.value = arr
})
</script>

<style scoped>
.love-page {
    position: relative;
    height: 100vh;
    overflow: hidden;
    background:
        radial-gradient(1200px 600px at 50% 70%, rgba(255, 0, 102, 0.06), transparent 60%),
        #fff;
}

/* Hearts background */
.hearts-layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.heart {
    position: absolute;
    user-select: none;
    animation: floaty-love linear infinite;
    animation-timing-function: ease-in-out;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
}

@keyframes floaty-love {
    0% {
        transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
    }

    25% {
        transform: translate3d(8px, -40px, 0) rotate(-8deg) scale(1.08);
    }

    50% {
        transform: translate3d(-6px, -80px, 0) rotate(6deg) scale(0.96);
    }

    75% {
        transform: translate3d(10px, -120px, 0) rotate(-12deg) scale(1.05);
    }

    100% {
        transform: translate3d(-4px, -160px, 0) rotate(0deg) scale(1);
        opacity: 0.2;
    }
}

/* Centered card */
.center-wrap {
    position: relative;
    height: 100%;
    display: grid;
    place-items: center;
    padding: 24px;
}

/* Glass effect container */
.glass-card {
    width: min(92vw, 1000px);
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.28);
    backdrop-filter: blur(12px) saturate(120%);
    -webkit-backdrop-filter: blur(12px) saturate(120%);
    border: 1px solid rgba(255, 255, 255, 0.32);
    box-shadow: 0 12px 36px rgba(233, 30, 99, 0.18);
    overflow: hidden;
}

/* Tabs styling */
.glass-tabs {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.42), rgba(255, 255, 255, 0.18));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.glass-sep {
    opacity: 0.7;
}

/* Panels styling */
.glass-panels {
    padding: 16px 20px 22px;
    background: rgba(255, 255, 255, 0.22);
}

/* Dark mode tweaks */
:global(.body--dark) .glass-card {
    background: rgba(30, 30, 30, 0.34);
    border-color: rgba(255, 255, 255, 0.12);
    box-shadow: 0 12px 36px rgba(255, 20, 147, 0.16);
}

:global(.body--dark) .glass-tabs {
    background: linear-gradient(180deg, rgba(40, 40, 40, 0.6), rgba(30, 30, 30, 0.35));
    border-bottom-color: rgba(255, 255, 255, 0.1);
}

:global(.body--dark) .glass-panels {
    background: rgba(30, 30, 30, 0.28);
}
</style>
