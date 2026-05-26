package com.elemsin.backend.dto;

public class UsuarioDTO {
    private Long id;
    private String correo;
    private String nombre;
    private String rol;


    public UsuarioDTO(Long id, String correo, String nombre, String rol) {
        this.id = id;
        this.correo = correo;
        this.nombre = nombre;
        this.rol = rol;
    }

    
    public Long getId() { return id; }
    public String getCorreo() { return correo; }
    public String getNombre() { return nombre; }
    public String getRol() { return rol; }
}