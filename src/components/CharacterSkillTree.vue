<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { characterProgressionSystem } from '@/systems/CharacterProgressionSystem'
import { computed } from 'vue'

const gameStore = useGameStore()
const characterId = computed(() => gameStore.player.activeCharacterId)
const characterLevel = computed(() => gameStore.player.characterLevels[characterId.value] || 1)

const nodes = Array.from({ length: 15 }, (_, i) => ({
  id: `node_${i}`,
  name: `Talent ${i + 1}`,
  requirement: i * 5,
  unlocked: i * 5 <= characterLevel.value
}))

const unlockNode = (nodeId: string) => {
  characterProgressionSystem.unlockNode(characterId.value, nodeId)
}
</script>

<template>
  <div class="skill-tree">
    <h3>{{ characterId.toUpperCase() }} SKILL TREE</h3>
    <div class="nodes-grid">
      <div v-for="node in nodes" 
           :key="node.id" 
           class="node"
           :class="{ locked: !node.unlocked }"
           @click="node.unlocked && unlockNode(node.id)">
        <div class="node-icon">{{ node.name[0] }}</div>
        <div class="node-info">
          <div class="node-name">{{ node.name }}</div>
          <div class="node-req">Req: Lvl {{ node.requirement }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skill-tree {
  padding: 20px;
  background: #1a1a2e;
  color: white;
}

.nodes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 20px;
}

.node {
  background: #16213e;
  border: 1px solid #4a90e2;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.node.locked {
  opacity: 0.5;
  filter: grayscale(1);
  cursor: not-allowed;
}

.node-icon {
  width: 40px;
  height: 40px;
  background: #0f3460;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 5px;
}

.node-name {
  font-size: 12px;
  text-align: center;
}

.node-req {
  font-size: 10px;
  color: #e94560;
}
</style>
