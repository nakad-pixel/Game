import { defineStore } from 'pinia'
import { GameState } from '@/types/game'
import { GAME_CONFIG, BALANCE, CHARACTERS } from '@/utils/constants'
import { 
  calculateXPForLevel, 
  calculateEnemyHealth, 
  calculateEnemyGold, 
  calculateEnemyXP,
  calculatePlayerDamage,
  calculateCritDamage,
  calculateOfflineEarnings,
  calculateAscensionMultiplier
} from '@/utils/formulas'
import { analytics } from '@/utils/analytics'
import traitsData from '@/data/traits.json'
import achievementsData from '@/data/achievements.json'

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    player: {
      id: generatePlayerId(),
      level: 1,
      xp: 0,
      xpToNextLevel: calculateXPForLevel(1),
      gold: GAME_CONFIG.INITIAL_GOLD,
      gems: GAME_CONFIG.INITIAL_GEMS,
      damage: GAME_CONFIG.INITIAL_DAMAGE,
      health: GAME_CONFIG.INITIAL_HEALTH,
      maxHealth: GAME_CONFIG.INITIAL_HEALTH,
      attackSpeed: GAME_CONFIG.INITIAL_ATTACK_SPEED,
      critChance: BALANCE.CRIT_CHANCE_BASE,
      critMultiplier: BALANCE.CRIT_MULTIPLIER_BASE,
      goldMultiplier: 1,
      xpMultiplier: 1,
      activeCharacterId: 'striker',
      unlockedCharacters: ['striker'],
      characterLevels: { striker: 1 },
    },
    combat: {
      currentEnemy: null,
      waveNumber: 1,
      enemiesDefeated: 0,
      totalDamageDealt: 0,
      combatActive: true,
      lastAttackTime: 0,
    },
    progression: {
      totalAscensions: 0,
      ascensionMultiplier: 1,
      currentPrestigeLayer: 0,
      prestigeMultipliers: {},
      unlockedTraits: [],
      activeTraits: [],
      traitRerollsAvailable: 0,
    },
    monetization: {
      battlePassTier: 0,
      battlePassPremium: false,
      ownedSkins: [],
      activeSkin: 'default',
      adWatchCount: 0,
      lastAdWatchTime: 0,
      purchaseHistory: [],
      limitedOffers: [],
    },
    events: {
      activeEvent: null,
      eventStartTime: 0,
      eventEndTime: 0,
      eventProgress: 0,
    },
    achievements: {
      unlockedAchievements: [],
      achievementProgress: {},
      dailyStreakCount: 0,
      lastLoginDate: new Date().toISOString().split('T')[0],
    },
    settings: {
      soundEnabled: true,
      musicEnabled: true,
      graphicsQuality: 'high',
      batterySaverMode: false,
      notificationsEnabled: true,
    },
    meta: {
      firstPlayTime: Date.now(),
      lastPlayTime: Date.now(),
      totalPlayTime: 0,
      sessionStartTime: Date.now(),
      saveVersion: GAME_CONFIG.VERSION,
      cloudsyncEnabled: false,
      lastCloudSyncTime: 0,
    },
  }),

  getters: {
    effectiveDamage: (state): number => {
      const character = CHARACTERS.find(c => c.id === state.player.activeCharacterId)!
      const multipliers = [
        state.progression.ascensionMultiplier,
        state.player.goldMultiplier,
      ]
      
      state.progression.activeTraits.forEach(traitId => {
        const trait = traitsData.find(t => t.id === traitId)
        if (trait && trait.effect.type === 'damage') {
          multipliers.push(trait.effect.value)
        }
      })

      return calculatePlayerDamage(state.player.level, character.baseDamage, multipliers)
    },

    effectiveGoldMultiplier: (state): number => {
      let multiplier = state.player.goldMultiplier * state.progression.ascensionMultiplier
      
      state.progression.activeTraits.forEach(traitId => {
        const trait = traitsData.find(t => t.id === traitId)
        if (trait && trait.effect.type === 'gold') {
          multiplier *= trait.effect.value
        }
      })

      if (state.events.activeEvent?.multipliers.gold) {
        multiplier *= state.events.activeEvent.multipliers.gold
      }

      return multiplier
    },

    effectiveXPMultiplier: (state): number => {
      let multiplier = state.player.xpMultiplier
      
      state.progression.activeTraits.forEach(traitId => {
        const trait = traitsData.find(t => t.id === traitId)
        if (trait && trait.effect.type === 'xp') {
          multiplier *= trait.effect.value
        }
      })

      if (state.events.activeEvent?.multipliers.xp) {
        multiplier *= state.events.activeEvent.multipliers.xp
      }

      return multiplier
    },
  },

  actions: {
    initGame() {
      this.spawnEnemy()
      this.checkOfflineProgress()
      analytics.init()
    },

    spawnEnemy() {
      const health = calculateEnemyHealth(this.combat.waveNumber)
      this.combat.currentEnemy = {
        id: `enemy_${this.combat.waveNumber}`,
        name: `Monster ${this.combat.waveNumber}`,
        health,
        maxHealth: health,
        damage: 5,
        goldReward: calculateEnemyGold(this.combat.waveNumber),
        xpReward: calculateEnemyXP(this.combat.waveNumber),
        spriteKey: 'enemy_basic',
      }
    },

    updateCombat(_deltaTime: number) {
      if (!this.combat.combatActive || !this.combat.currentEnemy) return

      const timeSinceLastAttack = Date.now() - this.combat.lastAttackTime
      const attackInterval = 1000 / this.player.attackSpeed

      if (timeSinceLastAttack >= attackInterval) {
        this.attack()
        this.combat.lastAttackTime = Date.now()
      }
    },

    attack() {
      if (!this.combat.currentEnemy) return

      const baseDamage = this.effectiveDamage
      const damage = calculateCritDamage(baseDamage, this.player.critChance, this.player.critMultiplier)
      
      this.combat.currentEnemy.health -= damage
      this.combat.totalDamageDealt += damage

      if (this.combat.currentEnemy.health <= 0) {
        this.defeatEnemy()
      }
    },

    defeatEnemy() {
      if (!this.combat.currentEnemy) return

      const gold = Math.floor(this.combat.currentEnemy.goldReward * this.effectiveGoldMultiplier)
      const xp = Math.floor(this.combat.currentEnemy.xpReward * this.effectiveXPMultiplier)

      this.player.gold += gold
      this.player.xp += xp
      this.combat.enemiesDefeated++

      this.checkLevelUp()
      this.checkAchievements()

      this.combat.waveNumber++
      this.spawnEnemy()
    },

    checkLevelUp() {
      while (this.player.xp >= this.player.xpToNextLevel && this.player.level < GAME_CONFIG.MAX_LEVEL) {
        this.player.level++
        this.player.xp -= this.player.xpToNextLevel
        this.player.xpToNextLevel = calculateXPForLevel(this.player.level)
        
        this.player.damage = Math.floor(this.player.damage * BALANCE.LEVEL_DAMAGE_SCALING)
        this.player.maxHealth = Math.floor(this.player.maxHealth * 1.05)
        this.player.health = this.player.maxHealth

        analytics.trackEvent('level_up', { level: this.player.level })

        this.checkCharacterUnlocks()
      }
    },

    checkCharacterUnlocks() {
      CHARACTERS.forEach(char => {
        if (char.unlockedAt <= this.player.level && !this.player.unlockedCharacters.includes(char.id)) {
          this.player.unlockedCharacters.push(char.id)
          this.player.characterLevels[char.id] = 1
          analytics.trackEvent('character_unlocked', { characterId: char.id })
        }
      })
    },

    ascend() {
      this.progression.totalAscensions++
      this.progression.ascensionMultiplier = calculateAscensionMultiplier(this.progression.totalAscensions)
      
      this.player.level = 1
      this.player.xp = 0
      this.player.xpToNextLevel = calculateXPForLevel(1)
      this.combat.waveNumber = 1
      
      analytics.trackEvent('ascension', { count: this.progression.totalAscensions })
      
      if (this.progression.totalAscensions % 5 === 0) {
        this.unlockRandomTraits()
      }

      this.spawnEnemy()
    },

    unlockRandomTraits() {
      const availableTraits = traitsData.filter(t => !this.progression.unlockedTraits.includes(t.id))
      if (availableTraits.length === 0) return

      const count = Math.min(3, availableTraits.length)
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * availableTraits.length)
        const trait = availableTraits.splice(randomIndex, 1)[0]
        this.progression.unlockedTraits.push(trait.id)
      }
    },

    activateTrait(traitId: string) {
      if (this.progression.activeTraits.length < 5 && !this.progression.activeTraits.includes(traitId)) {
        this.progression.activeTraits.push(traitId)
      }
    },

    watchAd() {
      this.monetization.adWatchCount++
      this.monetization.lastAdWatchTime = Date.now()
      this.player.gems += 5
      analytics.trackEvent('ad_watched', { count: this.monetization.adWatchCount })
    },

    checkOfflineProgress() {
      const offlineTime = Date.now() - this.meta.lastPlayTime
      if (offlineTime > 60000) {
        const offlineGold = calculateOfflineEarnings(
          offlineTime,
          this.effectiveDamage * this.player.attackSpeed,
          this.combat.currentEnemy?.maxHealth || 100,
          calculateEnemyGold(this.combat.waveNumber)
        )
        this.player.gold += offlineGold
      }
    },

    checkAchievements() {
      achievementsData.forEach(achievement => {
        if (this.achievements.unlockedAchievements.includes(achievement.id)) return

        let unlocked = false
        switch (achievement.condition.type) {
          case 'enemiesDefeated':
            unlocked = this.combat.enemiesDefeated >= achievement.condition.target
            break
          case 'level':
            unlocked = this.player.level >= achievement.condition.target
            break
          case 'ascensions':
            unlocked = this.progression.totalAscensions >= achievement.condition.target
            break
          case 'wave':
            unlocked = this.combat.waveNumber >= achievement.condition.target
            break
        }

        if (unlocked) {
          this.achievements.unlockedAchievements.push(achievement.id)
          analytics.trackEvent('achievement_unlocked', { achievementId: achievement.id })
        }
      })
    },

    saveGame() {
      this.meta.lastPlayTime = Date.now()
      this.meta.totalPlayTime += Date.now() - this.meta.sessionStartTime
      this.meta.sessionStartTime = Date.now()

      const saveData = JSON.stringify(this.$state)
      localStorage.setItem('idle_anime_save', saveData)
      localStorage.setItem('idle_anime_backup_1', saveData)
    },

    loadGame() {
      const saveData = localStorage.getItem('idle_anime_save')
      if (saveData) {
        try {
          const loaded = JSON.parse(saveData)
          this.$state = loaded
          this.checkOfflineProgress()
        } catch (error) {
          console.error('Failed to load save:', error)
          const backup = localStorage.getItem('idle_anime_backup_1')
          if (backup) {
            this.$state = JSON.parse(backup)
          }
        }
      }
    },
  },
})

function generatePlayerId(): string {
  return `player_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}
