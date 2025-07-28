document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update user info in header
    document.querySelector('.user-name').textContent = user.username;
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // User form submission
    const userForm = document.getElementById('userForm');
    userForm.addEventListener('submit', handleNewUser);
    
    // Load saved settings
    loadSettings();
});

function showTab(tabName) {
    // Remove active class from all tabs and panels
    document.querySelectorAll('.settings-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.settings-panel').forEach(panel => panel.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding panel
    event.target.classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');
}

function openUserModal() {
    const modal = document.getElementById('userModal');
    modal.classList.add('active');
}

function closeUserModal() {
    const modal = document.getElementById('userModal');
    modal.classList.remove('active');
    document.getElementById('userForm').reset();
}

function handleNewUser(e) {
    e.preventDefault();
    
    const userData = {
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        role: document.getElementById('userRole').value,
        password: document.getElementById('userPassword').value
    };
    
    // In a real application, this would send data to the server
    console.log('New user data:', userData);
    
    // Show success message
    alert('User added successfully!');
    
    // Close modal
    closeUserModal();
    
    // In a real app, you would refresh the users table here
    addUserToTable(userData);
}

function addUserToTable(userData) {
    const tbody = document.querySelector('.users-table tbody');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>
            <div class="user-cell">
                <img src="images/user-placeholder.png" alt="${userData.name}" class="user-thumb">
                <span>${userData.name}</span>
            </div>
        </td>
        <td>
            <span class="role-badge ${userData.role}">${getRoleDisplayName(userData.role)}</span>
        </td>
        <td>${userData.email}</td>
        <td>Never</td>
        <td>
            <span class="status-badge active">Active</span>
        </td>
        <td>
            <div class="action-buttons">
                <button class="btn-icon" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" title="Permissions">
                    <i class="fas fa-key"></i>
                </button>
                <button class="btn-icon" title="Disable">
                    <i class="fas fa-ban"></i>
                </button>
            </div>
        </td>
    `;
    
    tbody.appendChild(row);
}

function getRoleDisplayName(role) {
    const roleMap = {
        'admin': 'Administrator',
        'manager': 'Project Manager',
        'officer': 'Field Officer',
        'viewer': 'Viewer'
    };
    return roleMap[role] || role;
}

function loadSettings() {
    // Load settings from localStorage or server
    const settings = JSON.parse(localStorage.getItem('rkfinfa_settings')) || {};
    
    // Apply saved settings to form elements
    if (settings.currency) {
        const currencySelect = document.querySelector('select[value="KES"]').parentElement.querySelector('select');
        if (currencySelect) currencySelect.value = settings.currency;
    }
    
    if (settings.dateFormat) {
        const dateFormatSelect = document.querySelector('select[value="DD/MM/YYYY"]').parentElement.querySelector('select');
        if (dateFormatSelect) dateFormatSelect.value = settings.dateFormat;
    }
    
    // Load other settings...
}

function saveSettings() {
    // Collect all settings from the form
    const settings = {
        // General settings
        currency: document.querySelector('#generalTab select').value,
        dateFormat: document.querySelectorAll('#generalTab select')[1].value,
        timezone: document.querySelectorAll('#generalTab select')[2].value,
        
        // Security settings
        minPasswordLength: document.querySelector('#securityTab input[type="number"]').value,
        requireUppercase: document.querySelector('#securityTab input[type="checkbox"]').checked,
        requireNumbers: document.querySelectorAll('#securityTab input[type="checkbox"]')[1].checked,
        requireSpecialChars: document.querySelectorAll('#securityTab input[type="checkbox"]')[2].checked,
        passwordExpiry: document.querySelectorAll('#securityTab input[type="number"]')[1].value,
        sessionTimeout: document.querySelectorAll('#securityTab input[type="number"]')[2].value,
        enableTwoFactor: document.querySelectorAll('#securityTab input[type="checkbox"]')[3].checked,
        logFailedAttempts: document.querySelectorAll('#securityTab input[type="checkbox"]')[4].checked,
        maxFailedAttempts: document.querySelectorAll('#securityTab input[type="number"]')[3].value,
        
        // Notification settings
        emailProjectAlerts: document.querySelector('#notificationsTab input[type="checkbox"]').checked,
        emailFinancialAlerts: document.querySelectorAll('#notificationsTab input[type="checkbox"]')[1].checked,
        emailDailySummary: document.querySelectorAll('#notificationsTab input[type="checkbox"]')[2].checked,
        emailMaintenanceAlerts: document.querySelectorAll('#notificationsTab input[type="checkbox"]')[3].checked,
        smsCriticalAlerts: document.querySelectorAll('#notificationsTab input[type="checkbox"]')[4].checked,
        smsBeneficiaryUpdates: document.querySelectorAll('#notificationsTab input[type="checkbox"]')[5].checked,
        smsGateway: document.querySelector('#notificationsTab select').value,
        
        // System settings
        backupFrequency: document.querySelector('#systemTab select').value,
        backupRetention: document.querySelector('#systemTab input[type="number"]').value
    };
    
    // Save to localStorage (in a real app, this would be sent to the server)
    localStorage.setItem('rkfinfa_settings', JSON.stringify(settings));
    
    // Show success message
    showSettingsSaveSuccess();
    
    console.log('Settings saved:', settings);
}

function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to defaults? This action cannot be undone.')) {
        // Clear saved settings
        localStorage.removeItem('rkfinfa_settings');
        
        // Reset form to defaults
        location.reload();
        
        alert('Settings have been reset to defaults.');
    }
}

function showSettingsSaveSuccess() {
    // Create and show a success message
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #4CAF50;
            color: white;
            padding: 1rem 2rem;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            z-index: 10000;
        ">
            <i class="fas fa-check"></i> Settings saved successfully!
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Remove the message after 3 seconds
    setTimeout(() => {
        document.body.removeChild(successMessage);
    }, 3000);
}

// System maintenance functions
function backupNow() {
    alert('Starting database backup...');
    
    // Simulate backup progress
    setTimeout(() => {
        alert('Database backup completed successfully!');
        // Update last backup time
        document.querySelector('#systemTab .value').textContent = 'Just now';
    }, 2000);
}

function checkForUpdates() {
    alert('Checking for system updates...');
    
    setTimeout(() => {
        alert('System is up to date. No updates available.');
    }, 1500);
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('userModal');
    if (e.target === modal) {
        closeUserModal();
    }
});