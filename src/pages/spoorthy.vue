<template>
    <typeWritter title="Spoorthy" />
    <GlassTabs v-model="tab" :tabs="tabs">
        <template #timeline>
            <timeline :events="events" color="secondary" @action="onAction" />
        </template>
        <template #memories>
            <carousel />
        </template>
    </GlassTabs>
</template>

<script setup lang="ts">
import { ref } from "vue"
import typeWritter from "../components/typeWritter.vue"
import GlassTabs from "../components/tabs.vue"
import timeline, { type TimelineItem, type TimelineAction, type TimelineHeading, type TimelineEntry } from "src/components/timeline.vue"
import carousel from "src/components/imageCarousel.vue"
// import picAngry from "../assests/splvlovevc/splangry.png"

const tab = ref("timeline")
const tabs = [
    { name: 'timeline', label: 'Timeline', icon: 'eva-eye-outline' },
    { name: 'memories', label: 'Memories', icon: 'eva-tv-outline' },
    { name: 'interesting', label: 'Interesting', icon: 'movie' },
    { name: "Questions", label: "Questions", icon: "eva-mic-outline" }
]
const events = [
    { type: 'heading', text: 'When We Met (May-23rd)' } satisfies TimelineHeading,

    {
        type: 'entry',
        title: 'Our First Milestone (Corriander Restaurant)',
        subtitle: '(May 23, 2025)',
        image: 'https://lh3.googleusercontent.com/p/AF1QipOEKw_96559xWzYHQTIdHh0t9832ZHt3G5aJAJQ=s680-w680-h510-rw',
        description: [
            'You came to my place that beautiful evening after so long.',
            'We went to Corriander Restaurant, and you sat beside me without any gap or hesitation.',
            'We went to the mall together, and you playfully slapped me when I looked at another girl.',
            'You took me to Biryani by Kilo just because I had a non-veg craving.',
            'Later in the evening, I dropped you home, still smiling from everything we shared that day.'
        ],
        side: 'left',
        icon: 'rocket_launch',
        entryColor: 'orange'
    } satisfies TimelineEntry,

    {
        type: 'entry',
        title: 'Our First Devotional Trip',
        image: "https://upload.wikimedia.org/wikipedia/commons/3/32/Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG",
        subtitle: "(May 24 2025)",
        description: [
            'I visited your campus, and from there we took the metro.',
            'I offered you a chocolate, and you smiled—“first time you gave me a chocolate.”',
            'We visited the temple and went straight for special darshan at the main sanctum.',
            'Walking hand-in-hand into the temple felt like the most beautiful thing.',
            'Afterwards we headed to a faraway mall, crossing the Howrah Bridge.',
            'You slept on my shoulder for a long while, holding my hand the whole way.'
        ],

        side: 'right',           // optional
        icon: 'temple_hindu',    // optional (or any Material icon you use)
        entryColor: 'red'       // optional
    } satisfies TimelineEntry,

    {
        type: "entry",
        title: "My final test to my Love (was painfull but need to do it)",
        image: "https://content.jdmagicbox.com/v2/comp/kolkata/l2/033pxx33.xx33.250228190421.j6l2/catalogue/cafe-37-milk-belgachia-kolkata-coffee-shops-71hfhntuuo.jpg",
        side: 'left',           // optional
        icon: 'temple_hindu',    // optional (or any Material icon you use)
        entryColor: 'pink',
        description: [
            'That day felt like a test—painful, but necessary—and it only made me surer about us.',
            'I don’t know how you felt, but I felt wonderful. I’d been waiting for you to ask me out; even a small plan from you means the world to me.',
            'It’s not the place I love; it’s any place with you. When you’re with me, I can sit for hours—calm and peaceful.',
            'I never imagined my peace lived in you. I’m sorry I didn’t come earlier—but I’m not leaving you.'
        ]
    } satisfies TimelineEntry
] satisfies TimelineItem[];


// const slides: SlideItem[] = [
//     { src: picAngry, title: 'Mountains', subtitle: 'Calm skies', description: 'Blue hour over the ridge.' },
//     { src: 'https://cdn.quasar.dev/img/parallax1.jpg', title: 'Forest', subtitle: 'Soft light', description: 'Leaves whisper, paths invite.' },
//     { src: 'https://cdn.quasar.dev/img/parallax2.jpg', title: 'Lake', subtitle: 'Reflections', description: 'Water mirrors the clouds.' },
//     { src: 'https://cdn.quasar.dev/img/quasar.jpg', title: 'Quasar', subtitle: 'UI love', description: 'Build fast, look sharp.' }
// ]



function onAction({ action, item, index }: { action: TimelineAction; item: TimelineItem; index: number }) {
    console.log('Action clicked:', action, 'on item', index, item)
}
</script>