import { useGameStore } from '@/stores/gameStore'
import { LeaderboardEntry } from '@/types/game'

/**
 * Manages player rankings and competition.
 */
export class LeaderboardSystem {
  private gameStore: any
  private localLeaderboard: LeaderboardEntry[] = []

  init() {
    this.gameStore = useGameStore()
    this.loadLocalLeaderboard()
  }

  private loadLocalLeaderboard() {
    const saved = localStorage.getItem('idle_anime_leaderboard')
    if (saved) {
      this.localLeaderboard = JSON.parse(saved)
    }
  }

  private saveLocalLeaderboard() {
    localStorage.setItem('idle_anime_leaderboard', JSON.stringify(this.localLeaderboard))
  }

  submitScore(score: number) {
    if (!this.gameStore) return

    const entry: LeaderboardEntry = {
      playerId: this.gameStore.player.id,
      playerName: 'Player',
      score: score,
      rank: 0,
      timestamp: Date.now()
    }

    this.localLeaderboard.push(entry)
    this.localLeaderboard.sort((a, b) => b.score - a.score)
    this.localLeaderboard = this.localLeaderboard.slice(0, 100)
    
    // Update ranks
    this.localLeaderboard.forEach((e, i) => e.rank = i + 1)
    
    this.saveLocalLeaderboard()
  }

  getLeaderboard(): LeaderboardEntry[] {
    return this.localLeaderboard
  }

  getPlayerRank(): number {
    const entry = this.localLeaderboard.find(e => e.playerId === this.gameStore?.player.id)
    return entry ? entry.rank : -1
  }

  async fetchGlobalLeaderboard(): Promise<LeaderboardEntry[]> {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.localLeaderboard)
      }, 500)
    })
  }
}

export const leaderboardSystem = new LeaderboardSystem()
