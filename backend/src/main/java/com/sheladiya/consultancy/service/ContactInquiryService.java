package com.sheladiya.consultancy.service;

import com.sheladiya.consultancy.dto.request.ContactRequestDto;
import com.sheladiya.consultancy.dto.response.ContactResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ContactInquiryService {
    ContactResponseDto submitContactInquiry(ContactRequestDto requestDto);
    Page<ContactResponseDto> getAllInquiries(Pageable pageable);
    ContactResponseDto getInquiryById(Long id);
    ContactResponseDto updateInquiryStatus(Long id, String status);
}
