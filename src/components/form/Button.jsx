import React from 'react';

/**
 * Brutalist Button Component
 * Primary: Bone-white rectangular with dark text
 * Secondary: Dark elevated surface with subtle border
 * Ghost: Transparent text link button
 */
export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'ghost'
  disabled = false,
  loading = false,
  className = '',
  ariaLabel
}) {
  const getButtonClass = () => {
    switch (variant) {
      case 'secondary':
        return 'btn btn-secondary';
      case 'ghost':
        return 'btn btn-ghost';
      case 'primary':
      default:
        return 'btn btn-primary';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      className={`${getButtonClass()} ${className}`}
    >
      {loading && (
        <span 
          style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite'
          }} 
          aria-hidden="true" 
        />
      )}
      <span>{children}</span>
    </button>
  );
}
