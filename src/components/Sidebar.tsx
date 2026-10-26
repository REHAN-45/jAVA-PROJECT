import React from 'react';
import { 
  LayoutDashboard, 
  KanbanSquare, 
  ListTodo, 
  Users, 
  Activity, 
  FileCode2, 
  Send,
  Sparkles,
  ChevronRight,
  Database,
  Layers
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  taskCounts: {
    total: number;
    todo: number;
    inProgress: number;
    done: number;
  };
  memberCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpen,
  onClose,
  taskCounts,
  memberCount
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'kanban',
      label: 'Kanban Board',
      icon: KanbanSquare,
      badge: `${taskCounts.todo + taskCounts.inProgress} active`
    },
    {
      id: 'tasks',
      label: 'Task List & Table',
      icon: ListTodo,
      badge: taskCounts.total.toString()
    },
    {
      id: 'members',
      label: 'Team Members',
      icon: Users,
      badge: memberCount.toString()
    },
    {
      id: 'activity',
      label: 'Activity Audit Log',
      icon: Activity,
      badge: 'Vector'
    },
    {
      id: 'docs',
      label: 'College Project Kit & Java Code',
      icon: FileCode2,
      badge: '12 Docs',
      isHighlight: true
    },
    {
      id: 'api',
      label: 'REST API Playground',
      icon: Send,
      badge: 'JSON'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed md:sticky top-0 md:top-[57px] left-0 h-screen md:h-[calc(100vh-57px)]
        w-64 bg-white border-r border-slate-200 z-50 md:z-10
        flex flex-col justify-between transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Navigation list */}
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Tech Stack Banner */}
          <div className="p-3 bg-gradient-to-br from-indigo-50 to-slate-50 border border-indigo-100 rounded-xl">
            <div className="flex items-center gap-2 text-indigo-800 font-semibold text-xs mb-1">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Full-Stack Architecture</span>
            </div>
            <div className="text-[11px] text-slate-600 space-y-0.5">
              <div className="flex items-center justify-between">
                <span>Frontend:</span>
                <span className="font-medium text-slate-800">React.js + Tailwind</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Backend:</span>
                <span className="font-medium text-slate-800">Java + Spring Boot</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Database:</span>
                <span className="font-medium text-slate-800">PostgreSQL (JPA + JDBC)</span>
              </div>
            </div>
          </div>

          {/* Primary Nav */}
          <div>
            <div className="px-2 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      onClose();
                    }}
                    className={`
                      w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold
                      transition-colors group
                      ${isActive 
                        ? item.isHighlight
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-indigo-50 text-indigo-700 font-bold' 
                        : item.isHighlight
                          ? 'bg-indigo-50/70 text-indigo-700 hover:bg-indigo-100/70 border border-indigo-200'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${
                        isActive 
                          ? item.isHighlight ? 'text-white' : 'text-indigo-600'
                          : item.isHighlight ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                      }`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`
                        px-1.5 py-0.5 rounded-md text-[10px] font-mono font-medium
                        ${isActive
                          ? item.isHighlight ? 'bg-indigo-700 text-white' : 'bg-indigo-100 text-indigo-700'
                          : 'bg-slate-100 text-slate-600'
                        }
                      `}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Metrics */}
          <div className="pt-2 border-t border-slate-100">
            <div className="px-2 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Task Status</span>
              <span className="text-[10px] text-slate-400">{taskCounts.total} total</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-700">{taskCounts.todo}</div>
                <div className="text-[10px] text-slate-400 uppercase">To Do</div>
              </div>
              <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-200">
                <div className="text-xs font-bold text-blue-700">{taskCounts.inProgress}</div>
                <div className="text-[10px] text-blue-500 uppercase">Prog</div>
              </div>
              <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <div className="text-xs font-bold text-emerald-700">{taskCounts.done}</div>
                <div className="text-[10px] text-emerald-500 uppercase">Done</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Student Project attribution */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[11px] font-semibold text-slate-700">Java Spring Server Simulated</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            All 11 college Java concepts implemented & marked with comments.
          </p>
        </div>
      </aside>
    </>
  );
};
