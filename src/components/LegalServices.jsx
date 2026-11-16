import React, { useState } from 'react';
import { 
  Scale, 
  Gavel, 
  FileText, 
  ShieldAlert, 
  BookOpen, 
  Award, 
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  Shield
} from 'lucide-react';

export const LegalServices = ({ onOpenConsultation }) => {
  const [selectedService, setSelectedService] = useState(0);

  const services = [
    {
      id: 'civil-disputes',
      title: 'Civil & Commercial Dispute Advisory',
      icon: Gavel,
      summary: 'Objective evaluation of monetary claims, recovery proceedings, and contractual breaches under civil jurisprudence.',
      details: [
        'Pre-litigation legal assessment and viability analysis',
        'Commercial suit evaluation and defense advisory',
        'Negotiable instruments matters (Sec. 138 NI Act)'
      ],
      framework: 'Code of Civil Procedure, Contract Act, NI Act'
    },
    {
      id: 'criminal-bail',
      title: 'Criminal & Bail Matters',
      icon: Shield,
      summary: 'Strategic legal counsel for criminal proceedings, anticipatory and regular bail applications, and trial evaluation.',
      details: [
        'Regular bail, interim bail, and anticipatory bail applications',
        'Criminal trial defense, revision applications, and appellate briefs',
        'Quashing petitions and statutory summons evaluation'
      ],
      framework: 'Bharatiya Nagarik Suraksha Sanhita (BNSS), CrPC, BNS / IPC'
    },
    {
      id: 'corporate-litigation',
      title: 'Corporate Litigation & Arbitration Support',
      icon: Scale,
      summary: 'Advisory on shareholder disagreements, tribunal representation (NCLT), and institutional arbitration proceedings.',
      details: [
        'NCLT representation for oppression and mismanagement matters',
        'Arbitration clause invocation and tribunal briefings',
        'Insolvency & Bankruptcy Code (IBC) statutory advisory'
      ],
      framework: 'Companies Act, Arbitration & Conciliation Act, IBC'
    },
    {
      id: 'statutory-compliance',
      title: 'Statutory & Regulatory Representation',
      icon: BookOpen,
      summary: 'Guidance through statutory notices, regulatory inquiries, show-cause hearings, and administrative appellate procedures.',
      details: [
        'Drafting responses to departmental show-cause notices',
        'Appellate representation before statutory tribunals',
        'Consumer protection disputes and commission hearings'
      ],
      framework: 'Consumer Protection Act, Administrative Jurisprudence'
    },
    {
      id: 'contractual-enforcement',
      title: 'Contractual Enforcement & Legal Notices',
      icon: FileText,
      summary: 'Drafting formal advocate demand notices, cease-and-desist communications, and pre-litigation settlements.',
      details: [
        'Statutory legal notices and rejoinders',
        'Cease-and-desist mandates for contractual breach',
        'Settlement deeds and consent terms drafting'
      ],
      framework: 'Specific Relief Act, Indian Contract Act'
    },
    {
      id: 'ip-trademark',
      title: 'Intellectual Property Rights & Protection',
      icon: Award,
      summary: 'Safeguarding proprietary trademarks, copyrights, and managing opposition or infringement proceedings.',
      details: [
        'Trademark search, filing advisory, and hearing representation',
        'Opposition notices and counter-statement drafting',
        'IP licensing and brand assignment agreements'
      ],
      framework: 'Trade Marks Act, Copyright Act'
    },
    {
      id: 'labour-employment',
      title: 'Employment & Labour Law Counsel',
      icon: ShieldAlert,
      summary: 'Structuring workplace compliance, POSH framework, executive service covenants, and industrial relations.',
      details: [
        'POSH Act policy architecture and ICC compliance',
        'Executive separation, non-disclosure, and release deeds',
        'Standing orders and industrial employment compliance'
      ],
      framework: 'Code on Wages, Industrial Relations, POSH Act'
    }
  ];

  return (
    <section id="legal-services" className="py-24 sm:py-28 bg-navy-950 relative overflow-hidden scroll-mt-20 border-b border-navy-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold-400/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-navy-700/20 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-400/40 text-gold-300 text-xs font-cinzel tracking-[0.22em] uppercase mb-4 shadow-gold-sm">
            <Scale className="w-3.5 h-3.5 text-gold-400" />
            Vertical I • Regulated Legal Advocacy
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white tracking-wide">
            Legal <span className="text-gold-gradient">Services</span>
          </h2>
          <div className="gold-divider max-w-xs mx-auto my-4" />
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Methodical legal counsel and dispute advisory conducted under established statutory frameworks.
          </p>

          {/* Bar Council Regulatory Standard Banner */}
          <div className="mt-5 p-3 rounded-xl bg-navy-900/90 border border-slate-700/80 text-xs text-slate-300 flex items-center justify-center gap-2.5 max-w-2xl mx-auto text-left shadow-lg">
            <AlertTriangle className="w-4 h-4 text-gold-400 flex-shrink-0" />
            <span className="leading-normal">
              <strong className="text-white">Professional Standard:</strong> Court litigation and legal representation are conducted exclusively through duly enrolled Advocates in strict compliance with the Advocates Act and Bar Council of India regulations.
            </span>
          </div>
        </div>

        {/* Services Grid with Concise Cards & Improved Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((item, index) => {
            const IconComponent = item.icon;
            const isSelected = selectedService === index;

            return (
              <div 
                key={item.id}
                onClick={() => setSelectedService(index)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border ${
                  isSelected 
                    ? 'bg-gradient-to-b from-navy-850 to-navy-900 border-gold-400/80 shadow-gold-sm scale-[1.01]' 
                    : 'bg-navy-900/70 border-slate-800 hover:border-gold-400/50 hover:bg-navy-850/80 hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-400/5 border border-gold-400/30 flex items-center justify-center text-gold-300 shadow-inner">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-gold-400/90 bg-navy-950 px-2 py-0.5 rounded border border-gold-400/30 font-semibold">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-cinzel font-bold text-white mb-2 group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4 font-light">
                    {item.summary}
                  </p>

                  <div className="space-y-1.5 mb-5">
                    {item.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 italic font-mono truncate max-w-[160px]" title={item.framework}>
                    {item.framework}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenConsultation();
                    }}
                    className="text-gold-400 hover:text-gold-300 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Inquire Scope</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation Banner */}
        <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-400/40 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-xl">
          <div>
            <h4 className="text-base sm:text-lg font-cinzel font-bold text-white">
              Preliminary Inquiry Regarding Practice Disciplines
            </h4>
            <p className="text-xs text-slate-300 mt-1 max-w-xl font-light">
              Arrange an informational discussion with our designated legal counsel to review practice scope and statutory jurisdiction.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase bg-gold-400 hover:bg-gold-300 text-navy-950 transition-all shadow-gold-sm flex-shrink-0 cursor-pointer"
          >
            Schedule Inquiry
          </button>
        </div>

      </div>
    </section>
  );
};

export default LegalServices;
