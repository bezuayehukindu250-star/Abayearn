# 🚀 Complete Setup Guide for Abay Earn Referral System

## Step 1: Create Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot` command
3. Choose a name: `Abay Earn`
4. Choose a username: `abay_earn_bot` (must end with 'bot')
5. Copy the **bot token** you receive

## Step 2: Deploy Frontend

### Option A: Netlify (Recommended)
1. Create account at netlify.com
2. Drag and drop your project folder
3. Copy the deployed URL (e.g., `https://abay-earn.netlify.app`)

### Option B: GitHub Pages
1. Create GitHub repository
2. Push your code
3. Enable GitHub Pages in Settings
4. Use the provided URL

## Step 3: Setup Backend

### Install Dependencies
```bash
npm install
```

### Configure Environment
1. Edit `bot.js`:
   - Replace `YOUR_BOT_TOKEN_HERE` with your bot token
   - Replace `WEB_APP_URL` with your deployed frontend URL

2. Edit `js/api.js`:
   - Replace `API_BASE_URL` with your backend URL

### Deploy Backend
Deploy to:
- **Heroku**: `heroku create && git push heroku main`
- **Railway**: Connect GitHub repo
- **Render**: Connect GitHub repo
- **VPS**: Run `npm start` with PM2

## Step 4: Configure Bot Web App

1. Go to @BotFather
2. Send `/mybots`
3. Select your bot
4. Click **Bot Settings** → **Menu Button**
5. Click **Edit Menu Button URL**
6. Enter your deployed frontend URL
7. Set button text: "🚀 Open App"

## Step 5: Test Referral System

### Test Flow:
1. Open your bot in Telegram
2. Send `/start` command
3. Click "Open Abay Earn" button
4. Copy your referral link
5. Share with a friend (or test account)
6. Friend clicks link and opens bot
7. Friend opens the app
8. Check your dashboard - you should see:
   - +$1.00 in balance
   - +1 referral count
   - Activity showing "Referral Bonus"

## Step 6: Run Both Services

### Terminal 1 - API Server:
```bash
npm start
```

### Terminal 2 - Telegram Bot:
```bash
npm run bot
```

## 🔧 Troubleshooting

### Referral not working?
- Check bot token is correct
- Verify backend URL in `js/api.js`
- Check browser console for errors
- Ensure backend is running

### Can't open web app?
- Verify URL is HTTPS (required by Telegram)
- Check Menu Button is configured in @BotFather
- Try `/start` command again

### Balance not updating?
- Check API endpoint in browser DevTools
- Verify backend is receiving requests
- Check CORS is enabled

## 📱 Production Checklist

- [ ] Bot token configured
- [ ] Frontend deployed (HTTPS)
- [ ] Backend deployed and running
- [ ] API URL updated in frontend
- [ ] Web App URL set in @BotFather
- [ ] Test referral flow end-to-end
- [ ] Replace in-memory storage with database
- [ ] Add payment gateway for withdrawals
- [ ] Integrate real ad network

## 🎉 You're Ready!

Your referral system is now fully functional. Users can:
1. Join via referral links
2. Earn $1.00 per referral automatically
3. Track referrals in real-time
4. Share their own referral links

Need help? Check the logs in your backend terminal.
