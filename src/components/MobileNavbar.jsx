import React from 'react';

const MobileNavbar = ({ activeTab, setActiveTab }) => {
  const navigationItems = [
    { id: 'routine', icon: '📋', label: 'Routine' },
    { id: 'mood', icon: '💭', label: 'Feelings' },
    { id: 'calendar', icon: '📅', label: 'Week' },
    { id: 'calm', icon: '🧘', label: 'Calm' },
    { id: 'support', icon: '💜', label: 'Support' }
  ];

  return (
    <nav className="mobile-navbar" role="navigation" aria-label="Main navigation">
      <div className="mobile-nav-container">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={`mobile-nav-button ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            aria-current={activeTab === item.id ? 'page' : undefined}
          >
            <span className="mobile-nav-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span className="mobile-nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavbar;