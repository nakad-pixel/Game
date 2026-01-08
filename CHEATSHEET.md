# 🎮 Idle Anime Ascension - Developer Cheatsheet

Quick reference for common tasks and keyboard shortcuts.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Shift + D` | Toggle Debug Panel |
| `F12` | Open Browser DevTools |
| Browser console: `featureFlags` | Access feature flag manager |
| Browser console: `localStorage.clear()` | Clear all saves |

---

## 🚀 Quick Commands

```bash
# Development
npm install              # Install dependencies
npm run dev              # Start dev server (localhost:3000)
npm run type-check       # Check TypeScript errors
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
./validate.sh            # Run full validation
npm run build            # Test production build
```

---

## 🐛 Debug Panel Features

Press `Ctrl + Shift + D` to open the debug panel with these quick actions:

| Button | Effect |
|--------|--------|
| +1M Gold | Add 1,000,000 gold |
| +100 Gems | Add 100 gems |
| +10K XP | Add 10,000 XP (triggers level-up check) |
| Max Level | Set level to 99 |
| Unlock All | Unlock all characters and traits |
| Clear Save | Delete save (asks for confirmation) |
| Force Ascension | Set level 50 + 10M gold |

---

## 🎮 Browser Console Tricks

```javascript
// Access stores
const gameStore = window.__VUE_DEVTOOLS_GLOBAL_HOOK__.apps[0]._instance.appContext.config.globalProperties.$pinia._s.get('game')
const uiStore = window.__VUE_DEVTOOLS_GLOBAL_HOOK__.apps[0]._instance.appContext.config.globalProperties.$pinia._s.get('ui')

// Quick cheats
gameStore.player.gold = 1000000
gameStore.player.gems = 1000
gameStore.player.level = 50
gameStore.player.xp = 0

// Feature flags (accessible directly)
featureFlags.enable('betaFeatures')
featureFlags.disable('enableAds')
featureFlags.getAll()

// Skip tutorial
localStorage.setItem('tutorial_completed', 'true')

// Fast level-up
gameStore.player.xp = gameStore.player.xpToNextLevel
gameStore.checkLevelUp()

// Instant ascension
gameStore.player.level = 50
gameStore.player.gold = 10000000

// Clear save and restart
localStorage.clear()
location.reload()
```

---

## 📁 Important File Locations

### Game Logic
- `src/stores/gameStore.ts` - Main game state and logic
- `src/systems/CombatSystem.ts` - Combat calculations
- `src/systems/RenderingSystem.ts` - PIXI.js rendering

### Balance & Configuration
- `src/utils/constants.ts` - ALL game balance numbers
- `src/data/traits.json` - Trait definitions
- `src/data/achievements.json` - Achievement conditions
- `src/data/events.json` - Event multipliers
- `src/data/battlepass.json` - Battle pass rewards

### UI Components
- `src/components/HUD.vue` - Main game interface
- `src/components/ShopMenu.vue` - Monetization UI
- `src/components/ProgressionUI.vue` - Ascension/traits
- `src/components/DebugPanel.vue` - Developer tools

---

## ⚙️ Quick Balance Tweaks

### Make Early Game Easier
Edit `src/utils/constants.ts`:
```typescript
INITIAL_DAMAGE: 20,              // Was 10
ENEMY_HEALTH_SCALING: 1.03,      // Was 1.05
GOLD_PER_ENEMY_BASE: 20,         // Was 10
```

### Faster Progression
```typescript
XP_FORMULA_EXPONENT: 1.3,        // Was 1.5
FIRST_ASCENSION_LEVEL: 25,       // Was 50
```

### More Generous Monetization
```typescript
AD_REWARD_GEMS: 10,              // Was 5
TRAIT_REROLL_PRICE_GEMS: 25,    // Was 50
```

### Faster Offline Earnings
```typescript
OFFLINE_EARNINGS_CAP_HOURS: 12,  // Was 8
```

---

## 🎨 UI Customization

### Change Theme Colors
Edit component `<style>` sections:
```css
/* Primary Blue */
#4a90e2 → Your color

/* Secondary Red */
#e74c3c → Your color

/* Background */
#0f0f1e → Your color
```

### Adjust Button Sizes
Edit `src/utils/constants.ts`:
```typescript
UI: {
  MOBILE_BUTTON_SIZE: 56,  // Was 48
}
```

---

## 🔧 Common Fixes

### Build Fails
```bash
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### Save Corrupted
```javascript
// In browser console
localStorage.setItem('idle_anime_save', localStorage.getItem('idle_anime_backup_1'))
location.reload()
```

### FPS Issues
1. Open Debug Panel (Ctrl+Shift+D)
2. Check FPS counter
3. Enable Battery Saver in Settings
4. Set Graphics Quality to Low

### TypeScript Errors
```bash
npm run type-check    # See all errors
# Fix errors in reported files
npm run type-check    # Verify fixed
```

---

## 📊 Testing Checklist

### Quick Test (2 minutes)
- [ ] `npm run build` succeeds
- [ ] Open `npm run preview`
- [ ] Game loads without errors
- [ ] Combat works
- [ ] Save/load works

### Full Test (10 minutes)
- [ ] Tutorial appears (or skip)
- [ ] Defeat 10 enemies
- [ ] Reach level 5
- [ ] Open each menu
- [ ] Purchase from shop
- [ ] Unlock a character
- [ ] Refresh page - progress saved
- [ ] Check offline earnings message

---

## 🎯 Feature Flags

Enable/disable features via browser console:

```javascript
// Enable cloud saves
featureFlags.enable('enableCloudSaves')

// Disable ads
featureFlags.disable('enableAds')

// Check status
featureFlags.isEnabled('enableBattlePass')

// Get all flags
featureFlags.getAll()

// Reset to defaults
featureFlags.reset()
```

---

## 📦 Deployment Quick Reference

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

### Backend (Render)
1. Push to GitHub
2. Connect repo to Render
3. Set root directory: `backend`
4. Set start command: `npm start`

### Itch.io
```bash
npm run build
cd dist
zip -r ../game.zip *
# Upload to itch.io
```

---

## 🔍 Debugging Tools

### Performance Issues
```javascript
// Check performance report
import { performanceMonitor } from '@/utils/performance'
performanceMonitor.getPerformanceReport()
```

### State Inspection
```javascript
// View entire game state
console.log(JSON.stringify(gameStore.$state, null, 2))

// View specific parts
console.log('Gold:', gameStore.player.gold)
console.log('Level:', gameStore.player.level)
console.log('Traits:', gameStore.progression.activeTraits)
```

### Analytics Events
```javascript
// Manually trigger event
import { analytics } from '@/utils/analytics'
analytics.trackEvent('test_event', { data: 'value' })
```

---

## 📝 Quick Add Features

### Add New Trait
Edit `src/data/traits.json`:
```json
{
  "id": "my_trait",
  "name": "My Trait",
  "description": "+50% gold",
  "rarity": "rare",
  "effect": { "type": "gold", "value": 1.5 }
}
```

### Add New Achievement
Edit `src/data/achievements.json`:
```json
{
  "id": "my_achievement",
  "name": "My Achievement",
  "description": "Do something cool",
  "condition": { "type": "level", "target": 10 },
  "reward": { "type": "gems", "value": 50 }
}
```

### Add New Event
Edit `src/data/events.json`:
```json
{
  "id": "my_event",
  "name": "My Event",
  "description": "Special bonuses!",
  "multipliers": { "gold": 2, "xp": 1.5 },
  "duration": 86400000
}
```

---

## 🆘 Emergency Hotfixes

### Disable Feature
```javascript
// In deployed game, run in console:
featureFlags.disable('problemFeature')
localStorage.setItem('hotfix_applied', 'true')
```

### Reset Player Progress
```javascript
// WARNING: Deletes all progress
if (confirm('Reset ALL progress?')) {
  localStorage.clear()
  location.reload()
}
```

### Force Save
```javascript
// Manually trigger save
gameStore.saveGame()
```

---

## 📞 Support Shortcuts

### Export Save File
```javascript
const save = localStorage.getItem('idle_anime_save')
console.log('Save File:', save)
// Copy and send to support
```

### Import Save File
```javascript
const saveData = `paste_save_data_here`
localStorage.setItem('idle_anime_save', saveData)
location.reload()
```

---

## 🎓 Learning Resources

- **Vue 3 Docs**: https://vuejs.org
- **PIXI.js Docs**: https://pixijs.com
- **Pinia Docs**: https://pinia.vuejs.org
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/

---

**Keep this cheatsheet handy during development!** 🚀
