<template>
    <div class="glass-tabs-wrap">
        <q-card class="glass-card">
            <q-tabs v-model="inner" class="glass-tabs" dense :active-color="activeColor"
                :indicator-color="indicatorColor" align="justify" narrow-indicator>
                <q-tab v-for="t in tabs" :key="t.name" :name="t.name" :icon="t.icon">
                    <q-tooltip>
                        {{ t.name }}
                    </q-tooltip>
                </q-tab>
            </q-tabs>




            <q-tab-panels v-model="inner" animated class="glass-panels">
                <q-tab-panel v-for="t in tabs" :key="t.name" :name="t.name" class="panel-slot">
                    <slot :name="t.name" />
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type TabDef = { name: string; label: string; icon?: string }

const props = withDefaults(defineProps<{
    /** v-model active tab name */
    modelValue?: string
    /** tabs list */
    tabs: TabDef[]
    /** colors */
    activeColor?: string
    indicatorColor?: string
}>(), {
    modelValue: '',
    activeColor: 'primary',
    indicatorColor: 'primary'
})

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const inner = computed({
    get: () => props.modelValue || props.tabs?.[0]?.name || '',
    set: (v: string) => emit('update:modelValue', v)
})
</script>

<style scoped>
.glass-tabs-wrap {
    max-width: 900px;
    margin: 24px auto;
    padding: 0 12px;
}

.glass-card {
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.28);
    backdrop-filter: blur(12px) saturate(120%);
    -webkit-backdrop-filter: blur(12px) saturate(120%);
    border: 1px solid rgba(255, 255, 255, 0.32);
    box-shadow: none;
    display: flex;
    flex-direction: column;
    max-height: 85vh;
}

.glass-tabs {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.42), rgba(255, 255, 255, 0.18));
    border-bottom: 1px solid rgba(255, 255, 255, 0.30);
    flex: 0 0 auto;
}

.glass-sep {
    opacity: .7;
}

.glass-panels {
    flex: 1 1 auto;
    /* take remaining space */
    min-height: 0;
    /* IMPORTANT: allow shrinking inside flex */
    overflow-y: auto;
    /* scroll only the content area */
    background: rgba(255, 255, 255, 0.22);
    border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.panel-slot {
    padding: 16px 18px 22px;
    /* height: 100vh; */

}

/* Dark mode polish */
:global(.body--dark) .glass-card {
    background: rgba(30, 30, 30, 0.34);
    border-color: rgba(255, 255, 255, 0.12);
}

:global(.body--dark) .glass-tabs {
    background: linear-gradient(180deg, rgba(40, 40, 40, 0.60), rgba(30, 30, 30, 0.35));
    border-bottom-color: rgba(255, 255, 255, 0.10);
}

:global(.body--dark) .glass-panels {
    background: rgba(30, 30, 30, 0.28);
    border-top-color: rgba(255, 255, 255, 0.08);
}
</style>
