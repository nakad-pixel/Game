<template>
  <div class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>Achievements</h2>

      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-label">Unlocked:</span>
          <span class="stat-value">{{ gameStore.achievements.unlockedAchievements.length }}/{{ achievements.length }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Daily Streak:</span>
          <span class="stat-value">{{ gameStore.achievements.dailyStreakCount }} 🔥</span>
        </div>
      </div>

      <div class="achievements-grid">
        <div 
          v-for="achievement in achievements" 
          :key="achievement.id"
          class="achievement-card"
          :class="{ unlocked: isUnlocked(achievement.id) }"
        >
          <div class="achievement-icon">
            {{ isUnlocked(achievement.id) ? '🏆' : '🔒' }}
          </div>
          <div class="achievement-name">{{ achievement.name }}</div>
          <div class="achievement-desc">{{ achievement.description }}</div>
          <div class="achievement-reward">
            Reward: {{ formatReward(achievement.reward) }}
          </div>
          <div v-if="isUnlocked(achievement.id)" class="unlocked-badge">✓ Unlocked</div>
        </div>
      </div>

      <button class="close-btn" @click="close">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { useUIStore } from '@/stores/uiStore'
import achievementsData from '@/data/achievements.json'

const gameStore = useGameStore()
const uiStore = useUIStore()
const achievements = achievementsData

function isUnlocked(achievementId: string): boolean {
  return gameStore.achievements.unlockedAchievements.includes(achievementId)
}

function formatReward(reward: any): string {
  if (reward.type === 'gold') {
    return `${reward.value} Gold`
  } else if (reward.type === 'gems') {
    return `${reward.value} Gems`
  } else if (reward.type === 'skin') {
    return `Skin: ${reward.value}`
  }
  return 'Special Reward'
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
  max-width: 900px;
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

.stats-bar {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.stat-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.stat-label {
  color: #aaa;
}

.stat-value {
  color: #4a90e2;
  font-weight: bold;
  font-size: 1.1rem;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.achievement-card {
  position: relative;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s;
}

.achievement-card.unlocked {
  border-color: #f39c12;
  background: rgba(243, 156, 18, 0.1);
}

.achievement-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.achievement-icon {
  font-size: 3rem;
  margin-bottom: 0.75rem;
}

.achievement-name {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #fff;
}

.achievement-desc {
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 0.75rem;
}

.achievement-reward {
  font-size: 0.85rem;
  color: #4a90e2;
  font-weight: bold;
}

.unlocked-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #27ae60;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
}

.close-btn {
  width: 100%;
  padding: 1rem;
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
