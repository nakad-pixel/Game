import { useGameStore } from '@/stores/gameStore'
import { AnalyticsEvent } from '@/types/game'

/**
 * Tracks player behavior and game metrics.
 */
export class AnalyticsSystem {
  private gameStore: any
  private sessionId: string = `session_${Date.now()}`

  init() {
    this.gameStore = useGameStore()
    this.trackEvent('session_start', { version: '1.0.0' })
  }

  trackEvent(eventName: string, properties: Record<string, any> = {}) {
    const event: AnalyticsEvent = {
      eventName,
      timestamp: Date.now(),
      properties,
      sessionId: this.sessionId
    }

    console.log(`[Analytics] ${eventName}`, properties)
    
    // In production, send to API
    // apiSystem.trackAnalytics(event)
  }

  trackLevelUp(level: number) {
    this.trackEvent('level_up', { level })
  }

  trackPurchase(productId: string, price: number) {
    this.trackEvent('purchase', { productId, price })
  }

  trackAscension(count: number) {
    this.trackEvent('ascension', { total: count })
  }
}

export const analyticsSystem = new AnalyticsSystem()
