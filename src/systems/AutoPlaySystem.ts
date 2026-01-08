import { useGameStore } from '@/stores/gameStore'

/**
 * Handles idling mechanics and background progression.
 */
export class AutoPlaySystem {
  private gameStore: any
  private lastTick: number = Date.now()
  private autoAscendThreshold: number = 0

  init() {
    this.gameStore = useGameStore()
  }

  update() {
    if (!this.gameStore) return

    const now = Date.now()
    const dt = now - this.lastTick
    this.lastTick = now

    if (this.gameStore.combat.combatActive) {
      // Background combat logic is mostly handled by gameStore.updateCombat
      // but we could add auto-skills here
      this.handleAutoSkills()
    }

    if (this.autoAscendThreshold > 0 && this.gameStore.combat.waveNumber >= this.autoAscendThreshold) {
      this.gameStore.ascend()
    }
  }

  private handleAutoSkills() {
    // If auto-skill is enabled, use skills when off cooldown
    const unlockedSkills = this.gameStore.skills.unlockedSkills
    unlockedSkills.forEach((skillId: string) => {
      if (this.gameStore.skills.skillCooldowns[skillId] === 0) {
        // Trigger skill use
        console.log(`Auto-using skill: ${skillId}`)
      }
    })
  }

  setAutoAscend(wave: number) {
    this.autoAscendThreshold = wave
  }

  getOfflineEarnings() {
    // Already partially handled in gameStore, but could be enhanced here
  }
}

export const autoPlaySystem = new AutoPlaySystem()
