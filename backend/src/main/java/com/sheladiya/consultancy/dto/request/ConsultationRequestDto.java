package com.sheladiya.consultancy.dto.request;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ConsultationRequestDto {

    @NotBlank(message = "Client name is required")
    @Size(min = 2, max = 150, message = "Client name must be between 2 and 150 characters")
    private String name;

    @NotBlank(message = "Contact telephone number is required")
    @Size(min = 8, max = 25, message = "Please provide a valid phone number")
    private String phone;

    @NotBlank(message = "Email address is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Consultancy service selection is required")
    private String service;

    private String mode; // "in-person" or "virtual"

    private String preferredDate; // "YYYY-MM-DD" or similar

    @Size(max = 2000, message = "Notes cannot exceed 2000 characters")
    private String notes;

    @AssertTrue(message = "You must acknowledge the voluntary consultation declaration.")
    private Boolean agreed;

    private String submittedAt;

    public ConsultationRequestDto() {
    }

    public ConsultationRequestDto(String name, String phone, String email, String service, 
                                  String mode, String preferredDate, String notes, 
                                  Boolean agreed, String submittedAt) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.service = service;
        this.mode = mode;
        this.preferredDate = preferredDate;
        this.notes = notes;
        this.agreed = agreed;
        this.submittedAt = submittedAt;
    }

    // Getters and Setters
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

    public String getPreferredDate() {
        return preferredDate;
    }

    public void setPreferredDate(String preferredDate) {
        this.preferredDate = preferredDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Boolean getAgreed() {
        return agreed;
    }

    public void setAgreed(Boolean agreed) {
        this.agreed = agreed;
    }

    public String getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(String submittedAt) {
        this.submittedAt = submittedAt;
    }
}
