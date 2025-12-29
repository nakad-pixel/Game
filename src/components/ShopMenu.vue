<template>
  <div class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>Shop</h2>

      <div class="tabs">
        <button 
          class="tab" 
          :class="{ active: activeTab === 'gems' }"
          @click="activeTab = 'gems'"
        >
          💎 Gems
        </button>
        <button 
          class="tab" 
          :class="{ active: activeTab === 'boosts' }"
          @click="activeTab = 'boosts'"
        >
          ⚡ Boosts
        </button>
        <button 
          class="tab" 
          :class="{ active: activeTab === 'cosmetics' }"
          @click="activeTab = 'cosmetics'"
        >
          🎨 Cosmetics
        </button>
        <button 
          class="tab" 
          :class="{ active: activeTab === 'battlepass' }"
          @click="activeTab = 'battlepass'"
        >
          🎫 Battle Pass
        </button>
      </div>

      <div class="shop-content" v-if="activeTab === 'gems'">
        <div class="shop-item" v-for="pack in gemPacks" :key="pack.name">
          <div class="item-info">
            <div class="item-name">{{ pack.gems }} Gems</div>
            <div class="item-desc">{{ pack.name }}</div>
          </div>
          <button class="buy-btn" @click="purchaseGems(pack)">
            ${{ pack.price }}
          </button>
        </div>

        <div class="ad-section">
          <div class="ad-info">
            <div class="item-name">Watch Ad</div>
            <div class="item-desc">Get 5 free gems!</div>
          </div>
          <button class="watch-ad-btn" @click="watchAd">
            📺 Watch
          </button>
        </div>
      </div>

      <div class="shop-content" v-if="activeTab === 'boosts'">
        <div class="shop-item" v-for="boost in boosts" :key="boost.name">
          <div class="item-info">
            <div class="item-name">{{ boost.name }}</div>
            <div class="item-desc">{{ boost.description }}</div>
          </div>
          <button class="buy-btn" @click="purchaseBoost(boost)">
            {{ boost.gems }} 💎
          </button>
        </div>
      </div>

      <div class="shop-content" v-if="activeTab === 'cosmetics'">
        <div class="cosmetics-grid">
          <div class="cosmetic-card" v-for="skin in skins" :key="skin.id">
            <div class="cosmetic-preview">{{ skin.emoji }}</div>
            <div class="cosmetic-name">{{ skin.name }}</div>
            <button 
              class="buy-btn"
              :disabled="gameStore.monetization.ownedSkins.includes(skin.id)"
              @click="purchaseSkin(skin)"
            >
              {{ gameStore.monetization.ownedSkins.includes(skin.id) ? 'Owned' : `${skin.gems} 💎` }}
            </button>
          </div>
        </div>
      </div>

      <div class="shop-content" v-if="activeTab === 'battlepass'">
        <div class="battlepass-info">
          <h3>Premium Battle Pass</h3>
          <p>Unlock premium rewards for all 30 tiers!</p>
          <div class="battlepass-benefits">
            <div>✨ 30 Premium Rewards</div>
            <div>💎 Over 1,500 Gems Value</div>
            <div>🎨 Exclusive Skins</div>
            <div>⚡ Permanent Boosts</div>
          </div>
          <button 
            class="buy-battlepass-btn"
            :disabled="gameStore.monetization.battlePassPremium"
            @click="purchaseBattlePass"
          >
            {{ gameStore.monetization.battlePassPremium ? 'Already Owned' : 'Buy for $2.99' }}
          </button>
        </div>
      </div>

      <button class="close-btn" @click="close">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { useUIStore } from '@/stores/uiStore'

const gameStore = useGameStore()
const uiStore = useUIStore()
const activeTab = ref('gems')

const gemPacks = [
  { name: 'Starter Pack', gems: 100, price: 0.99 },
  { name: 'Growth Pack', gems: 500, price: 4.99 },
  { name: 'Value Pack', gems: 1200, price: 9.99 },
  { name: 'Mega Pack', gems: 3000, price: 19.99 },
]

const boosts = [
  { name: '2x Gold (1 Hour)', description: 'Double gold earnings', gems: 50, duration: 3600000 },
  { name: '2x XP (1 Hour)', description: 'Double XP gains', gems: 50, duration: 3600000 },
  { name: '2x All (2 Hours)', description: 'Double everything!', gems: 150, duration: 7200000 },
  { name: 'Trait Reroll', description: 'Reroll available traits', gems: 50, duration: 0 },
]

const skins = [
  { id: 'aura_blue', name: 'Blue Aura', emoji: '💙', gems: 200 },
  { id: 'aura_golden', name: 'Golden Aura', emoji: '⭐', gems: 300 },
  { id: 'aura_red', name: 'Red Aura', emoji: '❤️', gems: 200 },
  { id: 'theme_dark', name: 'Dark Theme', emoji: '🌑', gems: 150 },
  { id: 'theme_neon', name: 'Neon Theme', emoji: '🌈', gems: 250 },
  { id: 'ultimate_aura', name: 'Ultimate Aura', emoji: '✨', gems: 500 },
]

function purchaseGems(pack: any) {
  gameStore.player.gems += pack.gems
  gameStore.monetization.purchaseHistory.push({
    id: `purchase_${Date.now()}`,
    itemId: `gems_${pack.gems}`,
    timestamp: Date.now(),
    price: pack.price,
  })
  uiStore.addNotification(`Purchased ${pack.gems} gems!`, 'success')
}

function watchAd() {
  gameStore.watchAd()
  uiStore.addNotification('Earned 5 gems from ad!', 'success')
}

function purchaseBoost(boost: any) {
  if (gameStore.player.gems >= boost.gems) {
    gameStore.player.gems -= boost.gems
    
    if (boost.name.includes('Trait Reroll')) {
      gameStore.progression.traitRerollsAvailable++
    } else if (boost.name.includes('Gold')) {
      gameStore.player.goldMultiplier *= 2
      setTimeout(() => {
        gameStore.player.goldMultiplier /= 2
      }, boost.duration)
    } else if (boost.name.includes('XP')) {
      gameStore.player.xpMultiplier *= 2
      setTimeout(() => {
        gameStore.player.xpMultiplier /= 2
      }, boost.duration)
    } else if (boost.name.includes('All')) {
      gameStore.player.goldMultiplier *= 2
      gameStore.player.xpMultiplier *= 2
      setTimeout(() => {
        gameStore.player.goldMultiplier /= 2
        gameStore.player.xpMultiplier /= 2
      }, boost.duration)
    }
    
    uiStore.addNotification(`Purchased ${boost.name}!`, 'success')
  } else {
    uiStore.addNotification('Not enough gems!', 'error')
  }
}

function purchaseSkin(skin: any) {
  if (gameStore.player.gems >= skin.gems && !gameStore.monetization.ownedSkins.includes(skin.id)) {
    gameStore.player.gems -= skin.gems
    gameStore.monetization.ownedSkins.push(skin.id)
    gameStore.monetization.activeSkin = skin.id
    uiStore.addNotification(`Unlocked ${skin.name}!`, 'success')
  } else if (gameStore.player.gems < skin.gems) {
    uiStore.addNotification('Not enough gems!', 'error')
  }
}

function purchaseBattlePass() {
  if (!gameStore.monetization.battlePassPremium) {
    gameStore.monetization.battlePassPremium = true
    gameStore.monetization.purchaseHistory.push({
      id: `purchase_${Date.now()}`,
      itemId: 'battlepass',
      timestamp: Date.now(),
      price: 2.99,
    })
    uiStore.addNotification('Battle Pass activated!', 'success')
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
  max-width: 700px;
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
  overflow-x: auto;
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
  white-space: nowrap;
}

.tab.active {
  background: linear-gradient(135deg, #4a90e2, #3498db);
  color: white;
}

.shop-content {
  min-height: 300px;
}

.shop-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.2s;
}

.shop-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.item-info {
  flex: 1;
}

.item-name {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.item-desc {
  font-size: 0.9rem;
  color: #aaa;
}

.buy-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.buy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.4);
}

.buy-btn:disabled {
  background: #666;
  cursor: not-allowed;
  transform: none;
}

.ad-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.2), rgba(52, 152, 219, 0.2));
  border-radius: 8px;
  border: 2px solid #4a90e2;
}

.watch-ad-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.watch-ad-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(155, 89, 182, 0.4);
}

.cosmetics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.cosmetic-card {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  text-align: center;
  transition: all 0.2s;
}

.cosmetic-card:hover {
  background: rgba(255, 255, 255, 0.08);
}

.cosmetic-preview {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.cosmetic-name {
  font-weight: bold;
  margin-bottom: 0.75rem;
}

.battlepass-info {
  text-align: center;
  padding: 2rem;
}

.battlepass-info h3 {
  font-size: 1.5rem;
  color: #f39c12;
  margin-bottom: 1rem;
}

.battlepass-info p {
  color: #ccc;
  margin-bottom: 1.5rem;
}

.battlepass-benefits {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.battlepass-benefits div {
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.buy-battlepass-btn {
  width: 100%;
  padding: 1.25rem;
  background: linear-gradient(135deg, #f39c12, #e67e22);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.buy-battlepass-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(243, 156, 18, 0.4);
}

.buy-battlepass-btn:disabled {
  background: #666;
  cursor: not-allowed;
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
