# 🤝 Contributing to Idle Anime Ascension

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 🎯 How Can I Contribute?

### 🐛 Reporting Bugs
- Check if the bug has already been reported in Issues
- Include steps to reproduce, expected behavior, and actual behavior
- Add screenshots if applicable
- Specify your browser/device

### ✨ Suggesting Features
- Check if the feature has already been suggested
- Explain the problem your feature would solve
- Describe how it would work
- Consider how it fits with existing features

### 💻 Code Contributions
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages: `git commit -m 'Add amazing feature'`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📝 Development Guidelines

### Code Style
- **TypeScript:** Use strict mode, avoid `any` where possible
- **Vue:** Use Composition API with `<script setup>`
- **Naming:** camelCase for variables/functions, PascalCase for components
- **Comments:** Only for complex logic, code should be self-documenting

### Component Structure
```vue
<template>
  <!-- Template content -->
</template>

<script setup lang="ts">
// Imports
// Props/Emits
// Reactive state
// Computed properties
// Functions
// Lifecycle hooks
</script>

<style scoped>
/* Component styles */
</style>
```

### Commit Messages
Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, no logic change)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
- `feat: add legendary character unlock system`
- `fix: resolve save corruption on page refresh`
- `docs: update README with deployment instructions`

## 🧪 Testing

Before submitting a PR:
1. Run type check: `npm run type-check`
2. Build the project: `npm run build`
3. Test in dev mode: `npm run dev`
4. Test on mobile device or emulator
5. Verify save/load functionality
6. Check for console errors

## 📁 Project Structure

```
src/
├── components/      # Vue UI components
├── stores/          # Pinia state management
├── systems/         # Core game logic
├── data/           # JSON game data
├── utils/          # Helper functions
└── types/          # TypeScript definitions
```

### Adding New Features

#### New Character
1. Add to `src/utils/constants.ts` in CHARACTERS array
2. Update character unlock logic in `src/stores/gameStore.ts`
3. Add sprite/emoji representation

#### New Trait
1. Add to `src/data/traits.json`
2. Implement effect logic in `src/stores/gameStore.ts` getters
3. Test with different rarity levels

#### New Achievement
1. Add to `src/data/achievements.json`
2. Add tracking logic in `checkAchievements()` in gameStore
3. Test unlock conditions

#### New Event
1. Add to `src/data/events.json`
2. Implement multiplier logic in gameStore getters
3. Add event rotation system if needed

## 🎨 UI/UX Guidelines

- **Mobile First:** Design for portrait mobile screens
- **Touch Targets:** Minimum 48px for all interactive elements
- **Loading States:** Show feedback for all async operations
- **Animations:** Keep subtle, avoid excessive motion
- **Accessibility:** Ensure readable contrast ratios

## 🔧 Game Balance Contributions

When proposing balance changes:
- Explain the problem with current balance
- Show calculations/simulations if possible
- Consider impact on progression curve
- Test across different play styles
- Document expected revenue impact if relevant

### Balance Change Examples
```javascript
// Before
ENEMY_HEALTH_SCALING: 1.05,

// After (with reasoning)
ENEMY_HEALTH_SCALING: 1.04, // Reduce early game difficulty spike at wave 50
```

## 📊 Adding Analytics Events

```typescript
// In relevant system file
import { analytics } from '@/utils/analytics'

// Track event
analytics.trackEvent('event_name', {
  property1: value1,
  property2: value2
})
```

Common events to track:
- User milestones (level 10, 25, 50)
- Monetization (ad watches, purchases)
- Retention (daily logins, comebacks)
- Engagement (feature usage)

## 🚀 Performance Considerations

- Keep render loop efficient (avoid heavy calculations)
- Use object pooling for frequently created/destroyed objects
- Lazy load large assets
- Optimize PIXI.js sprite rendering
- Profile with browser DevTools before optimizing

## 🔒 Security Best Practices

- Never commit API keys or secrets
- Validate all user input
- Sanitize data before saving
- Use environment variables for sensitive config
- Keep dependencies updated

## 📚 Documentation

When adding features:
1. Update README.md if user-facing
2. Add JSDoc comments for complex functions
3. Update DEPLOYMENT.md if affecting deployment
4. Add examples for new systems

## ❓ Questions?

- Open a Discussion for general questions
- Open an Issue for specific problems
- Check existing documentation first

## 📜 Code of Conduct

- Be respectful and constructive
- Welcome newcomers
- Focus on what's best for the project
- Accept constructive criticism gracefully
- Show empathy towards others

## 🏆 Recognition

Contributors will be:
- Listed in README.md
- Credited in game credits (if substantial contribution)
- Thanked in release notes

---

Thank you for helping make Idle Anime Ascension better! 🎮✨
