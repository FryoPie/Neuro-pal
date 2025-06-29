import React, { useState, useEffect } from 'react';

const MoodReflection = ({ reflection, onReflectionChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [charCount, setCharCount] = useState(0);

  const prompts = [
    "What's one small thing that contributed to this feeling?",
    "If this feeling had a color, what would it be?",
    "What would you tell a friend feeling this way?",
    "What does your body need right now?",
    "What's one gentle thing you can do for yourself?",
    "What thoughts are accompanying this feeling?",
    "How might this feeling be trying to help you?",
    "What would make this moment feel a little easier?",
    "What are you grateful for in this moment?",
    "How can you honor this feeling without judgment?"
  ];

  const [currentPrompt] = useState(
    prompts[Math.floor(Math.random() * prompts.length)]
  );

  // Auto-save functionality
  useEffect(() => {
    if (reflection && reflection.length > 0) {
      const saveTimer = setTimeout(() => {
        setLastSaved(new Date());
      }, 2000); // Save 2 seconds after user stops typing

      return () => clearTimeout(saveTimer);
    }
  }, [reflection]);

  // Update character count
  useEffect(() => {
    setCharCount(reflection ? reflection.length : 0);
  }, [reflection]);

  const handleReflectionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 280) {
      onReflectionChange(value);
    }
  };

  const formatTimestamp = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="mood-reflection">
      <div className="reflection-header">
        <h3>A Moment of Reflection</h3>
        <button
          className="expand-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Collapse reflection" : "Expand reflection"}
          aria-expanded={isExpanded}
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="reflection-content">
          <p className="reflection-prompt">{currentPrompt}</p>
          
          <div className="reflection-input-container">
            <textarea
              value={reflection || ''}
              onChange={handleReflectionChange}
              placeholder="Your thoughts are safe here... (optional)"
              className="reflection-input expandable"
              rows="4"
              aria-describedby="char-count reflection-help"
              aria-label="Reflection text area"
            />
            
            <div className="input-footer">
              <div className="char-counter">
                <span 
                  id="char-count" 
                  className={charCount > 250 ? 'warning' : ''}
                  aria-live="polite"
                >
                  {charCount}/280
                </span>
              </div>
              
              {lastSaved && (
                <div className="auto-save-indicator" aria-live="polite">
                  <span className="save-icon">💾</span>
                  <span className="save-text">
                    Saved at {formatTimestamp(lastSaved)}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <p id="reflection-help" className="reflection-help">
            This space is for you to explore your feelings without judgment. 
            Your reflections are private and help you understand your emotional patterns.
          </p>
          
          {reflection && reflection.length > 0 && (
            <div className="reflection-acknowledgment">
              <div className="acknowledgment-content">
                <span className="acknowledgment-icon">💜</span>
                <p>Thank you for taking time to understand yourself. That's a beautiful act of self-compassion.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MoodReflection;