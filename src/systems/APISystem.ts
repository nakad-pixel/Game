import { GameState } from '@/types/game'

/**
 * Handles backend connectivity and data synchronization.
 */
export class APISystem {
  private baseUrl: string = 'http://localhost:3001/api'
  private token: string | null = null

  async login(playerId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId })
      })
      const data = await response.json()
      this.token = data.token
      return data
    } catch (e) {
      console.error('API Login failed', e)
      return null
    }
  }

  async syncSave(state: GameState) {
    if (!this.token) return null
    try {
      const response = await fetch(`${this.baseUrl}/save/sync`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(state)
      })
      return await response.json()
    } catch (e) {
      console.error('API Save sync failed', e)
      return null
    }
  }

  async getLeaderboard(limit: number = 50) {
    try {
      const response = await fetch(`${this.baseUrl}/leaderboard?limit=${limit}`)
      return await response.json()
    } catch (e) {
      console.error('API Fetch leaderboard failed', e)
      return []
    }
  }

  async trackAnalytics(event: any) {
    try {
      await fetch(`${this.baseUrl}/analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      })
    } catch (e) {
      // Silently fail analytics
    }
  }
}

export const apiSystem = new APISystem()
