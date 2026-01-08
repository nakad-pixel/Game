import { useGameStore } from '@/stores/gameStore'
import { skillSystem } from '@/systems/SkillSystem'
import { questSystem } from '@/systems/QuestSystem'

/**
 * Debugging and testing utilities for developers.
 */
export const testUtils = {
  addGold: (amount: number) => {
    const store = useGameStore()
    store.player.gold += amount
  },

  addGems: (amount: number) => {
    const store = useGameStore()
    store.player.gems += amount
  },

  levelUp: (times: number = 1) => {
    const store = useGameStore()
    for (let i = 0; i < times; i++) {
      store.player.xp = store.player.xpToNextLevel
      store.checkLevelUp()
    }
  },

  completeAllQuests: () => {
    const store = useGameStore()
    store.quests.dailyQuests.forEach((q: any) => {
      q.progress = q.condition.target
      q.completed = true
    })
  },

  unlockAllSkills: () => {
    const skills = require('@/data/skills.json')
    skills.forEach((s: any) => skillSystem.unlockSkill(s.id))
  },

  resetSave: () => {
    localStorage.removeItem('idle_anime_save')
    window.location.reload()
  }
}

// Attach to window for console access during development
if (typeof window !== 'undefined') {
  (window as any).testUtils = testUtils
}
