package com.sheladiya.consultancy.service.impl;

import com.sheladiya.consultancy.entity.Consultation;
import com.sheladiya.consultancy.entity.ContactInquiry;
import com.sheladiya.consultancy.service.EmailNotificationService;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class EmailNotificationServiceImpl implements EmailNotificationService {

    private static final Logger logger = LoggerFactory.getLogger(EmailNotificationServiceImpl.class);

    private final JavaMailSender mailSender;

    @Value("${app.mail.enabled:true}")
    private boolean mailEnabled;

    @Value("${app.mail.notification-to:jeelsheladiya47@gmail.com}")
    private String notificationTo;

    @Value("${app.mail.from-address:jeelsheladiya47@gmail.com}")
    private String fromAddress;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    @Value("${spring.mail.password:}")
    private String mailPassword;

    public EmailNotificationServiceImpl(@Autowired(required = false) JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendContactInquiryNotification(ContactInquiry inquiry) {
        if (!isConfigured()) {
            logger.info("[EmailNotification] Contact inquiry #{} saved in database. SMTP credentials not configured in backend/.env — email dispatch skipped.", inquiry.getId());
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromAddress, "SHELADIYA CONSULTANCY");
            helper.setTo(notificationTo);
            helper.setSubject("🔔 [New Client Inquiry] " + inquiry.getFullName() + " - " + inquiry.getPracticeArea());

            String submittedDateStr = inquiry.getSubmittedAt() != null
                    ? inquiry.getSubmittedAt().format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a"))
                    : "Just now";

            String html = """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #060D1A; color: #F8FAFC; margin: 0; padding: 20px; }
                        .container { max-width: 600px; margin: 0 auto; background: #0A1628; border: 1px solid #D4AF37; border-radius: 12px; overflow: hidden; }
                        .header { background: #0F1F38; padding: 28px 24px; text-align: center; border-bottom: 2px solid #D4AF37; }
                        .crest { color: #D4AF37; font-size: 20px; font-weight: bold; letter-spacing: 3px; margin: 0; font-family: Georgia, serif; }
                        .tagline { color: #DFC075; font-size: 10px; letter-spacing: 2px; margin-top: 6px; text-transform: uppercase; }
                        .content { padding: 28px 24px; }
                        .badge { display: inline-block; background: rgba(212, 175, 55, 0.15); border: 1px solid #D4AF37; color: #DFC075; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; margin-bottom: 16px; }
                        .title { font-size: 18px; color: #FFFFFF; margin-top: 0; margin-bottom: 20px; font-weight: 600; }
                        .field-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                        .field-table td { padding: 10px 12px; border-bottom: 1px solid rgba(212, 175, 55, 0.15); font-size: 13px; }
                        .field-label { color: #DFC075; font-weight: 600; width: 35%; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; }
                        .field-value { color: #F8FAFC; }
                        .message-box { background: rgba(15, 31, 56, 0.6); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 8px; padding: 16px; margin-top: 10px; font-size: 13px; color: #E2E8F0; line-height: 1.6; }
                        .footer { background: #060D1A; padding: 16px; text-align: center; font-size: 11px; color: #94A3B8; border-top: 1px solid rgba(212, 175, 55, 0.2); }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1 class="crest">SHELADIYA CONSULTANCY</h1>
                            <div class="tagline">Truth • Honesty • Discipline</div>
                        </div>
                        <div class="content">
                            <span class="badge">Preliminary Inquiry Received</span>
                            <h2 class="title">A prospective client has submitted an inquiry:</h2>
                            <table class="field-table">
                                <tr>
                                    <td class="field-label">Full Name</td>
                                    <td class="field-value"><strong>{{fullName}}</strong></td>
                                </tr>
                                <tr>
                                    <td class="field-label">Phone</td>
                                    <td class="field-value"><a href="tel:{{phone}}" style="color: #DFC075; text-decoration: none;">{{phone}}</a></td>
                                </tr>
                                <tr>
                                    <td class="field-label">Email</td>
                                    <td class="field-value"><a href="mailto:{{email}}" style="color: #DFC075; text-decoration: none;">{{email}}</a></td>
                                </tr>
                                <tr>
                                    <td class="field-label">Practice Vertical</td>
                                    <td class="field-value" style="color: #D4AF37; font-weight: 600;">{{practiceArea}}</td>
                                </tr>
                                <tr>
                                    <td class="field-label">Date & Time</td>
                                    <td class="field-value">{{submittedDate}}</td>
                                </tr>
                            </table>
                            <div class="field-label" style="margin-bottom: 6px;">Client Inquiry Message:</div>
                            <div class="message-box">
                                {{message}}
                            </div>
                        </div>
                        <div class="footer">
                            Sheladiya Consultancy Chambers Registry System • Automated Alert
                        </div>
                    </div>
                </body>
                </html>
                """
                .replace("{{fullName}}", escapeHtml(inquiry.getFullName()))
                .replace("{{phone}}", escapeHtml(inquiry.getPhone()))
                .replace("{{email}}", escapeHtml(inquiry.getEmail()))
                .replace("{{practiceArea}}", escapeHtml(inquiry.getPracticeArea()))
                .replace("{{submittedDate}}", submittedDateStr)
                .replace("{{message}}", escapeHtml(inquiry.getMessage()).replace("\n", "<br>"));

            helper.setText(html, true);
            mailSender.send(message);
            logger.info("[EmailNotification] Contact inquiry notification sent successfully to {} for client: {}", notificationTo, inquiry.getFullName());
        } catch (Exception ex) {
            logger.error("[EmailNotification] Failed to send contact inquiry notification for client '{}': {}", inquiry.getFullName(), ex.getMessage());
        }
    }

    @Override
    public void sendConsultationNotification(Consultation consultation) {
        if (!isConfigured()) {
            logger.info("[EmailNotification] Consultation #{} ({}) saved in database. SMTP credentials not configured in backend/.env — email dispatch skipped.", consultation.getId(), consultation.getReferenceNumber());
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromAddress, "SHELADIYA CONSULTANCY");
            helper.setTo(notificationTo);
            helper.setSubject("⚖️ [Consultation Booking] Ref: " + consultation.getReferenceNumber() + " - " + consultation.getName());

            String prefDateStr = consultation.getPreferredDate() != null
                    ? consultation.getPreferredDate().format(DateTimeFormatter.ofPattern("EEEE, dd MMMM yyyy"))
                    : "Earliest Available Schedule";

            String notesHtml = (consultation.getNotes() != null && !consultation.getNotes().isBlank())
                    ? escapeHtml(consultation.getNotes()).replace("\n", "<br>")
                    : "<em>No additional notes provided.</em>";

            String html = """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #060D1A; color: #F8FAFC; margin: 0; padding: 20px; }
                        .container { max-width: 600px; margin: 0 auto; background: #0A1628; border: 1px solid #D4AF37; border-radius: 12px; overflow: hidden; }
                        .header { background: #0F1F38; padding: 28px 24px; text-align: center; border-bottom: 2px solid #D4AF37; }
                        .crest { color: #D4AF37; font-size: 20px; font-weight: bold; letter-spacing: 3px; margin: 0; font-family: Georgia, serif; }
                        .tagline { color: #DFC075; font-size: 10px; letter-spacing: 2px; margin-top: 6px; text-transform: uppercase; }
                        .content { padding: 28px 24px; }
                        .ref-box { background: rgba(212, 175, 55, 0.15); border: 1px dashed #D4AF37; padding: 12px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
                        .ref-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #DFC075; }
                        .ref-number { font-size: 20px; font-weight: bold; color: #FFFFFF; font-family: monospace; letter-spacing: 2px; margin-top: 4px; }
                        .title { font-size: 18px; color: #FFFFFF; margin-top: 0; margin-bottom: 20px; font-weight: 600; }
                        .field-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                        .field-table td { padding: 10px 12px; border-bottom: 1px solid rgba(212, 175, 55, 0.15); font-size: 13px; }
                        .field-label { color: #DFC075; font-weight: 600; width: 35%; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; }
                        .field-value { color: #F8FAFC; }
                        .message-box { background: rgba(15, 31, 56, 0.6); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 8px; padding: 16px; margin-top: 10px; font-size: 13px; color: #E2E8F0; line-height: 1.6; }
                        .footer { background: #060D1A; padding: 16px; text-align: center; font-size: 11px; color: #94A3B8; border-top: 1px solid rgba(212, 175, 55, 0.2); }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1 class="crest">SHELADIYA CONSULTANCY</h1>
                            <div class="tagline">Truth • Honesty • Discipline</div>
                        </div>
                        <div class="content">
                            <div class="ref-box">
                                <div class="ref-label">Official Registry Reference</div>
                                <div class="ref-number">{{refNumber}}</div>
                            </div>
                            <h2 class="title">New Voluntary Consultation Request:</h2>
                            <table class="field-table">
                                <tr>
                                    <td class="field-label">Client Name</td>
                                    <td class="field-value"><strong>{{name}}</strong></td>
                                </tr>
                                <tr>
                                    <td class="field-label">Phone</td>
                                    <td class="field-value"><a href="tel:{{phone}}" style="color: #DFC075; text-decoration: none;">{{phone}}</a></td>
                                </tr>
                                <tr>
                                    <td class="field-label">Email</td>
                                    <td class="field-value"><a href="mailto:{{email}}" style="color: #DFC075; text-decoration: none;">{{email}}</a></td>
                                </tr>
                                <tr>
                                    <td class="field-label">Service Discipline</td>
                                    <td class="field-value" style="color: #D4AF37; font-weight: 600;">{{service}}</td>
                                </tr>
                                <tr>
                                    <td class="field-label">Consultation Mode</td>
                                    <td class="field-value" style="text-transform: capitalize;">{{mode}}</td>
                                </tr>
                                <tr>
                                    <td class="field-label">Requested Date</td>
                                    <td class="field-value">{{prefDate}}</td>
                                </tr>
                            </table>
                            <div class="field-label" style="margin-bottom: 6px;">Client Notes / Matter Summary:</div>
                            <div class="message-box">
                                {{notes}}
                            </div>
                        </div>
                        <div class="footer">
                            Sheladiya Consultancy Chambers Registry System • Automated Alert
                        </div>
                    </div>
                </body>
                </html>
                """
                .replace("{{refNumber}}", consultation.getReferenceNumber())
                .replace("{{name}}", escapeHtml(consultation.getName()))
                .replace("{{phone}}", escapeHtml(consultation.getPhone()))
                .replace("{{email}}", escapeHtml(consultation.getEmail()))
                .replace("{{service}}", escapeHtml(consultation.getService()))
                .replace("{{mode}}", escapeHtml(consultation.getMode()))
                .replace("{{prefDate}}", prefDateStr)
                .replace("{{notes}}", notesHtml);

            helper.setText(html, true);
            mailSender.send(message);
            logger.info("[EmailNotification] Consultation booking notification sent successfully to {} for Ref: {}", notificationTo, consultation.getReferenceNumber());
        } catch (Exception ex) {
            logger.error("[EmailNotification] Failed to send consultation alert for Ref '{}': {}", consultation.getReferenceNumber(), ex.getMessage());
        }
    }

    private boolean isConfigured() {
        return mailEnabled && mailSender != null && mailUsername != null && !mailUsername.isBlank() && mailPassword != null && !mailPassword.isBlank();
    }

    private String escapeHtml(String text) {
        if (text == null) return "";
        return text.replace("&", "&amp;")
                   .replace("<", "&lt;")
                   .replace(">", "&gt;")
                   .replace("\"", "&quot;")
                   .replace("'", "&#39;");
    }
}
