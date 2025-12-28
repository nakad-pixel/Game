import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const leaderboard = []
const savedGames = new Map()

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() })
})

app.get('/api/leaderboard', (req, res) => {
  const sortedLeaderboard = [...leaderboard]
    .sort((a, b) => b.score - a.score)
    .slice(0, 100)
    .map((entry, index) => ({ ...entry, rank: index + 1 }))
  
  res.json({ leaderboard: sortedLeaderboard })
})

app.post('/api/leaderboard', (req, res) => {
  const { playerId, playerName, score } = req.body
  
  if (!playerId || !playerName || typeof score !== 'number') {
    return res.status(400).json({ error: 'Invalid data' })
  }

  const existingIndex = leaderboard.findIndex(entry => entry.playerId === playerId)
  
  if (existingIndex >= 0) {
    if (score > leaderboard[existingIndex].score) {
      leaderboard[existingIndex] = { playerId, playerName, score, timestamp: Date.now() }
    }
  } else {
    leaderboard.push({ playerId, playerName, score, timestamp: Date.now() })
  }

  res.json({ success: true })
})

app.post('/api/saves', (req, res) => {
  const { playerId, saveData } = req.body
  
  if (!playerId || !saveData) {
    return res.status(400).json({ error: 'Invalid data' })
  }

  savedGames.set(playerId, {
    saveData,
    timestamp: Date.now()
  })

  res.json({ success: true, message: 'Game saved' })
})

app.get('/api/saves/:playerId', (req, res) => {
  const { playerId } = req.params
  const save = savedGames.get(playerId)

  if (!save) {
    return res.status(404).json({ error: 'Save not found' })
  }

  res.json(save)
})

app.post('/api/analytics/events', (req, res) => {
  const { events } = req.body
  console.log('[Analytics]', events?.length || 0, 'events received')
  res.json({ success: true })
})

app.post('/api/purchases/validate', (req, res) => {
  const { purchaseId, itemId, receipt } = req.body
  
  console.log('[Purchase] Validating:', itemId)
  
  res.json({ 
    valid: true, 
    purchaseId,
    timestamp: Date.now() 
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Idle Anime Backend running on port ${PORT}`)
  console.log(`📊 Leaderboard: http://localhost:${PORT}/api/leaderboard`)
  console.log(`💾 Cloud Saves: http://localhost:${PORT}/api/saves/:playerId`)
})
