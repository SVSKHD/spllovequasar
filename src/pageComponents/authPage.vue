<template>
    <q-layout>
        <q-page-container>
            <q-page class="q-pa-none love-page">
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

                <!-- Centered card -->
                <div class="center-wrap">
                    <q-card class="q-pa-md love-card" flat bordered>
                        <q-card-section class="text-center">
                            <div class="text-h5 q-mb-xs auth-card-title">{{ title }}</div>
                            <div class="text-body2 q-mb-md auth-card-text">{{ subtitle }}</div>

                            <q-form ref="formRef" @submit.prevent="handleSubmit">
                                <q-input v-model="bDay" :rules="bDayRules" class="q-pa-lg" dense outlined
                                    :label="inputLabel" :hint="buttonLabel" placeholder="dd/mm/yyyy" mask="##/##/####"
                                    fill-mask inputmode="numeric" />

                                <q-btn color="primary" class="q-mt-md auth-btn-text" rounded :label="buttonLabel"
                                    type="submit" unelevated />
                            </q-form>
                        </q-card-section>
                    </q-card>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from "vue-router"

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

const props = defineProps<{
    count?: number
    title?: string
    subtitle?: string
    buttonLabel?: string
    inputLabel?: string
    colors?: string[]
}>()

const router = useRouter()

// Palette (never empty)
const palette = (props.colors?.length
    ? props.colors
    : ['#e91e63', '#ff1744', '#f50057', '#d500f9', '#ff6d00']
) as readonly string[]

// Safe picker
function pick<T>(arr: readonly T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]!
}

const count = props.count ?? 28
const title = props.title ?? 'You + Me'
const subtitle = props.subtitle ?? 'An algorithmically random amount of love.'
const buttonLabel = props.buttonLabel ?? 'Send Love'
const inputLabel = props.inputLabel ?? 'Enter Birthday'

// Hearts
const bubbles = ref<Bubble[]>([])
function rand(min: number, max: number) {
    return Math.random() * (max - min) + min
}

// ---- Birthday input + rules ----
type RuleFn = (val: string | number) => true | string

const bDay = ref<string>('')                // string works best with mask/rules
const formRef = ref<{ validate: () => Promise<boolean> } | null>(null)

const bDayRules = ref<RuleFn[]>([
    (v) => String(v ?? '').trim().length > 0 || 'Date is required',
    (v) => /^\d{8}$/.test(String(v ?? '').replace(/\D/g, '')) || 'Enter 8 digits (ddmmyyyy)',
    (v) => {
        const s = String(v ?? '').replace(/\D/g, '')
        const d = Number(s.slice(0, 2))
        const m = Number(s.slice(2, 4))
        const y = Number(s.slice(4, 8))
        const dt = new Date(y, m - 1, d)
        const valid =
            y > 0 &&
            m >= 1 && m <= 12 &&
            d >= 1 && d <= 31 &&
            dt.getFullYear() === y &&
            dt.getMonth() === m - 1 &&
            dt.getDate() === d
        return valid || 'Invalid date'
    }
])

async function handleSubmit() {
    // validate via q-form first
    const ok = await formRef.value?.validate()
    if (!ok) return

    const digits = String(bDay.value ?? '').replace(/\D/g, '')
    try {
        if (digits === '26071995') {
            await router.push("/hithesh")
        } else {
            await router.push("/spoorthy")
        }
    } catch (e) {
        console.log(e)
    }

}

// Hearts spawn
onMounted(() => {
    const arr: Bubble[] = []
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
            color: pick(palette),
        })
    }
    bubbles.value = arr
})
</script>

<style scoped>
.love-page {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background:
        radial-gradient(1200px 600px at 50% 70%, rgba(255, 0, 102, 0.06), transparent 60%),
        #fff;
}

.center-wrap {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    pointer-events: none;
}

.center-wrap>* {
    pointer-events: auto;
}

.love-card {
    width: min(92vw, 480px);
    backdrop-filter: blur(6px);
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(233, 30, 99, 0.15);
}

/* Hearts layer */
.hearts-layer {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
}

.heart {
    position: absolute;
    user-select: none;
    animation-name: floaty-love;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    will-change: transform, opacity;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
}

/* Float + drift + scale + fade */
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

/* Dark mode polish */
:global(.body--dark) .love-card {
    background: rgba(30, 30, 30, 0.72);
    color: #fff;
    box-shadow: 0 8px 30px rgba(255, 20, 147, 0.2);
}
</style>
