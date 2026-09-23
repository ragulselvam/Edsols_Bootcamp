import React from 'react';

export interface BrandLogoProps {
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  variant?: 'full' | 'emblem';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => void;
  href?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  theme = 'light',
  size = 'md',
  showTagline = true,
  variant = 'full',
  className = '',
  onClick,
  href,
}) => {
  const isDark = theme === 'dark';

  const sizeClasses = {
    sm: variant === 'emblem' ? 'h-8 w-8' : 'h-8 sm:h-9',
    md: variant === 'emblem' ? 'h-10 sm:h-11' : 'h-10 sm:h-12',
    lg: variant === 'emblem' ? 'h-12 w-12' : 'h-14 sm:h-16',
  }[size];

  const logoSrc = variant === 'emblem'
    ? '/edsols-emblem.svg'
    : showTagline
      ? isDark
        ? '/edsols-logo-dark.svg'
        : '/edsols-logo.svg'
      : isDark
        ? '/edsols-logo-dark.svg'
        : '/nav-logo.svg';

  const content = (
    <div className={`inline-flex items-center group focus:outline-none select-none ${className}`}>
      <img
        src={logoSrc}
        alt="EDSOLS Innovations - Robotics | IoT | AI"
        className={`${sizeClasses} w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm`}
        loading="eager"
      />
    </div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="inline-flex focus:outline-none">
        {content}
      </a>
    );
  }

  return (
    <div onClick={onClick} className="inline-flex cursor-default">
      {content}
    </div>
  );
};
