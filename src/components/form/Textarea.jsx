import React from 'react';

/**
 * Accessible Brutalist Textarea with character counter and persistent label
 */
export function Textarea({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error = null,
  helper = null,
  disabled = false,
  rows = 4,
  maxLength = 800,
  showCount = true
}) {
  const currentLength = value ? value.length : 0;

  return (
    <div className="form-field">
      <div className="form-label">
        <label htmlFor={id}>
          {label}
          {required ? <span className="form-label-required" aria-hidden="true">*</span> : <span className="form-label-optional"> (optional)</span>}
        </label>
        {showCount && (
          <span className="char-counter" aria-live="polite">
            {currentLength}/{maxLength}
          </span>
        )}
      </div>

      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
        className={`input-textarea ${error ? 'has-error' : ''}`}
      />

      {helper && !error && (
        <span id={`${id}-helper`} className="form-helper">
          {helper}
        </span>
      )}

      {error && (
        <div id={`${id}-error`} className="form-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
