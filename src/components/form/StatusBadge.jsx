import React from 'react';

/**
 * Status Badge for sections and protocol indicators
 */
export function StatusBadge({ status, variant = 'default' }) {
  let badgeClass = 'status-badge';

  if (variant === 'red' || status === 'REQUIRED' || status === 'LOCKED') {
    badgeClass += ' status-red';
  } else if (variant === 'green' || status === 'VALIDATED' || status === 'COMPLETE') {
    badgeClass += ' status-green';
  } else if (variant === 'active' || status === 'CURRENT' || status === 'ACTIVE') {
    badgeClass += ' status-active';
  }

  return (
    <span className={badgeClass}>
      {variant === 'red' && <span className="pulsing-dot" aria-hidden="true" />}
      {status}
    </span>
  );
}
