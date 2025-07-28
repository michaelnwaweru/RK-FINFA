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
    
    // Initialize charts
    initializeCharts();
    
    // Notification dropdown (placeholder)
    const notificationBtn = document.querySelector('.notification-btn');
    notificationBtn.addEventListener('click', function() {
        alert('Notifications feature coming soon!');
    });
});

function initializeCharts() {
    // Project Progress Chart
    const projectCtx = document.getElementById('projectChart').getContext('2d');
    new Chart(projectCtx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'In Progress', 'Planning', 'On Hold'],
            datasets: [{
                data: [12, 8, 3, 1],
                backgroundColor: [
                    '#4CAF50',
                    '#2196F3',
                    '#ff9800',
                    '#f44336'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Regional Distribution Chart
    const regionalCtx = document.getElementById('regionalChart').getContext('2d');
    new Chart(regionalCtx, {
        type: 'bar',
        data: {
            labels: ['Central', 'Coast', 'Eastern', 'Nairobi', 'North Eastern', 'Nyanza', 'Rift Valley', 'Western'],
            datasets: [{
                label: 'Active Projects',
                data: [4, 3, 2, 5, 1, 3, 4, 2],
                backgroundColor: '#2E7D32'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}