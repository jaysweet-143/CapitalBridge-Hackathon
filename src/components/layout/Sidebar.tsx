import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileCheck2,
  TrendingUp,
  Sparkles,
  GitCompare,
  MessageSquareCode,
  ShieldAlert,
  UserCheck,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { mockUser } from '../../data/mockData';
import { mockMomoService } from '../../services/mockMomoService';

export const Sidebar: React.FC = () => {
  const momoState = mockMomoService.getConnectionState();

  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/evidence', label: 'Evidence', icon: FileCheck2 },
    { to: '/readiness', label: 'Readiness', icon: TrendingUp },
    { to: '/improvement', label: 'Improvement Plan', icon: Sparkles },
    { to: '/what-if', label: 'What-If Simulator', icon: GitCompare },
    { to: '/coach', label: 'AI Coach', icon: MessageSquareCode },
    { to: '/passport', label: 'Financial Passport', icon: ShieldAlert },
    { to: '/settings', label: 'Profile & Settings', icon: UserCheck },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0 shrink-0 border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <img src="/logo.svg" alt="CapitalBridge" className="w-9 h-9" />
        <div>
          <h1 className="text-base font-bold tracking-tight text-white m-0 leading-tight">
            CapitalBridge
          </h1>
          <p className="text-[11px] text-slate-400 m-0">Turn Activity into Opportunity</p>
        </div>
      </div>

      {/* Business context mini-card */}
      <div className="mx-3 mt-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-white truncate">
              {mockUser.businessName}
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              {mockUser.firstName} {mockUser.lastName}
            </div>
          </div>
        </div>
        <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
          Woman-Owned
        </span>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
          Financial Intelligence
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* MoMo Connection Status Badge */}
      <div className="p-3 border-t border-slate-800">
        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/70">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-slate-300">
              {momoState.providerName || 'Simulated MoMo'}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected
            </span>
          </div>
          <p className="text-[11px] text-slate-400 m-0">
            Synced {momoState.lastSyncedAt || 'Today'}
          </p>
          <NavLink
            to="/connect-momo"
            className="mt-2 text-[11px] text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
          >
            Manage bridge <ExternalLink className="w-3 h-3" />
          </NavLink>
        </div>
      </div>
    </aside>
  );
};
