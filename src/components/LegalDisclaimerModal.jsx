import React, { useEffect } from 'react';
import { 
  Scale, 
  ShieldCheck, 
  AlertTriangle, 
  X, 
  CheckCircle2, 
  BookOpen, 
  Lock 
} from 'lucide-react';
import { SCLogo } from './SCLogo';

export const LegalDisclaimerModal = ({ isOpen, onClose }) => {
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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-navy-900 border border-gold-400/40 shadow-2xl p-6 sm:p-8 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          aria-label="Close disclaimer modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 flex-shrink-0">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-cinzel font-bold text-gold-400 uppercase tracking-widest block">
              Official Regulatory Disclosure
            </span>
            <h3 className="text-xl font-cinzel font-bold text-white">
              Legal Disclaimer & Compliance Terms
            </h3>
          </div>
        </div>

        {/* Disclaimer Content */}
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed max-h-[55vh] overflow-y-auto pr-2 custom-scrollbar">
          
          <div className="p-3.5 rounded-xl bg-navy-950/90 border border-gold-400/20 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
            <div className="text-[11px] leading-normal text-slate-200">
              <strong>Compliance with Bar Council of India Regulations:</strong> As per the rules of the Bar Council of India (including Rule 36), advocates and legal practitioners in India are prohibited from soliciting work or advertising in any form or manner.
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-1">
              1. Voluntary Access by User
            </h4>
            <p>
              By proceeding to browse and access this website (<span className="text-gold-300 font-mono">Sheladiya Consultancy</span>), the user acknowledges and confirms that they are seeking information relating to the consultancy, its practice areas, and professionals voluntarily of their own accord and volition, without any solicitation, invitation, or inducement from Sheladiya Consultancy or its members.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-1">
              2. Solely Informational Purpose
            </h4>
            <p>
              The content provided on this website is intended solely for general informational purposes and does not constitute formal legal advice, solicitation, advertisement, or an invitation to enter into an advocate-client relationship. Users must not act or refrain from acting on the basis of any material found on this website without seeking appropriate legal or professional advice.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-1">
              3. Absence of Advocate-Client Relationship
            </h4>
            <p>
              Neither the receipt of information from this website nor any preliminary electronic communication or inquiry initiated through forms or emails creates an advocate-client, attorney-client, or binding consultant relationship between Sheladiya Consultancy and the user. A formal professional relationship comes into existence solely upon mutual execution of a written engagement terms letter.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-1">
              4. Distinction Between Legal & Non-Legal Consultancy
            </h4>
            <p>
              Legal advisory, court litigation, and representation before statutory bodies are undertaken solely by authorized Advocates duly enrolled with the Bar Council. Corporate compliance, business documentation, entity governance, and property verification advisory are conducted in capacity as specialized corporate consultants and legal researchers.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-1">
              5. Limitation of Liability & Third-Party Content
            </h4>
            <p>
              Sheladiya Consultancy disclaims all liability in respect of actions taken or not taken based on any or all the contents of this website. Transmission of sensitive confidential trade secrets before executing formal non-disclosure agreements is discouraged.
            </p>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            Sheladiya Consultancy Integrity Protocol
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-gold-400 hover:bg-gold-300 text-navy-950 transition-colors shadow-gold-sm"
          >
            I Acknowledge & Understand
          </button>
        </div>

      </div>
    </div>
  );
};

export default LegalDisclaimerModal;
