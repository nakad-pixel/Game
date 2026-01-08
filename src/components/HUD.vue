<template>
  <div class="hud">
    <div class="top-bar">
      <div class="resources">
        <div class="resource">
          <span class="label">Level:</span>
          <span class="value">{{ gameStore.player.level }}</span>
        </div>
        <div class="resource">
          <span class="label">Gold:</span>
          <span class="value">{{ formatNumber(gameStore.player.gold) }}</span>
        </div>
        <div class="resource">
          <span class="label">Gems:</span>
          <span class="value gem">{{ gameStore.player.gems }}</span>
        </div>
      </div>
      <button class="icon-btn settings-btn" @click="openSettings">⚙️</button>
    </div>

    <div class="center-info" v-if="gameStore.combat.currentEnemy">
      <EventNotification />
      <div class="enemy-info">
        <div class="enemy-name">{{ gameStore.combat.currentEnemy.name }}</div>
        <div class="health-bar">
          <div 
            class="health-fill" 
            :style="{ width: (gameStore.combat.currentEnemy.health / gameStore.combat.currentEnemy.maxHealth * 100) + '%' }"
          ></div>
        </div>
        <div class="health-text">
          {{ formatNumber(gameStore.combat.currentEnemy.health) }} / {{ formatNumber(gameStore.combat.currentEnemy.maxHealth) }}
        </div>
        <div class="wave-number">Wave {{ gameStore.combat.waveNumber }}</div>
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="xp-bar">
        <div class="xp-fill" :style="{ width: (gameStore.player.xp / gameStore.player.xpToNextLevel * 100) + '%' }"></div>
      </div>
      <div class="xp-text">
        XP: {{ formatNumber(gameStore.player.xp) }} / {{ formatNumber(gameStore.player.xpToNextLevel) }}
      </div>
    </div>

    <div class="skill-overlay">
      <SkillDisplay />
    </div>

    <div class="bottom-bar">
      <button class="menu-btn" @click="openModal('progression')">
        🔼 Ascension
      </button>
      <button class="menu-btn" @click="openModal('characters')">
        👥 Characters
      </button>
      <button class="menu-btn" @click="openModal('shop')">
        🛒 Shop
      </button>
      <button class="menu-btn" @click="openModal('social')">
        🤝 Social
      </button>
      <button class="menu-btn" @click="openModal('achievements')">
        🏆 Achievements
      </button>
    </div>

    <div class="debug-info" v-if="uiStore.showDebug">
      <div>FPS: {{ uiStore.fps }}</div>
      <div>Damage: {{ formatNumber(gameStore.effectiveDamage) }}</div>
      <div>Enemies: {{ gameStore.combat.enemiesDefeated }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { useUIStore } from '@/stores/uiStore'
import { formatNumber } from '@/utils/formulas'
import EventNotification from './EventNotification.vue'
import SkillDisplay from './SkillDisplay.vue'

const gameStore = useGameStore()
const uiStore = useUIStore()

function openSettings() {
  uiStore.openModal('settings')
}

function openModal(name: string) {
  uiStore.openModal(name)
}
</script>

<style scoped>
.hud {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.hud > * {
  pointer-events: auto;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
}

.resources {
  display: flex;
  gap: 1.5rem;
}

.resource {
  display: flex;
  gap: 0.5rem;
  font-size: 1rem;
}

.label {
  color: #aaa;
}

.value {
  color: #fff;
  font-weight: bold;
}

.gem {
  color: #4a90e2;
}

.settings-btn {
  font-size: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.settings-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.center-info {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  min-width: 300px;
}

.enemy-info {
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.enemy-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #e74c3c;
}

.health-bar {
  width: 100%;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.health-fill {
  height: 100%;
  background: linear-gradient(90deg, #e74c3c, #c0392b);
  transition: width 0.3s ease;
}

.health-text {
  font-size: 0.9rem;
  color: #ccc;
}

.wave-number {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #4a90e2;
  font-weight: bold;
}

.progress-bar-container {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
}

.xp-bar {
  width: 100%;
  height: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0.3rem;
}

.xp-fill {
  height: 100%;
  background: linear-gradient(90deg, #4a90e2, #3498db);
  transition: width 0.3s ease;
}

.xp-text {
  text-align: center;
  font-size: 0.85rem;
  color: #ccc;
}

.skill-overlay {
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

.bottom-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  gap: 0.5rem;
}

.menu-btn {
  flex: 1;
  min-height: 48px;
  background: linear-gradient(135deg, #4a90e2, #3498db);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(74, 144, 226, 0.3);
}

.menu-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(74, 144, 226, 0.5);
}

.menu-btn:active {
  transform: translateY(0);
}

.debug-info {
  position: absolute;
  top: 80px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.5rem;
  border-radius: 8px;
  font-size: 0.75rem;
  color: #0f0;
}

@media (max-width: 768px) {
  .resources {
    flex-direction: column;
    gap: 0.5rem;
  }

  .resource {
    font-size: 0.85rem;
  }

  .menu-btn {
    font-size: 0.8rem;
    padding: 0.5rem;
  }

  .center-info {
    min-width: 250px;
  }
}
</style>
