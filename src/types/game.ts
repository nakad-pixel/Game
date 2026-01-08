export interface GameState {
  player: PlayerState
  combat: CombatState
  progression: ProgressionState
  monetization: MonetizationState
  events: EventState
  achievements: AchievementState
  settings: SettingsState
  meta: MetaState
  skills: SkillState
  quests: QuestState
  clans: ClanState
  social: SocialState
}

export interface PlayerState {
  id: string
  level: number
  xp: number
  xpToNextLevel: number
  gold: number
  gems: number
  damage: number
  health: number
  maxHealth: number
  attackSpeed: number
  critChance: number
  critMultiplier: number
  goldMultiplier: number
  xpMultiplier: number
  activeCharacterId: string
  unlockedCharacters: string[]
  characterLevels: Record<string, number>
}

export interface CombatState {
  currentEnemy: Enemy | null
  waveNumber: number
  enemiesDefeated: number
  totalDamageDealt: number
  combatActive: boolean
  lastAttackTime: number
}

export interface Enemy {
  id: string
  name: string
  health: number
  maxHealth: number
  damage: number
  goldReward: number
  xpReward: number
  spriteKey: string
}

export interface ProgressionState {
  totalAscensions: number
  ascensionMultiplier: number
  currentPrestigeLayer: number
  prestigeMultipliers: Record<string, number>
  unlockedTraits: string[]
  activeTraits: string[]
  traitRerollsAvailable: number
}

export interface MonetizationState {
  battlePassTier: number
  battlePassPremium: boolean
  ownedSkins: string[]
  activeSkin: string
  adWatchCount: number
  lastAdWatchTime: number
  purchaseHistory: Purchase[]
  limitedOffers: LimitedOffer[]
}

export interface Purchase {
  id: string
  itemId: string
  timestamp: number
  price: number
}

export interface LimitedOffer {
  id: string
  itemId: string
  expiresAt: number
  originalPrice: number
  discountedPrice: number
}

export interface EventState {
  activeEvent: GameEvent | null
  eventStartTime: number
  eventEndTime: number
  eventProgress: number
}

export interface GameEvent {
  id: string
  name: string
  description: string
  multipliers: {
    gold?: number
    xp?: number
    damage?: number
  }
  duration: number
}

export interface AchievementState {
  unlockedAchievements: string[]
  achievementProgress: Record<string, number>
  dailyStreakCount: number
  lastLoginDate: string
}

export interface SettingsState {
  soundEnabled: boolean
  musicEnabled: boolean
  graphicsQuality: 'low' | 'medium' | 'high'
  batterySaverMode: boolean
  notificationsEnabled: boolean
}

export interface MetaState {
  firstPlayTime: number
  lastPlayTime: number
  totalPlayTime: number
  sessionStartTime: number
  saveVersion: string
  cloudsyncEnabled: boolean
  lastCloudSyncTime: number
}

export interface SkillState {
  unlockedSkills: string[]
  skillLevels: Record<string, number>
  activeSkills: string[]
  skillCooldowns: Record<string, number>
}

export interface QuestState {
  dailyQuests: Quest[]
  weeklyQuests: Quest[]
  lastRefreshDate: string
}

export interface Quest {
  id: string
  name: string
  description: string
  type: 'daily' | 'weekly'
  condition: {
    type: string
    target: number
  }
  progress: number
  reward: Reward
  completed: boolean
  claimed: boolean
}

export interface ClanState {
  currentClanId: string | null
  clanName: string | null
  role: 'leader' | 'officer' | 'member' | null
  members: ClanMember[]
  treasury: {
    gold: number
    gems: number
  }
}

export interface ClanMember {
  id: string
  name: string
  role: 'leader' | 'officer' | 'member'
  contribution: number
  lastActive: number
}

export interface SocialState {
  friends: string[]
  pendingRequests: string[]
  sentRequests: string[]
  giftsReceived: Gift[]
}

export interface Gift {
  fromId: string
  fromName: string
  reward: Reward
  timestamp: number
}

export interface Character {
  id: string
  name: string
  role: 'striker' | 'guardian' | 'mystic' | 'legendary'
  baseDamage: number
  baseHealth: number
  attackSpeed: number
  specialAbility: string
  spriteKey: string
  unlockedAt: number
}

export interface Trait {
  id: string
  name: string
  description: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  effect: {
    type: 'damage' | 'gold' | 'xp' | 'critChance' | 'attackSpeed' | 'health'
    value: number
  }
}

export interface Achievement {
  id: string
  name: string
  description: string
  condition: {
    type: string
    target: number
  }
  reward: {
    type: 'gold' | 'gems' | 'skin' | 'trait'
    value: string | number
  }
  unlocked: boolean
}

export interface BattlePassTier {
  tier: number
  xpRequired: number
  freeReward: Reward
  premiumReward: Reward
}

export interface Reward {
  type: 'gold' | 'gems' | 'skin' | 'boost' | 'reroll' | 'trait'
  value: string | number
}

export interface Skill {
  id: string
  characterId: string
  name: string
  description: string
  baseValue: number
  scaling: number
  cooldown: number
  unlockedAt: number
}

export interface Cosmetic {
  id: string
  name: string
  type: 'skin' | 'pet' | 'aura' | 'weapon'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  bonus?: {
    type: string
    value: number
  }
}

export interface Clan {
  id: string
  name: string
  leaderId: string
  members: string[]
  perks: Record<string, number>
}

export interface PrestigeTier {
  id: number
  name: string
  multiplier: number
  unlockRequirement: number
}

export interface CloudSave {
  userId: string
  gameState: GameState
  timestamp: number
  version: string
}

export interface PurchaseTransaction {
  id: string
  userId: string
  productId: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  timestamp: number
}

export interface LeaderboardEntry {
  playerId: string
  playerName: string
  score: number
  rank: number
  timestamp: number
}

export interface AnalyticsEvent {
  eventName: string
  timestamp: number
  properties: Record<string, any>
  sessionId: string
}
