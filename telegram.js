// Telegram Web App Integration
const tg = window.Telegram.WebApp;

// Initialize Telegram Web App
function initTelegram() {
    tg.ready();
    tg.expand();
    
    // Apply Telegram theme
    document.body.style.background = tg.themeParams.bg_color || 
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    
    // Get user data
    const user = tg.initDataUnsafe?.user;
    return user;
}

// Show Telegram alert
function showAlert(message) {
    tg.showAlert(message);
}

// Show Telegram confirm
function showConfirm(message, callback) {
    tg.showConfirm(message, callback);
}

// Close the app
function closeApp() {
    tg.close();
}

// Share referral link via Telegram
function shareReferralLink(link) {
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent('Join Abay Earn and start earning today! 🚀')}`;
    tg.openTelegramLink(shareUrl);
}

// Haptic feedback
function hapticFeedback(type = 'medium') {
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred(type);
    }
}
