/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_ANALYTICS_ID?: string
  readonly VITE_ADMOB_APP_ID?: string
  readonly VITE_ADMOB_BANNER_ID?: string
  readonly VITE_ADMOB_INTERSTITIAL_ID?: string
  readonly VITE_ADMOB_REWARDED_ID?: string
  readonly VITE_STRIPE_PUBLIC_KEY?: string
  readonly VITE_ENABLE_CLOUD_SAVES?: string
  readonly VITE_ENABLE_LEADERBOARDS?: string
  readonly VITE_ENABLE_ADS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
