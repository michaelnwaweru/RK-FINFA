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
    
    // Search and filter functionality
    setupSearchAndFilters();
    
    // Select all checkbox functionality
    setupSelectAllCheckbox();
    
    // New beneficiary form submission
    const newBeneficiaryForm = document.getElementById('newBeneficiaryForm');
    newBeneficiaryForm.addEventListener('submit', handleNewBeneficiary);
});

function setupSearchAndFilters() {
    const searchInput = document.getElementById('searchBeneficiary');
    const projectFilter = document.getElementById('projectFilter');
    const statusFilter = document.getElementById('statusFilter');
    const genderFilter = document.getElementById('genderFilter');
    
    searchInput.addEventListener('input', filterBeneficiaries);
    projectFilter.addEventListener('change', filterBeneficiaries);
    statusFilter.addEventListener('change', filterBeneficiaries);
    genderFilter.addEventListener('change', filterBeneficiaries);
}

function filterBeneficiaries() {
    const searchTerm = document.getElementById('searchBeneficiary').value.toLowerCase();
    const projectFilter = document.getElementById('projectFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const genderFilter = document.getElementById('genderFilter').value;
    
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    
    tableRows.forEach(row => {
        const beneficiaryName = row.cells[2].textContent.toLowerCase();
        const beneficiaryId = row.cells[1].textContent.toLowerCase();
        const gender = row.cells[3].textContent.toLowerCase();
        const project = row.cells[6].textContent.toLowerCase();
        const status = row.querySelector('.status-badge').textContent.toLowerCase();
        
        const matchesSearch = beneficiaryName.includes(searchTerm) || beneficiaryId.includes(searchTerm);
        const matchesProject = !projectFilter || project.includes(projectFilter.replace('-', ' '));
        const matchesStatus = !statusFilter || status === statusFilter;
        const matchesGender = !genderFilter || gender === genderFilter;
        
        if (matchesSearch && matchesProject && matchesStatus && matchesGender) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function setupSelectAllCheckbox() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const rowCheckboxes = document.querySelectorAll('.select-row');
    
    selectAllCheckbox.addEventListener('change', function() {
        rowCheckboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
    
    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedBoxes = document.querySelectorAll('.select-row:checked').length;
            const totalBoxes = rowCheckboxes.length;
            
            selectAllCheckbox.checked = checkedBoxes === totalBoxes;
            selectAllCheckbox.indeterminate = checkedBoxes > 0 && checkedBoxes < totalBoxes;
        });
    });
}

function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    event.target.classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');
}

function openNewBeneficiaryModal() {
    const modal = document.getElementById('newBeneficiaryModal');
    modal.classList.add('active');
}

function closeNewBeneficiaryModal() {
    const modal = document.getElementById('newBeneficiaryModal');
    modal.classList.remove('active');
    document.getElementById('newBeneficiaryForm').reset();
    
    // Reset to first tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.querySelector('.tab-btn').classList.add('active');
    document.querySelector('.tab-content').classList.add('active');
}

function handleNewBeneficiary(e) {
    e.preventDefault();
    
    const beneficiaryData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        gender: document.getElementById('gender').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        nationalId: document.getElementById('nationalId').value,
        maritalStatus: document.getElementById('maritalStatus').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        email: document.getElementById('email').value,
        county: document.getElementById('county').value,
        subCounty: document.getElementById('subCounty').value,
        ward: document.getElementById('ward').value,
        village: document.getElementById('village').value,
        projectAssignment: document.getElementById('projectAssignment').value,
        enrollmentDate: document.getElementById('enrollmentDate').value,
        householdSize: document.getElementById('householdSize').value,
        occupation: document.getElementById('occupation').value,
        educationLevel: document.getElementById('educationLevel').value
    };
    
    // In a real application, this would send data to the server
    console.log('New beneficiary data:', beneficiaryData);
    
    // Show success message
    alert('Beneficiary added successfully!');
    
    // Close modal
    closeNewBeneficiaryModal();
    
    // In a real app, you would refresh the beneficiaries list here
}

function exportBeneficiaries() {
    // Get selected beneficiaries or all if none selected
    const selectedRows = document.querySelectorAll('.select-row:checked');
    
    if (selectedRows.length === 0) {
        alert('Exporting all beneficiaries...');
    } else {
        alert(`Exporting ${selectedRows.length} selected beneficiaries...`);
    }
    
    // In a real application, this would generate and download a CSV/Excel file
    console.log('Exporting beneficiaries...');
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('newBeneficiaryModal');
    if (e.target === modal) {
        closeNewBeneficiaryModal();
    }
});