import React from 'react';

/**
 * Accessible Brutalist Select Field with dark option items and custom arrow
 */
export function SelectField({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select option...',
  required = false,
  error = null,
  helper = null,
  disabled = false
}) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        <span>
          {label}
          {required ? <span className="form-label-required" aria-hidden="true">*</span> : <span className="form-label-optional"> (optional)</span>}
        </span>
      </label>

      <div className="select-wrapper">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
          className={`input-select ${error ? 'has-error' : ''}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} style={{ background: '#171416', color: '#F0E7DC' }}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="select-arrow" aria-hidden="true">▼</span>
      </div>

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
