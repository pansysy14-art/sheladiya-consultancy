import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Lock,
  Scale,
  Info
} from 'lucide-react';
import { scheduleConsultationInquiry } from '../services/formService';

export const ConsultationModal = ({ isOpen, onClose }) => {
  // Empty by default - strictly no sample or test values
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    mode: 'in-person',
    preferredDate: '',
    notes: '',
    agreed: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState('');
  const [submissionMode, setSubmissionMode] = useState('');
  const [bookingReference, setBookingReference] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Comprehensive client-side validation
    if (!formData.name || formData.name.trim().length < 2) {
      setError('Please enter your full legal name (minimum 2 characters).');
      return;
    }

    const cleanPhone = formData.phone.replace(/[\s\-()]/g, '');
    const phoneRegex = /^(\+?[0-9]{1,4})?[0-9]{7,14}$/;
    if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 8) {
      setError('Please provide a valid contact telephone number (8 to 15 digits).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!formData.service) {
      setError('Please select a practice discipline.');
      return;
    }

    if (!formData.agreed) {
      setError('Please acknowledge the voluntary consultation declaration.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await scheduleConsultationInquiry(formData);
      setSubmissionMode(res.mode);
      if (res.referenceNumber) {
        setBookingReference(res.referenceNumber);
      } else if (res.data && res.data.data && res.data.data.referenceNumber) {
        setBookingReference(res.data.data.referenceNumber);
      }
      setIsDone(true);
    } catch (err) {
      setError(err.message || 'Unable to schedule consultation. Please check required fields.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsDone(false);
    setBookingReference('');
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      mode: 'in-person',
      preferredDate: '',
      notes: '',
      agreed: false
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl bg-navy-900 border border-gold-400/40 shadow-2xl p-6 sm:p-8 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          aria-label="Close consultation modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 flex-shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-cinzel font-bold text-gold-400 uppercase tracking-widest block">
              Voluntary Inquiry Booking
            </span>
            <h3 className="text-xl font-cinzel font-bold text-white">
              Schedule Consultation
            </h3>
          </div>
        </div>

        {isDone ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-gold-400/10 border border-gold-400/40 flex items-center justify-center text-gold-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-cinzel font-bold text-white">
              {submissionMode === 'live_backend' ? 'Consultation Request Registered' : 'Consultation Request Validated'}
            </h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{formData.name}</strong>. Your appointment request for <strong className="text-gold-300 uppercase">{formData.service}</strong> ({formData.mode.replace('-', ' ')}) has been validated.
            </p>

            <div className="p-3 rounded-lg bg-navy-950 border border-gold-400/20 text-[11px] text-slate-400 max-w-sm mx-auto font-mono text-left">
              <div className="font-semibold text-gold-300 mb-0.5">
                {submissionMode === 'live_backend' ? 'Appointment Scheduled:' : 'Demonstration Notice:'}
              </div>
              <div>
                {submissionMode === 'live_backend'
                  ? `Consultation registered in database. Reference: ${bookingReference || 'Assigned'}. Our counsel will follow up at the requested time.`
                  : 'Validated on frontend. Remote database storage is not active pending backend Spring Boot implementation and testing.'}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-gold-400 text-navy-950 hover:bg-gold-300 transition-all shadow-gold-sm"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {error && (
              <div className="p-3 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 flex items-center gap-2 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1 uppercase tracking-wider text-[10px]">
                  Full Name / Enterprise *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Legal Name"
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-slate-700 text-slate-200 focus:border-gold-400 focus:outline-none text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1 uppercase tracking-wider text-[10px]">
                  Telephone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-slate-700 text-slate-200 focus:border-gold-400 focus:outline-none text-xs"
                  required
                />
              </div>
            </div>

            {/* Email & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1 uppercase tracking-wider text-[10px]">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-slate-700 text-slate-200 focus:border-gold-400 focus:outline-none text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1 uppercase tracking-wider text-[10px]">
                  Preferred Date (Optional)
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-slate-700 text-slate-200 focus:border-gold-400 focus:outline-none text-xs"
                />
              </div>
            </div>

            {/* Service & Consultation Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1 uppercase tracking-wider text-[10px]">
                  Practice Discipline *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-slate-700 text-slate-200 focus:border-gold-400 focus:outline-none text-xs"
                  required
                >
                  <option value="">Select Practice Discipline...</option>
                  <option value="Legal Services">Legal Services & Dispute Advisory</option>
                  <option value="Criminal Law">Criminal Law</option>
                  <option value="Matrimonial disputes inquiry">Matrimonial disputes inquiry</option>
                  <option value="Corporate Consultancy">Corporate Governance & Compliance</option>
                  <option value="Business Documentation">Business Documentation & Contracts</option>
                  <option value="Property Due Diligence">Property Due Diligence & Conveyance</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1 uppercase tracking-wider text-[10px]">
                  Discussion Format *
                </label>
                <select
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-slate-700 text-slate-200 focus:border-gold-400 focus:outline-none text-xs"
                >
                  <option value="in-person">In-Person Chambers Meeting</option>
                  <option value="video-conference">Virtual Conference</option>
                  <option value="telephonic">Telephonic Preliminary Brief</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-slate-300 font-medium mb-1 uppercase tracking-wider text-[10px]">
                Brief Context (Optional)
              </label>
              <textarea
                name="notes"
                rows={2}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Brief subject outline without privileged documents..."
                className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-slate-700 text-slate-200 focus:border-gold-400 focus:outline-none text-xs resize-none"
              />
            </div>

            {/* Voluntary Initiation & Legal Notice Checkbox */}
            <div className="p-3 rounded-lg bg-navy-950 border border-slate-800">
              <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-slate-400">
                <input
                  type="checkbox"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  className="mt-0.5 rounded border-slate-700 text-gold-500 focus:ring-gold-400 focus:ring-offset-navy-900 w-4 h-4 cursor-pointer"
                  required
                />
                <span className="leading-relaxed">
                  I confirm this inquiry is voluntary and understand that submitting this request does not constitute formal legal counsel or create an advocate-client relationship.
                </span>
              </label>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-navy-950 hover:shadow-gold-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Validating Request...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Appointment Request</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-slate-500 text-center font-light">
              BCI Rule 36 compliant. By formal appointment only.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ConsultationModal;
