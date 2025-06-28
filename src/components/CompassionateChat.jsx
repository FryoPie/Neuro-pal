import React, { useState } from 'react';

const CompassionateChat = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const compassionateResponses = {
    // Anxiety/Worry keywords
    'anxious|anxiety|worried|worry|nervous|scared|afraid': [
      "I hear that you're feeling anxious, and that takes courage to acknowledge. Anxiety can feel overwhelming, but you're not alone in this. 💜",
      "Your anxiety is valid, and it's okay to feel this way. Sometimes our minds try to protect us by worrying. What would help you feel a little safer right now?",
      "Anxiety can make everything feel bigger and scarier. You're being so brave by reaching out. Let's take this one gentle breath at a time. 🌸"
    ],
    
    // Sadness/Depression keywords
    'sad|sadness|depressed|depression|down|low|empty|hopeless': [
      "I'm so sorry you're feeling this way. Sadness can feel so heavy, and it's okay to sit with these feelings. You don't have to carry this alone. 🤗",
      "Your sadness matters, and so do you. Sometimes our hearts need time to process difficult things. Be gentle with yourself today.",
      "It's okay to not be okay. Your feelings are completely valid, and there's no rush to feel better. You're doing the best you can. 💙"
    ],
    
    // Overwhelm keywords
    'overwhelmed|overwhelming|too much|stressed|stress|burnout|exhausted': [
      "It sounds like you're carrying a lot right now. That feeling of being overwhelmed is so real and valid. What's one tiny thing we could take off your plate today?",
      "When everything feels like too much, sometimes the kindest thing is to do less, not more. You have permission to rest and take things slowly. 🌿",
      "Overwhelm is your system's way of saying 'I need care.' You're not failing - you're human, and you deserve support and gentleness."
    ],
    
    // Anger/Frustration keywords
    'angry|anger|frustrated|frustration|mad|irritated|annoyed': [
      "Your anger is telling you something important - that something doesn't feel right. It's okay to feel frustrated. Your feelings are valid. 🔥",
      "Frustration can be so intense and draining. It sounds like something really matters to you. What would help you feel heard right now?",
      "Anger often comes from caring deeply about something. Thank you for sharing this with me. You don't have to carry this feeling alone."
    ],
    
    // Loneliness keywords
    'lonely|alone|isolated|disconnected|nobody understands': [
      "Loneliness can feel so painful, especially when it seems like nobody understands your experience. But you're not as alone as it feels right now. 💜",
      "Being neurodivergent can sometimes feel isolating, but your way of experiencing the world is valid and valuable. You belong here.",
      "I see you, and your feelings matter. Sometimes connection starts with being gentle with ourselves. You're worthy of love and understanding."
    ],
    
    // Self-doubt keywords
    'not good enough|failure|failing|worthless|stupid|can\'t do anything': [
      "Those thoughts are so painful, but they're not the truth about who you are. You are enough, exactly as you are, right now. 🌟",
      "Your brain might be telling you harsh things, but that doesn't make them true. You have value that goes beyond what you accomplish.",
      "You're being so hard on yourself. What would you say to a friend who was feeling this way? You deserve that same kindness."
    ],
    
    // Masking/Identity keywords
    'masking|pretending|fake|hiding|exhausted from pretending': [
      "Masking can be so exhausting. It takes incredible energy to hide parts of yourself. You deserve spaces where you can just be authentically you. 🦋",
      "The fact that you're aware of masking shows such self-understanding. It's okay to unmask in safe spaces - your authentic self is beautiful.",
      "Pretending to be someone else all day is emotionally draining. You're not 'too much' or 'not enough' - you're perfectly you."
    ],
    
    // Sensory overwhelm keywords
    'sensory|overstimulated|too loud|too bright|can\'t handle': [
      "Sensory overwhelm is so real and valid. Your nervous system is asking for gentleness right now. Can you find a quieter, softer space? 🤗",
      "Your sensory needs are important and deserve to be honored. It's not being 'difficult' - it's taking care of yourself.",
      "Overstimulation can feel overwhelming. You know your body best. What would help you feel more comfortable right now?"
    ],
    
    // Default positive responses
    'default': [
      "Thank you for sharing with me. Your feelings and experiences are completely valid. You're not alone in this journey. 💜",
      "I hear you, and what you're going through matters. You're being so brave by reaching out and taking care of yourself.",
      "Your neurodivergent experience is unique and valuable. You deserve compassion, understanding, and gentle support.",
      "Whatever you're feeling right now is okay. You don't have to have it all figured out. Just being here is enough. 🌸"
    ]
  };

  const getCompassionateResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    for (const [keywords, responses] of Object.entries(compassionateResponses)) {
      if (keywords !== 'default') {
        const keywordList = keywords.split('|');
        if (keywordList.some(keyword => lowerInput.includes(keyword))) {
          return responses[Math.floor(Math.random() * responses.length)];
        }
      }
    }
    
    return compassionateResponses.default[Math.floor(Math.random() * compassionateResponses.default.length)];
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newUserMessage = { type: 'user', message: userInput, timestamp: new Date() };
    setChatHistory(prev => [...prev, newUserMessage]);
    
    setIsTyping(true);
    setUserInput('');

    // Simulate typing delay for more natural feel
    setTimeout(() => {
      const response = getCompassionateResponse(userInput);
      const botMessage = { type: 'bot', message: response, timestamp: new Date() };
      setChatHistory(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="compassionate-chat">
      <div className="chat-header">
        <h2>💜 Your Compassionate Companion</h2>
        <p>Share what's on your heart. I'm here to listen with kindness and understanding.</p>
      </div>

      <div className="chat-container">
        {chatHistory.length === 0 && (
          <div className="chat-welcome">
            <div className="welcome-message">
              <p>Hi there, beautiful soul 🌸</p>
              <p>I'm here to offer gentle support and understanding. You can share anything that's on your mind - your feelings, worries, celebrations, or just how your day is going.</p>
              <p>Your neurodivergent experience is valid and valued here. 💜</p>
            </div>
          </div>
        )}

        <div className="chat-messages">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`chat-message ${chat.type}`}>
              <div className="message-content">
                <p>{chat.message}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="chat-message bot typing">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="chat-input-container">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your heart... (Press Enter to send)"
            className="chat-input"
            rows="2"
          />
          <button 
            onClick={handleSendMessage}
            className="send-button"
            disabled={!userInput.trim() || isTyping}
          >
            💜
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompassionateChat;