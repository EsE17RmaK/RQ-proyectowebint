package com.elemsin.backend.controller;

import com.elemsin.backend.model.Requerimiento;
import com.elemsin.backend.service.RequerimientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/requerimientos")
@CrossOrigin(origins = "*")
public class RequerimientoController {

    @Autowired
    private RequerimientoService requerimientoService;

    // GET: http://localhost:8080/api/v1/requerimientos (Listar todos)
    @GetMapping
    public List<Requerimiento> listar() {
        return requerimientoService.obtenerTodos();
    }

    // POST: http://localhost:8080/api/v1/requerimientos (Crear Ticket)
    @PostMapping
    public ResponseEntity<Requerimiento> crear(@RequestBody Requerimiento requerimiento) {
        Requerimiento nuevo = requerimientoService.guardar(requerimiento);
        return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
    }

    // PUT: http://localhost:8080/api/v1/requerimientos/{id} (Actualizar Estado/Detalles)
    @PutMapping("/{id}")
    public ResponseEntity<Requerimiento> actualizar(@PathVariable Long id, @RequestBody Requerimiento detalles) {
        Optional<Requerimiento> op = requerimientoService.obtenerPorId(id);
        if (op.isPresent()) {
            Requerimiento req = op.get();
            req.setTitulo(detalles.getTitulo());
            req.setDescripcion(detalles.getDescripcion());
            req.setEstado(detalles.getEstado());
            req.setPrioridad(detalles.getPrioridad());
            return ResponseEntity.ok(requerimientoService.guardar(req));
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE: http://localhost:8080/api/v1/requerimientos/{id} (Eliminar Ticket)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        try {
            requerimientoService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}