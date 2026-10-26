import React, { useState } from 'react';
import { 
  FileCode2, 
  Copy, 
  Check, 
  Download, 
  Database, 
  Layers, 
  Palette, 
  Send, 
  BookOpen, 
  Terminal, 
  GitBranch, 
  HelpCircle,
  FolderTree,
  ExternalLink,
  Code
} from 'lucide-react';
import { 
  ARCHITECTURE_DIAGRAM, 
  FOLDER_STRUCTURE, 
  FIGMA_DESIGN_SPEC, 
  POSTGRESQL_SCHEMA_SQL, 
  JAVA_BACKEND_FILES, 
  REST_API_DOCS, 
  JAVA_CONCEPTS_MAPPING, 
  STEP_BY_STEP_RUN_GUIDE, 
  GIT_GITHUB_WORKFLOW, 
  POSTMAN_TESTS, 
  VIVA_QUESTIONS,
  JavaCodeFile 
} from '../data/javaProjectDocs';
import { triggerFileDownload } from '../utils/fileExport';

export const DocumentationView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [selectedJavaFile, setSelectedJavaFile] = useState<JavaCodeFile>(JAVA_BACKEND_FILES[0]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const sections = [
    { id: 'overview', label: '1. Architecture & Overview', icon: Layers },
    { id: 'folders', label: '2. Folder Structure', icon: FolderTree },
    { id: 'figma', label: '3. Figma Design Spec', icon: Palette },
    { id: 'database', label: '4. PostgreSQL Schema & DDL', icon: Database },
    { id: 'backend', label: '5. Java Spring Boot Code', icon: FileCode2, highlight: true },
    { id: 'api', label: '6. REST API Documentation', icon: Send },
    { id: 'concepts', label: '7. 11 Java Concepts Table', icon: BookOpen },
    { id: 'setup', label: '8. Step-by-Step Run Guide', icon: Terminal },
    { id: 'git', label: '9. Git & GitHub + README', icon: GitBranch },
    { id: 'testing', label: '10. Postman & cURL Tests', icon: ExternalLink },
    { id: 'viva', label: '11. Viva Voce & Future Ideas', icon: HelpCircle }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Complete Student Submission Kit</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              College Mini Project Blueprint & Java Code
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Every deliverable requested for your evaluation: Architecture diagram, Figma design tokens, PostgreSQL tables, complete Java source code with <code className="text-indigo-300 font-mono">// CONCEPT:</code> annotations, REST APIs, Git commands, and Viva Q&A.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(POSTGRESQL_SCHEMA_SQL, 'all-sql')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-1.5 transition-colors"
            >
              {copiedKey === 'all-sql' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy PostgreSQL SQL</span>
            </button>
          </div>
        </div>

        {/* Section Navigation Pills */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {sections.map(sec => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;

            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0
                  ${isActive 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION CONTENT */}

      {/* 1. Overview & Architecture */}
      {activeSection === 'overview' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Project Architecture & Component Flows</h2>
              <p className="text-xs text-slate-500">ASCII Architecture Blueprint showing Client, Application, and Persistence tiers</p>
            </div>
            <button
              onClick={() => handleCopy(ARCHITECTURE_DIAGRAM, 'arch-diagram')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg"
            >
              {copiedKey === 'arch-diagram' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Diagram</span>
            </button>
          </div>

          <div className="bg-slate-900 text-emerald-400 font-mono text-xs p-5 rounded-2xl overflow-x-auto border border-slate-800 shadow-inner">
            <pre className="leading-relaxed">{ARCHITECTURE_DIAGRAM}</pre>
          </div>
        </div>
      )}

      {/* 2. Folder Structure */}
      {activeSection === 'folders' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Project Directory Layout</h2>
              <p className="text-xs text-slate-500">Full repository tree for both Java Spring Boot backend and React frontend</p>
            </div>
            <button
              onClick={() => handleCopy(FOLDER_STRUCTURE, 'folder-struct')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg"
            >
              {copiedKey === 'folder-struct' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Tree</span>
            </button>
          </div>

          <div className="bg-slate-900 text-slate-200 font-mono text-xs p-5 rounded-2xl overflow-x-auto border border-slate-800 shadow-inner">
            <pre className="leading-relaxed">{FOLDER_STRUCTURE}</pre>
          </div>
        </div>
      )}

      {/* 3. Figma Design Spec */}
      {activeSection === 'figma' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-base font-bold text-slate-900">Figma Design System Specification</h2>
            <p className="text-xs text-slate-500">
              Complete design tokens and wireframe descriptions to recreate the UI inside Figma or hand off to developers.
            </p>
          </div>

          {/* Color Palette */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">1. Color Palette Tokens</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {FIGMA_DESIGN_SPEC.colors.map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div 
                    className="w-10 h-10 rounded-lg shadow-xs shrink-0 border border-black/10" 
                    style={{ backgroundColor: c.hex }} 
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                      <span>{c.name}</span>
                    </div>
                    <div className="font-mono text-[11px] text-slate-500">{c.hex}</div>
                    <div className="text-[10px] text-slate-400 truncate">{c.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography & Spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">2. Typography Scale</h3>
              <div className="space-y-2 text-xs">
                {FIGMA_DESIGN_SPEC.typography.map((t, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800">{t.level}</span>
                      <span className="block text-[11px] text-slate-500">{t.font}</span>
                    </div>
                    <span className="font-mono text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {t.size}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">3. Spacing System</h3>
              <div className="space-y-2 text-xs">
                {FIGMA_DESIGN_SPEC.spacing.map((s, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-800">{s.token}</span>
                    <span className="text-[11px] text-slate-500 text-right">{s.usage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Screen Wireframes */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">4. Screen-by-Screen Wireframes Description</h3>
            <div className="space-y-3">
              {FIGMA_DESIGN_SPEC.wireframes.map((wf, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1">
                  <h4 className="text-xs font-bold text-indigo-700">{wf.screen}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{wf.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. PostgreSQL Schema */}
      {activeSection === 'database' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">PostgreSQL Schema & Seed Data (schema.sql)</h2>
              <p className="text-xs text-slate-500">
                Complete DDL statements with primary keys, foreign keys, CHECK constraints, and sample DML inserts.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => triggerFileDownload(POSTGRESQL_SCHEMA_SQL, 'schema.sql', 'text/sql')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download schema.sql</span>
              </button>
              <button
                onClick={() => handleCopy(POSTGRESQL_SCHEMA_SQL, 'sql-code')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
              >
                {copiedKey === 'sql-code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy SQL</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-900 text-slate-200 font-mono text-xs p-5 rounded-2xl overflow-x-auto border border-slate-800 shadow-inner">
            <pre className="leading-relaxed">{POSTGRESQL_SCHEMA_SQL}</pre>
          </div>
        </div>
      )}

      {/* 5. Complete Java Backend Codebase */}
      {activeSection === 'backend' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-base font-bold text-slate-900">Java + Spring Boot Complete Source Code</h2>
            <p className="text-xs text-slate-500">
              Clean, beginner-friendly code with short <code className="text-indigo-600 font-mono font-medium">// CONCEPT: ...</code> comments on every file. Select a file from the tabs below to view and copy.
            </p>
          </div>

          {/* Java File Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {JAVA_BACKEND_FILES.map((file) => {
              const isSelected = selectedJavaFile.name === file.name;
              return (
                <button
                  key={file.name}
                  onClick={() => setSelectedJavaFile(file)}
                  className={`
                    px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all shrink-0 flex items-center gap-2 border
                    ${isSelected 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }
                  `}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>{file.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active File Inspector Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Header with path, tags, and action buttons */}
            <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-mono font-bold text-sm text-slate-900">{selectedJavaFile.name}</h3>
                  <span className="text-[11px] font-mono text-slate-400">({selectedJavaFile.path})</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{selectedJavaFile.description}</p>
                {/* Concept tags */}
                <div className="flex items-center gap-1.5 flex-wrap mt-2">
                  {selectedJavaFile.conceptHighlights.map((ch, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => triggerFileDownload(selectedJavaFile.code, selectedJavaFile.name, 'text/plain')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </button>
                <button
                  onClick={() => handleCopy(selectedJavaFile.code, selectedJavaFile.name)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
                >
                  {copiedKey === selectedJavaFile.name ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Code</span>
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="bg-slate-900 text-slate-200 font-mono text-xs p-5 overflow-x-auto max-h-[600px]">
              <pre className="leading-relaxed">{selectedJavaFile.code}</pre>
            </div>
          </div>
        </div>
      )}

      {/* 6. REST API Documentation Table */}
      {activeSection === 'api' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-base font-bold text-slate-900">REST API Specification Table</h2>
            <p className="text-xs text-slate-500">
              Clean HTTP endpoints with verbs, status codes, and JSON schemas for React & Postman integration.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-4 py-3">Method & Path</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Request Payload</th>
                    <th className="px-4 py-3">Response Payload</th>
                    <th className="px-4 py-3">HTTP Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {REST_API_DOCS.map((api, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 align-top">
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded font-bold mr-2 ${
                          api.method === 'GET' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          api.method === 'POST' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          api.method === 'PUT' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {api.method}
                        </span>
                        <span className="text-slate-800 font-bold">{api.endpoint}</span>
                      </td>
                      <td className="px-4 py-3 font-sans text-xs text-slate-600 max-w-xs">
                        {api.description}
                      </td>
                      <td className="px-4 py-3 text-slate-700 max-w-xs overflow-x-auto whitespace-pre-wrap bg-slate-50/50 p-2 rounded">
                        {api.requestJson}
                      </td>
                      <td className="px-4 py-3 text-slate-700 max-w-xs overflow-x-auto whitespace-pre-wrap bg-slate-50/50 p-2 rounded">
                        {api.responseJson}
                      </td>
                      <td className="px-4 py-3 font-sans text-xs font-semibold text-slate-700 whitespace-nowrap">
                        {api.statusCodes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 7. Java Concepts Mapping Table */}
      {activeSection === 'concepts' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-base font-bold text-slate-900">11 Java Core Concepts Verification Matrix</h2>
            <p className="text-xs text-slate-500">
              Exact mapping of every required Java topic to the file, class, methods, and practical use case.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-4 py-3">Concept</th>
                    <th className="px-4 py-3">Source File(s)</th>
                    <th className="px-4 py-3">Method / Code Construct</th>
                    <th className="px-4 py-3">Explanation & College Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {JAVA_CONCEPTS_MAPPING.map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3 font-bold text-indigo-700">
                        {m.concept}
                      </td>
                      <td className="px-4 py-3 font-mono font-medium text-slate-800 text-[11px]">
                        {m.file}
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-600 bg-slate-50/50">
                        {m.target}
                      </td>
                      <td className="px-4 py-3 text-slate-600 leading-relaxed">
                        {m.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 8. Step-by-Step Run Guide */}
      {activeSection === 'setup' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Step-by-Step Local Execution Guide</h2>
              <p className="text-xs text-slate-500">Instructions for running PostgreSQL, Maven Spring Boot, and React</p>
            </div>
            <button
              onClick={() => handleCopy(STEP_BY_STEP_RUN_GUIDE, 'run-guide')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg"
            >
              {copiedKey === 'run-guide' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Guide</span>
            </button>
          </div>

          <div className="bg-slate-900 text-slate-200 font-mono text-xs p-5 rounded-2xl overflow-x-auto border border-slate-800 shadow-inner">
            <pre className="leading-relaxed">{STEP_BY_STEP_RUN_GUIDE}</pre>
          </div>
        </div>
      )}

      {/* 9. Git & GitHub Workflow */}
      {activeSection === 'git' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-base font-bold text-slate-900">Git & GitHub Version Control Workflow</h2>
            <p className="text-xs text-slate-500">
              Exact terminal commands, suggested semantic commit messages plan, and production .gitignore.
            </p>
          </div>

          {/* Commands */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">1. Terminal Git Commands</h3>
              <button
                onClick={() => handleCopy(GIT_GITHUB_WORKFLOW.commands.join('\n'), 'git-cmds')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline"
              >
                {copiedKey === 'git-cmds' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Commands</span>
              </button>
            </div>
            <div className="bg-slate-900 text-emerald-400 font-mono text-xs p-4 rounded-xl overflow-x-auto">
              <pre>{GIT_GITHUB_WORKFLOW.commands.join('\n')}</pre>
            </div>
          </div>

          {/* Commit Message Plan */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">2. Suggested Commit-Message Plan</h3>
            <div className="space-y-2">
              {GIT_GITHUB_WORKFLOW.commitPlan.map((c, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-indigo-700">{c.step}:</span>
                  <span className="text-slate-700">{c.msg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* .gitignore */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">3. .gitignore File</h3>
              <button
                onClick={() => handleCopy(GIT_GITHUB_WORKFLOW.gitignore, 'gitignore')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline"
              >
                {copiedKey === 'gitignore' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy .gitignore</span>
              </button>
            </div>
            <div className="bg-slate-900 text-slate-300 font-mono text-xs p-4 rounded-xl overflow-x-auto">
              <pre>{GIT_GITHUB_WORKFLOW.gitignore}</pre>
            </div>
          </div>
        </div>
      )}

      {/* 10. Postman Tests */}
      {activeSection === 'testing' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-base font-bold text-slate-900">Sample API Requests (cURL / Postman)</h2>
            <p className="text-xs text-slate-500">
              5 ready-to-test curl requests to verify your Spring Boot backend endpoints.
            </p>
          </div>

          <div className="space-y-4">
            {POSTMAN_TESTS.map((test, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{test.name}</span>
                    <span className="font-mono text-[11px] text-slate-500">({test.url})</span>
                  </div>
                  <button
                    onClick={() => handleCopy(test.curl, `curl-${idx}`)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    {copiedKey === `curl-${idx}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>Copy cURL</span>
                  </button>
                </div>
                <div className="bg-slate-900 text-amber-300 font-mono text-xs p-3 rounded-lg overflow-x-auto">
                  <pre>{test.curl}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 11. Viva Voce & Future Improvements */}
      {activeSection === 'viva' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-base font-bold text-slate-900">College Viva Voce Q&A & Future Improvements</h2>
            <p className="text-xs text-slate-500">
              Frequently asked interview & viva questions by college examiners, with clear model answers.
            </p>
          </div>

          <div className="space-y-4">
            {VIVA_QUESTIONS.map((vq, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{vq.question}</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6 border-l-2 border-indigo-200 ml-2">
                  {vq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
