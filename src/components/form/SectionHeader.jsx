import React from 'react';
import { StatusBadge } from './StatusBadge';

/**
 * Section Header with code identifier, title, description, and status tag
 */
export function SectionHeader({
  code,
  title,
  description,
  status = 'INCOMPLETE',
  variant = 'default'
}) {
  return (
    <div className="section-header-block">
      <div className="section-eyebrow-row">
        <span className="section-code-id">{code}</span>
        <StatusBadge status={status} variant={variant} />
      </div>
      <h2 className="section-heading-title">{title}</h2>
      {description && <p className="section-description-text">{description}</p>}
    </div>
  );
}
