import React, { useState } from 'react';

const ForgotView = ({ onSwitchView }) => {
  // Estado para capturar el correo electrónico en memoria
  const [emailForgot, setEmailForgot] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica en el Frontend
    if (!emailForgot) {
      setErrorMessage('Por favor, ingresa tu correo electrónico.');
      return;
    }

    setErrorMessage('');
    
    // Aquí se conectará con Axios hacia el Backend de Spring Boot en el futuro
    console.log('Enviando solicitud de recuperación para:', emailForgot);

    // CAMBIO DE SINCRONIZACIÓN: Redirige al usuario al cambio de clave real para pruebas de flujo
    onSwitchView('reset');
  };

  return (
    <div className="login__forgot">
      <h1 className="login__title">Recuperar tu contraseña.</h1>

      <div className="login__area">
        <form className="login__form" id="forgotForm" onSubmit={handleSubmit}>
          <div className="login__content grid">
            
            {/* Caja: Entrada de Correo */}
            <div className="login__box">
              <input 
                type="email" 
                id="emailForgot" 
                placeholder=" " 
                className="login__input"
                value={emailForgot}
                onChange={(e) => setEmailForgot(e.target.value)}
              />
              <label htmlFor="emailForgot" className="login__label">Correo</label>
              <i className="ri-mail-fill login__icon"></i>
            </div>

            {/* Mensaje de Error Dinámico */}
            <p id="emailForgotError" className="login__error-message">
              {errorMessage}
            </p>
          </div>

          <button type="submit" className="login__button">Recuperar contraseña</button>
        </form>

        {/* CAMBIO DE SINCRONIZACIÓN: Retorno fluido al Login */}
        <p className="login__switch">
          ¿Recordaste tu contraseña?{' '}
          <button type="button" onClick={() => onSwitchView('login')}>Inicia sesión</button>
        </p>
      </div>
    </div>
  );
};

export default ForgotView;