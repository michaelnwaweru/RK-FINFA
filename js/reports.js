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
    
    // Initialize analytics charts
    initializeAnalyticsCharts();
    
    // Setup timeframe selector
    const timeframeSelector = document.getElementById('analyticsTimeframe');
    timeframeSelector.addEventListener('change', updateAnalyticsData);
    
    // Report builder form submission
    const reportBuilderForm = document.getElementById('reportBuilderForm');
    reportBuilderForm.addEventListener('submit', handleReportBuilder);
});

function initializeAnalyticsCharts() {
    // Project Performance Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'radar',
        data: {
            labels: ['Budget Utilization', 'Timeline Adherence', 'Beneficiary Satisfaction', 'Impact Score', 'Efficiency'],
            datasets: [{
                label: 'Current Period',
                data: [85, 78, 92, 88, 76],
                borderColor: '#2E7D32',
                backgroundColor: 'rgba(46, 125, 50, 0.2)',
                pointBackgroundColor: '#2E7D32'
            }, {
                label: 'Previous Period',
                data: [78, 82, 87, 85, 72],
                borderColor: '#81C784',
                backgroundColor: 'rgba(129, 199, 132, 0.1)',
                pointBackgroundColor: '#81C784'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
    
    // Regional Chart
    const regionalCtx = document.getElementById('regionalChart').getContext('2d');
    new Chart(regionalCtx, {
        type: 'polarArea',
        data: {
            labels: ['Central', 'Eastern', 'Coast', 'Rift Valley', 'Western'],
            datasets: [{
                data: [4500000, 3200000, 2800000, 5100000, 2900000],
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
                    position: 'bottom'
                }
            }
        }
    });
    
    // Financial Flow Chart
    const financialCtx = document.getElementById('financialChart').getContext('2d');
    new Chart(financialCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Inflow',
                data: [8500000, 7200000, 9100000, 8800000, 9500000, 8700000],
                backgroundColor: '#4CAF50'
            }, {
                label: 'Outflow',
                data: [6200000, 5800000, 7500000, 6900000, 7800000, 7200000],
                backgroundColor: '#f44336'
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
            }
        }
    });
    
    // Beneficiary Growth Chart
    const growthCtx = document.getElementById('growthChart').getContext('2d');
    new Chart(growthCtx, {
        type: 'line',
        data: {
            labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024'],
            datasets: [{
                label: 'Active Beneficiaries',
                data: [8500, 10200, 12800, 14200, 15847],
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

function updateAnalyticsData() {
    const timeframe = document.getElementById('analyticsTimeframe').value;
    console.log('Updating analytics for timeframe:', timeframe);
    
    // In a real application, this would fetch new data from the server
    // and update all charts accordingly
    alert(`Analytics updated for: ${timeframe}`);
}

// Report Template Functions
function generateProjectSummary() {
    showReportProgress('Generating Project Summary Report...');
    setTimeout(() => {
        alert('Project Summary Report generated successfully!');
    }, 2000);
}

function generateFinancialReport() {
    showReportProgress('Generating Financial Report...');
    setTimeout(() => {
        alert('Financial Report generated successfully!');
    }, 2000);
}

function generateBeneficiaryReport() {
    showReportProgress('Generating Beneficiary Report...');
    setTimeout(() => {
        alert('Beneficiary Report generated successfully!');
    }, 2000);
}

function generateImpactReport() {
    showReportProgress('Generating Impact Assessment Report...');
    setTimeout(() => {
        alert('Impact Assessment Report generated successfully!');
    }, 2000);
}

function showReportProgress(message) {
    // In a real application, this would show a proper progress indicator
    console.log(message);
}

// Report Builder Modal Functions
function openReportBuilderModal() {
    const modal = document.getElementById('reportBuilderModal');
    modal.classList.add('active');
}

function closeReportBuilderModal() {
    const modal = document.getElementById('reportBuilderModal');
    modal.classList.remove('active');
    document.getElementById('reportBuilderForm').reset();
}

function handleReportBuilder(e) {
    e.preventDefault();
    
    const reportData = {
        name: document.getElementById('reportName').value,
        type: document.getElementById('reportType').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        projects: Array.from(document.querySelectorAll('input[name="projects"]:checked')).map(cb => cb.value),
        sections: Array.from(document.querySelectorAll('input[name="sections"]:checked')).map(cb => cb.value)
    };
    
    console.log('Custom report data:', reportData);
    
    // Show progress
    showReportProgress(`Generating custom report: ${reportData.name}...`);
    
    setTimeout(() => {
        alert('Custom report generated successfully!');
        closeReportBuilderModal();
    }, 2000);
}

// Other Report Functions
function scheduleReport() {
    alert('Opening report scheduling interface...');
}

function exportReports() {
    alert('Exporting all reports...');
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('reportBuilderModal');
    if (e.target === modal) {
        closeReportBuilderModal();
    }
});