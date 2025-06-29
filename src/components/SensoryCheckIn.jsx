import React from 'react';
import { SENSORY_OPTIONS } from '../utils/constants';

const SensoryCheckIn = ({ sensoryNeeds, onSensoryUpdate }) => {
  const toggleSensory = (sensoryId) => {
    const updated = sensoryNeeds.includes(sensoryId)
      ? sensoryNeeds.filter(id => id !== sensoryId)
      : [...sensoryNeeds, sensoryId];
    onSensoryUpdate(updated);
  };

  return (
    <div className="sensory-checkin">
      <h3>Sensory Check-In</h3>
      <p className="sensory-subtitle">Your sensory needs matter. Let's make sure you're comfortable 🤗</p>
      
      <div className="sensory-grid">
        {SENSORY_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => toggleSensory(option.id)}
            className={`sensory-button ${sensoryNeeds.includes(option.id) ? "active" : ""}`}
            title={option.tip}
          >
            <span className="sensory-emoji">{option.emoji}</span>
            <span className="sensory-label">{option.label}</span>
          </button>
        ))}
      </div>
      
      {sensoryNeeds.length > 0 && (
        <div className="sensory-tips">
          <h4>Gentle Suggestions:</h4>
          {sensoryNeeds.map(needId => {
            const option = SENSORY_OPTIONS.find(opt => opt.id === needId);
            return (
              <div key={needId} className="sensory-tip">
                <span className="tip-emoji">{option.emoji}</span>
                <span className="tip-text">{option.tip}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SensoryCheckIn;