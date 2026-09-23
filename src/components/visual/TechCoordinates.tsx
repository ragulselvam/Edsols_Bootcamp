import React from 'react';

interface TechCoordinatesProps {
  label?: string;
  value?: string;
  status?: 'ACTIVE' | 'ONLINE' | 'VERIFIED' | 'READY';
  className?: string;
}

export const TechCoordinates: React.FC<TechCoordinatesProps> = ({
  label = 'EDGE::AI',
  value = '2026.Q4',
  status = 'ONLINE',
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-wider text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm ${className}`}
    >
      <span className="text-rose-600 font-bold">{label}</span>
      <span className="text-slate-300">/</span>
      <span className="text-slate-700 font-medium">{value}</span>
      <span className="text-slate-300">/</span>
      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        {status}
      </span>
    </div>
  );
};
