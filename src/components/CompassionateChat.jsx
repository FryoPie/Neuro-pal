import React, { useState, useEffect } from 'react';
import { getAIResponse, checkApiStatus } from '../services/cohereService';

const CompassionateChat = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  const [error, setError] = useState(null);

  // Check API status on component mount
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await checkApiStatus();
        setApiStatus(status);
      } catch (err) {
        console.error('Failed to check API status:', err);
        setApiStatus({ 
          status: 'error', 
          message: 'Unable to check API status. Using fallback responses.' 
        });
      }
    };

    checkStatus();
  }, []);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newUserMessage = { 
      type: 'user', 
      message: userInput.trim(), 
      timestamp: new Date() 
    };
    
    setChatHistory(prev => [...prev, newUserMessage]);
    
    setIsTyping(true);
    setError(null);
    const currentInput = userInput;
    setUserInput('');

    try {
      // Get AI response from Cohere
      const response = await getAIResponse(currentInput);
      
      const botMessage = { 
        type: 'bot', 
        message: response, 
        timestamp: new Date() 
      };
      
      setChatHistory(prev => [...prev, botMessage]);
      
    } catch (err) {
      console.error('Error getting AI response:', err);
      setError('I\'m having trouble responding right now, but I\'m still here with you. 💜');
      
      // Add error message to chat
      const errorMessage = {
        type: 'bot',
        message: 'I\'m having trouble responding right now, but I\'m still here with you. Your feelings are valid, and you\'re not alone. 💜',
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setChatHistory([]);
    setUserInput('');
    setError(null);
  };

  return (
    <div className="compassionate-chat">
      <div className="chat-header">
        <h2>💜 Your Gentle Companion</h2>
        <p>This is a safe space to share what's on your heart. I'm here to listen with kindness and understanding.</p>
        
        {/* API Status Indicator */}
        {apiStatus && (
          <div className={`api-status ${apiStatus.status}`}>
            {apiStatus.status === 'connected' && '🟢 AI Support Active (Cohere)'}
            {apiStatus.status === 'no-key' && '🟡 Enhanced Support Mode'}
            {apiStatus.status === 'error' && '🟡 Backup Support Mode'}
          </div>
        )}
      </div>

      <div className="chat-container">
        {chatHistory.length === 0 && (
          <div className="chat-welcome">
            <div className="welcome-message">
              <p>Hi there, beautiful soul 🌸</p>
              <p>I'm here to offer gentle support and understanding. You can share anything that's on your mind - your feelings, worries, celebrations, or just how your day is going.</p>
              <p>Your neurodivergent experience is valued here. Take your time, and know that whatever you're feeling is valid. 💜</p>
              {apiStatus?.status !== 'connected' && (
                <p className="fallback-notice">
                  <em>Currently using enhanced support responses to ensure you always have someone to talk to.</em>
                </p>
              )}
            </div>
          </div>
        )}

        <div className="chat-messages">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`chat-message ${chat.type}`}>
              <div className="message-content">
                <p>{chat.message}</p>
                <span className="message-time">
                  {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="chat-message bot">
              <div className="message-content typing-message">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="typing-text">Listening with care...</span>
              </div>
            </div>
          )}
        </div>

        <div className="chat-input-container">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your heart... (Press Enter to send, Shift+Enter for new line)"
            className="chat-input"
            rows="2"
            maxLength={400}
            disabled={isTyping}
          />
          <div className="chat-actions">
            <button 
              onClick={handleSendMessage}
              className="send-button"
              disabled={!userInput.trim() || isTyping}
              title="Send message"
            >
              💜
            </button>
            {chatHistory.length > 0 && (
              <button 
                onClick={handleClearChat}
                className="clear-button"
                title="Start fresh"
                disabled={isTyping}
              >
                🔄
              </button>
            )}
          </div>
        </div>

        {userInput.length > 350 && (
          <div className="character-count">
            {userInput.length}/400 characters
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompassionateChat;