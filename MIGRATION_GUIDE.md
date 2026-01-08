# MIGRATION GUIDE - IDLE ANIME ASCENSION V2

This guide outlines the steps to integrate the 24 new systems into the existing game codebase.

## 1. Type Definitions
Replace `src/types/game.ts` with the new version containing all new interfaces.

## 2. Store Update
Update `src/stores/gameStore.ts` initial state to include the new slices: `skills`, `quests`, `clans`, `social`.

## 3. System Initialization
Import and initialize all systems in your main entry point (or use `GameLoop` from `src/utils/integration.ts`).

```typescript
import { gameLoop } from '@/utils/integration'

// After Pinia and Stores are ready
gameLoop.init()
```

## 4. UI Integration
Add the new components to your views:
- `HUD.vue`: Add `EventNotification`, `SkillDisplay`, `QuestTracker`.
- `ShopMenu.vue`: Integrate `CosmeticShop` and `BattlePassUI`.
- `ProgressionUI.vue`: Add `PrestigePanel` and `CharacterSkillTree`.
- Create a new `SocialMenu`: Include `ClanPanel` and `LeaderboardPanel`.

## 5. Event Loop
Ensure the global event loop calls the `update(dt)` method of:
- `ParticleSystem`
- `SkillSystem`
- `EventSystem`
- `AutoPlaySystem`

## 6. Data Files
Ensure all new JSON files in `src/data/` are present and correctly formatted.
- `characters.json`
- `skills.json`
- `cosmetics.json`
- `quests.json`
- `events.json`
- `limitedoffers.json`
- `cosmetics-catalog.json`
