-- RK-FINFA Project Management Information System Database Schema

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'project_manager', 'field_officer', 'viewer') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Regions table
CREATE TABLE regions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    description TEXT
);

-- Projects table
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    region_id INT,
    status ENUM('planning', 'active', 'on_hold', 'completed', 'cancelled') NOT NULL DEFAULT 'planning',
    budget_amount DECIMAL(15, 2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (region_id) REFERENCES regions(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Project objectives
CREATE TABLE project_objectives (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    objective TEXT NOT NULL,
    target_value VARCHAR(100),
    achieved_value VARCHAR(100),
    status ENUM('pending', 'in_progress', 'achieved', 'not_achieved') DEFAULT 'pending',
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Beneficiaries table
CREATE TABLE beneficiaries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    beneficiary_code VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    date_of_birth DATE,
    national_id VARCHAR(20) UNIQUE,
    phone_number VARCHAR(20),
    email VARCHAR(100),
    county VARCHAR(50),
    sub_county VARCHAR(50),
    ward VARCHAR(50),
    village VARCHAR(50),
    occupation VARCHAR(100),
    education_level VARCHAR(50),
    marital_status ENUM('single', 'married', 'divorced', 'widowed', 'other'),
    household_size INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Link beneficiaries to projects
CREATE TABLE project_beneficiaries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    beneficiary_id INT NOT NULL,
    enrollment_date DATE NOT NULL,
    exit_date DATE,
    status ENUM('active', 'graduated', 'dropped_out', 'suspended') DEFAULT 'active',
    exit_reason TEXT,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id),
    UNIQUE KEY unique_project_beneficiary (project_id, beneficiary_id)
);

-- Financial disbursements
CREATE TABLE disbursements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    disbursement_code VARCHAR(20) UNIQUE NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    disbursement_date DATE NOT NULL,
    disbursement_type ENUM('grant', 'loan', 'equipment', 'training', 'other') NOT NULL,
    description TEXT,
    approved_by INT,
    status ENUM('pending', 'approved', 'disbursed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (approved_by) REFERENCES users(id)
);

-- Beneficiary disbursements
CREATE TABLE beneficiary_disbursements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    disbursement_id INT NOT NULL,
    beneficiary_id INT NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    purpose TEXT,
    repayment_status ENUM('not_applicable', 'pending', 'ongoing', 'completed', 'defaulted') DEFAULT 'not_applicable',
    FOREIGN KEY (disbursement_id) REFERENCES disbursements(id) ON DELETE CASCADE,
    FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id)
);

-- Project milestones
CREATE TABLE milestones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    milestone_name VARCHAR(200) NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    completed_date DATE,
    status ENUM('pending', 'in_progress', 'completed', 'overdue') DEFAULT 'pending',
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Activity logs
CREATE TABLE activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id INT,
    description TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Reports
CREATE TABLE reports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    report_type ENUM('monthly', 'quarterly', 'annual', 'completion', 'special') NOT NULL,
    report_period_start DATE NOT NULL,
    report_period_end DATE NOT NULL,
    submitted_by INT,
    submission_date DATE,
    status ENUM('draft', 'submitted', 'approved', 'rejected') DEFAULT 'draft',
    file_path VARCHAR(500),
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (submitted_by) REFERENCES users(id)
);

-- Key performance indicators
CREATE TABLE kpis (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    unit_of_measure VARCHAR(50),
    target_value DECIMAL(15, 2),
    frequency ENUM('daily', 'weekly', 'monthly', 'quarterly', 'annual') NOT NULL
);

-- Project KPI tracking
CREATE TABLE project_kpi_tracking (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    kpi_id INT NOT NULL,
    period_date DATE NOT NULL,
    actual_value DECIMAL(15, 2),
    target_value DECIMAL(15, 2),
    recorded_by INT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (kpi_id) REFERENCES kpis(id),
    FOREIGN KEY (recorded_by) REFERENCES users(id)
);

-- Insert default regions
INSERT INTO regions (name, code) VALUES
('Central', 'CTR'),
('Coast', 'CST'),
('Eastern', 'EST'),
('Nairobi', 'NBO'),
('North Eastern', 'NET'),
('Nyanza', 'NYZ'),
('Rift Valley', 'RFT'),
('Western', 'WST');

-- Insert default admin user (password: admin123)
INSERT INTO users (username, password_hash, email, full_name, role) VALUES
('admin', '$2y$10$YourHashedPasswordHere', 'admin@rkfinfa.org', 'System Administrator', 'admin');

-- Create indexes for better performance
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_region ON projects(region_id);
CREATE INDEX idx_beneficiaries_county ON beneficiaries(county);
CREATE INDEX idx_disbursements_date ON disbursements(disbursement_date);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);