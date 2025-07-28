document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Simple validation (in a real app, this would be server-side)
        if (username && password) {
            // Simulate login process
            showLoadingState();
            
            setTimeout(() => {
                // Store user session (in a real app, use proper authentication)
                sessionStorage.setItem('user', JSON.stringify({
                    username: username,
                    role: 'Administrator',
                    loginTime: new Date().toISOString()
                }));
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            }, 1000);
        }
    });
    
    function showLoadingState() {
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        submitBtn.disabled = true;
    }
});