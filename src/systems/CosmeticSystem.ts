import { useGameStore } from '@/stores/gameStore'
import cosmeticsData from '@/data/cosmetics.json'
import { Cosmetic } from '@/types/game'

/**
 * Manages skins, pets, and visual effects.
 */
export class CosmeticSystem {
  private gameStore: any

  init() {
    this.gameStore = useGameStore()
  }

  equipSkin(skinId: string) {
    if (this.gameStore.monetization.ownedSkins.includes(skinId)) {
      this.gameStore.monetization.activeSkin = skinId
      console.log(`Equipped skin: ${skinId}`)
    }
  }

  buySkin(skinId: string, price: number) {
    if (this.gameStore.player.gems >= price) {
      this.gameStore.player.gems -= price
      this.gameStore.monetization.ownedSkins.push(skinId)
      console.log(`Bought skin: ${skinId}`)
      return true
    }
    return false
  }

  getActiveBonus() {
    const skinId = this.gameStore?.monetization.activeSkin
    const cosmetic = cosmeticsData.find(c => c.id === skinId) as Cosmetic
    return cosmetic?.bonus || null
  }

  getOwnedSkins(): string[] {
    return this.gameStore?.monetization.ownedSkins || []
  }
}

export const cosmeticSystem = new CosmeticSystem()
