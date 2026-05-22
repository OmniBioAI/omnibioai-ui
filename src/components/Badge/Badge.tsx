import React from 'react';
import './Badge.css';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  children: React.ReactNode;
}

export function Badge({ variant = 'default', children }: BadgeProps) {
  return (
    <span className={`omni-badge omni-badge--${variant}`}>
      {children}
    </span>
  );
}
