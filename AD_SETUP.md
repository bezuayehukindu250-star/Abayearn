# 📺 Ad Integration Guide for Abay Earn

I've added **5 different ad network options** to your app. Choose the one that works best for you!

---

## 🎯 OPTION 1: Telegram Ads (Adsgram) - RECOMMENDED ⭐

**Best for Telegram Mini Apps** - Native integration, highest revenue

### Setup Steps:

1. **Register at Adsgram**
   - Visit: https://adsgram.ai
   - Sign up with your Telegram account
   - Create a new app

2. **Get Block ID**
   - Go to your dashboard
   - Create a new ad block
   - Copy your `Block ID`

3. **Update Code**
   ```javascript
   // In js/ads.js, line 8:
   const AdController = window.Adsgram.init({ blockId: "YOUR_BLOCK_ID" });
   ```

4. **Test**
   - Open your app in Telegram
   - Click "Watch Ad"
   - Ad should show immediately

**Pros:**
- ✅ Native Telegram integration
- ✅ High CPM rates
- ✅ No external dependencies
- ✅ Works perfectly in Mini Apps

---

## 🎯 OPTION 2: Google AdMob

**Best for mobile web apps** - Reliable, high fill rate

### Setup Steps:

1. **Create AdMob Account**
   - Visit: https://admob.google.com
   - Sign up and create an app

2. **Get Publisher ID**
   - Go to Apps → Your App
   - Copy your Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)

3. **Create Rewarded Ad Unit**
   - Click "Ad units" → "Add ad unit"
   - Select "Rewarded"
   - Copy the Ad Unit ID

4. **Update Code**
   ```javascript
   // In js/ads.js, line 35:
   script.setAttribute('data-ad-client', 'ca-pub-YOUR_PUBLISHER_ID');
   
   // Line 43:
   ad.setAttribute('data-ad-slot', 'YOUR_AD_SLOT_ID');
   ```

**Pros:**
- ✅ High revenue potential
- ✅ Reliable ad delivery
- ✅ Good analytics

**Cons:**
- ❌ Requires approval
- ❌ May not work well in Telegram WebView

---

## 🎯 OPTION 3: Unity Ads

**Best for gaming apps** - Good for video ads

### Setup Steps:

1. **Create Unity Account**
   - Visit: https://unity.com/products/unity-ads
   - Create a project

2. **Get Game ID**
   - Go to Monetization → Projects
   - Copy your Game ID

3. **Update Code**
   ```javascript
   // In js/ads.js, line 58:
   gameId: 'YOUR_GAME_ID',
   testMode: false // Set to false in production
   ```

**Pros:**
- ✅ Good for video ads
- ✅ High engagement

**Cons:**
- ❌ Requires game context
- ❌ May not work in all browsers

---

## 🎯 OPTION 4: Custom Video Ads - EASIEST 🚀

**Best for testing** - No registration needed!

### Setup Steps:

1. **Upload Your Ad Videos**
   - Upload video files to your server
   - Or use a CDN like Cloudinary

2. **Update Code**
   ```javascript
   // In js/ads.js, line 138:
   const watched = await showCustomVideoAd('https://your-cdn.com/ad.mp4', 15);
   ```

3. **That's it!** No API keys needed.

**Pros:**
- ✅ No registration required
- ✅ Full control over ads
- ✅ Works everywhere
- ✅ Perfect for testing

**Cons:**
- ❌ You need to find advertisers
- ❌ Manual ad management

---

## 🎯 OPTION 5: Google AdSense

**Best for display ads** - Banner and text ads

### Setup Steps:

1. **Create AdSense Account**
   - Visit: https://adsense.google.com
   - Apply and wait for approval

2. **Get Publisher ID**
   - Copy your Publisher ID

3. **Create Ad Unit**
   - Create a display ad unit
   - Copy the Ad Slot ID

4. **Update Code**
   ```javascript
   // In js/ads.js, line 95:
   data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
   data-ad-slot="YOUR_AD_SLOT_ID"
   ```

**Pros:**
- ✅ Easy to implement
- ✅ Good for display ads

**Cons:**
- ❌ Not ideal for rewarded ads
- ❌ Lower engagement

---

## 🚀 Quick Start (Testing)

Want to test immediately? Use **Option 4 (Custom Video Ads)**:

1. Find a sample video URL or use your own
2. Update line 138 in `js/ads.js`:
   ```javascript
   const watched = await showCustomVideoAd('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 15);
   ```
3. Click "Watch Ad" in your app
4. Video plays for 15 seconds
5. User earns $0.05 after watching

---

## 💡 Recommended Setup

**For Production:**
1. Use **Telegram Ads (Adsgram)** as primary
2. Use **Custom Video Ads** as fallback
3. This gives you maximum coverage

**Current Code Already Does This!**
```javascript
// In js/ads.js, line 127:
async function showRewardedAd() {
    // Try Telegram Ads first
    const telegramAdShown = await showTelegramAd();
    if (telegramAdShown) return true;
    
    // Fallback to custom video
    const watched = await showCustomVideoAd('...', 15);
    return watched;
}
```

---

## 🔧 Testing Your Ads

1. Open your app in Telegram
2. Click "Watch Ad" button
3. Check browser console for errors
4. Verify reward is credited after watching

---

## 📊 Revenue Estimates

- **Telegram Ads**: $2-5 CPM
- **AdMob**: $1-3 CPM
- **Unity Ads**: $3-7 CPM
- **Custom Ads**: Depends on your deals

---

## ❓ Which Should I Choose?

- **Just starting?** → Use Option 4 (Custom Video Ads)
- **Telegram Mini App?** → Use Option 1 (Telegram Ads)
- **Want maximum revenue?** → Use Option 1 + Option 4 fallback
- **Have existing AdMob?** → Use Option 2

---

Need help? Check the console logs when clicking "Watch Ad" to see what's happening!
