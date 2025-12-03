// App State
let userData = {
    id: null,
    balance: 0,
    referralCount: 0,
    adsWatched: 0,
    todayEarnings: 0,
    referralCode: null
};

// Initialize App
async function initApp() {
    const user = initTelegram();
    
    if (user) {
        userData.id = user.id;
        await loadUserData(user);
    } else {
        // Demo mode for testing outside Telegram
        userData.id = 'demo_' + Date.now();
        userData.referralCode = 'DEMO123';
        updateUI();
    }
    
    setupEventListeners();
}

// Load user data from backend
async function loadUserData(user) {
    // Check if user came from referral link
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('ref');
    
    // Try to get existing user data
    let data = await getUserData(user.id);
    
    // If user doesn't exist, create new user
    if (data.error) {
        data = await createUser({
            id: user.id,
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            referredBy: referralCode ? parseReferrerId(referralCode) : null
        });
    }
    
    if (data && !data.error) {
        userData = { ...userData, ...data };
        updateUI();
        loadActivity();
    }
}

// Parse referrer ID from referral code
function parseReferrerId(code) {
    // Extract user ID from code like "ABY123456"
    if (code.startsWith('ABY')) {
        return code.substring(3);
    }
    return null;
}

// Update UI with current data
function updateUI() {
    document.getElementById('totalBalance').textContent = `$${userData.balance.toFixed(2)}`;
    document.getElementById('referralCount').textContent = userData.referralCount;
    document.getElementById('adsWatched').textContent = userData.adsWatched;
    document.getElementById('todayEarnings').textContent = `$${userData.todayEarnings.toFixed(2)}`;
    
    const referralLink = `https://t.me/abay_earn_bot?start=${userData.referralCode || 'LOADING'}`;
    document.getElementById('referralLink').value = referralLink;
}

// Load activity history
async function loadActivity() {
    const activities = await getActivity(userData.id);
    
    if (activities && activities.length > 0) {
        const activityList = document.getElementById('activityList');
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div>
                    <div class="activity-type">${activity.type}</div>
                    <div class="activity-time">${formatTime(activity.timestamp)}</div>
                </div>
                <div class="activity-amount">+$${activity.amount.toFixed(2)}</div>
            </div>
        `).join('');
    }
}

// Watch Ad Handler
async function watchAd() {
    hapticFeedback();
    
    // Show loading state
    const watchBtn = document.getElementById('watchAdBtn');
    const originalText = watchBtn.innerHTML;
    watchBtn.innerHTML = '<span class="action-icon">⏳</span><span class="action-text">Loading Ad...</span>';
    watchBtn.disabled = true;
    
    try {
        // Show real ad (from ads.js)
        const adWatched = await window.showRewardedAd();
        
        if (adWatched) {
            // User watched the ad completely
            const result = await recordAdView(userData.id);
            
            if (result && !result.error) {
                userData.balance += 0.5;
                userData.adsWatched += 1;
                userData.todayEarnings += 0.5;
                updateUI();
                showAlert('Great! You earned 0.5 ETB 🎉');
                loadActivity();
            }
        } else {
            // User skipped the ad
            showAlert('Ad skipped. Watch the full ad to earn rewards!');
        }
    } catch (error) {
        console.error('Ad error:', error);
        showAlert('Ad failed to load. Please try again.');
    } finally {
        // Reset button
        watchBtn.innerHTML = originalText;
        watchBtn.disabled = false;
    }
}

// Invite Friends Handler
function inviteFriends() {
    hapticFeedback();
    const referralLink = document.getElementById('referralLink').value;
    shareReferralLink(referralLink);
}

// Copy Referral Link
function copyReferralLink() {
    hapticFeedback('light');
    const referralLink = document.getElementById('referralLink');
    referralLink.select();
    document.execCommand('copy');
    
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyBtn.textContent = 'Copy';
    }, 2000);
}

// Withdraw Handler
async function withdraw() {
    hapticFeedback();
    
    if (userData.balance < 5) {
        showAlert('Minimum withdrawal amount is $5.00');
        return;
    }
    
    showConfirm(`Withdraw $${userData.balance.toFixed(2)}?`, async (confirmed) => {
        if (confirmed) {
            const result = await requestWithdrawal(userData.id, userData.balance);
            
            if (result && !result.error) {
                showAlert('Withdrawal request submitted! 💰');
                userData.balance = 0;
                updateUI();
            } else {
                showAlert('Withdrawal failed. Please try again.');
            }
        }
    });
}

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('watchAdBtn').addEventListener('click', watchAd);
    document.getElementById('inviteBtn').addEventListener('click', inviteFriends);
    document.getElementById('copyBtn').addEventListener('click', copyReferralLink);
    document.getElementById('withdrawBtn').addEventListener('click', withdraw);
}

// Utility Functions
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
}

// Navigation Handler
function navigateTo(page) {
    hapticFeedback('light');
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-page="${page}"]`).classList.add('active');
    
    // Handle page navigation
    switch(page) {
        case 'home':
            // Already on home, scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
            
        case 'earn':
            // Scroll to actions section
            document.querySelector('.actions').scrollIntoView({ behavior: 'smooth' });
            break;
            
        case 'referrals':
            // Scroll to referral section
            document.querySelector('.referral-section').scrollIntoView({ behavior: 'smooth' });
            break;
            
        case 'wallet':
            // Scroll to balance card
            document.querySelector('.balance-card').scrollIntoView({ behavior: 'smooth' });
            break;
    }
}

// Start the app
document.addEventListener('DOMContentLoaded', initApp);
