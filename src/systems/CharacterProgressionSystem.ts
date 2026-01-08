import { useGameStore } from '@/stores/gameStore'
import charactersData from '@/data/characters.json'

/**
 * Manages individual character development and skill trees.
 */
export class CharacterProgressionSystem {
  private gameStore: any

  init() {
    this.gameStore = useGameStore()
  }

  gainCharacterXP(characterId: string, amount: number) {
    if (!this.gameStore) return

    const currentLevel = this.gameStore.player.characterLevels[characterId] || 1
    // Simplified character XP logic
    // In a full implementation, we'd have character-specific XP bars
    console.log(`Character ${characterId} gained ${amount} XP`)
  }

  levelUpCharacter(characterId: string) {
    if (this.gameStore.player.characterLevels[characterId]) {
      this.gameStore.player.characterLevels[characterId]++
      console.log(`Character ${characterId} leveled up to ${this.gameStore.player.characterLevels[characterId]}`)
    }
  }

  getCharacterStats(characterId: string) {
    const base = charactersData.find(c => c.id === characterId)
    if (!base) return null

    const level = this.gameStore.player.characterLevels[characterId] || 1
    return {
      damage: base.baseDamage * (1 + (level - 1) * 0.1),
      health: base.baseHealth * (1 + (level - 1) * 0.1),
      attackSpeed: base.attackSpeed
    }
  }

  unlockNode(characterId: string, nodeId: string) {
    console.log(`Unlocked node ${nodeId} for character ${characterId}`)
    // Skill tree logic would go here
  }
}

export const characterProgressionSystem = new CharacterProgressionSystem()
