import React from 'react';

const MoodEntry = ({ mood, onSelect }) => {
  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😡", label: "Frustrated" },
    { emoji: "😴", label: "Tired" },
    { emoji: "😰", label: "Anxious" },
    { emoji: "🤗", label: "Excited" },
    { emoji: "😌", label: "Calm" }
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