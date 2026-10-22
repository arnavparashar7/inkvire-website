import React from 'react';

/**
 * Accessible Brutalist Text Input with persistent label and red focus states
 */
export function TextInput({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error = null,
  type = 'text',
  helper = null,
  disabled = false,
  autoComplete = 'off',
  maxLength
}) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        <span>
          {label}
          {required ? <span className="form-label-required" aria-hidden="true">*</span> : <span className="form-label-optional"> (optional)</span>}
        </span>
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
        className={`input-text ${error ? 'has-error' : ''}`}
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
