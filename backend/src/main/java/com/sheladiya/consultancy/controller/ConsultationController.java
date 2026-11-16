package com.sheladiya.consultancy.controller;

import com.sheladiya.consultancy.dto.request.ConsultationRequestDto;
import com.sheladiya.consultancy.dto.response.ApiResponse;
import com.sheladiya.consultancy.dto.response.ConsultationResponseDto;
import com.sheladiya.consultancy.service.ConsultationService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Public & Admin Consultation Controller
 * Supports all routing prefixes (/api/v1, /api, or root) and both plural/singular
 * endpoints to guarantee zero HTTP 405 Method Not Allowed or 404 routing errors.
 */
@RestController
@RequestMapping({"/api/v1", "/api", ""})
public class ConsultationController {

    private final ConsultationService consultationService;

    public ConsultationController(ConsultationService consultationService) {
        this.consultationService = consultationService;
    }

    /**
     * Public endpoint to book an in-person or virtual consultation.
     * Supports both plural (/consultations) and singular (/consultation).
     */
    @PostMapping({"/consultations", "/consultation"})
    public ResponseEntity<ApiResponse<ConsultationResponseDto>> bookConsultation(
            @Valid @RequestBody ConsultationRequestDto requestDto) {
        ConsultationResponseDto booked = consultationService.bookConsultation(requestDto);
        return new ResponseEntity<>(
                ApiResponse.ok("Consultation scheduled successfully. Reference: " + booked.getReferenceNumber(), booked),
                HttpStatus.CREATED
        );
    }

    /**
     * Public informational GET endpoint to gracefully handle browser navigations
     * or HTTP 301/302 redirects without returning an HTTP 405 Method Not Allowed error.
     */
    @GetMapping({"/consultations", "/consultation"})
    public ResponseEntity<ApiResponse<String>> consultationInfo() {
        return ResponseEntity.ok(ApiResponse.ok("Consultation service is active. Please submit booking inquiries using HTTP POST."));
    }

    /**
     * Public endpoint to check status of a consultation using reference number.
     */
    @GetMapping({"/consultations/reference/{referenceNumber}", "/consultation/reference/{referenceNumber}"})
    public ResponseEntity<ApiResponse<ConsultationResponseDto>> getByReference(
            @PathVariable String referenceNumber) {
        ConsultationResponseDto dto = consultationService.getConsultationByReference(referenceNumber);
        return ResponseEntity.ok(ApiResponse.ok(dto));
    }

    /**
     * Admin endpoint: Retrieve paginated consultations.
     */
    @GetMapping({"/admin/consultations", "/api/v1/admin/consultations"})
    public ResponseEntity<ApiResponse<Page<ConsultationResponseDto>>> getAllConsultations(
            @PageableDefault(size = 20) Pageable pageable) {
        Page<ConsultationResponseDto> page = consultationService.getAllConsultations(pageable);
        return ResponseEntity.ok(ApiResponse.ok(page));
    }

    /**
     * Admin endpoint: Get consultation by ID.
     */
    @GetMapping({"/admin/consultations/{id}", "/api/v1/admin/consultations/{id}"})
    public ResponseEntity<ApiResponse<ConsultationResponseDto>> getConsultationById(@PathVariable Long id) {
        ConsultationResponseDto dto = consultationService.getConsultationById(id);
        return ResponseEntity.ok(ApiResponse.ok(dto));
    }

    /**
     * Admin endpoint: Update consultation status (e.g. CONFIRMED, COMPLETED, CANCELLED).
     */
    @PatchMapping({"/admin/consultations/{id}/status", "/api/v1/admin/consultations/{id}/status"})
    public ResponseEntity<ApiResponse<ConsultationResponseDto>> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        String status = statusUpdate.get("status");
        if (status == null || status.trim().isEmpty()) {
            return new ResponseEntity<>(ApiResponse.error("Status field is required"), HttpStatus.BAD_REQUEST);
        }
        ConsultationResponseDto dto = consultationService.updateConsultationStatus(id, status);
        return ResponseEntity.ok(ApiResponse.ok("Consultation status updated successfully", dto));
    }
}
