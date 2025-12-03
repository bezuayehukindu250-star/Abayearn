# 👑 How to Use Admin Panel - Step by Step

## 🚀 Quick Access

### Method 1: Via Telegram Bot (Easiest)
1. Open your bot: https://t.me/abay_earn_bot
2. Send the command: `/admin`
3. Click the "🔐 Open Admin Panel" button
4. Admin panel opens!

### Method 2: Direct URL (After Deployment)
Open: `https://your-deployed-url.com/admin.html`

### Method 3: Local Testing
1. Start your servers:
   ```bash
   npm start        # Terminal 1 - API
   npm run bot      # Terminal 2 - Bot
   ```
2. Open `admin.html` in your browser

---

## 📊 Dashboard Overview

When you open the admin panel, you'll see:

### Top Stats Cards:
- **👥 Total Users** - How many people joined
- **💰 Total Earnings** - All user balances combined (in ETB)
- **📺 Ads Watched** - Total ad views across all users
- **🎁 Total Referrals** - All successful referrals

### Quick Actions:
Four big buttons to access different sections:
- **👥 Manage Users** - View and manage all users
- **💸 Withdrawals** - Approve/reject payout requests
- **⚙️ Settings** - Change reward amounts
- **📢 Broadcast** - Send messages to all users

---

## 👥 Managing Users

### View All Users:
1. Click "Manage Users" button
2. See list of all registered users
3. Each user shows:
   - Name
   - User ID
   - Balance (ETB)
   - Number of referrals
   - Ads watched

### Search for a User:
1. Use the search bar at top
2. Type user name or ID
3. Click 🔍 to search

### Ban a User:
1. Find the user in the list
2. Click "Ban" button next to their name
3. Confirm the action
4. User can no longer earn or withdraw

### View User Details:
1. Click "View" button next to user
2. See full user information
3. (More features coming soon!)

---

## 💸 Managing Withdrawals

### View Pending Withdrawals:
1. Click "Withdrawals" in quick actions
2. See all pending payout requests
3. Each request shows:
   - Amount (ETB)
   - User name and ID
   - Request date/time

### Approve a Withdrawal:
1. Review the withdrawal request
2. Click "Approve" button
3. **Important:** You must manually send the payment!
   - Via bank transfer
   - Via mobile money
   - Via crypto
4. After sending payment, the withdrawal is marked as complete

### Reject a Withdrawal:
1. Click "Reject" button
2. Confirm rejection
3. User's balance is restored
4. User can request again later

---

## ⚙️ App Settings

### Change Reward Amounts:
1. Click "Settings" in quick actions
2. You'll see three fields:

   **Ad Reward Amount (ETB)**
   - Current: 0.5 ETB
   - Change to any amount (e.g., 1 ETB, 0.25 ETB)

   **Referral Reward (ETB)**
   - Current: 1 ETB
   - Change to any amount (e.g., 2 ETB, 5 ETB)

   **Minimum Withdrawal (ETB)**
   - Current: 50 ETB
   - Change to any amount (e.g., 100 ETB, 25 ETB)

3. Click "Save Settings"
4. Changes apply immediately to new earnings

---

## 📢 Broadcast Messages

### Send Message to All Users:
1. Click "Broadcast" in quick actions
2. Type your message in the text box
3. Examples:
   ```
   🎉 New feature: Watch ads and earn 1 ETB now!
   
   ⚠️ Maintenance scheduled for tomorrow 2 PM
   
   🎁 Special offer: Invite 5 friends, get 10 ETB bonus!
   ```
4. Click "Send to All Users"
5. Confirm the broadcast
6. All users receive the message via Telegram bot

---

## 🎯 Common Admin Tasks

### Task 1: Process a Withdrawal
```
1. Go to Withdrawals section
2. See: "User: John (123456) - 100 ETB"
3. Click "Approve"
4. Send 100 ETB to John via bank/mobile money
5. Done! User receives confirmation
```

### Task 2: Ban a Spammer
```
1. Go to Manage Users
2. Search for the user
3. Click "Ban" next to their name
4. Confirm ban
5. User is blocked from earning
```

### Task 3: Increase Ad Rewards
```
1. Go to Settings
2. Change "Ad Reward" from 0.5 to 1.0
3. Click "Save Settings"
4. New ad views now pay 1 ETB instead of 0.5 ETB
```

### Task 4: Announce New Feature
```
1. Go to Broadcast
2. Type: "🎉 New feature! Earn 2 ETB per referral now!"
3. Click "Send to All Users"
4. All users get the message
```

---

## 📱 Bottom Navigation Bar

The admin panel has a fixed bottom navigation:

- **📊 Dashboard** - Tap to scroll to top stats
- **👥 Users** - Tap to jump to user management
- **💸 Payouts** - Tap to see withdrawals
- **⚙️ Settings** - Tap to open settings

The active page is highlighted with a purple indicator.

---

## 🔐 Security

### Who Can Access Admin Panel?
Only you! Your Telegram ID (`5141496483`) is hardcoded as admin.

### What if Someone Else Tries?
They'll see: "🔒 Access Denied - You don't have permission"

### How to Add Another Admin?
Edit these files and add their Telegram ID:
- `js/admin.js` (line 2)
- `server.js` (line 67)
- `bot.js` (line 11)

Example:
```javascript
const ADMIN_IDS = [5141496483, 9876543210]; // Add new admin ID
```

---

## 📊 Understanding the Stats

### Total Users
- Counts everyone who opened the app
- Includes active and inactive users

### Total Earnings
- Sum of all user balances
- This is money you'll need to pay out
- Monitor this to manage your budget

### Ads Watched
- Total number of ads viewed
- Each ad costs you 0.5 ETB
- Use this to calculate ad revenue needed

### Total Referrals
- Number of successful referrals
- Each referral costs you 1 ETB
- Track growth of your user base

---

## 💡 Pro Tips

### Tip 1: Check Daily
- Review withdrawals every day
- Process payments quickly to keep users happy

### Tip 2: Monitor Earnings
- Watch "Total Earnings" stat
- Make sure you have funds to pay users

### Tip 3: Adjust Rewards
- If too many users, lower rewards
- If too few users, increase rewards

### Tip 4: Use Broadcasts
- Announce new features
- Remind users to invite friends
- Share success stories

### Tip 5: Ban Fraudsters
- Watch for suspicious activity
- Ban users who abuse the system
- Check referral patterns

---

## 🆘 Troubleshooting

### Can't Access Admin Panel?
**Problem:** "Access Denied" message
**Solution:** 
- Verify your Telegram ID is 5141496483
- Check you're logged into correct Telegram account
- Make sure backend is running

### Stats Not Loading?
**Problem:** Shows "0" for everything
**Solution:**
- Check backend API is running (`npm start`)
- Open browser console (F12) for errors
- Verify API_BASE_URL in js/api.js

### Withdrawals Not Showing?
**Problem:** "No pending withdrawals"
**Solution:**
- Users must request withdrawals first
- Minimum withdrawal is 50 ETB
- Check if users have enough balance

### Broadcast Not Working?
**Problem:** Users not receiving messages
**Solution:**
- Make sure bot is running (`npm run bot`)
- Check bot token is correct
- Verify users have started the bot

---

## 📞 Quick Reference

### Admin Commands:
- `/admin` - Open admin panel in Telegram

### Admin URL:
- Local: `http://localhost:3000/admin.html`
- Production: `https://your-url.com/admin.html`

### Your Admin ID:
- `5141496483`

### Default Settings:
- Ad Reward: 0.5 ETB
- Referral Reward: 1 ETB
- Min Withdrawal: 50 ETB

---

## 🎉 You're Ready!

You now know how to:
- ✅ Access the admin panel
- ✅ View user statistics
- ✅ Manage users and ban spammers
- ✅ Process withdrawal requests
- ✅ Change reward settings
- ✅ Send broadcast messages

**Start by sending `/admin` to your bot!** 🚀

Need more help? Check ADMIN_GUIDE.md for technical details.
