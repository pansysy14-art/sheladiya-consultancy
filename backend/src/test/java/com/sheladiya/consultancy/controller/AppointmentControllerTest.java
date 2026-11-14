package com.sheladiya.consultancy.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sheladiya.consultancy.dto.request.AppointmentRequestDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AppointmentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("POST /api/v1/appointments - Should book appointment successfully")
    void testBookAppointment_Success() throws Exception {
        AppointmentRequestDto dto = new AppointmentRequestDto(
                "Corporate Documentation Advisory Session",
                "2026-11-28T14:30:00",
                45,
                "in-person",
                "Chambers Conference Room A",
                "Detailed contract clause review",
                null
        );

        mockMvc.perform(post("/api/v1/appointments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.title", is("Corporate Documentation Advisory Session")))
                .andExpect(jsonPath("$.data.durationMinutes", is(45)))
                .andExpect(jsonPath("$.data.status", is("SCHEDULED")));
    }

    @Test
    @DisplayName("POST /api/v1/appointments - Should fail with 400 when title is missing")
    void testBookAppointment_FailsWithoutTitle() throws Exception {
        AppointmentRequestDto dto = new AppointmentRequestDto(
                "",
                "2026-11-28T14:30:00",
                45,
                "in-person",
                null,
                null,
                null
        );

        mockMvc.perform(post("/api/v1/appointments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }
}
