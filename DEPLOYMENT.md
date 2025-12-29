# 🚀 Deployment Guide - Idle Anime Ascension

This guide covers deploying your idle game to production environments.

## 📦 Pre-Deployment Checklist

- [ ] Run `npm run build` and verify no errors
- [ ] Test the production build locally with `npm run preview`
- [ ] Update game constants in `src/utils/constants.ts` if needed
- [ ] Review privacy policy and terms of service
- [ ] Set up analytics tracking IDs (if using external services)
- [ ] Prepare AdMob IDs (for real ad integration)

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   npm run build
   vercel --prod
   ```

3. **Configure:**
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Enable SPA mode (rewrite all routes to `/index.html`)

### Option 2: Netlify

1. **Install Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. **Create `netlify.toml`:**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Option 3: GitHub Pages

1. **Add to `vite.config.ts`:**
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

2. **Install gh-pages:**
   ```bash
   npm i -D gh-pages
   ```

3. **Add deploy script to `package.json`:**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

### Option 4: Itch.io (Game Platform)

1. **Build:**
   ```bash
   npm run build
   ```

2. **Zip the dist folder:**
   ```bash
   cd dist
   zip -r ../idle-anime-ascension.zip *
   cd ..
   ```

3. **Upload to Itch.io:**
   - Go to https://itch.io/game/new
   - Upload the zip file
   - Set kind: "HTML"
   - Check "This file will be played in the browser"
   - Set viewport: 1280x720 or 720x1280 (portrait)
   - Set "SharedArrayBuffer support" if needed for PIXI.js

## 🖥️ Backend Deployment

### Option 1: Render (Recommended)

1. **Push backend code to GitHub**

2. **Create new Web Service on Render:**
   - Connect your GitHub repo
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`

3. **Set environment variables:**
   ```
   NODE_ENV=production
   PORT=3001
   MONGODB_URI=your-mongodb-connection-string
   ```

### Option 2: Railway

1. **Install Railway CLI:**
   ```bash
   npm i -g @railway/cli
   ```

2. **Deploy:**
   ```bash
   cd backend
   railway init
   railway up
   ```

3. **Set environment variables in Railway dashboard**

### Option 3: Heroku

1. **Create `Procfile` in backend folder:**
   ```
   web: node server.js
   ```

2. **Deploy:**
   ```bash
   cd backend
   heroku create idle-anime-backend
   git push heroku main
   ```

### Option 4: DigitalOcean App Platform

1. **Push code to GitHub**
2. **Create new app in DigitalOcean**
3. **Configure:**
   - Source: GitHub repo
   - Branch: main
   - Root directory: `backend`
   - Build command: `npm install`
   - Run command: `npm start`

## 🗄️ Database Setup

### MongoDB Atlas (Cloud Database)

1. **Create account:** https://www.mongodb.com/cloud/atlas

2. **Create cluster:**
   - Choose free tier (M0)
   - Select region closest to your users

3. **Create database user:**
   - Database Access → Add New Database User
   - Save username and password

4. **Whitelist IPs:**
   - Network Access → Add IP Address
   - Allow from anywhere: `0.0.0.0/0` (for production, restrict to your backend IP)

5. **Get connection string:**
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your password

6. **Set in backend `.env`:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/idle-anime
   ```

## 📱 PWA Configuration

Your game is already PWA-ready! To enable installation:

1. **Serve over HTTPS** (automatically handled by Vercel/Netlify)

2. **Create icons:**
   - Create `public/icon-192.png` (192x192)
   - Create `public/icon-512.png` (512x512)

3. **Users can install:**
   - Mobile: "Add to Home Screen" in browser menu
   - Desktop: Install icon in address bar

## 🔐 Environment Variables

### Frontend (.env)
```
VITE_API_URL=https://your-backend.onrender.com
VITE_ANALYTICS_ID=your-analytics-id
VITE_ADMOB_APP_ID=your-admob-id
```

### Backend (.env)
```
NODE_ENV=production
PORT=3001
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-random-secret-key
ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

## 📊 Post-Deployment

### 1. Test Everything
- [ ] Game loads correctly
- [ ] Save/load works
- [ ] Shop purchases work
- [ ] Leaderboards sync (if using backend)
- [ ] Mobile responsive
- [ ] PWA installs correctly

### 2. Set Up Monitoring
- **Frontend:** Vercel Analytics, Sentry
- **Backend:** Railway metrics, Render logs
- **Database:** MongoDB Atlas monitoring

### 3. Enable Analytics
- Google Analytics 4
- Custom event tracking (already implemented)
- Revenue tracking

### 4. Configure CDN (Optional)
- Cloudflare for caching and DDoS protection
- Set cache rules for static assets

## 🔄 Continuous Deployment

### Automatic Deploys (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 💰 Monetization Setup

### 1. AdMob Integration
- Create AdMob account: https://admob.google.com
- Create app and ad units
- Add IDs to `src/config/adConfig.ts` (create this file)

### 2. Stripe for Payments
- Create Stripe account: https://stripe.com
- Get API keys
- Implement payment endpoints in backend

### 3. Battle Pass
- Already implemented in frontend
- Connect to Stripe for purchases
- Set up recurring billing

## 🐛 Troubleshooting

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### CORS errors
Add to backend `server.js`:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}))
```

### PWA not installing
- Ensure HTTPS
- Check manifest.json is accessible
- Verify service worker is registered

### Performance issues
- Enable code splitting in Vite
- Optimize PIXI.js sprite atlases
- Enable battery saver mode by default on mobile

## 📈 Scaling Tips

1. **CDN:** Use Cloudflare or similar for static assets
2. **Database:** Upgrade MongoDB tier as users grow
3. **Backend:** Add Redis caching for leaderboards
4. **Frontend:** Implement lazy loading for heavy assets

## 🎯 Launch Checklist

- [ ] Game fully tested on 5+ devices
- [ ] Privacy policy and ToS accessible
- [ ] Analytics tracking working
- [ ] Save system tested extensively
- [ ] Leaderboards functional
- [ ] All monetization features working
- [ ] Social media assets prepared
- [ ] Launch announcement ready
- [ ] Support email set up
- [ ] Feedback system in place

---

**You're ready to launch!** 🚀

For additional help, refer to the main README.md or documentation for each platform.
