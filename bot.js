// Telegram Bot Handler for Referral System
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Your bot token from @BotFather
const BOT_TOKEN = process.env.BOT_TOKEN || '7428752128:AAG_xNpjxnjmgD2IiQ7noqo75YtUH05HrtI';
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://your-app-url.com';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Admin Configuration
const ADMIN_IDS = [5141496483]; // Your Telegram ID

// Admin command
bot.onText(/\/admin/, (msg) => {
    const userId = msg.from.id;
    
    if (!ADMIN_IDS.includes(userId)) {
        bot.sendMessage(msg.chat.id, '🔒 Access denied. You are not an admin.');
        return;
    }
    
    const keyboard = {
        inline_keyboard: [[
            {
                text: '🔐 Open Admin Panel',
                web_app: { url: `${WEB_APP_URL}/admin.html` }
            }
        ]]
    };
    
    bot.sendMessage(msg.chat.id, 
        '👑 *Admin Access Granted*\n\n' +
        'Welcome to the Abay Earn Admin Panel!\n\n' +
        'You can:\n' +
        '• View all users and statistics\n' +
        '• Manage withdrawal requests\n' +
        '• Configure app settings\n' +
        '• Send broadcast messages\n' +
        '• Ban/unban users',
        {
            reply_markup: keyboard,
            parse_mode: 'Markdown'
        }
    );
});

// Handle /start command with referral code
bot.onText(/\/start(.*)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const referralCode = match[1].trim();
    
    // Extract referrer ID from referral code
    let referrerId = null;
    if (referralCode && referralCode.startsWith('ABY')) {
        // Parse referrer ID from code (you'll need to map codes to IDs)
        // For now, we'll pass the code to the web app
        referrerId = referralCode;
    }
    
    // Welcome message
    const welcomeMessage = `
🚀 Welcome to Abay Earn!

Your gateway to smart earnings through referrals and ads.

✨ How it works:
• Invite friends and grow your network
• Earn 1 ETB for each referral
• Watch ads and earn 0.5 ETB instantly
• Track your progress in real-time

💰 Start earning now!
    `;
    
    // Create inline keyboard with Web App button
    const keyboard = {
        inline_keyboard: [
            [
                {
                    text: '🚀 Open Abay Earn',
                    web_app: { 
                        url: referrerId 
                            ? `${WEB_APP_URL}?ref=${referrerId}`
                            : WEB_APP_URL
                    }
                }
            ],
            [
                { text: '📊 My Stats', callback_data: 'stats' },
                { text: '🎁 Invite Friends', callback_data: 'invite' }
            ]
        ]
    };
    
    bot.sendMessage(chatId, welcomeMessage, {
        reply_markup: keyboard,
        parse_mode: 'Markdown'
    });
});

// Webhook endpoints for user notifications
webhookApp.post('/webhook/withdrawal-approved', (req, res) => {
    const { userId, amount } = req.body;
    
    bot.sendMessage(userId, 
        `✅ *Withdrawal Approved!*\n\n` +
        `💰 Amount: ${amount.toFixed(2)} ETB\n\n` +
        `Your payment will be processed shortly. Thank you for using Abay Earn! 🎉`,
        { parse_mode: 'Markdown' }
    );
    
    res.json({ success: true });
});

webhookApp.post('/webhook/withdrawal-rejected', (req, res) => {
    const { userId, amount } = req.body;
    
    bot.sendMessage(userId,
        `❌ *Withdrawal Rejected*\n\n` +
        `💰 Amount: ${amount.toFixed(2)} ETB\n\n` +
        `Your balance has been refunded. Please contact support if you have questions.`,
        { parse_mode: 'Markdown' }
    );
    
    res.json({ success: true });
});

// Handle callback queries
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    
    if (data === 'stats') {
        // Fetch user stats from API
        bot.answerCallbackQuery(query.id, {
            text: 'Opening your stats...',
            show_alert: false
        });
        
        const keyboard = {
            inline_keyboard: [[
                {
                    text: '📊 View Dashboard',
                    web_app: { url: WEB_APP_URL }
                }
            ]]
        };
        
        bot.sendMessage(chatId, 'Click below to view your full dashboard:', {
            reply_markup: keyboard
        });
    }
    
    if (data === 'invite') {
        const userId = query.from.id;
        const referralCode = `ABY${userId.toString().slice(-6)}`;
        const referralLink = `https://t.me/abay_earn_bot?start=${referralCode}`;
        
        bot.answerCallbackQuery(query.id);
        
        bot.sendMessage(chatId, 
            `🎁 Your Referral Link:\n\n${referralLink}\n\n` +
            `Share this link and earn 1 ETB for each friend who joins!`,
            {
                reply_markup: {
                    inline_keyboard: [[
                        {
                            text: '📤 Share Link',
                            url: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Join Abay Earn and start earning! 🚀')}`
                        }
                    ]]
                }
            }
        );
    }
});

// Withdrawal notification handler
const express = require('express');
const webhookApp = express();
webhookApp.use(express.json());

// Admin ID for notifications
const ADMIN_CHAT_ID = 5141496483;

// Webhook endpoint for withdrawal notifications
webhookApp.post('/webhook/withdrawal', (req, res) => {
    const { id, userId, userName, amount, timestamp } = req.body;
    
    const message = `
🔔 *New Withdrawal Request*

💰 Amount: ${amount.toFixed(2)} ETB
👤 User: ${userName}
🆔 User ID: ${userId}
📅 Time: ${new Date(timestamp).toLocaleString()}
🔖 Request ID: ${id}

Please review and approve/reject in the admin panel.
    `;
    
    const keyboard = {
        inline_keyboard: [
            [
                { text: '✅ Approve', callback_data: `approve_${id}` },
                { text: '❌ Reject', callback_data: `reject_${id}` }
            ],
            [
                { text: '📊 Open Admin Panel', web_app: { url: `${WEB_APP_URL}/admin.html` } }
            ]
        ]
    };
    
    bot.sendMessage(ADMIN_CHAT_ID, message, {
        reply_markup: keyboard,
        parse_mode: 'Markdown'
    });
    
    res.json({ success: true });
});

// Handle withdrawal approval/rejection from Telegram
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    
    // Handle withdrawal actions
    if (data.startsWith('approve_') || data.startsWith('reject_')) {
        const [action, withdrawalId] = data.split('_');
        
        if (chatId !== ADMIN_CHAT_ID) {
            bot.answerCallbackQuery(query.id, {
                text: '❌ Only admin can perform this action',
                show_alert: true
            });
            return;
        }
        
        try {
            const endpoint = action === 'approve' ? 'approve' : 'reject';
            const response = await fetch(`http://localhost:3000/api/admin/withdrawals/${withdrawalId}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'x-user-id': ADMIN_CHAT_ID.toString()
                }
            });
            
            if (response.ok) {
                const actionText = action === 'approve' ? '✅ Approved' : '❌ Rejected';
                bot.answerCallbackQuery(query.id, {
                    text: `${actionText} successfully!`,
                    show_alert: true
                });
                
                // Update the message
                bot.editMessageText(
                    query.message.text + `\n\n${actionText} by admin`,
                    {
                        chat_id: chatId,
                        message_id: query.message.message_id,
                        parse_mode: 'Markdown'
                    }
                );
            }
        } catch (error) {
            bot.answerCallbackQuery(query.id, {
                text: '❌ Failed to process. Please try again.',
                show_alert: true
            });
        }
        return;
    }
    
    // Handle other callback queries (stats, invite)
    if (data === 'stats') {
        bot.answerCallbackQuery(query.id, {
            text: 'Opening your stats...',
            show_alert: false
        });
        
        const keyboard = {
            inline_keyboard: [[
                {
                    text: '📊 View Dashboard',
                    web_app: { url: WEB_APP_URL }
                }
            ]]
        };
        
        bot.sendMessage(chatId, 'Click below to view your full dashboard:', {
            reply_markup: keyboard
        });
    }
    
    if (data === 'invite') {
        const userId = query.from.id;
        const referralCode = `ABY${userId.toString().slice(-6)}`;
        const referralLink = `https://t.me/abay_earn_bot?start=${referralCode}`;
        
        bot.answerCallbackQuery(query.id);
        
        bot.sendMessage(chatId, 
            `🎁 Your Referral Link:\n\n${referralLink}\n\n` +
            `Share this link and earn 1 ETB for each friend who joins!`,
            {
                reply_markup: {
                    inline_keyboard: [[
                        {
                            text: '📤 Share Link',
                            url: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Join Abay Earn and start earning! 🚀')}`
                        }
                    ]]
                }
            }
        );
    }
});

// Start webhook server
const WEBHOOK_PORT = process.env.WEBHOOK_PORT || 3001;
webhookApp.listen(WEBHOOK_PORT, () => {
    console.log(`📡 Webhook server running on port ${WEBHOOK_PORT}`);
});

console.log('🤖 Telegram Bot is running...');
console.log(`👑 Admin notifications will be sent to: ${ADMIN_CHAT_ID}`);
