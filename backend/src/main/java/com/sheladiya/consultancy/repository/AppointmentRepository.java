package com.sheladiya.consultancy.repository;

import com.sheladiya.consultancy.entity.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByStatusOrderByScheduledAtAsc(String status);
    Page<Appointment> findAllByOrderByScheduledAtDesc(Pageable pageable);
    List<Appointment> findByScheduledAtBetweenOrderByScheduledAtAsc(LocalDateTime start, LocalDateTime end);
    long countByStatus(String status);
}
