package com.sheladiya.consultancy.service;

import com.sheladiya.consultancy.dto.request.AppointmentRequestDto;
import com.sheladiya.consultancy.dto.response.AppointmentResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AppointmentService {
    AppointmentResponseDto bookAppointment(AppointmentRequestDto requestDto);
    Page<AppointmentResponseDto> getAllAppointments(Pageable pageable);
    AppointmentResponseDto getAppointmentById(Long id);
    AppointmentResponseDto updateAppointmentStatus(Long id, String status);
}
