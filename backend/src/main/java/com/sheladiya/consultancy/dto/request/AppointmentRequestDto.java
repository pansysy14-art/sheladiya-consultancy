package com.sheladiya.consultancy.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AppointmentRequestDto {

    @NotBlank(message = "Appointment title or subject is required")
    @Size(min = 3, max = 200, message = "Title must be between 3 and 200 characters")
    private String title;

    @NotBlank(message = "Scheduled date and time is required")
    private String scheduledAt; // ISO-8601 string, e.g. "2026-11-20T10:00:00"

    private int durationMinutes = 45;

    private String mode = "in-person"; // "in-person" or "virtual"

    private String meetingLinkOrVenue;

    @Size(max = 2000, message = "Notes cannot exceed 2000 characters")
    private String notes;

    private String consultationReference;

    public AppointmentRequestDto() {
    }

    public AppointmentRequestDto(String title, String scheduledAt, int durationMinutes, 
                                 String mode, String meetingLinkOrVenue, String notes, 
                                 String consultationReference) {
        this.title = title;
        this.scheduledAt = scheduledAt;
        this.durationMinutes = durationMinutes;
        this.mode = mode;
        this.meetingLinkOrVenue = meetingLinkOrVenue;
        this.notes = notes;
        this.consultationReference = consultationReference;
    }

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getScheduledAt() {
        return scheduledAt;
    }

    public void setScheduledAt(String scheduledAt) {
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

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getConsultationReference() {
        return consultationReference;
    }

    public void setConsultationReference(String consultationReference) {
        this.consultationReference = consultationReference;
    }
}
