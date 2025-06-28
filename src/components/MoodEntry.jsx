import React from 'react';

const MoodEntry = ({ mood, onSelect }) => {
  const moods = [
    { emoji: "😊", label: "Happy", color: "#FFD93D" },
    { emoji: "😐", label: "Neutral", color: "#A8A8A8" },
    { emoji: "😢", label: "Sad", color: "#6BB6FF" },
    { emoji: "😡", label: "Frustrated", color: "#FF6B6B" },
    { emoji: "😴", label: "Tired", color: "#B19CD9" },
    { emoji: "😰", label: "Anxious", color: "#FFB347" },
    { emoji: "🤗", label: "Excited", color: "#FF69B4" },
    { emoji: "😌", label: "Calm", color: "#98D8C8" }
  ];

  return (
    <div className="mood-entry">
      <div className="mood-grid">
        {moods.map((m, index) => (
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