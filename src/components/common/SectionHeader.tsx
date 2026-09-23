import React from 'react';
import { Badge } from './Badge';

interface SectionHeaderProps {
  badgeText?: string;
  badgeVariant?: 'blue' | 'cyan' | 'emerald' | 'purple' | 'neutral' | 'pink';
  title: string;
  highlightText?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  badgeVariant = 'blue',
  title,
  highlightText,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={`flex flex-col ${alignmentClass[align]} max-w-3xl mx-auto mb-14 md:mb-20 ${className}`}>
      {badgeText && (
        <Badge variant={badgeVariant} size="md" className="mb-4">
          {badgeText}
        </Badge>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
        {title}{' '}
        {highlightText && (
          <span className="gradient-text-edsols block sm:inline mt-1 sm:mt-0 font-black">
            {highlightText}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}

      {/* Decorative subtle tech coordinate line */}
      <div className="mt-6 flex items-center gap-2 opacity-70">
        <span className="h-[1.5px] w-12 bg-gradient-to-r from-transparent to-rose-600" />
        <span className="h-2 w-2 rounded-full bg-rose-600" />
        <span className="h-[1.5px] w-12 bg-gradient-to-l from-transparent to-rose-400" />
      </div>
    </div>
  );
};
