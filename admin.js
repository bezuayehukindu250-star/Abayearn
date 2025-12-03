// Admin Configuration
const ADMIN_IDS = [5141496483]; // Your Telegram ID

// Check if user is admin
function checkAdminAccess() {
    const user = initTelegram();
    
    if (!user || !ADMIN_IDS.includes(user.id)) {
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; text-align: center; color: white;">
                <div>
                    <h1 style="font-size: 64px; margin-bottom: 20px;">🔒</h1>
                    <h2>Access Denied</h2>
                    <p>You don't have permission to access this page.</p>
                </div>
            </div>
        `;
        return false;
    }
    
    return true;
}

// Initialize Admin Panel
async function initAdmin() {
    if (!checkAdminAccess()) return;
    
    await loadDashboardStats();
    await loadRecentUsers();
    await loadPendingWithdrawals();
}

// Load Dashboard Statistics
async function loadDashboardStats() {
    try {
        const stats = await fetch(`${API_BASE_URL}/admin/stats`).then(r => r.json());
        
        document.getElementById('totalUsers').textContent = stats.totalUsers || 0;
        document.getElementById('totalEarnings').textContent = `${(stats.totalEarnings || 0).toFixed(2)} ETB`;
        document.getElementById('totalAds').textContent = stats.totalAds || 0;
        document.getElementById('totalReferrals').textContent = stats.totalReferrals || 0;
    } catch (error) {
        console.error('Failed to load stats:', error);
    }
}

// Load Recent Users
async function loadRecentUsers() {
    try {
        const users = await fetch(`${API_BASE_URL}/admin/users`).then(r => r.json());
        
        const userList = document.getElementById('userList');
        
        if (!users || users.length === 0) {
            userList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">👥</div>
                    <p>No users yet</p>
                </div>
            `;
            return;
        }
        
        userList.innerHTML = users.map(user => `
            <div class="user-card">
                <div class="user-info">
                    <div class="user-name">${user.firstName || 'User'} ${user.lastName || ''}</div>
                    <div class="user-details">
                        ID: ${user.id} | Balance: ${user.balance.toFixed(2)} ETB | 
                        Referrals: ${user.referralCount} | Ads: ${user.adsWatched}
                    </div>
                </div>
                <div class="user-actions">
                    <button class="btn-small btn-view" onclick="viewUser('${user.id}')">View</button>
                    <button class="btn-small btn-ban" onclick="banUser('${user.id}')">Ban</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Failed to load users:', error);
    }
}

// Load Pending Withdrawals
async function loadPendingWithdrawals() {
    try {
        const withdrawals = await fetch(`${API_BASE_URL}/admin/withdrawals`).then(r => r.json());
        
        const withdrawalList = document.getElementById('withdrawalList');
        
        if (!withdrawals || withdrawals.length === 0) {
            withdrawalList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">💸</div>
                    <p>No pending withdrawals</p>
                </div>
            `;
            return;
        }
        
        withdrawalList.innerHTML = withdrawals.map(w => `
            <div class="withdrawal-card">
                <div class="withdrawal-info">
                    <div class="withdrawal-amount">${w.amount.toFixed(2)} ETB</div>
                    <div class="withdrawal-user">
                        User: ${w.userName} (${w.userId})<br>
                        Requested: ${new Date(w.timestamp).toLocaleString()}
                    </div>
                </div>
                <div class="withdrawal-actions">
                    <button class="btn-small btn-approve" onclick="approveWithdrawal('${w.id}')">Approve</button>
                    <button class="btn-small btn-reject" onclick="rejectWithdrawal('${w.id}')">Reject</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Failed to load withdrawals:', error);
    }
}

// View User Details
function viewUser(userId) {
    alert(`Viewing user: ${userId}\n\nFull user management coming soon!`);
}

// Ban User
async function banUser(userId) {
    if (!confirm(`Are you sure you want to ban user ${userId}?`)) return;
    
    try {
        await fetch(`${API_BASE_URL}/admin/users/${userId}/ban`, { method: 'POST' });
        alert('User banned successfully');
        loadRecentUsers();
    } catch (error) {
        alert('Failed to ban user');
    }
}

// Approve Withdrawal
async function approveWithdrawal(withdrawalId) {
    try {
        await fetch(`${API_BASE_URL}/admin/withdrawals/${withdrawalId}/approve`, { method: 'POST' });
        alert('Withdrawal approved!');
        loadPendingWithdrawals();
        loadDashboardStats();
    } catch (error) {
        alert('Failed to approve withdrawal');
    }
}

// Reject Withdrawal
async function rejectWithdrawal(withdrawalId) {
    try {
        await fetch(`${API_BASE_URL}/admin/withdrawals/${withdrawalId}/reject`, { method: 'POST' });
        alert('Withdrawal rejected');
        loadPendingWithdrawals();
    } catch (error) {
        alert('Failed to reject withdrawal');
    }
}

// Search Users
async function searchUsers() {
    const query = document.getElementById('userSearch').value;
    if (!query) {
        loadRecentUsers();
        return;
    }
    
    try {
        const users = await fetch(`${API_BASE_URL}/admin/users/search?q=${query}`).then(r => r.json());
        // Display filtered users (similar to loadRecentUsers)
        console.log('Search results:', users);
    } catch (error) {
        console.error('Search failed:', error);
    }
}

// Show User Management
function showUserManagement() {
    document.getElementById('userSection').style.display = 'block';
    document.getElementById('withdrawalSection').style.display = 'none';
    document.getElementById('settingsSection').style.display = 'none';
    document.getElementById('broadcastSection').style.display = 'none';
}

// Show Withdrawals
function showWithdrawals() {
    document.getElementById('userSection').style.display = 'none';
    document.getElementById('withdrawalSection').style.display = 'block';
    document.getElementById('settingsSection').style.display = 'none';
    document.getElementById('broadcastSection').style.display = 'none';
}

// Show Settings
function showSettings() {
    document.getElementById('userSection').style.display = 'none';
    document.getElementById('withdrawalSection').style.display = 'none';
    document.getElementById('settingsSection').style.display = 'block';
    document.getElementById('broadcastSection').style.display = 'none';
}

// Show Broadcast
function showBroadcast() {
    document.getElementById('userSection').style.display = 'none';
    document.getElementById('withdrawalSection').style.display = 'none';
    document.getElementById('settingsSection').style.display = 'none';
    document.getElementById('broadcastSection').style.display = 'block';
}

// Save Settings
async function saveSettings() {
    const settings = {
        adReward: parseFloat(document.getElementById('adReward').value),
        referralReward: parseFloat(document.getElementById('referralReward').value),
        minWithdrawal: parseFloat(document.getElementById('minWithdrawal').value)
    };
    
    try {
        await fetch(`${API_BASE_URL}/admin/settings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
        });
        alert('Settings saved successfully!');
    } catch (error) {
        alert('Failed to save settings');
    }
}

// Send Broadcast
async function sendBroadcast() {
    const message = document.getElementById('broadcastMessage').value;
    
    if (!message) {
        alert('Please enter a message');
        return;
    }
    
    if (!confirm(`Send this message to all users?\n\n"${message}"`)) return;
    
    try {
        await fetch(`${API_BASE_URL}/admin/broadcast`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        alert('Broadcast sent successfully!');
        document.getElementById('broadcastMessage').value = '';
    } catch (error) {
        alert('Failed to send broadcast');
    }
}

// Admin Navigation Handler
function adminNavigateTo(page) {
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-page="${page}"]`).classList.add('active');
    
    // Handle page navigation
    switch(page) {
        case 'dashboard':
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
            
        case 'users':
            showUserManagement();
            document.getElementById('userSection').scrollIntoView({ behavior: 'smooth' });
            break;
            
        case 'withdrawals':
            showWithdrawals();
            document.getElementById('withdrawalSection').scrollIntoView({ behavior: 'smooth' });
            break;
            
        case 'settings':
            showSettings();
            document.getElementById('settingsSection').scrollIntoView({ behavior: 'smooth' });
            break;
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initAdmin);
