<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { clanSystem } from '@/systems/ClanSystem'
import { ref, computed } from 'vue'

const gameStore = useGameStore()
const clanId = computed(() => gameStore.clans.currentClanId)
const newClanName = ref('')

const createClan = () => {
  if (newClanName.value) {
    clanSystem.createClan(newClanName.value)
  }
}
</script>

<template>
  <div class="clan-panel">
    <div v-if="!clanId" class="no-clan">
      <h3>JOIN A CLAN</h3>
      <p>Clans give you global boosts and shared rewards!</p>
      <div class="create-form">
        <input v-model="newClanName" placeholder="Clan Name..." />
        <button @click="createClan">CREATE (10,000 Gold)</button>
      </div>
    </div>
    <div v-else class="clan-info">
      <h3>{{ gameStore.clans.clanName }}</h3>
      <div class="stats">
        <div>Role: {{ gameStore.clans.role }}</div>
        <div>Members: {{ gameStore.clans.members.length }} / 50</div>
      </div>
      <div class="perks">
        <h4>Active Perks</h4>
        <ul>
          <li>Gold Boost: +5%</li>
          <li>XP Boost: +5%</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clan-panel {
  padding: 20px;
  background: #1a1a2e;
  color: white;
  border-radius: 8px;
}

.create-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #4a90e2;
  background: #16213e;
  color: white;
}

button {
  background: #4a90e2;
  border: none;
  padding: 10px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.clan-info .stats {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
  background: #16213e;
  padding: 10px;
  border-radius: 6px;
}
</style>
