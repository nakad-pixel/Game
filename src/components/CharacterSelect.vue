<template>
  <div class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>Characters</h2>

      <div class="character-grid">
        <div 
          v-for="character in CHARACTERS" 
          :key="character.id"
          class="character-card"
          :class="{ 
            active: gameStore.player.activeCharacterId === character.id,
            locked: !gameStore.player.unlockedCharacters.includes(character.id)
          }"
          @click="selectCharacter(character)"
        >
          <div class="character-icon">{{ getCharacterEmoji(character.role) }}</div>
          <div class="character-name">{{ character.name }}</div>
          <div class="character-role">{{ character.role.toUpperCase() }}</div>
          
          <div v-if="gameStore.player.unlockedCharacters.includes(character.id)" class="character-stats">
            <div class="stat">⚔️ {{ character.baseDamage }}</div>
            <div class="stat">❤️ {{ character.baseHealth }}</div>
            <div class="stat">⚡ {{ character.attackSpeed.toFixed(1) }}</div>
          </div>

          <div v-else class="locked-overlay">
            <div class="unlock-level">🔒 Level {{ character.unlockedAt }}</div>
          </div>

          <div class="character-ability">{{ character.specialAbility }}</div>

          <button 
            v-if="gameStore.player.unlockedCharacters.includes(character.id)"
            class="select-btn"
            :disabled="gameStore.player.activeCharacterId === character.id"
          >
            {{ gameStore.player.activeCharacterId === character.id ? 'Active' : 'Select' }}
          </button>
        </div>
      </div>

      <button class="close-btn" @click="close">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { useUIStore } from '@/stores/uiStore'
import { progressionSystem } from '@/systems/ProgressionSystem'
import { CHARACTERS } from '@/utils/constants'

const gameStore = useGameStore()
const uiStore = useUIStore()

function getCharacterEmoji(role: string): string {
  const emojis: Record<string, string> = {
    striker: '⚔️',
    guardian: '🛡️',
    mystic: '🔮',
    legendary: '👑',
  }
  return emojis[role] || '❓'
}

function selectCharacter(character: any) {
  if (gameStore.player.unlockedCharacters.includes(character.id)) {
    progressionSystem.switchCharacter(character.id)
  }
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

.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.character-card {
  position: relative;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid transparent;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.character-card:hover:not(.locked) {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.3);
}

.character-card.active {
  border-color: #4a90e2;
  background: rgba(74, 144, 226, 0.1);
}

.character-card.locked {
  opacity: 0.5;
  cursor: not-allowed;
}

.character-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.character-name {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.character-role {
  font-size: 0.85rem;
  color: #4a90e2;
  font-weight: bold;
  margin-bottom: 1rem;
}

.character-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.stat {
  font-size: 0.9rem;
  color: #ccc;
}

.character-ability {
  font-size: 0.85rem;
  color: #aaa;
  font-style: italic;
  margin-bottom: 1rem;
  min-height: 40px;
}

.locked-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
}

.unlock-level {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e74c3c;
}

.select-btn {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.select-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.4);
}

.select-btn:disabled {
  background: #666;
  cursor: not-allowed;
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
