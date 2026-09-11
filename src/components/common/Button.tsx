import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-4 py-2.5 text-sm rounded-xl gap-2 font-medium',
    lg: 'px-6 py-3.5 text-base rounded-xl gap-2.5 font-semibold',
  }[size];

  const variantClasses = {
    primary:
      'bg-indigo-900 hover:bg-indigo-950 text-white shadow-sm hover:shadow transition-all duration-150 active:scale-[0.99] focus:ring-2 focus:ring-indigo-500/30',
    secondary:
      'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow transition-all duration-150 active:scale-[0.99] focus:ring-2 focus:ring-blue-500/30',
    outline:
      'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm transition-all duration-150 active:scale-[0.99]',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-600 transition-colors',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-all duration-150',
  }[variant];

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};
