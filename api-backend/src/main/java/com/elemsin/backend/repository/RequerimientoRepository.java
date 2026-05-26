package com.elemsin.backend.repository;

import com.elemsin.backend.model.Requerimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RequerimientoRepository extends JpaRepository<Requerimiento, Long> {

    
    List<Requerimiento> findByClienteId(Long clienteId);
}