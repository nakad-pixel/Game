import { useGameStore } from '@/stores/gameStore'

/**
 * Experimentation framework for testing game balance and features.
 */
export class ABTestingSystem {
  private gameStore: any
  private variants: Record<string, string> = {}

  init() {
    this.gameStore = useGameStore()
    this.assignVariants()
  }

  private assignVariants() {
    if (!this.gameStore) return

    // Consistent bucketing based on player ID
    const playerId = this.gameStore.player.id
    const bucket = this.getBucket(playerId)

    this.variants['tutorial_v2'] = bucket < 50 ? 'A' : 'B'
    this.variants['reward_multiplier'] = bucket < 33 ? 'control' : (bucket < 66 ? 'high' : 'ultra')
    
    console.log('[ABTesting] Assigned variants:', this.variants)
  }

  private getBucket(id: string): number {
    let hash = 0
    for (let i = 0; i < id.length; i++) {
      hash = (hash << 5) - hash + id.charCodeAt(i)
      hash |= 0
    }
    return Math.abs(hash % 100)
  }

  getVariant(testName: string): string {
    return this.variants[testName] || 'control'
  }

  isFeatureEnabled(featureName: string): boolean {
    const variant = this.getVariant(featureName)
    return variant !== 'control' && variant !== 'B'
  }
}

export const abTestingSystem = new ABTestingSystem()
