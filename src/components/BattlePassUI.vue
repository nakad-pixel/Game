<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { battlePassSystem } from '@/systems/BattlePassSystem'
import battlePassData from '@/data/battlepass.json'
import { computed } from 'vue'

const gameStore = useGameStore()
const currentTier = computed(() => gameStore.monetization.battlePassTier)
const isPremium = computed(() => gameStore.monetization.battlePassPremium)

const claim = (tier: number, premium: boolean) => {
  battlePassSystem.claimReward(tier, premium)
}
</script>

<template>
  <div class="battle-pass">
    <div class="bp-header">
      <h2>SEASON 1 PASS</h2>
      <div v-if="!isPremium" class="premium-upsell">
        <button @click="battlePassSystem.unlockPremium()">UNLOCK PREMIUM</button>
      </div>
    </div>

    <div class="tiers-list">
      <div v-for="tier in battlePassData" :key="tier.tier" class="tier-item" :class="{ unlocked: tier.tier <= currentTier }">
        <div class="tier-number">Tier {{ tier.tier }}</div>
        <div class="rewards">
          <div class="reward free">
            <span>Free: {{ tier.freeReward.type }}</span>
            <button v-if="tier.tier <= currentTier" @click="claim(tier.tier, false)">CLAIM</button>
          </div>
          <div class="reward premium" :class="{ locked: !isPremium }">
            <span>Premium: {{ tier.premiumReward.type }}</span>
            <button v-if="tier.tier <= currentTier && isPremium" @click="claim(tier.tier, true)">CLAIM</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.battle-pass {
  padding: 20px;
  background: #1a1a2e;
  color: white;
}

.bp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.premium-upsell button {
  background: #ffd700;
  color: #000;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.tiers-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tier-item {
  background: #16213e;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #333;
}

.tier-item.unlocked {
  border-color: #4a90e2;
}

.rewards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
}

.reward {
  background: #0f3460;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reward.premium {
  border: 1px solid #ffd700;
}

.reward.premium.locked {
  opacity: 0.5;
}

button {
  margin-top: 5px;
  background: #4a90e2;
  border: none;
  padding: 5px 10px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
</style>
