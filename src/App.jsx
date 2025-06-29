import React, { useState, useEffect } from 'react';
import MoodEntry from './components/MoodEntry';
import TaskCard from './components/TaskCard';
import Toast from './components/Toast';
import ThemeToggle from './components/ThemeToggle';
import EnergyTracker from './components/EnergyTracker';
import SensoryCheckIn from './components/SensoryCheckIn';
import MoodReflection from './components/MoodReflection';
import CompassionateChat from './components/CompassionateChat';
import TransitionHelper from './components/TransitionHelper';
import CalendarView from './components/CalendarView';
import CalmView from './components/CalmView';

function App() {
  const [activeTab, setActiveTab] = useState('routine');
  const [currentMood, setCurrentMood] = useState('');
  const [currentEnergy, setCurrentEnergy] = useState(3);
  const [moodHistory, setMoodHistory] = useState([]);
  const [energyHistory, setEnergyHistory] = useState([]);
  const [moodReflection, setMoodReflection] = useState('');
  const [sensoryNeeds, setSensoryNeeds] = useState([]);
  const [toast, setToast] = useState(null);
  const [theme, setTheme] = useState('light');
  const [streakCount, setStreakCount] = useState(0);
  const [showTransitionHelper, setShowTransitionHelper] = useState(false);
  const [nextTask, setNextTask] = useState('');
  const [calendarRef, setCalendarRef] = useState(null);
  
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Take morning medication', done: false },
    { id: 2, name: 'Eat a healthy breakfast', done: false },
    { id: 3, name: 'Review today\'s schedule', done: false },
    { id: 4, name: 'Do 5 minutes of stretching', done: false },
    { id: 5, name: 'Organize workspace/backpack', done: false }
  ]);

  // Load streak from localStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem('neuropal-streak');
    if (savedStreak) {
      setStreakCount(parseInt(savedStreak));
    }
  }, []);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Check for transition helper trigger
  useEffect(() => {
    const completedTasks = tasks.filter(task => task.done).length;
    const incompleteTasks = tasks.filter(task => !task.done);
    
    if (completedTasks > 0 && incompleteTasks.length > 0) {
      const next = incompleteTasks[0];
      if (nextTask !== next.name) {
        setNextTask(next.name);
        setShowTransitionHelper(true);
        setTimeout(() => setShowTransitionHelper(false), 8000);
      }
    }
  }, [tasks, nextTask]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const getMoodBasedTip = (mood) => {
    const tips = {
      '😊': "You're radiating positive energy! Maybe share that joy with someone special today 🌻",
      '😐': "Neutral days are perfectly okay. Sometimes just existing is enough, and that's beautiful 🤍",
      '😢': "It's brave to acknowledge sadness. Would a warm drink or soft blanket help comfort you right now? 🫖",
      '😡': "Frustration shows you care deeply. Try the 4-7-8 breathing: breathe in for 4, hold for 7, out for 8 💨",
      '😴': "Your body is asking for rest, and that's wisdom. Honor what you need - you deserve gentle care 🌙",
      '😰': "Anxiety can feel overwhelming, but you're not alone. Try naming 5 things you can see around you 👀",
      '🤗': "Your excitement is contagious! Channel that beautiful energy into something that brings you joy ⚡",
      '😌': "What a gift to feel calm. Take a moment to appreciate this peaceful feeling within you 🕊️"
    };
    return tips[mood] || "You're doing great just by checking in with yourself today 💜";
  };

  const getEnergyBasedSuggestion = (energy, mood) => {
    if (energy <= 2) {
      return "Low energy days call for extra gentleness. Maybe try one small, nurturing task? 🌱";
    } else if (energy >= 4) {
      return "You have good energy today! This might be perfect for tackling something you've been putting off ⚡";
    }
    return "Medium energy is perfect for steady, mindful progress. You're doing just right 🌿";
  };

  const handleTaskToggle = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task.done) {
      const encouragingMessages = [
        "Look at you taking care of yourself! That's something to be genuinely proud of 🌟",
        "You're building such beautiful habits, one gentle step at a time ✨",
        "Every task you complete is an act of self-love. You're doing wonderfully! 💜",
        "Your future self is going to thank you for this kindness you're showing yourself 🦋",
        "Progress isn't always loud - sometimes it's quiet and steady, just like this 🌸"
      ];
      const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
      showToast(randomMessage);
    }
    
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, done: !task.done } : task
    ));

    // Update streak
    const newTasks = tasks.map(task => 
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    const completedCount = newTasks.filter(t => t.done).length;
    
    if (completedCount === tasks.length) {
      const newStreak = streakCount + 1;
      setStreakCount(newStreak);
      localStorage.setItem('neuropal-streak', newStreak.toString());
      showToast(`🔥 ${newStreak} day streak! You're building something beautiful!`, 'celebration');
    }
  };

  const handleMoodSelect = (mood) => {
    setCurrentMood(mood);
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEntry = { mood, time: timestamp };
    setMoodHistory([...moodHistory, newEntry]);
    
    // Update calendar data
    if (calendarRef && calendarRef.addTodayData) {
      calendarRef.addTodayData(mood, currentEnergy, moodReflection);
    }
    
    // Show mood-based tip
    setTimeout(() => {
      showToast(getMoodBasedTip(mood), 'tip');
    }, 1000);
  };

  const handleEnergySelect = (energy) => {
    setCurrentEnergy(energy);
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setEnergyHistory([...energyHistory, { energy, time: timestamp }]);
    
    // Update calendar data
    if (calendarRef && calendarRef.addTodayData) {
      calendarRef.addTodayData(currentMood, energy, moodReflection);
    }
    
    setTimeout(() => {
      showToast(getEnergyBasedSuggestion(energy, currentMood), 'tip');
    }, 1000);
  };

  const handleSensoryUpdate = (sensory) => {
    setSensoryNeeds(sensory);
    if (sensory.length > 0) {
      showToast("Thank you for honoring your sensory needs. You know yourself best 🤗", 'support');
    }
  };

  const handleReflectionChange = (reflection) => {
    setMoodReflection(reflection);
    // Update calendar data with reflection
    if (calendarRef && calendarRef.addTodayData && (currentMood || currentEnergy)) {
      calendarRef.addTodayData(currentMood, currentEnergy, reflection);
    }
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
            <p>Your gentle daily companion</p>
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
          💭 Feelings
        </button>
        <button 
          className={`tab-button ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          📅 My Week
        </button>
        <button 
          className={`tab-button ${activeTab === 'calm' ? 'active' : ''}`}
          onClick={() => setActiveTab('calm')}
        >
          🧘 Calm
        </button>
        <button 
          className={`tab-button ${activeTab === 'support' ? 'active' : ''}`}
          onClick={() => setActiveTab('support')}
        >
          💜 Support
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'routine' && (
          <div className="routine-tab">
            <div className="progress-section">
              <div className="routine-header">
                <h2>Your Daily Journey</h2>
                {streakCount > 0 && (
                  <div className="streak-counter">
                    <span className="streak-flame">🔥</span>
                    <span className="streak-text">{streakCount} day{streakCount !== 1 ? 's' : ''} of self-care</span>
                  </div>
                )}
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="progress-text">
                {completedTasks} of {tasks.length} gentle steps completed
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
                🌟 You've completed your entire routine! Your dedication to self-care is truly inspiring 🌟
              </div>
            )}

            <EnergyTracker 
              energy={currentEnergy} 
              onEnergySelect={handleEnergySelect}
            />
          </div>
        )}

        {activeTab === 'mood' && (
          <div className="mood-tab">
            <h2>How is your heart feeling today?</h2>
            <MoodEntry mood={currentMood} onSelect={handleMoodSelect} />
            
            {currentMood && (
              <div className="current-mood">
                <p>Right now you're feeling: <span className="mood-display">{currentMood}</span></p>
              </div>
            )}

            {currentMood && (
              <MoodReflection 
                reflection={moodReflection}
                onReflectionChange={handleReflectionChange}
              />
            )}

            <SensoryCheckIn 
              sensoryNeeds={sensoryNeeds}
              onSensoryUpdate={handleSensoryUpdate}
            />
            
            {moodHistory.length > 0 && (
              <div className="mood-history">
                <h3>Your Emotional Journey Today</h3>
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

        {activeTab === 'calendar' && (
          <CalendarView 
            ref={setCalendarRef}
            moodHistory={moodHistory}
            energyHistory={energyHistory}
            onDataUpdate={(data) => {
              // Handle calendar data updates if needed
            }}
          />
        )}

        {activeTab === 'calm' && <CalmView />}

        {activeTab === 'support' && (
          <div className="support-tab">
            <CompassionateChat />
          </div>
        )}
      </main>

      {showTransitionHelper && (
        <TransitionHelper 
          nextTask={nextTask}
          onClose={() => setShowTransitionHelper(false)}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default App;