package com.sheladiya.consultancy.dto.response;

import java.time.LocalDateTime;

public class AppointmentResponseDto {

    private Long id;
    private String title;
    private LocalDateTime scheduledAt;
    private int durationMinutes;
    private String mode;
    private String meetingLinkOrVenue;
    private String status;
    private String notes;
    private Long consultationId;
    private LocalDateTime createdAt;

    public AppointmentResponseDto() {
    }

    public AppointmentResponseDto(Long id, String title, LocalDateTime scheduledAt, 
                                  int durationMinutes, String mode, String meetingLinkOrVenue, 
                                  String status, String notes, Long consultationId, 
                                  LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.scheduledAt = scheduledAt;
        this.durationMinutes = durationMinutes;
        this.mode = mode;
        this.meetingLinkOrVenue = meetingLinkOrVenue;
        this.status = status;
        this.notes = notes;
        this.consultationId = consultationId;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getScheduledAt() {
        return scheduledAt;
    }

    public void setScheduledAt(LocalDateTime scheduledAt) {
        this.scheduledAt = scheduledAt;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public String getMeetingLinkOrVenue() {
        return meetingLinkOrVenue;
    }

    public void setMeetingLinkOrVenue(String meetingLinkOrVenue) {
        this.meetingLinkOrVenue = meetingLinkOrVenue;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Long getConsultationId() {
        return consultationId;
    }

    public void setConsultationId(Long consultationId) {
        this.consultationId = consultationId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
