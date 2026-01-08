import { useGameStore } from '@/stores/gameStore'
import { useUIStore } from '@/stores/uiStore'
import { renderingSystem } from './RenderingSystem'
import { audioSystem } from './AudioSystem'
import { particleSystem } from './ParticleSystem'

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
    audioSystem.playAttack()
    
    if (this.gameStore.combat.currentEnemy) {
      renderingSystem.animateHit(this.gameStore.effectiveDamage)
      particleSystem.createDamagePop(
        window.innerWidth / 2 + 150, 
        window.innerHeight / 2, 
        Math.random() < this.gameStore.player.critChance
      )
    }
  }
}

export const combatSystem = new CombatSystem()
