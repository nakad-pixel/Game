# BACKEND API SPECIFICATION

## Base URL: `http://localhost:3001/api`

### Authentication
- `POST /auth/login`
  - Body: `{ playerId: string }`
  - Returns: `{ token: string, user: Object }`

### Save Management
- `POST /save/sync` (Requires Auth)
  - Body: `GameState` object
  - Returns: `{ success: boolean, timestamp: number }`
- `GET /save/load` (Requires Auth)
  - Returns: `GameState` object

### Leaderboards
- `GET /leaderboard`
  - Query: `limit=50`
  - Returns: `LeaderboardEntry[]`
- `POST /leaderboard/submit` (Requires Auth)
  - Body: `{ score: number }`
  - Returns: `{ rank: number }`

### Clans
- `GET /clans` - List clans
- `POST /clans/create` - Create a clan
- `POST /clans/join/:id` - Join a clan

### Analytics
- `POST /analytics`
  - Body: `AnalyticsEvent` object
  - Returns: `{ status: 'ok' }`
