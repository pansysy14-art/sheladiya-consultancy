package com.sheladiya.consultancy.service.impl;

import com.sheladiya.consultancy.dto.request.ContactRequestDto;
import com.sheladiya.consultancy.dto.response.ContactResponseDto;
import com.sheladiya.consultancy.entity.ContactInquiry;
import com.sheladiya.consultancy.exception.ResourceNotFoundException;
import com.sheladiya.consultancy.repository.ContactInquiryRepository;
import com.sheladiya.consultancy.service.ContactInquiryService;
import com.sheladiya.consultancy.service.EmailNotificationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class ContactInquiryServiceImpl implements ContactInquiryService {

    private final ContactInquiryRepository repository;
    private final EmailNotificationService emailNotificationService;

    public ContactInquiryServiceImpl(ContactInquiryRepository repository,
                                     EmailNotificationService emailNotificationService) {
        this.repository = repository;
        this.emailNotificationService = emailNotificationService;
    }

    @Override
    @Transactional
    public ContactResponseDto submitContactInquiry(ContactRequestDto requestDto) {
        LocalDateTime submittedAt = LocalDateTime.now();
        if (requestDto.getSubmittedAt() != null) {
            try {
                submittedAt = LocalDateTime.parse(requestDto.getSubmittedAt(), DateTimeFormatter.ISO_DATE_TIME);
            } catch (Exception ignored) {
                // Keep default now()
            }
        }

        ContactInquiry inquiry = new ContactInquiry(
                requestDto.getFullName().trim(),
                requestDto.getPhone().trim(),
                requestDto.getEmail().trim().toLowerCase(),
                requestDto.getPracticeArea().trim(),
                requestDto.getMessage().trim(),
                Boolean.TRUE.equals(requestDto.getDisclaimerAgreed()),
                submittedAt
        );

        ContactInquiry saved = repository.save(inquiry);

        // Send real-time notification alert to business inbox
        emailNotificationService.sendContactInquiryNotification(saved);

        return mapToDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ContactResponseDto> getAllInquiries(Pageable pageable) {
        return repository.findAllByOrderByCreatedAtDesc(pageable).map(this::mapToDto);
    }

    @Override
    @Transactional(readOnly = true)
    public ContactResponseDto getInquiryById(Long id) {
        ContactInquiry inquiry = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ContactInquiry", "id", id));
        return mapToDto(inquiry);
    }

    @Override
    @Transactional
    public ContactResponseDto updateInquiryStatus(Long id, String status) {
        ContactInquiry inquiry = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ContactInquiry", "id", id));
        inquiry.setStatus(status.toUpperCase().trim());
        ContactInquiry updated = repository.save(inquiry);
        return mapToDto(updated);
    }

    private ContactResponseDto mapToDto(ContactInquiry inquiry) {
        return new ContactResponseDto(
                inquiry.getId(),
                inquiry.getFullName(),
                inquiry.getPhone(),
                inquiry.getEmail(),
                inquiry.getPracticeArea(),
                inquiry.getMessage(),
                inquiry.getStatus(),
                inquiry.getSubmittedAt(),
                inquiry.getCreatedAt()
        );
    }
}
