<template>
    <div class="q-pa-md">
        <q-carousel v-model="slide" arrows animated infinite :height="height" class="no-crop-carousel">
            <q-carousel-slide name="first" class="slide">
                <div class="media-box">
                    <img class="media" src="https://cdn.quasar.dev/img/mountains.jpg" alt="First stop" />
                </div>
                <div class="absolute-bottom custom-caption">
                    <div class="text-h2">First stop</div>
                    <div class="text-subtitle1">Mountains</div>
                </div>
            </q-carousel-slide>

            <q-carousel-slide name="second" class="slide">
                <div class="media-box">
                    <img class="media" src="https://cdn.quasar.dev/img/parallax1.jpg" alt="Second stop" />
                </div>
                <div class="absolute-bottom custom-caption">
                    <div class="text-h2">Second stop</div>
                    <div class="text-subtitle1">Famous City</div>
                </div>
            </q-carousel-slide>

            <q-carousel-slide name="third" class="slide">
                <div class="media-box">
                    <img class="media" src="https://cdn.quasar.dev/img/parallax2.jpg" alt="Third stop" />
                </div>
                <div class="absolute-bottom custom-caption">
                    <div class="text-h2">Third stop</div>
                    <div class="text-subtitle1">Famous Bridge</div>
                </div>
            </q-carousel-slide>
        </q-carousel>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const slide = ref('first')
/* 16:9-ish but capped by viewport height; tweak as you like.
   For tall portraits, this gives more vertical room without cropping. */
const height = 'min(85vh, 90vw)'
</script>

<style lang="css" scoped>
/* round the whole carousel and hide overflow so images/captions stay clipped */
.no-crop-carousel {
    border-radius: 20px;
    overflow: hidden;
}

/* allow absolute-positioned children inside slides */
.no-crop-carousel :deep(.q-carousel__slides-container) {
    position: relative;
}

.slide {
    position: relative;
    height: 100%;
    overflow: hidden;
    /* keeps rounded corners clean */
}

/* full-slide stage that centers the image; gives letterbox/pillarbox when needed */
.media-box {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
    /* bar color */
}

/* scale the image to fit without cropping */
.media {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    /* key line: no crop */
    display: block;
}

/* caption polish (you already use absolute-bottom from Quasar) */
.custom-caption {
    left: 0;
    right: 0;
    background: linear-gradient(to top,
            rgba(0, 0, 0, 0.55),
            rgba(0, 0, 0, 0.35),
            rgba(0, 0, 0, 0));
    padding: 12px 16px;
    text-align: center;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, .4);
}

/* optional: make headings adapt a bit on small screens */
@media (max-width: 600px) {
    .custom-caption .text-h2 {
        font-size: 1.25rem;
    }

    .custom-caption .text-subtitle1 {
        font-size: .95rem;
    }
}
</style>
