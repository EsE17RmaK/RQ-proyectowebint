package com.elemsin.backend.service;

import com.elemsin.backend.model.Requerimiento;
import com.elemsin.backend.repository.RequerimientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RequerimientoService {

    @Autowired
    private RequerimientoRepository requerimientoRepository;

    // 1. CREAR
    public Requerimiento guardar(Requerimiento requerimiento) {
        return requerimientoRepository.save(requerimiento);
    }

    // 2. LEER TODOS
    public List<Requerimiento> obtenerTodos() {
        return requerimientoRepository.findAll();
    }

    // 3. LEER POR ID
    public Optional<Requerimiento> obtenerPorId(Long id) {
        return requerimientoRepository.findById(id);
    }

    // 4. ELIMINAR
    public void eliminar(Long id) {
        requerimientoRepository.deleteById(id);
    }
}