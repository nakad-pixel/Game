<template>
  <div v-if="uiStore.showDebug" class="debug-panel">
    <div class="debug-header">
      <h3>🛠️ Debug Panel</h3>
      <button class="close-btn" @click="uiStore.toggleDebug()">✕</button>
    </div>
    
    <div class="debug-content">
      <div class="debug-section">
        <h4>Performance</h4>
        <div class="debug-stat">FPS: {{ uiStore.fps }}</div>
        <div class="debug-stat">Session Time: {{ formatTime(sessionTime) }}</div>
      </div>

      <div class="debug-section">
        <h4>Player Stats</h4>
        <div class="debug-stat">Level: {{ gameStore.player.level }}</div>
        <div class="debug-stat">Gold: {{ formatNumber(gameStore.player.gold) }}</div>
        <div class="debug-stat">Gems: {{ gameStore.player.gems }}</div>
        <div class="debug-stat">Damage: {{ formatNumber(gameStore.effectiveDamage) }}</div>
        <div class="debug-stat">Wave: {{ gameStore.combat.waveNumber }}</div>
        <div class="debug-stat">Enemies Defeated: {{ gameStore.combat.enemiesDefeated }}</div>
      </div>

      <div class="debug-section">
        <h4>Progression</h4>
        <div class="debug-stat">Ascensions: {{ gameStore.progression.totalAscensions }}</div>
        <div class="debug-stat">Multiplier: {{ gameStore.progression.ascensionMultiplier.toFixed(2) }}x</div>
        <div class="debug-stat">Active Traits: {{ gameStore.progression.activeTraits.length }}</div>
      </div>

      <div class="debug-section">
        <h4>Quick Actions</h4>
        <button class="debug-btn" @click="addGold">+1M Gold</button>
        <button class="debug-btn" @click="addGems">+100 Gems</button>
        <button class="debug-btn" @click="addXP">+10K XP</button>
        <button class="debug-btn" @click="maxLevel">Max Level</button>
        <button class="debug-btn" @click="unlockAll">Unlock All</button>
        <button class="debug-btn" @click="clearSave">Clear Save</button>
        <button class="debug-btn" @click="triggerAscension">Force Ascension</button>
      </div>

      <div class="debug-section">
        <h4>Multipliers</h4>
        <div class="debug-stat">Gold: {{ gameStore.effectiveGoldMultiplier.toFixed(2) }}x</div>
        <div class="debug-stat">XP: {{ gameStore.effectiveXPMultiplier.toFixed(2) }}x</div>
      </div>

      <div class="debug-section">
        <h4>System Info</h4>
        <div class="debug-stat">Save Version: {{ gameStore.meta.saveVersion }}</div>
        <div class="debug-stat">Total Play Time: {{ formatTime(gameStore.meta.totalPlayTime / 1000) }}</div>
        <div class="debug-stat">Last Save: {{ new Date(gameStore.meta.lastPlayTime).toLocaleTimeString() }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { useUIStore } from '@/stores/uiStore'
import { formatNumber, formatTime } from '@/utils/formulas'

const gameStore = useGameStore()
const uiStore = useUIStore()
const sessionTime = ref(0)

let intervalId: number | null = null

onMounted(() => {
  intervalId = window.setInterval(() => {
    sessionTime.value = (Date.now() - gameStore.meta.sessionStartTime) / 1000
  }, 1000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

function addGold() {
  gameStore.player.gold += 1000000
  uiStore.addNotification('Added 1M gold', 'success')
}

function addGems() {
  gameStore.player.gems += 100
  uiStore.addNotification('Added 100 gems', 'success')
}

function addXP() {
  gameStore.player.xp += 10000
  gameStore.checkLevelUp()
  uiStore.addNotification('Added 10K XP', 'success')
}

function maxLevel() {
  gameStore.player.level = 99
  gameStore.player.xp = 0
  uiStore.addNotification('Set to max level', 'success')
}

function unlockAll() {
  gameStore.player.unlockedCharacters = ['striker', 'guardian', 'mystic', 'legendary']
  gameStore.progression.unlockedTraits = []
  // Unlock some traits
  const allTraits = ['berserker', 'wealthy', 'scholar', 'swift', 'critical_eye', 'destroyer', 'midas']
  allTraits.forEach(id => {
    if (!gameStore.progression.unlockedTraits.includes(id)) {
      gameStore.progression.unlockedTraits.push(id)
    }
  })
  uiStore.addNotification('Unlocked all content', 'success')
}

function clearSave() {
  if (confirm('Are you sure? This will delete your save!')) {
    localStorage.clear()
    location.reload()
  }
}

function triggerAscension() {
  gameStore.player.level = 50
  gameStore.player.gold = 10000000
  uiStore.addNotification('Ready to ascend!', 'info')
}
</script>

<style scoped>
.debug-panel {
  position: fixed;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 300px;
  max-height: 90vh;
  background: rgba(0, 0, 0, 0.95);
  border: 2px solid #0f0;
  border-radius: 8px;
  padding: 1rem;
  z-index: 10000;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
}

.debug-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #0f0;
}

.debug-header h3 {
  margin: 0;
  color: #0f0;
  font-size: 1rem;
}

.close-btn {
  background: none;
  border: 1px solid #0f0;
  color: #0f0;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1rem;
}

.close-btn:hover {
  background: #0f0;
  color: #000;
}

.debug-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.debug-section {
  background: rgba(0, 255, 0, 0.05);
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid rgba(0, 255, 0, 0.2);
}

.debug-section h4 {
  margin: 0 0 0.5rem 0;
  color: #0f0;
  font-size: 0.9rem;
  text-transform: uppercase;
}

.debug-stat {
  color: #0f0;
  margin: 0.25rem 0;
  font-size: 0.8rem;
}

.debug-btn {
  width: 100%;
  padding: 0.5rem;
  margin: 0.25rem 0;
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid #0f0;
  color: #0f0;
  cursor: pointer;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.debug-btn:hover {
  background: #0f0;
  color: #000;
}

.debug-btn:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .debug-panel {
    width: 90%;
    right: 5%;
    left: 5%;
  }
}
</style>
