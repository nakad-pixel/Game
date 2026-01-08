import { useGameStore } from '@/stores/gameStore'
import questsData from '@/data/quests.json'
import { Quest } from '@/types/game'

/**
 * Manages daily and weekly tasks.
 */
export class QuestSystem {
  private gameStore: any

  init() {
    this.gameStore = useGameStore()
    this.checkQuestRefresh()
  }

  updateProgress(type: string, amount: number) {
    if (!this.gameStore) return

    const activeQuests = [...this.gameStore.quests.dailyQuests, ...this.gameStore.quests.weeklyQuests]
    activeQuests.forEach(quest => {
      if (!quest.completed && quest.condition.type === type) {
        quest.progress += amount
        if (quest.progress >= quest.condition.target) {
          quest.completed = true
          console.log(`Quest completed: ${quest.name}`)
        }
      }
    })
  }

  claimReward(questId: string) {
    if (!this.gameStore) return

    const allQuests = [...this.gameStore.quests.dailyQuests, ...this.gameStore.quests.weeklyQuests]
    const quest = allQuests.find(q => q.id === questId)
    
    if (quest && quest.completed && !quest.claimed) {
      this.applyReward(quest.reward)
      quest.claimed = true
    }
  }

  private applyReward(reward: any) {
    switch (reward.type) {
      case 'gold':
        this.gameStore.player.gold += reward.value
        break
      case 'gems':
        this.gameStore.player.gems += reward.value
        break
      // other rewards...
    }
  }

  private checkQuestRefresh() {
    const today = new Date().toISOString().split('T')[0]
    if (this.gameStore.quests.lastRefreshDate !== today) {
      this.refreshQuests()
      this.gameStore.quests.lastRefreshDate = today
    }
  }

  private refreshQuests() {
    this.gameStore.quests.dailyQuests = (questsData as any[])
      .filter(q => q.type === 'daily')
      .map(q => ({ ...q, progress: 0, completed: false, claimed: false }))
    
    // Weekly refresh logic would check the week number
  }
}

export const questSystem = new QuestSystem()
