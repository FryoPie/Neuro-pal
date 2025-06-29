# NeuroPal - Your Daily Companion

A supportive routine & mood tracker for neurodivergent teens. Built for Bolt Hackathon 2025.

## Features

- **Daily Routine Tracking**: Gentle task management with encouraging feedback
- **Mood & Energy Monitoring**: Track emotional states with compassionate responses
- **Calendar View**: Visual weekly insights and pattern recognition
- **Calm Tools**: Grounding techniques, CBT prompts, and sensory regulation
- **AI Support**: Compassionate chat companion with emotional validation
- **Accessibility**: Dark/light themes, reduced motion support, high contrast compatibility

## AI Support Setup

The AI Support tab can use either OpenAI's GPT-3.5 API or enhanced fallback responses.

### Option 1: Using OpenAI API (Recommended)

1. **Get an OpenAI API Key**:
   - Visit [OpenAI's website](https://platform.openai.com/api-keys)
   - Create an account or sign in
   - Generate a new API key
   - Copy the key (starts with `sk-`)

2. **Configure Environment Variables**:
   - Create a `.env.local` file in your project root
   - Add your API key:
     ```
     VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
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

If you prefer not to use the OpenAI API or want to test without it:

1. **Set Environment to Development**:
   ```
   VITE_ENVIRONMENT=development
   ```

2. **Or simply don't set an API key** - the app will automatically use enhanced fallback responses

### API Status Indicators

The app shows the current AI support mode:
- 🟢 **AI Support Active**: OpenAI API connected and working
- 🟡 **Enhanced Support Mode**: Using sophisticated keyword-based responses
- 🟡 **Backup Support Mode**: API error, using fallback responses

### Security Notes

⚠️ **Important**: The current implementation uses `dangerouslyAllowBrowser: true` for the OpenAI client. In a production environment, you should:

1. **Use a backend proxy** to make API calls server-side
2. **Never expose API keys** in client-side code
3. **Implement rate limiting** and user authentication
4. **Add input validation** and content filtering

### Cost Considerations

- Each message costs approximately $0.0015-$0.002 (GPT-3.5-turbo pricing)
- The app limits messages to 150 tokens to control costs
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
- **OpenAI API** - AI-powered support responses
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