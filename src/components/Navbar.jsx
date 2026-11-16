import React, { useState, useEffect } from 'react';
import { SCLogo } from './SCLogo';
import { 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronRight,
  FileText,
  Scale
} from 'lucide-react';

export const Navbar = ({ onOpenConsultation, onOpenDisclaimer }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'About', href: '#about' },
    { 
      label: 'Legal Services', 
      href: '#legal-services',
      subItems: ['Civil Disputes', 'Criminal & Bail', 'Commercial Arbitration', 'Statutory Notices']
    },
    { label: 'Corporate', href: '#corporate' },
    { label: 'Documentation', href: '#documentation' },
    { label: 'Property', href: '#property' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      // Section spy
      const sections = ['hero', 'about', 'legal-services', 'corporate', 'documentation', 'property', 'team', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Minimal Top Utility Strip */}
      <div className={`w-full bg-navy-950/98 border-b border-gold-400/20 py-1.5 px-4 sm:px-6 lg:px-8 text-xs text-slate-300 transition-all duration-300 ${isScrolled ? 'hidden md:block py-1' : 'block'}`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Tagline & Assurance */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-cinzel text-gold-300 font-semibold tracking-wider text-[11px] sm:text-xs">
              <Scale className="w-3.5 h-3.5 text-gold-400" />
              TRUTH • HONESTY • DISCIPLINE
            </span>
            <span className="hidden lg:inline text-navy-700">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-slate-400 text-xs font-light">
              <ShieldCheck className="w-3 h-3 text-gold-400" />
              Confidential & Compliant Consultancy
            </span>
          </div>

          {/* Quick Contact & Disclaimer Link */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a 
              href="tel:+919978692683" 
              className="hidden sm:flex items-center gap-1.5 hover:text-gold-300 transition-colors"
              title="Direct Chambers Contact"
            >
              <Phone className="w-3 h-3 text-gold-400" />
              <span className="font-mono text-gold-300">+91 99786 92683</span>
            </a>
            <a 
              href="mailto:jeelsheladiya47@gmail.com" 
              className="hidden md:flex items-center gap-1.5 hover:text-gold-300 transition-colors"
              title="Official Chambers Email"
            >
              <Mail className="w-3 h-3 text-gold-400" />
              <span className="font-mono text-gold-300">jeelsheladiya47@gmail.com</span>
            </a>
            <button 
              onClick={onOpenDisclaimer} 
              className="text-gold-400/90 hover:text-gold-300 underline underline-offset-2 flex items-center gap-1 transition-colors ml-auto sm:ml-0 cursor-pointer"
            >
              <FileText className="w-3 h-3" />
              Legal Disclaimer
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-navy-950/95 backdrop-blur-md shadow-luxury py-3 border-b border-gold-400/30' 
            : 'bg-navy-900/90 backdrop-blur-sm py-4 border-b border-slate-800/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo on the Left */}
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 group cursor-pointer"
            aria-label="Sheladiya Consultancy Home"
          >
            <SCLogo size="md" showTagline={false} />
          </a>

          {/* Elegant Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 relative whitespace-nowrap ${
                    isActive 
                      ? 'text-gold-300 font-semibold' 
                      : 'text-slate-300 hover:text-gold-300 hover:bg-navy-800/50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop Consultation CTA with Gold Accent Interaction */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-gold-sm border border-gold-400/80 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-navy-950 hover:shadow-gold-md hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Book Consultation</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <div className="absolute inset-0 bg-white/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Mobile & Tablet Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenConsultation}
              className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-gold-400 text-navy-950 sm:inline-flex hidden shadow-gold-sm cursor-pointer"
            >
              Consult
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-gold-400 hover:bg-navy-800/80 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-950/98 backdrop-blur-xl border-b border-gold-400/30 px-5 py-6 shadow-2xl transition-all max-h-[85vh] overflow-y-auto animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <div key={link.href} className="flex flex-col">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-navy-800/90 text-gold-300 border-l-4 border-gold-400'
                        : 'text-slate-300 hover:bg-navy-900 hover:text-gold-300'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </a>
                  {link.subItems && (
                    <div className="pl-4 pr-2 py-1.5 flex flex-wrap gap-1.5 mb-1">
                      {link.subItems.map((sub, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-navy-900 border border-gold-400/20 text-slate-300">
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-navy-950 text-center shadow-gold-sm cursor-pointer"
              >
                Request Confidential Consultation
              </button>

              <div className="flex flex-col gap-2 text-xs text-slate-400 px-2 pt-2">
                <a href="tel:+919978692683" className="flex items-center gap-2 hover:text-gold-300 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span className="font-mono text-gold-300">+91 99786 92683</span>
                </a>
                <a href="mailto:jeelsheladiya47@gmail.com" className="flex items-center gap-2 hover:text-gold-300 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-gold-400" />
                  <span className="font-mono text-gold-300">jeelsheladiya47@gmail.com</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDisclaimer();
                  }}
                  className="text-left text-gold-400/90 underline pt-1 cursor-pointer"
                >
                  View Legal Disclaimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
