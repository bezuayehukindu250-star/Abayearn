// Simple Node.js + Express Backend for Abay Earn
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory database (use MongoDB/PostgreSQL in production)
const users = new Map();
const activities = new Map();

// Generate unique referral code
function generateReferralCode(userId) {
    return `ABY${userId.toString().slice(-6)}`;
}

// Create or Get User
app.post('/api/users', async (req, res) => {
    const { id, username, firstName, lastName, referredBy } = req.body;
    
    if (users.has(id)) {
        return res.json(users.get(id));
    }
    
    const user = {
        id,
        username,
        firstName,
        lastName,
        balance: 0,
        referralCount: 0,
        adsWatched: 0,
        todayEarnings: 0,
        referralCode: generateReferralCode(id),
        createdAt: Date.now()
    };
    
    users.set(id, user);
    
    // Handle referral reward
    if (referredBy) {
        const referrer = users.get(referredBy);
        if (referrer) {
            referrer.balance += 1;
            referrer.referralCount += 1;
            users.set(referredBy, referrer);
            
            // Log activity
            addActivity(referredBy, 'Referral Bonus', 1);
        }
    }
    
    res.json(user);
});

// Get User Data
app.get('/api/users/:userId', (req, res) => {
    const user = users.get(req.params.userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Record Ad View
app.post('/api/earnings/ad', (req, res) => {
    const { userId } = req.body;
    const user = users.get(userId);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    user.balance += 0.5;
    user.adsWatched += 1;
    user.todayEarnings += 0.5;
    users.set(userId, user);
    
    addActivity(userId, 'Ad Reward', 0.5);
    
    res.json({ success: true, newBalance: user.balance });
});

// Withdrawal storage
const withdrawals = new Map();
let withdrawalIdCounter = 1;

// Request Withdrawal
app.post('/api/withdrawals', (req, res) => {
    const { userId, amount } = req.body;
    const user = users.get(userId);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    if (user.balance < amount || amount < 50) {
        return res.status(400).json({ error: 'Invalid amount' });
    }
    
    // Create withdrawal request
    const withdrawalId = `WD${withdrawalIdCounter++}`;
    const withdrawal = {
        id: withdrawalId,
        userId: userId,
        userName: `${user.firstName || 'User'} ${user.lastName || ''}`.trim(),
        amount: amount,
        status: 'pending',
        timestamp: Date.now()
    };
    
    withdrawals.set(withdrawalId, withdrawal);
    
    // Deduct from user balance
    user.balance -= amount;
    users.set(userId, user);
    
    addActivity(userId, 'Withdrawal Requested', -amount);
    
    // Notify admin via webhook (will be handled by bot)
    notifyAdminWithdrawal(withdrawal);
    
    res.json({ success: true, message: 'Withdrawal request submitted', withdrawalId });
});

// Get pending withdrawals for admin
app.get('/api/admin/withdrawals', isAdmin, (req, res) => {
    const pendingWithdrawals = Array.from(withdrawals.values())
        .filter(w => w.status === 'pending')
        .sort((a, b) => b.timestamp - a.timestamp);
    res.json(pendingWithdrawals);
});

// Approve withdrawal
app.post('/api/admin/withdrawals/:id/approve', isAdmin, (req, res) => {
    const withdrawal = withdrawals.get(req.params.id);
    if (!withdrawal) {
        return res.status(404).json({ error: 'Withdrawal not found' });
    }
    
    withdrawal.status = 'approved';
    withdrawals.set(req.params.id, withdrawal);
    
    // Notify user via bot
    notifyUserWithdrawalApproved(withdrawal);
    
    res.json({ success: true });
});

// Reject withdrawal
app.post('/api/admin/withdrawals/:id/reject', isAdmin, (req, res) => {
    const withdrawal = withdrawals.get(req.params.id);
    if (!withdrawal) {
        return res.status(404).json({ error: 'Withdrawal not found' });
    }
    
    withdrawal.status = 'rejected';
    withdrawals.set(req.params.id, withdrawal);
    
    // Refund user balance
    const user = users.get(withdrawal.userId);
    if (user) {
        user.balance += withdrawal.amount;
        users.set(withdrawal.userId, user);
        addActivity(withdrawal.userId, 'Withdrawal Rejected (Refunded)', withdrawal.amount);
    }
    
    // Notify user via bot
    notifyUserWithdrawalRejected(withdrawal);
    
    res.json({ success: true });
});

// Notification functions
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'http://localhost:3001';

async function notifyAdminWithdrawal(withdrawal) {
    try {
        await fetch(`${WEBHOOK_URL}/webhook/withdrawal`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(withdrawal)
        });
    } catch (error) {
        console.error('Failed to notify admin:', error);
    }
}

async function notifyUserWithdrawalApproved(withdrawal) {
    try {
        await fetch(`${WEBHOOK_URL}/webhook/withdrawal-approved`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(withdrawal)
        });
    } catch (error) {
        console.error('Failed to notify user:', error);
    }
}

async function notifyUserWithdrawalRejected(withdrawal) {
    try {
        await fetch(`${WEBHOOK_URL}/webhook/withdrawal-rejected`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(withdrawal)
        });
    } catch (error) {
        console.error('Failed to notify user:', error);
    }
}

// Get Activity
app.get('/api/activity/:userId', (req, res) => {
    const userActivities = activities.get(req.params.userId) || [];
    res.json(userActivities.slice(-10).reverse());
});

// Helper: Add Activity
function addActivity(userId, type, amount) {
    if (!activities.has(userId)) {
        activities.set(userId, []);
    }
    
    const userActivities = activities.get(userId);
    userActivities.push({
        type,
        amount,
        timestamp: Date.now()
    });
    
    activities.set(userId, userActivities);
}

// Admin Configuration
const ADMIN_IDS = [5141496483]; // Your Telegram ID

// Middleware to check admin access
function isAdmin(req, res, next) {
    const userId = req.headers['x-user-id'];
    if (!userId || !ADMIN_IDS.includes(parseInt(userId))) {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
}

// Admin Endpoints
app.get('/api/admin/stats', isAdmin, (req, res) => {
    let totalEarnings = 0;
    let totalAds = 0;
    let totalReferrals = 0;
    
    users.forEach(user => {
        totalEarnings += user.balance;
        totalAds += user.adsWatched;
        totalReferrals += user.referralCount;
    });
    
    res.json({
        totalUsers: users.size,
        totalEarnings,
        totalAds,
        totalReferrals
    });
});

app.get('/api/admin/users', isAdmin, (req, res) => {
    const userList = Array.from(users.values())
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 50);
    res.json(userList);
});

app.get('/api/admin/withdrawals', isAdmin, (req, res) => {
    // Return pending withdrawals (you'll need to implement withdrawal storage)
    res.json([]);
});

app.post('/api/admin/users/:userId/ban', isAdmin, (req, res) => {
    const user = users.get(req.params.userId);
    if (user) {
        user.banned = true;
        users.set(req.params.userId, user);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.post('/api/admin/settings', isAdmin, (req, res) => {
    // Save settings (implement persistent storage)
    console.log('Settings updated:', req.body);
    res.json({ success: true });
});

app.post('/api/admin/broadcast', isAdmin, (req, res) => {
    const { message } = req.body;
    // Implement broadcast via Telegram bot
    console.log('Broadcasting message:', message);
    res.json({ success: true, sent: users.size });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Abay Earn API running on port ${PORT}`);
    console.log(`👑 Admin ID: 5141496483`);
});
