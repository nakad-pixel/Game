<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { questSystem } from '@/systems/QuestSystem'
import { computed } from 'vue'

const gameStore = useGameStore()
const dailyQuests = computed(() => gameStore.quests.dailyQuests)
const weeklyQuests = computed(() => gameStore.quests.weeklyQuests)

const claim = (id: string) => {
  questSystem.claimReward(id)
}
</script>

<template>
  <div class="quest-tracker">
    <h3>DAILY QUESTS</h3>
    <div v-for="quest in dailyQuests" :key="quest.id" class="quest-item">
      <div class="quest-header">
        <span class="quest-name">{{ quest.name }}</span>
        <span class="quest-reward">{{ quest.reward.value }} {{ quest.reward.type }}</span>
      </div>
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: (quest.progress / quest.condition.target * 100) + '%' }"></div>
        </div>
        <span class="progress-text">{{ quest.progress }} / {{ quest.condition.target }}</span>
      </div>
      <button v-if="quest.completed && !quest.claimed" @click="claim(quest.id)" class="btn-claim">CLAIM</button>
      <span v-else-if="quest.claimed" class="claimed">CLAIMED</span>
    </div>

    <h3>WEEKLY QUESTS</h3>
    <div v-for="quest in weeklyQuests" :key="quest.id" class="quest-item">
      <!-- Same structure for weekly -->
    </div>
  </div>
</template>

<style scoped>
.quest-tracker {
  padding: 15px;
  background: #1a1a2e;
  color: white;
  border-radius: 8px;
}

.quest-item {
  background: #16213e;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
}

.quest-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar {
  flex-grow: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.progress-fill {
  height: 100%;
  background: #4a90e2;
  border-radius: 4px;
}

.btn-claim {
  margin-top: 10px;
  width: 100%;
  background: #e94560;
  border: none;
  padding: 5px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.claimed {
  display: block;
  margin-top: 10px;
  text-align: center;
  color: #555;
}
</style>
