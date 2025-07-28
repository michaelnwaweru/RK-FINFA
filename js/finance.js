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
    initializeFinanceCharts();
    
    // Setup filters
    setupFilters();
    
    // New disbursement form submission
    const newDisbursementForm = document.getElementById('newDisbursementForm');
    newDisbursementForm.addEventListener('submit', handleNewDisbursement);
});

function initializeFinanceCharts() {
    // Disbursement Trends Chart
    const disbursementCtx = document.getElementById('disbursementChart').getContext('2d');
    new Chart(disbursementCtx, {
        type: 'line',
        data: {
            labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            datasets: [{
                label: 'Disbursements (KES)',
                data: [2500000, 3200000, 2800000, 4100000, 3600000, 4500000],
                borderColor: '#2E7D32',
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'KES ' + (value / 1000000).toFixed(1) + 'M';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Budget Allocation Chart
    const allocationCtx = document.getElementById('allocationChart').getContext('2d');
    new Chart(allocationCtx, {
        type: 'doughnut',
        data: {
            labels: ['Kiambu Youth', 'Meru Women', 'Turkana Agri', 'Coastal Fishing', 'Others'],
            datasets: [{
                data: [25, 22, 30, 15, 8],
                backgroundColor: [
                    '#2196F3',
                    '#4CAF50',
                    '#ff9800',
                    '#9C27B0',
                    '#607D8B'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

function setupFilters() {
    const statusFilter = document.getElementById('statusFilter');
    const typeFilter = document.getElementById('typeFilter');
    
    statusFilter.addEventListener('change', filterDisbursements);
    typeFilter.addEventListener('change', filterDisbursements);
}

function filterDisbursements() {
    const statusFilter = document.getElementById('statusFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    
    tableRows.forEach(row => {
        const status = row.querySelector('.status-badge').textContent.toLowerCase();
        const type = row.querySelector('.type-badge').textContent.toLowerCase();
        
        const matchesStatus = !statusFilter || status === statusFilter;
        const matchesType = !typeFilter || type === typeFilter;
        
        if (matchesStatus && matchesType) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function openNewDisbursementModal() {
    const modal = document.getElementById('newDisbursementModal');
    modal.classList.add('active');
}

function closeNewDisbursementModal() {
    const modal = document.getElementById('newDisbursementModal');
    modal.classList.remove('active');
    document.getElementById('newDisbursementForm').reset();
}

function handleNewDisbursement(e) {
    e.preventDefault();
    
    const disbursementData = {
        project: document.getElementById('disbursementProject').value,
        type: document.getElementById('disbursementType').value,
        amount: document.getElementById('disbursementAmount').value,
        date: document.getElementById('disbursementDate').value,
        description: document.getElementById('disbursementDescription').value,
        beneficiaries: Array.from(document.querySelectorAll('input[name="beneficiarySelection"]:checked')).map(cb => cb.value)
    };
    
    // In a real application, this would send data to the server
    console.log('New disbursement data:', disbursementData);
    
    // Show success message
    alert('Disbursement created successfully!');
    
    // Close modal
    closeNewDisbursementModal();
    
    // In a real app, you would refresh the disbursements list here
}

// Quick Actions
function generateFinancialReport() {
    alert('Generating financial report...');
    // In a real app, this would generate and download a report
}

function generateBudgetReport() {
    alert('Generating budget report...');
}

function reconcileAccounts() {
    alert('Starting account reconciliation process...');
}

function exportFinancialData() {
    alert('Exporting financial data...');
}

function setReminders() {
    alert('Opening reminder settings...');
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('newDisbursementModal');
    if (e.target === modal) {
        closeNewDisbursementModal();
    }
});