package com.sheladiya.consultancy.dto.request;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactRequestDto {

    @NotBlank(message = "Full name is required")
    @Size(min = 2, max = 150, message = "Full name must be between 2 and 150 characters")
    private String fullName;

    @NotBlank(message = "Contact telephone number is required")
    @Size(min = 8, max = 25, message = "Please provide a valid phone number")
    private String phone;

    @NotBlank(message = "Email address is required")
    @Email(message = "Please provide a valid official email address")
    private String email;

    @NotBlank(message = "Practice area selection is required")
    private String practiceArea;

    @NotBlank(message = "Inquiry message is required")
    @Size(min = 10, max = 4000, message = "Message must be between 10 and 4000 characters")
    private String message;

    @AssertTrue(message = "You must acknowledge the legal regulatory disclaimer before submitting.")
    private Boolean disclaimerAgreed;

    private String submittedAt;

    public ContactRequestDto() {
    }

    public ContactRequestDto(String fullName, String phone, String email, String practiceArea, 
                             String message, Boolean disclaimerAgreed, String submittedAt) {
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.practiceArea = practiceArea;
        this.message = message;
        this.disclaimerAgreed = disclaimerAgreed;
        this.submittedAt = submittedAt;
    }

    // Getters and Setters
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
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

    public String getPracticeArea() {
        return practiceArea;
    }

    public void setPracticeArea(String practiceArea) {
        this.practiceArea = practiceArea;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getDisclaimerAgreed() {
        return disclaimerAgreed;
    }

    public void setDisclaimerAgreed(Boolean disclaimerAgreed) {
        this.disclaimerAgreed = disclaimerAgreed;
    }

    public String getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(String submittedAt) {
        this.submittedAt = submittedAt;
    }
}
