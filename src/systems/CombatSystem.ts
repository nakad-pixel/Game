import { useGameStore } from '@/stores/gameStore'
import { useUIStore } from '@/stores/uiStore'
import { renderingSystem } from './RenderingSystem'

export class CombatSystem {
  private gameStore: any
  private lastUpdateTime: number = 0

  init() {
    this.gameStore = useGameStore()
    useUIStore()
    this.lastUpdateTime = Date.now()
  }

  update() {
    const now = Date.now()
    const deltaTime = now - this.lastUpdateTime
    this.lastUpdateTime = now

    if (this.gameStore.combat.combatActive && this.gameStore.combat.currentEnemy) {
      this.gameStore.updateCombat(deltaTime)
    }
  }

  performAttack() {
    if (!this.gameStore.combat.currentEnemy) return

    this.gameStore.attack()
    renderingSystem.animateAttack()
    
    if (this.gameStore.combat.currentEnemy) {
      renderingSystem.animateHit(this.gameStore.effectiveDamage)
    }
  }
}

export const combatSystem = new CombatSystem()
