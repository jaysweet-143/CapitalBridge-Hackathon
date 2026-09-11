import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { mockUser } from '../../data/mockData';

export const Navbar: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile brand trigger */}
        <NavLink to="/dashboard" className="md:hidden flex items-center gap-2">
          <img src="/logo.svg" alt="CapitalBridge" className="w-7 h-7" />
          <span className="font-bold text-slate-900 text-sm">CapitalBridge</span>
        </NavLink>

        {/* Prototype tag */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-800 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>GirlCode Hackathon Prototype</span>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 border-l border-slate-200 pl-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Explainable Financial Readiness Engine</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Simulated Quick Action */}
        <NavLink
          to="/what-if"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <span>Simulate Readiness</span>
          <span className="text-emerald-600 font-bold">+44</span>
        </NavLink>

        {/* User Pill */}
        <NavLink
          to="/settings"
          className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-900 leading-tight">
              {mockUser.firstName} {mockUser.lastName}
            </div>
            <div className="text-[10px] text-slate-500 leading-none">
              {mockUser.businessName}
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-900 to-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {mockUser.firstName[0]}
            {mockUser.lastName[0]}
          </div>
        </NavLink>
      </div>
    </header>
  );
};
