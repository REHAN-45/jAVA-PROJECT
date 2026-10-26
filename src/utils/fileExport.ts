import { Task, ActivityLogEntry } from '../types';

export function downloadTasksAsCSV(tasks: Task[]) {
  const headers = ['Task ID', 'Title', 'Type', 'Priority', 'Status', 'Due Date', 'Assigned To', 'Severity / Points', 'Description'];
  
  const csvRows = tasks.map(task => {
    const details = task.taskType === 'BUG' 
      ? `Severity: ${task.severity || 'N/A'}` 
      : `Story Points: ${task.storyPoints || 0}, Hours: ${task.estimatedHours || 0}`;
    
    return [
      task.id,
      `"${(task.title || '').replace(/"/g, '""')}"`,
      task.taskType,
      task.priority,
      task.status,
      task.dueDate,
      `"${(task.assignedMemberName || 'Unassigned').replace(/"/g, '""')}"`,
      `"${details}"`,
      `"${(task.description || '').replace(/"/g, '""')}"`
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...csvRows].join('\r\n');
  triggerFileDownload(csvContent, 'tasks_export_' + new Date().toISOString().slice(0, 10) + '.csv', 'text/csv;charset=utf-8;');
}

export function downloadTasksAsText(tasks: Task[]) {
  let content = '====================================================\n';
  content += '         TEAM TASK MANAGEMENT - SUMMARY EXPORT       \n';
  content += '         Generated At: ' + new Date().toLocaleString() + '\n';
  content += '====================================================\n\n';

  tasks.forEach((task, index) => {
    content += `[#${index + 1}] ${task.id} - ${task.title}\n`;
    content += `Status: ${task.status} | Priority: ${task.priority} | Type: ${task.taskType}\n`;
    content += `Assigned To: ${task.assignedMemberName || 'Unassigned'} | Due Date: ${task.dueDate}\n`;
    if (task.taskType === 'BUG') {
      content += `Severity: ${task.severity || 'N/A'}\n`;
    } else {
      content += `Story Points: ${task.storyPoints || 0} | Estimated Hours: ${task.estimatedHours || 0}\n`;
    }
    content += `Description: ${task.description || 'None'}\n`;
    content += '----------------------------------------------------\n';
  });

  triggerFileDownload(content, 'team_tasks_summary.txt', 'text/plain;charset=utf-8;');
}

export function downloadActivityLogAsText(logs: ActivityLogEntry[]) {
  let content = '====================================================\n';
  content += '        ACTIVITY AUDIT LOG (JAVA VECTOR SIMULATOR)   \n';
  content += '        Generated At: ' + new Date().toLocaleString() + '\n';
  content += '====================================================\n\n';

  logs.forEach(log => {
    content += `[${log.timestamp}] [${log.type}] ${log.action}\n`;
    content += `Actor: ${log.performedBy} | Details: ${log.details}\n`;
    content += '----------------------------------------------------\n';
  });

  triggerFileDownload(content, 'activity_audit_log.txt', 'text/plain;charset=utf-8;');
}

export function triggerFileDownload(content: string, fileName: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
