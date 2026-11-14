package com.sheladiya.consultancy.service.impl;

import com.sheladiya.consultancy.dto.request.AppointmentRequestDto;
import com.sheladiya.consultancy.dto.response.AppointmentResponseDto;
import com.sheladiya.consultancy.entity.Appointment;
import com.sheladiya.consultancy.entity.Consultation;
import com.sheladiya.consultancy.exception.ResourceNotFoundException;
import com.sheladiya.consultancy.repository.AppointmentRepository;
import com.sheladiya.consultancy.repository.ConsultationRepository;
import com.sheladiya.consultancy.service.AppointmentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ConsultationRepository consultationRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository,
                                  ConsultationRepository consultationRepository) {
        this.appointmentRepository = appointmentRepository;
        this.consultationRepository = consultationRepository;
    }

    @Override
    @Transactional
    public AppointmentResponseDto bookAppointment(AppointmentRequestDto requestDto) {
        LocalDateTime scheduledAt;
        try {
            scheduledAt = LocalDateTime.parse(requestDto.getScheduledAt(), DateTimeFormatter.ISO_DATE_TIME);
        } catch (Exception ex) {
            try {
                scheduledAt = LocalDateTime.parse(requestDto.getScheduledAt());
            } catch (Exception e) {
                throw new IllegalArgumentException("Invalid date-time format for scheduledAt. Use ISO-8601 (e.g. 2026-11-20T10:00:00).");
            }
        }

        Appointment appointment = new Appointment(
                requestDto.getTitle().trim(),
                scheduledAt,
                requestDto.getDurationMinutes(),
                requestDto.getMode() != null ? requestDto.getMode().trim() : "in-person",
                requestDto.getMeetingLinkOrVenue(),
                requestDto.getNotes()
        );

        if (StringUtils.hasText(requestDto.getConsultationReference())) {
            Optional<Consultation> consultation = consultationRepository.findByReferenceNumber(requestDto.getConsultationReference().trim());
            consultation.ifPresent(c -> {
                appointment.setConsultationId(c.getId());
                c.setStatus("CONFIRMED");
                consultationRepository.save(c);
            });
        }

        Appointment saved = appointmentRepository.save(appointment);
        return mapToDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AppointmentResponseDto> getAllAppointments(Pageable pageable) {
        return appointmentRepository.findAllByOrderByScheduledAtDesc(pageable).map(this::mapToDto);
    }

    @Override
    @Transactional(readOnly = true)
    public AppointmentResponseDto getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));
        return mapToDto(appointment);
    }

    @Override
    @Transactional
    public AppointmentResponseDto updateAppointmentStatus(Long id, String status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));
        appointment.setStatus(status.toUpperCase().trim());
        Appointment updated = appointmentRepository.save(appointment);
        return mapToDto(updated);
    }

    private AppointmentResponseDto mapToDto(Appointment appointment) {
        return new AppointmentResponseDto(
                appointment.getId(),
                appointment.getTitle(),
                appointment.getScheduledAt(),
                appointment.getDurationMinutes(),
                appointment.getMode(),
                appointment.getMeetingLinkOrVenue(),
                appointment.getStatus(),
                appointment.getNotes(),
                appointment.getConsultationId(),
                appointment.getCreatedAt()
        );
    }
}
