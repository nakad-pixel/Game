import { useGameStore } from '@/stores/gameStore'
import { analyticsSystem } from './AnalyticsSystem'

/**
 * Handles rewarded video and interstitial ad integration.
 */
export class AdvertisementSystem {
  private gameStore: any
  private adReady: boolean = true

  init() {
    this.gameStore = useGameStore()
  }

  async showRewardedVideo(placement: string): Promise<boolean> {
    if (!this.adReady) return false

    console.log(`Showing rewarded video for: ${placement}`)
    
    // Mock ad playback
    return new Promise((resolve) => {
      setTimeout(() => {
        this.handleAdReward(placement)
        analyticsSystem.trackEvent('ad_watched', { placement })
        resolve(true)
      }, 2000)
    })
  }

  private handleAdReward(placement: string) {
    if (!this.gameStore) return

    switch (placement) {
      case 'double_gold':
        this.gameStore.player.gold *= 2
        break
      case 'gems_reward':
        this.gameStore.player.gems += 10
        break
      case 'xp_boost':
        this.gameStore.player.xpMultiplier *= 2
        // Should have a timer to revert boost
        break
    }
    
    this.gameStore.monetization.adWatchCount++
    this.gameStore.monetization.lastAdWatchTime = Date.now()
  }

  isAdAvailable(): boolean {
    return this.adReady && (Date.now() - this.gameStore.monetization.lastAdWatchTime > 60000)
  }
}

export const advertisementSystem = new AdvertisementSystem()
