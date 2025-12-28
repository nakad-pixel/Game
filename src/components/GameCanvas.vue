<template>
  <div ref="canvasContainer" class="canvas-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { renderingSystem } from '@/systems/RenderingSystem'

const canvasContainer = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (canvasContainer.value) {
    await renderingSystem.init(canvasContainer.value)
  }
})

onUnmounted(() => {
  renderingSystem.destroy()
})
</script>

<style scoped>
.canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
