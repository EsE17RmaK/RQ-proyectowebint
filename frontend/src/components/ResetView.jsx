import React, { useState } from 'react';

const ResetView = ({ onSwitchView }) => {
  // Estados para capturar los datos del formulario
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Función que se ejecuta cuando el usuario envía el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica en el Frontend
    if (!newPassword || !confirmNewPassword) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    setErrorMessage('');
    
    // Aquí se enviará el JSON real hacia la API de Java usando Axios en el futuro
    console.log('Enviando nueva contraseña:', { newPassword });

    // CAMBIO DE SINCRONIZACIÓN: Te envía de vuelta al login para ingresar con la nueva clave
    onSwitchView('login');
  };

  return (
    <div className="login__reset">
      <h2 className="login__title">Nueva contraseña</h2>
      <div className="login__area">
        <form className="login__form" id="resetForm" onSubmit={handleSubmit}>
          <div className="login__content grid">
            
            {/* Caja: Nueva Contraseña */}
            <div className="login__box">
              <input 
                type="password" 
                id="newPassword" 
                className="login__input" 
                placeholder=" " 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label htmlFor="newPassword" className="login__label">Nueva contraseña</label>
              <i className="ri-eye-fill login__icon login__password" id="newPasswordIcon"></i>
            </div>

            {/* Mensaje de Error Dinámico */}
            <p id="resetPasswordError" className="login__error-message">
              {errorMessage}
            </p>

            {/* Caja: Confirmar Contraseña */}
            <div className="login__box">
              <input 
                type="password" 
                id="confirmNewPassword" 
                className="login__input" 
                placeholder=" " 
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <label htmlFor="confirmNewPassword" className="login__label">
                Confirmar contraseña
              </label>
              <i className="ri-eye-off-fill login__icon login__password" id="confirmNewPasswordIcon"></i>
            </div>
          </div>

          <button type="submit" className="login__button">Cambiar contraseña</button>
        </form>
      </div>
    </div>
  );
};

export default ResetView;