import React, { useState } from 'react';
import { 
  Activity, 
  FileDown, 
  Play, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';
import { ActivityLogEntry } from '../types';
import { downloadActivityLogAsText } from '../utils/fileExport';

interface ActivityLogViewProps {
  activities: ActivityLogEntry[];
  onTriggerSchedulerScan: () => void;
  onClearLogs: () => void;
}

export const ActivityLogView: React.FC<ActivityLogViewProps> = ({
  activities,
  onTriggerSchedulerScan,
  onClearLogs
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredLogs = activities.filter(log => {
    if (filterType !== 'ALL' && log.type !== filterType) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Banner & Concept Explanation */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Activity Audit Log & Multithreading Monitor
              </h1>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Vector&lt;ActivityLog&gt;
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Demonstrates Java <code className="text-indigo-600 font-mono font-semibold">Vector</code> thread-safety and the <code className="text-indigo-600 font-mono font-semibold">@Scheduled</code> OverdueTaskScheduler background thread.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onTriggerSchedulerScan}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Trigger Scan (Thread Tick)</span>
            </button>

            <button
              onClick={() => downloadActivityLogAsText(activities)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download Log (.txt)</span>
            </button>
          </div>
        </div>

        {/* Educational Callout Box */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Why Vector instead of ArrayList for this log?</span>
          </div>
          <p className="leading-relaxed">
            In Java, <strong>Vector</strong> is synchronized (thread-safe). Multiple HTTP request threads (user creating/updating tasks) and the background scheduler thread (<code className="text-slate-800 font-mono font-medium">OverdueTaskScheduler</code>) write to this log concurrently. Using a thread-safe collection prevents data corruption and <code>ConcurrentModificationException</code>.
          </p>
        </div>
      </div>

      {/* Filter and Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Filter bar */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-3 flex-wrap bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Filter Event Type:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-xs font-medium bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-hidden"
            >
              <option value="ALL">All Events ({activities.length})</option>
              <option value="TASK_CREATED">Task Created</option>
              <option value="TASK_UPDATED">Task Updated</option>
              <option value="TASK_DELETED">Task Deleted</option>
              <option value="MEMBER_ADDED">Member Added</option>
              <option value="BACKGROUND_CHECK">Background Thread Check</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              Showing {filteredLogs.length} entries
            </span>
            {activities.length > 0 && (
              <button
                onClick={onClearLogs}
                className="text-xs text-rose-600 hover:text-rose-800 font-medium"
              >
                Clear History
              </button>
            )}
          </div>
        </div>

        {/* Logs List */}
        <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
          {filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No activity logs recorded matching this filter.
            </div>
          ) : (
            filteredLogs.map(log => {
              const isBgCheck = log.type === 'BACKGROUND_CHECK';

              return (
                <div key={log.id} className="p-4 hover:bg-slate-50/70 transition-colors flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isBgCheck ? 'bg-purple-50 text-purple-600 border border-purple-200' : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                    }`}>
                      {isBgCheck ? <Clock className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{log.action}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                          isBgCheck ? 'bg-purple-100/70 text-purple-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {log.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {log.details}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Performed by: <span className="font-semibold text-slate-600">{log.performedBy}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-mono text-slate-400 block">
                      {log.timestamp}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
