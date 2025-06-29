import React from 'react';

const Sidebar = ({ activeTab, setActiveTab, isCollapsed, toggleSidebar }) => {
  const navigationItems = [
    {
      id: 'routine',
      icon: '📋',
      label: 'Routine',
      description: 'Daily tasks & habits'
    },
    {
      id: 'mood',
      icon: '💭',
      label: 'Feelings',
      description: 'Mood & emotions'
    },
    {
      id: 'calendar',
      icon: '📅',
      label: 'My Week',
      description: 'Weekly insights'
    },
    {
      id: 'calm',
      icon: '🧘',
      label: 'Calm',
      description: 'Mindfulness & tools'
    },
    {
      id: 'support',
      icon: '💜',
      label: 'Support',
      description: 'AI companion'
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`sidebar-overlay ${!isCollapsed ? 'active' : ''}`}
        onClick={toggleSidebar}
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <aside 
        className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <button
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!isCollapsed}
          >
            <span className="toggle-icon">
              {isCollapsed ? '→' : '←'}
            </span>
          </button>
          
          {!isCollapsed && (
            <div className="sidebar-brand">
              <h1>🧠 NeuroPal</h1>
              <p>Your gentle companion</p>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          <ul className="nav-list" role="list">
            {navigationItems.map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-button ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                  aria-current={activeTab === item.id ? 'page' : undefined}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span className="nav-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <div className="nav-content">
                      <span className="nav-label">{item.label}</span>
                      <span className="nav-description">{item.description}</span>
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        {!isCollapsed && (
          <div className="sidebar-footer">
            <div className="footer-content">
              <p className="footer-text">Take care of yourself today 💜</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;