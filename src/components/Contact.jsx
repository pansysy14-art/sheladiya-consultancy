import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Calendar,
  Lock,
  MessageSquare,
  Building2,
  Scale,
  Navigation,
  Compass,
  FileCheck2,
  Info
} from 'lucide-react';
import { submitContactInquiry } from '../services/formService';
import { OfficialLogo } from './OfficialLogo';

export const Contact = ({ onOpenDisclaimer }) => {
  // Empty by default - strictly no sample or test values
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    practiceArea: '',
    message: '',
    disclaimerAgreed: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submissionMode, setSubmissionMode] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Comprehensive client-side validation
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      setErrorMsg('Please enter your full legal name (minimum 2 characters).');
      return;
    }

    const cleanPhone = formData.phone.replace(/[\s\-()]/g, '');
    const phoneRegex = /^(\+?[0-9]{1,4})?[0-9]{7,14}$/;
    if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 8) {
      setErrorMsg('Please enter a valid telephone contact number (8 to 15 digits).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!formData.practiceArea) {
      setErrorMsg('Please select a primary practice vertical.');
      return;
    }

    if (!formData.disclaimerAgreed) {
      setErrorMsg('Please confirm the voluntary inquiry declaration.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await submitContactInquiry(formData);
      setSubmissionMode(res.mode);
      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err.message || 'Unable to submit inquiry. Please review the highlighted fields.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 sm:py-28 bg-gradient-to-b from-ivory-100 via-ivory-200 to-ivory-100 relative overflow-hidden scroll-mt-20 border-t border-b border-gold-400/30 text-navy-950"
    >
      {/* Official Scales of Justice & Laurel Wreath Watermark Background */}
      <div className="absolute left-0 bottom-0 -translate-x-1/4 translate-y-1/4 w-[600px] h-[600px] opacity-[0.03] pointer-events-none select-none text-navy-900">
        <svg viewBox="0 0 160 180" fill="none" className="w-full h-full">
          <path d="M 80 162 C 50 156 22 130 18 90 C 16 68 25 46 38 28" stroke="currentColor" strokeWidth="2.5" />
          <path d="M 80 162 C 110 156 138 130 142 90 C 144 68 135 46 122 28" stroke="currentColor" strokeWidth="2.5" />
          <rect x="78.5" y="34" width="3" height="74" rx="1.5" fill="currentColor" />
          <path d="M 29 68 C 33 80 53 80 57 68 Z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M 103 68 C 107 80 127 80 131 68 Z" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gold-400/40 text-gold-700 text-xs font-cinzel tracking-[0.22em] uppercase mb-4 shadow-sm">
            <Mail className="w-3.5 h-3.5 text-gold-600" />
            Direct Communication & Booking
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-navy-950 tracking-wide">
            Consultation & <span className="font-serif italic font-normal text-gold-700">Chambers Advisory</span>
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto my-4" />
          <p className="text-slate-700 text-sm sm:text-base font-sans font-light leading-relaxed">
            Submit a preliminary inquiry with our legal counsel, corporate strategists, or property due diligence team.
          </p>
        </div>

        {/* 2-Column Grid: Chambers Particulars & Elegant Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start mb-16">
          
          {/* Left Column: Official Chambers Particulars (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Information Card */}
            <div className="rounded-2xl p-6 sm:p-8 bg-white border border-gold-400/40 shadow-editorial relative">
              <div className="flex items-center gap-2 text-gold-700 text-xs font-cinzel uppercase tracking-widest font-semibold mb-1">
                <Building2 className="w-4 h-4 text-gold-600" />
                Chambers & Head Office
              </div>
              <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-navy-950 mb-1">
                SHELADIYA CONSULTANCY
              </h3>
              <p className="text-xs text-gold-700 font-cinzel tracking-wider uppercase mb-6">
                TRUTH • HONESTY • DISCIPLINE
              </p>

              <div className="space-y-5 text-xs text-slate-700">
                {/* Physical Chambers Addresses */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="font-semibold text-navy-900 block text-xs uppercase tracking-wider font-cinzel">
                          Head Office (Ahmedabad)
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-gold-500/15 text-gold-800 font-bold uppercase tracking-wider">
                          High Court Chambers
                        </span>
                      </div>
                      <div className="text-navy-950 bg-ivory-100 p-2.5 rounded-xl border border-gold-400/40 leading-relaxed text-xs">
                        3027, New Advocates Chamber Building, Gujarat High Court, Ahmedabad - 380060
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="font-semibold text-navy-900 block text-xs uppercase tracking-wider font-cinzel">
                          Branch Office (Surat)
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-navy-100 text-navy-800 font-semibold uppercase tracking-wider">
                          Corporate Hub
                        </span>
                      </div>
                      <div className="text-navy-950 bg-ivory-100 p-2.5 rounded-xl border border-gold-400/40 leading-relaxed text-xs">
                        A-402, RJD Business Hub, Kasanagar, Katargam, Surat
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Helplines */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-navy-900 block text-xs uppercase tracking-wider mb-1 font-cinzel">
                      Direct Telephone Helpline
                    </span>
                    <a 
                      href="tel:+919978692683" 
                      className="bg-ivory-100 px-3 py-2 rounded-xl border border-gold-400/40 flex items-center justify-between text-xs font-mono text-navy-950 hover:bg-gold-50 hover:border-gold-500 transition-colors group"
                    >
                      <span className="font-semibold text-gold-800 group-hover:text-gold-900">+91 99786 92683</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">Tap to Call</span>
                    </a>
                  </div>
                </div>

                {/* Confidential Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-navy-900 block text-xs uppercase tracking-wider mb-1 font-cinzel">
                      Official Communications Email
                    </span>
                    <a 
                      href="mailto:jeelsheladiya47@gmail.com" 
                      className="bg-ivory-100 px-3 py-2 rounded-xl border border-gold-400/40 flex items-center justify-between text-xs font-mono text-navy-950 hover:bg-gold-50 hover:border-gold-500 transition-colors group"
                    >
                      <span className="font-semibold text-gold-800 group-hover:text-gold-900">jeelsheladiya47@gmail.com</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">Direct Dispatch</span>
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-navy-900 block text-xs uppercase tracking-wider mb-1 font-cinzel">
                      Chamber Operating Hours
                    </span>
                    <div className="text-slate-700 bg-ivory-100 p-2.5 rounded-xl border border-slate-300 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Monday – Saturday:</span>
                        <span className="font-semibold text-navy-950">09:30 AM – 07:00 PM</span>
                      </div>
                      <div className="flex justify-between text-gold-800 font-medium">
                        <span>Sunday:</span>
                        <span>By Prior Appointment Only</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privilege Statement - Accurate & Legally Sound */}
              <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-600 font-light leading-relaxed">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Preliminary Notice:</strong> Submitting inquiries via this form does not create an advocate-client relationship or attach statutory privilege. Formal privilege begins upon execution of a written engagement terms letter.
                  </span>
                </div>
              </div>
            </div>

            {/* Voluntary Consultation Notice Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gold-400/30 text-xs text-slate-600 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-gold-700 font-semibold font-cinzel">
                <ShieldCheck className="w-4 h-4 text-gold-600" />
                <span>Voluntary Consultation Protocol</span>
              </div>
              <p className="leading-relaxed font-light text-[11px]">
                Sheladiya Consultancy strictly adheres to Bar Council of India norms. Consultations are arranged exclusively upon voluntary receipt of your request.
              </p>
              <button
                onClick={onOpenDisclaimer}
                className="text-gold-700 font-medium underline underline-offset-2 text-[11px] hover:text-gold-800 cursor-pointer"
              >
                Read Official Legal Disclaimer
              </button>
            </div>

          </div>

          {/* Right Column: Clean Consultation Form (7 cols) - All fields empty by default */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl p-6 sm:p-9 bg-white border border-gold-400/40 shadow-editorial relative">
              
              <div className="mb-6">
                <div className="flex items-center gap-2 text-gold-700 text-xs font-cinzel uppercase tracking-widest font-semibold mb-1">
                  <MessageSquare className="w-4 h-4 text-gold-600" />
                  Preliminary Inquiry
                </div>
                <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-navy-950 mb-1">
                  Request a Consultation
                </h3>
                <p className="text-xs text-slate-600 font-light">
                  Submit your preliminary query. All fields are required unless indicated otherwise.
                </p>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-gold-500/10 border border-gold-500/40 flex items-center justify-center text-gold-700 mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-cinzel font-bold text-navy-950">
                    {submissionMode === 'live_backend' ? 'Inquiry Transmitted Successfully' : 'Preliminary Inquiry Validated'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto leading-relaxed font-light">
                    Thank you, <strong className="text-navy-950 font-medium">{formData.fullName}</strong>. Your inquiry for <strong className="text-gold-700 uppercase font-medium">{formData.practiceArea.replace(/-/g, ' ')}</strong> has been registered.
                  </p>

                  <div className="p-3.5 rounded-xl bg-ivory-100 border border-gold-400/40 text-[11px] text-slate-600 max-w-sm mx-auto font-mono text-left leading-relaxed">
                    <div className="font-semibold text-navy-900 mb-0.5">
                      {submissionMode === 'live_backend' ? 'Transmission Confirmed:' : 'Demonstration Mode Notice:'}
                    </div>
                    <div>
                      {submissionMode === 'live_backend'
                        ? 'Your preliminary inquiry has been registered in our database. Our chambers registry will contact you shortly.'
                        : 'Inquiry validated on frontend. Remote database storage is not active pending backend Spring Boot implementation and testing.'}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        practiceArea: '',
                        message: '',
                        disclaimerAgreed: false,
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-semibold bg-navy-950 text-gold-300 hover:bg-navy-900 cursor-pointer transition-all shadow-md"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  
                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-300 text-red-700 flex items-center gap-2.5 text-xs">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-navy-900 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                        Full Name / Signatory *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Legal Name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-ivory-50 border border-slate-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none text-navy-950 placeholder-slate-400 text-xs transition-colors shadow-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-navy-900 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                        Telephone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Contact Number"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-ivory-50 border border-slate-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none text-navy-950 placeholder-slate-400 text-xs transition-colors shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Email & Service Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-navy-900 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-ivory-50 border border-slate-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none text-navy-950 placeholder-slate-400 text-xs transition-colors shadow-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-navy-900 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                        Practice Vertical *
                      </label>
                      <select
                        name="practiceArea"
                        value={formData.practiceArea}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-ivory-50 border border-slate-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none text-navy-950 text-xs transition-colors shadow-sm"
                        required
                      >
                        <option value="">Select Practice Discipline...</option>
                        <option value="legal-services">Legal Services & Dispute Advisory</option>
                        <option value="criminal-law">Criminal Law</option>
                        <option value="matrimonial-disputes">Matrimonial disputes inquiry</option>
                        <option value="corporate">Corporate Consultancy & Compliance</option>
                        <option value="documentation">Business Documentation & Contracts</option>
                        <option value="property">Property Consultancy & Title Search</option>
                        <option value="general">Comprehensive Advisory Scope</option>
                      </select>
                    </div>
                  </div>

                  {/* Message / Brief */}
                  <div>
                    <label className="block text-navy-900 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                      Preliminary Subject Summary (Optional)
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Outline the broad nature of the inquiry without sharing confidential trade secrets or privileged material..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-ivory-50 border border-slate-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none text-navy-950 placeholder-slate-400 text-xs transition-colors resize-none shadow-sm"
                    />
                  </div>

                  {/* Compliance & Voluntary Initiation Checkbox */}
                  <div className="p-3 rounded-xl bg-ivory-100 border border-slate-300">
                    <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-slate-700">
                      <input
                        type="checkbox"
                        name="disclaimerAgreed"
                        checked={formData.disclaimerAgreed}
                        onChange={handleChange}
                        className="mt-0.5 rounded border-slate-300 text-gold-600 focus:ring-gold-500 w-4 h-4 cursor-pointer"
                        required
                      />
                      <span className="leading-relaxed font-light">
                        I confirm that this consultation inquiry is initiated <strong className="text-navy-950 font-medium">voluntarily</strong>. I acknowledge that transmitting this message does not constitute formal legal counsel or establish an advocate-client relationship.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 shadow-gold-sm border border-gold-400 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-navy-950 hover:shadow-gold-md hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? (
                      <span>Validating Details...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Consultation Request</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-slate-500 text-center font-light">
                    BCI Rule 36 compliant. No unsolicited commercial solicitation.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* Office Location & Chamber Access Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gold-400/40 shadow-editorial">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-gold-700 text-xs font-cinzel uppercase tracking-widest font-semibold mb-0.5">
                <Navigation className="w-4 h-4 text-gold-600" />
                Physical Presence & Access
              </div>
              <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-navy-950">
                Office Location & Chamber Access
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono bg-ivory-100 px-3 py-1.5 rounded-lg border border-gold-400/40 text-gold-800">
              <Compass className="w-3.5 h-3.5 text-gold-600" />
              <span>Chambers Facility</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-5">
            <div className="p-4 rounded-xl bg-ivory-50 border border-slate-200">
              <span className="font-cinzel text-xs font-bold text-navy-950 block mb-1">
                Centrally Positioned
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Positioned in the corporate and administrative district for client access and administrative convenience.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-ivory-50 border border-slate-200">
              <span className="font-cinzel text-xs font-bold text-navy-950 block mb-1">
                Private Consultation Suites
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Chamber suites arranged for client discussions and transactional documentation reviews.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-ivory-50 border border-slate-200">
              <span className="font-cinzel text-xs font-bold text-navy-950 block mb-1">
                By Formal Appointment
              </span>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                To guarantee dedicated focus, all in-person and video consultations require prior appointment scheduling.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
