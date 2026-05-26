import React, { useState, useEffect } from 'react';
import Loading from './partials/Loading';
import Toast from './partials/Toast';
import Header from './partials/Header';
import Sidebar from './partials/Sidebar';
import MainContent from './partials/MainContent';

function DashboardView({ onSwitchView, usuario }) {
  const [showLoading, setShowLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [requerimientos, setRequerimientos] = useState([]);
  const [errorTabla, setErrorTabla] = useState('');

  // 1. Obtener el usuario activo 
  const infoUsuario = usuario || JSON.parse(localStorage.getItem('usuario')) || {
    nombre: "Usuario Completo",
    rol: "Consultor",
    empresa: "Elemsin Eirl"
  };

  // 2. Efecto de carga inicial y consumo de la API de Spring Boot
  useEffect(() => {
    const cargarDatosYTabla = async () => {
      try {
        // Consumir la API real que creaste en Java
        const response = await fetch('http://localhost:8080/api/v1/requerimientos');
        if (response.ok) {
          const datosAPI = await response.json();
          // Corregido: cambiamos 'setRevenimiento' por 'setRequerimientos'
          setRequerimientos(datosAPI); 
          setErrorTabla(''); // Limpiamos cualquier error previo si todo sale OK
        } else {
          setErrorTabla('No se pudieron cargar los requerimientos del servidor.');
        }
      } catch (error) {
        console.error("Error al traer la lista del CRUD:", error);
        setErrorTabla('Error de conexión con el backend de soporte.');
      } finally {
        // Apagar pantalla de carga y encender notificación de bienvenida
        setShowLoading(false);
        setShowToast(true);
      }
    };

    cargarDatosYTabla();
  }, []);

  // 3. Temporizador del Toast de Bienvenida
  useEffect(() => {
    if (showToast) {
      const toastTimeout = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(toastTimeout);
    }
  }, [showToast]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    onSwitchView('login');
  };

  return (
    <div className="dashboard-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f4f6f9', fontFamily: 'sans-serif' }}>
      {showLoading && <Loading text={`Inicializando sistema para ${infoUsuario.empresa || "Elemsin Eirl"}...`} />}
      {showToast && <Toast message={`Bienvenido 👋 ${infoUsuario.nombre}`} subtitle="Acceso correcto al panel" />}

      {/* Cabecera superior fija */}
      <Header usuario={infoUsuario} />
      
      {/* Cuerpo del Dashboard */}
      <div className="dashboard-body-wrapper" style={{ display: 'flex', flex: '1', width: '100%', marginTop: '60px' }}>

        {/* Barra lateral con datos dinámicos */}
        <Sidebar onLogout={handleLogout} usuario={infoUsuario} />
        
        {/* Contenedor de las tablas y contenidos */}
        <div style={{ flex: '1', padding: '2rem', boxSizing: 'border-box' }}>
          <MainContent>
            <div className="dashboard-card-placeholder" style={{ padding: '2rem', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #eef2f5', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '1.5rem' }}>Panel de Control — {infoUsuario.rol}</h2>
              <h3 style={{ margin: '0 0 1rem 0', color: '#64748b', fontWeight: '500', fontSize: '1.1rem' }}>Módulos de Requerimientos y Usuarios</h3>
              <p style={{ margin: '0', color: '#94a3b8', lineHeight: '1.5' }}>Conexión establecida exitosamente con Spring Boot.</p>
            </div>


            <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #eef2f5' }}>
              <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#0f172a' }}>Listado de Tickets en Base de Datos</h3>
              
              {errorTabla && <p style={{ color: 'red', fontSize: '0.9rem' }}>{errorTabla}</p>}

              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                    <th style={{ padding: '0.75rem' }}>ID</th>
                    <th style={{ padding: '0.75rem' }}>Título</th>
                    <th style={{ padding: '0.75rem' }}>Prioridad</th>
                    <th style={{ padding: '0.75rem' }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {requerimientos.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ padding: '1.5rem', textAlign: 'center', color: '#94a3b8' }}>
                        No hay requerimientos registrados para este usuario en MySQL.
                      </td>
                    </tr>
                  ) : (
                    requerimientos.map((req) => (
                      <tr key={req.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#334155' }}>
                        <td style={{ padding: '0.75rem', fontWeight: '600' }}>#{req.id}</td>
                        <td style={{ padding: '0.75rem' }}>{req.titulo}</td>
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', background: req.prioridad === 'ALTA' ? '#fee2e2' : '#fef3c7', color: req.prioridad === 'ALTA' ? '#ef4444' : '#d97706' }}>
                            {req.prioridad}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', background: '#dcfce7', color: '#15803d' }}>
                            {req.estado || 'Pendiente'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </MainContent>
        </div>

      </div>
    </div>
  );
}

export default DashboardView;