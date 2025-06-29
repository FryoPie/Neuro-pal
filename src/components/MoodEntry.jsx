import React from 'react';
import { MOOD_OPTIONS } from '../utils/constants';

const MoodEntry = ({ mood, onSelect }) => {
  return (
    <div className="mood-entry">
      <div className="mood-grid">
        {MOOD_OPTIONS.map((m, index) => (
          <button
            key={index}
            onClick={() => onSelect(m.emoji)}
            className={`mood-button ${mood === m.emoji ? "active" : ""}`}
            title={m.label}
            style={{
              '--mood-color': m.color,
              '--mood-color-light': m.color + '20'
            }}
          >
            <span className="mood-emoji">{m.emoji}</span>
            <span className="mood-label">{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodEntry;