<template>
    <div class="q-px-lg q-py-md">
        <q-timeline :layout="layoutValue" :color="color">
            <template v-for="(item, idx) in events" :key="idx">

                <q-timeline-entry v-if="item.type === 'heading'" heading class="timeline-heading">
                    {{ item.text }}
                </q-timeline-entry>


                <q-timeline-entry v-else-if="item.type === 'entry'" :title="item.title" :subtitle="item.subtitle"
                    :side="item.side || undefined" :icon="item.icon || undefined" :color="item.entryColor || undefined"
                    class="timeline-entry-heading">
                    <!-- Image: render only when present (no gap otherwise) -->
                    <q-img v-if="item.image" :src="item.image" :alt="item.title" class="q-mb-sm"
                        style="max-width: 100%; border-radius: 8px;" loading="lazy" />


                    <div v-if="item.html" v-html="item.html" />
                    <template v-else>

                        <ul v-if="isStringArray(item.description)" class="description-list q-pl-md q-my-sm">
                            <li v-for="(point, i) in item.description.filter(Boolean)" :key="i">
                                <inline-hover-text :text="point" />
                            </li>
                        </ul>


                        <div v-else-if="isString(item.description)" class="description-string">
                            <inline-hover-text :text="item.description" />
                        </div>


                        <div v-else />
                    </template>


                    <template v-if="item.actions && item.actions.length" #default>
                        <div class="q-mt-sm row items-center q-gutter-sm">
                            <q-btn v-for="(action, aIdx) in item.actions" :key="aIdx" :label="action.label"
                                :icon="action.icon || undefined" :color="action.color || 'primary'"
                                :flat="action.flat !== false" dense @click="emitAction(action, item, idx)" />
                        </div>
                    </template>
                </q-timeline-entry>
            </template>
        </q-timeline>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuasar } from 'quasar'
import inlineHoverText from './inlineHoverText.vue'


const isString = (v: unknown): v is string => typeof v === 'string'
const isStringArray = (v: unknown): v is string[] => Array.isArray(v)

export type TimelineAction = {
    label: string
    icon?: string
    color?: string
    flat?: boolean
}

export type TimelineHeading = {
    type: 'heading'
    text: string
}

export type TimelineEntry = {
    type: 'entry'
    title: string
    subtitle?: string
    /** Accept string or string[] for point-wise rendering */
    description?: string | string[]
    html?: string
    side?: 'left' | 'right'
    icon?: string
    entryColor?: string
    image?: string
    actions?: TimelineAction[]
}

export type TimelineItem = TimelineHeading | TimelineEntry

const props = withDefaults(defineProps<{
    events: TimelineItem[]
    color?: string
    responsiveLayout?: boolean
    layout?: 'dense' | 'comfortable' | 'loose'
}>(), {
    events: () => [],
    color: 'secondary',
    responsiveLayout: true,
    layout: 'loose'
})

const emit = defineEmits<{
    (e: 'action', payload: { action: TimelineAction; item: TimelineItem; index: number }): void
}>()

const $q = useQuasar()

const layoutValue = computed(() => {
    if (props.responsiveLayout === false) return props.layout
    return $q.screen.lt.sm ? 'dense' : ($q.screen.lt.md ? 'comfortable' : 'loose')
})

function emitAction(action: TimelineAction, item: TimelineItem, index: number) {
    emit('action', { action, item, index })
}
</script>

<style scoped>
.timeline-heading {
    font-family: var(--font-pacifico);
}

.timeline-entry-heading {
    font-family: var(--font-pacifico);
}

/* Optional: tighten list styling a bit */
.description-list {
    list-style: disc;
}

.description-list {
    list-style: disc;
    /* Give the entire list the body font */
    font-family: var(--font-playwrite);
    line-height: 25px;
    font-style: italic;
}

/* Only spacing should depend on not-first */
.description-list li+li {
    margin-top: 4px;
}



.description-string {
    margin-top: 4px;
    line-height: 25px;
    font-family: var(--font-playwrite);
}
</style>
