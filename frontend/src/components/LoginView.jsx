import React, { useState } from 'react';

export default function LoginView({ onSwitchView, onLoginSuccess }) { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorBackend, setErrorBackend] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrorBackend("Por favor, completa todos los campos.");
      return;
    }

    console.log("Datos listos para enviar a Spring Boot Real:", { email, password });
    
    try {
      const response = await fetch('http://localhost:8080/api/v1/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          correo: email,       
          contrasena: password 
        })
      });

      if (response.ok) {
        const usuarioLogueado = await response.json();
        setErrorBackend("");
        
        localStorage.setItem('usuario', JSON.stringify(usuarioLogueado));

        if (onLoginSuccess) {
          onLoginSuccess({
            nombre: usuarioLogueado.nombre,
            rol: usuarioLogueado.rol,
            empresa: "Elemsin Eirl"
          });
        }

        onSwitchView('dashboard');
      } else {
        setErrorBackend("Credenciales incorrectas o el usuario no existe en la base de datos.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setErrorBackend("No se pudo conectar con el servidor Backend (Spring Boot). Asegúrate de que esté encendido.");
    }
  };

  return (
    <div className="login__container grid">
      
  
      <div className="login__content-form">
        <form onSubmit={handleSubmit} className="login__form">
          <h1 className="login__title">Accede a tu cuenta.</h1>
          
          <div className="login__area">
            <div className="login__box">
              <input 
                type="email" 
                className="login__input" 
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <label className="login__label">Correo</label>
              <i className="ri-mail-fill login__icon"></i>
            </div>

            <div className="login__box">
              <input 
                type={showPassword ? "text" : "password"} 
                className="login__input" 
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <label className="login__label">Contraseña</label>
              <i 
                className={`login__icon login__password ${showPassword ? 'ri-eye-fill' : 'ri-eye-off-fill'}`} 
                id="loginPassword"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer' }}
              ></i>
            </div>
          </div>

          {errorBackend && (
            <div id="errorMessage" className="login__error-message" style={{ color: 'red', marginBottom: '1rem', fontSize: '0.85rem', textAlign: 'center' }}>
              {errorBackend}
            </div>
          )}

          <p className="login__switch-forgot" style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
            <button type="button" className="login__link-switch" onClick={() => onSwitchView('forgot')}>¿Olvidaste tu contraseña?</button>
          </p>

          <button type="submit" className="login__button" id="loginButtonAccessSubmit">
            <span id="loginButtonText">Acceso</span>
          </button>
        </form>
        <div className="login__social">
          <a href="https://wa.me/51999999999" target="_blank" rel="noreferrer" className="login__social-link__wsp">
            <img src="/img/icon/icon-whatsapp.svg" alt="Icono de WhatsApp" className="login__social-img__wsp" />
            <span className="login__social-text">Contactar por WhatsApp</span>
          </a>
        </div>

        <p className="login__switch-register">
          ¿No tienes una cuenta? <button type="button" className="login__link-switch highlight" onClick={() => onSwitchView('register')}>Crea una cuenta</button>
        </p>
      </div>


      <div className="login__blob">
        <img 
          src="/img/bg-img.jpg" 
          alt="Paisaje Corporativo" 
          className="login__img" 
        />
      </div>

    </div>
  );
}