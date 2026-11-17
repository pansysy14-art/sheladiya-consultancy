package com.sheladiya.consultancy.service.impl;

import com.sheladiya.consultancy.entity.Consultation;
import com.sheladiya.consultancy.entity.ContactInquiry;
import com.sheladiya.consultancy.service.EmailNotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmailNotificationServiceImpl implements EmailNotificationService {

    private static final Logger logger = LoggerFactory.getLogger(EmailNotificationServiceImpl.class);
    private static final String DEFAULT_RESEND_URL = "https://api.resend.com/emails";

    private final RestTemplate restTemplate;

    @Value("${resend.api.key:${RESEND_API_KEY:}}")
    private String resendApiKey;

    @Value("${resend.api.url:https://api.resend.com/emails}")
    private String resendApiUrl;

    @Value("${resend.from-address:${RESEND_FROM:onboarding@resend.dev}}")
    private String fromAddress;

    @Value("${resend.notification-to:${RESEND_TO:${app.mail.notification-to:jeelsheladiya47@gmail.com}}}")
    private String notificationTo;

    @Value("${resend.enabled:${app.mail.enabled:true}}")
    private boolean emailEnabled;

    @Autowired
    public EmailNotificationServiceImpl(@Autowired(required = false) RestTemplate restTemplate) {
        if (restTemplate != null) {
            this.restTemplate = restTemplate;
        } else {
            SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
            factory.setConnectTimeout(10000);
            factory.setReadTimeout(15000);
            this.restTemplate = new RestTemplate(factory);
        }
    }

    @Override
    public void sendContactInquiryNotification(ContactInquiry inquiry) {
        if (!isConfigured()) {
            logger.warn("[EmailNotification] Contact inquiry #{} saved in database, but Resend API is not configured (enabled={}, apiKeyConfigured={}). Email dispatch skipped. Set RESEND_API_KEY in Render Environment variables.",
                    inquiry.getId(), emailEnabled, (resendApiKey != null && !resendApiKey.trim().isBlank()));
            return;
        }

        try {
            String subject = "🔔 [New Client Inquiry] " + inquiry.getFullName() + " - " + inquiry.getPracticeArea();

            String submittedDateStr = inquiry.getSubmittedAt() != null
                    ? inquiry.getSubmittedAt().format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a"))
                    : "Just now";

            String textContent = """
                    SHELADIYA CONSULTANCY - NEW CLIENT INQUIRY
                    ==================================================
                    Full Name: %s
                    Phone: %s
                    Email: %s
                    Practice Vertical: %s
                    Submitted At: %s
                    
                    Inquiry Message:
                    %s
                    ==================================================
                    Sheladiya Consultancy Chambers Registry System • Automated Alert
                    """.formatted(
                            inquiry.getFullName(),
                            inquiry.getPhone(),
                            inquiry.getEmail(),
                            inquiry.getPracticeArea(),
                            submittedDateStr,
                            inquiry.getMessage()
                    );

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

            sendViaResend(subject, textContent, html, "Contact Inquiry for '" + inquiry.getFullName() + "'");
        } catch (Exception ex) {
            logger.error("[EmailNotification] Failed to prepare contact inquiry notification for client '{}': {}", 
                    inquiry.getFullName(), ex.getMessage(), ex);
        }
    }

    @Override
    public void sendConsultationNotification(Consultation consultation) {
        if (!isConfigured()) {
            logger.warn("[EmailNotification] Consultation #{} ({}) saved in database, but Resend API is not configured (enabled={}, apiKeyConfigured={}). Email dispatch skipped. Set RESEND_API_KEY in Render Environment variables.",
                    consultation.getId(), consultation.getReferenceNumber(), emailEnabled, (resendApiKey != null && !resendApiKey.trim().isBlank()));
            return;
        }

        try {
            String subject = "⚖️ [Consultation Booking] Ref: " + consultation.getReferenceNumber() + " - " + consultation.getName();

            String prefDateStr = consultation.getPreferredDate() != null
                    ? consultation.getPreferredDate().format(DateTimeFormatter.ofPattern("EEEE, dd MMMM yyyy"))
                    : "Earliest Available Schedule";

            String notesText = (consultation.getNotes() != null && !consultation.getNotes().isBlank())
                    ? consultation.getNotes()
                    : "No additional notes provided.";

            String textContent = """
                    SHELADIYA CONSULTANCY - CONSULTATION BOOKING
                    ==================================================
                    Official Registry Reference: %s
                    Client Name: %s
                    Phone: %s
                    Email: %s
                    Service Discipline: %s
                    Consultation Mode: %s
                    Requested Date: %s
                    
                    Client Notes / Matter Summary:
                    %s
                    ==================================================
                    Sheladiya Consultancy Chambers Registry System • Automated Alert
                    """.formatted(
                            consultation.getReferenceNumber(),
                            consultation.getName(),
                            consultation.getPhone(),
                            consultation.getEmail(),
                            consultation.getService(),
                            consultation.getMode(),
                            prefDateStr,
                            notesText
                    );

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

            sendViaResend(subject, textContent, html, "Consultation Booking Ref: " + consultation.getReferenceNumber());
        } catch (Exception ex) {
            logger.error("[EmailNotification] Failed to prepare consultation alert for Ref '{}': {}", 
                    consultation.getReferenceNumber(), ex.getMessage(), ex);
        }
    }

    private void sendViaResend(String subject, String textContent, String htmlContent, String contextInfo) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(resendApiKey.trim());

            List<String> recipients = getRecipients();

            Map<String, Object> payload = new HashMap<>();
            String from = (fromAddress != null && !fromAddress.isBlank()) ? fromAddress.trim() : "onboarding@resend.dev";
            payload.put("from", from);
            payload.put("to", recipients);
            payload.put("subject", subject);
            payload.put("text", textContent);
            if (htmlContent != null && !htmlContent.isBlank()) {
                payload.put("html", htmlContent);
            }

            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(payload, headers);

            String url = (resendApiUrl != null && !resendApiUrl.isBlank()) ? resendApiUrl.trim() : DEFAULT_RESEND_URL;
            logger.info("[EmailNotification] Sending email via Resend HTTP API (Port 443) for {} to {}", contextInfo, recipients);

            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                logger.info("[EmailNotification] Email dispatched successfully via Resend API for {}. Status: {}, Response: {}", 
                        contextInfo, response.getStatusCode(), response.getBody());
            } else {
                logger.error("[EmailNotification] Resend API responded with status {} for {}. Body: {}", 
                        response.getStatusCode(), contextInfo, response.getBody());
            }
        } catch (HttpStatusCodeException httpEx) {
            logger.error("[EmailNotification] Resend API HTTP error for {} (Status: {}): {}", 
                    contextInfo, httpEx.getStatusCode(), httpEx.getResponseBodyAsString(), httpEx);
        } catch (RestClientException clientEx) {
            logger.error("[EmailNotification] Resend API client/network error for {}: {}", 
                    contextInfo, clientEx.getMessage(), clientEx);
        } catch (Exception ex) {
            logger.error("[EmailNotification] Unexpected error sending email via Resend API for {}: {}", 
                    contextInfo, ex.getMessage(), ex);
        }
    }

    private List<String> getRecipients() {
        if (notificationTo == null || notificationTo.isBlank()) {
            return List.of("jeelsheladiya47@gmail.com");
        }
        List<String> list = Arrays.stream(notificationTo.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
        return list.isEmpty() ? List.of("jeelsheladiya47@gmail.com") : list;
    }

    private boolean isConfigured() {
        return emailEnabled && resendApiKey != null && !resendApiKey.trim().isBlank();
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
