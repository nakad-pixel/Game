import { useUIStore } from '@/stores/uiStore'

/**
 * Manages game notifications and Toast UI state.
 */
export class NotificationSystem {
  private uiStore: any

  init() {
    this.uiStore = useUIStore()
  }

  notify(title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' | 'achievement' = 'info', duration: number = 3000) {
    if (this.uiStore) {
      this.uiStore.addNotification({ title, message, type, duration })
    }
  }

  success(title: string, message: string) {
    this.notify(title, message, 'success', 3000)
  }

  error(title: string, message: string) {
    this.notify(title, message, 'error', 5000)
  }

  achievement(name: string) {
    this.notify('Achievement Unlocked!', name, 'achievement', 4000)
  }

  info(title: string, message: string) {
    this.notify(title, message, 'info', 3000)
  }
}

export const notificationSystem = new NotificationSystem()
