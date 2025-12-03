# 💸 Automatic Withdrawal Notification System

## 🎯 How It Works

When a user requests a withdrawal, you (the admin) automatically receive a Telegram notification!

---

## 📱 User Flow

### 1. User Requests Withdrawal
1. User opens the app
2. Clicks "Withdraw" button
3. Confirms withdrawal amount
4. Request is submitted

### 2. Admin Gets Notified
You receive a Telegram message instantly:

```
🔔 New Withdrawal Request

💰 Amount: 100.00 ETB
👤 User: John Doe
🆔 User ID: 123456789
📅 Time: 12/3/2025, 2:30 PM
🔖 Request ID: WD1

Please review and approve/reject in the admin panel.
```

With buttons:
- ✅ **Approve** - Approve instantly
- ❌ **Reject** - Reject instantly
- 📊 **Open Admin Panel** - View details

### 3. Admin Takes Action

**Option A: Quick Approve (via Telegram)**
1. Click "✅ Approve" button
2. Withdrawal is approved
3. User gets notification
4. You send payment manually

**Option B: Quick Reject (via Telegram)**
1. Click "❌ Reject" button
2. Withdrawal is rejected
3. User's balance is refunded
4. User gets notification

**Option C: Review in Admin Panel**
1. Click "📊 Open Admin Panel"
2. See all pending withdrawals
3. Review details
4. Approve or reject

### 4. User Gets Notified

**If Approved:**
```
✅ Withdrawal Approved!

💰 Amount: 100.00 ETB

Your payment will be processed shortly. 
Thank you for using Abay Earn! 🎉
```

**If Rejected:**
```
❌ Withdrawal Rejected

💰 Amount: 100.00 ETB

Your balance has been refunded. 
Please contact support if you have questions.
```

---

## 🚀 Setup Instructions

### 1. Start Both Servers

**Terminal 1 - API Server:**
```bash
npm start
```
This runs on port 3000

**Terminal 2 - Bot + Webhook:**
```bash
npm run bot
```
This runs the bot and webhook on port 3001

### 2. Test the System

1. Open the app as a regular user
2. Earn some ETB (watch ads or get referrals)
3. Click "Withdraw" button
4. Confirm withdrawal
5. Check your Telegram - you should get a notification!

---

## 💡 Features

### Instant Notifications
- ✅ Real-time alerts when users request withdrawals
- ✅ All details included (amount, user, time)
- ✅ Direct action buttons

### Quick Actions
- ✅ Approve with one tap
- ✅ Reject with one tap
- ✅ No need to open admin panel

### User Notifications
- ✅ Users get notified when approved
- ✅ Users get notified when rejected
- ✅ Balance auto-refunded on rejection

### Admin Panel Integration
- ✅ View all pending withdrawals
- ✅ See withdrawal history
- ✅ Manage from web interface

---

## 📊 Withdrawal Statuses

### Pending
- User submitted request
- Waiting for admin review
- Shows in admin panel

### Approved
- Admin approved the request
- User notified
- Admin must send payment manually

### Rejected
- Admin rejected the request
- User notified
- Balance refunded automatically

---

## 🔧 Configuration

### Change Webhook Port
Edit `.env`:
```env
WEBHOOK_PORT=3001
WEBHOOK_URL=http://localhost:3001
```

### Change Admin ID
Edit `bot.js` (line 13):
```javascript
const ADMIN_CHAT_ID = 5141496483; // Your Telegram ID
```

### Change Minimum Withdrawal
Edit `.env`:
```env
MIN_WITHDRAWAL=50  # Change to any amount
```

---

## 💳 Payment Process

### After Approving a Withdrawal:

1. **You receive notification** with user details
2. **Click "Approve"** in Telegram
3. **Send payment manually:**
   - Bank transfer
   - Mobile money (M-Pesa, etc.)
   - Crypto wallet
   - Cash pickup
4. **User receives confirmation** automatically
5. **Done!** User is happy 😊

### Payment Methods You Can Use:
- 🏦 Bank transfer
- 📱 Mobile money (Telebirr, M-Pesa, etc.)
- 💳 PayPal
- 🪙 Cryptocurrency
- 💵 Cash pickup

---

## 🎯 Example Scenario

### Scenario: User "Sarah" requests 150 ETB

**Step 1:** Sarah clicks "Withdraw" in the app
```
Balance: 150 ETB → Withdraw
```

**Step 2:** You get Telegram notification
```
🔔 New Withdrawal Request
💰 Amount: 150.00 ETB
👤 User: Sarah Ahmed
🆔 User ID: 987654321
```

**Step 3:** You click "✅ Approve"
```
✅ Approved successfully!
```

**Step 4:** You send 150 ETB to Sarah via Telebirr

**Step 5:** Sarah gets notification
```
✅ Withdrawal Approved!
💰 Amount: 150.00 ETB
Your payment will be processed shortly.
```

**Step 6:** Sarah receives 150 ETB in her Telebirr account

**Done!** ✅

---

## 🆘 Troubleshooting

### Not Receiving Notifications?

**Check 1:** Is the bot running?
```bash
npm run bot
```

**Check 2:** Is your Telegram ID correct?
- Your ID: `5141496483`
- Check in `bot.js` line 13

**Check 3:** Did you start the bot?
- Open @abay_earn_bot
- Send `/start`
- This activates notifications

### Buttons Not Working?

**Check 1:** Is API server running?
```bash
npm start
```

**Check 2:** Check webhook URL
- Should be: `http://localhost:3001`
- Edit in `.env` if different

### User Not Getting Notification?

**Check 1:** Did user start the bot?
- User must have opened @abay_earn_bot
- User must have sent `/start`

**Check 2:** Check bot token
- Verify in `.env`
- Should be: `7428752128:AAG_xNpjxnjmgD2IiQ7noqo75YtUH05HrtI`

---

## 📱 Admin Commands

### View Pending Withdrawals
Send `/admin` to the bot, then click "💸 Payouts"

### Approve All Pending
Open admin panel → Withdrawals → Click "Approve" on each

### Check Withdrawal History
Open admin panel → View all approved/rejected withdrawals

---

## 🎉 Benefits

### For You (Admin):
- ✅ Instant notifications
- ✅ Quick approval/rejection
- ✅ No need to check admin panel constantly
- ✅ Process withdrawals on the go

### For Users:
- ✅ Fast processing
- ✅ Instant confirmation
- ✅ Transparent system
- ✅ Auto-refund on rejection

---

## 🚀 Production Deployment

When deploying to production:

1. **Update webhook URL** in `.env`:
   ```env
   WEBHOOK_URL=https://your-backend-url.com
   ```

2. **Use environment variables** for sensitive data

3. **Enable HTTPS** for webhook endpoints

4. **Monitor notifications** to ensure delivery

---

## 📞 Quick Reference

### Your Admin ID:
`5141496483`

### Webhook Port:
`3001`

### Minimum Withdrawal:
`50 ETB`

### Bot Username:
`@abay_earn_bot`

---

**You're all set!** 🎉

Start the servers and test by requesting a withdrawal. You'll get notified instantly in Telegram!
