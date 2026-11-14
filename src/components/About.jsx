import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Scale, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar,
  MapPin,
  BadgeInfo,
  BookOpen,
  ScrollText,
  FileCheck2,
  Award,
  AlertCircle
} from 'lucide-react';
import { OfficialLogo } from './OfficialLogo';

export const About = () => {
  return (
    <section 
      id="about" 
      className="py-24 sm:py-28 bg-gradient-to-b from-ivory-100 via-ivory-200 to-ivory-100 text-navy-950 relative overflow-hidden border-t border-b border-gold-400/30 scroll-mt-20"
    >
      {/* Official Standalone Laurel Wreath, Scales of Justice & Law Book Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[650px] h-[650px] opacity-[0.03] pointer-events-none select-none text-navy-900">
        <svg viewBox="0 0 160 180" fill="none" className="w-full h-full">
          <path d="M 80 162 C 50 156 22 130 18 90 C 16 68 25 46 38 28" stroke="currentColor" strokeWidth="2.5" />
          <path d="M 80 162 C 110 156 138 130 142 90 C 144 68 135 46 122 28" stroke="currentColor" strokeWidth="2.5" />
          <path d="M 40 42 C 54 38 68 37 80 37 C 92 37 106 38 120 42" stroke="currentColor" strokeWidth="3" />
          <rect x="78.5" y="34" width="3" height="74" rx="1.5" fill="currentColor" />
          <path d="M 29 68 C 33 80 53 80 57 68 Z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M 103 68 C 107 80 127 80 131 68 Z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M 80 112 C 68 108 52 110 44 115 L 44 133 C 53 128 68 127 80 130 Z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M 80 112 C 92 108 108 110 116 115 L 116 133 C 107 128 92 127 80 130 Z" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Eyebrow & Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gold-400/40 text-gold-700 text-xs font-cinzel tracking-[0.24em] uppercase mb-4 shadow-sm">
            <ScrollText className="w-3.5 h-3.5 text-gold-600" />
            Institutional Profile & Ethos
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-navy-950 tracking-wide leading-tight">
            Distinguished Counsel, <br />
            <span className="font-serif italic font-normal text-gold-700">Enduring Integrity.</span>
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto my-5" />
          <p className="text-slate-700 text-base sm:text-lg font-sans font-light leading-relaxed max-w-2xl mx-auto">
            Anchored in the unyielding principles of <strong className="font-semibold text-navy-900">Truth, Honesty, and Discipline</strong>, Sheladiya Consultancy provides legal counsel and corporate governance guidance.
          </p>

          {/* Bar Council Compliance Badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-ivory-300 border border-gold-400/40 text-[11px] text-slate-600 font-mono">
            <AlertCircle className="w-3.5 h-3.5 text-gold-700" />
            <span>Information published strictly in compliance with BCI Rule 36. Non-solicitation policy observed.</span>
          </div>
        </div>

        {/* Balanced Editorial Two-Column Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-stretch mb-16">
          
          {/* Left Column: Editorial Narrative & Ethical Foundation (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gold-400/30 shadow-editorial relative flex-1">
              <span className="text-4xl sm:text-5xl font-serif text-gold-600/30 float-left mr-3.5 leading-none font-bold">
                A
              </span>
              <p className="text-slate-800 text-base sm:text-lg leading-relaxed mb-5 font-light">
                t Sheladiya Consultancy, we hold that legal counsel is founded on integrity, procedural discipline, and objective statutory analysis. Our practice emphasizes thorough preparation and defensible legal solutions.
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-light">
                Operating within modern commercial frameworks and multi-jurisdictional mandates, we provide clients with structured guidance across statutory compliance, dispute evaluation, and contractual risk management. In compliance with professional norms, we do not solicit work or advertise outcomes.
              </p>

              {/* The Three Foundational Pillars Summary */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <h4 className="font-cinzel font-bold text-navy-950 text-sm mb-1 text-gold-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                    Truth
                  </h4>
                  <p className="text-xs text-slate-600 leading-normal font-light">
                    Objective statutory analysis, factual accuracy, and candid legal diagnostics.
                  </p>
                </div>
                <div>
                  <h4 className="font-cinzel font-bold text-navy-950 text-sm mb-1 text-gold-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                    Honesty
                  </h4>
                  <p className="text-xs text-slate-600 leading-normal font-light">
                    Fiduciary transparency, clear scopes of engagement, and ethical representation.
                  </p>
                </div>
                <div>
                  <h4 className="font-cinzel font-bold text-navy-950 text-sm mb-1 text-gold-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                    Discipline
                  </h4>
                  <p className="text-xs text-slate-600 leading-normal font-light">
                    Methodical drafting, strict timeline compliance, and due diligence rigor.
                  </p>
                </div>
              </div>
            </div>

            {/* Clear Separation of Practice Disciplines Callout */}
            <div className="p-5 sm:p-7 rounded-2xl bg-ivory-300/80 border border-gold-400/40 shadow-sm flex items-start gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 flex-shrink-0 mt-0.5">
                <Scale className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-cinzel font-bold text-navy-950 text-sm sm:text-base uppercase tracking-wider mb-1">
                  Statutory Practice Demarcation
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                  In accordance with Bar Council of India regulations: <strong className="text-navy-900 font-medium">Court litigation, arbitration, and regulated legal counsel</strong> are handled solely by qualified advocates enrolled with the Bar Council. <strong className="text-navy-900 font-medium">Corporate secretarial, documentation architecture, and property due diligence</strong> are conducted by specialized corporate compliance practitioners.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Legal Office Imagery & Chambers Identity Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Legal Office / Chambers Imagery */}
            <div className="relative rounded-2xl overflow-hidden border border-gold-400/50 shadow-editorial group">
              <img 
                src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80" 
                alt="Sheladiya Consultancy Chambers & Law Library" 
                className="w-full h-52 sm:h-60 object-cover object-center transform transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-mono tracking-widest text-gold-300 block mb-0.5">
                  Chambers Library & Conference Suite
                </span>
                <p className="font-cinzel text-xs sm:text-sm font-semibold tracking-wide text-slate-100">
                  Documentary research and statutory analysis facility.
                </p>
              </div>
            </div>

            {/* Institutional Identity Card & Editable Placeholders */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gold-400/40 shadow-editorial relative flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gold-700 font-bold font-cinzel">
                    Official Entity Record
                  </div>
                  <h3 className="text-xl font-cinzel font-bold text-navy-950">
                    SHELADIYA CONSULTANCY
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-gold-50 border border-gold-400/50 text-gold-800">
                  <BadgeInfo className="w-3 h-3 text-gold-600" />
                  Chambers Registry
                </span>
              </div>

              {/* Editable Information Placeholder Blocks */}
              <div className="space-y-3 text-xs">
                
                <div className="p-3 rounded-xl bg-ivory-100 border border-slate-300/80 hover:border-gold-500/60 transition-colors">
                  <div className="flex items-center gap-2 text-slate-600 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-gold-600" />
                    <span className="font-semibold text-navy-900 uppercase tracking-wider text-[10px]">Establishment Year</span>
                  </div>
                  <div className="font-mono text-navy-950 bg-white px-2 py-0.5 rounded border border-dashed border-gold-500/50 inline-block font-semibold text-[11px]">
                    [Est. 20XX - Editable Year Placeholder]
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-ivory-100 border border-slate-300/80 hover:border-gold-500/60 transition-colors">
                  <div className="flex items-center gap-2 text-slate-600 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-gold-600" />
                    <span className="font-semibold text-navy-900 uppercase tracking-wider text-[10px]">Chambers Locations</span>
                  </div>
                  <div className="text-navy-950 bg-white p-2.5 rounded border border-gold-400/50 block text-[11px] space-y-1">
                    <div><strong className="text-gold-700">Head Office:</strong> High Court, Ahmedabad (380060)</div>
                    <div><strong className="text-gold-700">Branch Office:</strong> Katargam, Surat</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-ivory-100 border border-slate-300/80 hover:border-gold-500/60 transition-colors">
                  <div className="flex items-center gap-2 text-slate-600 mb-1">
                    <Scale className="w-3.5 h-3.5 text-gold-600" />
                    <span className="font-semibold text-navy-900 uppercase tracking-wider text-[10px]">Regulatory Compliance Reference</span>
                  </div>
                  <div className="font-mono text-navy-950 bg-white p-2 rounded border border-dashed border-gold-500/50 block font-semibold text-[11px]">
                    [State Bar Council Enrolment & Statutory Registrations: Editable Placeholder]
                  </div>
                </div>

              </div>

              {/* Note on ethics */}
              <div className="mt-5 pt-3.5 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium text-navy-900 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                  Voluntary Information Portal
                </span>
                <span className="text-gold-700 font-semibold font-mono text-[10px]">
                  BCI RULE 36 COMPLIANT
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
