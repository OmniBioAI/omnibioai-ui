import React from 'react';
import './StatusDot.css';

interface StatusDotProps {
  status: 'up' | 'down' | 'init' | 'warn';
  label?: string;
  pulse?: boolean;
}

export function StatusDot({ status, label, pulse = false }: StatusDotProps) {
  const classes = [
    'omni-status-dot',
    `omni-status-dot--${status}`,
    pulse ? 'omni-status-dot--pulse' : '',
  ].filter(Boolean).join(' ');

  return (
    <span className="omni-status-dot-wrap">
      <span className={classes} />
      {label && <span className="omni-status-dot-label">{label}</span>}
    </span>
  );
}
