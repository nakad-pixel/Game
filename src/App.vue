<template>
  <div id="game-app">
    <LoadingScreen v-if="uiStore.loading" />
    <GameCanvas v-show="!uiStore.loading" />
    <HUD v-show="!uiStore.loading" />
    <SettingsMenu v-if="uiStore.activeModal === 'settings'" />
    <ProgressionUI v-if="uiStore.activeModal === 'progression'" />
    <ShopMenu v-if="uiStore.activeModal === 'shop'" />
    <SocialMenu v-if="uiStore.activeModal === 'social'" />
    <CharacterSelect v-if="uiStore.activeModal === 'characters'" />
    <AchievementGrid v-if="uiStore.activeModal === 'achievements'" />
    <NotificationContainer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { useUIStore } from '@/stores/uiStore'
import { renderingSystem } from '@/systems/RenderingSystem'
import { combatSystem } from '@/systems/CombatSystem'
import { persistenceSystem } from '@/systems/PersistenceSystem'
import { progressionSystem } from '@/systems/ProgressionSystem'
import { eventSystem } from '@/systems/EventSystem'
import { audioSystem } from '@/systems/AudioSystem'
import { particleSystem } from '@/systems/ParticleSystem'
import { notificationSystem } from '@/systems/NotificationSystem'
import { leaderboardSystem } from '@/systems/LeaderboardSystem'
import { skillSystem } from '@/systems/SkillSystem'
import { characterProgressionSystem } from '@/systems/CharacterProgressionSystem'
import { prestigeSystem } from '@/systems/PrestigeSystem'
import { cosmeticSystem } from '@/systems/CosmeticSystem'
import { questSystem } from '@/systems/QuestSystem'
import { clanSystem } from '@/systems/ClanSystem'
import { battlePassSystem } from '@/systems/BattlePassSystem'
import { limitedOfferSystem } from '@/systems/LimitedOfferSystem'
import { advertisementSystem } from '@/systems/AdvertisementSystem'
import { purchaseSystem } from '@/systems/PurchaseSystem'
import { analyticsSystem } from '@/systems/AnalyticsSystem'
import { abTestingSystem } from '@/systems/ABTestingSystem'
import { autoPlaySystem } from '@/systems/AutoPlaySystem'
import { cloudSaveSystem } from '@/systems/CloudSaveSystem'
import { socialSystem } from '@/systems/SocialSystem'
import { prestigeChallengeSystem } from '@/systems/PrestigeChallengeSystem'
import { seasonalEventSystem } from '@/systems/SeasonalEventSystem'
import LoadingScreen from '@/components/LoadingScreen.vue'
import GameCanvas from '@/components/GameCanvas.vue'
import HUD from '@/components/HUD.vue'
import SettingsMenu from '@/components/SettingsMenu.vue'
import ProgressionUI from '@/components/ProgressionUI.vue'
import ShopMenu from '@/components/ShopMenu.vue'
import SocialMenu from '@/components/SocialMenu.vue'
import CharacterSelect from '@/components/CharacterSelect.vue'
import AchievementGrid from '@/components/AchievementGrid.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'

const gameStore = useGameStore()
const uiStore = useUIStore()

let gameLoopId: number | null = null
let lastTime = 0
let fpsCounter = 0
let fpsLastCheck = Date.now()

onMounted(async () => {
  persistenceSystem.init()
  persistenceSystem.load()
  
  gameStore.initGame()
  combatSystem.init()
  progressionSystem.init()
  
  // Initialize new systems
  eventSystem.init()
  audioSystem.init()
  particleSystem.init()
  notificationSystem.init()
  leaderboardSystem.init()
  skillSystem.init()
  characterProgressionSystem.init()
  prestigeSystem.init()
  cosmeticSystem.init()
  questSystem.init()
  clanSystem.init()
  battlePassSystem.init()
  limitedOfferSystem.init()
  advertisementSystem.init()
  purchaseSystem.init()
  analyticsSystem.init()
  abTestingSystem.init()
  autoPlaySystem.init()
  cloudSaveSystem.init()
  socialSystem.init()
  prestigeChallengeSystem.init()
  seasonalEventSystem.init()

  setTimeout(() => {
    uiStore.setLoading(false)
  }, 1000)

  startGameLoop()
})

onUnmounted(() => {
  if (gameLoopId) {
    cancelAnimationFrame(gameLoopId)
  }
  persistenceSystem.save()
  persistenceSystem.destroy()
})

function startGameLoop() {
  const loop = (currentTime: number) => {
    gameLoopId = requestAnimationFrame(loop)

    const deltaTime = currentTime - lastTime
    lastTime = currentTime

    // Update systems
    eventSystem.update()
    combatSystem.update()
    renderingSystem.update(deltaTime)
    particleSystem.update(deltaTime)
    skillSystem.update(deltaTime)
    limitedOfferSystem.update()
    autoPlaySystem.update()
    cloudSaveSystem.sync()

    fpsCounter++
    if (Date.now() - fpsLastCheck >= 1000) {
      uiStore.updateFPS(fpsCounter)
      fpsCounter = 0
      fpsLastCheck = Date.now()
    }
  }

  gameLoopId = requestAnimationFrame(loop)
}
</script>

<style scoped>
#game-app {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>
