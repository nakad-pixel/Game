<template>
  <div id="game-app">
    <LoadingScreen v-if="uiStore.loading" />
    <GameCanvas v-show="!uiStore.loading" />
    <HUD v-show="!uiStore.loading" />
    <SettingsMenu v-if="uiStore.activeModal === 'settings'" />
    <ProgressionUI v-if="uiStore.activeModal === 'progression'" />
    <ShopMenu v-if="uiStore.activeModal === 'shop'" />
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
import LoadingScreen from '@/components/LoadingScreen.vue'
import GameCanvas from '@/components/GameCanvas.vue'
import HUD from '@/components/HUD.vue'
import SettingsMenu from '@/components/SettingsMenu.vue'
import ProgressionUI from '@/components/ProgressionUI.vue'
import ShopMenu from '@/components/ShopMenu.vue'
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

    combatSystem.update()
    renderingSystem.update(deltaTime)

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
