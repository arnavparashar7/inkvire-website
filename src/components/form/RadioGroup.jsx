import React from 'react';

/**
 * Brutalist Gothic Radio Group cards for selecting domains/crafts
 */
export function RadioGroup({
  name,
  label,
  value,
  onChange,
  options = [],
  required = false,
  error = null,
  helper = null,
  disabled = false
}) {
  return (
    <div className="form-field">
      <div className="form-label">
        <span>
          {label}
          {required ? <span className="form-label-required" aria-hidden="true">*</span> : <span className="form-label-optional"> (optional)</span>}
        </span>
      </div>

      <div 
        className="radio-cards-grid"
        role="radiogroup" 
        aria-label={label}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : helper ? `${name}-helper` : undefined}
      >
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => onChange(opt.value)}
              className={`radio-card ${isSelected ? 'is-selected' : ''}`}
            >
              {opt.code && <span className="radio-card-code">{opt.code}</span>}
              <span className="radio-card-title">{opt.label}</span>
            </button>
          );
        })}
      </div>

      {helper && !error && (
        <span id={`${name}-helper`} className="form-helper">
          {helper}
        </span>
      )}

      {error && (
        <div id={`${name}-error`} className="form-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
