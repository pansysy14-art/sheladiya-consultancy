package com.sheladiya.consultancy.repository;

import com.sheladiya.consultancy.entity.Consultation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    Optional<Consultation> findByReferenceNumber(String referenceNumber);
    List<Consultation> findByStatusOrderByCreatedAtDesc(String status);
    Page<Consultation> findAllByOrderByCreatedAtDesc(Pageable pageable);
    long countByStatus(String status);
}
