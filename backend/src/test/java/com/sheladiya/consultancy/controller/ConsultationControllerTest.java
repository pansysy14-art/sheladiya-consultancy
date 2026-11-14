package com.sheladiya.consultancy.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sheladiya.consultancy.dto.request.ConsultationRequestDto;
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
class ConsultationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("POST /api/v1/consultations - Should book consultation successfully with SC reference number")
    void testBookConsultation_Success() throws Exception {
        ConsultationRequestDto dto = new ConsultationRequestDto(
                "Adv. Rajesh Kumar",
                "+91 98220 12345",
                "rajesh.kumar@example.com",
                "Business Documentation",
                "in-person",
                "2026-11-25",
                "Review of cross-border partnership contract.",
                true,
                "2026-11-12T10:00:00"
        );

        mockMvc.perform(post("/api/v1/consultations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.referenceNumber", startsWith("SC-")))
                .andExpect(jsonPath("$.data.name", is("Adv. Rajesh Kumar")))
                .andExpect(jsonPath("$.data.service", is("Business Documentation")))
                .andExpect(jsonPath("$.data.status", is("PENDING")));
    }

    @Test
    @DisplayName("POST /api/v1/consultations - Should fail when voluntary agreement is false")
    void testBookConsultation_FailsWithoutAgreement() throws Exception {
        ConsultationRequestDto dto = new ConsultationRequestDto(
                "Priya Patel",
                "+91 98220 54321",
                "priya@example.com",
                "Legal Services",
                "virtual",
                "2026-11-28",
                "Civil litigation consultation",
                false,
                null
        );

        mockMvc.perform(post("/api/v1/consultations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }
}
