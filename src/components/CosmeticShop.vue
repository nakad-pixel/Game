<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { cosmeticSystem } from '@/systems/CosmeticSystem'
import cosmeticsData from '@/data/cosmetics.json'
import catalogData from '@/data/cosmetics-catalog.json'
import { computed } from 'vue'

const gameStore = useGameStore()
const ownedSkins = computed(() => gameStore.monetization.ownedSkins)

const isOwned = (id: string) => ownedSkins.value.includes(id)

const buy = (id: string, price: number) => {
  cosmeticSystem.buySkin(id, price)
}

const equip = (id: string) => {
  cosmeticSystem.equipSkin(id)
}
</script>

<template>
  <div class="cosmetic-shop">
    <h3>COSMETICS</h3>
    <div class="tabs">
      <button class="active">SKINS</button>
      <button>PETS</button>
      <button>AURAS</button>
    </div>
    <div class="item-grid">
      <div v-for="item in cosmeticsData" :key="item.id" class="item-card">
        <div class="item-icon">{{ item.name[0] }}</div>
        <div class="item-name">{{ item.name }}</div>
        <div v-if="isOwned(item.id)" class="action">
          <button v-if="gameStore.monetization.activeSkin !== item.id" @click="equip(item.id)">EQUIP</button>
          <span v-else class="equipped">EQUIPPED</span>
        </div>
        <div v-else class="action">
          <button @click="buy(item.id, 100)">BUY (100 Gems)</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cosmetic-shop {
  padding: 15px;
  background: #16213e;
  border-radius: 8px;
  color: white;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 15px;
}

.item-card {
  background: #1a1a2e;
  padding: 10px;
  border-radius: 6px;
  text-align: center;
}

.item-icon {
  width: 50px;
  height: 50px;
  margin: 0 auto 10px;
  background: #0f3460;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 50%;
}

button {
  background: #4a90e2;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.equipped {
  color: #ffd700;
  font-weight: bold;
}
</style>
