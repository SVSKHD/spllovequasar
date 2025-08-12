<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>Quasar App</q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- Left Drawer -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <!-- Page Container with floating hearts background -->
    <q-page-container>
      <q-page class="love-page">
        <!-- Hearts layer (background) -->
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

        <!-- Centered content card -->
        <div class="center-wrap">
          <q-card class="app-card" flat bordered>
            <q-card-section>
              <div class="text-h5 q-mb-sm auth-card-title">Essential Links</div>
              <div class="text-body2 q-mb-md auth-card-text">Handy places to get started</div>

              <q-list bordered separator class="rounded-borders">
                <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
              </q-list>
            </q-card-section>

            <!-- If you still want to render nested routes inside the card -->
            <q-separator />
            <q-card-section>
              <router-view />
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue'

const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const linksList: EssentialLinkProps[] = [
  { title: 'Docs', caption: 'quasar.dev', icon: 'school', link: 'https://quasar.dev' },
  { title: 'Github', caption: 'github.com/quasarframework', icon: 'code', link: 'https://github.com/quasarframework' },
  { title: 'Discord Chat Channel', caption: 'chat.quasar.dev', icon: 'chat', link: 'https://chat.quasar.dev' },
  { title: 'Forum', caption: 'forum.quasar.dev', icon: 'record_voice_over', link: 'https://forum.quasar.dev' },
  { title: 'Twitter', caption: '@quasarframework', icon: 'rss_feed', link: 'https://twitter.quasar.dev' },
  { title: 'Facebook', caption: '@QuasarFramework', icon: 'public', link: 'https://facebook.quasar.dev' },
  { title: 'Quasar Awesome', caption: 'Community Quasar projects', icon: 'favorite', link: 'https://awesome.quasar.dev' }
]

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

// soft pinks/purples/orange
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
/* Full-page background host */
.love-page {
  position: relative;
  min-height: calc(100vh - var(--q-header-height, 56px));
  /* fill visible area under header */
  overflow: hidden;
  background:
    radial-gradient(1200px 600px at 50% 70%, rgba(255, 0, 102, 0.06), transparent 60%),
    #fff;
}

/* Hearts floating layer */
.hearts-layer {
  position: absolute;
  inset: 0;
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

/* Center the main card */
.center-wrap {
  position: relative;
  display: grid;
  place-items: center;
  padding: 24px;
  min-height: calc(100vh - var(--q-header-height, 56px));
  pointer-events: none;
  /* allow hearts to ignore interactions, card re-enables below */
}

.center-wrap>* {
  pointer-events: auto;
}

.app-card {
  width: min(92vw, 900px);
  border-radius: 20px;
  backdrop-filter: blur(6px);
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 8px 30px rgba(233, 30, 99, 0.15);
}

/* Optional dark mode tweak */
:global(.body--dark) .app-card {
  background: rgba(30, 30, 30, 0.72);
  color: #fff;
  box-shadow: 0 8px 30px rgba(255, 20, 147, 0.2);
}
</style>
