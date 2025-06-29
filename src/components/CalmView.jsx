import React, { useState } from 'react';
import CalmTools from './CalmTools';

const CalmView = () => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [showTools, setShowTools] = useState(false);

  const motivationalQuotes = [
    "Your neurodivergent brain is a superpower, and today you're showing just how amazing it is! 🌟",
    "Progress isn't about being perfect - it's about being kind to yourself along the way 💜",
    "Every small step you take matters more than you know. You're doing beautifully! 🌸",
    "Your unique way of seeing the world makes it brighter for everyone around you 🌈",
    "Take it one gentle moment at a time. You have everything you need within you ✨",
    "Your sensitivity is not a weakness - it's a gift that helps you understand the world deeply 🦋"
  ];

  const [currentQuote] = useState(
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
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
          <p className="breathing-text">Breathe with kindness... You deserve this peace...</p>
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
        >
          {isPlayingSound ? '⏸️ Pause' : '▶️ Play'} Soothing Sounds
        </button>
        {isPlayingSound && (
          <p className="sound-status">🎵 Gentle nature sounds are embracing you...</p>
        )}
      </div>

      <div className="tools-invitation">
        <div className="invitation-content">
          <h3>Need a Little Extra Support?</h3>
          <p>Sometimes we need gentle tools to help us through difficult moments. Would you like to explore some calming techniques?</p>
          <button 
            onClick={() => setShowTools(true)}
            className="tools-button"
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