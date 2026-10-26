import { TeamMember, Task, ActivityLogEntry } from '../types';

export const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: 'm-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@collegeteam.edu',
    role: 'TEAM_LEAD',
    department: 'Full Stack & Architecture',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98765 43210',
    createdAt: '2026-10-01'
  },
  {
    id: 'm-2',
    name: 'Diya Patel',
    email: 'diya.patel@collegeteam.edu',
    role: 'TEAM_MEMBER',
    department: 'Frontend & UI Engineering',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98765 43211',
    createdAt: '2026-10-02'
  },
  {
    id: 'm-3',
    name: 'Rohan Verma',
    email: 'rohan.verma@collegeteam.edu',
    role: 'TEAM_MEMBER',
    department: 'Backend & Spring Boot Services',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98765 43212',
    createdAt: '2026-10-03'
  },
  {
    id: 'm-4',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@collegeteam.edu',
    role: 'TEAM_MEMBER',
    department: 'Quality Assurance & Database',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98765 43213',
    createdAt: '2026-10-05'
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'TSK-101',
    title: 'Design PostgreSQL relational schema & migrations',
    description: 'Set up tables for members, tasks, and activity_logs with appropriate foreign keys and constraints.',
    status: 'DONE',
    priority: 'HIGH',
    taskType: 'FEATURE',
    assignedMemberId: 'm-4',
    assignedMemberName: 'Ananya Iyer',
    dueDate: '2026-10-20',
    createdAt: '2026-10-10',
    storyPoints: 5,
    estimatedHours: 12
  },
  {
    id: 'TSK-102',
    title: 'Implement Spring Boot REST Controllers with CORS',
    description: 'Build MemberController and TaskController supporting GET, POST, PUT, DELETE with ResponseEntity.',
    status: 'DONE',
    priority: 'HIGH',
    taskType: 'FEATURE',
    assignedMemberId: 'm-3',
    assignedMemberName: 'Rohan Verma',
    dueDate: '2026-10-22',
    createdAt: '2026-10-12',
    storyPoints: 8,
    estimatedHours: 16
  },
  {
    id: 'TSK-103',
    title: 'Fix null pointer exception during task assignment',
    description: 'When assigning a task to an unselected member, TaskService should throw custom TaskNotFoundException.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    taskType: 'BUG',
    assignedMemberId: 'm-1',
    assignedMemberName: 'Aarav Sharma',
    dueDate: '2026-10-28',
    createdAt: '2026-10-24',
    severity: 'CRITICAL'
  },
  {
    id: 'TSK-104',
    title: 'Build React Kanban Board with interactive drag columns',
    description: 'Create responsive 3-column board (To Do, In Progress, Done) with quick status dropdown and priority color badges.',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    taskType: 'FEATURE',
    assignedMemberId: 'm-2',
    assignedMemberName: 'Diya Patel',
    dueDate: '2026-10-29',
    createdAt: '2026-10-24',
    storyPoints: 5,
    estimatedHours: 10
  },
  {
    id: 'TSK-105',
    title: 'Implement File Handling CSV & TXT log exporter',
    description: 'Write tasks to CSV file with headers and append activity logs using Java FileWriter and BufferedWriter.',
    status: 'TODO',
    priority: 'MEDIUM',
    taskType: 'FEATURE',
    assignedMemberId: 'm-3',
    assignedMemberName: 'Rohan Verma',
    dueDate: '2026-11-02',
    createdAt: '2026-10-25',
    storyPoints: 3,
    estimatedHours: 6
  },
  {
    id: 'TSK-106',
    title: 'Resolve timezone offset bug in task deadline display',
    description: 'Dates were shifting by -1 day in IST due to UTC serialization; parse with LocalDate format.',
    status: 'TODO',
    priority: 'LOW',
    taskType: 'BUG',
    assignedMemberId: 'm-4',
    assignedMemberName: 'Ananya Iyer',
    dueDate: '2026-11-05',
    createdAt: '2026-10-25',
    severity: 'MINOR'
  },
  {
    id: 'TSK-107',
    title: 'Multithreading: Overdue task reminder background thread',
    description: 'Set up @Scheduled cron / background Thread to inspect pending tasks past due date and log warnings.',
    status: 'TODO',
    priority: 'HIGH',
    taskType: 'FEATURE',
    assignedMemberId: 'm-1',
    assignedMemberName: 'Aarav Sharma',
    dueDate: '2026-11-01',
    createdAt: '2026-10-26',
    storyPoints: 5,
    estimatedHours: 8
  }
];

export const INITIAL_ACTIVITIES: ActivityLogEntry[] = [
  {
    id: 'act-1',
    timestamp: '2026-10-26 09:15:00',
    action: 'SYSTEM_BOOT',
    details: 'PostgreSQL database connected & Spring Boot initialized successfully.',
    performedBy: 'System',
    type: 'BACKGROUND_CHECK'
  },
  {
    id: 'act-2',
    timestamp: '2026-10-26 09:30:12',
    action: 'TASK_STATUS_CHANGED',
    details: 'Task "Design PostgreSQL relational schema" marked as DONE.',
    performedBy: 'Ananya Iyer',
    type: 'TASK_UPDATED'
  },
  {
    id: 'act-3',
    timestamp: '2026-10-26 10:05:44',
    action: 'TASK_ASSIGNED',
    details: 'Assigned "Fix null pointer exception during task assignment" to Aarav Sharma.',
    performedBy: 'Aarav Sharma',
    type: 'TASK_UPDATED'
  },
  {
    id: 'act-4',
    timestamp: '2026-10-26 10:20:00',
    action: 'BACKGROUND_SCHEDULER',
    details: 'Overdue task scan thread completed. 0 overdue tasks detected.',
    performedBy: 'Thread-OverdueMonitor',
    type: 'BACKGROUND_CHECK'
  }
];
