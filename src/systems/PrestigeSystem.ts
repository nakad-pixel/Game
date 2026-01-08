import { useGameStore } from '@/stores/gameStore'
import { PrestigeTier } from '@/types/game'

/**
 * Multi-layer progression system beyond standard ascension.
 */
export class PrestigeSystem {
  private gameStore: any
  private tiers: PrestigeTier[] = [
    { id: 0, name: 'Ascension', multiplier: 1.5, unlockRequirement: 0 },
    { id: 1, name: 'Legendary', multiplier: 3, unlockRequirement: 10 },
    { id: 2, name: 'Mythic', multiplier: 10, unlockRequirement: 25 },
    { id: 3, name: 'Divine', multiplier: 50, unlockRequirement: 50 },
    { id: 4, name: 'Transcendent', multiplier: 250, unlockRequirement: 100 }
  ]

  init() {
    this.gameStore = useGameStore()
  }

  canPrestigeNext(): boolean {
    if (!this.gameStore) return false
    const currentLayer = this.gameStore.progression.currentPrestigeLayer
    if (currentLayer >= this.tiers.length - 1) return false
    
    const nextTier = this.tiers[currentLayer + 1]
    return this.gameStore.progression.totalAscensions >= nextTier.unlockRequirement
  }

  prestige() {
    if (!this.canPrestigeNext()) return

    this.gameStore.progression.currentPrestigeLayer++
    const newTier = this.tiers[this.gameStore.progression.currentPrestigeLayer]
    
    // Add multiplier for this layer
    this.gameStore.progression.prestigeMultipliers[newTier.name] = newTier.multiplier
    
    // Reset standard progression
    this.gameStore.ascend()
    
    console.log(`Prestiged to ${newTier.name} tier!`)
  }

  getTotalPrestigeMultiplier(): number {
    if (!this.gameStore) return 1
    let total = 1
    Object.values(this.gameStore.progression.prestigeMultipliers).forEach((m: any) => {
      total *= m
    })
    return total
  }
}

export const prestigeSystem = new PrestigeSystem()
