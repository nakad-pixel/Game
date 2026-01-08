<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { prestigeSystem } from '@/systems/PrestigeSystem'
import { computed } from 'vue'

const gameStore = useGameStore()
const currentLayer = computed(() => gameStore.progression.currentPrestigeLayer)
const canPrestige = computed(() => prestigeSystem.canPrestigeNext())

const handlePrestige = () => {
  prestigeSystem.prestige()
}
</script>

<template>
  <div class="prestige-panel">
    <h2>PRESTIGE TIER: {{ currentLayer }}</h2>
    <div class="multiplier-info">
      Total Multiplier: x{{ prestigeSystem.getTotalPrestigeMultiplier().toLocaleString() }}
    </div>
    
    <div v-if="canPrestige" class="prestige-action">
      <p>You can now reach the next prestige tier!</p>
      <button @click="handlePrestige" class="btn-prestige">PRESTIGE NOW</button>
    </div>
    <div v-else class="locked-info">
      Next tier unlocks at {{ (currentLayer + 1) * 25 }} ascensions.
      Current: {{ gameStore.progression.totalAscensions }}
    </div>
  </div>
</template>

<style scoped>
.prestige-panel {
  padding: 20px;
  background: #1a1a2e;
  border: 2px solid #e94560;
  border-radius: 12px;
  color: white;
  text-align: center;
}

.multiplier-info {
  font-size: 24px;
  color: #ffd700;
  margin: 15px 0;
}

.btn-prestige {
  background: #e94560;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(233, 69, 96, 0.7); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(233, 69, 96, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(233, 69, 96, 0); }
}

.locked-info {
  opacity: 0.7;
  font-style: italic;
}
</style>
