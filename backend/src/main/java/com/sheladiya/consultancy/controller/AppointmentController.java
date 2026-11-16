package com.sheladiya.consultancy.controller;

import com.sheladiya.consultancy.dto.request.AppointmentRequestDto;
import com.sheladiya.consultancy.dto.response.ApiResponse;
import com.sheladiya.consultancy.dto.response.AppointmentResponseDto;
import com.sheladiya.consultancy.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping({"/api/v1", "/api", ""})
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    /**
     * Public endpoint to book or confirm a consultation appointment.
     * Supports both /appointments and /appointment, with or without /api/v1 or /api prefix.
     */
    @PostMapping({"/appointments", "/appointment"})
    public ResponseEntity<ApiResponse<AppointmentResponseDto>> bookAppointment(
            @Valid @RequestBody AppointmentRequestDto requestDto) {
        AppointmentResponseDto booked = appointmentService.bookAppointment(requestDto);
        return new ResponseEntity<>(
                ApiResponse.ok("Appointment successfully confirmed.", booked),
                HttpStatus.CREATED
        );
    }

    /**
     * Public informational GET endpoint to gracefully handle browser navigations
     * or redirects without returning an HTTP 405 Method Not Allowed error.
     */
    @GetMapping({"/appointments", "/appointment"})
    public ResponseEntity<ApiResponse<String>> appointmentInfo() {
        return ResponseEntity.ok(ApiResponse.ok("Appointment booking service is active. Please submit bookings using HTTP POST."));
    }

    /**
     * Public endpoint to view appointment details by ID.
     */
    @GetMapping("/appointments/{id}")
    public ResponseEntity<ApiResponse<AppointmentResponseDto>> getAppointmentById(@PathVariable Long id) {
        AppointmentResponseDto dto = appointmentService.getAppointmentById(id);
        return ResponseEntity.ok(ApiResponse.ok(dto));
    }

    /**
     * Admin endpoint: Retrieve paginated appointments.
     */
    @GetMapping("/admin/appointments")
    public ResponseEntity<ApiResponse<Page<AppointmentResponseDto>>> getAllAppointments(
            @PageableDefault(size = 20) Pageable pageable) {
        Page<AppointmentResponseDto> page = appointmentService.getAllAppointments(pageable);
        return ResponseEntity.ok(ApiResponse.ok(page));
    }

    /**
     * Admin endpoint: Update appointment status (SCHEDULED, COMPLETED, CANCELLED).
     */
    @PatchMapping("/admin/appointments/{id}/status")
    public ResponseEntity<ApiResponse<AppointmentResponseDto>> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        String status = statusUpdate.get("status");
        if (status == null || status.trim().isEmpty()) {
            return new ResponseEntity<>(ApiResponse.error("Status field is required"), HttpStatus.BAD_REQUEST);
        }
        AppointmentResponseDto dto = appointmentService.updateAppointmentStatus(id, status);
        return ResponseEntity.ok(ApiResponse.ok("Appointment status updated successfully", dto));
    }
}
