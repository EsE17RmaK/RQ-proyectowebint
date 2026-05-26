import React, { useState, useEffect } from 'react';
import Loading from './partials/Loading';
import Toast from './partials/Toast';
import Header from './partials/Header';
import Sidebar from './partials/Sidebar';
import MainContent from './partials/MainContent';

const USUARIO_DEFECTO = {
  nombre: "Ignacio Cerna",
  rol: "Administrador",
  empresa: "Elemsin Eirl"
};

function DashboardView({ onSwitchView, usuario = USUARIO_DEFECTO }) {
  const [showLoading, setShowLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setShowLoading(false);
      setShowToast(true);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    if (showToast) {
      const toastTimeout = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(toastTimeout);
    }
  }, [showToast]);

  return (
    <div className="dashboard-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f4f6f9', fontFamily: 'sans-serif' }}>
      {showLoading && <Loading text={`Inicializando sistema para ${usuario.empresa}...`} />}
      {showToast && <Toast message={`Bienvenido 👋 ${usuario.nombre}`} subtitle="Acceso correcto al panel" />}

      {/* Cabecera superior fija */}
      <Header usuario={usuario} />
      
      {/* Cuerpo del Dashboard con alineación horizontal explícita */}
      <div className="dashboard-body-wrapper" style={{ display: 'flex', flex: '1', width: '100%', marginTop: '60px' }}>

        {/* Barra lateral */}
        <Sidebar onLogout={() => onSwitchView('login')} usuario={usuario} />
        
        {/* Contenedor de las tablas y contenidos */}
        <div style={{ flex: '1', padding: '2rem', boxSizing: 'border-box' }}>
          <MainContent>
            <div className="dashboard-card-placeholder" style={{ padding: '2rem', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #eef2f5' }}>
              <h2 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '1.5rem' }}>Panel de Control — {usuario.rol}</h2>
              <h3 style={{ margin: '0 0 1rem 0', color: '#64748b', fontWeight: '500', fontSize: '1.1rem' }}>Módulos de Requerimientos y Usuarios</h3>
              <p style={{ margin: '0', color: '#94a3b8', lineHeight: '1.5' }}>Aquí se acoplarán las tablas dinámicas consumidas desde Spring Boot.</p>
            </div>
          </MainContent>
        </div>

      </div>
    </div>
  );
}

export default DashboardView;