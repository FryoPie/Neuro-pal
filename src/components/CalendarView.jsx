import React, { useState, useEffect } from 'react';

const CalendarView = ({ moodHistory, energyHistory, onDataUpdate }) => {
  const [selectedWeek, setSelectedWeek] = useState(0); // 0 = current week, -1 = last week, etc.
  const [calendarData, setCalendarData] = useState({});
  const [weeklyInsights, setWeeklyInsights] = useState(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  // Get dates for the selected week
  const getWeekDates = (weekOffset = 0) => {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay + (weekOffset * 7));
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getWeekDates(selectedWeek);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Load calendar data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('neuropal-calendar-data');
    if (savedData) {
      setCalendarData(JSON.parse(savedData));
    }
  }, []);

  // Save calendar data to localStorage
  const saveCalendarData = (data) => {
    setCalendarData(data);
    localStorage.setItem('neuropal-calendar-data', JSON.stringify(data));
  };

  // Add today's data
  const addTodayData = (mood, energy, reflection = '') => {
    const today = new Date().toDateString();
    const newData = {
      ...calendarData,
      [today]: {
        mood,
        energy,
        reflection,
        timestamp: new Date().toISOString()
      }
    };
    saveCalendarData(newData);
    if (onDataUpdate) onDataUpdate(newData);
  };

  // Calculate weekly insights
  useEffect(() => {
    const weekData = weekDates.map(date => calendarData[date.toDateString()]).filter(Boolean);
    
    if (weekData.length > 0) {
      const moods = weekData.map(d => d.mood).filter(Boolean);
      const energies = weekData.map(d => d.energy).filter(Boolean);
      
      // Mood frequency analysis
      const moodCounts = moods.reduce((acc, mood) => {
        acc[mood] = (acc[mood] || 0) + 1;
        return acc;
      }, {});
      
      const dominantMood = Object.keys(moodCounts).reduce((a, b) => 
        moodCounts[a] > moodCounts[b] ? a : b, Object.keys(moodCounts)[0]
      );

      // Energy analysis
      const avgEnergy = energies.reduce((sum, e) => sum + e, 0) / energies.length;
      const energyTrend = energies.length > 1 ? 
        (energies[energies.length - 1] - energies[0] > 0 ? 'increasing' : 
         energies[energies.length - 1] - energies[0] < 0 ? 'decreasing' : 'stable') : 'stable';

      // Pattern detection
      const patterns = [];
      
      // Low energy pattern
      if (avgEnergy < 2.5) {
        patterns.push({
          type: 'energy',
          message: 'Your energy has been consistently low this week. Consider prioritizing rest and gentle self-care.',
          suggestion: 'Try shorter tasks, more breaks, and ensure you\'re getting enough sleep.'
        });
      }
      
      // High energy pattern
      if (avgEnergy > 4) {
        patterns.push({
          type: 'energy',
          message: 'You\'ve had great energy this week! This is wonderful progress.',
          suggestion: 'Keep up whatever you\'re doing - it\'s working well for you!'
        });
      }

      // Mood stability
      const uniqueMoods = new Set(moods).size;
      if (uniqueMoods <= 2 && moods.length > 3) {
        patterns.push({
          type: 'mood',
          message: 'Your mood has been quite consistent this week.',
          suggestion: 'Consistency can be a sign of good emotional regulation.'
        });
      } else if (uniqueMoods > 4) {
        patterns.push({
          type: 'mood',
          message: 'You\'ve experienced a wide range of emotions this week.',
          suggestion: 'This is completely normal. Consider what might be contributing to these changes.'
        });
      }

      setWeeklyInsights({
        dominantMood,
        avgEnergy: Math.round(avgEnergy * 10) / 10,
        energyTrend,
        patterns,
        dataPoints: weekData.length,
        moodCounts
      });
    } else {
      setWeeklyInsights(null);
    }
  }, [calendarData, selectedWeek]);

  // Emotion-coded day background colors
  const getDayBackgroundColor = (dayData) => {
    if (!dayData) return 'var(--surface-soft)';
    
    const { mood, energy } = dayData;
    
    // Positive moods
    if (['😊', '🤗', '😍'].includes(mood)) {
      return '#E7F5E9'; // Green for positive days
    }
    
    // Calm/peaceful moods
    if (['😌', '🧘'].includes(mood)) {
      return '#E3F2FD'; // Blue for calm days
    }
    
    // Neutral moods
    if (['😐', '😶'].includes(mood)) {
      return '#FFF7E6'; // Yellow for neutral days
    }
    
    // Low energy or tired
    if (energy <= 2 || ['😴', '🪫'].includes(mood)) {
      return '#F5F5F5'; // Gray for low energy days
    }
    
    // Default
    return 'var(--surface-soft)';
  };

  const getMoodColor = (mood) => {
    const colors = {
      '😊': '#8A9A5B',
      '😐': '#928E85',
      '😢': '#6B8CAE',
      '😡': '#A5705B',
      '😴': '#8A7CA8',
      '😰': '#B5A05B',
      '🤗': '#A67B8A',
      '😌': '#7A9A8A',
      '😶': '#A8A49B',
      '🤯': '#B58A7A',
      '😠': '#A5705B',
      '😍': '#8A9A7B',
      '🧘': '#7A9A8A'
    };
    return colors[mood] || '#928E85';
  };

  const getEnergyColor = (energy) => {
    const colors = ['#A5705B', '#B5A05B', '#8A9A5B', '#7A9A8A', '#6B8A7A'];
    return colors[energy - 1] || '#928E85';
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const generateWeeklyWellnessReport = async () => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const weekData = weekDates.map(date => ({
      date: date.toDateString(),
      data: calendarData[date.toDateString()]
    })).filter(item => item.data);

    let report = "📄 Weekly Wellness Report - NeuroPal\n";
    report += "=====================================\n\n";
    
    const startDate = weekDates[0].toLocaleDateString();
    const endDate = weekDates[6].toLocaleDateString();
    report += `📅 Week of: ${startDate} - ${endDate}\n`;
    report += `📊 Data Points Collected: ${weekData.length}/7 days\n\n`;

    if (weekData.length > 0) {
      // Mood summary
      const moods = weekData.map(item => item.data.mood).filter(Boolean);
      const moodCounts = moods.reduce((acc, mood) => {
        const moodNames = {
          '😊': 'Happy', '😐': 'Neutral', '😢': 'Sad', '😡': 'Frustrated',
          '😴': 'Tired', '😰': 'Anxious', '🤗': 'Excited', '😌': 'Calm',
          '😶': 'Numb', '🤯': 'Overwhelmed', '😠': 'Irritated', '😍': 'Loved',
          '🧘': 'Calm Focused'
        };
        const name = moodNames[mood] || mood;
        acc[name] = (acc[name] || 0) + 1;
        return acc;
      }, {});

      report += "💭 EMOTIONAL PATTERNS:\n";
      Object.entries(moodCounts)
        .sort(([,a], [,b]) => b - a)
        .forEach(([mood, count]) => {
          const percentage = ((count / moods.length) * 100).toFixed(1);
          report += `   ${mood}: ${count} times (${percentage}%)\n`;
        });

      // Energy summary
      const energies = weekData.map(item => item.data.energy).filter(Boolean);
      if (energies.length > 0) {
        const avgEnergy = (energies.reduce((sum, e) => sum + e, 0) / energies.length).toFixed(1);
        const lowEnergyDays = energies.filter(e => e <= 2).length;
        const highEnergyDays = energies.filter(e => e >= 4).length;

        report += "\n⚡ ENERGY LEVELS:\n";
        report += `   Average Energy: ${avgEnergy}/5\n`;
        report += `   Low Energy Days (1-2): ${lowEnergyDays}\n`;
        report += `   High Energy Days (4-5): ${highEnergyDays}\n`;
      }

      // Weekly insights
      if (weeklyInsights && weeklyInsights.patterns.length > 0) {
        report += "\n🧠 INSIGHTS & PATTERNS:\n";
        weeklyInsights.patterns.forEach((pattern, index) => {
          report += `   ${index + 1}. ${pattern.message}\n`;
          report += `      💡 ${pattern.suggestion}\n\n`;
        });
      }

      // Daily entries
      report += "\n📝 DAILY ENTRIES:\n";
      weekData.forEach(({ date, data }) => {
        const moodNames = {
          '😊': 'Happy', '😐': 'Neutral', '😢': 'Sad', '😡': 'Frustrated',
          '😴': 'Tired', '😰': 'Anxious', '🤗': 'Excited', '😌': 'Calm',
          '😶': 'Numb', '🤯': 'Overwhelmed', '😠': 'Irritated', '😍': 'Loved',
          '🧘': 'Calm Focused'
        };
        report += `${new Date(date).toLocaleDateString()}: `;
        if (data.mood) report += `Mood: ${moodNames[data.mood] || data.mood} `;
        if (data.energy) report += `Energy: ${data.energy}/5 `;
        if (data.reflection) report += `\n   Reflection: "${data.reflection}"`;
        report += "\n";
      });
    }

    report += "\n💜 Remember: This data is a tool for self-understanding, not judgment.\n";
    report += "Every emotion and energy level is valid. You're doing great! 🌱\n\n";
    report += "Generated by NeuroPal - Your gentle companion";

    // Create downloadable file
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neuropal-weekly-wellness-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setIsGeneratingReport(false);
    setReportGenerated(true);
    setTimeout(() => setReportGenerated(false), 3000);
  };

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <h2>📅 Your Journey Calendar</h2>
        <p>Track your daily emotional patterns with gentle awareness</p>
        
        <div className="week-navigation">
          <button 
            onClick={() => setSelectedWeek(selectedWeek - 1)}
            className="week-nav-button"
            aria-label="Previous week"
          >
            ← Previous Week
          </button>
          <span className="current-week">
            {selectedWeek === 0 ? 'This Week' : 
             selectedWeek === -1 ? 'Last Week' : 
             `${Math.abs(selectedWeek)} weeks ago`}
          </span>
          <button 
            onClick={() => setSelectedWeek(selectedWeek + 1)}
            className="week-nav-button"
            disabled={selectedWeek >= 0}
            aria-label="Next week"
          >
            Next Week →
          </button>
        </div>
      </div>

      <div className="calendar-grid" role="grid" aria-label="Weekly calendar">
        {weekDates.map((date, index) => {
          const dateKey = date.toDateString();
          const dayData = calendarData[dateKey];
          const isCurrentDay = isToday(date);
          const backgroundColor = getDayBackgroundColor(dayData);
          
          return (
            <div 
              key={dateKey} 
              className={`calendar-day ${isCurrentDay ? 'today' : ''} ${dayData ? 'has-data' : ''}`}
              style={{ backgroundColor }}
              role="gridcell"
              aria-label={`${weekDays[index]} ${formatDate(date)}${dayData ? ', has mood data' : ''}`}
              title={dayData ? `Mood: ${dayData.mood || 'Not set'}, Energy: ${dayData.energy || 'Not set'}/5` : 'No data recorded'}
            >
              <div className="day-header">
                <span className="day-name">{weekDays[index]}</span>
                <span className="day-date">{formatDate(date)}</span>
              </div>
              
              {dayData ? (
                <div className="day-data">
                  {dayData.mood && (
                    <div 
                      className="mood-indicator"
                      style={{ backgroundColor: getMoodColor(dayData.mood) }}
                      aria-label={`Mood: ${dayData.mood}`}
                    >
                      {dayData.mood}
                    </div>
                  )}
                  {dayData.energy && (
                    <div 
                      className="energy-indicator"
                      style={{ backgroundColor: getEnergyColor(dayData.energy) }}
                      aria-label={`Energy level: ${dayData.energy} out of 5`}
                    >
                      <span className="energy-level">{dayData.energy}</span>
                    </div>
                  )}
                  {dayData.reflection && (
                    <div 
                      className="reflection-indicator" 
                      title={dayData.reflection}
                      aria-label="Personal reflection recorded"
                    >
                      📝
                    </div>
                  )}
                </div>
              ) : (
                <div className="no-data">
                  {isCurrentDay && <span className="today-marker">Today</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {weeklyInsights && (
        <div className="weekly-insights">
          <h3>🔍 Weekly Insights</h3>
          
          <div className="insights-grid">
            <div className="insight-card">
              <h4>Dominant Mood</h4>
              <div className="insight-value">
                <span className="mood-large">{weeklyInsights.dominantMood}</span>
              </div>
            </div>
            
            <div className="insight-card">
              <h4>Average Energy</h4>
              <div className="insight-value">
                <span className="energy-large">{weeklyInsights.avgEnergy}/5</span>
                <span className={`trend ${weeklyInsights.energyTrend}`}>
                  {weeklyInsights.energyTrend === 'increasing' ? '📈' : 
                   weeklyInsights.energyTrend === 'decreasing' ? '📉' : '➡️'}
                </span>
              </div>
            </div>
            
            <div className="insight-card">
              <h4>Data Points</h4>
              <div className="insight-value">
                <span className="data-count">{weeklyInsights.dataPoints}/7</span>
                <span className="data-label">days tracked</span>
              </div>
            </div>
          </div>

          {weeklyInsights.patterns.length > 0 && (
            <div className="patterns-section">
              <h4>🧠 Patterns & Gentle Suggestions</h4>
              {weeklyInsights.patterns.map((pattern, index) => (
                <div key={index} className="pattern-card">
                  <p className="pattern-message">{pattern.message}</p>
                  <p className="pattern-suggestion">💡 {pattern.suggestion}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="calendar-actions">
        <button 
          onClick={generateWeeklyWellnessReport}
          className={`wellness-report-button ${isGeneratingReport ? 'generating' : ''} ${reportGenerated ? 'generated' : ''}`}
          disabled={Object.keys(calendarData).length === 0 || isGeneratingReport}
          aria-label="Generate weekly wellness report"
        >
          {isGeneratingReport ? (
            <>
              <span className="loading-spinner" aria-hidden="true">⏳</span>
              Generating Report...
            </>
          ) : reportGenerated ? (
            <>
              <span className="success-icon" aria-hidden="true">✅</span>
              Report Downloaded!
            </>
          ) : (
            <>
              📄 Generate Weekly Wellness Report
            </>
          )}
        </button>
        <p className="report-description">
          Creates a comprehensive, gentle summary of your emotional patterns for this week
        </p>
      </div>

      <div className="calendar-legend">
        <h4>Understanding Your Calendar</h4>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#E7F5E9' }}></div>
            <span>Positive & joyful days</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#E3F2FD' }}></div>
            <span>Calm & peaceful days</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#FFF7E6' }}></div>
            <span>Neutral & steady days</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#F5F5F5' }}></div>
            <span>Low energy & rest days</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon" style={{ fontSize: '24px' }}>📝</span>
            <span>Personal reflection recorded</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;