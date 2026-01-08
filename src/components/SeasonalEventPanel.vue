<script setup lang="ts">
import { seasonalEventSystem } from '@/systems/SeasonalEventSystem'
import { computed } from 'vue'

const season = computed(() => seasonalEventSystem.getCurrentSeason())
const cosmetics = computed(() => seasonalEventSystem.getSeasonalCosmetics())
</script>

<template>
  <div class="seasonal-event">
    <h2>{{ season }} EVENT</h2>
    <div class="seasonal-desc">
      Limited time items and exclusive rewards!
    </div>
    
    <div class="seasonal-items">
      <h3>EXCLUSIVE ITEMS</h3>
      <div class="items-grid">
        <div v-for="item in cosmetics" :key="item.id" class="seasonal-item">
          <div class="item-icon">❄️</div>
          <div class="item-name">{{ item.name }}</div>
          <div class="item-price">{{ item.price }} Gems</div>
          <button>PURCHASE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.seasonal-event {
  padding: 20px;
  background: linear-gradient(to bottom, #1a1a2e, #0f3460);
  color: white;
  border-radius: 12px;
  text-align: center;
}

.seasonal-desc {
  margin: 10px 0 20px;
  font-style: italic;
  color: #4a90e2;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.seasonal-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  border: 1px solid rgba(74, 144, 226, 0.3);
}

.item-icon {
  font-size: 32px;
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
  background: #e94560;
  border: none;
  padding: 8px 16px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
</style>
