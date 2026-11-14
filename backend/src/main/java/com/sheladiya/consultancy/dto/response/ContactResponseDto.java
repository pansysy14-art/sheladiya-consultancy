package com.sheladiya.consultancy.dto.response;

import java.time.LocalDateTime;

public class ContactResponseDto {

    private Long id;
    private String fullName;
    private String phone;
    private String email;
    private String practiceArea;
    private String message;
    private String status;
    private LocalDateTime submittedAt;
    private LocalDateTime createdAt;

    public ContactResponseDto() {
    }

    public ContactResponseDto(Long id, String fullName, String phone, String email, 
                              String practiceArea, String message, String status, 
                              LocalDateTime submittedAt, LocalDateTime createdAt) {
        this.id = id;
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.practiceArea = practiceArea;
        this.message = message;
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
