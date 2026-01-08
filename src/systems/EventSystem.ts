import { useGameStore } from '@/stores/gameStore'
import eventsData from '@/data/events.json'
import { GameEvent } from '@/types/game'

/**
 * Handles rotating game events and applying their multipliers.
 */
export class EventSystem {
  private gameStore: any
  private rotationInterval = 604800000 // 7 days in milliseconds

  init() {
    this.gameStore = useGameStore()
  }

  update() {
    if (!this.gameStore) return

    const now = Date.now()
    if (!this.gameStore.events.activeEvent || now >= this.gameStore.events.eventEndTime) {
      this.rotateEvent()
    }
    this.updateProgress()
  }

  /**
   * Rotates to the next event based on the current week.
   */
  private rotateEvent() {
    const eventIndex = Math.floor(Date.now() / this.rotationInterval) % eventsData.length
    const nextEvent = eventsData[eventIndex] as GameEvent
    
    this.gameStore.events.activeEvent = nextEvent
    this.gameStore.events.eventStartTime = Date.now()
    this.gameStore.events.eventEndTime = this.gameStore.events.eventStartTime + nextEvent.duration
    this.gameStore.events.eventProgress = 0
    
    console.log(`New event started: ${nextEvent.name}`)
  }

  /**
   * Updates the progress percentage of the current event.
   */
  private updateProgress() {
    if (!this.gameStore.events.activeEvent) return
    
    const elapsed = Date.now() - this.gameStore.events.eventStartTime
    const duration = this.gameStore.events.activeEvent.duration
    this.gameStore.events.eventProgress = Math.min(100, (elapsed / duration) * 100)
  }

  /**
   * Gets current multiplier for a specific reward type.
   */
  getMultiplier(type: 'gold' | 'xp' | 'damage'): number {
    if (!this.gameStore.events.activeEvent) return 1
    return this.gameStore.events.activeEvent.multipliers[type] || 1
  }
}

export const eventSystem = new EventSystem()
