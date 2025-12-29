import { useGameStore } from '@/stores/gameStore'
import { GAME_CONFIG } from '@/utils/constants'

export class PersistenceSystem {
  private autoSaveInterval: number | null = null
  private gameStore: any

  init() {
    this.gameStore = useGameStore()
    this.startAutoSave()
  }

  startAutoSave() {
    this.autoSaveInterval = window.setInterval(() => {
      this.save()
    }, GAME_CONFIG.AUTOSAVE_INTERVAL)
  }

  save() {
    if (this.gameStore) {
      this.gameStore.saveGame()
      console.log('[Persistence] Game saved')
    }
  }

  load() {
    if (this.gameStore) {
      this.gameStore.loadGame()
      console.log('[Persistence] Game loaded')
    }
  }

  destroy() {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval)
    }
  }
}

export const persistenceSystem = new PersistenceSystem()
