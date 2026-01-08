<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { skillSystem } from '@/systems/SkillSystem'
import skillsData from '@/data/skills.json'
import { computed } from 'vue'

const gameStore = useGameStore()
const characterSkills = computed(() => {
  return skillsData.filter(s => s.characterId === gameStore.player.activeCharacterId)
})

const getCooldown = (skillId: string) => {
  return gameStore.skills.skillCooldowns[skillId] || 0
}

const getCooldownPercent = (skillId: string) => {
  const cd = getCooldown(skillId)
  const skill = skillsData.find(s => s.id === skillId)
  if (!skill) return 0
  return (cd / skill.cooldown) * 100
}

const useSkill = (skillId: string) => {
  skillSystem.useSkill(skillId)
}
</script>

<template>
  <div class="skills-container">
    <div v-for="skill in characterSkills" 
         :key="skill.id" 
         class="skill-slot"
         @click="useSkill(skill.id)"
         :class="{ 'on-cooldown': getCooldown(skill.id) > 0 }">
      <div class="skill-icon">
        <!-- Placeholder for icon -->
        {{ skill.name[0] }}
      </div>
      <div v-if="getCooldown(skill.id) > 0" class="cooldown-overlay" :style="{ height: getCooldownPercent(skill.id) + '%' }"></div>
      <div v-if="getCooldown(skill.id) > 0" class="cooldown-text">
        {{ (getCooldown(skill.id) / 1000).toFixed(1) }}s
      </div>
    </div>
  </div>
</template>

<style scoped>
.skills-container {
  display: flex;
  gap: 12px;
  justify-content: center;
  padding: 10px;
}

.skill-slot {
  width: 60px;
  height: 60px;
  background: #16213e;
  border: 2px solid #4a90e2;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.skill-icon {
  font-size: 24px;
  color: white;
  font-weight: bold;
}

.cooldown-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  pointer-events: none;
}

.cooldown-text {
  position: absolute;
  font-size: 14px;
  color: white;
  font-weight: bold;
  text-shadow: 0 0 4px black;
}

.skill-slot:active:not(.on-cooldown) {
  transform: scale(0.95);
}

.on-cooldown {
  border-color: #555;
  cursor: default;
}
</style>
