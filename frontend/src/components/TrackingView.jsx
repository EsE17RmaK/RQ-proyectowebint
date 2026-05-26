import React, { useState } from 'react';

const TrackingView = () => {
  // Estados para el formulario de consulta
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  
  // Estado para controlar si el modal de soporte está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Manejador de la consulta de requerimientos
  const handleSearch = (e) => {
    e.preventDefault();
    if (!documentType || !documentNumber) {
      alert('Por favor, complete ambos campos para realizar la consulta.');
      return;
    }
    
    // Aquí se conectará en el futuro con Axios hacia la API de Spring Boot
    console.log('Consultando requerimiento para:', { documentType, documentNumber });
  };

  return (
    <div className="tracking-scope">
      <div className="container">
        {/* LOGO */}
        <div className="logo">

          <img src="/assets/img/private.svg" alt="Elemsin Eirl" />
        </div>

        {/* CARD PRINCIPAL */}
        <div className="card">
          <h2>Consulta de Requerimientos</h2>
          
          <div id="searchSection">
            <p className="subtitle" id="subtitle">
              Ingresa tu tipo y número de documento para consultar<br />el estado de tu requerimiento.
            </p>

            {/* FORMULARIO */}
            <form className="form-group" onSubmit={handleSearch}>
              <select 
                className="input"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
              >
                <option value="">Tipo de documento</option>
                <option value="dni">DNI</option>
                <option value="ce">CE</option>
              </select>

              <input 
                type="text" 
                placeholder="Número de documento" 
                className="input"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
              />

              <button type="submit" className="btn-primary">
                <i className="ri-search-line"></i> Buscar
              </button>
            </form>

            <hr />

            {/* Contenedor donde se renderizarán los resultados de la API */}
            <div id="resultContainer"></div>

            {/* SECCIÓN DE SOPORTE */}
            <div className="support">
              <p><strong>¿Necesitas ayuda?</strong> Contacta a nuestro soporte técnico.</p>
              {/* Al hacer clic, cambiamos el estado a true para mostrar el modal */}
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => setIsModalOpen(true)}
              >
                Contactar Soporte Técnico
              </button>
            </div>
          </div>
        </div>

        {/* MODAL DE SOPORTE (Se muestra condicionalmente si isModalOpen es true) */}
        {isModalOpen && (
          <div id="supportModal" className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <i className="ri-customer-service-2-line"></i>
                <h3>Soporte Técnico</h3>
              </div>

              <p className="modal-subtitle">
                Elige cómo deseas comunicarte con nosotros
              </p>

              <div className="modal-actions">
                <button 
                  id="btnWhatsApp" 
                  className="btn-action whatsapp"
                  onClick={() => console.log('Redirigiendo a WhatsApp...')}
                >
                  <i className="ri-whatsapp-line"></i>
                  <span>WhatsApp</span>
                </button>

                <button 
                  id="btnEmail" 
                  className="btn-action email"
                  onClick={() => console.log('Abriendo correo técnico...')}
                >
                  <i className="ri-mail-line"></i>
                  <span>Correo</span>
                </button>
              </div>

              {/* Al hacer clic en cerrar, cambiamos el estado a false */}
              <button 
                id="btnCloseModal" 
                className="btn-close"
                onClick={() => setIsModalOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingView;