package com.sheladiya.consultancy.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sheladiya.consultancy.dto.request.ContactRequestDto;
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
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("POST /api/v1/contact - Should submit inquiry successfully")
    void testSubmitContactInquiry_Success() throws Exception {
        ContactRequestDto dto = new ContactRequestDto(
                "Harshil Sheladiya",
                "+91 98765 43210",
                "harshil@example.com",
                "Corporate Consultancy",
                "Inquiry regarding legal compliance and company secretarial documentation.",
                true,
                "2026-11-12T10:00:00"
        );

        mockMvc.perform(post("/api/v1/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.fullName", is("Harshil Sheladiya")))
                .andExpect(jsonPath("$.data.email", is("harshil@example.com")))
                .andExpect(jsonPath("$.data.practiceArea", is("Corporate Consultancy")))
                .andExpect(jsonPath("$.data.status", is("NEW")));
    }

    @Test
    @DisplayName("POST /api/v1/contact - Should fail with 400 when disclaimer is not accepted")
    void testSubmitContactInquiry_FailsWithoutDisclaimer() throws Exception {
        ContactRequestDto dto = new ContactRequestDto(
                "John Doe",
                "+91 98765 43210",
                "john@example.com",
                "Legal Services",
                "General query without agreeing to disclaimer.",
                false,
                null
        );

        mockMvc.perform(post("/api/v1/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.data.disclaimerAgreed", notNullValue()));
    }

    @Test
    @DisplayName("POST /api/v1/contact - Should fail with 400 when invalid email provided")
    void testSubmitContactInquiry_FailsWithInvalidEmail() throws Exception {
        ContactRequestDto dto = new ContactRequestDto(
                "Jane Doe",
                "+91 98765 43210",
                "not-an-email",
                "Property Consultancy",
                "Property registration assistance needed.",
                true,
                null
        );

        mockMvc.perform(post("/api/v1/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }
}
