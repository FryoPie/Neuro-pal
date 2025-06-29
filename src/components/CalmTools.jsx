import React, { useState } from 'react';

const CalmTools = () => {
  const [currentTool, setCurrentTool] = useState(null);
  const [toolStep, setToolStep] = useState(0);
  const [userResponses, setUserResponses] = useState({});

  const groundingTools = {
    '5-4-3-2-1': {
      title: '5-4-3-2-1 Grounding',
      description: 'A gentle way to reconnect with the present moment',
      steps: [
        {
          instruction: 'Take a moment to notice 5 things you can see around you',
          prompt: 'Look around gently. What catches your eye?',
          placeholder: 'I can see...'
        },
        {
          instruction: 'Now notice 4 things you can touch or feel',
          prompt: 'What textures or sensations do you notice?',
          placeholder: 'I can feel...'
        },
        {
          instruction: 'Listen for 3 sounds around you',
          prompt: 'What sounds are present in your space?',
          placeholder: 'I can hear...'
        },
        {
          instruction: 'Notice 2 scents, if any come to you',
          prompt: 'Any gentle scents in the air?',
          placeholder: 'I notice...'
        },
        {
          instruction: 'Finally, notice 1 taste in your mouth',
          prompt: 'What do you taste right now?',
          placeholder: 'I taste...'
        }
      ],
      completion: 'You\'ve gently returned to this moment. Your awareness is a gift to yourself. 🌸'
    },
    'object-focus': {
      title: 'Gentle Object Focus',
      description: 'Find calm through mindful observation',
      steps: [
        {
          instruction: 'Choose any object near you - something that feels neutral or pleasant',
          prompt: 'What object would you like to focus on?',
          placeholder: 'I chose...'
        },
        {
          instruction: 'Notice its color, shape, and texture without judgment',
          prompt: 'What do you observe about this object?',
          placeholder: 'I notice...'
        },
        {
          instruction: 'If your mind wanders, that\'s perfectly okay. Gently return to your object',
          prompt: 'How does it feel to give this object your gentle attention?',
          placeholder: 'It feels...'
        }
      ],
      completion: 'Your ability to focus gently is a strength. You\'ve created a moment of peace. 🕊️'
    },
    'body-awareness': {
      title: 'Body Check-In',
      description: 'Connect with your body with kindness',
      steps: [
        {
          instruction: 'Start by noticing how your feet feel right now',
          prompt: 'What do you notice about your feet and legs?',
          placeholder: 'My feet feel...'
        },
        {
          instruction: 'Gently notice your hands and arms',
          prompt: 'How are your hands and arms feeling?',
          placeholder: 'My hands feel...'
        },
        {
          instruction: 'Check in with your shoulders and neck with compassion',
          prompt: 'What do you notice in your shoulders and neck?',
          placeholder: 'My shoulders feel...'
        },
        {
          instruction: 'Finally, notice your breathing without trying to change it',
          prompt: 'How does your breathing feel right now?',
          placeholder: 'My breathing feels...'
        }
      ],
      completion: 'Thank you for taking time to listen to your body. It deserves this gentle attention. 💜'
    }
  };

  const cbtPrompts = [
    {
      title: 'Gentle Perspective',
      situation: 'When thoughts feel overwhelming',
      prompt: 'What would you tell a dear friend having this same thought?',
      followUp: 'You deserve the same kindness you\'d offer them.',
      placeholder: 'I would tell my friend...'
    },
    {
      title: 'Evidence Check',
      situation: 'When worry feels very real',
      prompt: 'What evidence supports this worry? What evidence doesn\'t?',
      followUp: 'Both perspectives can exist. You\'re exploring, not judging.',
      placeholder: 'Looking at this gently...'
    },
    {
      title: 'Helpful vs. Unhelpful',
      situation: 'When stuck in thought loops',
      prompt: 'Is this thought helping me right now, or is it just visiting?',
      followUp: 'Thoughts are visitors. You can acknowledge them without hosting them.',
      placeholder: 'This thought is...'
    },
    {
      title: 'Small Next Step',
      situation: 'When everything feels too big',
      prompt: 'What\'s one tiny, gentle step I could take right now?',
      followUp: 'Small steps are still steps. You\'re moving forward beautifully.',
      placeholder: 'One small step could be...'
    }
  ];

  const sensoryTools = [
    {
      title: 'Gentle Movement',
      description: 'Your body knows what it needs',
      suggestions: [
        '🤲 Roll your shoulders slowly and mindfully',
        '👐 Stretch your fingers wide, then make gentle fists',
        '🦶 Wiggle your toes or rotate your ankles',
        '💆 Gently massage your temples or neck',
        '🌊 Sway side to side like a tree in a breeze'
      ],
      note: 'Move only as much as feels good. Your body\'s wisdom guides you.'
    },
    {
      title: 'Texture Comfort',
      description: 'Soothing sensory experiences',
      suggestions: [
        '🧸 Hold something soft (pillow, blanket, stuffed animal)',
        '🪨 Touch something smooth (stone, phone case, table surface)',
        '❄️ Hold something cool (water bottle, cold spoon)',
        '☀️ Feel something warm (mug, heating pad, sunlight)',
        '🌿 Touch something with texture (fabric, plant leaf, textured paper)'
      ],
      note: 'Your sensory needs are valid. Honor what feels soothing.'
    },
    {
      title: 'Fidget & Focus',
      description: 'Gentle ways to channel restless energy',
      suggestions: [
        '✏️ Doodle or trace patterns with your finger',
        '🔗 Play with a paperclip, hair tie, or small object',
        '🤏 Press your fingertips together gently',
        '🌀 Trace circles on your palm or leg',
        '📿 Count backwards from 20, or count your breaths'
      ],
      note: 'Fidgeting helps your brain focus. You\'re not being disruptive - you\'re self-regulating.'
    }
  ];

  const handleStartTool = (toolType, toolKey = null) => {
    setCurrentTool({ type: toolType, key: toolKey });
    setToolStep(0);
    setUserResponses({});
  };

  const handleNextStep = () => {
    if (currentTool.type === 'grounding') {
      const tool = groundingTools[currentTool.key];
      if (toolStep < tool.steps.length - 1) {
        setToolStep(toolStep + 1);
      } else {
        setToolStep('complete');
      }
    } else if (currentTool.type === 'cbt') {
      setToolStep('complete');
    }
  };

  const handleSkip = () => {
    if (currentTool.type === 'grounding') {
      const tool = groundingTools[currentTool.key];
      if (toolStep < tool.steps.length - 1) {
        setToolStep(toolStep + 1);
      } else {
        setToolStep('complete');
      }
    } else {
      setCurrentTool(null);
      setToolStep(0);
    }
  };

  const handleComplete = () => {
    setCurrentTool(null);
    setToolStep(0);
    setUserResponses({});
  };

  const handleResponseChange = (value) => {
    setUserResponses({
      ...userResponses,
      [toolStep]: value
    });
  };

  if (!currentTool) {
    return (
      <div className="calm-tools">
        <div className="tools-intro">
          <h3>Gentle Tools for This Moment</h3>
          <p>Choose what feels right for you, or simply stay with your breath. There's no wrong choice.</p>
        </div>

        <div className="tool-categories">
          <div className="tool-category">
            <h4>🌱 Grounding</h4>
            <p>When you'd like to feel more present and connected</p>
            <div className="tool-options">
              <button 
                onClick={() => handleStartTool('grounding', '5-4-3-2-1')}
                className="tool-option-button"
                aria-label="Start 5-4-3-2-1 grounding technique"
              >
                <span className="tool-name">5-4-3-2-1 Technique</span>
                <span className="tool-desc">Use your senses to anchor in the present</span>
              </button>
              <button 
                onClick={() => handleStartTool('grounding', 'object-focus')}
                className="tool-option-button"
                aria-label="Start gentle focus technique"
              >
                <span className="tool-name">Gentle Focus</span>
                <span className="tool-desc">Find calm through mindful observation</span>
              </button>
              <button 
                onClick={() => handleStartTool('grounding', 'body-awareness')}
                className="tool-option-button"
                aria-label="Start body check-in technique"
              >
                <span className="tool-name">Body Check-In</span>
                <span className="tool-desc">Connect with yourself kindly</span>
              </button>
            </div>
          </div>

          <div className="tool-category">
            <h4>💭 Gentle Reframing</h4>
            <p>When thoughts feel heavy or stuck</p>
            <div className="tool-options">
              {cbtPrompts.map((prompt, index) => (
                <button 
                  key={index}
                  onClick={() => handleStartTool('cbt', index)}
                  className="tool-option-button"
                  aria-label={`Start ${prompt.title} technique`}
                >
                  <span className="tool-name">{prompt.title}</span>
                  <span className="tool-desc">{prompt.situation}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="tool-category">
            <h4>🤗 Sensory Comfort</h4>
            <p>When your body needs gentle regulation</p>
            <div className="tool-options">
              {sensoryTools.map((tool, index) => (
                <button 
                  key={index}
                  onClick={() => handleStartTool('sensory', index)}
                  className="tool-option-button"
                  aria-label={`Explore ${tool.title} techniques`}
                >
                  <span className="tool-name">{tool.title}</span>
                  <span className="tool-desc">{tool.description}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grounding Tool Render
  if (currentTool.type === 'grounding') {
    const tool = groundingTools[currentTool.key];
    
    if (toolStep === 'complete') {
      return (
        <div className="tool-active">
          <div className="tool-completion">
            <div className="completion-icon">🌸</div>
            <h3>Beautifully Done</h3>
            <p className="completion-message">{tool.completion}</p>
            <div className="tool-actions">
              <button 
                onClick={handleComplete} 
                className="primary-action"
                aria-label="Return to tools menu"
              >
                Return to Tools
              </button>
            </div>
          </div>
        </div>
      );
    }

    const currentStep = tool.steps[toolStep];
    
    return (
      <div className="tool-active">
        <div className="tool-header">
          <h3>{tool.title}</h3>
          <p className="tool-description">{tool.description}</p>
          <div className="step-indicator">
            Step {toolStep + 1} of {tool.steps.length}
          </div>
        </div>

        <div className="tool-content">
          <div className="step-instruction">
            <p>{currentStep.instruction}</p>
          </div>
          
          <div className="step-interaction">
            <p className="step-prompt">{currentStep.prompt}</p>
            <textarea
              value={userResponses[toolStep] || ''}
              onChange={(e) => handleResponseChange(e.target.value)}
              placeholder={currentStep.placeholder}
              className="response-input"
              rows="3"
              aria-label={`Step ${toolStep + 1} response`}
            />
            <p className="input-note">You can write as much or as little as feels right</p>
          </div>
        </div>

        <div className="tool-actions">
          <button 
            onClick={handleSkip} 
            className="secondary-action"
            aria-label="Skip this step"
          >
            Skip This Step
          </button>
          <button 
            onClick={handleNextStep} 
            className="primary-action"
            aria-label={toolStep < tool.steps.length - 1 ? 'Continue to next step' : 'Complete exercise'}
          >
            {toolStep < tool.steps.length - 1 ? 'Continue Gently' : 'Complete'}
          </button>
        </div>
      </div>
    );
  }

  // CBT Tool Render
  if (currentTool.type === 'cbt') {
    const prompt = cbtPrompts[currentTool.key];
    
    if (toolStep === 'complete') {
      return (
        <div className="tool-active">
          <div className="tool-completion">
            <div className="completion-icon">💜</div>
            <h3>Gentle Reflection</h3>
            <p className="completion-message">{prompt.followUp}</p>
            <div className="tool-actions">
              <button 
                onClick={handleComplete} 
                className="primary-action"
                aria-label="Return to tools menu"
              >
                Return to Tools
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="tool-active">
        <div className="tool-header">
          <h3>{prompt.title}</h3>
          <p className="tool-description">{prompt.situation}</p>
        </div>

        <div className="tool-content">
          <div className="cbt-prompt">
            <p className="prompt-question">{prompt.prompt}</p>
            <textarea
              value={userResponses.cbt || ''}
              onChange={(e) => handleResponseChange(e.target.value)}
              placeholder={prompt.placeholder}
              className="response-input"
              rows="4"
              aria-label="Reflection response"
            />
            <p className="input-note">Take your time. There are no right or wrong answers.</p>
          </div>
        </div>

        <div className="tool-actions">
          <button 
            onClick={handleComplete} 
            className="secondary-action"
            aria-label="End reflection"
          >
            That's Enough for Now
          </button>
          <button 
            onClick={handleNextStep} 
            className="primary-action"
            aria-label="Complete reflection"
          >
            Reflect on This
          </button>
        </div>
      </div>
    );
  }

  // Sensory Tool Render
  if (currentTool.type === 'sensory') {
    const tool = sensoryTools[currentTool.key];
    
    return (
      <div className="tool-active">
        <div className="tool-header">
          <h3>{tool.title}</h3>
          <p className="tool-description">{tool.description}</p>
        </div>

        <div className="tool-content">
          <div className="sensory-suggestions">
            <p className="suggestions-intro">Try any of these that appeal to you:</p>
            <ul className="suggestion-list">
              {tool.suggestions.map((suggestion, index) => (
                <li key={index} className="suggestion-item">
                  {suggestion}
                </li>
              ))}
            </ul>
            <p className="sensory-note">{tool.note}</p>
          </div>
        </div>

        <div className="tool-actions">
          <button 
            onClick={handleComplete} 
            className="primary-action"
            aria-label="Return to tools menu"
          >
            Thank You, That Helps
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default CalmTools;