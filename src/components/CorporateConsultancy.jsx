import React from 'react';
import { 
  Building2, 
  Briefcase, 
  FileCheck, 
  ShieldCheck, 
  Workflow, 
  Layers, 
  Coins, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

export const CorporateConsultancy = ({ onOpenConsultation }) => {
  const corporateVerticals = [
    {
      title: 'Corporate Governance & Board Advisory',
      icon: Building2,
      description: 'Establishing structured governance frameworks, board charter drafting, director compliance, and secretarial norms.',
      points: [
        'Board meeting resolutions and secretarial standards',
        'Director duties, liabilities, and conflict protocols',
        'Shareholder voting agreements and ESG guidelines'
      ]
    },
    {
      title: 'Entity Incorporation & Structuring',
      icon: Layers,
      description: 'Advisory on entity structuring for domestic and international ventures, joint ventures, and partnerships.',
      points: [
        'Private Limited, Public Limited, and Section 8 setup',
        'Limited Liability Partnerships (LLP) and Partnership deeds',
        'Holding company and subsidiary operating architecture'
      ]
    },
    {
      title: 'Regulatory & RoC Compliance Stewardship',
      icon: FileCheck,
      description: 'Assistance with Ministry of Corporate Affairs (MCA) filings, statutory registers, and compounding of delays.',
      points: [
        'Annual RoC filings (AOC-4, MGT-7) and director KYC (DIR-3)',
        'Maintenance of statutory registers and minutes books',
        'Share capital allotment, transfer, and transmission'
      ]
    },
    {
      title: 'Commercial Licensing & Statutory Permits',
      icon: ShieldCheck,
      description: 'Navigating statutory business licenses, trade registrations, industrial approvals, and municipal permits.',
      points: [
        'Shop & Establishment, MSME/Udyam, and GST registration',
        'Import-Export Code (IEC) and foreign trade documentation',
        'FSSAI, trade licenses, and environmental clearances'
      ]
    },
    {
      title: 'M&A and Corporate Restructuring',
      icon: Workflow,
      description: 'Due diligence and contractual documentation for business transfers, slump sales, and corporate reorganization.',
      points: [
        'Legal due diligence reviews for corporate transactions',
        'Business Transfer Agreements (BTA) and Asset Purchases',
        'Joint venture charters and shareholder protection covenants'
      ]
    },
    {
      title: 'Foreign Investment & FEMA Compliance',
      icon: Coins,
      description: 'Advisory on Foreign Direct Investment (FDI), Overseas Direct Investment (ODI), and RBI statutory compliance.',
      points: [
        'FDI reporting via RBI FIRMS portal and Single Master Form',
        'Overseas Direct Investment (ODI) advisory for Indian entities',
        'External Commercial Borrowing (ECB) documentation review'
      ]
    }
  ];

  return (
    <section id="corporate" className="py-24 sm:py-28 bg-navy-900/60 relative overflow-hidden border-b border-navy-800/80 scroll-mt-20">
      {/* Background Lighting */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-80 h-80 bg-navy-700/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-950 border border-gold-400/40 text-gold-300 text-xs font-cinzel tracking-[0.22em] uppercase mb-4 shadow-gold-sm">
            <Briefcase className="w-3.5 h-3.5 text-gold-400" />
            Vertical II • Enterprise Strategy & Governance
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white tracking-wide">
            Corporate <span className="text-gold-gradient">Consultancy</span>
          </h2>
          <div className="gold-divider max-w-xs mx-auto my-4" />
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Corporate governance, secretarial compliance, and regulatory facilitation for enterprises, founders, and institutional entities.
          </p>
        </div>

        {/* Corporate Grid with Optimized Spacing and Card Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {corporateVerticals.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="rounded-2xl p-6 bg-navy-900/75 border border-slate-800 hover:border-gold-400/50 hover:bg-navy-850/80 transition-all duration-300 shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-gold-400/80 bg-navy-950 px-2 py-0.5 rounded border border-slate-800">
                      SEC-0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-cinzel font-bold text-white mb-2 group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4 font-light">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 mb-5">
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono text-[10px]">
                    Corporate Advisory
                  </span>
                  <button
                    onClick={onOpenConsultation}
                    className="text-gold-400 hover:text-gold-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Inquire Scope</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CorporateConsultancy;
