import { combatSystem } from '@/systems/CombatSystem'
import { eventSystem } from '@/systems/EventSystem'
import { audioSystem } from '@/systems/AudioSystem'
import { particleSystem } from '@/systems/ParticleSystem'
import { notificationSystem } from '@/systems/NotificationSystem'
import { leaderboardSystem } from '@/systems/LeaderboardSystem'
import { skillSystem } from '@/systems/SkillSystem'
import { questSystem } from '@/systems/QuestSystem'
import { battlePassSystem } from '@/systems/BattlePassSystem'
import { analyticsSystem } from '@/systems/AnalyticsSystem'
import { autoPlaySystem } from '@/systems/AutoPlaySystem'
import { cloudSaveSystem } from '@/systems/CloudSaveSystem'

/**
 * Global game loop manager that orchestrates all systems.
 */
export class GameLoop {
  private static instance: GameLoop
  private rafId: number | null = null
  private lastTime: number = 0

  static getInstance() {
    if (!GameLoop.instance) GameLoop.instance = new GameLoop()
    return GameLoop.instance
  }

  init() {
    // Initialize all systems in correct order
    eventSystem.init()
    audioSystem.init()
    particleSystem.init()
    notificationSystem.init()
    leaderboardSystem.init()
    skillSystem.init()
    questSystem.init()
    battlePassSystem.init()
    analyticsSystem.init()
    autoPlaySystem.init()
    cloudSaveSystem.init()
    
    this.start()
  }

  start() {
    this.lastTime = performance.now()
    this.rafId = requestAnimationFrame(this.loop.bind(this))
  }

  private loop(now: number) {
    const dt = now - this.lastTime
    this.lastTime = now

    // Update systems
    eventSystem.update()
    combatSystem.update()
    particleSystem.update(dt)
    skillSystem.update(dt)
    autoPlaySystem.update()
    cloudSaveSystem.sync()

    this.rafId = requestAnimationFrame(this.loop.bind(this))
  }

  stop() {
    if (this.rafId) cancelAnimationFrame(this.rafId)
  }
}

export const gameLoop = GameLoop.getInstance()
