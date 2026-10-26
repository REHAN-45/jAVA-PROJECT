import React from 'react';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  RotateCcw, 
  Clock, 
  AlertTriangle,
  Menu,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenNewTaskModal: () => void;
  onResetData: () => void;
  overdueCount: number;
  onToggleSidebar: () => void;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenNewTaskModal,
  onResetData,
  overdueCount,
  onToggleSidebar,
  onSelectTab
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Toggle & Title */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-hidden"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">Team Task Management</h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  College Mini Project
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Java Spring Boot + PostgreSQL + React Prototype
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search with Java String Search simulation */}
        <div className="hidden sm:flex flex-1 max-w-md mx-2">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tasks by title (Java String methods)..."
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Overdue alert indicator (Multithreading simulation) */}
          {overdueCount > 0 ? (
            <div 
              title={`${overdueCount} overdue task(s) detected by background thread`}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 animate-pulse cursor-pointer"
              onClick={() => onSelectTab('tasks')}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span className="hidden sm:inline">{overdueCount} Overdue</span>
              <span className="sm:hidden">{overdueCount}</span>
            </div>
          ) : (
            <div 
              title="Overdue monitor thread running every 60s"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
            >
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Thread Active: No Overdue</span>
            </div>
          )}

          {/* Blueprint quick button */}
          <button
            onClick={() => onSelectTab('docs')}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
          >
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Project Blueprint & Java Code</span>
          </button>

          {/* Reset Demo Data button */}
          <button
            onClick={onResetData}
            title="Reset data to initial state"
            className="p-1.5 sm:px-2.5 sm:py-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-medium border border-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Demo</span>
          </button>

          {/* New Task Button */}
          <button
            onClick={onOpenNewTaskModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>

      </div>

      {/* Mobile search bar */}
      <div className="sm:hidden px-4 pb-2.5">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks by title..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-indigo-500"
          />
        </div>
      </div>
    </header>
  );
};
