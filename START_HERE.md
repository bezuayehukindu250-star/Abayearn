# 🚀 Abay Earn - Quick Start Guide

## ✅ Your Bot Configuration

- **Bot Username:** `@abay_earn_bot`
- **Bot Token:** `7428752128:AAG_xNpjxnjmgD2IiQ7noqo75YtUH05HrtI`
- **Admin ID:** `5141496483`
- **Bot Link:** https://t.me/abay_earn_bot

---

## 🎯 Quick Test (Local)

Want to test immediately? Run these commands:

```bash
# Install dependencies
npm install

# Start API server (Terminal 1)
npm start

# Start Telegram bot (Terminal 2)
npm run bot
```

Then:
1. Open https://t.me/abay_earn_bot in Telegram
2. Send `/start` command
3. You should see the welcome message!

---

## 📱 Test Your Bot Right Now

1. **Open Telegram**
2. **Search for:** `@abay_earn_bot`
3. **Send:** `/start`
4. **Expected:** Welcome message with buttons

---

## 🌐 Deploy to Production

### Quick Deploy (5 minutes):

1. **Deploy Frontend to Netlify:**
   - Go to https://netlify.com
   - Drag and drop your project folder
   - Copy the URL (e.g., `https://abay-earn.netlify.app`)

2. **Deploy Backend to Railway:**
   - Go to https://railway.app
   - Create new project from GitHub
   - Add environment variables:
     - `BOT_TOKEN`: `7428752128:AAG_xNpjxnjmgD2IiQ7noqo75YtUH05HrtI`
     - `BOT_USERNAME`: `abay_earn_bot`
     - `WEB_APP_URL`: Your Netlify URL
     - `ADMIN_ID`: `5141496483`

3. **Update bot.js:**
   ```javascript
   const WEB_APP_URL = 'https://your-netlify-url.com';
   ```

4. **Configure @BotFather:**
   - Open @BotFather in Telegram
   - Send `/mybots`
   - Select `@abay_earn_bot`
   - Click "Bot Settings" → "Menu Button"
   - Set URL: Your Netlify URL
   - Set text: "🚀 Open App"

---

## 🎮 Test Features

### Test Referral System:
1. Open bot: https://t.me/abay_earn_bot
2. Send `/start`
3. Copy your referral link
4. Share with another account
5. Check if you get $1.00 reward

### Test Admin Panel:
1. Send `/admin` to @abay_earn_bot
2. Click "Open Admin Panel"
3. View dashboard stats

### Test Ads:
1. Open the app
2. Click "Watch Ad"
3. Watch the ad
4. Check if you get $0.05

---

## 📋 Current Status

✅ Bot configured: `@abay_earn_bot`  
✅ Admin access: `5141496483`  
✅ Referral system: Ready  
✅ Ad integration: Ready  
✅ Admin panel: Ready  
⏳ Deployment: Pending (follow DEPLOYMENT.md)

---

## 🔗 Important Links

- **Your Bot:** https://t.me/abay_earn_bot
- **BotFather:** https://t.me/BotFather
- **Netlify:** https://netlify.com
- **Railway:** https://railway.app

---

## 📚 Documentation

- **DEPLOYMENT.md** - Complete deployment guide
- **ADMIN_GUIDE.md** - How to use admin panel
- **AD_SETUP.md** - How to integrate ads
- **SETUP.md** - Detailed setup instructions

---

## 🆘 Quick Troubleshooting

**Bot not responding?**
```bash
# Check if bot is running
npm run bot
```

**Can't access admin panel?**
- Make sure your Telegram ID is `5141496483`
- Send `/admin` command to the bot

**Referrals not working?**
- Make sure backend API is running
- Check `API_BASE_URL` in js/api.js

---

## 🎉 Next Steps

1. ✅ Test bot locally (npm install && npm start && npm run bot)
2. ⏳ Deploy to production (see DEPLOYMENT.md)
3. ⏳ Configure Menu Button in @BotFather
4. ⏳ Test all features end-to-end
5. ⏳ Start inviting users!

---

**Your bot is ready to test!** 🚀

Open https://t.me/abay_earn_bot and send `/start` to begin!
