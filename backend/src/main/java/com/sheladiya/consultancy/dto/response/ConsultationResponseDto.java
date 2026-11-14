package com.sheladiya.consultancy.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ConsultationResponseDto {

    private Long id;
    private String referenceNumber;
    private String name;
    private String phone;
    private String email;
    private String service;
    private String mode;
    private LocalDate preferredDate;
    private String notes;
    private String status;
    private LocalDateTime submittedAt;
    private LocalDateTime createdAt;

    public ConsultationResponseDto() {
    }

    public ConsultationResponseDto(Long id, String referenceNumber, String name, String phone, 
                                   String email, String service, String mode, LocalDate preferredDate, 
                                   String notes, String status, LocalDateTime submittedAt, LocalDateTime createdAt) {
        this.id = id;
        this.referenceNumber = referenceNumber;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.service = service;
        this.mode = mode;
        this.preferredDate = preferredDate;
        this.notes = notes;
        this.status = status;
        this.submittedAt = submittedAt;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReferenceNumber() {
        return referenceNumber;
    }

    public void setReferenceNumber(String referenceNumber) {
        this.referenceNumber = referenceNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public LocalDate getPreferredDate() {
        return preferredDate;
    }

    public void setPreferredDate(LocalDate preferredDate) {
        this.preferredDate = preferredDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
