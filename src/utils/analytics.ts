import { AnalyticsEvent } from '@/types/game'
import { ANALYTICS_EVENTS } from './constants'

class AnalyticsSystem {
  private events: AnalyticsEvent[] = []
  private sessionId: string = ''
  private enabled: boolean = true

  init(): void {
    this.sessionId = this.generateSessionId()
    this.trackEvent(ANALYTICS_EVENTS.SESSION_START, {})
  }

  trackEvent(eventName: string, properties: Record<string, any>): void {
    if (!this.enabled) return

    const event: AnalyticsEvent = {
      eventName,
      timestamp: Date.now(),
      properties,
      sessionId: this.sessionId,
    }

    this.events.push(event)
    
    if (this.events.length > 100) {
      this.flushEvents()
    }
  }

  private async flushEvents(): Promise<void> {
    if (this.events.length === 0) return

    const eventsToSend = [...this.events]
    this.events = []

    try {
      console.log('[Analytics] Flushing events:', eventsToSend.length)
    } catch (error) {
      console.error('[Analytics] Failed to send events:', error)
      this.events.push(...eventsToSend)
    }
  }

  private generateSessionId(): string {
    return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }

  getSessionId(): string {
    return this.sessionId
  }

  disable(): void {
    this.enabled = false
  }

  enable(): void {
    this.enabled = true
  }
}

export const analytics = new AnalyticsSystem()
