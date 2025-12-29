<template>
  <div class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>Settings</h2>
      
      <div class="setting-item">
        <label>Sound Effects</label>
        <button 
          class="toggle-btn" 
          :class="{ active: gameStore.settings.soundEnabled }"
          @click="toggleSound"
        >
          {{ gameStore.settings.soundEnabled ? 'ON' : 'OFF' }}
        </button>
      </div>

      <div class="setting-item">
        <label>Music</label>
        <button 
          class="toggle-btn" 
          :class="{ active: gameStore.settings.musicEnabled }"
          @click="toggleMusic"
        >
          {{ gameStore.settings.musicEnabled ? 'ON' : 'OFF' }}
        </button>
      </div>

      <div class="setting-item">
        <label>Graphics Quality</label>
        <select v-model="gameStore.settings.graphicsQuality" class="select-input">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div class="setting-item">
        <label>Battery Saver</label>
        <button 
          class="toggle-btn" 
          :class="{ active: gameStore.settings.batterySaverMode }"
          @click="toggleBatterySaver"
        >
          {{ gameStore.settings.batterySaverMode ? 'ON' : 'OFF' }}
        </button>
      </div>

      <div class="setting-item">
        <label>Notifications</label>
        <button 
          class="toggle-btn" 
          :class="{ active: gameStore.settings.notificationsEnabled }"
          @click="toggleNotifications"
        >
          {{ gameStore.settings.notificationsEnabled ? 'ON' : 'OFF' }}
        </button>
      </div>

      <div class="button-group">
        <button class="save-btn" @click="saveSettings">Save Game</button>
        <button class="close-btn" @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { useUIStore } from '@/stores/uiStore'
import { persistenceSystem } from '@/systems/PersistenceSystem'

const gameStore = useGameStore()
const uiStore = useUIStore()

function toggleSound() {
  gameStore.settings.soundEnabled = !gameStore.settings.soundEnabled
}

function toggleMusic() {
  gameStore.settings.musicEnabled = !gameStore.settings.musicEnabled
}

function toggleBatterySaver() {
  gameStore.settings.batterySaverMode = !gameStore.settings.batterySaverMode
}

function toggleNotifications() {
  gameStore.settings.notificationsEnabled = !gameStore.settings.notificationsEnabled
}

function saveSettings() {
  persistenceSystem.save()
  uiStore.addNotification('Settings saved!', 'success')
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
}

.modal-content {
  background: linear-gradient(135deg, #1a1a2e, #2a2a3e);
  padding: 2rem;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #4a90e2;
  font-size: 1.8rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

label {
  font-size: 1rem;
  color: #ccc;
}

.toggle-btn {
  padding: 0.5rem 1.5rem;
  border: 2px solid #666;
  background: transparent;
  color: #666;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: bold;
}

.toggle-btn.active {
  border-color: #4a90e2;
  background: #4a90e2;
  color: white;
}

.select-input {
  padding: 0.5rem 1rem;
  border: 2px solid #666;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.save-btn,
.close-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.save-btn {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.4);
}

.close-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
