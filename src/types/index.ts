export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type TaskType = 'BUG' | 'FEATURE';
export type MemberRole = 'TEAM_LEAD' | 'TEAM_MEMBER';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  department: string;
  avatarUrl: string;
  phone?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  taskType: TaskType;
  assignedMemberId: string | null;
  assignedMemberName?: string;
  dueDate: string; // YYYY-MM-DD
  createdAt: string;
  
  // Specific to BugTask (Inheritance concept)
  severity?: 'CRITICAL' | 'MAJOR' | 'MINOR';
  // Specific to FeatureTask (Inheritance concept)
  storyPoints?: number;
  estimatedHours?: number;
}

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  performedBy: string;
  type: 'TASK_CREATED' | 'TASK_UPDATED' | 'TASK_DELETED' | 'MEMBER_ADDED' | 'MEMBER_UPDATED' | 'MEMBER_DELETED' | 'BACKGROUND_CHECK';
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
