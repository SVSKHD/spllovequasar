<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ text?: string }>(), { text: '' })

type Token = { text: string; isSpace: boolean }

const tokens = computed<Token[]>(() => {
    const raw = props.text ?? ''
    if (!raw) return []
    // split into words and spaces, keep spaces as tokens
    return raw
        .split(/(\s+)/)
        .filter(t => t.length > 0)
        .map(t => ({ text: t, isSpace: /^\s+$/.test(t) }))
})
</script>

<template>
    <span class="hover-text">
        <template v-for="(tok, wi) in tokens" :key="wi">
            <!-- spaces: render as a normal text span, not hoverable -->
            <span v-if="tok.isSpace" class="space-token">{{ tok.text }}</span>

            <!-- words: keep each word as one unit, but letters hover individually -->
            <span v-else class="word">
                <span v-for="(ch, ci) in Array.from(tok.text)" :key="ci" class="char">
                    {{ ch }}
                </span>
            </span>
        </template>
    </span>
</template>

<style scoped>
.hover-text {
    white-space: pre-wrap;
    /* preserve spaces/linebreaks */
    word-break: keep-all;
    /* don't break inside words */
    overflow-wrap: normal;
    /* break at spaces only */
}

/* keep each word as a single breakable unit */
.word {
    display: inline-block;
}

/* spaces render normally and aren't hoverable */
.space-token {
    white-space: pre;
    pointer-events: none;
}

/* base letter look */
.char {
    display: inline-block;
    /* keeps hover hitbox tight to the letter */
    transition: font-weight .15s ease, background-position .3s ease;
    background-size: 200% 100%;
    background-position: 0% 50%;
}

/* hover effect: bold + gradient only on the letter under cursor */
:root {
    --love-gradient: linear-gradient(90deg, #ff4d6d, #ff7a9e, #b5179e, #7b2cbf);
}

.char:hover {
    font-weight: 700;
    font-size: 20px;
    /* your chosen bump */
    cursor: grab;

    background-image: var(--love-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    background-position: 100% 50%;
}
</style>
