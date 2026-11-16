/**
 * Sheladiya Consultancy - Form & API Integration Service
 * Prepares and standardizes consultation, contact inquiry, and appointment payloads
 * for seamless integration with Spring Boot REST Controllers.
 */

/**
 * Resolves the backend base URL cleanly:
 * 1. Checks VITE_API_URL or VITE_API_BASE_URL from Vite environment variables.
 * 2. Normalizes trailing slashes (e.g. "https://render.com/" -> "https://render.com").
 * 3. If an external URL is provided without an API prefix (e.g. "https://sheladiya-backend.onrender.com"),
 *    it appends "/api/v1" so requests map to Spring Boot controllers.
 * 4. In local development or when undefined, defaults to "/api/v1" to leverage Vite's proxy.
 */
export const getApiBaseUrl = () => {
  const envUrl = typeof import.meta !== 'undefined' && import.meta.env 
    ? (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL)
    : null;

  if (!envUrl || !envUrl.trim()) {
    return 'https://sheladiya-backend.onrender.com/api/v1';
  }

  let cleanUrl = envUrl.trim().replace(/\/+$/, '');
  
  if (cleanUrl.startsWith('http') && !cleanUrl.includes('/api')) {
    cleanUrl = `${cleanUrl}/api/v1`;
  }
  
  return cleanUrl;
};

const API_BASE_URL = getApiBaseUrl();

/**
 * Validates basic email formatting
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase().trim());
};

/**
 * Validates basic telephone formatting (Indian 10-digit or international format with +)
 */
export const isValidPhone = (phone) => {
  const cleanPhone = String(phone).replace(/[\s\-()]/g, '');
  const phoneRegex = /^(\+?[0-9]{1,4})?[0-9]{7,14}$/;
  return phoneRegex.test(cleanPhone) && cleanPhone.length >= 8;
};

/**
 * Submits Contact Form inquiry to Spring Boot /api/v1/contact
 * 
 * @param {Object} contactData 
 * @returns {Promise<{success: boolean, mode: string, data?: any, message?: string}>}
 */
export const submitContactInquiry = async (contactData) => {
  // Client-side validations
  if (!contactData.fullName || contactData.fullName.trim().length < 2) {
    throw new Error('Please enter a valid full name (minimum 2 characters).');
  }

  if (!isValidPhone(contactData.phone)) {
    throw new Error('Please provide a valid direct contact telephone number.');
  }

  if (!isValidEmail(contactData.email)) {
    throw new Error('Please enter a valid official email address.');
  }

  if (!contactData.disclaimerAgreed) {
    throw new Error('You must review and acknowledge the voluntary consultation disclaimer.');
  }

  // DTO Payload conforming to Spring Boot `@RequestBody ContactRequestDto`
  const payload = {
    fullName: contactData.fullName.trim(),
    phone: contactData.phone.trim(),
    email: contactData.email.trim().toLowerCase(),
    practiceArea: contactData.practiceArea || 'general',
    message: contactData.message && contactData.message.trim().length >= 10 
      ? contactData.message.trim() 
      : 'Preliminary client inquiry submitted via web portal.',
    disclaimerAgreed: Boolean(contactData.disclaimerAgreed),
    submittedAt: new Date().toISOString(),
  };

  // Dedicated API request URL with fallback absolute URL pointing directly to Render backend
  const apiUrl = (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim())
    ? `${import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')}${import.meta.env.VITE_API_URL.includes('/api/v1') ? '' : '/api/v1'}/contact`
    : 'https://sheladiya-backend.onrender.com/api/v1/contact';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const result = await response.json().catch(() => ({}));
      return {
        success: true,
        mode: 'live_backend',
        message: result.message || 'Your inquiry has been transmitted to our chambers registry.',
        data: result
      };
    }

    if (response.status === 405) {
      throw new Error('HTTP 405 Method Not Allowed: Please verify VITE_API_URL and ensure backend is active.');
    }

    // Handle Spring validation errors (HTTP 400 Bad Request)
    if (response.status === 400) {
      const errorJson = await response.json().catch(() => ({}));
      const errorDetail = errorJson.message || 'Validation error in submission fields.';
      throw new Error(errorDetail);
    }

    throw new Error(`Server returned error status: ${response.status}`);
  } catch (err) {
    if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError') || err.message.includes('Load failed'))) {
      throw new Error('Unable to connect to the backend server. Please verify the Spring Boot service is active.');
    }
    throw err;
  }
};

/**
 * Submits Consultation Booking to Spring Boot /api/v1/consultations
 * 
 * @param {Object} consultationData 
 * @returns {Promise<{success: boolean, mode: string, data?: any, message?: string, referenceNumber?: string}>}
 */
export const scheduleConsultationInquiry = async (consultationData) => {
  if (!consultationData.name || consultationData.name.trim().length < 2) {
    throw new Error('Please enter your full name or enterprise entity name.');
  }

  if (!isValidPhone(consultationData.phone)) {
    throw new Error('Please provide a valid contact telephone number.');
  }

  if (!isValidEmail(consultationData.email)) {
    throw new Error('Please enter a valid email address.');
  }

  if (!consultationData.agreed) {
    throw new Error('Please acknowledge the voluntary consultation declaration.');
  }

  // DTO Payload conforming to Spring Boot `@RequestBody ConsultationRequestDto`
  const payload = {
    name: consultationData.name.trim(),
    phone: consultationData.phone.trim(),
    email: consultationData.email.trim().toLowerCase(),
    service: consultationData.service || 'Legal Services',
    mode: consultationData.mode || 'in-person',
    preferredDate: consultationData.preferredDate || null,
    notes: consultationData.notes ? consultationData.notes.trim() : '',
    agreed: Boolean(consultationData.agreed),
    submittedAt: new Date().toISOString(),
  };

  // Dedicated API request URL with fallback absolute URL pointing directly to Render backend
  const apiUrl = (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim())
    ? `${import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')}${import.meta.env.VITE_API_URL.includes('/api/v1') ? '' : '/api/v1'}/consultations`
    : 'https://sheladiya-backend.onrender.com/api/v1/consultations';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const result = await response.json().catch(() => ({}));
      return {
        success: true,
        mode: 'live_backend',
        referenceNumber: result?.data?.referenceNumber || null,
        message: result.message || 'Your appointment request has been scheduled.',
        data: result
      };
    }

    if (response.status === 405) {
      throw new Error('HTTP 405 Method Not Allowed: Please verify VITE_API_URL and ensure backend is active.');
    }

    if (response.status === 400) {
      const errorJson = await response.json().catch(() => ({}));
      throw new Error(errorJson.message || 'Validation error in consultation submission.');
    }

    throw new Error(`Server returned error status: ${response.status}`);
  } catch (err) {
    if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError') || err.message.includes('Load failed'))) {
      throw new Error('Unable to connect to the backend server. Please verify the Spring Boot service is active.');
    }
    throw err;
  }
};

/**
 * Books a confirmed calendar appointment to Spring Boot /api/v1/appointments
 * 
 * @param {Object} appointmentData 
 * @returns {Promise<{success: boolean, mode: string, data?: any, message?: string}>}
 */
export const bookAppointment = async (appointmentData) => {
  if (!appointmentData.title || appointmentData.title.trim().length < 3) {
    throw new Error('Please provide an appointment subject or purpose.');
  }

  if (!appointmentData.scheduledAt) {
    throw new Error('Please select an appointment date and time.');
  }

  const payload = {
    title: appointmentData.title.trim(),
    scheduledAt: appointmentData.scheduledAt,
    durationMinutes: appointmentData.durationMinutes || 45,
    mode: appointmentData.mode || 'in-person',
    meetingLinkOrVenue: appointmentData.meetingLinkOrVenue || 'Chambers Office',
    notes: appointmentData.notes ? appointmentData.notes.trim() : '',
    consultationReference: appointmentData.consultationReference || null
  };

  // Dedicated API request URL with fallback absolute URL pointing directly to Render backend
  const apiUrl = (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim())
    ? `${import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')}${import.meta.env.VITE_API_URL.includes('/api/v1') ? '' : '/api/v1'}/appointments`
    : 'https://sheladiya-backend.onrender.com/api/v1/appointments';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const result = await response.json().catch(() => ({}));
      return {
        success: true,
        mode: 'live_backend',
        message: result.message || 'Appointment confirmed successfully.',
        data: result
      };
    }

    if (response.status === 405) {
      throw new Error('HTTP 405 Method Not Allowed: Please verify VITE_API_URL and ensure backend is active.');
    }

    if (response.status === 400) {
      const errorJson = await response.json().catch(() => ({}));
      throw new Error(errorJson.message || 'Validation error in appointment scheduling.');
    }

    throw new Error(`Server returned error status: ${response.status}`);
  } catch (err) {
    if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError') || err.message.includes('Load failed'))) {
      throw new Error('Unable to connect to the backend server. Please verify the Spring Boot service is active.');
    }
    throw err;
  }
};

/**
 * Checks backend health status from Spring Boot /api/v1/health
 */
export const checkBackendHealth = async () => {
  const apiUrl = (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim())
    ? `${import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '')}${import.meta.env.VITE_API_URL.includes('/api/v1') ? '' : '/api/v1'}/health`
    : 'https://sheladiya-backend.onrender.com/api/v1/health';

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      return await response.json();
    }
    return { success: false, message: `Status: ${response.status}` };
  } catch (err) {
    return { success: false, message: 'Backend unreachable' };
  }
};
