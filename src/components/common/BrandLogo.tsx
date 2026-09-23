import React from 'react';

export interface BrandLogoProps {
  theme?: 'light' | 'dark';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  variant?: 'full' | 'emblem';
  className?: string;
  imgClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => void;
  href?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  theme = 'light',
  size = 'md',
  showTagline = true,
  variant = 'full',
  className = '',
  imgClassName = '',
  onClick,
  href,
}) => {
  const isDark = theme === 'dark';

  const sizeClasses = {
    xs: variant === 'emblem' ? 'h-5 w-5' : 'h-5 sm:h-6',
    sm: variant === 'emblem' ? 'h-7 w-7' : 'h-6 sm:h-7',
    md: variant === 'emblem' ? 'h-9 sm:h-10' : 'h-8 sm:h-9',
    lg: variant === 'emblem' ? 'h-11 w-11 sm:h-12 sm:w-12' : 'h-10 sm:h-12',
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
        className={`${imgClassName || sizeClasses} w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm`}
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
