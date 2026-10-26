import React, { useState, useEffect } from 'react';
import { X, Shield, User, AlertCircle } from 'lucide-react';
import { TeamMember, MemberRole } from '../types';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (memberData: Partial<TeamMember>) => void;
  initialMember?: TeamMember | null;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialMember
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<MemberRole>('TEAM_MEMBER');
  const [department, setDepartment] = useState('Frontend & UI');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
  ];

  useEffect(() => {
    if (initialMember) {
      setName(initialMember.name || '');
      setEmail(initialMember.email || '');
      setRole(initialMember.role || 'TEAM_MEMBER');
      setDepartment(initialMember.department || 'Frontend & UI');
      setPhone(initialMember.phone || '');
      setAvatarUrl(initialMember.avatarUrl || sampleAvatars[0]);
    } else {
      setName('');
      setEmail('');
      setRole('TEAM_MEMBER');
      setDepartment('Frontend & UI');
      setPhone('+91 98765 43210');
      setAvatarUrl(sampleAvatars[Math.floor(Math.random() * sampleAvatars.length)]);
    }
    setErrors({});
  }, [initialMember, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) {
      errs.name = 'Full name is required';
    }
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      id: initialMember?.id,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
      department,
      phone: phone.trim(),
      avatarUrl: avatarUrl || sampleAvatars[0]
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {initialMember ? 'Edit Team Member' : 'Add Team Member'}
            </h2>
            <p className="text-xs text-slate-500">
              Inherits from Java <code className="text-indigo-600 font-mono">Person</code> class
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Diya Patel"
              className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-hidden ${
                errors.name ? 'border-rose-300 ring-2 ring-rose-100' : 'border-slate-300 focus:border-indigo-500'
              }`}
            />
            {errors.name && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              College / Work Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. diya.patel@collegeteam.edu"
              className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-hidden ${
                errors.email ? 'border-rose-300 ring-2 ring-rose-100' : 'border-slate-300 focus:border-indigo-500'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Role selector (Inheritance demo) */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-800 mb-2">
              OOP Inheritance Role (Subclass)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer ${
                role === 'TEAM_MEMBER' 
                  ? 'bg-indigo-50/70 border-indigo-400 text-indigo-900 ring-1 ring-indigo-200' 
                  : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <input
                  type="radio"
                  name="role"
                  value="TEAM_MEMBER"
                  checked={role === 'TEAM_MEMBER'}
                  onChange={() => setRole('TEAM_MEMBER')}
                  className="hidden"
                />
                <User className="w-4 h-4 text-indigo-600" />
                <div className="text-left">
                  <div className="text-xs font-bold">Team Member</div>
                  <div className="text-[10px] text-slate-500">Developer/Tester</div>
                </div>
              </label>

              <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer ${
                role === 'TEAM_LEAD' 
                  ? 'bg-purple-50 border-purple-400 text-purple-900 ring-1 ring-purple-200' 
                  : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <input
                  type="radio"
                  name="role"
                  value="TEAM_LEAD"
                  checked={role === 'TEAM_LEAD'}
                  onChange={() => setRole('TEAM_LEAD')}
                  className="hidden"
                />
                <Shield className="w-4 h-4 text-purple-600" />
                <div className="text-left">
                  <div className="text-xs font-bold">Team Lead</div>
                  <div className="text-[10px] text-slate-500">Tier-1 Architect</div>
                </div>
              </label>
            </div>
          </div>

          {/* Department & Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-indigo-500"
              >
                <option value="Frontend & UI">Frontend & UI</option>
                <option value="Backend & Spring Boot">Backend & Spring Boot</option>
                <option value="Database & PostgreSQL">Database & PostgreSQL</option>
                <option value="QA & Testing">QA & Testing</option>
                <option value="Full Stack & Architecture">Full Stack & Architecture</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Contact
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Avatar selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Choose Avatar
            </label>
            <div className="flex items-center gap-3">
              {sampleAvatars.map((url, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setAvatarUrl(url)}
                  className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-transform ${
                    avatarUrl === url ? 'border-indigo-600 scale-110 shadow-xs' : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img src={url} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
            >
              {initialMember ? 'Save Changes' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
