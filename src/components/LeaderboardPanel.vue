<script setup lang="ts">
import { leaderboardSystem } from '@/systems/LeaderboardSystem'
import { ref, onMounted } from 'vue'
import { LeaderboardEntry } from '@/types/game'

const leaderboard = ref<LeaderboardEntry[]>([])

onMounted(async () => {
  leaderboard.value = await leaderboardSystem.fetchGlobalLeaderboard()
})
</script>

<template>
  <div class="leaderboard-panel">
    <h3>GLOBAL RANKINGS</h3>
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in leaderboard" :key="entry.playerId">
          <td>#{{ entry.rank }}</td>
          <td>{{ entry.playerName }}</td>
          <td>{{ entry.score.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.leaderboard-panel {
  padding: 15px;
  background: #1a1a2e;
  color: white;
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th {
  text-align: left;
  border-bottom: 2px solid #333;
  padding-bottom: 5px;
}

td {
  padding: 8px 0;
  border-bottom: 1px solid #16213e;
}

tr:nth-child(1) td:first-child { color: #ffd700; font-weight: bold; }
tr:nth-child(2) td:first-child { color: #c0c0c0; font-weight: bold; }
tr:nth-child(3) td:first-child { color: #cd7f32; font-weight: bold; }
</style>
