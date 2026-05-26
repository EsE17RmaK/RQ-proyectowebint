package com.elemsin.backend.controller;

import com.elemsin.backend.dto.UsuarioDTO;
import com.elemsin.backend.model.Usuario;
import com.elemsin.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/usuarios")
@CrossOrigin(origins = "*") 
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Endpoint para Registrarse
    @PostMapping("/registrar")
    public ResponseEntity<UsuarioDTO> registrar(@RequestBody Usuario usuario) {
        UsuarioDTO nuevoUsuario = usuarioService.registrarUsuario(usuario);
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
    }

    //Endpoint para Iniciar Sesión (http://localhost:8080/api/v1/usuarios/login)
    @PostMapping("/login")
    public ResponseEntity<?> iniciarSesion(@RequestBody Usuario credenciales) {
        UsuarioDTO usuarioLogueado = usuarioService.login(credenciales.getCorreo(), credenciales.getContrasena());
        
        if (usuarioLogueado != null) {
            // Retorna 200 OK y los datos seguros si la contraseña es correcta
            return ResponseEntity.ok(usuarioLogueado);
        } else {
            // Retorna 401 Unauthorized si el correo o la clave fallan
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("{\"error\": \"Credenciales incorrectas o el usuario no existe\"}");
        }
    }
}