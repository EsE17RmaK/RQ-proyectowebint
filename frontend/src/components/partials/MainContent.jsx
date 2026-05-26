import React from 'react';

function MainContent({ children }) {
  return (
    <main className="main container" id="main" style={{ width: '100%' }}>
      <h1 className="dashboard-title" style={{ margin: '0 0 1.5rem 0', color: '#0f172a', fontSize: '1.75rem', fontWeight: '700' }}>Dashboard</h1>
      <div className="dashboard-grid" style={{ width: '100%' }}>
        {children}
      </div>
    </main>
  );
}

export default MainContent;