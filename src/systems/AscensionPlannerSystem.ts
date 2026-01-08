import { useGameStore } from '@/stores/gameStore'
import { calculateAscensionMultiplier } from '@/utils/formulas'

/**
 * Provides strategic tools and calculators for optimal progression.
 */
export class AscensionPlannerSystem {
  private gameStore: any

  init() {
    this.gameStore = useGameStore()
  }

  calculateProjectedMultiplier(): number {
    if (!this.gameStore) return 1
    const nextTotal = this.gameStore.progression.totalAscensions + 1
    return calculateAscensionMultiplier(nextTotal)
  }

  getRecommendedWave(): number {
    if (!this.gameStore) return 100
    // Simple recommendation: current max wave + 10%
    return Math.floor(this.gameStore.combat.waveNumber * 1.1)
  }

  getOptimalTraits(): string[] {
    // Return trait IDs that would benefit current build most
    return ['damage_boost_1', 'gold_rush_1']
  }

  getTimeUntilAscension(): number {
    // Estimate time in milliseconds until recommended ascension point
    return 600000 // 10 minutes
  }
}

export const ascensionPlannerSystem = new AscensionPlannerSystem()
