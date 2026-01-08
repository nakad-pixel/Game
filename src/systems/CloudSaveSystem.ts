import { useGameStore } from '@/stores/gameStore'
import { apiSystem } from './APISystem'
import { CloudSave } from '@/types/game'

/**
 * Handles cross-device synchronization and backups.
 */
export class CloudSaveSystem {
  private gameStore: any
  private lastSync: number = 0
  private syncInterval: number = 300000 // 5 minutes

  init() {
    this.gameStore = useGameStore()
  }

  async sync() {
    if (!this.gameStore || !this.gameStore.meta.cloudsyncEnabled) return

    const now = Date.now()
    if (now - this.lastSync < this.syncInterval) return

    const cloudSave: CloudSave = {
      userId: this.gameStore.player.id,
      gameState: this.gameStore.$state,
      timestamp: now,
      version: this.gameStore.meta.saveVersion
    }

    const success = await apiSystem.syncSave(this.gameStore.$state)
    if (success) {
      this.lastSync = now
      this.gameStore.meta.lastCloudSyncTime = now
      console.log('Cloud sync successful')
    }
  }

  async restore() {
    // Logic to fetch from API and update store
  }

  resolveConflict(local: any, remote: any) {
    // Choose the save with more progress (e.g. higher level or more gold)
    return remote.player.level > local.player.level ? remote : local
  }
}

export const cloudSaveSystem = new CloudSaveSystem()
