import React, { useState, useEffect } from 'react';
import MoodEntry from './components/MoodEntry';
import TaskCard from './components/TaskCard';
import Toast from './components/Toast';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [activeTab, setActiveTab] = useState('routine');
  const [currentMood, setCurrentMood] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [toast, setToast] = useState(null);
  const [theme, setTheme] = useState('light');
  
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Take morning medication', done: false },
    { id: 2, name: 'Eat a healthy breakfast', done: false },
    { id: 3, name: 'Review today\'s schedule', done: false },
    { id: 4, name: 'Do 5 minutes of stretching', done: false },
    { id: 5, name: 'Organize workspace/backpack', done: false }
  ]);

  const motivationalQuotes = [
    "Your neurodivergent brain is a superpower! 🌟",
    "Progress, not perfection. You're doing great! 💪",
    "Every small step counts. Be proud of yourself! 🎯",
    "Your unique perspective makes the world brighter! 🌈",
    "Take it one moment at a time. You've got this! ✨"
  ];

  const [currentQuote] = useState(
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  );

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleTaskToggle = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task.done) {
      const encouragingMessages = [
        "Amazing work! You're crushing it! 🎉",
        "You're doing great! Keep it up! ⭐",
        "Fantastic job! You should be proud! 🌟",
        "Way to go! You're making progress! 💪",
        "Excellent! You're taking care of yourself! 🎯"
      ];
      const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
      showToast(randomMessage);
    }
    
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, done: !task.done } : task
    ));
  };

  const handleMoodSelect = (mood) => {
    setCurrentMood(mood);
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMoodHistory([...moodHistory, { mood, time: timestamp }]);
  };

  const toggleCalmSound = () => {
    setIsPlayingSound(!isPlayingSound);
    // In a real app, you'd play/pause actual audio here
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const completedTasks = tasks.filter(task => task.done).length;
  const progressPercentage = (completedTasks / tasks.length) * 100;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>🧠 NeuroPal</h1>
            <p>Your daily companion</p>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <nav className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'routine' ? 'active' : ''}`}
          onClick={() => setActiveTab('routine')}
        >
          📋 Routine
        </button>
        <button 
          className={`tab-button ${activeTab === 'mood' ? 'active' : ''}`}
          onClick={() => setActiveTab('mood')}
        >
          💭 Mood
        </button>
        <button 
          className={`tab-button ${activeTab === 'calm' ? 'active' : ''}`}
          onClick={() => setActiveTab('calm')}
        >
          🧘 Calm
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'routine' && (
          <div className="routine-tab">
            <div className="progress-section">
              <h2>Daily Routine</h2>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="progress-text">
                {completedTasks} of {tasks.length} tasks completed
              </p>
            </div>
            
            <div className="tasks-container">
              {tasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggle={handleTaskToggle} 
                />
              ))}
            </div>
            
            {completedTasks === tasks.length && (
              <div className="celebration">
                🎉 Amazing! You've completed all your tasks today! 🎉
              </div>
            )}
          </div>
        )}

        {activeTab === 'mood' && (
          <div className="mood-tab">
            <h2>How are you feeling?</h2>
            <MoodEntry mood={currentMood} onSelect={handleMoodSelect} />
            
            {currentMood && (
              <div className="current-mood">
                <p>Current mood: <span className="mood-display">{currentMood}</span></p>
              </div>
            )}
            
            {moodHistory.length > 0 && (
              <div className="mood-history">
                <h3>Today's Mood Journey</h3>
                <div className="mood-timeline">
                  {moodHistory.map((entry, index) => (
                    <div key={index} className="mood-entry">
                      <span className="mood-time">{entry.time}</span>
                      <span className="mood-emoji">{entry.mood}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'calm' && (
          <div className="calm-tab">
            <h2>Take a Moment to Breathe</h2>
            
            <div className="breathing-section">
              <div className="breathing-circle">
                <div className="breathing-animation"></div>
                <p className="breathing-text">Breathe in... Breathe out...</p>
              </div>
            </div>
            
            <div className="quote-section">
              <blockquote className="motivational-quote">
                "{currentQuote}"
              </blockquote>
            </div>
            
            <div className="sound-section">
              <button 
                className={`sound-button ${isPlayingSound ? 'playing' : ''}`}
                onClick={toggleCalmSound}
              >
                {isPlayingSound ? '⏸️ Pause' : '▶️ Play'} Calm Sounds
              </button>
              {isPlayingSound && (
                <p className="sound-status">🎵 Playing peaceful nature sounds...</p>
              )}
            </div>
          </div>
        )}
      </main>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default App;