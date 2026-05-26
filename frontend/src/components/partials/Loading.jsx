import React from 'react';

function Loading({ text = "Inicializando sistema..." }) {
  return (
    <div id="loadingScreen" className="loading-screen">
      <div className="loader-box">
        <div className="loader-logo" style={{ display: 'flex', justifyContent: 'center' }}>
          <i className="ri-settings-5-fill"></i>
        </div>
        <h2 className="loader-title">Elemsin Eirl</h2>
        <p id="loadingText">{text}</p>
        <div className="loader-bar">
          <div className="loader-progress"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;