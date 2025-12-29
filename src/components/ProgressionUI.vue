<template>
  <div class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>Ascension & Progression</h2>

      <div class="ascension-section">
        <div class="stat-box">
          <div class="stat-label">Total Ascensions</div>
          <div class="stat-value">{{ gameStore.progression.totalAscensions }}</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Current Multiplier</div>
          <div class="stat-value">{{ gameStore.progression.ascensionMultiplier.toFixed(2) }}x</div>
        </div>
      </div>

      <div class="ascension-cost" v-if="canAscend">
        <p>Next Ascension Cost: {{ formatNumber(ascensionCost) }} Gold</p>
        <button class="ascend-btn" @click="ascend">
          🔼 Ascend Now
        </button>
      </div>
      <div class="ascension-cost" v-else>
        <p class="requirement">Requirements: Level 50 & {{ formatNumber(ascensionCost) }} Gold</p>
      </div>

      <div class="traits-section">
        <h3>Active Traits ({{ gameStore.progression.activeTraits.length }}/5)</h3>
        <div class="traits-grid">
          <div 
            v-for="traitId in gameStore.progression.activeTraits" 
            :key="traitId"
            class="trait-card"
            :class="getTrait(traitId).rarity"
          >
            <div class="trait-name">{{ getTrait(traitId).name }}</div>
            <div class="trait-desc">{{ getTrait(traitId).description }}</div>
          </div>
        </div>

        <h3>Unlocked Traits</h3>
        <div class="traits-grid">
          <div 
            v-for="traitId in availableTraits" 
            :key="traitId"
            class="trait-card"
            :class="getTrait(traitId).rarity"
            @click="activateTrait(traitId)"
          >
            <div class="trait-name">{{ getTrait(traitId).name }}</div>
            <div class="trait-desc">{{ getTrait(traitId).description }}</div>
          </div>
        </div>

        <button 
          class="reroll-btn" 
          v-if="gameStore.progression.traitRerollsAvailable > 0"
          @click="rerollTraits"
        >
          🔄 Reroll Traits ({{ gameStore.progression.traitRerollsAvailable }})
        </button>
      </div>

      <button class="close-btn" @click="close">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { useUIStore } from '@/stores/uiStore'
import { progressionSystem } from '@/systems/ProgressionSystem'
import { calculateAscensionCost, formatNumber } from '@/utils/formulas'
import traitsData from '@/data/traits.json'

const gameStore = useGameStore()
const uiStore = useUIStore()

const ascensionCost = computed(() => calculateAscensionCost(gameStore.progression.totalAscensions))
const canAscend = computed(() => progressionSystem.canAscend())

const availableTraits = computed(() => {
  return gameStore.progression.unlockedTraits.filter(
    id => !gameStore.progression.activeTraits.includes(id)
  )
})

function getTrait(traitId: string) {
  return traitsData.find(t => t.id === traitId) || { name: 'Unknown', description: '', rarity: 'common' }
}

function ascend() {
  progressionSystem.performAscension()
}

function activateTrait(traitId: string) {
  if (gameStore.progression.activeTraits.length < 5) {
    gameStore.activateTrait(traitId)
  } else {
    uiStore.addNotification('Maximum 5 active traits!', 'warning')
  }
}

function rerollTraits() {
  progressionSystem.rerollTraits()
}

function close() {
  uiStore.closeModal()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  overflow-y: auto;
}

.modal-content {
  background: linear-gradient(135deg, #1a1a2e, #2a2a3e);
  padding: 2rem;
  border-radius: 16px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #4a90e2;
  font-size: 1.8rem;
}

h3 {
  margin: 1.5rem 0 1rem;
  color: #ccc;
  font-size: 1.2rem;
}

.ascension-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-box {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.stat-label {
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  color: #4a90e2;
  font-size: 1.5rem;
  font-weight: bold;
}

.ascension-cost {
  text-align: center;
  padding: 1rem;
  background: rgba(74, 144, 226, 0.1);
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.ascension-cost p {
  margin-bottom: 1rem;
  color: #ccc;
}

.requirement {
  color: #e74c3c !important;
}

.ascend-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.ascend-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.4);
}

.traits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.trait-card {
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid;
  cursor: pointer;
  transition: all 0.2s;
}

.trait-card.common {
  border-color: #95a5a6;
  background: rgba(149, 165, 166, 0.1);
}

.trait-card.rare {
  border-color: #3498db;
  background: rgba(52, 152, 219, 0.1);
}

.trait-card.epic {
  border-color: #9b59b6;
  background: rgba(155, 89, 182, 0.1);
}

.trait-card.legendary {
  border-color: #f39c12;
  background: rgba(243, 156, 18, 0.1);
}

.trait-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.trait-name {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.trait-desc {
  font-size: 0.85rem;
  color: #aaa;
}

.reroll-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.reroll-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(155, 89, 182, 0.4);
}

.close-btn {
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
