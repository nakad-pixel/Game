import { useGameStore } from '@/stores/gameStore'
import battlePassData from '@/data/battlepass.json'

/**
 * Manages tiered seasonal rewards and progression.
 */
export class BattlePassSystem {
  private gameStore: any

  init() {
    this.gameStore = useGameStore()
  }

  addXP(amount: number) {
    if (!this.gameStore) return

    // Using player XP for BP progress for simplicity, or we could have a separate BP XP
    // For now, let's just use a virtual BP XP
    console.log(`Battle Pass gained ${amount} XP`)
    this.checkTierUp()
  }

  private checkTierUp() {
    const currentTier = this.gameStore.monetization.battlePassTier
    const nextTierData = battlePassData.find(t => t.tier === currentTier + 1)
    
    if (nextTierData && this.gameStore.player.xp >= nextTierData.xpRequired) {
      this.gameStore.monetization.battlePassTier++
      console.log(`Battle Pass tier up: ${this.gameStore.monetization.battlePassTier}`)
    }
  }

  claimReward(tier: number, isPremium: boolean) {
    const tierData = battlePassData.find(t => t.tier === tier)
    if (!tierData) return

    if (tier <= this.gameStore.monetization.battlePassTier) {
      const reward = isPremium ? tierData.premiumReward : tierData.freeReward
      this.applyReward(reward)
    }
  }

  private applyReward(reward: any) {
    console.log(`Claimed BP reward: ${reward.type} ${reward.value}`)
    // Apply reward to store
  }

  unlockPremium() {
    this.gameStore.monetization.battlePassPremium = true
  }
}

export const battlePassSystem = new BattlePassSystem()
