import React, { useState } from 'react';

const RegisterView = ({ onSwitchView }) => {
  // Estados para capturar los datos del formulario de registro
  const [names, setNames] = useState('');
  const [surnames, setSurnames] = useState('');
  const [emailCreate, setEmailCreate] = useState('');
  const [passwordCreate, setPasswordCreate] = useState('');
  const [passwordConfirmCreate, setPasswordConfirmCreate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validación básica en el Frontend
    if (!names || !surnames || !emailCreate || !passwordCreate || !passwordConfirmCreate) {
      setErrorMessage('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (passwordCreate !== passwordConfirmCreate) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');

    // 2. Mapear el JSON con los nombres exactos que espera tu entidad de Spring Boot
    const nuevoUsuario = {
      nombre: `${names} ${surnames}`, 
      correo: emailCreate,
      contrasena: passwordCreate,
      rol: 'Cliente' 
    };

    try {
      // 3. Petición HTTP REAL al backend de Spring Boot
      const response = await fetch('http://localhost:8080/api/v1/usuarios/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
      });

      // 4. Procesar la respuesta del servidor
      if (response.status === 201 || response.ok) {
        const data = await response.json();
        console.log('¡Usuario registrado con éxito en la BD!', data);
        setSuccessMessage('¡Cuenta creada con éxito! Redirigiendo al login...');
        
        // Espera 2 segundos para que el usuario vea el mensaje de éxito antes de cambiar de vista
        setTimeout(() => {
          onSwitchView('login');
        }, 2000);
      } else {
        setErrorMessage('Hubo un problema en el servidor al crear la cuenta.');
      }
    } catch (error) {
      console.error('Error de red o conexión:', error);
      setErrorMessage('No se pudo conectar con el servidor. ¿Está encendido Spring Boot?');
    }
  };

  return (
    <div className="login__register active">
      <h1 className="login__title">Crear Cuenta</h1>

      <div className="login__area">
        <form className="login__form" id="registerForm" onSubmit={handleSubmit}>
          <div className="login__content grid">
            
            {/* Caja: Nombres */}
            <div className="login__box">
              <input 
                type="text" 
                id="names" 
                placeholder=" " 
                className="login__input"
                value={names}
                onChange={(e) => setNames(e.target.value)}
              />
              <label htmlFor="names" className="login__label">Nombres</label>
              <i className="ri-user-fill login__icon"></i>
            </div>

            {/* Caja: Apellidos */}
            <div className="login__box">
              <input 
                type="text" 
                id="surnames" 
                placeholder=" " 
                className="login__input"
                value={surnames}
                onChange={(e) => setSurnames(e.target.value)}
              />
              <label htmlFor="surnames" className="login__label">Apellidos</label>
              <i className="ri-user-fill login__icon"></i>
            </div>

            {/* Caja: Correo Electrónico */}
            <div className="login__box">
              <input 
                type="email" 
                id="emailCreate" 
                placeholder=" " 
                className="login__input"
                value={emailCreate}
                onChange={(e) => setEmailCreate(e.target.value)}
              />
              <label htmlFor="emailCreate" className="login__label">Correo Electrónico</label>
              <i className="ri-mail-fill login__icon"></i>
            </div>

            {/* Caja: Contraseña */}
            <div className="login__box">
              <input 
                type="password" 
                id="passwordCreate" 
                placeholder=" " 
                className="login__input"
                value={passwordCreate}
                onChange={(e) => setPasswordCreate(e.target.value)}
              />
              <label htmlFor="passwordCreate" className="login__label">Contraseña</label>
              <i className="ri-eye-off-fill login__icon login__password" id="loginPasswordCreate"></i>
            </div>

            {/* Caja: Confirmar Contraseña */}
            <div className="login__box">
              <input 
                type="password" 
                id="passwordConfirmCreate" 
                placeholder=" " 
                className="login__input"
                value={passwordConfirmCreate}
                onChange={(e) => setPasswordConfirmCreate(e.target.value)}
              />
              <label htmlFor="passwordConfirmCreate" className="login__label">Confirmar Contraseña</label>
              <i className="ri-eye-off-fill login__icon login__password" id="loginPasswordConfirmCreate"></i>
            </div>
          </div>

          {/* Mensaje de Error Dinámico */}
          {errorMessage && (
            <p id="passwordConfirmError" className="login__error-message" style={{ color: 'red', marginTop: '0.5rem' }}>
              {errorMessage}
            </p>
          )}

          {/* Mensaje de Éxito Dinámico */}
          {successMessage && (
            <p className="login__success-message" style={{ color: 'green', marginTop: '0.5rem' }}>
              {successMessage}
            </p>
          )}

          <button type="submit" className="login__button" style={{ marginTop: '1rem' }}>
            Crear una cuenta
          </button>
        </form>

        {/* Retorno fluido al login */}
        <p className="login__switch">
          ¿Ya tienes una cuenta?{' '}
          <button type="button" onClick={() => onSwitchView('login')}>Inicia sesión</button>
        </p>
      </div>
    </div>
  );
};

export default RegisterView;