import React from 'react';

const MoodReflection = ({ reflection, onReflectionChange }) => {
  const prompts = [
    "What's one small thing that contributed to this feeling?",
    "If this feeling had a color, what would it be?",
    "What would you tell a friend feeling this way?",
    "What does your body need right now?",
    "What's one gentle thing you can do for yourself?"
  ];

  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

  return (
    <div className="mood-reflection">
      <h3>A Moment of Reflection</h3>
      <p className="reflection-prompt">{randomPrompt}</p>
      
      <textarea
        value={reflection}
        onChange={(e) => onReflectionChange(e.target.value)}
        placeholder="Your thoughts are safe here... (optional)"
        className="reflection-input"
        rows="3"
      />
      
      {reflection && (
        <div className="reflection-acknowledgment">
          <p>💜 Thank you for taking time to understand yourself. That's a beautiful act of self-compassion.</p>
        </div>
      )}
    </div>
  );
};

export default MoodReflection;