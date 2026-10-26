import React, { useState } from 'react';
import { 
  Plus, 
  FileDown, 
  Filter, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Search,
  Sparkles,
  Bug
} from 'lucide-react';
import { Task, TeamMember, TaskStatus, TaskPriority, TaskType } from '../types';
import { TaskCard } from '../components/TaskCard';
import { downloadTasksAsCSV } from '../utils/fileExport';

interface KanbanViewProps {
  tasks: Task[];
  members: TeamMember[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenNewTaskModal: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
}

export const KanbanView: React.FC<KanbanViewProps> = ({
  tasks,
  members,
  searchQuery,
  onSearchChange,
  onOpenNewTaskModal,
  onEditTask,
  onDeleteTask,
  onStatusChange
}) => {
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');
  const [selectedMember, setSelectedMember] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');

  // Filter tasks (Demonstrating Java TaskService filtering logic)
  const filteredTasks = tasks.filter(task => {
    // 1. Search Query filter (Java String: toLowerCase + contains)
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchDesc = task.description?.toLowerCase().includes(q) || false;
      if (!matchTitle && !matchDesc) return false;
    }

    // 2. Priority filter
    if (selectedPriority !== 'ALL' && task.priority !== selectedPriority) {
      return false;
    }

    // 3. Member filter
    if (selectedMember !== 'ALL' && task.assignedMemberId !== selectedMember) {
      return false;
    }

    // 4. Type filter (BugTask vs FeatureTask)
    if (selectedType !== 'ALL' && task.taskType !== selectedType) {
      return false;
    }

    return true;
  });

  const columns: { id: TaskStatus; title: string; icon: any; color: string; bg: string; count: number }[] = [
    {
      id: 'TODO',
      title: 'To Do',
      icon: Clock,
      color: 'text-slate-700',
      bg: 'bg-slate-100/80',
      count: filteredTasks.filter(t => t.status === 'TODO').length
    },
    {
      id: 'IN_PROGRESS',
      title: 'In Progress',
      icon: TrendingUp,
      color: 'text-blue-700',
      bg: 'bg-blue-50/70',
      count: filteredTasks.filter(t => t.status === 'IN_PROGRESS').length
    },
    {
      id: 'DONE',
      title: 'Done',
      icon: CheckCircle2,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50/70',
      count: filteredTasks.filter(t => t.status === 'DONE').length
    }
  ];

  const hasActiveFilters = selectedPriority !== 'ALL' || selectedMember !== 'ALL' || selectedType !== 'ALL' || searchQuery.trim() !== '';

  const resetFilters = () => {
    setSelectedPriority('ALL');
    setSelectedMember('ALL');
    setSelectedType('ALL');
    onSearchChange('');
  };

  return (
    <div className="space-y-4">
      {/* Top Filter and Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Kanban Board</h2>
            <p className="text-xs text-slate-500">
              Interactive 3-stage board with priority indicators & polymorphism tags
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => downloadTasksAsCSV(filteredTasks)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Export CSV ({filteredTasks.length})</span>
            </button>

            <button
              onClick={onOpenNewTaskModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Task</span>
            </button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">Filters:</span>
          </div>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-hidden focus:border-indigo-400"
          >
            <option value="ALL">All Priorities</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>

          {/* Member Filter */}
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-hidden focus:border-indigo-400"
          >
            <option value="ALL">All Team Members</option>
            {members.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>

          {/* Task Type Filter (OOP Inheritance) */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-hidden focus:border-indigo-400"
          >
            <option value="ALL">All Task Types</option>
            <option value="FEATURE">Feature Tasks only</option>
            <option value="BUG">Bug Tasks only</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-semibold px-2 py-1 rounded hover:bg-indigo-50"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear filters</span>
            </button>
          )}

          <div className="ml-auto text-xs text-slate-400">
            Showing <strong className="text-slate-700">{filteredTasks.length}</strong> of {tasks.length} tasks
          </div>
        </div>
      </div>

      {/* 3 Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {columns.map(column => {
          const colTasks = filteredTasks.filter(t => t.status === column.id);
          const Icon = column.icon;

          return (
            <div 
              key={column.id}
              className="bg-slate-100/70 rounded-2xl p-4 border border-slate-200/80 flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg ${column.bg} flex items-center justify-center ${column.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">{column.title}</h3>
                </div>

                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white text-slate-600 border border-slate-200">
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks List Container */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
                {colTasks.length === 0 ? (
                  <div className="h-44 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-4">
                    <p className="text-xs font-medium text-slate-400">
                      No tasks in {column.title}
                    </p>
                    {column.id === 'TODO' && (
                      <button
                        onClick={onOpenNewTaskModal}
                        className="mt-2 text-xs font-semibold text-indigo-600 hover:underline"
                      >
                        + Add a task
                      </button>
                    )}
                  </div>
                ) : (
                  colTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={onEditTask}
                      onDelete={onDeleteTask}
                      onStatusChange={onStatusChange}
                    />
                  ))
                )}
              </div>

              {/* Quick Add at column bottom */}
              {column.id === 'TODO' && (
                <button
                  onClick={onOpenNewTaskModal}
                  className="mt-3 w-full py-2 border border-dashed border-slate-300 hover:border-indigo-400 hover:bg-white rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Task</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
