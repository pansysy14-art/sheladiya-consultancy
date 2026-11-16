import React from 'react';
import { SCLogo } from './SCLogo';
import { 
  Scale, 
  ShieldCheck, 
  FileText, 
  ChevronUp, 
  MapPin, 
  Phone, 
  Mail, 
  Lock,
  AlertTriangle
} from 'lucide-react';

export const Footer = ({ onOpenDisclaimer }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { label: 'About Firm', href: '#about' },
    { label: 'Legal Services', href: '#legal-services' },
    { label: 'Corporate Consultancy', href: '#corporate' },
    { label: 'Business Documentation', href: '#documentation' },
    { label: 'Property Due Diligence', href: '#property' },
    { label: 'Advisory Leadership', href: '#team' },
    { label: 'Contact Chambers', href: '#contact' },
  ];

  const practiceVerticals = [
    'Civil & Commercial Disputes Advisory',
    'Criminal Defense & Bail Matters',
    'Corporate Board Governance & MCA',
    'Commercial Contract Redlining & Architecture',
    '30-Year Property Title Search Due Diligence',
    'RERA Compliance & Buyer Advisory',
    'IP & Trademark Portfolio Protection',
    'Shareholders Agreements & Founder Equity',
    'Statutory & Regulatory Representation'
  ];

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-gold-400/35 pt-18 pb-12 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Brand & Ethos Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <SCLogo size="lg" showTagline={true} />
            
            <p className="text-xs text-slate-300 leading-relaxed pt-2 font-light">
              Sheladiya Consultancy is a multidisciplinary legal and corporate consultancy providing structured counsel across civil disputes, criminal defense & bail matters, commercial arbitration, enterprise compliance, contractual drafting, and real estate due diligence.
            </p>

            {/* Official Tagline Badge */}
            <div className="p-3.5 rounded-xl bg-navy-900/90 border border-gold-400/35 inline-block w-full">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block mb-0.5 font-cinzel">
                Official Credo
              </span>
              <p className="font-cinzel text-xs font-bold tracking-[0.24em] text-gold-300">
                TRUTH • HONESTY • DISCIPLINE
              </p>
            </div>

            <div className="text-xs text-slate-400 space-y-1.5 pt-1 font-light">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-gold-400" />
                <span>Privilege Attaches Upon Written Engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>Bar Council of India Rule 36 Observed</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-cinzel text-xs uppercase font-bold tracking-widest text-white border-b border-slate-800 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-gold-300 transition-colors flex items-center gap-1.5 cursor-pointer font-light"
                  >
                    <span className="text-gold-400/60 text-[10px]">›</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas Summary (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-cinzel text-xs uppercase font-bold tracking-widest text-white border-b border-slate-800 pb-2">
              Practice Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {practiceVerticals.map((area, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
                  <span className="font-light">{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Chambers Particulars (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="font-cinzel text-xs uppercase font-bold tracking-widest text-white border-b border-slate-800 pb-2">
              Chambers & Offices
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-1" />
                <div className="space-y-1.5 text-[11px] leading-relaxed">
                  <div className="p-2 rounded-lg bg-navy-900/80 border border-gold-400/20">
                    <span className="text-[10px] uppercase tracking-wider text-gold-400 font-bold block mb-0.5">Head Office (Ahmedabad):</span>
                    <span className="text-slate-300">3027, New Advocates Chamber Building, Gujarat High Court, Ahmedabad - 380060</span>
                  </div>
                  <div className="p-2 rounded-lg bg-navy-900/80 border border-gold-400/20">
                    <span className="text-[10px] uppercase tracking-wider text-gold-400 font-bold block mb-0.5">Branch Office (Surat):</span>
                    <span className="text-slate-300">A-402, RJD Business Hub, Kasanagar, Katargam, Surat</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <a href="tel:+919978692683" className="font-mono text-gold-300 hover:text-white transition-colors">
                  +91 99786 92683
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <a href="mailto:jeelsheladiya47@gmail.com" className="font-mono text-gold-300 hover:text-white transition-colors">
                  jeelsheladiya47@gmail.com
                </a>
              </div>
              
              <div className="pt-2">
                <button
                  onClick={onOpenDisclaimer}
                  className="px-3.5 py-2 rounded-lg bg-navy-900 border border-gold-400/40 text-gold-300 text-xs hover:bg-navy-850 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Mandatory Disclaimer</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory Compliance & Legal Disclaimer Notice Box */}
        <div className="p-6 rounded-2xl bg-navy-900/85 border border-gold-400/30 text-xs text-slate-400 leading-relaxed mb-10 shadow-lg">
          <div className="flex items-center gap-2 text-gold-400 font-semibold mb-2.5 font-cinzel text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Official Regulatory Notice & Bar Council Rule 36 Compliance Disclaimer</span>
          </div>
          <p className="mb-2.5 text-[11px] font-light leading-relaxed">
            In compliance with the rules of the Bar Council of India (specifically Rule 36 of the Bar Council of India Rules) and standard professional legal ethics, this website does not constitute advertisement, personal communication, solicitation, an invitation, or inducement of any sort whatsoever by <strong className="text-slate-200 font-medium">Sheladiya Consultancy</strong> or any of its members/advocates to solicit any legal work.
          </p>
          <p className="text-[11px] font-light leading-relaxed">
            The information provided on this website is made available solely for informational convenience at the specific, voluntary request of the user. Sheladiya Consultancy assumes no liability for the interpretation or use of information contained herein. Transmission, receipt, or use of this website does not establish an advocate-client or consultant-client relationship. Users facing legal issues must seek independent formal counsel.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-light">
          <div>
            © {new Date().getFullYear()} <strong className="text-white font-medium">SHELADIYA CONSULTANCY</strong>. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenDisclaimer}
              className="hover:text-gold-300 transition-colors underline underline-offset-2 cursor-pointer"
            >
              Legal Disclaimer & Terms of Use
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-gold-300 transition-colors p-2 rounded-lg bg-navy-900 border border-slate-800 hover:border-gold-400/40 cursor-pointer shadow-sm"
              title="Return to Top"
            >
              <span>Back to Top</span>
              <ChevronUp className="w-4 h-4 text-gold-400" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
