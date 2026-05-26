package com.elemsin.backend.service;

import com.elemsin.backend.dto.UsuarioDTO;
import com.elemsin.backend.model.Usuario;
import com.elemsin.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Método para registrar cuentas nuevas
    public UsuarioDTO registrarUsuario(Usuario usuario) {
        Usuario usuarioGuardado = usuarioRepository.save(usuario);
        
        return new UsuarioDTO(
            usuarioGuardado.getId(),
            usuarioGuardado.getCorreo(),
            usuarioGuardado.getNombre(),
            usuarioGuardado.getRol()
        );
    }

    //Lógica para validar el Login dinámico de los usuarios
    public UsuarioDTO login(String correo, String contrasena) {
        // Buscamos al usuario por su correo electrónico (Patrón DAO)
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreo(correo);
        
        // Verificamos si existe y si la contraseña coincide textualmente
        if (usuarioOpt.isPresent() && usuarioOpt.get().getContrasena().equals(contrasena)) {
            Usuario u = usuarioOpt.get();
   
            return new UsuarioDTO(u.getId(), u.getCorreo(), u.getNombre(), u.getRol());
        }
        

        return null;
    }
}