<template>
  <div class="notification-container">
    <transition-group name="notification">
      <div 
        v-for="notification in uiStore.notifications" 
        :key="notification.id"
        class="notification"
        :class="notification.type"
      >
        {{ notification.message }}
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useUIStore } from '@/stores/uiStore'

const uiStore = useUIStore()
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: none;
}

.notification {
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-width: 200px;
  text-align: center;
}

.notification.info {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.notification.success {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
}

.notification.warning {
  background: linear-gradient(135deg, #f39c12, #e67e22);
}

.notification.error {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
