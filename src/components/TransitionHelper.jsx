import React, { useState, useEffect } from 'react';

const TransitionHelper = ({ nextTask, onClose }) => {
  const [countdown, setCountdown] = useState(5);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setIsVisible(false);
          setTimeout(onClose, 300);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="transition-helper">
      <div className="transition-content">
        <div className="transition-icon">🌟</div>
        <h3>Gentle Transition</h3>
        <p>Great job on what you just completed!</p>
        <p className="next-task">Up next: <span>{nextTask}</span></p>
        <p className="transition-countdown">Taking a moment to transition... {countdown}</p>
        <button onClick={onClose} className="transition-close">
          I'm ready ✨
        </button>
      </div>
    </div>
  );
};

export default TransitionHelper;