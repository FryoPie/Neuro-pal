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
              <div className="brand-logo">
                <img 
                  src="/src/assets/Neuro-logo.png" 
                  alt="NeuroPal Logo" 
                  className="logo-image"
                  onError={(e) => {
                    // Fallback to emoji if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }}
                />
                <span className="logo-fallback" style={{ display: 'none' }}>🧠</span>
                <h1>NeuroPal</h1>
              </div>
              <p style={{ marginBottom: '0.25rem' }}>Your gentle companion</p>
              <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                🚀 Built with <a 
                  href="https://bolt.new" 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ color: 'inherit', textDecoration: 'underline' }}>
                  Bolt.new
                </a>
              </p>
            </div>
          )}
          
          {isCollapsed && (
            <div className="sidebar-brand-collapsed">
              <img 
                src="/src/assets/Neuro-logo.png" 
                alt="NeuroPal Logo" 
                className="logo-image-small"
                onError={(e) => {
                  // Fallback to emoji if image fails to load
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              <span className="logo-fallback-small" style={{ display: 'none' }}>🧠</span>
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
