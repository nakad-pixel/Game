<script setup lang="ts">
import { ref } from 'vue'
import { useUIStore } from '@/stores/uiStore'
import ClanPanel from './ClanPanel.vue'
import LeaderboardPanel from './LeaderboardPanel.vue'

const uiStore = useUIStore()
const activeTab = ref('leaderboard')

function close() {
  uiStore.closeModal()
}
</script>

<template>
  <div class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>Social & Rankings</h2>

      <div class="tabs">
        <button 
          class="tab" 
          :class="{ active: activeTab === 'leaderboard' }"
          @click="activeTab = 'leaderboard'"
        >
          🏆 Leaderboard
        </button>
        <button 
          class="tab" 
          :class="{ active: activeTab === 'clan' }"
          @click="activeTab = 'clan'"
        >
          🛡️ Clan
        </button>
      </div>

      <div class="social-content">
        <LeaderboardPanel v-if="activeTab === 'leaderboard'" />
        <ClanPanel v-if="activeTab === 'clan'" />
      </div>

      <button class="close-btn" @click="close">Close</button>
    </div>
  </div>
</template>

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

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tab {
  flex: 1;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  border-radius: 8px;
  color: #ccc;
  cursor: pointer;
  transition: all 0.2s;
}

.tab.active {
  background: linear-gradient(135deg, #4a90e2, #3498db);
  color: white;
}

.social-content {
  min-height: 400px;
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
