import React, { useState } from 'react';
import { MOTIVATIONAL_QUOTES } from '../utils/constants';
import CalmTools from './CalmTools';

const CalmView = () => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [showTools, setShowTools] = useState(false);

  const [currentQuote] = useState(
    MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]
  );

  const toggleCalmSound = () => {
    setIsPlayingSound(!isPlayingSound);
    // In a real app, you'd play/pause actual audio here
  };

  if (showTools) {
    return (
      <div className="calm-tab">
        <div className="calm-header">
          <button 
            onClick={() => setShowTools(false)}
            className="back-button"
            aria-label="Back to calm space"
          >
            ← Back to Calm Space
          </button>
        </div>
        <CalmTools />
      </div>
    );
  }

  return (
    <div className="calm-tab">
      <h2>Take a Gentle Moment for Yourself</h2>
      
      <div className="breathing-section">
        <div className="breathing-circle">
          <div className="breathing-animation"></div>
          <p className="breathing-text">
            Breathe with kindness... You deserve this peace...
          </p>
        </div>
      </div>
      
      <div className="quote-section">
        <blockquote className="motivational-quote">
          "{currentQuote}"
        </blockquote>
      </div>
      
      <div className="sound-section">
        <button 
          className={`sound-button ${isPlayingSound ? 'playing' : ''}`}
          onClick={toggleCalmSound}
          aria-label={isPlayingSound ? 'Pause soothing sounds' : 'Play soothing sounds'}
          aria-pressed={isPlayingSound}
        >
          {isPlayingSound ? '⏸️ Pause' : '▶️ Play'} Soothing Sounds
        </button>
        {isPlayingSound && (
          <p className="sound-status" aria-live="polite">
            🎵 Gentle nature sounds are embracing you...
          </p>
        )}
      </div>

      <div className="tools-invitation">
        <div className="invitation-content">
          <h3>Need a Little Extra Support?</h3>
          <p>
            Sometimes we need gentle tools to help us through difficult moments. 
            Would you like to explore some calming techniques designed specifically 
            for neurodivergent minds?
          </p>
          <button 
            onClick={() => setShowTools(true)}
            className="tools-button"
            aria-label="Explore gentle calming tools"
          >
            Explore Gentle Tools 🌱
          </button>
          <p className="invitation-note">Only if it feels right for you right now</p>
        </div>
      </div>
    </div>
  );
};

export default CalmView;