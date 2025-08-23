<template>
  <div class="cu-tea-card" :style="{ '--tea': teaColor, '--line': lineColor }">
    <!-- heading -->
    <div class="cu-header">
      <span class="overline">{{ topText }}</span>
      <span class="title">{{ bigText }}</span>
    </div>

    <!-- little scene -->
    <div class="scene">
      <!-- multiple falling drops (staggered) -->
      <div class="drop" v-for="n in 3" :key="n" :style="{ animationDelay: (n - 1) * 0.8 + 's' }" />

      <!-- cup + handle -->
      <div class="cup">
        <div class="handle"></div>

        <!-- cup face (smiles on hover) -->
        <div class="face">
          <span class="eye left"></span>
          <span class="eye right"></span>
          <span class="mouth"></span>
        </div>

        <!-- tea fill + surface ripple -->
        <div class="tea">
          <span class="surface"></span>
          <span class="ripple"></span>
        </div>
      </div>

      <!-- speech bubble -->
      <div class="bubble">
        <span>{{ bubbleText }}</span>
        <i class="tail"></i>
      </div>
    </div>

    <!-- optional caption -->
    <p v-if="caption" class="caption">{{ caption }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  topText?: string;
  bigText?: string;
  bubbleText?: string;
  caption?: string;
  teaColor?: string;
  lineColor?: string;
}
const props = defineProps<Props>();

// defaults (no withDefaults needed)
const topText = props.topText ?? 'YOU ARE MY';
const bigText = props.bigText ?? 'CU-TEA';
const bubbleText = props.bubbleText ?? 'hi my cu-tea';
const caption = props.caption ?? '';
const teaColor = props.teaColor ?? '#b87333'; // copper tea
const lineColor = props.lineColor ?? '#2c2c2c'; // dark line
</script>

<style scoped>
/* =========================
   CARD LAYOUT
   ========================= */
.cu-tea-card {
  --bg: #ffffff;
  --tea: #b87333; /* overridden by inline style */
  --line: #2c2c2c; /* overridden by inline style */
  background: var(--bg);
  color: var(--line);
  width: 340px;
  border-radius: 16px;
  padding: 18px 18px 14px;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 8px;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    'Helvetica Neue',
    Arial,
    'Noto Sans';
}

.cu-header {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  justify-content: center;
}
.cu-header .overline {
  letter-spacing: 0.24em;
  font-size: 0.7rem;
  text-transform: uppercase;
  opacity: 0.75;
}
.cu-header .title {
  font-weight: 800;
  font-size: 1.65rem;
}

/* =========================
   SCENE
   ========================= */
.scene {
  position: relative;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* =========================
   CUP
   ========================= */
.cup {
  position: relative;
  width: 230px;
  height: 132px;
  border: 6px solid var(--line);
  border-top-width: 6px;
  border-bottom-left-radius: 44px;
  border-bottom-right-radius: 44px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  background: #fff;
  overflow: hidden;
  transform-origin: 50% 100%;
  animation: wobble 2.6s ease-in-out infinite;
}

/* handle (ring) */
.handle {
  position: absolute;
  right: -44px;
  top: 20px;
  width: 86px;
  height: 86px;
  border: 6px solid var(--line);
  border-radius: 50%;
  background: transparent;
}
.handle::after {
  content: '';
  position: absolute;
  inset: 10px;
  border: 6px solid transparent;
  border-radius: 50%;
  background: #fff;
}

/* tea fill */
.tea {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 58%;
  background:
    radial-gradient(120px 30px at 50% 0%, rgba(0, 0, 0, 0.08), transparent 60%),
    linear-gradient(var(--tea), #9f5b22);
}
.surface {
  position: absolute;
  left: 6px;
  right: 6px;
  top: -10px;
  height: 20px;
  background:
    radial-gradient(150px 14px at 50% 6px, rgba(0, 0, 0, 0.18), transparent 55%),
    radial-gradient(150px 14px at 50% 12px, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0) 60%);
  border-radius: 50%;
  opacity: 0.45;
  animation: surfaceWave 2.6s ease-in-out infinite;
}

/* ripple circle on impact */
.ripple {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scale(0.2);
  bottom: calc(58% - 12px);
  width: 160px;
  height: 24px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  opacity: 0;
  animation: ripple 2.6s ease-out infinite;
}

/* =========================
   FACE (eyes + mouth)
   ========================= */
.face {
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 34px;
}
.eye {
  position: absolute;
  top: 4px;
  width: 10px;
  height: 10px;
  background: var(--line);
  border-radius: 50%;
  transition: transform 0.25s ease;
}
.eye.left {
  left: 8px;
}
.eye.right {
  right: 8px;
}

.mouth {
  position: absolute;
  left: 50%;
  bottom: -2px;
  transform: translateX(-50%);
  width: 30px;
  height: 12px;
  border-bottom: 4px solid var(--line);
  border-radius: 0 0 50% 50%;
  transition: all 0.25s ease;
}

/* Hover: bigger smile + twinkle eyes */
.cup:hover .mouth {
  height: 18px;
  border-radius: 0 0 60% 60%;
}
.cup:hover .eye {
  transform: scale(1.2);
}

/* =========================
   DROPS
   ========================= */
.drop {
  --dropW: 18px;
  position: absolute;
  top: -140px;
  left: 50%;
  width: var(--dropW);
  height: var(--dropW);
  transform: translateX(-50%);
  background: var(--tea);
  border-radius: 50% 50% 60% 60%;
  box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.25);
  animation: fall 2.6s cubic-bezier(0.18, 0.74, 0.35, 1) infinite;
}
.drop::after {
  content: '';
  position: absolute;
  inset: 0;
  background: inherit;
  border-radius: 50% 50% 60% 60%;
  transform-origin: 50% 0%;
  animation: stretch 2.6s ease-in-out infinite;
}

/* =========================
   SPEECH BUBBLE
   ========================= */
.bubble {
  position: absolute;
  left: 16px;
  top: 18px;
  padding: 0.42rem 0.62rem;
  background: #fff;
  border: 2px solid var(--line);
  border-radius: 12px;
  font-weight: 700;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
  opacity: 0;
  transform: translateY(-8px);
  animation: talk 2.6s ease-in-out infinite;
}
.bubble .tail {
  position: absolute;
  bottom: -9px;
  left: 18px;
  width: 12px;
  height: 12px;
  background: #fff;
  border-left: 2px solid var(--line);
  border-bottom: 2px solid var(--line);
  transform: rotate(45deg);
}

/* caption */
.caption {
  text-align: center;
  margin-top: 4px;
  opacity: 0.75;
  font-size: 0.9rem;
}

/* =========================
   ANIMATIONS
   ========================= */
@keyframes fall {
  0% {
    transform: translate(-50%, -140px);
    opacity: 1;
  }
  56% {
    transform: translate(-50%, 60px);
  }
  60% {
    transform: translate(-50%, 68px) scale(0.85);
    opacity: 1;
  }
  65% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -140px);
  }
}
@keyframes stretch {
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.25);
  }
  60% {
    transform: scaleY(0.8);
  }
  100% {
    transform: scaleY(1);
  }
}
@keyframes ripple {
  0%,
  55% {
    opacity: 0;
    transform: translateX(-50%) scale(0.2);
  }
  60% {
    opacity: 0.55;
  }
  85% {
    opacity: 0.15;
    transform: translateX(-50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) scale(0.2);
  }
}
@keyframes wobble {
  0%,
  55% {
    transform: rotate(0deg);
  }
  60% {
    transform: rotate(-2deg);
  }
  72% {
    transform: rotate(1.2deg);
  }
  85%,
  100% {
    transform: rotate(0deg);
  }
}
@keyframes surfaceWave {
  0%,
  55% {
    transform: translateY(0);
  }
  62% {
    transform: translateY(2px);
  }
  76% {
    transform: translateY(-1px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes talk {
  0%,
  45% {
    opacity: 0;
    transform: translateY(-8px);
  }
  55% {
    opacity: 1;
    transform: translateY(0);
  }
  85% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-8px);
  }
}
</style>
