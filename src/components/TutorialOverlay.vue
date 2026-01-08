<template>
  <div v-if="showTutorial" class="tutorial-overlay">
    <div class="tutorial-backdrop" @click="skipTutorial"></div>
    <div class="tutorial-box" :style="tutorialPosition">
      <div class="tutorial-content">
        <h3>{{ currentStep.title }}</h3>
        <p>{{ currentStep.description }}</p>
        
        <div class="tutorial-actions">
          <button class="skip-btn" @click="skipTutorial">Skip Tutorial</button>
          <div class="tutorial-progress">
            Step {{ currentStepIndex + 1 }} / {{ tutorialSteps.length }}
          </div>
          <button class="next-btn" @click="nextStep">
            {{ currentStepIndex === tutorialSteps.length - 1 ? 'Finish' : 'Next' }}
          </button>
        </div>
      </div>
      
      <div class="tutorial-arrow" :class="currentStep.arrowPosition"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface TutorialStep {
  title: string
  description: string
  position: { top?: string; bottom?: string; left?: string; right?: string }
  arrowPosition: 'top' | 'bottom' | 'left' | 'right'
}

const tutorialSteps: TutorialStep[] = [
  {
    title: '👋 Welcome to Idle Anime Ascension!',
    description: 'This is an idle RPG where you automatically defeat enemies and grow stronger. Let me show you around!',
    position: { top: '50%', left: '50%' },
    arrowPosition: 'bottom',
  },
  {
    title: '⚔️ Auto Combat',
    description: 'Your hero attacks enemies automatically. Watch the battle happen in real-time!',
    position: { top: '40%', left: '50%' },
    arrowPosition: 'top',
  },
  {
    title: '📊 Resources',
    description: 'You earn Gold and XP from defeated enemies. Gold is used for upgrades, XP helps you level up!',
    position: { top: '80px', left: '20px' },
    arrowPosition: 'top',
  },
  {
    title: '🔼 Ascension',
    description: 'When you reach level 50, you can Ascend! This resets your level but gives permanent bonuses.',
    position: { bottom: '100px', left: '20px' },
    arrowPosition: 'bottom',
  },
  {
    title: '⚡ Special Features',
    description: 'Use the menu buttons to access Shop, Characters, Achievements, and more!',
    position: { bottom: '100px', right: '20px' },
    arrowPosition: 'bottom',
  },
  {
    title: '💎 Earn Rewards',
    description: 'Watch ads for free gems, complete achievements, and progress through the Battle Pass!',
    position: { top: '50%', left: '50%' },
    arrowPosition: 'top',
  },
  {
    title: '🎮 You\'re Ready!',
    description: 'Start your journey to become the ultimate warrior. Good luck!',
    position: { top: '50%', left: '50%' },
    arrowPosition: 'bottom',
  },
]

const showTutorial = ref(false)
const currentStepIndex = ref(0)

const currentStep = computed(() => tutorialSteps[currentStepIndex.value])

const tutorialPosition = computed(() => {
  const pos = currentStep.value.position
  const style: Record<string, string> = {}
  
  if (pos.top) style.top = pos.top
  if (pos.bottom) style.bottom = pos.bottom
  if (pos.left) style.left = pos.left
  if (pos.right) style.right = pos.right
  
  if (pos.top === '50%') style.transform = 'translate(-50%, -50%)'
  else if (pos.left === '50%') style.transform = 'translateX(-50%)'
  
  return style
})

onMounted(() => {
  const hasSeenTutorial = localStorage.getItem('tutorial_completed')
  if (!hasSeenTutorial) {
    setTimeout(() => {
      showTutorial.value = true
    }, 2000)
  }
})

function nextStep() {
  if (currentStepIndex.value < tutorialSteps.length - 1) {
    currentStepIndex.value++
  } else {
    completeTutorial()
  }
}

function skipTutorial() {
  if (confirm('Are you sure you want to skip the tutorial?')) {
    completeTutorial()
  }
}

function completeTutorial() {
  showTutorial.value = false
  localStorage.setItem('tutorial_completed', 'true')
}
</script>

<style scoped>
.tutorial-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10001;
  pointer-events: all;
}

.tutorial-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(3px);
}

.tutorial-box {
  position: absolute;
  background: linear-gradient(135deg, #1a1a2e, #2a2a3e);
  border: 3px solid #4a90e2;
  border-radius: 16px;
  padding: 2rem;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(74, 144, 226, 0.5);
  animation: tutorialPulse 2s ease-in-out infinite;
}

@keyframes tutorialPulse {
  0%, 100% {
    box-shadow: 0 10px 40px rgba(74, 144, 226, 0.5);
  }
  50% {
    box-shadow: 0 10px 50px rgba(74, 144, 226, 0.8);
  }
}

.tutorial-content h3 {
  margin: 0 0 1rem 0;
  color: #4a90e2;
  font-size: 1.5rem;
}

.tutorial-content p {
  margin: 0 0 1.5rem 0;
  color: #ccc;
  font-size: 1rem;
  line-height: 1.5;
}

.tutorial-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.skip-btn,
.next-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.skip-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #ccc;
}

.skip-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.next-btn {
  background: linear-gradient(135deg, #4a90e2, #3498db);
  color: white;
}

.next-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

.tutorial-progress {
  color: #4a90e2;
  font-size: 0.9rem;
  font-weight: bold;
}

.tutorial-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border: 15px solid transparent;
}

.tutorial-arrow.top {
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: #4a90e2;
}

.tutorial-arrow.bottom {
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  border-top-color: #4a90e2;
}

.tutorial-arrow.left {
  left: -30px;
  top: 50%;
  transform: translateY(-50%);
  border-right-color: #4a90e2;
}

.tutorial-arrow.right {
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  border-left-color: #4a90e2;
}

@media (max-width: 768px) {
  .tutorial-box {
    max-width: 90%;
    padding: 1.5rem;
  }

  .tutorial-actions {
    flex-direction: column;
  }

  .skip-btn,
  .next-btn {
    width: 100%;
  }
}
</style>
