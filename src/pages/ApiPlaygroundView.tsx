import React, { useState } from 'react';
import { Send, Check, Copy, RefreshCw, Terminal, Layers } from 'lucide-react';
import { Task, TeamMember } from '../types';

interface ApiPlaygroundProps {
  tasks: Task[];
  members: TeamMember[];
}

export const ApiPlaygroundView: React.FC<ApiPlaygroundProps> = ({ tasks, members }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('GET /api/tasks');
  const [searchParam, setSearchParam] = useState<string>('');
  const [requestPayload, setRequestPayload] = useState<string>(JSON.stringify({
    title: "Implement OAuth2 JWT Token Filter",
    description: "Secure endpoints with Spring Security filter chain",
    priority: "HIGH",
    taskType: "FEATURE",
    assignedMemberId: members[0]?.id || "m-1",
    dueDate: "2026-11-15",
    storyPoints: 5,
    estimatedHours: 12
  }, null, 2));

  const [responseResult, setResponseResult] = useState<any>({
    status: 200,
    statusText: 'OK',
    time: '24ms',
    data: tasks
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const endpoints = [
    { label: 'GET /api/tasks', method: 'GET', path: '/api/tasks' },
    { label: 'GET /api/tasks (Search)', method: 'GET', path: '/api/tasks?search={query}' },
    { label: 'GET /api/tasks/{id}', method: 'GET', path: '/api/tasks/TSK-101' },
    { label: 'POST /api/tasks', method: 'POST', path: '/api/tasks' },
    { label: 'GET /api/members', method: 'GET', path: '/api/members' },
    { label: 'GET /api/activity-logs', method: 'GET', path: '/api/activity-logs' }
  ];

  const handleExecute = () => {
    setIsLoading(true);

    setTimeout(() => {
      if (selectedEndpoint.includes('POST')) {
        try {
          const parsed = JSON.parse(requestPayload);
          setResponseResult({
            status: 201,
            statusText: 'CREATED',
            time: '38ms',
            headers: {
              'content-type': 'application/json;charset=UTF-8',
              'location': '/api/tasks/TSK-999'
            },
            data: {
              id: 'TSK-999',
              ...parsed,
              createdAt: new Date().toISOString()
            }
          });
        } catch (e) {
          setResponseResult({
            status: 400,
            statusText: 'BAD REQUEST',
            time: '12ms',
            data: {
              timestamp: new Date().toISOString(),
              status: 400,
              error: 'Invalid Request Parameter',
              message: 'Invalid JSON payload format'
            }
          });
        }
      } else if (selectedEndpoint.includes('Search')) {
        const q = searchParam.trim().toLowerCase();
        const results = tasks.filter(t => t.title.toLowerCase().includes(q));
        setResponseResult({
          status: 200,
          statusText: 'OK',
          time: '19ms',
          data: results
        });
      } else if (selectedEndpoint.includes('/TSK-101')) {
        const found = tasks.find(t => t.id === 'TSK-101');
        setResponseResult({
          status: found ? 200 : 404,
          statusText: found ? 'OK' : 'NOT FOUND',
          time: '15ms',
          data: found || { status: 404, error: 'Task Not Found', message: 'Task not found with ID: TSK-101' }
        });
      } else if (selectedEndpoint.includes('/members')) {
        setResponseResult({
          status: 200,
          statusText: 'OK',
          time: '21ms',
          data: members
        });
      } else {
        setResponseResult({
          status: 200,
          statusText: 'OK',
          time: '28ms',
          data: tasks
        });
      }
      setIsLoading(false);
    }, 250);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(responseResult.data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-600" />
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Interactive REST API Playground</h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Test simulated Spring Boot REST controller responses directly inside the browser with live JSON inspect.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Panel */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">1. HTTP Request Configuration</h2>

          {/* Endpoint selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Endpoint
            </label>
            <select
              value={selectedEndpoint}
              onChange={(e) => setSelectedEndpoint(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono font-medium bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-indigo-500"
            >
              {endpoints.map((ep, i) => (
                <option key={i} value={ep.label}>{ep.label}</option>
              ))}
            </select>
          </div>

          {/* Optional Search Query param */}
          {selectedEndpoint.includes('Search') && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Query Parameter (?search=)
              </label>
              <input
                type="text"
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
                placeholder="e.g. Postgres"
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-indigo-500"
              />
            </div>
          )}

          {/* Request Body (For POST) */}
          {selectedEndpoint.includes('POST') && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Request JSON Body (Spring @RequestBody)
              </label>
              <textarea
                rows={10}
                value={requestPayload}
                onChange={(e) => setRequestPayload(e.target.value)}
                className="w-full p-3 font-mono text-xs bg-slate-900 text-slate-200 rounded-xl focus:outline-hidden border border-slate-800 resize-none"
              />
            </div>
          )}

          <button
            onClick={handleExecute}
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>Execute Request</span>
          </button>
        </div>

        {/* Response Panel */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">2. HTTP Response (JSON)</h2>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                responseResult.status < 300 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {responseResult.status} {responseResult.statusText}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {responseResult.time}
              </span>
              <button
                onClick={handleCopy}
                className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                title="Copy JSON Response"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="bg-slate-900 text-emerald-400 font-mono text-xs p-4 rounded-xl overflow-x-auto max-h-[420px] border border-slate-800 shadow-inner">
            <pre>{JSON.stringify(responseResult.data, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
