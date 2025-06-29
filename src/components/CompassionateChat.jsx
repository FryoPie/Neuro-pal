import React, { useState } from 'react';

const CompassionateChat = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Improved response system with more comprehensive emotional coverage
  const getCompassionateResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    // Enhanced keyword matching with more nuanced responses
    const responseMap = {
      // Anxiety and worry
      anxiety: [
        "I hear that you're feeling anxious right now. That takes courage to acknowledge. Anxiety can feel so overwhelming, but you're not alone in this moment. 💜",
        "Your anxiety is completely valid. Sometimes our minds try to protect us by worrying, even when it doesn't feel helpful. What would make you feel a little safer right now?",
        "Anxiety can make everything feel bigger and more urgent than it is. You're being so brave by reaching out. Let's take this one gentle breath at a time. 🌸"
      ],
      
      // Sadness and depression
      sadness: [
        "I'm so sorry you're feeling this way. Sadness can feel incredibly heavy, and it's okay to sit with these feelings. You don't have to carry this alone. 🤗",
        "Your sadness matters, and so do you. Sometimes our hearts need time to process difficult things. There's no timeline for healing - be gentle with yourself.",
        "It's completely okay to not be okay right now. Your feelings are valid, and there's no rush to feel better. You're doing the best you can, and that's enough. 💙"
      ],
      
      // Overwhelm and stress
      overwhelm: [
        "It sounds like you're carrying so much right now. That feeling of being overwhelmed is real and valid. What's one tiny thing we could take off your plate today?",
        "When everything feels like too much, sometimes the kindest thing is to do less, not more. You have permission to rest and take things slowly. 🌿",
        "Overwhelm is your nervous system's way of saying 'I need care.' You're not failing - you're human, and you deserve support and gentleness."
      ],
      
      // Anger and frustration
      anger: [
        "Your anger is telling you something important - that something doesn't feel right. It's completely okay to feel frustrated. Your feelings are valid. 🔥",
        "Frustration can be so intense and draining. It sounds like something really matters to you. What would help you feel heard right now?",
        "Anger often comes from caring deeply about something. Thank you for sharing this with me. You don't have to carry these intense feelings alone."
      ],
      
      // Loneliness and isolation
      loneliness: [
        "Loneliness can feel so painful, especially when it seems like nobody understands your experience. But you're not as alone as it feels right now. 💜",
        "Being neurodivergent can sometimes feel isolating, but your way of experiencing the world is valid and valuable. You belong here, exactly as you are.",
        "I see you, and your feelings matter deeply. Sometimes connection starts with being gentle with ourselves. You're worthy of love and understanding."
      ],
      
      // Self-doubt and worthlessness
      selfDoubt: [
        "Those thoughts are so painful, but they're not the truth about who you are. You are enough, exactly as you are, right now. 🌟",
        "Your brain might be telling you harsh things, but that doesn't make them true. You have value that goes far beyond what you accomplish.",
        "You're being incredibly hard on yourself. What would you say to a dear friend who was feeling this way? You deserve that same kindness and compassion."
      ],
      
      // Masking and identity struggles
      masking: [
        "Masking can be absolutely exhausting. It takes incredible energy to hide parts of yourself. You deserve spaces where you can just be authentically you. 🦋",
        "The fact that you're aware of masking shows such deep self-understanding. It's okay to unmask in safe spaces - your authentic self is beautiful.",
        "Pretending to be someone else all day is emotionally draining. You're not 'too much' or 'not enough' - you're perfectly, wonderfully you."
      ],
      
      // Sensory overwhelm
      sensory: [
        "Sensory overwhelm is so real and valid. Your nervous system is asking for gentleness right now. Can you find a quieter, softer space for yourself? 🤗",
        "Your sensory needs are important and deserve to be honored. It's not being 'difficult' - it's taking care of yourself in the way you need.",
        "Overstimulation can feel overwhelming and exhausting. You know your body best. What would help you feel more comfortable right now?"
      ],
      
      // Burnout and exhaustion
      burnout: [
        "Burnout is your body and mind saying 'we need rest.' You've been pushing through so much. It's time to be gentle with yourself. 🌙",
        "Exhaustion isn't a character flaw - it's a sign that you've been giving so much of yourself. You deserve rest and recovery without guilt.",
        "Feeling burned out means you've been caring deeply and working hard. Now it's time to turn that care toward yourself."
      ],
      
      // Rejection sensitivity
      rejection: [
        "Rejection sensitivity can make social interactions feel so intense and scary. Your feelings about this are completely understandable. 💜",
        "That fear of rejection is trying to protect you, even though it hurts. You're worthy of connection and belonging, just as you are.",
        "Rejection sensitivity often comes from having a big, caring heart. Your sensitivity is not a flaw - it's part of what makes you special."
      ],
      
      // Executive dysfunction
      executive: [
        "Executive dysfunction can make simple tasks feel impossible. You're not lazy or broken - your brain just works differently. 🧠",
        "When executive function is struggling, be extra gentle with yourself. Small steps and self-compassion are your allies right now.",
        "Executive dysfunction is real and challenging. You're doing your best with the brain you have, and that's more than enough."
      ]
    };

    // Enhanced keyword detection
    const keywords = {
      anxiety: ['anxious', 'anxiety', 'worried', 'worry', 'nervous', 'scared', 'afraid', 'panic', 'panicking'],
      sadness: ['sad', 'sadness', 'depressed', 'depression', 'down', 'low', 'empty', 'hopeless', 'crying', 'cry'],
      overwhelm: ['overwhelmed', 'overwhelming', 'too much', 'stressed', 'stress', 'burnout', 'burned out', 'exhausted', 'tired'],
      anger: ['angry', 'anger', 'frustrated', 'frustration', 'mad', 'irritated', 'annoyed', 'furious', 'rage'],
      loneliness: ['lonely', 'alone', 'isolated', 'disconnected', 'nobody understands', 'no one gets it', 'left out'],
      selfDoubt: ['not good enough', 'failure', 'failing', 'worthless', 'stupid', 'can\'t do anything', 'useless', 'inadequate'],
      masking: ['masking', 'pretending', 'fake', 'hiding', 'exhausted from pretending', 'can\'t be myself'],
      sensory: ['sensory', 'overstimulated', 'too loud', 'too bright', 'can\'t handle', 'overwhelming sounds', 'too much noise'],
      burnout: ['burnout', 'burned out', 'exhausted', 'drained', 'can\'t anymore', 'too tired', 'no energy'],
      rejection: ['rejection', 'rejected', 'left out', 'not included', 'nobody likes me', 'don\'t belong'],
      executive: ['can\'t focus', 'executive', 'can\'t start', 'procrastinating', 'brain fog', 'can\'t think', 'scattered']
    };

    // Find matching category
    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => lowerInput.includes(word))) {
        const responses = responseMap[category];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    // Default compassionate responses for unmatched input
    const defaultResponses = [
      "Thank you for sharing with me. Your feelings and experiences are completely valid. You're not alone in this journey. 💜",
      "I hear you, and what you're going through matters deeply. You're being so brave by reaching out and taking care of yourself.",
      "Your neurodivergent experience is unique and valuable. You deserve compassion, understanding, and gentle support.",
      "Whatever you're feeling right now is okay. You don't have to have it all figured out. Just being here is enough. 🌸",
      "Your feelings are valid, and you matter. Sometimes the most courageous thing is simply acknowledging how we feel.",
      "I'm honored that you shared this with me. Your trust means everything, and you deserve all the gentleness in the world."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newUserMessage = { 
      type: 'user', 
      message: userInput.trim(), 
      timestamp: new Date() 
    };
    
    setChatHistory(prev => [...prev, newUserMessage]);
    
    setIsTyping(true);
    const currentInput = userInput;
    setUserInput('');

    // Simulate more natural typing delay
    setTimeout(() => {
      const response = getCompassionateResponse(currentInput);
      const botMessage = { 
        type: 'bot', 
        message: response, 
        timestamp: new Date() 
      };
      setChatHistory(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800); // 1.2-2 second delay
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
  };

  return (
    <div className="compassionate-chat">
      <div className="chat-header">
        <h2>💜 Your Gentle Companion</h2>
        <p>This is a safe space to share what's on your heart. I'm here to listen with kindness and understanding.</p>
      </div>

      <div className="chat-container">
        {chatHistory.length === 0 && (
          <div className="chat-welcome">
            <div className="welcome-message">
              <p>Hi there, beautiful soul 🌸</p>
              <p>I'm here to offer gentle support and understanding. You can share anything that's on your mind - your feelings, worries, celebrations, or just how your day is going.</p>
              <p>Your neurodivergent experience is valued here. Take your time, and know that whatever you're feeling is valid. 💜</p>
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
            maxLength={500}
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
              >
                🔄
              </button>
            )}
          </div>
        </div>

        {userInput.length > 450 && (
          <div className="character-count">
            {userInput.length}/500 characters
          </div>
        )}
      </div>
    </div>
  );
};

export default CompassionateChat;