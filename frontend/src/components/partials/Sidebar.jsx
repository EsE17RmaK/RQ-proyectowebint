import React from 'react';

function Sidebar({ onLogout, usuario }) {
  // Si no pasan usuario, tomamos uno por defecto de respaldo
  const nombre = usuario?.nombre || "Ignacio Cerna";
  const rol = usuario?.rol || "Administrador";

  return (
    <nav className="sidebar" id="sidebar" style={{ width: '260px', minWidth: '260px', background: '#ffffff', borderRight: '1px solid #eef2f5', padding: '1.5rem', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div className="sidebar__container" style={{ width: '100%' }}>
        
        {/* Bloque de Perfil de Usuario */}
        <div className="sidebar__user" style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', marginBottom: '1.5rem' }}>
          <div className="sidebar__img" style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', background: '#e2e8f0' }}>
            <img 
              id="sidebarUserImg" 
              src="https://avatar.iran.liara.run/public/12" // Fallback seguro con un avatar elegante online si el local no carga
              onError={(e) => { e.target.src = "/assets/img/users/admin.png"; }} 
              alt="User profile" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div className="sidebar__info">
            <h3 id="sidebarUserName" style={{ margin: '0', fontSize: '1rem', color: '#0f172a', fontWeight: '600' }}>{nombre}</h3>
            <span id="sidebarUserRole" style={{ fontSize: '0.85rem', color: '#64748b' }}>{rol}</span>
          </div>
        </div>

        {/* Navegación del Menú */}
        <div className="sidebar__content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 className="sidebar__title" style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', color: '#94a3b8', letterSpacing: '0.05em' }}>GENERAL</h3>
            <div className="sidebar__list" id="menuGeneral" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ padding: '0.6rem 0.8rem', color: '#475569', borderRadius: '6px', background: '#f8fafc', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}>
                <i className="ri-dashboard-line" style={{ marginRight: '0.5rem' }}></i> Vista Principal
              </div>
            </div>
          </div>

          <div>
            <h3 className="sidebar__title" style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', color: '#94a3b8', letterSpacing: '0.05em' }}>CUENTA</h3>
            <div className="sidebar__list" id="menuCuenta" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ padding: '0.6rem 0.8rem', color: '#475569', fontSize: '0.9rem' }}>
                <i className="ri-user-settings-line" style={{ marginRight: '0.5rem' }}></i> Configuración
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de Acción Inferiores */}
      <div className="sidebar__actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '2rem' }}>
        <button className="sidebar__link" type="button" onClick={onLogout} style={{ width: '100%', padding: '0.75rem', border: 'none', background: '#ef4444', color: '#ffffff', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '500', fontSize: '0.9rem', transition: 'background 0.2s' }}>
          <i className="ri-logout-box-r-fill"></i>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </nav>
  );
}

export default Sidebar;