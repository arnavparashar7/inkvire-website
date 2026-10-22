import React, { useRef, useState } from 'react';

/**
 * Brutalist Gothic File Upload component with drag-and-drop & size validation
 */
export function FileUpload({
  id = 'artifact-file',
  label = 'Artifact Transmission Specimen',
  helper = 'Accepted: PNG, JPG, WEBP, PDF, ZIP (Max 15MB)',
  file,
  onFileSelect,
  onFileRemove,
  error = null,
  maxSizeBytes = 15 * 1024 * 1024,
  accept = '.png,.jpg,.jpeg,.webp,.pdf,.zip,.txt',
  disabled = false
}) {
  const inputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [localError, setLocalError] = useState(null);

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  const handleFiles = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.size > maxSizeBytes) {
      setLocalError(`Specimen size exceeds maximum allowable limit (${(maxSizeBytes / (1024 * 1024)).toFixed(0)}MB).`);
      return;
    }

    setLocalError(null);
    onFileSelect(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const displayError = error || localError;

  return (
    <div className="form-field">
      <div className="form-label">
        <label htmlFor={id}>
          <span>{label}</span>
          <span className="form-label-optional"> (optional if URL provided)</span>
        </label>
      </div>

      <input
        ref={inputRef}
        type="file"
        id={id}
        name={id}
        accept={accept}
        disabled={disabled}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files[0]);
          }
        }}
        className="sr-only"
        aria-invalid={Boolean(displayError)}
      />

      {!file ? (
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload specimen file"
          onClick={() => !disabled && inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`dropzone-container ${isDragOver ? 'is-dragover' : ''} ${displayError ? 'has-error' : ''}`}
        >
          <div className="dropzone-icon" aria-hidden="true">☩</div>
          <div className="dropzone-text">Click or drag transmission specimen here</div>
          <div className="dropzone-subtext">{helper}</div>
        </div>
      ) : (
        <div className="uploaded-file-preview">
          <div className="file-info">
            <span className="file-specimen-badge">ATTACHED</span>
            <div>
              <div className="file-name" title={file.name}>{file.name}</div>
              <div className="file-size">{formatFileSize(file.size)}</div>
            </div>
          </div>
          <button
            type="button"
            className="btn-remove-file"
            onClick={onFileRemove}
            aria-label="Remove uploaded specimen"
            title="Remove specimen"
          >
            ✕
          </button>
        </div>
      )}

      {displayError && (
        <div className="form-error" role="alert">
          {displayError}
        </div>
      )}
    </div>
  );
}
