import { defineStore } from 'pinia'

interface DamageNumber {
  id: string
  damage: number
  x: number
  y: number
  isCrit: boolean
  timestamp: number
}

export interface Notification {
  id: string
  title?: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error' | 'achievement'
  timestamp: number
  duration: number
}

interface UIState {
  activeModal: string | null
  damageNumbers: DamageNumber[]
  notifications: Notification[]
  loading: boolean
  fps: number
  showDebug: boolean
}

export const useUIStore = defineStore('ui', {
  state: (): UIState => ({
    activeModal: null,
    damageNumbers: [],
    notifications: [],
    loading: true,
    fps: 60,
    showDebug: false,
  }),

  actions: {
    openModal(modalName: string) {
      this.activeModal = modalName
    },

    closeModal() {
      this.activeModal = null
    },

    addDamageNumber(damage: number, x: number, y: number, isCrit: boolean = false) {
      const damageNumber: DamageNumber = {
        id: `dmg_${Date.now()}_${Math.random()}`,
        damage,
        x,
        y,
        isCrit,
        timestamp: Date.now(),
      }
      this.damageNumbers.push(damageNumber)

      setTimeout(() => {
        this.damageNumbers = this.damageNumbers.filter(d => d.id !== damageNumber.id)
      }, 1000)
    },

    addNotification(notificationData: Omit<Notification, 'id' | 'timestamp'>) {
      const notification: Notification = {
        id: `notif_${Date.now()}_${Math.random()}`,
        ...notificationData,
        timestamp: Date.now(),
      }
      this.notifications.push(notification)

      setTimeout(() => {
        this.notifications = this.notifications.filter(n => n.id !== notification.id)
      }, notification.duration || 3000)
    },

    setLoading(loading: boolean) {
      this.loading = loading
    },

    updateFPS(fps: number) {
      this.fps = fps
    },

    toggleDebug() {
      this.showDebug = !this.showDebug
    },
  },
})
