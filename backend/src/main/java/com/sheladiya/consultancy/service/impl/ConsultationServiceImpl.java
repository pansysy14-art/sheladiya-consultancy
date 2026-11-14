package com.sheladiya.consultancy.service.impl;

import com.sheladiya.consultancy.dto.request.ConsultationRequestDto;
import com.sheladiya.consultancy.dto.response.ConsultationResponseDto;
import com.sheladiya.consultancy.entity.Consultation;
import com.sheladiya.consultancy.exception.ResourceNotFoundException;
import com.sheladiya.consultancy.repository.ConsultationRepository;
import com.sheladiya.consultancy.service.ConsultationService;
import com.sheladiya.consultancy.service.EmailNotificationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class ConsultationServiceImpl implements ConsultationService {

    private final ConsultationRepository repository;
    private final EmailNotificationService emailNotificationService;
    private final SecureRandom random = new SecureRandom();

    public ConsultationServiceImpl(ConsultationRepository repository,
                                   EmailNotificationService emailNotificationService) {
        this.repository = repository;
        this.emailNotificationService = emailNotificationService;
    }

    @Override
    @Transactional
    public ConsultationResponseDto bookConsultation(ConsultationRequestDto requestDto) {
        String referenceNumber = generateUniqueReference();

        LocalDate preferredDate = null;
        if (requestDto.getPreferredDate() != null && !requestDto.getPreferredDate().trim().isEmpty()) {
            try {
                preferredDate = LocalDate.parse(requestDto.getPreferredDate().trim());
            } catch (Exception ignored) {
                // If invalid date format, leave null
            }
        }

        LocalDateTime submittedAt = LocalDateTime.now();
        if (requestDto.getSubmittedAt() != null) {
            try {
                submittedAt = LocalDateTime.parse(requestDto.getSubmittedAt(), DateTimeFormatter.ISO_DATE_TIME);
            } catch (Exception ignored) {
                // Keep default now()
            }
        }

        Consultation consultation = new Consultation(
                referenceNumber,
                requestDto.getName().trim(),
                requestDto.getPhone().trim(),
                requestDto.getEmail().trim().toLowerCase(),
                requestDto.getService().trim(),
                requestDto.getMode() != null ? requestDto.getMode().trim() : "in-person",
                preferredDate,
                requestDto.getNotes() != null ? requestDto.getNotes().trim() : "",
                Boolean.TRUE.equals(requestDto.getAgreed()),
                submittedAt
        );

        Consultation saved = repository.save(consultation);

        // Send real-time notification alert to business inbox
        emailNotificationService.sendConsultationNotification(saved);

        return mapToDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ConsultationResponseDto> getAllConsultations(Pageable pageable) {
        return repository.findAllByOrderByCreatedAtDesc(pageable).map(this::mapToDto);
    }

    @Override
    @Transactional(readOnly = true)
    public ConsultationResponseDto getConsultationById(Long id) {
        Consultation consultation = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Consultation", "id", id));
        return mapToDto(consultation);
    }

    @Override
    @Transactional(readOnly = true)
    public ConsultationResponseDto getConsultationByReference(String referenceNumber) {
        Consultation consultation = repository.findByReferenceNumber(referenceNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Consultation", "referenceNumber", referenceNumber));
        return mapToDto(consultation);
    }

    @Override
    @Transactional
    public ConsultationResponseDto updateConsultationStatus(Long id, String status) {
        Consultation consultation = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Consultation", "id", id));
        consultation.setStatus(status.toUpperCase().trim());
        Consultation updated = repository.save(consultation);
        return mapToDto(updated);
    }

    private String generateUniqueReference() {
        int year = LocalDate.now().getYear();
        String ref;
        do {
            int randomNum = 10000 + random.nextInt(90000);
            ref = String.format("SC-%d-%d", year, randomNum);
        } while (repository.findByReferenceNumber(ref).isPresent());
        return ref;
    }

    private ConsultationResponseDto mapToDto(Consultation consultation) {
        return new ConsultationResponseDto(
                consultation.getId(),
                consultation.getReferenceNumber(),
                consultation.getName(),
                consultation.getPhone(),
                consultation.getEmail(),
                consultation.getService(),
                consultation.getMode(),
                consultation.getPreferredDate(),
                consultation.getNotes(),
                consultation.getStatus(),
                consultation.getSubmittedAt(),
                consultation.getCreatedAt()
        );
    }
}
