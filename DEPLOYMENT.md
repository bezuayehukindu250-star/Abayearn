# 🚀 Complete Deployment Guide for Abay Earn

Your bot is configured! Let's deploy it.

---

## 📋 What You Have

✅ Bot Token: `7428752128:AAG_xNpjxnjmgD2IiQ7noqo75YtUH05HrtI`  
✅ Admin ID: `5141496483`  
✅ Bot configured and ready to deploy

---

## 🎯 Step-by-Step Deployment

### Step 1: Deploy Frontend (Choose One)

#### Option A: Netlify (Easiest - Recommended)

1. **Create account** at https://netlify.com
2. **Drag and drop** your project folder (or connect GitHub)
3. **Copy the URL** (e.g., `https://abay-earn.netlify.app`)
4. **Update bot.js** with your URL:
   ```javascript
   const WEB_APP_URL = 'https://abay-earn.netlify.app';
   ```

#### Option B: Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow prompts
4. Copy the deployment URL

#### Option C: GitHub Pages

1. Create GitHub repository
2. Push your code
3. Go to Settings → Pages
4. Enable Pages
5. Use the provided URL

---

### Step 2: Deploy Backend

#### Option A: Railway (Recommended)

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Connect your repository
4. Add environment variables:
   - `BOT_TOKEN`: `7428752128:AAG_xNpjxnjmgD2IiQ7noqo75YtUH05HrtI`
   - `WEB_APP_URL`: Your frontend URL from Step 1
   - `ADMIN_ID`: `5141496483`
5. Deploy!
6. Copy your backend URL (e.g., `https://abay-earn.up.railway.app`)

#### Option B: Render

1. Go to https://render.com
2. Create "New Web Service"
3. Connect GitHub
4. Add environment variables (same as above)
5. Deploy

#### Option C: Heroku

```bash
heroku create abay-earn-api
heroku config:set BOT_TOKEN=7428752128:AAG_xNpjxnjmgD2IiQ7noqo75YtUH05HrtI
heroku config:set WEB_APP_URL=your-frontend-url
git push heroku main
```

---

### Step 3: Update Configuration

After deploying, update these files:

**1. js/api.js (line 2):**
```javascript
const API_BASE_URL = 'https://your-backend-url.com/api';
```

**2. bot.js (line 6):**
```javascript
const WEB_APP_URL = 'https://your-frontend-url.com';
```

**3. js/app.js (line 73):**
```javascript
const referralLink = `https://t.me/YOUR_BOT_USERNAME?start=${userData.referralCode}`;
```

---

### Step 4: Configure Bot in Telegram

1. **Get your bot username:**
   - Open @BotFather in Telegram
   - Send `/mybots`
   - Select your bot
   - Note the username (e.g., `@abay_earn_bot`)

2. **Set Menu Button:**
   - In @BotFather, select your bot
   - Click "Bot Settings" → "Menu Button"
   - Click "Edit Menu Button URL"
   - Enter your frontend URL: `https://your-frontend-url.com`
   - Set button text: "🚀 Open App"

3. **Set Bot Description:**
   - Click "Edit Description"
   - Paste:
   ```
   🚀 Welcome to Abay Earn!
   
   Earn money through:
   • Watching ads ($0.05 each)
   • Inviting friends ($1.00 each)
   • Building your referral network
   
   Start earning today!
   ```

---

### Step 5: Start the Bot

#### If deployed on Railway/Render/Heroku:
The bot starts automatically! ✅

#### If running locally:
```bash
# Terminal 1 - API Server
npm start

# Terminal 2 - Telegram Bot
npm run bot
```

---

### Step 6: Test Everything

1. **Open your bot** in Telegram
2. **Send `/start`** - Should show welcome message
3. **Click "Open App"** - Should open your web app
4. **Test referral link** - Copy and share with another account
5. **Test admin panel** - Send `/admin` command
6. **Watch an ad** - Click "Watch Ad" button

---

## 🔧 Quick Local Testing

Want to test before deploying?

```bash
# Install dependencies
npm install

# Start API server (Terminal 1)
npm start

# Start bot (Terminal 2)
npm run bot

# Open index.html in browser for frontend testing
```

---

## 📱 Getting Your Bot Username

Don't know your bot username?

1. Open @BotFather
2. Send `/mybots`
3. Select your bot
4. You'll see the username (e.g., `@abay_earn_bot`)

Or check the bot token:
- Token: `7428752128:AAG_xNpjxnjmgD2IiQ7noqo75YtUH05HrtI`
- Bot ID: `7428752128`

---

## ✅ Deployment Checklist

- [ ] Frontend deployed (Netlify/Vercel/GitHub Pages)
- [ ] Backend deployed (Railway/Render/Heroku)
- [ ] Updated `API_BASE_URL` in js/api.js
- [ ] Updated `WEB_APP_URL` in bot.js
- [ ] Updated bot username in js/app.js
- [ ] Configured Menu Button in @BotFather
- [ ] Set bot description in @BotFather
- [ ] Tested `/start` command
- [ ] Tested web app opening
- [ ] Tested referral system
- [ ] Tested admin panel with `/admin`

---

## 🆘 Troubleshooting

### Bot not responding?
- Check bot token is correct
- Ensure backend is running
- Check Railway/Render logs

### Web app not opening?
- Verify URL is HTTPS (required by Telegram)
- Check Menu Button is configured
- Try `/start` command again

### Referrals not working?
- Check backend API is running
- Verify API_BASE_URL in js/api.js
- Check browser console for errors

### Admin panel access denied?
- Verify your Telegram ID: `5141496483`
- Check ADMIN_IDS in bot.js, server.js, js/admin.js

---

## 🎉 You're Ready!

Once deployed, your bot will:
- Accept new users via referral links
- Credit $1.00 for each referral
- Show ads and pay $0.05 per view
- Let you manage everything via admin panel

Need help? Check the logs in your deployment platform!

---

**Bot Token:** `7428752128:AAG_xNpjxnjmgD2IiQ7noqo75YtUH05HrtI`  
**Admin ID:** `5141496483`  
**Status:** ✅ Configured and ready to deploy!
