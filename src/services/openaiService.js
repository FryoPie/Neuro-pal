import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
});

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

Remember: You're a supportive friend, not a therapist. Focus on emotional validation and gentle companionship.`;

// Fallback responses for when API is unavailable
const fallbackResponses = [
  "I hear you, and what you're going through matters deeply. You're being so brave by reaching out and taking care of yourself. 💜",
  "Your feelings are completely valid. Sometimes the most courageous thing is simply acknowledging how we feel.",
  "Thank you for sharing with me. Your neurodivergent experience is valued here, and you deserve all the gentleness in the world. 🌸",
  "Whatever you're feeling right now is okay. You don't have to have it all figured out. Just being here is enough.",
  "I'm honored that you shared this with me. Your trust means everything, and you're not alone in this journey."
];

// Enhanced keyword-based responses for development/fallback
const getEnhancedFallbackResponse = (input) => {
  const lowerInput = input.toLowerCase();
  
  const responseMap = {
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
    masking: [
      "Masking can be absolutely exhausting. It takes incredible energy to hide parts of yourself. You deserve spaces where you can just be authentically you. 🦋",
      "The fact that you're aware of masking shows such deep self-understanding. It's okay to unmask in safe spaces - your authentic self is beautiful.",
      "Pretending to be someone else all day is emotionally draining. You're not 'too much' or 'not enough' - you're perfectly, wonderfully you."
    ]
  };

  const keywords = {
    anxiety: ['anxious', 'anxiety', 'worried', 'worry', 'nervous', 'scared', 'afraid', 'panic'],
    sadness: ['sad', 'sadness', 'depressed', 'depression', 'down', 'low', 'empty', 'hopeless'],
    overwhelm: ['overwhelmed', 'overwhelming', 'too much', 'stressed', 'stress', 'burnout', 'exhausted'],
    masking: ['masking', 'pretending', 'fake', 'hiding', 'exhausted from pretending', 'can\'t be myself']
  };

  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => lowerInput.includes(word))) {
      const responses = responseMap[category];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
};

// Main function to get AI response
export const getAIResponse = async (userMessage) => {
  // Check if we're in development mode or API key is missing
  const isDevelopment = import.meta.env.VITE_ENVIRONMENT === 'development';
  const hasApiKey = import.meta.env.VITE_OPENAI_API_KEY && 
                   import.meta.env.VITE_OPENAI_API_KEY !== 'your_openai_api_key_here';

  if (isDevelopment || !hasApiKey) {
    console.log('Using enhanced fallback responses');
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    return getEnhancedFallbackResponse(userMessage);
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    });

    const response = completion.choices[0]?.message?.content?.trim();
    
    if (!response) {
      throw new Error('Empty response from OpenAI');
    }

    return response;

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Provide specific error handling
    if (error.status === 401) {
      console.error('Invalid API key. Please check your VITE_OPENAI_API_KEY');
    } else if (error.status === 429) {
      console.error('Rate limit exceeded. Please try again later.');
    } else if (error.status === 500) {
      console.error('OpenAI server error. Using fallback response.');
    }

    // Always fall back to enhanced responses
    return getEnhancedFallbackResponse(userMessage);
  }
};

// Function to validate API key format
export const validateApiKey = (apiKey) => {
  if (!apiKey) return false;
  if (apiKey === 'your_openai_api_key_here') return false;
  if (!apiKey.startsWith('sk-')) return false;
  return apiKey.length > 20;
};

// Function to check API status
export const checkApiStatus = async () => {
  const hasApiKey = validateApiKey(import.meta.env.VITE_OPENAI_API_KEY);
  
  if (!hasApiKey) {
    return { 
      status: 'no-key', 
      message: 'No valid API key configured. Using enhanced fallback responses.' 
    };
  }

  try {
    // Test with a simple request
    await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "test" }],
      max_tokens: 5
    });
    
    return { 
      status: 'connected', 
      message: 'OpenAI API connected successfully.' 
    };
  } catch (error) {
    return { 
      status: 'error', 
      message: `API Error: ${error.message}. Using fallback responses.` 
    };
  }
};