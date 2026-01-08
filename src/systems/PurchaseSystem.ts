import { useGameStore } from '@/stores/gameStore'
import { PurchaseTransaction } from '@/types/game'

/**
 * Handles in-app purchases and receipt validation.
 */
export class PurchaseSystem {
  private gameStore: any

  init() {
    this.gameStore = useGameStore()
  }

  async purchaseProduct(productId: string) {
    if (!this.gameStore) return

    console.log(`Processing purchase for: ${productId}`)
    
    // Mock purchase flow
    return new Promise((resolve) => {
      setTimeout(() => {
        const transaction: PurchaseTransaction = {
          id: `tx_${Date.now()}`,
          userId: this.gameStore.player.id,
          productId: productId,
          amount: 9.99,
          currency: 'USD',
          status: 'completed',
          timestamp: Date.now()
        }

        this.handleSuccessfulPurchase(transaction)
        resolve(transaction)
      }, 1500)
    })
  }

  private handleSuccessfulPurchase(transaction: PurchaseTransaction) {
    this.gameStore.monetization.purchaseHistory.push({
      id: transaction.id,
      itemId: transaction.productId,
      timestamp: transaction.timestamp,
      price: transaction.amount
    })

    // Apply product benefits
    if (productIdToBenefit[transaction.productId]) {
      productIdToBenefit[transaction.productId](this.gameStore)
    }
  }
}

const productIdToBenefit: Record<string, (store: any) => void> = {
  'gems_pack_small': (store) => store.player.gems += 100,
  'gems_pack_large': (store) => store.player.gems += 1000,
  'battlepass_premium': (store) => store.monetization.battlePassPremium = true
}

export const purchaseSystem = new PurchaseSystem()
