import React from 'react';

/**
 * Atmospheric Background Viewport
 * Wide-format INKVIRE artwork with layered gradient vignettes and directional shading
 */
export function Background({ mode = 'landing' }) {
  const isFormMode = mode === 'form';

  return (
    <div className="bg-viewport-container" aria-hidden="true">
      {/* Hero Dark Fantasy Artwork Layer */}
      <div 
        className={`bg-artwork ambient-drift ${isFormMode ? 'mode-form' : ''}`} 
      />

      {/* Layer 1: Vertical Top & Bottom Gradients */}
      <div className="bg-overlay-vertical" />

      {/* Layer 2: Left-to-Right Shading for Editorial Typography Contrast */}
      <div className="bg-overlay-horizontal" />

      {/* Layer 3: Perimeter Vignette */}
      <div className="bg-overlay-vignette" />

      {/* Layer 4: Form Center Backing Shading (active during form stage) */}
      <div className="bg-overlay-form-focus" />
    </div>
  );
}
