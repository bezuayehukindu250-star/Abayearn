// Ad Network Integration for Abay Earn

// ============================================
// OPTION 1: Telegram Ads (Recommended)
// ============================================
// Telegram's native ad platform - best integration
function initTelegramAds() {
    if (window.Adsgram) {
        const AdController = window.Adsgram.init({ blockId: "YOUR_BLOCK_ID" });
        return AdController;
    }
    return null;
}

async function showTelegramAd() {
    const AdController = initTelegramAds();
    
    if (!AdController) {
        console.error('Adsgram not loaded');
        return false;
    }
    
    try {
        await AdController.show();
        return true; // Ad watched successfully
    } catch (error) {
        console.error('Ad error:', error);
        return false;
    }
}

// ============================================
// OPTION 2: AdMob (Google Ads)
// ============================================
function initAdMob() {
    // Load AdMob SDK
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    script.setAttribute('data-ad-client', 'ca-pub-YOUR_PUBLISHER_ID');
    document.head.appendChild(script);
}

function showAdMobRewardedAd() {
    // AdMob rewarded video ad
    if (window.adsbygoogle) {
        const ad = document.createElement('ins');
        ad.className = 'adsbygoogle';
        ad.style.display = 'block';
        ad.setAttribute('data-ad-client', 'ca-pub-YOUR_PUBLISHER_ID');
        ad.setAttribute('data-ad-slot', 'YOUR_AD_SLOT_ID');
        ad.setAttribute('data-ad-format', 'auto');
        
        document.body.appendChild(ad);
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        
        return true;
    }
    return false;
}

// ============================================
// OPTION 3: Unity Ads
// ============================================
function initUnityAds() {
    const script = document.createElement('script');
    script.src = 'https://cdn.unityads.unity3d.com/webview/2.0/unity-ads.js';
    script.onload = () => {
        if (window.unityads) {
            window.unityads.initialize({
                gameId: 'YOUR_GAME_ID',
                testMode: true // Set to false in production
            });
        }
    };
    document.head.appendChild(script);
}

function showUnityAd() {
    if (window.unityads) {
        window.unityads.show({
            placementId: 'rewardedVideo',
            onComplete: () => {
                console.log('Ad completed');
                return true;
            },
            onSkipped: () => {
                console.log('Ad skipped');
                return false;
            }
        });
    }
}

// ============================================
// OPTION 4: Custom Video Ads (Simple)
// ============================================
function showCustomVideoAd(videoUrl, duration = 30) {
    return new Promise((resolve, reject) => {
        // Create fullscreen video overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        `;
        
        const video = document.createElement('video');
        video.src = videoUrl;
        video.style.cssText = 'width: 100%; max-height: 80%;';
        video.autoplay = true;
        video.controls = false;
        
        const timer = document.createElement('div');
        timer.style.cssText = `
            color: white;
            font-size: 18px;
            margin-top: 20px;
            padding: 10px 20px;
            background: rgba(255,255,255,0.2);
            border-radius: 20px;
        `;
        
        let timeLeft = duration;
        timer.textContent = `Watch ad: ${timeLeft}s`;
        
        const countdown = setInterval(() => {
            timeLeft--;
            timer.textContent = `Watch ad: ${timeLeft}s`;
            
            if (timeLeft <= 0) {
                clearInterval(countdown);
                document.body.removeChild(overlay);
                resolve(true);
            }
        }, 1000);
        
        // Skip button (appears after 5 seconds)
        setTimeout(() => {
            const skipBtn = document.createElement('button');
            skipBtn.textContent = 'Skip Ad';
            skipBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                padding: 10px 20px;
                background: white;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                font-weight: 600;
            `;
            skipBtn.onclick = () => {
                clearInterval(countdown);
                document.body.removeChild(overlay);
                resolve(false); // Ad skipped, no reward
            };
            overlay.appendChild(skipBtn);
        }, 5000);
        
        overlay.appendChild(video);
        overlay.appendChild(timer);
        document.body.appendChild(overlay);
        
        video.play().catch(err => {
            clearInterval(countdown);
            document.body.removeChild(overlay);
            reject(err);
        });
    });
}

// ============================================
// OPTION 5: AdSense Display Ads
// ============================================
function showAdSenseAd() {
    const adContainer = document.createElement('div');
    adContainer.innerHTML = `
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
             data-ad-slot="YOUR_AD_SLOT_ID"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
    `;
    
    document.body.appendChild(adContainer);
    
    if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
}

// ============================================
// Main Ad Handler (Choose your preferred method)
// ============================================
async function showRewardedAd() {
    // Try Telegram Ads first (best for Telegram Mini Apps)
    const telegramAdShown = await showTelegramAd();
    if (telegramAdShown) return true;
    
    // Fallback to custom video ad
    try {
        const watched = await showCustomVideoAd('https://example.com/ad-video.mp4', 15);
        return watched;
    } catch (error) {
        console.error('Ad failed:', error);
        return false;
    }
}

// Export for use in app.js
window.showRewardedAd = showRewardedAd;
