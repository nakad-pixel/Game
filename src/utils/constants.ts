export const GAME_CONFIG = {
  VERSION: '1.0.0',
  AUTOSAVE_INTERVAL: 10000,
  TARGET_FPS: 60,
  BATTERY_SAVER_FPS: 30,
  OFFLINE_EARNINGS_CAP_HOURS: 8,
  MAX_LEVEL: 99,
  INITIAL_GOLD: 0,
  INITIAL_GEMS: 0,
  INITIAL_DAMAGE: 10,
  INITIAL_HEALTH: 100,
  INITIAL_ATTACK_SPEED: 1.0,
}

export const BALANCE = {
  ENEMY_HEALTH_SCALING: 1.05,
  ENEMY_GOLD_SCALING: 1.03,
  ENEMY_XP_SCALING: 1.02,
  XP_FORMULA_BASE: 100,
  XP_FORMULA_EXPONENT: 1.5,
  GOLD_PER_ENEMY_BASE: 10,
  XP_PER_ENEMY_BASE: 5,
  LEVEL_DAMAGE_SCALING: 1.1,
  ASCENSION_MULTIPLIER: 1.5,
  ASCENSION_COST_BASE: 1000000,
  CRIT_CHANCE_BASE: 0.1,
  CRIT_MULTIPLIER_BASE: 2.0,
}

export const MONETIZATION = {
  GEM_PRICES: {
    SMALL: { gems: 100, price: 0.99 },
    MEDIUM: { gems: 500, price: 4.99 },
    LARGE: { gems: 1200, price: 9.99 },
    MEGA: { gems: 3000, price: 19.99 },
  },
  AD_COOLDOWN_MS: 30000,
  AD_REWARD_GEMS: 5,
  AD_GOLD_MULTIPLIER: 2,
  AD_MULTIPLIER_DURATION_MS: 7200000,
  BATTLE_PASS_PRICE: 2.99,
  BATTLE_PASS_TIERS: 30,
  BATTLE_PASS_XP_PER_TIER: 1000,
  SKIN_PRICE_GEMS: 200,
  TRAIT_REROLL_PRICE_GEMS: 50,
}

export const PROGRESSION = {
  FIRST_ASCENSION_LEVEL: 50,
  TRAITS_UNLOCK_INTERVAL: 5,
  PRESTIGE_LAYERS: [
    { name: 'Ascension', multiplier: 1.5, unlockWave: 0 },
    { name: 'Legendary', multiplier: 2.0, unlockWave: 100 },
    { name: 'Mythic', multiplier: 3.0, unlockWave: 500 },
    { name: 'Divine', multiplier: 5.0, unlockWave: 2000 },
    { name: 'Transcendent', multiplier: 10.0, unlockWave: 10000 },
  ],
}

export const CHARACTERS = [
  {
    id: 'striker',
    name: 'Striker',
    role: 'striker' as const,
    baseDamage: 15,
    baseHealth: 80,
    attackSpeed: 1.2,
    specialAbility: 'Deals +50% critical damage',
    spriteKey: 'char_striker',
    unlockedAt: 0,
  },
  {
    id: 'guardian',
    name: 'Guardian',
    role: 'guardian' as const,
    baseDamage: 8,
    baseHealth: 200,
    attackSpeed: 0.8,
    specialAbility: 'Takes 30% less damage',
    spriteKey: 'char_guardian',
    unlockedAt: 10,
  },
  {
    id: 'mystic',
    name: 'Mystic',
    role: 'mystic' as const,
    baseDamage: 12,
    baseHealth: 100,
    attackSpeed: 1.0,
    specialAbility: 'Gains +20% XP and Gold',
    spriteKey: 'char_mystic',
    unlockedAt: 25,
  },
  {
    id: 'legendary',
    name: 'Legendary',
    role: 'legendary' as const,
    baseDamage: 20,
    baseHealth: 150,
    attackSpeed: 1.5,
    specialAbility: 'All bonuses +10%',
    spriteKey: 'char_legendary',
    unlockedAt: 50,
  },
]

export const UI = {
  MOBILE_BUTTON_SIZE: 48,
  DAMAGE_NUMBER_DURATION: 1000,
  NOTIFICATION_DURATION: 3000,
  POPUP_FADE_DURATION: 300,
}

export const ANALYTICS_EVENTS = {
  SESSION_START: 'session_start',
  SESSION_END: 'session_end',
  LEVEL_UP: 'level_up',
  ASCENSION: 'ascension',
  AD_WATCHED: 'ad_watched',
  PURCHASE: 'purchase',
  ACHIEVEMENT_UNLOCKED: 'achievement_unlocked',
  CHARACTER_UNLOCKED: 'character_unlocked',
  TRAIT_UNLOCKED: 'trait_unlocked',
  BATTLE_PASS_TIER: 'battle_pass_tier',
  QUEST_COMPLETED: 'quest_completed',
  CLAN_JOINED: 'clan_joined',
  SKILL_USED: 'skill_used',
}

export const EVENTS = {
  ROTATION_INTERVAL: 604800000, // 7 days
  PROGRESS_UPDATE_INTERVAL: 60000, // 1 minute
}

export const CLANS = {
  CREATE_COST: 10000,
  MAX_MEMBERS: 50,
  DONATION_COOLDOWN: 3600000, // 1 hour
}

export const SKILLS = {
  COOLDOWN_REDUCTION_BASE: 0,
  MAX_SKILL_LEVEL: 50,
}

export const SOCIAL = {
  MAX_FRIENDS: 100,
  GIFT_COOLDOWN: 86400000, // 24 hours
}
