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
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', filterProjects);
    
    // Filter functionality
    const statusFilter = document.getElementById('statusFilter');
    const regionFilter = document.getElementById('regionFilter');
    
    statusFilter.addEventListener('change', filterProjects);
    regionFilter.addEventListener('change', filterProjects);
    
    // New project form submission
    const newProjectForm = document.getElementById('newProjectForm');
    newProjectForm.addEventListener('submit', handleNewProject);
});

function filterProjects() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const regionFilter = document.getElementById('regionFilter').value;
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const projectName = card.querySelector('h3').textContent.toLowerCase();
        const projectDescription = card.querySelector('.project-description').textContent.toLowerCase();
        const projectStatus = card.querySelector('.project-status').textContent.toLowerCase();
        const projectRegion = card.querySelector('.info-item span').textContent.toLowerCase();
        
        const matchesSearch = projectName.includes(searchTerm) || projectDescription.includes(searchTerm);
        const matchesStatus = !statusFilter || projectStatus === statusFilter;
        const matchesRegion = !regionFilter || projectRegion.includes(regionFilter.replace('-', ' '));
        
        if (matchesSearch && matchesStatus && matchesRegion) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function openNewProjectModal() {
    const modal = document.getElementById('newProjectModal');
    modal.classList.add('active');
}

function closeNewProjectModal() {
    const modal = document.getElementById('newProjectModal');
    modal.classList.remove('active');
    document.getElementById('newProjectForm').reset();
}

function handleNewProject(e) {
    e.preventDefault();
    
    const projectData = {
        name: document.getElementById('projectName').value,
        region: document.getElementById('projectRegion').value,
        description: document.getElementById('projectDescription').value,
        budget: document.getElementById('projectBudget').value,
        beneficiaries: document.getElementById('targetBeneficiaries').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        status: 'planning'
    };
    
    // In a real application, this would send data to the server
    console.log('New project data:', projectData);
    
    // Show success message
    alert('Project created successfully!');
    
    // Close modal
    closeNewProjectModal();
    
    // In a real app, you would refresh the projects list here
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('newProjectModal');
    if (e.target === modal) {
        closeNewProjectModal();
    }
});