<template>
  <div class="q-pa-md">
    <q-toolbar flat dense class="text-black">
      <q-btn dense class="text-black" flat icon="eva-home" />

      <!-- Middle area expands; tabs are centered inside it -->
      <q-toolbar-title class="row justify-center items-center q-ma-none">
        <q-tabs v-model="tab" shrink>
          <q-tab
            v-for="item in props.tabs"
            :key="item.name"
            :icon="item.icon"
            :name="item.name"
            @click="handleTab(item.name)"
          />
        </q-tabs>
      </q-toolbar-title>

      <q-btn dense  class="text-red" flat icon="eva-log-out" @click="handleLogout" />
    </q-toolbar>

    <q-card dense flat class="q-mt-md">
      <q-tab-panels v-model="tab" class="fit-panels">
        <q-tab-panel
          v-for="item in props.tabs"
          :key="item.name"
          :name="item.name"
          class="fit-panel"
        >
          <div class="scroll-content q-pa-md">
            <slot :name="item.name" />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'

type TabDef = { name: string; label: string; icon?: string }
const props = defineProps<{ tabs: TabDef[] }>()
const tab = ref("")



const resumeTabs = () =>{
    const activeTab = localStorage.getItem('activeTab')
    if (activeTab) {
        tab.value = activeTab
    }else {
        tab.value = props.tabs?.[0]?.name || ''
    }
}

onMounted(() => {
  resumeTabs()
})

const handleLogout = () =>{
    localStorage.removeItem('login')
}

const handleTab = (name: string) => {
  localStorage.setItem('activeTab', name)
}

</script>

<style scoped>
.fit-panels {
  height: 75vh;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.fit-panel {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.scroll-content {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 16px;
}
</style>
