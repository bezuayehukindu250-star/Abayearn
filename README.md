# 🚀 Abay Earn

Your gateway to smart earnings through referrals and ads.

## ✨ Features

- **Referral System**: Invite friends and earn $1.00 per referral
- **Ad Rewards**: Watch ads and earn $0.05 instantly
- **Real-time Dashboard**: Track earnings, referrals, and activity
- **Telegram Integration**: Seamless Telegram Mini App experience
- **Fast Payouts**: Withdraw earnings when you reach $5.00

## 🛠️ Tech Stack

- HTML5, CSS3, JavaScript (Vanilla)
- Telegram Web App API
- Modern responsive design

## 🚀 Getting Started

### 1. Setup Telegram Bot

1. Create a bot with [@BotFather](https://t.me/botfather)
2. Get your bot token
3. Enable Web App in bot settings

### 2. Deploy Frontend

Deploy these files to any static hosting:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

### 3. Configure Backend

Replace `API_BASE_URL` in `js/api.js` with your backend API endpoint.

### 4. Update Bot Link

In `js/app.js`, replace `https://t.me/your_bot` with your actual bot username.

## 📱 Testing

### Test in Telegram
1. Open your bot in Telegram
2. Send `/start` command
3. Click "Open App" button

### Test Locally
Open `index.html` in a browser (demo mode will activate)

## 🔧 Backend Requirements

Your backend API should implement these endpoints:

```
GET  /api/users/:userId          - Get user data
POST /api/users                  - Create new user
POST /api/earnings/ad            - Record ad view
POST /api/earnings/referral      - Record referral
POST /api/withdrawals            - Request withdrawal
GET  /api/activity/:userId       - Get activity history
```

## 💡 Customization

- Update colors in `css/style.css`
- Modify reward amounts in `index.html` and `js/app.js`
- Add your ad network SDK in `js/app.js` (watchAd function)
- Integrate payment gateway for withdrawals

## 📄 License

MIT License - Built with Kiro AI

---

**Start earning today with Abay Earn!** 💰
