import React, { useState } from 'react';
import { MOOD_OPTIONS } from '../utils/constants';

const MoodEntry = ({ mood, onSelect }) => {
  const [showCustomMoodCreator, setShowCustomMoodCreator] = useState(false);
  const [customMood, setCustomMood] = useState({ emoji: '', label: '' });
  const [savedCustomMoods, setSavedCustomMoods] = useState(() => {
    const saved = localStorage.getItem('neuropal-custom-moods');
    return saved ? JSON.parse(saved) : [];
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Extended mood options including new ones
  const extendedMoodOptions = [
    ...MOOD_OPTIONS,
    { emoji: "🙂", label: "Relieved", color: "#7A9A8A" },
    { emoji: "😶", label: "Numb", color: "#A8A49B" },
    { emoji: "🤯", label: "Overwhelmed", color: "#B58A7A" },
    { emoji: "😠", label: "Irritated", color: "#A5705B" },
    { emoji: "😍", label: "Loved", color: "#8A9A7B" },
    { emoji: "🧘", label: "Calm Focused", color: "#7A9A8A" },
    ...savedCustomMoods
  ];

  // Common emojis for the picker
  const commonEmojis = [
    '😊', '😢', '😡', '😴', '😰', '🤗', '😌', '😐',
    '😶', '🤯', '😠', '😍', '🧘', '🥰', '😔', '😤',
    '🤔', '😬', '🙄', '😮', '🤐', '😵', '🤗', '🥺',
    '😇', '🤪', '😎', '🤓', '🥳', '😭', '🤬', '🥱'
  ];

  const handleCustomMoodSave = () => {
    if (customMood.emoji && customMood.label.trim()) {
      const newCustomMood = {
        emoji: customMood.emoji,
        label: customMood.label.trim(),
        color: "#8A9A5B", // Default sage color
        isCustom: true
      };
      
      const updatedCustomMoods = [...savedCustomMoods, newCustomMood];
      setSavedCustomMoods(updatedCustomMoods);
      localStorage.setItem('neuropal-custom-moods', JSON.stringify(updatedCustomMoods));
      
      // Select the new mood
      onSelect(newCustomMood.emoji);
      
      // Reset form
      setCustomMood({ emoji: '', label: '' });
      setShowCustomMoodCreator(false);
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setCustomMood(prev => ({ ...prev, emoji }));
    setShowEmojiPicker(false);
  };

  const removeCustomMood = (emojiToRemove) => {
    const updatedCustomMoods = savedCustomMoods.filter(m => m.emoji !== emojiToRemove);
    setSavedCustomMoods(updatedCustomMoods);
    localStorage.setItem('neuropal-custom-moods', JSON.stringify(updatedCustomMoods));
  };

  return (
    <div className="mood-entry">
      <div className="mood-grid">
        {extendedMoodOptions.map((m, index) => (
          <div key={`${m.emoji}-${index}`} className="mood-button-container">
            <button
              onClick={() => onSelect(m.emoji)}
              className={`mood-button ${mood === m.emoji ? "active" : ""}`}
              title={m.label}
              style={{
                '--mood-color': m.color,
                '--mood-color-light': m.color + '20'
              }}
              aria-label={`Select ${m.label} mood`}
            >
              <span className="mood-emoji">{m.emoji}</span>
              <span className="mood-label">{m.label}</span>
            </button>
            {m.isCustom && (
              <button
                className="remove-custom-mood"
                onClick={(e) => {
                  e.stopPropagation();
                  removeCustomMood(m.emoji);
                }}
                aria-label={`Remove custom mood ${m.label}`}
                title="Remove custom mood"
              >
                ×
              </button>
            )}
          </div>
        ))}
        
        {/* Add Custom Mood Button */}
        <button
          onClick={() => setShowCustomMoodCreator(true)}
          className="mood-button add-custom-mood"
          aria-label="Create custom mood"
          title="Create your own mood"
        >
          <span className="mood-emoji">➕</span>
          <span className="mood-label">Custom</span>
        </button>
      </div>

      {/* Custom Mood Creator Modal */}
      {showCustomMoodCreator && (
        <div className="custom-mood-modal" role="dialog" aria-labelledby="custom-mood-title">
          <div className="modal-overlay" onClick={() => setShowCustomMoodCreator(false)}></div>
          <div className="modal-content">
            <h3 id="custom-mood-title">Create Your Own Mood</h3>
            <p className="modal-description">Express yourself in your own unique way</p>
            
            <div className="custom-mood-form">
              <div className="emoji-input-section">
                <label htmlFor="emoji-input">Choose an emoji:</label>
                <div className="emoji-input-container">
                  <button
                    type="button"
                    className="emoji-picker-button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    aria-label="Open emoji picker"
                  >
                    {customMood.emoji || '😊'}
                  </button>
                  {showEmojiPicker && (
                    <div className="emoji-picker">
                      <div className="emoji-grid">
                        {commonEmojis.map(emoji => (
                          <button
                            key={emoji}
                            type="button"
                            className="emoji-option"
                            onClick={() => handleEmojiSelect(emoji)}
                            aria-label={`Select ${emoji} emoji`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="label-input-section">
                <label htmlFor="mood-label">Mood name:</label>
                <input
                  id="mood-label"
                  type="text"
                  value={customMood.label}
                  onChange={(e) => setCustomMood(prev => ({ ...prev, label: e.target.value }))}
                  placeholder="e.g., Hopeful, Scattered, Cozy..."
                  maxLength={20}
                  className="mood-label-input"
                  aria-describedby="label-help"
                />
                <p id="label-help" className="input-help">
                  {customMood.label.length}/20 characters
                </p>
              </div>
            </div>
            
            <div className="modal-actions">
              <button
                onClick={() => {
                  setShowCustomMoodCreator(false);
                  setCustomMood({ emoji: '', label: '' });
                  setShowEmojiPicker(false);
                }}
                className="modal-button secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomMoodSave}
                className="modal-button primary"
                disabled={!customMood.emoji || !customMood.label.trim()}
              >
                Save Mood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodEntry;