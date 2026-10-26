import React, { useState } from 'react';
import { 
  Plus, 
  Users, 
  Mail, 
  Phone, 
  Briefcase, 
  Shield, 
  Pencil, 
  Trash2, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { TeamMember, Task } from '../types';
import { MemberModal } from '../components/MemberModal';

interface TeamViewProps {
  members: TeamMember[];
  tasks: Task[];
  onAddMember: (member: Partial<TeamMember>) => void;
  onUpdateMember: (member: Partial<TeamMember>) => void;
  onDeleteMember: (id: string) => void;
}

export const TeamView: React.FC<TeamViewProps> = ({
  members,
  tasks,
  onAddMember,
  onUpdateMember,
  onDeleteMember
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member: TeamMember) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleSave = (data: Partial<TeamMember>) => {
    if (editingMember) {
      onUpdateMember(data);
    } else {
      onAddMember(data);
    }
  };

  const handleDelete = (id: string) => {
    onDeleteMember(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Team Members Directory</h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {members.length} Members
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Demonstrates OOP Inheritance: <code className="text-indigo-600 font-mono">Person</code> base class extended by <code className="text-indigo-600 font-mono">TeamMember</code> & <code className="text-indigo-600 font-mono">TeamLead</code>.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Grid of Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {members.map(member => {
          const assignedTasks = tasks.filter(t => t.assignedMemberId === member.id);
          const activeTasks = assignedTasks.filter(t => t.status !== 'DONE');
          const isTeamLead = member.role === 'TEAM_LEAD';

          return (
            <div 
              key={member.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Card Header: Avatar & Role */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-slate-100 shadow-xs"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">{member.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-slate-400" />
                        <span>{member.department}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(member)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                      title="Edit Member"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(member.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Member"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Role Pill */}
                <div className="mb-4">
                  {isTeamLead ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      <Shield className="w-3.5 h-3.5 text-purple-600" />
                      <span>Team Lead (Arch Tier-1)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      <span>Team Member (Engineer)</span>
                    </span>
                  )}
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  {member.phone && (
                    <div className="flex items-center gap-2 text-slate-500">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{member.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Workload footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Assigned Tasks:</span>
                <span className={`px-2 py-0.5 rounded font-bold ${
                  activeTasks.length > 2 
                    ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {activeTasks.length} active / {assignedTasks.length} total
                </span>
              </div>

              {/* Inline Delete Confirmation */}
              {deleteConfirmId === member.id && (
                <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-1.5 text-rose-800 font-bold">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Confirm Deletion</span>
                  </div>
                  <p className="text-[11px] text-rose-700">
                    {activeTasks.length > 0 
                      ? `Warning: ${activeTasks.length} task(s) currently assigned to this member will become unassigned.`
                      : 'Are you sure you want to remove this member from the database?'}
                  </p>
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-2 py-1 text-slate-600 font-semibold hover:bg-slate-200/60 rounded text-[11px]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="px-2.5 py-1 bg-rose-600 text-white font-bold rounded text-[11px] hover:bg-rose-700"
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Member Modal for Create / Edit */}
      <MemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialMember={editingMember}
      />
    </div>
  );
};
