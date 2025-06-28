import React from 'react';

const MoodEntry = ({ mood, onSelect }) => {
  const moods = ["😊", "😐", "😢", "😡", "😴"];

  return (
    <div>
      <h3>How are you feeling?</h3>
      <div className="mood-row">
        {moods.map((m, index) => (
          <button
            key={index}
            onClick={() => onSelect(m)}
            className={mood === m ? "active" : ""}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodEntry;
