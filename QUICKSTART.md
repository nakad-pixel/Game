# ⚡ Quick Start Guide - Idle Anime Ascension

Get up and running in under 5 minutes!

## 🚀 Super Quick Start (30 seconds)

```bash
npm install
npm run dev
```

Open http://localhost:3000 and start playing!

## 📋 Step-by-Step Setup

### 1. Clone & Install (1 minute)
```bash
# If you cloned the repo
cd idle-anime-ascension
npm install
```

### 2. Start Development Server (30 seconds)
```bash
npm run dev
```

The game will open at http://localhost:3000

### 3. Play the Game! 🎮

- Combat starts automatically
- Defeat enemies to earn gold and XP
- Level up to increase damage
- Unlock characters at levels 10, 25, 50
- Ascend at level 50 for permanent bonuses

## 🎯 Common Development Tasks

### Run Type Checking
```bash
npm run type-check
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Start Backend (Optional)
```bash
cd backend
npm install
npm start
```

Backend will run at http://localhost:3001

## 📁 Important Files

### Game Configuration
- `src/utils/constants.ts` - All game balance numbers
- `src/data/traits.json` - Trait definitions
- `src/data/achievements.json` - Achievement definitions
- `src/data/events.json` - Event definitions

### Core Systems
- `src/stores/gameStore.ts` - Main game state
- `src/systems/CombatSystem.ts` - Combat logic
- `src/systems/ProgressionSystem.ts` - Level/ascension logic

### UI Components
- `src/components/HUD.vue` - Main game interface
- `src/components/ShopMenu.vue` - In-game shop
- `src/components/ProgressionUI.vue` - Ascension/traits

## 🎨 Customization Quick Tips

### Change Starting Gold
Edit `src/utils/constants.ts`:
```typescript
INITIAL_GOLD: 1000, // Change this value
```

### Adjust Enemy Difficulty
Edit `src/utils/constants.ts`:
```typescript
ENEMY_HEALTH_SCALING: 1.05, // Lower = easier
```

### Add a New Trait
Edit `src/data/traits.json`:
```json
{
  "id": "my_trait",
  "name": "My Trait",
  "description": "+100% damage",
  "rarity": "legendary",
  "effect": { "type": "damage", "value": 2.0 }
}
```

### Modify Gem Prices
Edit `src/components/ShopMenu.vue`:
```typescript
const gemPacks = [
  { name: 'Starter Pack', gems: 100, price: 0.99 },
  // Add or modify packs here
]
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
npm run dev
```

### Build Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Save Not Loading
Clear browser localStorage:
```javascript
// In browser console
localStorage.clear()
location.reload()
```

### PIXI.js Not Rendering
- Check browser console for errors
- Ensure WebGL is supported
- Try different browser
- Check `src/systems/RenderingSystem.ts`

## 📊 Testing Your Changes

### Test Save/Load
1. Play for a minute
2. Close tab
3. Reopen - progress should restore
4. Check offline earnings message

### Test Ascension
1. Open console: `gameStore.player.level = 50`
2. Earn enough gold
3. Open Progression menu
4. Click Ascend
5. Verify level resets, multiplier increases

### Test Shop
1. Give yourself gems: `gameStore.player.gems = 1000`
2. Open Shop
3. Try purchasing items
4. Verify gems deduct and items unlock

## 🎮 Gameplay Tips

### Fastest Progression
1. Focus on leveling early
2. Ascend as soon as possible (level 50)
3. Unlock all characters
4. Choose damage/gold traits
5. Use boosts from shop

### Best Traits
- **Early**: Golden Touch (+30% gold)
- **Mid**: Destroyer (+100% damage)
- **Late**: Obliterator (+200% damage)

### Character Unlock Order
1. Striker (start) - High damage
2. Guardian (level 10) - Survivability
3. Mystic (level 25) - Gold/XP bonus
4. Legendary (level 50) - Best overall

## 📚 Learn More

- **Full Documentation**: See `README.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **Contributing**: See `CONTRIBUTING.md`
- **Project Overview**: See `PROJECT_SUMMARY.md`

## 🎯 Next Steps

1. ✅ Get the game running
2. 🎮 Play for 15 minutes to understand mechanics
3. 📝 Read `src/utils/constants.ts` to understand balance
4. 🔧 Make your first customization
5. 📊 Review analytics in `src/utils/analytics.ts`
6. 🚀 Build and deploy (see `DEPLOYMENT.md`)

## 💡 Quick Wins

### Increase Early Game Speed
```typescript
// In constants.ts
INITIAL_DAMAGE: 20, // Was 10
ENEMY_HEALTH_SCALING: 1.03, // Was 1.05
```

### More Generous Rewards
```typescript
// In constants.ts
GOLD_PER_ENEMY_BASE: 20, // Was 10
XP_PER_ENEMY_BASE: 10, // Was 5
```

### Faster Ascension
```typescript
// In constants.ts
FIRST_ASCENSION_LEVEL: 25, // Was 50
```

## 🎊 You're Ready!

Start developing and have fun building features!

Questions? Check the comprehensive guides in the repository.

---

**Happy Coding!** 💻✨
