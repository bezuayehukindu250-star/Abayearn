// API Configuration
const API_BASE_URL = 'https://your-backend-api.com/api'; // Replace with your backend URL

// API Helper Functions
async function apiRequest(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return { error: 'Network error' };
    }
}

// User API
async function getUserData(userId) {
    return await apiRequest(`/users/${userId}`);
}

async function createUser(userData) {
    return await apiRequest('/users', 'POST', userData);
}

// Earnings API
async function recordAdView(userId) {
    return await apiRequest('/earnings/ad', 'POST', { userId });
}

async function recordReferral(userId, referrerId) {
    return await apiRequest('/earnings/referral', 'POST', { userId, referrerId });
}

// Withdrawal API
async function requestWithdrawal(userId, amount) {
    return await apiRequest('/withdrawals', 'POST', { userId, amount });
}

// Activity API
async function getActivity(userId) {
    return await apiRequest(`/activity/${userId}`);
}
