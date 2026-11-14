package com.sheladiya.consultancy.service;

import com.sheladiya.consultancy.entity.Consultation;
import com.sheladiya.consultancy.entity.ContactInquiry;

/**
 * Service for sending real-time automated business email notifications
 * upon successful client inquiry and consultation request submissions.
 */
public interface EmailNotificationService {

    /**
     * Sends an email notification to the business inbox for a new contact form inquiry.
     *
     * @param inquiry the saved ContactInquiry entity
     */
    void sendContactInquiryNotification(ContactInquiry inquiry);

    /**
     * Sends an email notification to the business inbox for a new consultation request.
     *
     * @param consultation the saved Consultation entity
     */
    void sendConsultationNotification(Consultation consultation);
}
