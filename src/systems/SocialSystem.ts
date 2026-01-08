import { useGameStore } from '@/stores/gameStore'
import { notificationSystem } from './NotificationSystem'

/**
 * Manages player interactions, gifting, and friends.
 */
export class SocialSystem {
  private gameStore: any

  init() {
    this.gameStore = useGameStore()
  }

  async sendFriendRequest(playerId: string) {
    console.log(`Sending friend request to ${playerId}`)
    this.gameStore.social.sentRequests.push(playerId)
  }

  async acceptFriendRequest(playerId: string) {
    this.gameStore.social.pendingRequests = this.gameStore.social.pendingRequests.filter((id: string) => id !== playerId)
    this.gameStore.social.friends.push(playerId)
    notificationSystem.success('New Friend!', `You are now friends with ${playerId}`)
  }

  async sendGift(friendId: string) {
    console.log(`Sending gift to ${friendId}`)
    // Gift logic
  }

  receiveGift(gift: any) {
    this.gameStore.social.giftsReceived.push(gift)
    notificationSystem.info('New Gift!', `You received a gift from ${gift.fromName}`)
  }

  claimGifts() {
    this.gameStore.social.giftsReceived.forEach((gift: any) => {
      // Apply reward
    })
    this.gameStore.social.giftsReceived = []
  }
}

export const socialSystem = new SocialSystem()
