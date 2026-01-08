import { useGameStore } from '@/stores/gameStore'
import offersData from '@/data/limitedoffers.json'

/**
 * Manages time-limited store promotions and bundles.
 */
export class LimitedOfferSystem {
  private gameStore: any

  init() {
    this.gameStore = useGameStore()
  }

  update() {
    if (!this.gameStore) return

    const now = Date.now()
    // Remove expired offers
    this.gameStore.monetization.limitedOffers = this.gameStore.monetization.limitedOffers.filter(
      (o: any) => o.expiresAt > now
    )

    // Add new offers if needed
    if (this.gameStore.monetization.limitedOffers.length < 2) {
      this.generateNewOffer()
    }
  }

  private generateNewOffer() {
    const randomOffer = offersData[Math.floor(Math.random() * offersData.length)]
    const newOffer = {
      ...randomOffer,
      expiresAt: Date.now() + (randomOffer.duration || 3600000)
    }
    this.gameStore.monetization.limitedOffers.push(newOffer)
  }

  purchaseOffer(offerId: string) {
    const offer = this.gameStore.monetization.limitedOffers.find((o: any) => o.id === offerId)
    if (!offer) return false

    if (this.gameStore.player.gems >= offer.discountedPrice) {
      this.gameStore.player.gems -= offer.discountedPrice
      // Apply items from offer
      this.gameStore.monetization.limitedOffers = this.gameStore.monetization.limitedOffers.filter(
        (o: any) => o.id !== offerId
      )
      return true
    }
    return false
  }
}

export const limitedOfferSystem = new LimitedOfferSystem()
