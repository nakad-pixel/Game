<template>
  <div class="loading-screen">
    <div class="loading-content">
      <h1 class="game-title">IDLE ANIME ASCENSION</h1>
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading...</p>
    </div>
  </div>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  text-align: center;
}

.game-title {
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(90deg, #4a90e2, #e74c3c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  text-shadow: 0 0 20px rgba(74, 144, 226, 0.5);
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(74, 144, 226, 0.2);
  border-top: 4px solid #4a90e2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.loading-text {
  font-size: 1.2rem;
  color: #ccc;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .game-title {
    font-size: 2rem;
  }
}
</style>
