import React from 'react';

const SensoryCheckIn = ({ sensoryNeeds, onSensoryUpdate }) => {
  const sensoryOptions = [
    { id: 'noise', emoji: '🔊', label: 'Too Noisy', tip: 'Try noise-canceling headphones or a quieter space' },
    { id: 'light', emoji: '💡', label: 'Too Bright', tip: 'Dim the lights or try sunglasses indoors' },
    { id: 'texture', emoji: '👕', label: 'Uncomfortable Textures', tip: 'Change to your most comfortable clothes' },
    { id: 'temperature', emoji: '🌡️', label: 'Temperature Issues', tip: 'Adjust your environment for comfort' },
    { id: 'crowded', emoji: '👥', label: 'Feeling Crowded', tip: 'Find a quiet space just for you' },
    { id: 'hungry', emoji: '🍎', label: 'Need Snack/Water', tip: 'Nourish your body - it deserves care' }
  ];

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
        {sensoryOptions.map((option) => (
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
            const option = sensoryOptions.find(opt => opt.id === needId);
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