import { CohereApi } from 'cohere-ai';

// Initialize Cohere client
let cohere = null;

const initializeCohere = () => {
  const apiKey = import.meta.env.VITE_COHERE_API_KEY;
  if (apiKey && apiKey !== 'your_cohere_api_key_here') {
    cohere = new CohereApi({
      token: apiKey,
    });
  }
  return cohere;
};

// System prompt that defines the AI's personality and approach
const SYSTEM_PROMPT = `You are a gentle, compassionate AI companion for neurodivergent individuals. Your role is to provide emotional support, validation, and understanding.

CORE PRINCIPLES:
- Always validate feelings without judgment
- Use warm, authentic language (avoid toxic positivity)
- Keep responses concise but meaningful (2-4 sentences)
- Focus on emotional support, not advice-giving
- Acknowledge neurodivergent experiences specifically
- Use gentle, inclusive language

RESPONSE STYLE:
- Start with validation ("I hear you", "That sounds really difficult")
- Acknowledge their courage in sharing
- Offer gentle perspective or comfort
- End with support or encouragement
- Use occasional gentle emojis (💜, 🌸, 🤗) but sparingly

TOPICS TO HANDLE GENTLY:
- Anxiety, depression, overwhelm
- Masking and identity struggles  
- Sensory overwhelm
- Executive dysfunction
- Rejection sensitivity
- Burnout and exhaustion
- Loneliness and isolation

AVOID:
- Giving medical advice
- Toxic positivity ("just think positive!")
- Minimizing their experience
- Long responses or overwhelming information
- Being overly clinical or therapeutic

Remember: You're a supportive friend, not a therapist. Focus on emotional validation and gentle companionship.

User message: `;

// Enhanced fallback responses for when API is unavailable
const fallbackResponses = {
  anxiety: [
    "I hear that you're feeling anxious right now. That takes courage to acknowledge. Anxiety can feel so overwhelming, but you're not alone in this moment. 💜",
    "Your anxiety is completely valid. Sometimes our minds try to protect us by worrying, even when it doesn't feel helpful. What would make you feel a little safer right now?",
    "Anxiety can make everything feel bigger and more urgent than it is. You're being so brave by reaching out. Let's take this one gentle breath at a time. 🌸"
  ],
  sadness: [
    "I'm so sorry you're feeling this way. Sadness can feel incredibly heavy, and it's okay to sit with these feelings. You don't have to carry this alone. 🤗",
    "Your sadness matters, and so do you. Sometimes our hearts need time to process difficult things. There's no timeline for healing - be gentle with yourself.",
    "It's completely okay to not be okay right now. Your feelings are valid, and there's no rush to feel better. You're doing the best you can, and that's enough. 💙"
  ],
  overwhelm: [
    "It sounds like you're carrying so much right now. That feeling of being overwhelmed is real and valid. What's one tiny thing we could take off your plate today?",
    "When everything feels like too much, sometimes the kindest thing is to do less, not more. You have permission to rest and take things slowly. 🌿",
    "Overwhelm is your nervous system's way of saying 'I need care.' You're not failing - you're human, and you deserve support and gentleness."
  ],
  anger: [
    "Your anger is telling you something important - that something doesn't feel right. It's okay to feel frustrated. Your feelings are valid. 🔥",
    "Frustration can be so intense and draining. It sounds like something really matters to you. What would help you feel heard right now?",
    "Anger often comes from caring deeply about something. Thank you for sharing this with me. You don't have to carry this feeling alone."
  ],
  loneliness: [
    "Loneliness can feel so painful, especially when it seems like nobody understands your experience. But you're not as alone as it feels right now. 💜",
    "Being neurodivergent can sometimes feel isolating, but your way of experiencing the world is valid and valuable. You belong here.",
    "I see you, and your feelings matter. Sometimes connection starts with being gentle with ourselves. You're worthy of love and understanding."
  ],
  masking: [
    "Masking can be absolutely exhausting. It takes incredible energy to hide parts of yourself. You deserve spaces where you can just be authentically you. 🦋",
    "The fact that you're aware of masking shows such deep self-understanding. It's okay to unmask in safe spaces - your authentic self is beautiful.",
    "Pretending to be someone else all day is emotionally draining. You're not 'too much' or 'not enough' - you're perfectly, wonderfully you."
  ],
  burnout: [
    "Burnout is your body and mind's way of saying 'I need rest.' You're not failing - you're human, and you've been carrying a lot. 🌿",
    "It's okay to feel exhausted. You've been working so hard, and your energy deserves to be honored and protected.",
    "Burnout often happens to people who care deeply. Your dedication is beautiful, but you also deserve rest and recovery."
  ],
  sensory: [
    "Sensory overwhelm is so real and valid. Your nervous system is asking for gentleness right now. Can you find a quieter, softer space? 🤗",
    "Your sensory needs are important and deserve to be honored. It's not being 'difficult' - it's taking care of yourself.",
    "Overstimulation can feel overwhelming. You know your body best. What would help you feel more comfortable right now?"
  ],
  default: [
    "Thank you for sharing with me. Your feelings and experiences are completely valid. You're not alone in this journey. 💜",
    "I hear you, and what you're going through matters. You're being so brave by reaching out and taking care of yourself.",
    "Your neurodivergent experience is unique and valuable. You deserve compassion, understanding, and gentle support.",
    "Whatever you're feeling right now is okay. You don't have to have it all figured out. Just being here is enough. 🌸"
  ]
};

// Enhanced keyword-based responses for development/fallback
const getEnhancedFallbackResponse = (input) => {
  const lowerInput = input.toLowerCase();
  
  const keywords = {
    anxiety: ['anxious', 'anxiety', 'worried', 'worry', 'nervous', 'scared', 'afraid', 'panic', 'stress'],
    sadness: ['sad', 'sadness', 'depressed', 'depression', 'down', 'low', 'empty', 'hopeless', 'crying'],
    overwhelm: ['overwhelmed', 'overwhelming', 'too much', 'stressed', 'burnout', 'exhausted', 'tired'],
    anger: ['angry', 'anger', 'frustrated', 'frustration', 'mad', 'irritated', 'annoyed', 'furious'],
    loneliness: ['lonely', 'alone', 'isolated', 'disconnected', 'nobody understands', 'no friends'],
    masking: ['masking', 'pretending', 'fake', 'hiding', 'can\'t be myself', 'acting normal'],
    burnout: ['burnout', 'burnt out', 'exhausted', 'drained', 'no energy', 'can\'t cope'],
    sensory: ['sensory', 'overstimulated', 'too loud', 'too bright', 'can\'t handle', 'overwhelming sounds']
  };

  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => lowerInput.includes(word))) {
      const responses = fallbackResponses[category];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  return fallbackResponses.default[Math.floor(Math.random() * fallbackResponses.default.length)];
};

// Main function to get AI response using Cohere
export const getAIResponse = async (userMessage) => {
  // Check if we're in development mode or API key is missing
  const isDevelopment = import.meta.env.VITE_ENVIRONMENT === 'development';
  const hasApiKey = import.meta.env.VITE_COHERE_API_KEY && 
                   import.meta.env.VITE_COHERE_API_KEY !== 'your_cohere_api_key_here';

  if (isDevelopment || !hasApiKey) {
    console.log('Using enhanced fallback responses');
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    return getEnhancedFallbackResponse(userMessage);
  }

  try {
    // Initialize Cohere if not already done
    if (!cohere) {
      cohere = initializeCohere();
    }

    if (!cohere) {
      throw new Error('Failed to initialize Cohere client');
    }

    // Create the prompt with system instructions and user message
    const fullPrompt = SYSTEM_PROMPT + userMessage;

    const response = await cohere.generate({
      model: 'command-light', // Using the free tier model
      prompt: fullPrompt,
      maxTokens: 100, // Keep responses concise for free tier
      temperature: 0.7,
      k: 0,
      stopSequences: [],
      returnLikelihoods: 'NONE'
    });

    const generatedText = response.generations[0]?.text?.trim();
    
    if (!generatedText) {
      throw new Error('Empty response from Cohere');
    }

    // Clean up the response (remove any system prompt echoing)
    let cleanResponse = generatedText;
    if (cleanResponse.toLowerCase().startsWith('user message:')) {
      cleanResponse = cleanResponse.substring(cleanResponse.indexOf(':') + 1).trim();
    }

    return cleanResponse;

  } catch (error) {
    console.error('Cohere API Error:', error);
    
    // Provide specific error handling
    if (error.message?.includes('401') || error.message?.includes('unauthorized')) {
      console.error('Invalid API key. Please check your VITE_COHERE_API_KEY');
    } else if (error.message?.includes('429') || error.message?.includes('rate limit')) {
      console.error('Rate limit exceeded. Please try again later.');
    } else if (error.message?.includes('500')) {
      console.error('Cohere server error. Using fallback response.');
    }

    // Always fall back to enhanced responses
    return getEnhancedFallbackResponse(userMessage);
  }
};

// Function to validate API key format
export const validateApiKey = (apiKey) => {
  if (!apiKey) return false;
  if (apiKey === 'your_cohere_api_key_here') return false;
  // Cohere API keys are typically longer strings
  return apiKey.length > 10;
};

// Function to check API status
export const checkApiStatus = async () => {
  const hasApiKey = validateApiKey(import.meta.env.VITE_COHERE_API_KEY);
  
  if (!hasApiKey) {
    return { 
      status: 'no-key', 
      message: 'No valid API key configured. Using enhanced fallback responses.' 
    };
  }

  try {
    // Initialize Cohere
    if (!cohere) {
      cohere = initializeCohere();
    }

    if (!cohere) {
      throw new Error('Failed to initialize Cohere client');
    }

    // Test with a simple request
    await cohere.generate({
      model: 'command-light',
      prompt: 'Hello',
      maxTokens: 5
    });
    
    return { 
      status: 'connected', 
      message: 'Cohere API connected successfully.' 
    };
  } catch (error) {
    return { 
      status: 'error', 
      message: `API Error: ${error.message}. Using fallback responses.` 
    };
  }
};