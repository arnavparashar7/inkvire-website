import React from 'react';

/**
 * Subtle Live Film Grain Overlay
 * Simulates printed illustration or scanned parchment texture.
 * Respects prefers-reduced-motion, pointer-events: none, aria-hidden: true.
 */
export function GrainOverlay() {
  return (
    <div 
      className="grain-overlay" 
      aria-hidden="true" 
      role="presentation"
    />
  );
}
