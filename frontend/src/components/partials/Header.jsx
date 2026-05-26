import React from 'react';

function Header({ usuario }) {
  const empresa = usuario?.empresa || "Elemsin Eirl";

  return (
    <header className="header" id="header" style={{ width: '100%', height: '60px', background: '#0f172a', color: '#ffffff', position: 'fixed', top: '0', left: '0', zIndex: '100', display: 'flex', alignItems: 'center', padding: '0 2rem', boxSizing: 'border-box', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div className="header__container" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" className="header__logo" style={{ color: '#ffffff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '1.1rem' }}>
          <i className="ri-settings-5-fill" style={{ color: '#38bdf8' }}></i>
          <span>{empresa}</span>
        </a>

        <button className="header__toggle" id="header-toggle" type="button" style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '1.25rem', cursor: 'pointer' }}>
          <i className="ri-menu-line"></i>
        </button>
      </div>
    </header>
  );
}

export default Header;