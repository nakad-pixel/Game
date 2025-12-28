# 🎮 Idle Anime Ascension

**A production-ready anime-style idle RPG built with Vue 3, PIXI.js, and TypeScript**

Revenue-optimized idle game targeting $10k+/month with complete monetization, progression systems, and retention mechanics.

## ✨ Features

### 🎯 Week 1: Core Combat Engine
- ✅ Full Vite + Vue 3 + PIXI.js setup with TypeScript
- ✅ Auto-combat system (60 FPS rendering)
- ✅ Wave-based enemy spawning with exponential scaling
- ✅ Character system with stats and progression
- ✅ Level-up system (1-99 levels)
- ✅ LocalStorage auto-save (every 10 seconds)
- ✅ Offline earnings calculation (8-hour cap)
- ✅ Mobile-responsive design (portrait mode)
- ✅ Settings menu (sound, graphics, battery saver)

### 💰 Week 2: Monetization & Progression
- ✅ Ascension system (permanent 1.5x multipliers)
- ✅ Trait system (30+ traits with rarities)
- ✅ Premium currency (Gems)
- ✅ Shop system (boosts, cosmetics, rerolls)
- ✅ Ad rewards integration (simulated)
- ✅ Analytics event tracking
- ✅ Battle Pass system (30 tiers, free + premium)
- ✅ Daily login streaks
- ✅ Idle economics tuning

### 👥 Week 3: Characters & Events
- ✅ 4 unique characters (Striker, Guardian, Mystic, Legendary)
- ✅ Character synergies and abilities
- ✅ Party management system
- ✅ Weekly event rotation (5 different events)
- ✅ Cosmetics shop (8+ skins and themes)
- ✅ 5-layer prestige system
- ✅ Character skin rendering

### 🏆 Week 4: Leaderboards & Launch
- ✅ Cloud backend API (Node.js + Express)
- ✅ Global leaderboard system
- ✅ Cloud save sync (optional)
- ✅ Achievement system (15 achievements)
- ✅ Daily streak tracking
- ✅ Performance optimization
- ✅ PWA support (offline gameplay)
- ✅ Analytics framework
- ✅ Launch-ready deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Install frontend dependencies
npm install

# Install backend dependencies (optional)
cd backend
npm install
cd ..
```

### Development

```bash
# Start frontend dev server (http://localhost:3000)
npm run dev

# Start backend API (optional, http://localhost:3001)
cd backend
npm start
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
idle-anime-ascension/
├── src/
│   ├── components/         # Vue components
│   │   ├── GameCanvas.vue  # PIXI.js rendering
│   │   ├── HUD.vue         # Game UI overlay
│   │   ├── SettingsMenu.vue
│   │   ├── ProgressionUI.vue
│   │   ├── ShopMenu.vue
│   │   ├── CharacterSelect.vue
│   │   └── AchievementGrid.vue
│   ├── stores/             # Pinia state management
│   │   ├── gameStore.ts    # Core game state
│   │   └── uiStore.ts      # UI state
│   ├── systems/            # Game systems
│   │   ├── CombatSystem.ts
│   │   ├── RenderingSystem.ts
│   │   ├── PersistenceSystem.ts
│   │   └── ProgressionSystem.ts
│   ├── data/               # Game data JSON
│   │   ├── traits.json     # 30+ trait definitions
│   │   ├── achievements.json
│   │   ├── events.json
│   │   └── battlepass.json
│   ├── utils/              # Helper functions
│   │   ├── constants.ts
│   │   ├── formulas.ts
│   │   ├── analytics.ts
│   │   └── math.ts
│   ├── types/              # TypeScript types
│   │   └── game.ts
│   ├── App.vue
│   └── main.ts
├── backend/                # Optional cloud backend
│   ├── server.js           # Express API server
│   ├── package.json
│   └── .env.example
├── public/
│   ├── manifest.json       # PWA manifest
│   └── service-worker.js   # Offline support
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎮 How to Play

1. **Combat**: Automatic combat runs at 60 FPS. Your hero attacks enemies automatically.
2. **Level Up**: Gain XP from defeated enemies to level up and increase damage.
3. **Earn Gold**: Collect gold from enemies to purchase upgrades and unlock features.
4. **Ascend**: At level 50+, ascend to reset your level but gain permanent multipliers.
5. **Traits**: Unlock powerful traits every 5 ascensions to customize your build.
6. **Characters**: Unlock 4 unique characters with different playstyles.
7. **Shop**: Spend gems on boosts, cosmetics, and trait rerolls.
8. **Achievements**: Complete challenges to earn rewards.
9. **Battle Pass**: Progress through 30 tiers for exclusive rewards.
10. **Leaderboards**: Compete globally for the highest wave reached.

## 💎 Monetization

- **Gems**: Premium currency earned through ads and purchases
- **Shop Packs**: $0.99 - $19.99 gem bundles
- **Battle Pass**: $2.99/month for premium rewards
- **Cosmetics**: Skins and themes (200-500 gems each)
- **Boosts**: Temporary 2x multipliers (50-150 gems)
- **Ad Rewards**: Watch ads for 5 free gems

## 📊 Game Balance

### Progression Curve
- **First Kill**: 1 second
- **Level 10**: ~5 minutes
- **Level 25**: ~15 minutes
- **First Ascension**: ~25 minutes
- **Level 50**: ~45 minutes

### Retention Mechanics
- Auto-save every 10 seconds
- Offline earnings (up to 8 hours)
- Daily login bonuses
- 7-day streak rewards
- Comeback bonuses (return after 7 days = 3x gold)

### Revenue Targets
- **Month 1**: 500 DAU → $1,000 revenue
- **Month 2**: 1,200 DAU → $6,300 revenue
- **Month 3**: 2,500 DAU → $20,000 revenue
- **Month 6**: 5,000 DAU → $62,500 revenue

## 🔧 Configuration

### Game Balance
Edit `src/utils/constants.ts` to adjust:
- Enemy scaling rates
- XP/Gold formulas
- Ascension multipliers
- Pricing and gem costs

### Events
Edit `src/data/events.json` to customize weekly events.

### Traits
Edit `src/data/traits.json` to add/modify trait effects.

### Achievements
Edit `src/data/achievements.json` to change achievement conditions.

## 📱 Mobile Support

- Portrait-only orientation
- Touch-optimized UI (48px minimum button size)
- Battery saver mode (30 FPS when unfocused)
- PWA installable on iOS and Android
- Offline gameplay support

## 🌐 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy 'dist' folder
```

### Backend (Render/Railway)
```bash
cd backend
npm start
# Deploy with environment variables
```

### Itch.io
1. Build: `npm run build`
2. Zip the `dist` folder
3. Upload to itch.io as HTML5 game
4. Set viewport to 1280x720 (landscape) or 720x1280 (portrait)

## 🎯 Success Metrics

- **Day 1 Retention**: Target ≥ 40%
- **Day 7 Retention**: Target ≥ 20%
- **Ad Views/User/Day**: Target ≥ 3
- **ARPPU**: Target $20+ (first month)
- **FPS**: 60 FPS on modern devices, 50 FPS on older devices
- **Load Time**: < 5s on 4G

## 🛠️ Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Rendering**: PIXI.js 7
- **State**: Pinia
- **Language**: TypeScript
- **Build**: Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB (optional)
- **Deployment**: Vercel/Netlify (frontend), Render/Railway (backend)

## 📝 Development Roadmap

### Completed ✅
- Core combat engine
- Progression systems (levels, ascension, traits)
- Monetization (shop, battle pass, ads)
- Characters and events
- Achievements and leaderboards
- PWA support
- Backend API

### Future Enhancements 🚀
- Multiplayer guild system
- PvP arena battles
- Seasonal events
- Equipment system
- Pet companions
- Prestige skins
- Cross-platform cloud sync with authentication

## 🐛 Known Issues

None currently. This is a launch-ready build.

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Credits

Built with ❤️ for the idle game community

---

**Ready to Deploy!** 🎉

Follow the deployment instructions above to launch your game to production.

For support and updates, visit the GitHub repository.
