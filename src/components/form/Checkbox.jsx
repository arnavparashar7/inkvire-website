import React from 'react';

/**
 * Brutalist Gothic Checkbox with sharp red check indicator and accessible labels
 */
export function Checkbox({
  id,
  name,
  checked,
  onChange,
  label,
  description = null,
  required = false,
  error = null,
  disabled = false
}) {
  return (
    <div className="form-field" style={{ marginBottom: '14px' }}>
      <label className="checkbox-field" htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="sr-only"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <div className="checkbox-box" aria-hidden="true">
          {checked && <span className="checkbox-mark">✓</span>}
        </div>
        <div className="checkbox-content">
          <span className="checkbox-label">
            {label}
            {required && <span className="form-label-required" aria-hidden="true">*</span>}
          </span>
          {description && <span className="checkbox-description">{description}</span>}
        </div>
      </label>

      {error && (
        <div id={`${id}-error`} className="form-error" role="alert" style={{ marginTop: '0' }}>
          {error}
        </div>
      )}
    </div>
  );
}
