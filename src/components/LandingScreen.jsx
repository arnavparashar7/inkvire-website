import React, { useState, useEffect } from 'react';
import { Button } from './form/Button';

export function LandingScreen({ onOpenForm }) {
  // Live UTC timestamp updater for authentic archival atmosphere
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="landing-viewport" role="main">
      {/* Top Header / Wordmark */}
      <header className="landing-header" role="banner">
        <div className="wordmark-container">
          <img 
            src="/inkvire-avatar.png" 
            alt="INKVIRE Insignia" 
            className="wordmark-avatar"
            width="32"
            height="32" 
          />
          <span className="wordmark-text">INKVIRE</span>
        </div>

        <div className="header-status-pill" role="status" aria-live="polite">
          <span className="pulsing-dot" aria-hidden="true" />
          <span>[ ARCHIVE PROTOCOL // OPEN ]</span>
        </div>
      </header>

      {/* Main Hero Block (Positioned left with generous negative space) */}
      <section className="landing-main" aria-labelledby="hero-title">
        <div className="landing-eyebrow">
          INKVIRE / ACCESS REQUEST
        </div>

        <h1 id="hero-title" className="landing-title">
          LEAVE YOUR<br />MARK.
        </h1>

        <p className="landing-description">
          Some things are not meant to disappear. Enter the archive and make your presence known.
        </p>

        <div className="landing-cta-row">
          <Button 
            variant="primary" 
            onClick={onOpenForm}
            className="landing-cta-button"
            ariaLabel="Request access to the INKVIRE archive"
          >
            REQUEST ACCESS ➔
          </Button>
          <span className="cta-auxiliary-note">
            TRANSMISSION WINDOW : UNRESTRICTED
          </span>
        </div>
      </section>

      {/* Bottom Technical Metadata Bar */}
      <footer className="landing-footer" role="contentinfo">
        <div className="metadata-group">
          <span className="metadata-item">
            COORDINATES: <strong>44°07'N 71°18'W</strong>
          </span>
          <span className="metadata-item">
            EPOCH: <strong>04.88</strong>
          </span>
          <span className="metadata-item">
            NODE: <strong>ALPHA-7 // SECURE</strong>
          </span>
        </div>

        <div className="metadata-group">
          <span className="metadata-item metadata-badge-archive">
            TIMESTAMP: <strong>{utcTime || 'SYNCHRONIZING...'}</strong>
          </span>
        </div>
      </footer>
    </main>
  );
}
