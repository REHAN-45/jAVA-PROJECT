import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ListTodo, 
  TrendingUp, 
  AlertTriangle, 
  FileDown, 
  Plus, 
  Users, 
  ArrowRight,
  ShieldCheck,
  Bug,
  Sparkles
} from 'lucide-react';
import { Task, TeamMember, ActivityLogEntry, TaskStatus } from '../types';
import { TaskCard } from '../components/TaskCard';
import { downloadTasksAsCSV, downloadActivityLogAsText } from '../utils/fileExport';

interface DashboardViewProps {
  tasks: Task[];
  members: TeamMember[];
  activities: ActivityLogEntry[];
  onOpenNewTaskModal: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
  onNavigateTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  tasks,
  members,
  activities,
  onOpenNewTaskModal,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onNavigateTab
}) => {
  const totalTasks = tasks.length;
  const todoTasks = tasks.filter(t => t.status === 'TODO').length;
  const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS').length;
  const doneTasks = tasks.filter(t => t.status === 'DONE').length;

  const completionPercentage = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  // Check overdue tasks (Background Thread simulation)
  const today = new Date().setHours(0, 0, 0, 0);
  const overdueTasks = tasks.filter(t => t.status !== 'DONE' && new Date(t.dueDate).getTime() < today);

  // Priority counts
  const highPriorityCount = tasks.filter(t => t.priority === 'HIGH' && t.status !== 'DONE').length;
  const bugCount = tasks.filter(t => t.taskType === 'BUG' && t.status !== 'DONE').length;

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Project Dashboard</h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Live Prototype
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tracking team deliverables, member workload, and Java Spring Boot service status.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => downloadTasksAsCSV(tasks)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            <FileDown className="w-3.5 h-3.5 text-slate-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenNewTaskModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* 4 Core Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Tasks */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Tasks</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalTasks}</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Across all sprint cycles</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
            <ListTodo className="w-5 h-5" />
          </div>
        </div>

        {/* To Do */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">To Do</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{todoTasks}</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Awaiting developer pickup</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">In Progress</p>
            <h3 className="text-2xl font-bold text-blue-700 mt-1">{inProgressTasks}</h3>
            <p className="text-[11px] text-blue-500 mt-0.5">Actively being resolved</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Done & Completion Rate */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Done</p>
            <h3 className="text-2xl font-bold text-emerald-700 mt-1">{doneTasks}</h3>
            <p className="text-[11px] text-emerald-600 mt-0.5 font-medium">{completionPercentage}% completed</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Overdue Alert Banner (Multithreading Feature) */}
      {overdueTasks.length > 0 && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center text-white shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-rose-900">
                {overdueTasks.length} Overdue Task(s) Detected by Background Scheduler Thread
              </h4>
              <p className="text-[11px] text-rose-700">
                Tasks due before today require immediate team attention.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('kanban')}
            className="inline-flex items-center gap-1 text-xs font-bold text-rose-800 hover:text-rose-900 bg-rose-100 hover:bg-rose-200 px-3 py-1.5 rounded-lg transition-colors shrink-0"
          >
            <span>Review on Kanban Board</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Quick Action Stream & High Priority Tasks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Tasks Highlight */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Active Tasks In Progress & Urgent</h3>
                <p className="text-xs text-slate-500">Fast action panel for daily standup</p>
              </div>
              <button
                onClick={() => onNavigateTab('kanban')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
              >
                <span>Full Board</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tasks.filter(t => t.status !== 'DONE').slice(0, 4).map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                  onStatusChange={onStatusChange}
                />
              ))}
            </div>
          </div>

          {/* Quick OOP & Data Structures Reference */}
          <div className="bg-gradient-to-br from-indigo-50/60 to-white p-5 rounded-2xl border border-indigo-100 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wide">
                  College Project Requirements Checked
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('docs')}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                View 12 Documentation Sections
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[11px]">
              <div className="p-2 rounded-lg bg-white border border-indigo-100">
                <span className="font-bold text-indigo-700 block">OOP Inheritance:</span>
                <span className="text-slate-600">Person &rarr; Member, BaseTask &rarr; Bug/Feature</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-indigo-100">
                <span className="font-bold text-indigo-700 block">Collections Used:</span>
                <span className="text-slate-600">Array (Priorities), ArrayList (Tasks), Vector (Logs)</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-indigo-100">
                <span className="font-bold text-indigo-700 block">File Handling:</span>
                <span className="text-slate-600">CSV writer + buffered audit log output</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Team Workload & Recent Activity */}
        <div className="space-y-6">
          {/* Team Workload */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Team Workload</h3>
              <button
                onClick={() => onNavigateTab('members')}
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                Manage ({members.length})
              </button>
            </div>

            <div className="space-y-3">
              {members.map(member => {
                const memberTasks = tasks.filter(t => t.assignedMemberId === member.id && t.status !== 'DONE');
                const completedTasks = tasks.filter(t => t.assignedMemberId === member.id && t.status === 'DONE');
                const total = memberTasks.length + completedTasks.length;
                const percent = total > 0 ? Math.round((completedTasks.length / total) * 100) : 0;

                return (
                  <div key={member.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <img 
                          src={member.avatarUrl} 
                          alt={member.name} 
                          className="w-6 h-6 rounded-full object-cover border border-slate-200" 
                        />
                        <div>
                          <span className="font-bold text-slate-800">{member.name}</span>
                          <span className="block text-[10px] text-slate-400">
                            {member.role === 'TEAM_LEAD' ? 'Team Lead' : 'Engineer'}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-slate-600">
                        {memberTasks.length} active
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-600 h-full rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity Log Feed (Vector demonstration) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-900">Activity Log</h3>
              </div>
              <button
                onClick={() => onNavigateTab('activity')}
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {activities.slice(0, 4).map(act => (
                <div key={act.id} className="text-xs border-l-2 border-indigo-200 pl-3 py-0.5 space-y-0.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-indigo-600">{act.action}</span>
                    <span>{act.timestamp.slice(11, 16)}</span>
                  </div>
                  <p className="text-slate-700 font-medium text-[11px] line-clamp-2">
                    {act.details}
                  </p>
                  <p className="text-[10px] text-slate-400">by {act.performedBy}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
