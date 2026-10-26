export interface JavaCodeFile {
  name: string;
  path: string;
  category: 'config' | 'model' | 'repository' | 'service' | 'controller' | 'exception' | 'scheduler' | 'main';
  conceptHighlights: string[];
  description: string;
  code: string;
}

export const ARCHITECTURE_DIAGRAM = `
========================================================================================
           TEAM TASK MANAGEMENT - FULL STACK ARCHITECTURE & DATA FLOW
========================================================================================

 [ CLIENT TIER - BROWSER ]
       |
       +---> React.js Single Page App (Vite + Tailwind CSS + Lucide Icons)
             |-- Dashboard View (Metrics, Overdue Alerts, Workload Stats)
             |-- Kanban Board (Drag-and-Drop / Quick Status TODO -> IN_PROGRESS -> DONE)
             |-- Team Members Management (Add, Edit, Roles: Lead vs Member)
             |-- File Export Hub (CSV file generator, Text Log Viewer)
             |-- REST Client (Axios / Fetch with CORS headers & JSON payloads)
       |
  (HTTP / JSON REST APIs - Port 8080)
       |
 [ APPLICATION TIER - JAVA + SPRING BOOT 3 ]
       |
       +---> CORS Filter & DispatcherServlet
       |
       +---> Controllers (REST Endpoints)
       |     |-- TaskController (@GetMapping, @PostMapping, @PutMapping, @DeleteMapping)
       |     |-- MemberController (Member CRUD & Project assignment)
       |     |-- FileController (/api/tasks/export/csv, /api/logs/export/txt)
       |
       +---> Global Exception Handler (@ControllerAdvice)
       |     |-- Catches TaskNotFoundException, MemberNotFoundException, ValidationException
       |     |-- Returns standardized JSON: { timestamp, status, error, message, path }
       |
       +---> Service Layer (Core Business Logic + 11 Java Core Concepts)
       |     |-- TaskService (Array of Priorities, ArrayList of Tasks, Vector for ActivityLog)
       |     |-- MemberService (Inheritance: Person -> TeamMember & TeamLead)
       |     |-- FileExportService (FileWriter, BufferedWriter, CSV Parsing)
       |     |-- RawJdbcService (Plain JDBC: DriverManager, PreparedStatement)
       |
       +---> Background Thread / Scheduler (@EnableScheduling, @Scheduled)
       |     |-- OverdueTaskScheduler (Worker thread scans pending tasks every 60s)
       |
       +---> Data Access Layer (Spring Data JPA / Hibernate)
             |-- TaskRepository (Derived query methods: findByStatus, findByPriority)
             |-- MemberRepository (findByEmail, findByRole)
       |
  (PostgreSQL Driver - Port 5432)
       |
 [ PERSISTENCE TIER - DATABASE & FILESYSTEM ]
       |
       +---> PostgreSQL Relational Database (team_task_db)
       |     |-- Tables: members, tasks, activity_logs
       |     |-- Constraints, Foreign Keys (ON DELETE SET NULL), Indexes
       |
       +---> Local Filesystem Storage (File Handling)
             |-- /exports/tasks_export_*.csv
             |-- /logs/activity_audit_log.txt
========================================================================================
`;

export const FOLDER_STRUCTURE = `
team-task-management/
|-- backend/                                # Java Spring Boot Backend
|   |-- pom.xml                             # Maven dependencies & build config
|   |-- src/
|   |   |-- main/
|   |   |   |-- java/com/college/taskmgmt/
|   |   |   |   |-- TeamTaskManagementApplication.java # Spring Boot Main class
|   |   |   |   |-- model/                  # Domain Entities & OOP Hierarchy
|   |   |   |   |   |-- Person.java         # Base abstract class (OOP: Abstraction & Encapsulation)
|   |   |   |   |   |-- TeamMember.java     # Subclass (OOP: Inheritance & Polymorphism)
|   |   |   |   |   |-- TeamLead.java       # Subclass with leadership privileges
|   |   |   |   |   |-- BaseTask.java       # Base task abstract entity
|   |   |   |   |   |-- BugTask.java        # Bug subclass with severity
|   |   |   |   |   |-- FeatureTask.java    # Feature subclass with story points
|   |   |   |   |   |-- ActivityLog.java    # Audit trail entity
|   |   |   |   |-- repository/             # Spring Data JPA interfaces
|   |   |   |   |   |-- TaskRepository.java
|   |   |   |   |   |-- MemberRepository.java
|   |   |   |   |-- service/                # Business logic & algorithms
|   |   |   |   |   |-- TaskService.java    # Array, ArrayList, Vector, String methods
|   |   |   |   |   |-- FileExportService.java # Java File Handling (CSV/TXT)
|   |   |   |   |   |-- RawJdbcService.java # Plain JDBC connection example
|   |   |   |   |-- scheduler/              # Multithreading & Background jobs
|   |   |   |   |   |-- OverdueTaskScheduler.java # Background worker thread
|   |   |   |   |-- exception/              # Robust error handling
|   |   |   |   |   |-- TaskNotFoundException.java # Custom runtime exception
|   |   |   |   |   |-- GlobalExceptionHandler.java # @ControllerAdvice
|   |   |   |   |-- controller/             # REST API Controllers
|   |   |   |       |-- TaskController.java
|   |   |   |       |-- MemberController.java
|   |   |   |-- resources/
|   |   |       |-- application.properties  # Database URL, credentials, port
|   |   |       |-- schema.sql              # Database DDL table definitions
|   |   |       |-- data.sql                # Initial seed records
|   |-- exports/                            # Generated CSV output directory
|   |-- logs/                               # Audit log text files
|
|-- frontend/                               # React Single Page Application
|   |-- package.json                        # Dependencies (React, Lucide, Tailwind)
|   |-- vite.config.ts                      # Bundler setup & dev proxy
|   |-- index.html                          # Entry HTML
|   |-- src/
|       |-- main.tsx                        # React DOM mounting
|       |-- App.tsx                         # Master routing & state orchestrator
|       |-- types/index.ts                  # TypeScript models & enums
|       |-- api/taskApi.ts                  # REST API client (fetch/axios)
|       |-- components/                     # Reusable UI widgets
|       |   |-- Navbar.tsx                  # Top bar with quick actions & alerts
|       |   |-- Sidebar.tsx                 # Navigation drawer
|       |   |-- TaskCard.tsx                # Kanban card with priority badge
|       |   |-- TaskModal.tsx               # Add/Edit task modal with validation
|       |   |-- MemberModal.tsx             # Add/Edit member modal
|       |   |-- Toast.tsx                   # Success/Error notification toasts
|       |-- pages/                          # Primary view screens
|           |-- DashboardView.tsx           # Metrics & status distribution
|           |-- KanbanView.tsx              # Interactive 3-column board
|           |-- TaskListView.tsx            # Table view with search & filters
|           |-- TeamView.tsx                # Member cards & workload
|           |-- ActivityLogView.tsx         # Real-time event feed
|-- .gitignore                              # Git exclusion rules
|-- README.md                               # Project documentation & run guide
`;

export const FIGMA_DESIGN_SPEC = {
  colors: [
    { name: 'Primary Brand (Indigo)', hex: '#4F46E5', usage: 'Primary buttons, active nav items, brand badge' },
    { name: 'Primary Hover', hex: '#4338CA', usage: 'Button hover states, selected items' },
    { name: 'Background Canvas', hex: '#F8FAFC', usage: 'App background, sub-panels' },
    { name: 'Card Surface', hex: '#FFFFFF', usage: 'Card surfaces, modals, table rows' },
    { name: 'Border Subtle', hex: '#E2E8F0', usage: 'Card outlines, dividers, input borders' },
    { name: 'Text Primary', hex: '#0F172A', usage: 'Headings, primary card titles' },
    { name: 'Text Secondary', hex: '#64748B', usage: 'Subtitles, timestamps, helper text' },
    { name: 'Status TODO (Slate)', hex: '#64748B', badgeBg: '#F1F5F9', usage: 'To Do column header and pills' },
    { name: 'Status IN PROGRESS (Blue)', hex: '#2563EB', badgeBg: '#EFF6FF', usage: 'In Progress column and badge' },
    { name: 'Status DONE (Emerald)', hex: '#059669', badgeBg: '#ECFDF5', usage: 'Done column, completed indicators' },
    { name: 'Priority HIGH (Red/Rose)', hex: '#DC2626', badgeBg: '#FEF2F2', usage: 'High priority badge, critical bugs' },
    { name: 'Priority MEDIUM (Amber)', hex: '#D97706', badgeBg: '#FFFBEB', usage: 'Medium priority badge' },
    { name: 'Priority LOW (Green/Teal)', hex: '#16A34A', badgeBg: '#F0FDF4', usage: 'Low priority badge' }
  ],
  typography: [
    { level: 'Display / Page Title', font: 'Plus Jakarta Sans or Inter Bold', size: '24px (1.5rem)', line: '32px' },
    { level: 'Section Heading / H2', font: 'Plus Jakarta Sans SemiBold', size: '18px (1.125rem)', line: '28px' },
    { level: 'Card Title / H3', font: 'Plus Jakarta Sans SemiBold', size: '15px (0.9375rem)', line: '22px' },
    { level: 'Body Regular', font: 'Inter / Plus Jakarta Sans Regular', size: '14px (0.875rem)', line: '20px' },
    { level: 'Small / Metadata', font: 'Inter Regular / Medium', size: '12px (0.75rem)', line: '16px' },
    { level: 'Monospace / Code', font: 'JetBrains Mono', size: '13px', line: '18px' }
  ],
  spacing: [
    { token: 'space-xs (4px)', usage: 'Tight icon gaps, badge padding vertical' },
    { token: 'space-sm (8px)', usage: 'Badge horizontal padding, input internal padding, list item gaps' },
    { token: 'space-md (16px)', usage: 'Card padding, form field vertical gaps' },
    { token: 'space-lg (24px)', usage: 'Grid gaps, section margins' },
    { token: 'space-xl (32px)', usage: 'Page container padding, header bottom margin' }
  ],
  components: [
    'Sidebar Navigation (Logo, 5 Nav tabs, Active indicator pill, Collapse toggle on mobile)',
    'Top Navbar (Global Search input, Quick + New Task button, Overdue notification pill, User profile)',
    'Metric Stat Card (Icon container with pastel background, big counter number, percentage trend, label)',
    'Kanban Column (Header with title + count pill, dashed drop target container, card list, quick + add button)',
    'Task Card (Priority pill top-left, Task Type tag top-right, Title 2-lines max, Description preview, Assignee avatar, Due date with calendar icon, Status dropdown)',
    'Filter Bar (Search input with clear button, Status multi-select dropdown, Priority dropdown, Assignee dropdown, Reset filters button)',
    'Team Member Card (Avatar with online status, Full name, Role badge [Team Lead / Member], Department, Assigned active tasks count, Edit/Delete action menu)',
    'Modal Dialog (Backdrop blur, Header with title & close icon, Accessible form fields with error feedback, Cancel & Save actions)'
  ],
  wireframes: [
    {
      screen: 'Screen 1: Dashboard View',
      description: 'At the top, 4 metric cards: Total Tasks, To Do, In Progress, Done. Below that, a 2-column layout: Left (70%) displays Quick Filtered Task Stream and Overdue Tasks highlight. Right (30%) displays Team Workload breakdown (progress bar per member) and Recent System Activity log.'
    },
    {
      screen: 'Screen 2: Kanban Board View',
      description: 'Top action bar contains task search, priority filter, member filter, "+ New Task" button, and "Export CSV" button. Below are 3 vertical columns: "TO DO", "IN PROGRESS", "DONE". Each column displays task cards with color-coded priority borders, assignee avatars, and 1-click status move buttons.'
    },
    {
      screen: 'Screen 3: Tasks List View',
      description: 'Data table alternative to the Kanban board. Displays Columns: ID, Title, Type (Bug/Feature), Priority, Status, Assigned To, Due Date, and Actions (Edit, Delete, Export). Includes search by title using string matching, multi-column sorting, and bulk CSV export.'
    },
    {
      screen: 'Screen 4: Team Members View',
      description: 'Grid of member cards. Top bar with "+ Add Member" button and total headcount. Each card contains member avatar, name, email, role badge ("TEAM LEAD" in purple or "TEAM MEMBER" in slate), department, contact phone, count of currently assigned tasks, and edit/delete icons.'
    },
    {
      screen: 'Screen 5: Add / Edit Task Modal',
      description: 'Centered popup modal with backdrop overlay. Inputs: Task Title (required), Description, Task Type radio (Feature vs Bug), Priority dropdown (Low, Medium, High), Assignee dropdown (populated from members), Due Date picker, and conditional fields (Severity for Bugs, Story Points for Features).'
    }
  ]
};

export const POSTGRESQL_SCHEMA_SQL = `-- ============================================================================
-- TEAM TASK MANAGEMENT - POSTGRESQL DATABASE SCHEMA (DDL)
-- Database Name: team_task_db
-- ============================================================================

-- Drop tables if already existing (for clean re-runs)
DROP TABLE IF EXISTS activity_logs CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS members CASCADE;

-- ----------------------------------------------------------------------------
-- 1. MEMBERS TABLE
-- Stores team members and team leads (implements OOP Person inheritance)
-- ----------------------------------------------------------------------------
CREATE TABLE members (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    role VARCHAR(30) NOT NULL CHECK (role IN ('TEAM_LEAD', 'TEAM_MEMBER')),
    department VARCHAR(100) NOT NULL,
    phone VARCHAR(25),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index on email for fast lookups during login/assignment
CREATE INDEX idx_members_email ON members(email);

-- ----------------------------------------------------------------------------
-- 2. TASKS TABLE
-- Stores tasks with polymorphic types: FEATURE and BUG
-- ----------------------------------------------------------------------------
CREATE TABLE tasks (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'TODO' 
        CHECK (status IN ('TODO', 'IN_PROGRESS', 'DONE')),
    priority VARCHAR(20) NOT NULL DEFAULT 'MEDIUM' 
        CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
    task_type VARCHAR(20) NOT NULL DEFAULT 'FEATURE' 
        CHECK (task_type IN ('FEATURE', 'BUG')),
    assigned_member_id VARCHAR(36),
    due_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Specific attribute for BugTask (Inheritance)
    severity VARCHAR(20) CHECK (severity IN ('CRITICAL', 'MAJOR', 'MINOR')),
    
    -- Specific attributes for FeatureTask (Inheritance)
    story_points INT DEFAULT 1,
    estimated_hours INT DEFAULT 4,
    
    -- Foreign Key referencing members table
    CONSTRAINT fk_tasks_member 
        FOREIGN KEY (assigned_member_id) 
        REFERENCES members(id) 
        ON DELETE SET NULL
);

-- Indexes for performance on frequent filter columns
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_assigned_member ON tasks(assigned_member_id);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);

-- ----------------------------------------------------------------------------
-- 3. ACTIVITY_LOGS TABLE
-- Audit log of system events (persists Java Vector activity records)
-- ----------------------------------------------------------------------------
CREATE TABLE activity_logs (
    id VARCHAR(36) PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    action VARCHAR(50) NOT NULL,
    details TEXT NOT NULL,
    performed_by VARCHAR(100) NOT NULL,
    event_type VARCHAR(50) NOT NULL
);

CREATE INDEX idx_activity_logs_timestamp ON activity_logs(timestamp DESC);

-- ============================================================================
-- SAMPLE SEED DATA (DML INSERTS)
-- ============================================================================

INSERT INTO members (id, name, email, role, department, phone, avatar_url) VALUES
('m-1', 'Aarav Sharma', 'aarav.sharma@collegeteam.edu', 'TEAM_LEAD', 'Full Stack & Architecture', '+91 98765 43210', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'),
('m-2', 'Diya Patel', 'diya.patel@collegeteam.edu', 'TEAM_MEMBER', 'Frontend & UI Engineering', '+91 98765 43211', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'),
('m-3', 'Rohan Verma', 'rohan.verma@collegeteam.edu', 'TEAM_MEMBER', 'Backend & Spring Boot Services', '+91 98765 43212', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
('m-4', 'Ananya Iyer', 'ananya.iyer@collegeteam.edu', 'TEAM_MEMBER', 'Quality Assurance & Database', '+91 98765 43213', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150');

INSERT INTO tasks (id, title, description, status, priority, task_type, assigned_member_id, due_date, severity, story_points, estimated_hours) VALUES
('TSK-101', 'Design PostgreSQL relational schema & migrations', 'Set up tables for members, tasks, and activity_logs with appropriate foreign keys and constraints.', 'DONE', 'HIGH', 'FEATURE', 'm-4', '2026-10-20', NULL, 5, 12),
('TSK-102', 'Implement Spring Boot REST Controllers with CORS', 'Build MemberController and TaskController supporting GET, POST, PUT, DELETE with ResponseEntity.', 'DONE', 'HIGH', 'FEATURE', 'm-3', '2026-10-22', NULL, 8, 16),
('TSK-103', 'Fix null pointer exception during task assignment', 'When assigning a task to an unselected member, TaskService should throw custom TaskNotFoundException.', 'IN_PROGRESS', 'HIGH', 'BUG', 'm-1', '2026-10-28', 'CRITICAL', NULL, NULL),
('TSK-104', 'Build React Kanban Board with interactive drag columns', 'Create responsive 3-column board (To Do, In Progress, Done) with quick status dropdown and priority color badges.', 'IN_PROGRESS', 'MEDIUM', 'FEATURE', 'm-2', '2026-10-29', NULL, 5, 10),
('TSK-105', 'Implement File Handling CSV & TXT log exporter', 'Write tasks to CSV file with headers and append activity logs using Java FileWriter and BufferedWriter.', 'TODO', 'MEDIUM', 'FEATURE', 'm-3', '2026-11-02', NULL, 3, 6),
('TSK-106', 'Resolve timezone offset bug in task deadline display', 'Dates were shifting by -1 day in IST due to UTC serialization; parse with LocalDate format.', 'TODO', 'LOW', 'BUG', 'm-4', '2026-11-05', 'MINOR', NULL, NULL),
('TSK-107', 'Multithreading: Overdue task reminder background thread', 'Set up @Scheduled cron / background Thread to inspect pending tasks past due date and log warnings.', 'TODO', 'HIGH', 'FEATURE', 'm-1', '2026-11-01', NULL, 5, 8);

INSERT INTO activity_logs (id, timestamp, action, details, performed_by, event_type) VALUES
('act-1', '2026-10-26 09:15:00', 'SYSTEM_BOOT', 'PostgreSQL database connected & Spring Boot initialized successfully.', 'System', 'BACKGROUND_CHECK'),
('act-2', '2026-10-26 09:30:12', 'TASK_STATUS_CHANGED', 'Task "Design PostgreSQL relational schema" marked as DONE.', 'Ananya Iyer', 'TASK_UPDATED'),
('act-3', '2026-10-26 10:05:44', 'TASK_ASSIGNED', 'Assigned "Fix null pointer exception during task assignment" to Aarav Sharma.', 'Aarav Sharma', 'TASK_UPDATED');
`;

export const JAVA_BACKEND_FILES: JavaCodeFile[] = [
  {
    name: 'pom.xml',
    path: 'backend/pom.xml',
    category: 'config',
    conceptHighlights: ['Maven Dependencies', 'Spring Boot 3', 'PostgreSQL Driver', 'Spring Data JPA'],
    description: 'Maven configuration file with dependencies for Spring Boot Starter Web, JPA, PostgreSQL, and Scheduling.',
    code: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.3</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    
    <groupId>com.college</groupId>
    <artifactId>team-task-management</artifactId>
    <version>1.0.0</version>
    <name>Team Task Management</name>
    <description>College Mini Project Prototype - Java Spring Boot Backend</description>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Web for REST APIs -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <!-- Spring Data JPA for Object Relational Mapping (ORM) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        
        <!-- PostgreSQL JDBC Driver for Database Connection -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- Spring Boot Starter Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        
        <!-- Spring Boot Starter Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`
  },
  {
    name: 'application.properties',
    path: 'backend/src/main/resources/application.properties',
    category: 'config',
    conceptHighlights: ['Configuration', 'PostgreSQL URL', 'JPA Hibernate DDL', 'CORS & Port'],
    description: 'Spring Boot application configuration for server port, PostgreSQL credentials, and JPA behavior.',
    code: `# Server Configuration
server.port=8080

# CONCEPT: Database connection - PostgreSQL configuration via Spring Data JPA
spring.datasource.url=jdbc:postgresql://localhost:5432/team_task_db
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA / Hibernate properties
# 'update' creates or updates tables automatically based on Java Entities
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Custom file export directory path
app.export.dir=./exports
app.log.filepath=./logs/activity_audit_log.txt`
  },
  {
    name: 'Person.java',
    path: 'backend/src/main/java/com/college/taskmgmt/model/Person.java',
    category: 'model',
    conceptHighlights: ['OOP: Abstraction', 'OOP: Encapsulation (private fields + getters/setters)', 'Inheritance base class'],
    description: 'Abstract base class representing a human individual. Serves as base for TeamMember and TeamLead.',
    code: `package com.college.taskmgmt.model;

import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import java.time.LocalDateTime;

// CONCEPT: OOP concepts - Abstraction (cannot be directly instantiated)
// CONCEPT: Inheritance - Base class for TeamMember and TeamLead
@MappedSuperclass
public abstract class Person {

    // CONCEPT: OOP concepts - Encapsulation (private fields, accessed via getters/setters)
    @Id
    private String id;
    private String name;
    private String email;
    private String department;
    private String phone;
    private LocalDateTime createdAt;

    // Default constructor
    public Person() {
        this.createdAt = LocalDateTime.now();
    }

    // Parameterized constructor
    public Person(String id, String name, String email, String department, String phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.department = department;
        this.phone = phone;
        this.createdAt = LocalDateTime.now();
    }

    // CONCEPT: OOP concepts - Polymorphism / Abstract method to be overridden by subclasses
    public abstract String getRoleTitle();

    // CONCEPT: Functions (methods) - helper formatting method
    public String getContactSummary() {
        return this.name + " (" + this.email + ")";
    }

    // Getters and Setters (Encapsulation)
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}`
  },
  {
    name: 'TeamMember.java',
    path: 'backend/src/main/java/com/college/taskmgmt/model/TeamMember.java',
    category: 'model',
    conceptHighlights: ['OOP: Inheritance (extends Person)', 'Method Overriding', 'JPA Entity'],
    description: 'Concrete entity representing standard team developers/engineers, inheriting from Person.',
    code: `package com.college.taskmgmt.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

// CONCEPT: Inheritance - TeamMember extends the abstract base class Person
// CONCEPT: Database connection - JPA Entity mapped to 'members' table
@Entity
@Table(name = "members")
public class TeamMember extends Person {

    private String role = "TEAM_MEMBER";
    private String avatarUrl;

    public TeamMember() {
        super();
    }

    public TeamMember(String id, String name, String email, String department, String phone, String avatarUrl) {
        super(id, name, email, department, phone);
        this.role = "TEAM_MEMBER";
        this.avatarUrl = avatarUrl;
    }

    // CONCEPT: OOP concepts - Method Overriding (Polymorphism)
    @Override
    public String getRoleTitle() {
        return "Team Member - " + getDepartment();
    }

    // Getters and Setters
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
}`
  },
  {
    name: 'TeamLead.java',
    path: 'backend/src/main/java/com/college/taskmgmt/model/TeamLead.java',
    category: 'model',
    conceptHighlights: ['OOP: Inheritance', 'Method Overriding', 'Polymorphism'],
    description: 'Subclass of Person with additional leadership privileges and overridden role title.',
    code: `package com.college.taskmgmt.model;

// CONCEPT: Inheritance - TeamLead also extends Person, demonstrating a class hierarchy
public class TeamLead extends Person {

    private int maxAssignedReviewers = 10;
    private String managementTier = "Tier-1";

    public TeamLead(String id, String name, String email, String department, String phone) {
        super(id, name, email, department, phone);
    }

    // CONCEPT: OOP concepts - Method Overriding (Polymorphism)
    @Override
    public String getRoleTitle() {
        return "Lead Architect & Project Coordinator (" + managementTier + ")";
    }

    public int getMaxAssignedReviewers() { return maxAssignedReviewers; }
    public void setMaxAssignedReviewers(int maxAssignedReviewers) { 
        this.maxAssignedReviewers = maxAssignedReviewers; 
    }
}`
  },
  {
    name: 'BaseTask.java',
    path: 'backend/src/main/java/com/college/taskmgmt/model/BaseTask.java',
    category: 'model',
    conceptHighlights: ['OOP: Abstraction', 'OOP: Encapsulation', 'Polymorphism (calculateUrgencyScore)'],
    description: 'Abstract base task entity containing common properties: id, title, description, status, priority, dueDate.',
    code: `package com.college.taskmgmt.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

// CONCEPT: OOP concepts - Abstraction (BaseTask cannot be created alone)
// CONCEPT: Inheritance - Base class for BugTask and FeatureTask
@Entity
@Table(name = "tasks")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "task_type", discriminatorType = DiscriminatorType.STRING)
public abstract class BaseTask {

    // CONCEPT: OOP concepts - Encapsulation (all state variables are private)
    @Id
    private String id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(nullable = false)
    private String status; // TODO, IN_PROGRESS, DONE
    
    @Column(nullable = false)
    private String priority; // LOW, MEDIUM, HIGH
    
    @Column(name = "assigned_member_id")
    private String assignedMemberId;
    
    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public BaseTask() {
        this.createdAt = LocalDateTime.now();
        this.status = "TODO";
        this.priority = "MEDIUM";
    }

    public BaseTask(String id, String title, String description, String priority, LocalDate dueDate) {
        this();
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
    }

    // CONCEPT: OOP concepts - Polymorphism / Abstract method overridden in subclasses
    public abstract int calculateUrgencyScore();

    // CONCEPT: Functions (methods) - reusable business helper
    public boolean isOverdue() {
        if ("DONE".equalsIgnoreCase(this.status)) {
            return false;
        }
        return LocalDate.now().isAfter(this.dueDate);
    }

    // Getters and Setters (Encapsulation)
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getAssignedMemberId() { return assignedMemberId; }
    public void setAssignedMemberId(String assignedMemberId) { this.assignedMemberId = assignedMemberId; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}`
  },
  {
    name: 'BugTask.java',
    path: 'backend/src/main/java/com/college/taskmgmt/model/BugTask.java',
    category: 'model',
    conceptHighlights: ['OOP: Inheritance (extends BaseTask)', 'Method Overriding', 'Polymorphism'],
    description: 'Subclass of BaseTask for software defects, introducing severity (CRITICAL, MAJOR, MINOR).',
    code: `package com.college.taskmgmt.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.time.LocalDate;

// CONCEPT: Inheritance - BugTask inherits all fields from BaseTask
@Entity
@DiscriminatorValue("BUG")
public class BugTask extends BaseTask {

    // Specific attribute for bug tracking
    private String severity = "MAJOR"; // CRITICAL, MAJOR, MINOR

    public BugTask() {
        super();
    }

    public BugTask(String id, String title, String description, String priority, LocalDate dueDate, String severity) {
        super(id, title, description, priority, dueDate);
        this.severity = severity;
    }

    // CONCEPT: OOP concepts - Method Overriding (Polymorphism)
    // Bugs calculate urgency heavily weighted on severity
    @Override
    public int calculateUrgencyScore() {
        int score = 50;
        if ("CRITICAL".equalsIgnoreCase(severity)) {
            score += 50; // Critical bugs get highest priority
        } else if ("MAJOR".equalsIgnoreCase(severity)) {
            score += 30;
        } else {
            score += 10;
        }
        return score;
    }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
}`
  },
  {
    name: 'FeatureTask.java',
    path: 'backend/src/main/java/com/college/taskmgmt/model/FeatureTask.java',
    category: 'model',
    conceptHighlights: ['OOP: Inheritance (extends BaseTask)', 'Method Overriding', 'Polymorphism'],
    description: 'Subclass of BaseTask for user stories, adding storyPoints and estimatedHours.',
    code: `package com.college.taskmgmt.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.time.LocalDate;

// CONCEPT: Inheritance - FeatureTask inherits from BaseTask
@Entity
@DiscriminatorValue("FEATURE")
public class FeatureTask extends BaseTask {

    private Integer storyPoints = 1;
    private Integer estimatedHours = 4;

    public FeatureTask() {
        super();
    }

    public FeatureTask(String id, String title, String description, String priority, 
                       LocalDate dueDate, Integer storyPoints, Integer estimatedHours) {
        super(id, title, description, priority, dueDate);
        this.storyPoints = storyPoints;
        this.estimatedHours = estimatedHours;
    }

    // CONCEPT: OOP concepts - Method Overriding (Polymorphism)
    // Features calculate urgency based on story points and estimated effort
    @Override
    public int calculateUrgencyScore() {
        int score = 20;
        if (storyPoints != null) {
            score += (storyPoints * 5);
        }
        return score;
    }

    public Integer getStoryPoints() { return storyPoints; }
    public void setStoryPoints(Integer storyPoints) { this.storyPoints = storyPoints; }

    public Integer getEstimatedHours() { return estimatedHours; }
    public void setEstimatedHours(Integer estimatedHours) { this.estimatedHours = estimatedHours; }
}`
  },
  {
    name: 'ActivityLog.java',
    path: 'backend/src/main/java/com/college/taskmgmt/model/ActivityLog.java',
    category: 'model',
    conceptHighlights: ['JPA Entity', 'Encapsulation'],
    description: 'Entity mapping system activities into PostgreSQL for persistent audit trail.',
    code: `package com.college.taskmgmt.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "activity_logs")
public class ActivityLog {

    @Id
    private String id;
    private LocalDateTime timestamp;
    private String action;
    private String details;
    private String performedBy;
    private String eventType;

    public ActivityLog() {
        this.timestamp = LocalDateTime.now();
    }

    public ActivityLog(String id, String action, String details, String performedBy, String eventType) {
        this.id = id;
        this.timestamp = LocalDateTime.now();
        this.action = action;
        this.details = details;
        this.performedBy = performedBy;
        this.eventType = eventType;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public String getPerformedBy() { return performedBy; }
    public void setPerformedBy(String performedBy) { this.performedBy = performedBy; }

    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }
}`
  },
  {
    name: 'TaskRepository.java',
    path: 'backend/src/main/java/com/college/taskmgmt/repository/TaskRepository.java',
    category: 'repository',
    conceptHighlights: ['Spring Data JPA', 'Derived Query Methods', 'PostgreSQL Interface'],
    description: 'JPA Repository for BaseTask CRUD, filtering by status and assigned members.',
    code: `package com.college.taskmgmt.repository;

import com.college.taskmgmt.model.BaseTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

// CONCEPT: Database connection - Spring Data JPA repository interface
@Repository
public interface TaskRepository extends JpaRepository<BaseTask, String> {

    // Derived Query Methods provided automatically by Spring Data JPA
    List<BaseTask> findByStatus(String status);
    
    List<BaseTask> findByPriority(String priority);
    
    List<BaseTask> findByAssignedMemberId(String memberId);
    
    long countByStatus(String status);
}`
  },
  {
    name: 'MemberRepository.java',
    path: 'backend/src/main/java/com/college/taskmgmt/repository/MemberRepository.java',
    category: 'repository',
    conceptHighlights: ['Spring Data JPA', 'PostgreSQL Queries'],
    description: 'JPA Repository for TeamMember persistence and email lookups.',
    code: `package com.college.taskmgmt.repository;

import com.college.taskmgmt.model.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

// CONCEPT: Database connection - Spring Data JPA repository for Members
@Repository
public interface MemberRepository extends JpaRepository<TeamMember, String> {

    Optional<TeamMember> findByEmail(String email);
    
    boolean existsByEmail(String email);
}`
  },
  {
    name: 'TaskService.java',
    path: 'backend/src/main/java/com/college/taskmgmt/service/TaskService.java',
    category: 'service',
    conceptHighlights: [
      'Functions (methods)', 
      'Control structures (if/else, switch on status, for, while)', 
      'Arrays (fixed priority array)', 
      'ArrayList (dynamic tasks list)', 
      'Vector (thread-safe activity log)', 
      'Strings (trim, toLowerCase, contains, split, equalsIgnoreCase, StringBuilder)', 
      'Exception Handling (TaskNotFoundException)'
    ],
    description: 'Central business logic service demonstrating arrays, ArrayList, Vector, control structures, and String methods.',
    code: `package com.college.taskmgmt.service;

import com.college.taskmgmt.exception.TaskNotFoundException;
import com.college.taskmgmt.model.ActivityLog;
import com.college.taskmgmt.model.BaseTask;
import com.college.taskmgmt.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // CONCEPT: Arrays, ArrayList, and Vector:
    // 1) Fixed Array - array is used for immutable, fixed priority domain values
    public static final String[] ALLOWED_PRIORITIES = {"LOW", "MEDIUM", "HIGH"};
    public static final String[] ALLOWED_STATUSES = {"TODO", "IN_PROGRESS", "DONE"};

    // 2) Vector - Vector is thread-safe and synchronized, making it ideal for multi-threaded
    // activity logging where multiple HTTP requests or background threads append entries simultaneously.
    private final Vector<ActivityLog> inMemoryActivityLog = new Vector<>();

    // CONCEPT: Functions (methods) - Reusable method to validate task inputs
    public void validateTaskInput(String title, String priority, LocalDate dueDate) {
        // CONCEPT: Strings - trim and equals check
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Task title cannot be blank.");
        }

        // CONCEPT: Control structures - for loop iterating through fixed Array
        boolean validPriority = false;
        for (String p : ALLOWED_PRIORITIES) {
            // CONCEPT: Strings - equalsIgnoreCase
            if (p.equalsIgnoreCase(priority)) {
                validPriority = true;
                break;
            }
        }

        // CONCEPT: Control structures - if/else decision branch
        if (!validPriority) {
            throw new IllegalArgumentException("Invalid priority: " + priority + ". Allowed: LOW, MEDIUM, HIGH");
        }

        if (dueDate == null) {
            throw new IllegalArgumentException("Due date is required.");
        }
    }

    // CONCEPT: Functions (methods) - Reusable method to retrieve all tasks
    // CONCEPT: Arrays, ArrayList, and Vector: ArrayList used for dynamic collection of tasks
    public List<BaseTask> getAllTasks() {
        List<BaseTask> tasks = new ArrayList<>(taskRepository.findAll());
        return tasks;
    }

    public BaseTask getTaskById(String id) {
        // CONCEPT: Exception handling - throwing custom TaskNotFoundException
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with ID: " + id));
    }

    // CONCEPT: Strings - trim, toLowerCase, contains for flexible title searching
    public List<BaseTask> searchTasksByTitle(String query) {
        // CONCEPT: Arrays, ArrayList, and Vector - Dynamic ArrayList
        List<BaseTask> matchingTasks = new ArrayList<>();
        
        if (query == null || query.trim().isEmpty()) {
            return getAllTasks();
        }

        // Clean and prepare query using String methods
        String normalizedQuery = query.trim().toLowerCase();

        List<BaseTask> allTasks = taskRepository.findAll();
        
        // CONCEPT: Control structures - for-each loop
        for (BaseTask task : allTasks) {
            if (task.getTitle() != null) {
                // CONCEPT: Strings - toLowerCase & contains
                if (task.getTitle().toLowerCase().contains(normalizedQuery)) {
                    matchingTasks.add(task);
                }
            }
        }
        return matchingTasks;
    }

    // CONCEPT: Control structures - switch statement on task status
    public String getStatusDescription(String status) {
        // Switch control structure
        switch (status.toUpperCase()) {
            case "TODO":
                return "Task is pending and waiting to be picked up by a team member.";
            case "IN_PROGRESS":
                return "Task is actively being engineered or resolved.";
            case "DONE":
                return "Task has been tested, approved, and marked complete.";
            default:
                return "Unknown status code provided.";
        }
    }

    // CONCEPT: Strings - StringBuilder for efficient string concatenation
    public String generateTaskSummaryReport() {
        List<BaseTask> allTasks = taskRepository.findAll();
        StringBuilder sb = new StringBuilder();
        sb.append("=== TASK STATUS REPORT ===").append("\\n");
        sb.append("Generated on: ").append(LocalDate.now()).append("\\n");
        sb.append("Total Items: ").append(allTasks.size()).append("\\n\\n");

        int todoCount = 0;
        int inProgressCount = 0;
        int doneCount = 0;

        // CONCEPT: Control structures - while loop demonstration
        int index = 0;
        while (index < allTasks.size()) {
            BaseTask t = allTasks.get(index);
            // CONCEPT: Control structures - switch
            switch (t.getStatus().toUpperCase()) {
                case "TODO": todoCount++; break;
                case "IN_PROGRESS": inProgressCount++; break;
                case "DONE": doneCount++; break;
            }
            index++;
        }

        sb.append("1. To Do Tasks: ").append(todoCount).append("\\n");
        sb.append("2. In Progress: ").append(inProgressCount).append("\\n");
        sb.append("3. Done Tasks: ").append(doneCount).append("\\n");

        return sb.toString();
    }

    // Record activity using synchronized Vector
    public void logActivity(String action, String details, String performedBy, String eventType) {
        ActivityLog log = new ActivityLog(UUID.randomUUID().toString(), action, details, performedBy, eventType);
        // CONCEPT: Vector thread-safe addElement
        inMemoryActivityLog.add(log);
    }

    public Vector<ActivityLog> getRecentActivities() {
        return inMemoryActivityLog;
    }
}`
  },
  {
    name: 'FileExportService.java',
    path: 'backend/src/main/java/com/college/taskmgmt/service/FileExportService.java',
    category: 'service',
    conceptHighlights: ['File handling (FileWriter, BufferedWriter, BufferedReader, FileReader)', 'CSV Generation', 'Exception Handling (try-with-resources, finally)'],
    description: 'Exports tasks to CSV and writes/reads activity logs using standard Java I/O streams.',
    code: `package com.college.taskmgmt.service;

import com.college.taskmgmt.model.ActivityLog;
import com.college.taskmgmt.model.BaseTask;
import org.springframework.stereotype.Service;

import java.io.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

// CONCEPT: File handling - Reading and writing files using FileWriter, BufferedWriter, BufferedReader
@Service
public class FileExportService {

    // CONCEPT: File handling - Export tasks to CSV format
    // CONCEPT: Exception handling - try-with-resources automatically closes writers
    public File exportTasksToCSV(List<BaseTask> tasks, String outputFilePath) throws IOException {
        File file = new File(outputFilePath);
        
        // Ensure parent directory exists
        if (file.getParentFile() != null) {
            file.getParentFile().mkdirs();
        }

        // CONCEPT: File handling - BufferedWriter wraps FileWriter for buffered disk performance
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
            // Write CSV Header
            writer.write("Task ID,Title,Status,Priority,Due Date,Assigned Member ID");
            writer.newLine();

            // Iterate tasks and write row by row
            for (BaseTask task : tasks) {
                // CONCEPT: Strings - escaping quotes and sanitizing
                String safeTitle = task.getTitle() != null ? task.getTitle().replace("\"", "\"\"") : "";
                
                String row = String.format("%s,\\"%s\\",%s,%s,%s,%s",
                        task.getId(),
                        safeTitle,
                        task.getStatus(),
                        task.getPriority(),
                        task.getDueDate() != null ? task.getDueDate().toString() : "",
                        task.getAssignedMemberId() != null ? task.getAssignedMemberId() : "UNASSIGNED"
                );
                writer.write(row);
                writer.newLine();
            }
            writer.flush();
        } catch (IOException e) {
            System.err.println("Error writing CSV file: " + e.getMessage());
            throw e;
        }

        return file;
    }

    // CONCEPT: File handling - Writing activity logs to a text file
    // CONCEPT: Exception handling - Demonstrating standard try/catch/finally block
    public void appendActivityLogToFile(ActivityLog log, String logFilePath) {
        BufferedWriter writer = null;
        try {
            File logFile = new File(logFilePath);
            if (logFile.getParentFile() != null) {
                logFile.getParentFile().mkdirs();
            }
            // true parameter means append mode
            writer = new BufferedWriter(new FileWriter(logFile, true));
            String entry = String.format("[%s] %s | Performed By: %s | Details: %s%n",
                    log.getTimestamp().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                    log.getAction(),
                    log.getPerformedBy(),
                    log.getDetails());
            writer.write(entry);
        } catch (IOException ex) {
            System.err.println("Failed to append to log file: " + ex.getMessage());
        } finally {
            // CONCEPT: Exception handling - finally block always executes to release file resource
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    System.err.println("Failed to close writer in finally: " + e.getMessage());
                }
            }
        }
    }

    // CONCEPT: File handling - Reading activity log file back into memory line by line
    public List<String> readActivityLogFile(String logFilePath) {
        List<String> lines = new ArrayList<>();
        File logFile = new File(logFilePath);
        if (!logFile.exists()) {
            return lines;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(logFile))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // CONCEPT: Strings - trim lines
                if (!line.trim().isEmpty()) {
                    lines.add(line.trim());
                }
            }
        } catch (IOException e) {
            System.err.println("Error reading activity log: " + e.getMessage());
        }
        return lines;
    }
}`
  },
  {
    name: 'RawJdbcService.java',
    path: 'backend/src/main/java/com/college/taskmgmt/service/RawJdbcService.java',
    category: 'service',
    conceptHighlights: ['Database Connection: Plain JDBC', 'DriverManager', 'PreparedStatement', 'ResultSet'],
    description: 'Plain JDBC demonstration comparing low-level SQL connectivity against Spring Data JPA.',
    code: `package com.college.taskmgmt.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

// CONCEPT: Database connection - Plain JDBC (DriverManager, PreparedStatement, ResultSet)
// This class demonstrates raw JDBC so students can understand how low-level drivers work underneath ORMs like JPA.
@Service
public class RawJdbcService {

    @Value("\${spring.datasource.url}")
    private String dbUrl;

    @Value("\${spring.datasource.username}")
    private String dbUser;

    @Value("\${spring.datasource.password}")
    private String dbPass;

    /**
     * Executes a raw parameterized query using plain JDBC.
     * Counts tasks grouped by status without using Hibernate or JPA.
     */
    public Map<String, Integer> getTaskCountsUsingRawJdbc() {
        Map<String, Integer> statusCounts = new HashMap<>();
        String sql = "SELECT status, COUNT(*) AS total FROM tasks GROUP BY status";

        // CONCEPT: Exception handling - try-with-resources managing Connection, PreparedStatement & ResultSet
        try (
            // 1. Establish low-level physical connection via DriverManager
            Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPass);
            // 2. Prepare statement to prevent SQL injection
            PreparedStatement stmt = conn.prepareStatement(sql);
            // 3. Execute query and retrieve ResultSet cursor
            ResultSet rs = stmt.executeQuery()
        ) {
            while (rs.next()) {
                String status = rs.getString("status");
                int total = rs.getInt("total");
                statusCounts.put(status, total);
            }
        } catch (SQLException e) {
            System.err.println("JDBC Connection error: " + e.getMessage());
            e.printStackTrace();
        }
        return statusCounts;
    }
}`
  },
  {
    name: 'OverdueTaskScheduler.java',
    path: 'backend/src/main/java/com/college/taskmgmt/scheduler/OverdueTaskScheduler.java',
    category: 'scheduler',
    conceptHighlights: ['Multithreading', '@Scheduled Background Worker Thread', 'Thread Safety explanation'],
    description: 'Background thread running every minute to monitor overdue deadlines and log warnings.',
    code: `package com.college.taskmgmt.scheduler;

import com.college.taskmgmt.model.BaseTask;
import com.college.taskmgmt.repository.TaskRepository;
import com.college.taskmgmt.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

// CONCEPT: Multithreading - Background Worker Thread using Spring @Scheduled
// Explanation of Thread Safety:
// Background scheduled threads execute concurrently alongside HTTP request-handling worker threads.
// To prevent race conditions and concurrent modification exceptions:
// 1. TaskService uses synchronized Vector for activity logs so reads/writes from this thread do not corrupt memory.
// 2. Database transactions are isolated at the database level.
@Component
public class OverdueTaskScheduler {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskService taskService;

    // Run every 60,000 milliseconds (1 minute) on an independent background thread
    @Scheduled(fixedRate = 60000)
    public void scanAndLogOverdueTasks() {
        String threadName = Thread.currentThread().getName();
        // System.out.println("[THREAD: " + threadName + "] Checking for overdue tasks...");

        List<BaseTask> pendingTasks = taskRepository.findAll();
        int overdueCount = 0;

        for (BaseTask task : pendingTasks) {
            // CONCEPT: Control structures - if condition
            if (!"DONE".equalsIgnoreCase(task.getStatus()) && task.getDueDate() != null) {
                if (LocalDate.now().isAfter(task.getDueDate())) {
                    overdueCount++;
                    // Log warning to activity log via synchronized Vector
                    taskService.logActivity(
                            "OVERDUE_ALERT",
                            "Task '" + task.getTitle() + "' was due on " + task.getDueDate() + " and is still " + task.getStatus(),
                            "Thread:" + threadName,
                            "BACKGROUND_CHECK"
                    );
                }
            }
        }

        if (overdueCount > 0) {
            System.out.println("[BACKGROUND THREAD] Found " + overdueCount + " overdue task(s)!");
        }
    }
}`
  },
  {
    name: 'TaskNotFoundException.java',
    path: 'backend/src/main/java/com/college/taskmgmt/exception/TaskNotFoundException.java',
    category: 'exception',
    conceptHighlights: ['Exception handling: Custom Exception', 'Inheritance (extends RuntimeException)'],
    description: 'Custom checked-or-runtime domain exception thrown when a task ID is missing.',
    code: `package com.college.taskmgmt.exception;

// CONCEPT: Exception handling - Custom domain exception
// CONCEPT: Inheritance - extends standard RuntimeException
public class TaskNotFoundException extends RuntimeException {

    public TaskNotFoundException(String message) {
        super(message);
    }

    public TaskNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}`
  },
  {
    name: 'GlobalExceptionHandler.java',
    path: 'backend/src/main/java/com/college/taskmgmt/exception/GlobalExceptionHandler.java',
    category: 'exception',
    conceptHighlights: ['Exception handling: @ControllerAdvice', 'JSON Error Response', 'HTTP Status Codes'],
    description: 'Centralized exception interceptor returning standardized JSON errors across all REST controllers.',
    code: `package com.college.taskmgmt.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

// CONCEPT: Exception handling - Global exception handler using @ControllerAdvice
// Catches exceptions across all controllers and formats them into clean JSON responses
@ControllerAdvice
public class GlobalExceptionHandler {

    // Handles TaskNotFoundException returning 404 NOT FOUND
    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<Object> handleTaskNotFoundException(TaskNotFoundException ex, WebRequest request) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.NOT_FOUND.value());
        body.put("error", "Task Not Found");
        body.put("message", ex.getMessage());
        body.put("path", request.getDescription(false).replace("uri=", ""));

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    // Handles invalid arguments returning 400 BAD REQUEST
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest request) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("error", "Invalid Request Parameter");
        body.put("message", ex.getMessage());
        body.put("path", request.getDescription(false).replace("uri=", ""));

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    // Generic fallback for unhandled 500 exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGlobalException(Exception ex, WebRequest request) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        body.put("error", "Internal Server Error");
        body.put("message", ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}`
  },
  {
    name: 'TaskController.java',
    path: 'backend/src/main/java/com/college/taskmgmt/controller/TaskController.java',
    category: 'controller',
    conceptHighlights: ['API: REST Controller', 'CORS Enabled', 'HTTP Status Codes (200, 201, 204)', 'GET, POST, PUT, DELETE'],
    description: 'REST Controller exposing CRUD operations, search by title, and file export endpoints.',
    code: `package com.college.taskmgmt.controller;

import com.college.taskmgmt.model.BaseTask;
import com.college.taskmgmt.model.FeatureTask;
import com.college.taskmgmt.repository.TaskRepository;
import com.college.taskmgmt.service.FileExportService;
import com.college.taskmgmt.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

// CONCEPT: API - REST controller with JSON serialization
// CONCEPT: API - Cross-Origin Resource Sharing (CORS) enabled for React frontend
@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "*"})
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskService taskService;

    @Autowired
    private FileExportService fileExportService;

    // GET /api/tasks - Retrieve all tasks or search by title
    @GetMapping
    public ResponseEntity<List<BaseTask>> getAllTasks(@RequestParam(required = false) String search) {
        if (search != null && !search.trim().isEmpty()) {
            return ResponseEntity.ok(taskService.searchTasksByTitle(search));
        }
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    // GET /api/tasks/{id} - Retrieve single task
    @GetMapping("/{id}")
    public ResponseEntity<BaseTask> getTaskById(@PathVariable String id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    // POST /api/tasks - Create new task
    @PostMapping
    public ResponseEntity<BaseTask> createTask(@RequestBody FeatureTask newTask) {
        if (newTask.getId() == null || newTask.getId().trim().isEmpty()) {
            newTask.setId("TSK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        taskService.validateTaskInput(newTask.getTitle(), newTask.getPriority(), newTask.getDueDate());
        
        BaseTask saved = taskRepository.save(newTask);
        taskService.logActivity("TASK_CREATED", "Created task: " + saved.getTitle(), "User", "TASK_CREATED");
        
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // PUT /api/tasks/{id} - Update existing task
    @PutMapping("/{id}")
    public ResponseEntity<BaseTask> updateTask(@PathVariable String id, @RequestBody FeatureTask updatedTask) {
        BaseTask existing = taskService.getTaskById(id);
        
        existing.setTitle(updatedTask.getTitle());
        existing.setDescription(updatedTask.getDescription());
        existing.setStatus(updatedTask.getStatus());
        existing.setPriority(updatedTask.getPriority());
        existing.setAssignedMemberId(updatedTask.getAssignedMemberId());
        existing.setDueDate(updatedTask.getDueDate());

        BaseTask saved = taskRepository.save(existing);
        taskService.logActivity("TASK_UPDATED", "Updated task: " + saved.getTitle(), "User", "TASK_UPDATED");
        
        return ResponseEntity.ok(saved);
    }

    // DELETE /api/tasks/{id} - Delete task
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        BaseTask existing = taskService.getTaskById(id);
        taskRepository.delete(existing);
        taskService.logActivity("TASK_DELETED", "Deleted task ID: " + id, "User", "TASK_DELETED");
        return ResponseEntity.noContent().build();
    }

    // GET /api/tasks/export/csv - Download tasks CSV file
    @GetMapping("/export/csv")
    public ResponseEntity<Resource> exportCSV() throws IOException {
        List<BaseTask> tasks = taskRepository.findAll();
        File csvFile = fileExportService.exportTasksToCSV(tasks, "./exports/tasks_export.csv");

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=tasks_export.csv");
        headers.add(HttpHeaders.CONTENT_TYPE, "text/csv; charset=UTF-8");

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(csvFile.length())
                .body(new FileSystemResource(csvFile));
    }
}`
  },
  {
    name: 'MemberController.java',
    path: 'backend/src/main/java/com/college/taskmgmt/controller/MemberController.java',
    category: 'controller',
    conceptHighlights: ['REST API: Member Endpoints', 'CORS Enabled'],
    description: 'Controller for creating, listing, and managing team members.',
    code: `package com.college.taskmgmt.controller;

import com.college.taskmgmt.model.TeamMember;
import com.college.taskmgmt.repository.MemberRepository;
import com.college.taskmgmt.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "*")
public class MemberController {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TeamMember>> getAllMembers() {
        return ResponseEntity.ok(memberRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<TeamMember> addMember(@RequestBody TeamMember member) {
        if (member.getId() == null) {
            member.setId("m-" + UUID.randomUUID().toString().substring(0, 8));
        }
        TeamMember saved = memberRepository.save(member);
        taskService.logActivity("MEMBER_ADDED", "Added new member: " + saved.getName(), "User", "MEMBER_ADDED");
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable String id) {
        memberRepository.deleteById(id);
        taskService.logActivity("MEMBER_DELETED", "Deleted member ID: " + id, "User", "MEMBER_DELETED");
        return ResponseEntity.noContent().build();
    }
}`
  },
  {
    name: 'TeamTaskManagementApplication.java',
    path: 'backend/src/main/java/com/college/taskmgmt/TeamTaskManagementApplication.java',
    category: 'main',
    conceptHighlights: ['Spring Boot Main', '@EnableScheduling for Multithreading'],
    description: 'Spring Boot Main Application entry point with scheduling enabled.',
    code: `package com.college.taskmgmt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

// CONCEPT: Multithreading - @EnableScheduling activates Spring's background task executor
@SpringBootApplication
@EnableScheduling
public class TeamTaskManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(TeamTaskManagementApplication.java, args);
        System.out.println("=================================================");
        System.out.println("  TEAM TASK MANAGEMENT BACKEND STARTED (PORT 8080)");
        System.out.println("  Database: PostgreSQL @ localhost:5432/team_task_db");
        System.out.println("  Swagger / REST endpoints ready at /api/tasks");
        System.out.println("=================================================");
    }
}`
  }
];

export const REST_API_DOCS = [
  {
    method: 'GET',
    endpoint: '/api/tasks',
    description: 'Retrieve all tasks, optionally filtered with ?search=titleQuery',
    requestJson: 'None (Optional query param: ?search=string)',
    responseJson: `[
  {
    "id": "TSK-101",
    "title": "Design PostgreSQL schema",
    "status": "DONE",
    "priority": "HIGH",
    "taskType": "FEATURE",
    "assignedMemberId": "m-4",
    "dueDate": "2026-10-20"
  }
]`,
    statusCodes: '200 OK'
  },
  {
    method: 'POST',
    endpoint: '/api/tasks',
    description: 'Create a new task with title, priority, due date, and member assignment',
    requestJson: `{
  "title": "Fix navbar collapse on mobile",
  "description": "Ensure drawer toggles smoothly",
  "priority": "HIGH",
  "taskType": "BUG",
  "severity": "CRITICAL",
  "assignedMemberId": "m-2",
  "dueDate": "2026-11-05"
}`,
    responseJson: `{
  "id": "TSK-108",
  "title": "Fix navbar collapse on mobile",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2026-11-05"
}`,
    statusCodes: '201 CREATED, 400 BAD REQUEST'
  },
  {
    method: 'PUT',
    endpoint: '/api/tasks/{id}',
    description: 'Update status (TODO -> IN_PROGRESS -> DONE), assignee, or details',
    requestJson: `{
  "title": "Fix navbar collapse on mobile",
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "assignedMemberId": "m-2",
  "dueDate": "2026-11-05"
}`,
    responseJson: `{
  "id": "TSK-108",
  "status": "IN_PROGRESS",
  "updatedAt": "2026-10-26T10:35:00"
}`,
    statusCodes: '200 OK, 404 NOT FOUND'
  },
  {
    method: 'DELETE',
    endpoint: '/api/tasks/{id}',
    description: 'Delete a task by ID permanently from database',
    requestJson: 'None',
    responseJson: 'Empty Response',
    statusCodes: '204 NO CONTENT, 404 NOT FOUND'
  },
  {
    method: 'GET',
    endpoint: '/api/tasks/export/csv',
    description: 'Stream/download a generated CSV file of all tasks',
    requestJson: 'None',
    responseJson: 'File Download: tasks_export.csv (Content-Type: text/csv)',
    statusCodes: '200 OK'
  },
  {
    method: 'GET',
    endpoint: '/api/members',
    description: 'Retrieve list of all registered team members and team leads',
    requestJson: 'None',
    responseJson: `[
  {
    "id": "m-1",
    "name": "Aarav Sharma",
    "email": "aarav.sharma@collegeteam.edu",
    "role": "TEAM_LEAD",
    "department": "Full Stack"
  }
]`,
    statusCodes: '200 OK'
  },
  {
    method: 'POST',
    endpoint: '/api/members',
    description: 'Register a new team member with name, email, department, and role',
    requestJson: `{
  "name": "Kabir Mehta",
  "email": "kabir@collegeteam.edu",
  "department": "DevOps & Cloud",
  "role": "TEAM_MEMBER",
  "phone": "+91 98765 43219"
}`,
    responseJson: `{
  "id": "m-5",
  "name": "Kabir Mehta",
  "email": "kabir@collegeteam.edu",
  "createdAt": "2026-10-26T10:40:00"
}`,
    statusCodes: '201 CREATED'
  }
];

export const JAVA_CONCEPTS_MAPPING = [
  {
    concept: '1. Functions (Methods)',
    file: 'TaskService.java & Person.java',
    target: 'validateTaskInput(), getContactSummary(), getStatusDescription()',
    notes: 'Small reusable methods separating concerns like validation, score calculation, and text normalization.'
  },
  {
    concept: '2. Control Structures',
    file: 'TaskService.java & BaseTask.java',
    target: 'for-each loop in search, switch(status), while loop in report, if/else validations',
    notes: 'Real business branches: switch evaluates task columns; while loop iterates summary report; if/else checks overdue dates.'
  },
  {
    concept: '3. OOP Concepts',
    file: 'Person.java, TeamMember.java, BaseTask.java',
    target: 'Classes, Objects, Encapsulation (private fields + getters/setters), Abstraction',
    notes: 'Base classes Person & BaseTask are abstract; encapsulation protects internal state; polymorphism enables dynamic dispatch.'
  },
  {
    concept: '4. Inheritance',
    file: 'Person -> TeamMember / TeamLead, BaseTask -> BugTask / FeatureTask',
    target: 'extends keyword, super(), @Override getRoleTitle(), calculateUrgencyScore()',
    notes: 'Shows single inheritance and method overriding. BugTask overrides calculateUrgencyScore() to factor in severity.'
  },
  {
    concept: '5. Arrays, ArrayList, & Vector',
    file: 'TaskService.java',
    target: 'String[] ALLOWED_PRIORITIES, ArrayList<BaseTask>, Vector<ActivityLog>',
    notes: 'Fixed Array for static priorities; dynamic ArrayList for task collection; thread-safe synchronized Vector for shared activity log.'
  },
  {
    concept: '6. Strings',
    file: 'TaskService.java',
    target: 'trim(), toLowerCase(), contains(), equalsIgnoreCase(), StringBuilder',
    notes: 'Clean search algorithm using toLowerCase() + contains(); StringBuilder generates summary reports without memory overhead.'
  },
  {
    concept: '7. Exception Handling',
    file: 'TaskNotFoundException.java & GlobalExceptionHandler.java & FileExportService.java',
    target: 'try/catch/finally, try-with-resources, custom TaskNotFoundException, @ControllerAdvice',
    notes: 'Custom runtime exception caught centrally returning clean JSON; finally block guarantees writer.close() execution.'
  },
  {
    concept: '8. Multithreading',
    file: 'OverdueTaskScheduler.java & TeamTaskManagementApplication.java',
    target: '@EnableScheduling, @Scheduled(fixedRate = 60000), Thread safety commentary',
    notes: 'Autonomous background worker thread checks tasks every 60s and logs reminders without blocking HTTP client threads.'
  },
  {
    concept: '9. File Handling',
    file: 'FileExportService.java',
    target: 'FileWriter, BufferedWriter, BufferedReader, FileReader',
    notes: 'Generates CSV export files with formatted column lines; appends audit logs to .txt disk file and reads back.'
  },
  {
    concept: '10. Database Connection',
    file: 'application.properties, TaskRepository.java & RawJdbcService.java',
    target: 'Spring Data JPA ORM + plain JDBC (DriverManager, PreparedStatement, ResultSet)',
    notes: 'Spring Data JPA handles day-to-day CRUD; RawJdbcService demonstrates low-level SQL connectivity.'
  },
  {
    concept: '11. REST API & JSON',
    file: 'TaskController.java & MemberController.java',
    target: '@RestController, @GetMapping, @PostMapping, @PutMapping, @DeleteMapping, @CrossOrigin',
    notes: 'Clean JSON serialization, appropriate HTTP status codes (200, 201, 204, 400, 404), and CORS configured.'
  }
];

export const STEP_BY_STEP_RUN_GUIDE = `
# STEP-BY-STEP LOCAL EXECUTION GUIDE
--------------------------------------------------------------------------------

### PREREQUISITES
1. Java Development Kit (JDK 17 or higher)
2. Apache Maven (or use embedded ./mvnw)
3. PostgreSQL 14+ running locally on port 5432
4. Node.js 18+ and npm

--------------------------------------------------------------------------------
### STEP 1: SET UP THE POSTGRESQL DATABASE
1. Open pgAdmin or your terminal with psql:
   psql -U postgres
2. Create the project database:
   CREATE DATABASE team_task_db;
3. Connect to the database:
   \\c team_task_db
4. Run the schema.sql script provided in the "PostgreSQL Schema" tab to create tables:
   members, tasks, activity_logs, along with sample seed rows.
5. Verify tables:
   \\dt

--------------------------------------------------------------------------------
### STEP 2: CONFIGURE & RUN THE JAVA SPRING BOOT BACKEND
1. Open the backend folder:
   cd backend
2. Verify 'src/main/resources/application.properties':
   spring.datasource.url=jdbc:postgresql://localhost:5432/team_task_db
   spring.datasource.username=postgres
   spring.datasource.password=your_actual_postgres_password
3. Build the project using Maven:
   mvn clean install
4. Run the Spring Boot application:
   mvn spring-boot:run
5. Verify backend is running by opening:
   http://localhost:8080/api/tasks
   You should receive the JSON array of seeded tasks!

--------------------------------------------------------------------------------
### STEP 3: RUN THE REACT FRONTEND
1. Open the frontend folder:
   cd frontend
2. Install dependencies:
   npm install
3. Start the Vite development server:
   npm run dev
4. Open your browser at:
   http://localhost:3000 (or http://localhost:5173)
5. You can now drag tasks, add members, export CSV, and manage your team!
`;

export const GIT_GITHUB_WORKFLOW = {
  commands: [
    '# 1. Initialize a new Git repository',
    'git init',
    '',
    '# 2. Create and switch to a feature branch',
    'git checkout -b feature/initial-team-task-setup',
    '',
    '# 3. Add all project files',
    'git add .',
    '',
    '# 4. Create your first semantic commit',
    'git commit -m "feat: complete team task management prototype with Spring Boot backend, PostgreSQL schema, and React frontend"',
    '',
    '# 5. Link to your GitHub repository (replace with your repo URL)',
    'git remote add origin https://github.com/your-username/team-task-management.git',
    '',
    '# 6. Push branch to GitHub',
    'git branch -M main',
    'git push -u origin main'
  ],
  commitPlan: [
    { step: 'Commit 1', msg: 'build: initialize project structure with Maven pom.xml and Vite React setup' },
    { step: 'Commit 2', msg: 'feat(db): add PostgreSQL schema DDL with members, tasks, and activity_logs tables' },
    { step: 'Commit 3', msg: 'feat(models): implement OOP hierarchy Person -> TeamMember and BaseTask -> BugTask, FeatureTask' },
    { step: 'Commit 4', msg: 'feat(services): implement TaskService with Array, ArrayList, Vector and String algorithms' },
    { step: 'Commit 5', msg: 'feat(io): implement FileExportService for CSV export and buffered text logging' },
    { step: 'Commit 6', msg: 'feat(concurrency): add OverdueTaskScheduler background thread for periodic alerts' },
    { step: 'Commit 7', msg: 'feat(controllers): expose REST APIs with CORS and GlobalExceptionHandler' },
    { step: 'Commit 8', msg: 'feat(ui): build React Kanban board, team member cards, and CSV download UI' },
    { step: 'Commit 9', msg: 'docs: add complete project guide, architecture diagram, and Postman tests' }
  ],
  gitignore: `# Compiled class files
*.class
target/
.mvn/
mvnw
mvnw.cmd

# Log files
*.log
logs/

# CSV exports
exports/

# Node / Frontend
node_modules/
dist/
.env.local

# IDE configurations
.idea/
*.iml
.vscode/
.DS_Store`
};

export const POSTMAN_TESTS = [
  {
    name: '1. Retrieve All Tasks',
    method: 'GET',
    url: 'http://localhost:8080/api/tasks',
    curl: 'curl -X GET http://localhost:8080/api/tasks -H "Accept: application/json"'
  },
  {
    name: '2. Search Tasks by Title',
    method: 'GET',
    url: 'http://localhost:8080/api/tasks?search=PostgreSQL',
    curl: 'curl -X GET "http://localhost:8080/api/tasks?search=PostgreSQL" -H "Accept: application/json"'
  },
  {
    name: '3. Create New Feature Task',
    method: 'POST',
    url: 'http://localhost:8080/api/tasks',
    curl: `curl -X POST http://localhost:8080/api/tasks \\
  -H "Content-Type: application/json" \\
  -d '{"title": "Implement JWT Auth Filter", "description": "Add stateless token validation", "priority": "HIGH", "taskType": "FEATURE", "assignedMemberId": "m-1", "dueDate": "2026-11-10", "storyPoints": 5, "estimatedHours": 8}'`
  },
  {
    name: '4. Update Task Status to DONE',
    method: 'PUT',
    url: 'http://localhost:8080/api/tasks/TSK-103',
    curl: `curl -X PUT http://localhost:8080/api/tasks/TSK-103 \\
  -H "Content-Type: application/json" \\
  -d '{"title": "Fix null pointer exception during task assignment", "status": "DONE", "priority": "HIGH", "assignedMemberId": "m-1", "dueDate": "2026-10-28"}'`
  },
  {
    name: '5. Export Tasks to CSV',
    method: 'GET',
    url: 'http://localhost:8080/api/tasks/export/csv',
    curl: 'curl -X GET http://localhost:8080/api/tasks/export/csv -o downloaded_tasks.csv'
  }
];

export const VIVA_QUESTIONS = [
  {
    question: 'Q1: Why did you use Vector instead of ArrayList for the Activity Log?',
    answer: 'Vector is synchronized (thread-safe). In our application, multiple HTTP threads handle incoming REST requests while a background worker thread (OverdueTaskScheduler) runs concurrently. Vector prevents concurrent modification exceptions and data race conditions without requiring external synchronized blocks.'
  },
  {
    question: 'Q2: How does your project demonstrate Polymorphism and Method Overriding?',
    answer: 'We created an abstract class BaseTask with subclasses BugTask and FeatureTask. Both subclasses override the calculateUrgencyScore() method. For BugTask, the score is calculated based on bug severity (CRITICAL, MAJOR, MINOR). For FeatureTask, it is calculated based on story points and estimated development hours.'
  },
  {
    question: 'Q3: What is the difference between Spring Data JPA and raw JDBC in your project?',
    answer: 'Spring Data JPA (Hibernate) maps Java domain objects directly to PostgreSQL relational tables automatically via annotations like @Entity and @Id, reducing boilerplate code. Raw JDBC (in RawJdbcService) uses low-level DriverManager, PreparedStatement, and ResultSet to execute SQL directly against the socket connection.'
  },
  {
    question: 'Q4: How does the GlobalExceptionHandler improve code quality?',
    answer: 'Instead of scattering repetitive try/catch blocks across every controller method, @ControllerAdvice intercepts custom runtime exceptions (such as TaskNotFoundException) centrally and standardizes error responses into clean JSON with HTTP status codes (e.g., 404 NOT FOUND or 400 BAD REQUEST).'
  },
  {
    question: 'Q5: What are 3 future improvements you would add to this project?',
    answer: '1) Spring Security with JWT authentication and role-based permissions (allowing only Team Leads to delete tasks). 2) Real-time WebSockets (STOMP) so moving a Kanban card instantly moves it on team members screens. 3) Drag-and-drop file attachments saved to an S3 bucket or local volume.'
  }
];
