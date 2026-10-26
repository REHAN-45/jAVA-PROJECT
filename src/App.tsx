import React, { useState, useEffect } from 'react';
import { 
  INITIAL_MEMBERS, 
  INITIAL_TASKS, 
  INITIAL_ACTIVITIES 
} from './data/mockData';
import { Task, TeamMember, ActivityLogEntry, ToastMessage, TaskStatus } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { TaskModal } from './components/TaskModal';
import { ToastContainer } from './components/Toast';
import { DashboardView } from './pages/DashboardView';
import { KanbanView } from './pages/KanbanView';
import { TaskListView } from './pages/TaskListView';
import { TeamView } from './pages/TeamView';
import { ActivityLogView } from './pages/ActivityLogView';
import { DocumentationView } from './pages/DocumentationView';
import { ApiPlaygroundView } from './pages/ApiPlaygroundView';

export default function App() {
  // Navigation & UI state
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Notification toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent data state
  const [members, setMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('ttm_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('ttm_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [activities, setActivities] = useState<ActivityLogEntry[]>(() => {
    const saved = localStorage.getItem('ttm_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('ttm_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('ttm_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('ttm_activities', JSON.stringify(activities));
  }, [activities]);

  // Toast helper
  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Activity logger helper (Simulating Java Vector synchronized append)
  const logActivity = (
    action: string, 
    details: string, 
    performedBy: string = 'User', 
    type: ActivityLogEntry['type'] = 'TASK_UPDATED'
  ) => {
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').slice(0, 19);
    const newEntry: ActivityLogEntry = {
      id: 'act-' + Date.now(),
      timestamp,
      action,
      details,
      performedBy,
      type
    };
    setActivities(prev => [newEntry, ...prev]);
  };

  // Overdue count calculation
  const today = new Date().setHours(0, 0, 0, 0);
  const overdueCount = tasks.filter(t => t.status !== 'DONE' && new Date(t.dueDate).getTime() < today).length;

  // Task Handlers
  const handleOpenNewTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      // Update existing task
      setTasks(prev => prev.map(t => {
        if (t.id === editingTask.id) {
          return { ...t, ...taskData } as Task;
        }
        return t;
      }));
      logActivity(
        'TASK_UPDATED',
        `Updated task "${taskData.title}" (Status: ${taskData.status}, Priority: ${taskData.priority})`,
        'User',
        'TASK_UPDATED'
      );
      addToast(`Task "${taskData.title}" updated successfully!`);
    } else {
      // Create new task
      const newId = `TSK-${Math.floor(100 + Math.random() * 900)}`;
      const newTask: Task = {
        id: newId,
        title: taskData.title || 'Untitled Task',
        description: taskData.description || '',
        status: taskData.status || 'TODO',
        priority: taskData.priority || 'MEDIUM',
        taskType: taskData.taskType || 'FEATURE',
        assignedMemberId: taskData.assignedMemberId || null,
        assignedMemberName: taskData.assignedMemberName || 'Unassigned',
        dueDate: taskData.dueDate || new Date().toISOString().slice(0, 10),
        createdAt: new Date().toISOString().slice(0, 10),
        severity: taskData.severity,
        storyPoints: taskData.storyPoints,
        estimatedHours: taskData.estimatedHours
      };
      setTasks(prev => [newTask, ...prev]);
      logActivity(
        'TASK_CREATED',
        `Created new ${newTask.taskType} task "${newTask.title}" [${newTask.id}]`,
        'User',
        'TASK_CREATED'
      );
      addToast(`Task [${newId}] created successfully!`);
    }
  };

  const handleDeleteTask = (id: string) => {
    const taskToDelete = tasks.find(t => t.id === id);
    setTasks(prev => prev.filter(t => t.id !== id));
    logActivity(
      'TASK_DELETED',
      `Deleted task "${taskToDelete?.title || id}" [${id}]`,
      'User',
      'TASK_DELETED'
    );
    addToast(`Task ${id} deleted`, 'info');
  };

  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        logActivity(
          'TASK_STATUS_CHANGED',
          `Moved task "${t.title}" from ${t.status} to ${newStatus}`,
          'User',
          'TASK_UPDATED'
        );
        return { ...t, status: newStatus };
      }
      return t;
    }));
    addToast(`Status updated to ${newStatus.replace('_', ' ')}`);
  };

  // Member Handlers
  const handleAddMember = (memberData: Partial<TeamMember>) => {
    const newId = `m-${members.length + 1}`;
    const newMember: TeamMember = {
      id: newId,
      name: memberData.name || 'New Member',
      email: memberData.email || '',
      role: memberData.role || 'TEAM_MEMBER',
      department: memberData.department || 'Engineering',
      avatarUrl: memberData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      phone: memberData.phone,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    setMembers(prev => [...prev, newMember]);
    logActivity('MEMBER_ADDED', `Added new team member ${newMember.name} (${newMember.role})`, 'User', 'MEMBER_ADDED');
    addToast(`Member "${newMember.name}" added successfully!`);
  };

  const handleUpdateMember = (memberData: Partial<TeamMember>) => {
    if (!memberData.id) return;
    setMembers(prev => prev.map(m => {
      if (m.id === memberData.id) {
        return { ...m, ...memberData } as TeamMember;
      }
      return m;
    }));
    // Also update assigned name in tasks if name changed
    if (memberData.name) {
      setTasks(prev => prev.map(t => {
        if (t.assignedMemberId === memberData.id) {
          return { ...t, assignedMemberName: memberData.name };
        }
        return t;
      }));
    }
    logActivity('MEMBER_UPDATED', `Updated details for ${memberData.name}`, 'User', 'MEMBER_UPDATED');
    addToast(`Member "${memberData.name}" updated!`);
  };

  const handleDeleteMember = (id: string) => {
    const member = members.find(m => m.id === id);
    setMembers(prev => prev.filter(m => m.id !== id));
    // Unassign tasks assigned to this member
    setTasks(prev => prev.map(t => {
      if (t.assignedMemberId === id) {
        return { ...t, assignedMemberId: null, assignedMemberName: 'Unassigned' };
      }
      return t;
    }));
    logActivity('MEMBER_DELETED', `Deleted team member ${member?.name || id}`, 'User', 'MEMBER_DELETED');
    addToast(`Member ${member?.name || id} removed and tasks unassigned`, 'info');
  };

  // Reset Demo Data
  const handleResetData = () => {
    if (window.confirm('Reset all tasks, members, and activity logs back to the default initial college project state?')) {
      setMembers(INITIAL_MEMBERS);
      setTasks(INITIAL_TASKS);
      setActivities(INITIAL_ACTIVITIES);
      localStorage.clear();
      addToast('Demo data reset to initial college project state!', 'info');
    }
  };

  // Multithreading background scheduler simulator
  const handleTriggerSchedulerScan = () => {
    const overdue = tasks.filter(t => t.status !== 'DONE' && new Date(t.dueDate).getTime() < today);
    if (overdue.length > 0) {
      logActivity(
        'BACKGROUND_SCHEDULER',
        `Thread-OverdueMonitor: Alert! ${overdue.length} task(s) are past their due date (${overdue.map(o => o.id).join(', ')}).`,
        'Thread-OverdueMonitor',
        'BACKGROUND_CHECK'
      );
      addToast(`Scheduler thread detected ${overdue.length} overdue task(s)!`, 'error');
    } else {
      logActivity(
        'BACKGROUND_SCHEDULER',
        'Thread-OverdueMonitor: Periodic scan complete. All pending tasks are within deadline.',
        'Thread-OverdueMonitor',
        'BACKGROUND_CHECK'
      );
      addToast('Background thread scan complete: 0 overdue tasks.', 'success');
    }
  };

  const taskCounts = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'TODO').length,
    inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
    done: tasks.filter(t => t.status === 'DONE').length
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenNewTaskModal={handleOpenNewTask}
        onResetData={handleResetData}
        overdueCount={overdueCount}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        onSelectTab={setActiveTab}
      />

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          taskCounts={taskCounts}
          memberCount={members.length}
        />

        {/* Dynamic Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              tasks={tasks}
              members={members}
              activities={activities}
              onOpenNewTaskModal={handleOpenNewTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onStatusChange={handleStatusChange}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'kanban' && (
            <KanbanView
              tasks={tasks}
              members={members}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onOpenNewTaskModal={handleOpenNewTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          )}

          {activeTab === 'tasks' && (
            <TaskListView
              tasks={tasks}
              members={members}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onOpenNewTaskModal={handleOpenNewTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          )}

          {activeTab === 'members' && (
            <TeamView
              members={members}
              tasks={tasks}
              onAddMember={handleAddMember}
              onUpdateMember={handleUpdateMember}
              onDeleteMember={handleDeleteMember}
            />
          )}

          {activeTab === 'activity' && (
            <ActivityLogView
              activities={activities}
              onTriggerSchedulerScan={handleTriggerSchedulerScan}
              onClearLogs={() => setActivities([])}
            />
          )}

          {activeTab === 'docs' && (
            <DocumentationView />
          )}

          {activeTab === 'api' && (
            <ApiPlaygroundView
              tasks={tasks}
              members={members}
            />
          )}
        </main>
      </div>

      {/* Add / Edit Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        initialTask={editingTask}
        members={members}
      />

      {/* Floating Toast Alerts */}
      <ToastContainer
        toasts={toasts}
        onDismiss={removeToast}
      />
    </div>
  );
}
