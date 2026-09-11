import React from 'react';
import { SignalStatus } from '../../types';

interface BadgeProps {
  status?: SignalStatus | 'verified' | 'pending' | 'flagged' | 'In Progress' | 'Completed' | 'Open' | 'Good foundation' | string;
  className?: string;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ status, className = '', children }) => {
  const text = children || status;

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  if (status === 'Strong' || status === 'verified' || status === 'Completed' || status === 'Good foundation') {
    colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (status === 'Moderate' || status === 'In Progress' || status === 'pending') {
    colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (status === 'Needs improvement' || status === 'flagged') {
    colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorClasses} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          colorClasses.includes('emerald')
            ? 'bg-emerald-500'
            : colorClasses.includes('amber')
            ? 'bg-amber-500'
            : colorClasses.includes('rose')
            ? 'bg-rose-500'
            : 'bg-slate-400'
        }`}
      />
      {text}
    </span>
  );
};
