import React from 'react';
import { ENERGY_LEVELS } from '../utils/constants';

const EnergyTracker = ({ energy, onEnergySelect }) => {
  return (
    <div className="energy-tracker">
      <h3>How's your energy feeling?</h3>
      <p className="energy-subtitle">Your energy levels are valid, whatever they are today 💜</p>
      
      <div className="energy-grid">
        {ENERGY_LEVELS.map((e) => (
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
          <p>Your energy today: <span className="energy-display">{ENERGY_LEVELS[energy - 1].label}</span></p>
          <p className="energy-description">{ENERGY_LEVELS[energy - 1].description}</p>
        </div>
      )}
    </div>
  );
};

export default EnergyTracker;