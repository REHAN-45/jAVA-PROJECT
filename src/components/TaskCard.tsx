import React from 'react';
import { 
  Calendar, 
  User, 
  Bug, 
  Sparkles, 
  MoreVertical, 
  Clock, 
  AlertCircle,
  Pencil,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { Task, TaskStatus } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  const isOverdue = task.status !== 'DONE' && new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));

  // Priority badge styling
  const priorityStyles = {
    HIGH: 'bg-rose-50 text-rose-700 border-rose-200',
    MEDIUM: 'bg-amber-50 text-amber-700 border-amber-200',
    LOW: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  };

  // Status button progression
  const getNextStatus = (current: TaskStatus): TaskStatus | null => {
    if (current === 'TODO') return 'IN_PROGRESS';
    if (current === 'IN_PROGRESS') return 'DONE';
    return null;
  };

  const nextStatus = getNextStatus(task.status);

  return (
    <div className={`
      group bg-white rounded-xl border p-4 shadow-xs hover:shadow-md transition-all duration-200
      ${isOverdue ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-200 hover:border-slate-300'}
    `}>
      {/* Top Header: Priority Badge & Task Type (OOP Inheritance) */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${priorityStyles[task.priority]}`}>
            {task.priority}
          </span>

          {task.taskType === 'BUG' ? (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-red-100/70 text-red-800 border border-red-200" title="Inheritance: BugTask class with Severity">
              <Bug className="w-3 h-3 text-red-600" />
              <span>{task.severity || 'BUG'}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-200" title="Inheritance: FeatureTask class with Story Points">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span>{task.storyPoints ? `${task.storyPoints} pts` : 'FEATURE'}</span>
            </span>
          )}
        </div>

        {/* Task ID & Quick Actions */}
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-mono text-slate-400 font-medium">
            {task.id}
          </span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
            <button
              onClick={() => onEdit(task)}
              className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              title="Edit Task"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50"
              title="Delete Task"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Task Title */}
      <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug mb-1.5">
        {task.title}
      </h3>

      {/* Task Description */}
      {task.description && (
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
          {task.description}
        </p>
      )}

      {/* Footer Info: Assignee & Due Date */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        {/* Assignee */}
        <div className="flex items-center gap-1.5 min-w-0" title={`Assigned to: ${task.assignedMemberName || 'Unassigned'}`}>
          <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700 overflow-hidden shrink-0">
            {task.assignedMemberName ? (
              task.assignedMemberName.split(' ').map(n => n[0]).join('').slice(0, 2)
            ) : (
              <User className="w-3 h-3 text-slate-400" />
            )}
          </div>
          <span className="truncate text-[11px] font-medium text-slate-700">
            {task.assignedMemberName || 'Unassigned'}
          </span>
        </div>

        {/* Due Date & Overdue */}
        <div className={`flex items-center gap-1 text-[11px] font-medium shrink-0 ${isOverdue ? 'text-rose-600 font-semibold' : 'text-slate-500'}`}>
          {isOverdue ? (
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
          ) : (
            <Calendar className="w-3 h-3 text-slate-400" />
          )}
          <span>{task.dueDate}</span>
        </div>
      </div>

      {/* Quick Move Progression Action */}
      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
          className="text-[11px] font-medium bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 focus:outline-hidden focus:border-indigo-400"
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>

        {nextStatus && (
          <button
            onClick={() => onStatusChange(task.id, nextStatus)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded transition-colors"
          >
            <span>Move to {nextStatus === 'IN_PROGRESS' ? 'Progress' : 'Done'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
