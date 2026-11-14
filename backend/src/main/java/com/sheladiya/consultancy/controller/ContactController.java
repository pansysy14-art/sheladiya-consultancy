package com.sheladiya.consultancy.controller;

import com.sheladiya.consultancy.dto.request.ContactRequestDto;
import com.sheladiya.consultancy.dto.response.ApiResponse;
import com.sheladiya.consultancy.dto.response.ContactResponseDto;
import com.sheladiya.consultancy.service.ContactInquiryService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ContactController {

    private final ContactInquiryService contactService;

    public ContactController(ContactInquiryService contactService) {
        this.contactService = contactService;
    }

    /**
     * Public endpoint for submitting legal or corporate contact inquiries.
     */
    @PostMapping("/contact")
    public ResponseEntity<ApiResponse<ContactResponseDto>> submitContact(
            @Valid @RequestBody ContactRequestDto requestDto) {
        ContactResponseDto savedInquiry = contactService.submitContactInquiry(requestDto);
        return new ResponseEntity<>(
                ApiResponse.ok("Thank you. Your inquiry has been received. Our team will review and contact you shortly.", savedInquiry),
                HttpStatus.CREATED
        );
    }

    /**
     * Admin endpoint: Retrieve paginated contact inquiries.
     */
    @GetMapping("/admin/contacts")
    public ResponseEntity<ApiResponse<Page<ContactResponseDto>>> getAllContacts(
            @PageableDefault(size = 20) Pageable pageable) {
        Page<ContactResponseDto> page = contactService.getAllInquiries(pageable);
        return ResponseEntity.ok(ApiResponse.ok(page));
    }

    /**
     * Admin endpoint: Get contact inquiry by ID.
     */
    @GetMapping("/admin/contacts/{id}")
    public ResponseEntity<ApiResponse<ContactResponseDto>> getContactById(@PathVariable Long id) {
        ContactResponseDto dto = contactService.getInquiryById(id);
        return ResponseEntity.ok(ApiResponse.ok(dto));
    }

    /**
     * Admin endpoint: Update inquiry status (e.g. REVIEWED, IN_PROGRESS, CLOSED).
     */
    @PatchMapping("/admin/contacts/{id}/status")
    public ResponseEntity<ApiResponse<ContactResponseDto>> updateContactStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        String status = statusUpdate.get("status");
        if (status == null || status.trim().isEmpty()) {
            return new ResponseEntity<>(ApiResponse.error("Status field is required"), HttpStatus.BAD_REQUEST);
        }
        ContactResponseDto dto = contactService.updateInquiryStatus(id, status);
        return ResponseEntity.ok(ApiResponse.ok("Inquiry status updated successfully", dto));
    }
}
