import React from 'react';

const EnergyTracker = ({ energy, onEnergySelect }) => {
  const energyLevels = [
    { level: 1, emoji: "🪫", label: "Drained", description: "Need lots of gentle rest" },
    { level: 2, emoji: "🔋", label: "Low", description: "Taking it very easy today" },
    { level: 3, emoji: "🔋", label: "Medium", description: "Steady and mindful energy" },
    { level: 4, emoji: "🔋", label: "Good", description: "Feeling capable and ready" },
    { level: 5, emoji: "⚡", label: "High", description: "Energized and motivated!" }
  ];

  return (
    <div className="energy-tracker">
      <h3>How's your energy feeling?</h3>
      <p className="energy-subtitle">Your energy levels are valid, whatever they are today 💜</p>
      
      <div className="energy-grid">
        {energyLevels.map((e) => (
          <button
            key={e.level}
            onClick={() => onEnergySelect(e.level)}
            className={`energy-button ${energy === e.level ? "active" : ""}`}
            title={e.description}
          >
            <span className="energy-emoji">{e.emoji}</span>
            <span className="energy-label">{e.label}</span>
          </button>
        ))}
      </div>
      
      {energy && (
        <div className="current-energy">
          <p>Your energy today: <span className="energy-display">{energyLevels[energy - 1].label}</span></p>
          <p className="energy-description">{energyLevels[energy - 1].description}</p>
        </div>
      )}
    </div>
  );
};

export default EnergyTracker;