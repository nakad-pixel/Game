import { useGameStore } from '@/stores/gameStore'
import skillsData from '@/data/skills.json'
import { Skill } from '@/types/game'

/**
 * Manages character special abilities and cooldowns.
 */
export class SkillSystem {
  private gameStore: any

  init() {
    this.gameStore = useGameStore()
  }

  update(dt: number) {
    if (!this.gameStore) return

    // Update cooldowns
    const cooldowns = this.gameStore.skills.skillCooldowns
    for (const skillId in cooldowns) {
      if (cooldowns[skillId] > 0) {
        cooldowns[skillId] = Math.max(0, cooldowns[skillId] - dt)
      }
    }
  }

  useSkill(skillId: string) {
    if (!this.gameStore) return
    
    const skill = skillsData.find(s => s.id === skillId) as Skill
    if (!skill) return

    if (this.gameStore.skills.skillCooldowns[skillId] > 0) {
      console.log('Skill on cooldown')
      return
    }

    // Apply skill effect
    this.applySkillEffect(skill)

    // Set cooldown
    this.gameStore.skills.skillCooldowns[skillId] = skill.cooldown
  }

  private applySkillEffect(skill: Skill) {
    const level = this.gameStore.skills.skillLevels[skill.id] || 1
    const multiplier = skill.baseValue + (level - 1) * skill.scaling

    switch (skill.id) {
      case 'power_strike':
        // Dealt via combat system normally, but here we could trigger an immediate attack
        this.gameStore.attack() // Use standard attack for now
        break
      // Other skill effects would be implemented here
    }
    
    console.log(`Used skill: ${skill.name} with multiplier ${multiplier}`)
  }

  unlockSkill(skillId: string) {
    if (!this.gameStore.skills.unlockedSkills.includes(skillId)) {
      this.gameStore.skills.unlockedSkills.push(skillId)
      this.gameStore.skills.skillLevels[skillId] = 1
    }
  }

  upgradeSkill(skillId: string) {
    if (this.gameStore.skills.unlockedSkills.includes(skillId)) {
      this.gameStore.skills.skillLevels[skillId]++
    }
  }
}

export const skillSystem = new SkillSystem()
