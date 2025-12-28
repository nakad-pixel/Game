import { useGameStore } from '@/stores/gameStore'
import { useUIStore } from '@/stores/uiStore'
import { calculateAscensionCost } from '@/utils/formulas'

export class ProgressionSystem {
  private gameStore: any
  private uiStore: any

  init() {
    this.gameStore = useGameStore()
    this.uiStore = useUIStore()
  }

  canAscend(): boolean {
    const cost = calculateAscensionCost(this.gameStore.progression.totalAscensions)
    return this.gameStore.player.gold >= cost && this.gameStore.player.level >= 50
  }

  performAscension() {
    if (!this.canAscend()) return

    const cost = calculateAscensionCost(this.gameStore.progression.totalAscensions)
    this.gameStore.player.gold -= cost
    this.gameStore.ascend()
    
    this.uiStore.addNotification(`Ascended! Multiplier: ${this.gameStore.progression.ascensionMultiplier.toFixed(2)}x`, 'success')
  }

  unlockCharacter(characterId: string) {
    if (!this.gameStore.player.unlockedCharacters.includes(characterId)) {
      this.gameStore.player.unlockedCharacters.push(characterId)
      this.gameStore.player.characterLevels[characterId] = 1
      this.uiStore.addNotification(`Unlocked character: ${characterId}`, 'success')
    }
  }

  switchCharacter(characterId: string) {
    if (this.gameStore.player.unlockedCharacters.includes(characterId)) {
      this.gameStore.player.activeCharacterId = characterId
      this.uiStore.addNotification(`Switched to ${characterId}`, 'info')
    }
  }

  rerollTraits() {
    if (this.gameStore.progression.traitRerollsAvailable > 0) {
      this.gameStore.progression.traitRerollsAvailable--
      this.gameStore.unlockRandomTraits()
      this.uiStore.addNotification('Traits rerolled!', 'success')
    }
  }
}

export const progressionSystem = new ProgressionSystem()
