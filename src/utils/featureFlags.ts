export interface FeatureFlags {
  enableCloudSaves: boolean
  enableLeaderboards: boolean
  enableAds: boolean
  enableDebugPanel: boolean
  enableAnalytics: boolean
  enableBattlePass: boolean
  enableEvents: boolean
  enableAchievements: boolean
  enableMultipleCharacters: boolean
  enableTraits: boolean
  enableCosmetics: boolean
  betaFeatures: boolean
}

class FeatureFlagManager {
  private flags: FeatureFlags

  constructor() {
    this.flags = this.loadFlags()
  }

  private loadFlags(): FeatureFlags {
    const savedFlags = localStorage.getItem('feature_flags')
    
    const defaultFlags: FeatureFlags = {
      enableCloudSaves: this.getEnvFlag('VITE_ENABLE_CLOUD_SAVES', false),
      enableLeaderboards: this.getEnvFlag('VITE_ENABLE_LEADERBOARDS', false),
      enableAds: this.getEnvFlag('VITE_ENABLE_ADS', false),
      enableDebugPanel: import.meta.env.DEV,
      enableAnalytics: true,
      enableBattlePass: true,
      enableEvents: true,
      enableAchievements: true,
      enableMultipleCharacters: true,
      enableTraits: true,
      enableCosmetics: true,
      betaFeatures: false,
    }

    if (savedFlags) {
      try {
        return { ...defaultFlags, ...JSON.parse(savedFlags) }
      } catch {
        return defaultFlags
      }
    }

    return defaultFlags
  }

  private getEnvFlag(key: string, defaultValue: boolean): boolean {
    const value = import.meta.env[key]
    if (value === undefined) return defaultValue
    return value === 'true' || value === true
  }

  isEnabled(feature: keyof FeatureFlags): boolean {
    return this.flags[feature]
  }

  enable(feature: keyof FeatureFlags): void {
    this.flags[feature] = true
    this.saveFlags()
  }

  disable(feature: keyof FeatureFlags): void {
    this.flags[feature] = false
    this.saveFlags()
  }

  toggle(feature: keyof FeatureFlags): void {
    this.flags[feature] = !this.flags[feature]
    this.saveFlags()
  }

  getAll(): FeatureFlags {
    return { ...this.flags }
  }

  setAll(flags: Partial<FeatureFlags>): void {
    this.flags = { ...this.flags, ...flags }
    this.saveFlags()
  }

  reset(): void {
    localStorage.removeItem('feature_flags')
    this.flags = this.loadFlags()
  }

  private saveFlags(): void {
    localStorage.setItem('feature_flags', JSON.stringify(this.flags))
  }

  // Helper method for conditional rendering in components
  when(feature: keyof FeatureFlags, callback: () => void): void {
    if (this.isEnabled(feature)) {
      callback()
    }
  }
}

export const featureFlags = new FeatureFlagManager()

// Make it accessible in browser console for debugging
if (typeof window !== 'undefined') {
  (window as any).featureFlags = featureFlags
}
