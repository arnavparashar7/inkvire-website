import React, { useState, useEffect } from 'react';
import { Background } from './components/Background';
import { GrainOverlay } from './components/GrainOverlay';
import { LandingScreen } from './components/LandingScreen';
import { ApplicationForm } from './components/ApplicationForm';

// Stylesheets
import './styles/tokens.css';
import './styles/base.css';
import './styles/background.css';
import './styles/grain.css';
import './styles/components.css';
import './styles/landing.css';
import './styles/form.css';

export function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'form'

  // Support ESC key to return to landing if in form
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && currentView === 'form') {
        setCurrentView('landing');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView]);

  return (
    <div className="app-container" style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      {/* Visual Atmospheric Hero Background & Overlays */}
      <Background mode={currentView} />

      {/* Subtle Live Film Grain Texture */}
      <GrainOverlay />

      {/* Two-Stage Application Flow */}
      {currentView === 'landing' ? (
        <LandingScreen onOpenForm={() => {
          setCurrentView('form');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />
      ) : (
        <ApplicationForm onBackToLanding={() => {
          setCurrentView('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} />
      )}
    </div>
  );
}

export default App;
