import React, { useState } from 'react';
import { 
  FileDown, 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Bug, 
  Sparkles, 
  Pencil, 
  Trash2,
  ArrowUpDown,
  User
} from 'lucide-react';
import { Task, TeamMember, TaskStatus, TaskPriority, TaskType } from '../types';
import { downloadTasksAsCSV, downloadTasksAsText } from '../utils/fileExport';

interface TaskListViewProps {
  tasks: Task[];
  members: TeamMember[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenNewTaskModal: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
}

export const TaskListView: React.FC<TaskListViewProps> = ({
  tasks,
  members,
  searchQuery,
  onSearchChange,
  onOpenNewTaskModal,
  onEditTask,
  onDeleteTask,
  onStatusChange
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'title'>('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter tasks using Java String method equivalents
  const filteredTasks = tasks.filter(task => {
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const match = task.title.toLowerCase().includes(q) || (task.description && task.description.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (selectedStatus !== 'ALL' && task.status !== selectedStatus) return false;
    if (selectedPriority !== 'ALL' && task.priority !== selectedPriority) return false;
    return true;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'dueDate') {
      comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortBy === 'title') {
      comparison = a.title.localeCompare(b.title);
    } else if (sortBy === 'priority') {
      const weight = { HIGH: 3, MEDIUM: 2, LOW: 1 };
      comparison = weight[b.priority] - weight[a.priority];
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const toggleSort = (field: 'dueDate' | 'priority' | 'title') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const priorityBadge = {
    HIGH: 'bg-rose-50 text-rose-700 border-rose-200',
    MEDIUM: 'bg-amber-50 text-amber-700 border-amber-200',
    LOW: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  };

  const statusBadge = {
    TODO: 'bg-slate-100 text-slate-700 border-slate-200',
    IN_PROGRESS: 'bg-blue-50 text-blue-700 border-blue-200',
    DONE: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  };

  return (
    <div className="space-y-4">
      {/* Control Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Task Management Table</h2>
            <p className="text-xs text-slate-500">
              Filter by status/priority, search titles with Java String methods, and export files
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => downloadTasksAsCSV(sortedTasks)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => downloadTasksAsText(sortedTasks)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export TXT</span>
            </button>

            <button
              onClick={onOpenNewTaskModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Task</span>
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search title (Java String.contains)..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700"
            >
              <option value="ALL">All Statuses</option>
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700"
            >
              <option value="ALL">All Priorities</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3">Task ID</th>
                <th 
                  className="px-4 py-3 cursor-pointer hover:text-slate-800"
                  onClick={() => toggleSort('title')}
                >
                  <div className="flex items-center gap-1">
                    <span>Title & Class Type</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 cursor-pointer hover:text-slate-800"
                  onClick={() => toggleSort('priority')}
                >
                  <div className="flex items-center gap-1">
                    <span>Priority</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Assigned To</th>
                <th 
                  className="px-4 py-3 cursor-pointer hover:text-slate-800"
                  onClick={() => toggleSort('dueDate')}
                >
                  <div className="flex items-center gap-1">
                    <span>Due Date</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {sortedTasks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    No tasks found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                sortedTasks.map(task => {
                  const isOverdue = task.status !== 'DONE' && new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));

                  return (
                    <tr key={task.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* ID */}
                      <td className="px-4 py-3 font-mono font-bold text-slate-500 text-[11px]">
                        {task.id}
                      </td>

                      {/* Title & Type */}
                      <td className="px-4 py-3 max-w-sm">
                        <div className="flex items-start gap-2">
                          {task.taskType === 'BUG' ? (
                            <span className="p-1 rounded bg-rose-50 text-rose-600 border border-rose-200 mt-0.5 shrink-0" title="BugTask class">
                              <Bug className="w-3.5 h-3.5" />
                            </span>
                          ) : (
                            <span className="p-1 rounded bg-indigo-50 text-indigo-600 border border-indigo-200 mt-0.5 shrink-0" title="FeatureTask class">
                              <Sparkles className="w-3.5 h-3.5" />
                            </span>
                          )}
                          <div>
                            <div className="font-bold text-slate-800 hover:text-indigo-600 cursor-pointer" onClick={() => onEditTask(task)}>
                              {task.title}
                            </div>
                            <div className="text-[11px] text-slate-400 line-clamp-1">
                              {task.description || 'No description provided'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Priority */}
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${priorityBadge[task.priority]}`}>
                          {task.priority}
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="px-4 py-3">
                        <select
                          value={task.status}
                          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
                          className={`text-[11px] font-bold border rounded px-2 py-1 focus:outline-hidden ${statusBadge[task.status]}`}
                        >
                          <option value="TODO">To Do</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="DONE">Done</option>
                        </select>
                      </td>

                      {/* Assignee */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-medium text-slate-700">
                            {task.assignedMemberName || 'Unassigned'}
                          </span>
                        </div>
                      </td>

                      {/* Due Date */}
                      <td className="px-4 py-3">
                        <div className={`flex items-center gap-1 font-medium ${isOverdue ? 'text-rose-600 font-bold' : 'text-slate-600'}`}>
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{task.dueDate}</span>
                          {isOverdue && <span className="text-[10px] text-rose-500 bg-rose-50 px-1 rounded">(Overdue)</span>}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onEditTask(task)}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                            title="Edit Task"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteTask(task.id)}
                            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                            title="Delete Task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
