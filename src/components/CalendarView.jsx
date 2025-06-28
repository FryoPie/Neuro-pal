import React, { useState, useEffect } from 'react';

const CalendarView = ({ moodHistory, energyHistory, onDataUpdate }) => {
  const [selectedWeek, setSelectedWeek] = useState(0); // 0 = current week, -1 = last week, etc.
  const [calendarData, setCalendarData] = useState({});
  const [weeklyInsights, setWeeklyInsights] = useState(null);

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

  const getMoodColor = (mood) => {
    const colors = {
      '😊': '#FFD93D',
      '😐': '#A8A8A8',
      '😢': '#6BB6FF',
      '😡': '#FF6B6B',
      '😴': '#B19CD9',
      '😰': '#FFB347',
      '🤗': '#FF69B4',
      '😌': '#98D8C8'
    };
    return colors[mood] || '#E2E8F0';
  };

  const getEnergyColor = (energy) => {
    const colors = ['#FF6B6B', '#FFB347', '#FFD93D', '#98D8C8', '#4FD1C7'];
    return colors[energy - 1] || '#E2E8F0';
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const generateTherapistReport = () => {
    const allData = Object.entries(calendarData)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .slice(-30); // Last 30 days

    let report = "NeuroPal - Monthly Mood & Energy Report\n";
    report += "=====================================\n\n";
    
    report += `Report Period: ${allData.length > 0 ? new Date(allData[0][0]).toLocaleDateString() : 'N/A'} - ${new Date().toLocaleDateString()}\n`;
    report += `Total Data Points: ${allData.length}\n\n`;

    if (allData.length > 0) {
      // Mood summary
      const moods = allData.map(([_, data]) => data.mood).filter(Boolean);
      const moodCounts = moods.reduce((acc, mood) => {
        const moodNames = {
          '😊': 'Happy', '😐': 'Neutral', '😢': 'Sad', '😡': 'Frustrated',
          '😴': 'Tired', '😰': 'Anxious', '🤗': 'Excited', '😌': 'Calm'
        };
        const name = moodNames[mood] || mood;
        acc[name] = (acc[name] || 0) + 1;
        return acc;
      }, {});

      report += "MOOD FREQUENCY:\n";
      Object.entries(moodCounts)
        .sort(([,a], [,b]) => b - a)
        .forEach(([mood, count]) => {
          const percentage = ((count / moods.length) * 100).toFixed(1);
          report += `  ${mood}: ${count} times (${percentage}%)\n`;
        });

      // Energy summary
      const energies = allData.map(([_, data]) => data.energy).filter(Boolean);
      if (energies.length > 0) {
        const avgEnergy = (energies.reduce((sum, e) => sum + e, 0) / energies.length).toFixed(1);
        const lowEnergyDays = energies.filter(e => e <= 2).length;
        const highEnergyDays = energies.filter(e => e >= 4).length;

        report += "\nENERGY LEVELS:\n";
        report += `  Average Energy: ${avgEnergy}/5\n`;
        report += `  Low Energy Days (1-2): ${lowEnergyDays}\n`;
        report += `  High Energy Days (4-5): ${highEnergyDays}\n`;
      }

      // Daily entries
      report += "\nDAILY ENTRIES:\n";
      allData.forEach(([date, data]) => {
        const moodNames = {
          '😊': 'Happy', '😐': 'Neutral', '😢': 'Sad', '😡': 'Frustrated',
          '😴': 'Tired', '😰': 'Anxious', '🤗': 'Excited', '😌': 'Calm'
        };
        report += `${new Date(date).toLocaleDateString()}: `;
        if (data.mood) report += `Mood: ${moodNames[data.mood] || data.mood} `;
        if (data.energy) report += `Energy: ${data.energy}/5 `;
        if (data.reflection) report += `Note: "${data.reflection}"`;
        report += "\n";
      });
    }

    // Create downloadable file
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neuropal-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <h2>📅 Your Journey Calendar</h2>
        <p>Track your daily mood and energy patterns</p>
        
        <div className="week-navigation">
          <button 
            onClick={() => setSelectedWeek(selectedWeek - 1)}
            className="week-nav-button"
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
          >
            Next Week →
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {weekDates.map((date, index) => {
          const dateKey = date.toDateString();
          const dayData = calendarData[dateKey];
          const isCurrentDay = isToday(date);
          
          return (
            <div 
              key={dateKey} 
              className={`calendar-day ${isCurrentDay ? 'today' : ''} ${dayData ? 'has-data' : ''}`}
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
                      title={`Mood: ${dayData.mood}`}
                    >
                      {dayData.mood}
                    </div>
                  )}
                  {dayData.energy && (
                    <div 
                      className="energy-indicator"
                      style={{ backgroundColor: getEnergyColor(dayData.energy) }}
                      title={`Energy: ${dayData.energy}/5`}
                    >
                      <span className="energy-level">{dayData.energy}</span>
                    </div>
                  )}
                  {dayData.reflection && (
                    <div className="reflection-indicator" title={dayData.reflection}>
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
              <h4>🧠 Patterns & Suggestions</h4>
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
          onClick={generateTherapistReport}
          className="therapist-report-button"
          disabled={Object.keys(calendarData).length === 0}
        >
          📋 Generate Report for Healthcare Provider
        </button>
        <p className="report-description">
          Creates a comprehensive summary of your mood and energy patterns for the past 30 days
        </p>
      </div>

      <div className="calendar-legend">
        <h4>Legend</h4>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color mood-legend"></div>
            <span>Mood (emoji with background color)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color energy-legend"></div>
            <span>Energy Level (1-5 scale)</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">📝</span>
            <span>Personal reflection recorded</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;