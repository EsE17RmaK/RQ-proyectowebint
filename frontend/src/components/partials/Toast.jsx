import React from 'react';

function Toast({ message = "Bienvenido 👋", subtitle = "Acceso correcto" }) {
  return (
    <div id="welcomeToast" className="welcome-toast">
      <div className="toast-icon">
        <i className="ri-checkbox-circle-fill"></i>
      </div>
      <div className="toast-content">
        <span id="welcomeText">{message}</span>
        <small>{subtitle}</small>
        <div className="progress-bar"></div>
      </div>
    </div>
  );
}

export default Toast;