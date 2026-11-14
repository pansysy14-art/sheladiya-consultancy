package com.sheladiya.consultancy.service;

import com.sheladiya.consultancy.dto.request.ConsultationRequestDto;
import com.sheladiya.consultancy.dto.response.ConsultationResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ConsultationService {
    ConsultationResponseDto bookConsultation(ConsultationRequestDto requestDto);
    Page<ConsultationResponseDto> getAllConsultations(Pageable pageable);
    ConsultationResponseDto getConsultationById(Long id);
    ConsultationResponseDto getConsultationByReference(String referenceNumber);
    ConsultationResponseDto updateConsultationStatus(Long id, String status);
}
