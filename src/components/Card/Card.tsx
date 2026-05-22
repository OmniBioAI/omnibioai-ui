import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
  padding?: string;
}

export function Card({ children, title, actions, padding }: CardProps) {
  return (
    <div className="omni-card" style={padding ? { padding } : undefined}>
      {(title || actions) && (
        <div className="omni-card__header">
          {title && <div className="omni-card__title">{title}</div>}
          {actions && <div className="omni-card__actions">{actions}</div>}
        </div>
      )}
      <div className="omni-card__body">{children}</div>
    </div>
  );
}
