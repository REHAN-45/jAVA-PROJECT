import React, { useState, useEffect } from 'react';
import { X, Sparkles, Bug, AlertCircle } from 'lucide-react';
import { Task, TeamMember, TaskStatus, TaskPriority, TaskType } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: Partial<Task>) => void;
  initialTask?: Task | null;
  members: TeamMember[];
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialTask,
  members
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('TODO');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
  const [taskType, setTaskType] = useState<TaskType>('FEATURE');
  const [assignedMemberId, setAssignedMemberId] = useState<string>('');
  const [dueDate, setDueDate] = useState('');
  const [severity, setSeverity] = useState<'CRITICAL' | 'MAJOR' | 'MINOR'>('MAJOR');
  const [storyPoints, setStoryPoints] = useState<number>(3);
  const [estimatedHours, setEstimatedHours] = useState<number>(8);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '');
      setDescription(initialTask.description || '');
      setStatus(initialTask.status || 'TODO');
      setPriority(initialTask.priority || 'MEDIUM');
      setTaskType(initialTask.taskType || 'FEATURE');
      setAssignedMemberId(initialTask.assignedMemberId || '');
      setDueDate(initialTask.dueDate || '');
      setSeverity(initialTask.severity || 'MAJOR');
      setStoryPoints(initialTask.storyPoints || 3);
      setEstimatedHours(initialTask.estimatedHours || 8);
    } else {
      // Defaults for new task
      setTitle('');
      setDescription('');
      setStatus('TODO');
      setPriority('MEDIUM');
      setTaskType('FEATURE');
      setAssignedMemberId('');
      // Default due date to 7 days from now
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      setDueDate(nextWeek.toISOString().slice(0, 10));
      setSeverity('MAJOR');
      setStoryPoints(3);
      setEstimatedHours(8);
    }
    setErrors({});
  }, [initialTask, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!title.trim()) {
      errs.title = 'Title is required (Java String.trim() check)';
    } else if (title.trim().length < 5) {
      errs.title = 'Title must be at least 5 characters long';
    }

    if (!dueDate) {
      errs.dueDate = 'Due date is required for deadline tracking';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const assignedMember = members.find(m => m.id === assignedMemberId);

    onSave({
      id: initialTask?.id,
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      taskType,
      assignedMemberId: assignedMemberId || null,
      assignedMemberName: assignedMember ? assignedMember.name : 'Unassigned',
      dueDate,
      severity: taskType === 'BUG' ? severity : undefined,
      storyPoints: taskType === 'FEATURE' ? storyPoints : undefined,
      estimatedHours: taskType === 'FEATURE' ? estimatedHours : undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {initialTask ? 'Edit Task' : 'Create New Task'}
            </h2>
            <p className="text-xs text-slate-500">
              Maps to Java <code className="text-indigo-600 font-mono font-medium">BaseTask</code> entity with polymorphism
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Task Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Implement PostgreSQL schema migrations"
              className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-hidden transition-all ${
                errors.title ? 'border-rose-300 ring-2 ring-rose-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
            />
            {errors.title && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide context, acceptance criteria, or error details..."
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
            />
          </div>

          {/* Task Type selector (Inheritance demo) */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-800 mb-2">
              OOP Polymorphism Type (extends BaseTask)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className={`flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                taskType === 'FEATURE' 
                  ? 'bg-indigo-50/70 border-indigo-400 text-indigo-900 ring-1 ring-indigo-200' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}>
                <input
                  type="radio"
                  name="taskType"
                  value="FEATURE"
                  checked={taskType === 'FEATURE'}
                  onChange={() => setTaskType('FEATURE')}
                  className="hidden"
                />
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold">FeatureTask</div>
                  <div className="text-[10px] text-slate-500">Story points & hours</div>
                </div>
              </label>

              <label className={`flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                taskType === 'BUG' 
                  ? 'bg-rose-50 border-rose-400 text-rose-900 ring-1 ring-rose-200' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}>
                <input
                  type="radio"
                  name="taskType"
                  value="BUG"
                  checked={taskType === 'BUG'}
                  onChange={() => setTaskType('BUG')}
                  className="hidden"
                />
                <Bug className="w-4 h-4 text-rose-600 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold">BugTask</div>
                  <div className="text-[10px] text-slate-500">Severity-based score</div>
                </div>
              </label>
            </div>

            {/* Conditional Type Fields */}
            {taskType === 'BUG' ? (
              <div className="mt-3 pt-3 border-t border-slate-200">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bug Severity Level
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-indigo-500"
                >
                  <option value="CRITICAL">CRITICAL (+50 Urgency Score)</option>
                  <option value="MAJOR">MAJOR (+30 Urgency Score)</option>
                  <option value="MINOR">MINOR (+10 Urgency Score)</option>
                </select>
              </div>
            ) : (
              <div className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Story Points
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="21"
                    value={storyPoints}
                    onChange={(e) => setStoryPoints(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Estimated Hours
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="80"
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Row: Priority & Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Priority Level (Fixed Array)
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-indigo-500"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-indigo-500"
              >
                <option value="TODO">TO DO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
            </div>
          </div>

          {/* Row: Assigned Member & Due Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Assign to Team Member
              </label>
              <select
                value={assignedMemberId}
                onChange={(e) => setAssignedMemberId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-indigo-500"
              >
                <option value="">Unassigned</option>
                {members.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.role === 'TEAM_LEAD' ? 'Lead' : 'Member'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Due Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`w-full px-3 py-2 text-xs bg-white border rounded-lg focus:outline-hidden ${
                  errors.dueDate ? 'border-rose-300' : 'border-slate-300 focus:border-indigo-500'
                }`}
              />
              {errors.dueDate && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.dueDate}</p>
              )}
            </div>
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition-colors"
            >
              {initialTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
