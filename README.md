# NeuroPal - Your Daily Companion  
A supportive routine & mood tracker for neurodivergent teens.  
Built for Bolt Hackathon 2025.

---

## 🖥️ Demo

🎥 [Watch the Demo Video](https://www.youtube.com/watch?v=O2BYx_xAW6Q)
🌐 [Live Preview](https://neuropal.netlify.app/)

> Built in 72 hours by Team Dr. Binary during the Bolt Hackathon 2025

---

## 💡 Inspiration

NeuroPal was created to support neurodivergent teens who often struggle with overstimulation, disrupted routines, and emotional regulation.  
We wanted to build a gentle, validating space where users can track their day, reflect on their feelings, and get support without judgment.

---

## Features  
- **Daily Routine Tracking**: Gentle task management with encouraging feedback  
- **Mood & Energy Monitoring**: Track emotional states with compassionate responses  
- **Calendar View**: Visual weekly insights and pattern recognition  
- **Calm Tools**: Grounding techniques, CBT prompts, and sensory regulation  
- **AI Support**: Compassionate chat companion with emotional validation  
- **Accessibility**: Dark/light themes, reduced motion support, high contrast compatibility

---

## 🧠 How It Works

- **Daily Tab**: Log routines, mood, and energy in seconds  
- **Calendar View**: Visualize your week and spot emotional patterns  
- **Feelings Tab**: Choose how you’re feeling and receive validating feedback  
- **Calm Tools**: Use grounding techniques and sensory-friendly prompts  
- **AI Support**: Chat with a Cohere-powered AI for emotional support  

---

## AI Support Setup

The AI Support tab uses Cohere's API for compassionate, neurodivergent-friendly responses.

### Option 1: Using Cohere API (Recommended)

1. **Get a Cohere API Key**:
   - Visit [Cohere's website](https://cohere.ai/)
   - Create an account or sign in
   - Navigate to the API keys section
   - Generate a new API key
   - Copy the key

2. **Configure Environment Variables**:
   - Create a `.env.local` file in your project root
   - Add your API key:
     ```
     VITE_COHERE_API_KEY=your_cohere_api_key_here
     VITE_ENVIRONMENT=production
     ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

### Option 2: Using Enhanced Fallback Responses

If you prefer not to use the Cohere API or want to test without it:

1. **Set Environment to Development**:
   ```
   VITE_ENVIRONMENT=development
   ```

2. **Or simply don't set an API key** - the app will automatically use enhanced fallback responses

### API Status Indicators

The app shows the current AI support mode:
- 🟢 **AI Support Active (Cohere)**: Cohere API connected and working
- 🟡 **Enhanced Support Mode**: Using sophisticated keyword-based responses
- 🟡 **Backup Support Mode**: API error, using fallback responses

### Cohere API Features

- **Free Tier Friendly**: Uses `command-light` model with optimized token limits
- **Neurodivergent-Focused**: Custom system prompt designed for gentle, validating responses
- **Smart Fallbacks**: Seamless switching to enhanced responses if API fails
- **Cost Efficient**: Limited to 100 tokens per response to manage usage

### Security Notes

⚠️ **Important**: The current implementation makes API calls directly from the browser. In a production environment, you should:

1. **Use a backend proxy** to make API calls server-side
2. **Never expose API keys** in client-side code
3. **Implement rate limiting** and user authentication
4. **Add input validation** and content filtering

### Cost Considerations

- Cohere's free tier provides generous usage limits
- Each message uses approximately 50-100 tokens
- The app limits responses to 100 tokens to control usage
- Consider implementing usage limits for production use

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Cohere AI** - AI-powered support responses
- **CSS Custom Properties** - Theming and responsive design
- **Local Storage** - Data persistence

## Contributing

This project was built with accessibility and neurodivergent users in mind. When contributing:

- Maintain gentle, validating language
- Ensure accessibility compliance
- Test with both light and dark themes
- Consider sensory sensitivities in design choices
- Preserve the calm, supportive aesthetic

## License

MIT License - feel free to use this project as a foundation for your own mental wellness applications.
