import React from 'react';
import { 
  Building, 
  SearchCheck, 
  FileCheck, 
  ShieldAlert, 
  Compass, 
  CheckCircle2, 
  ArrowRight,
  Landmark,
  BadgeAlert
} from 'lucide-react';

export const PropertyConsultancy = ({ onOpenConsultation }) => {
  const propertyServices = [
    {
      title: '30-Year Title Search & Due Diligence',
      icon: SearchCheck,
      desc: 'Historical chain verification across Sub-Registrar archives to evaluate marketable and unencumbered property title.',
      features: [
        '30-year search at Sub-Registrar offices for prior deeds and encumbrances',
        'Inspection of Revenue Records (7/12, 8-A, Khata extract, Mutation register)',
        'Issuance of formal Legal Title Search Report'
      ]
    },
    {
      title: 'Conveyance & Transfer Deeds Drafting',
      icon: FileCheck,
      desc: 'Legal drafting of deeds for property sale, gift, partition, or release, strictly aligned with State Stamp Act and Registration provisions.',
      features: [
        'Sale Deeds, Agreement for Sale (ATS), and Deeds of Conveyance',
        'Family settlement, partition, and relinquishment instruments',
        'Power of Attorney (PoA) review and specialized conveyance deeds'
      ]
    },
    {
      title: 'Commercial Leasing & Tenancy Architecture',
      icon: Building,
      desc: 'Drafting commercial leases for corporate offices, retail spaces, warehousing hubs, and industrial premises.',
      features: [
        'Long-term lease deeds and registered leave-and-license agreements',
        'Lock-in covenants, escalation clauses, and fit-out terms',
        'Security deposit provisions and termination remedy schedules'
      ]
    },
    {
      title: 'Land Conversion & Development Approvals',
      icon: Landmark,
      desc: 'Legal advisory on non-agricultural (NA) land permissions, urban planning zoning compliance, and layout authorizations.',
      features: [
        'Agricultural to Non-Agricultural (NA) land use regulatory scrutiny',
        'Town Planning (TP) scheme and master plan zoning verification',
        'Local municipal development authority layout clearance review'
      ]
    },
    {
      title: 'RERA Compliance & Buyer Advisory',
      icon: ShieldAlert,
      desc: 'Advisory on Real Estate Regulatory Authority (RERA) statutory mandates for developers, commercial investors, and buyers.',
      features: [
        'RERA registered project legal audit and title verification',
        'Review of builder-buyer agreements against statutory model drafts',
        'Delayed possession remedies and statutory compensation representation'
      ]
    },
    {
      title: 'Real Estate Dispute Pre-Litigation Review',
      icon: Compass,
      desc: 'Objective diagnostic evaluation of property boundary disagreements, title defects, and inheritance claims.',
      features: [
        'Legal review of co-ownership and ancestral partition disputes',
        'Advisory on revenue appeals before Sub-Divisional Magistrates / Collectors',
        'Structuring pre-litigation settlement deeds and demarcation pacts'
      ]
    }
  ];

  return (
    <section id="property" className="py-24 sm:py-28 bg-navy-900/60 relative overflow-hidden border-b border-navy-800/80 scroll-mt-20">
      {/* Background Lighting */}
      <div className="absolute left-10 top-1/3 w-96 h-96 bg-gold-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-950 border border-gold-400/40 text-gold-300 text-xs font-cinzel tracking-[0.22em] uppercase mb-4 shadow-gold-sm">
            <Building className="w-3.5 h-3.5 text-gold-400" />
            Vertical IV • Real Estate Due Diligence & Conveyance
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white tracking-wide">
            Property <span className="text-gold-gradient">Consultancy</span>
          </h2>
          <div className="gold-divider max-w-xs mx-auto my-4" />
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Statutory title scrutiny, conveyance documentation, and real estate regulatory diligence.
          </p>
        </div>

        {/* Services Grid with Concise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {propertyServices.map((svc, index) => {
            const Icon = svc.icon;
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
                      PROP-0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-cinzel font-bold text-white mb-2 group-hover:text-gold-300 transition-colors">
                    {svc.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4 font-light">
                    {svc.desc}
                  </p>

                  <div className="space-y-1.5 mb-5">
                    {svc.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono text-[10px]">
                    Title Diligence
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

export default PropertyConsultancy;
