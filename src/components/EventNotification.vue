<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { computed } from 'vue'

const gameStore = useGameStore()
const activeEvent = computed(() => gameStore.events.activeEvent)
const progress = computed(() => gameStore.events.eventProgress)

const formatTime = (ms: number) => {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 0) return `${days}d ${hours % 24}h`
  return `${hours % 24}h ${minutes % 60}m`
}

const timeRemaining = computed(() => {
  const remaining = gameStore.events.eventEndTime - Date.now()
  return formatTime(Math.max(0, remaining))
})
</script>

<template>
  <div v-if="activeEvent" class="event-banner">
    <div class="event-info">
      <div class="event-name">{{ activeEvent.name }}</div>
      <div class="event-desc">{{ activeEvent.description }}</div>
      <div class="event-time">Ends in: {{ timeRemaining }}</div>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.event-banner {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 1px solid #4a90e2;
  border-radius: 8px;
  padding: 12px;
  margin: 10px;
  color: white;
  position: relative;
  overflow: hidden;
}

.event-name {
  font-size: 18px;
  font-weight: bold;
  color: #4a90e2;
}

.event-desc {
  font-size: 14px;
  opacity: 0.9;
}

.event-time {
  font-size: 12px;
  margin-top: 4px;
  color: #e94560;
}

.progress-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  margin-top: 8px;
  border-radius: 2px;
}

.progress-fill {
  height: 100%;
  background: #4a90e2;
  border-radius: 2px;
  transition: width 0.3s ease;
}
</style>
