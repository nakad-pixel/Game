import { BALANCE, GAME_CONFIG } from './constants'

export function calculateXPForLevel(level: number): number {
  return Math.floor(BALANCE.XP_FORMULA_BASE * Math.pow(level, BALANCE.XP_FORMULA_EXPONENT))
}

export function calculateEnemyHealth(wave: number): number {
  return Math.floor(50 * Math.pow(BALANCE.ENEMY_HEALTH_SCALING, wave))
}

export function calculateEnemyGold(wave: number): number {
  return Math.floor(BALANCE.GOLD_PER_ENEMY_BASE * Math.pow(BALANCE.ENEMY_GOLD_SCALING, wave))
}

export function calculateEnemyXP(wave: number): number {
  return Math.floor(BALANCE.XP_PER_ENEMY_BASE * Math.pow(BALANCE.ENEMY_XP_SCALING, wave))
}

export function calculatePlayerDamage(level: number, baseDamage: number, multipliers: number[]): number {
  const levelBonus = Math.pow(BALANCE.LEVEL_DAMAGE_SCALING, level - 1)
  const totalMultiplier = multipliers.reduce((acc, mult) => acc * mult, 1)
  return Math.floor(baseDamage * levelBonus * totalMultiplier)
}

export function calculateCritDamage(damage: number, critChance: number, critMultiplier: number): number {
  const isCrit = Math.random() < critChance
  return isCrit ? Math.floor(damage * critMultiplier) : damage
}

export function calculateOfflineEarnings(
  offlineTimeMs: number,
  damagePerSecond: number,
  enemyHealth: number,
  goldPerEnemy: number
): number {
  const cappedTimeMs = Math.min(offlineTimeMs, GAME_CONFIG.OFFLINE_EARNINGS_CAP_HOURS * 3600000)
  const timeInSeconds = cappedTimeMs / 1000
  const enemiesKilled = Math.floor((damagePerSecond * timeInSeconds) / enemyHealth)
  return Math.floor(enemiesKilled * goldPerEnemy * 0.5)
}

export function calculateAscensionCost(ascensionCount: number): number {
  return Math.floor(BALANCE.ASCENSION_COST_BASE * Math.pow(10, ascensionCount))
}

export function calculateAscensionMultiplier(ascensionCount: number): number {
  return Math.pow(BALANCE.ASCENSION_MULTIPLIER, ascensionCount)
}

export function calculateBattlePassProgress(playTimeMs: number): number {
  const hoursPlayed = playTimeMs / 3600000
  return Math.floor(hoursPlayed * 3)
}

export function formatNumber(num: number): string {
  if (num < 1000) return Math.floor(num).toString()
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K'
  if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M'
  if (num < 1000000000000) return (num / 1000000000).toFixed(1) + 'B'
  return (num / 1000000000000).toFixed(1) + 'T'
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`
  }
  return `${secs}s`
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}
