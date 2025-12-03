# 👑 Admin Panel Guide

## Your Admin Access

**Your Telegram ID:** `5141496483`

You now have full admin access to Abay Earn!

---

## 🚀 How to Access Admin Panel

### Method 1: Via Bot Command
1. Open your bot in Telegram
2. Send `/admin` command
3. Click "🔐 Open Admin Panel" button

### Method 2: Direct URL
Open: `https://your-app-url.com/admin.html`

---

## 📊 Admin Features

### 1. Dashboard Overview
- **Total Users**: See how many users joined
- **Total Earnings**: All user balances combined
- **Ads Watched**: Total ad views across all users
- **Total Referrals**: All successful referrals

### 2. User Management
- View all registered users
- See user details (balance, referrals, ads watched)
- Search users by name or ID
- Ban/unban users
- View individual user activity

### 3. Withdrawal Management
- See all pending withdrawal requests
- Approve withdrawals (process payments)
- Reject withdrawals (with reason)
- Track withdrawal history

### 4. App Settings
- Change ad reward amount (default: $0.05)
- Change referral reward (default: $1.00)
- Set minimum withdrawal amount (default: $5.00)
- Update app configuration

### 5. Broadcast Messages
- Send messages to all users
- Announce new features
- Send promotional messages
- Notify about maintenance

---

## 🔐 Security

Your admin ID is hardcoded in:
- `js/admin.js` (line 2)
- `server.js` (line 67)
- `bot.js` (line 8)

Only your Telegram ID (5141496483) can access admin features.

---

## 📝 Common Admin Tasks

### Approve a Withdrawal
1. Go to Admin Panel
2. Click "Withdrawals"
3. Review pending requests
4. Click "Approve" to process
5. Send payment manually (via bank/crypto)

### Ban a User
1. Go to "Manage Users"
2. Find the user
3. Click "Ban"
4. User can no longer earn or withdraw

### Change Reward Amounts
1. Click "Settings"
2. Update values:
   - Ad Reward: $0.05 → $0.10
   - Referral: $1.00 → $2.00
3. Click "Save Settings"

### Send Announcement
1. Click "Broadcast"
2. Type your message
3. Click "Send to All Users"
4. All users receive notification

---

## 🛠️ Adding More Admins

To add another admin, edit these files:

**js/admin.js (line 2):**
```javascript
const ADMIN_IDS = [5141496483, 1234567890]; // Add new ID
```

**server.js (line 67):**
```javascript
const ADMIN_IDS = [5141496483, 1234567890];
```

**bot.js (line 8):**
```javascript
const ADMIN_IDS = [5141496483, 1234567890];
```

---

## 📱 Testing Admin Panel

1. Deploy your app
2. Open bot in Telegram
3. Send `/admin`
4. Click "Open Admin Panel"
5. You should see the dashboard

If access is denied, check:
- Your Telegram ID is correct
- Backend is running
- Admin IDs match in all files

---

## 🎯 Next Steps

1. **Deploy the app** (see SETUP.md)
2. **Test admin access** with `/admin` command
3. **Configure settings** (rewards, minimums)
4. **Monitor users** as they join
5. **Process withdrawals** when requested

---

You're all set as admin! 👑
