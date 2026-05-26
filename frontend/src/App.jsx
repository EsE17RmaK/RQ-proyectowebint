import React, { useState } from 'react';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import ForgotView from './components/ForgotView';
import ResetView from './components/ResetView';
import DashboardView from './components/DashboardView';
import './App.css';

function App() {
  // Estado para controlar qué pantalla se muestra
  const [currentView, setCurrentView] = useState('login');

  return (
    <div className="app-container">
      {currentView === 'login' && <LoginView onSwitchView={setCurrentView} />}
      {currentView === 'register' && <RegisterView onSwitchView={setCurrentView} />}
      {currentView === 'forgot' && <ForgotView onSwitchView={setCurrentView} />}
      {currentView === 'reset' && <ResetView onSwitchView={setCurrentView} />}
      


      {currentView === 'dashboard' && <DashboardView onSwitchView={setCurrentView} />}
    </div>
  );
}

export default App;