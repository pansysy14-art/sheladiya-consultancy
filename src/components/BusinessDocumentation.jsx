import React, { useState } from 'react';
import { 
  FileCheck2, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  PenTool, 
  Search, 
  Scale, 
  Lock,
  ArrowRight
} from 'lucide-react';

export const BusinessDocumentation = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState('commercial');

  const docCategories = {
    commercial: {
      label: 'Commercial & Operational',
      description: 'Foundational commercial agreements tailored for operational clarity, performance metrics, and dispute resolution mechanisms.',
      items: [
        {
          name: 'Master Service Agreements (MSA) & SLAs',
          desc: 'Service contracts governing deliverables, milestone benchmarks, payment security, and limitation of liability.'
        },
        {
          name: 'Non-Disclosure & Confidentiality Covenants (NDA)',
          desc: 'Unilateral and mutual NDA architectures defining confidential information, non-circumvention, and injunctive remedies.'
        },
        {
          name: 'Vendor, Supply & Distribution Contracts',
          desc: 'Supply chain terms, delivery schedules, quality specifications, warranties, and default remedy terms.'
        },
        {
          name: 'Franchise & Agency Agreements',
          desc: 'Standardized franchisee guidelines, territory protection, royalty audit mechanisms, and termination rights.'
        }
      ]
    },
    equity: {
      label: 'Founders & Equity Structuring',
      description: 'Documentary frameworks governing shareholder rights, equity vesting schedules, and corporate control.',
      items: [
        {
          name: 'Shareholders\' Agreements (SHA) & SPAs',
          desc: 'Pre-emption rights, ROFR, tag-along/drag-along covenants, and reserved matter voting thresholds.'
        },
        {
          name: 'Founders\' Pacts & Reverse Vesting Charters',
          desc: 'Equity distribution timelines, milestone vesting, intellectual property assignment, and exit terms.'
        },
        {
          name: 'Partnership Deeds & LLP Agreements',
          desc: 'Capital contribution ratios, profit distributions, admission/retirement protocols, and dissolution clauses.'
        },
        {
          name: 'Term Sheets & Investment MOUs',
          desc: 'Preliminary transaction documents establishing exclusivity, confidentiality, and indicative governance principles.'
        }
      ]
    },
    employment: {
      label: 'Employment & Human Resources',
      description: 'Employment documentation aligned with applicable labour enactments and intellectual property assignment covenants.',
      items: [
        {
          name: 'Executive Employment & Service Agreements',
          desc: 'Comprehensive executive agreements covering roles, remuneration parameters, garden leave, and severance terms.'
        },
        {
          name: 'Non-Compete, Non-Solicit & IP Assignment Deeds',
          desc: 'Protective covenants safeguarding proprietary trade secrets, customer goodwill, and institutional IP.'
        },
        {
          name: 'HR Policy Manuals & Code of Conduct Charters',
          desc: 'Workplace regulations, disciplinary inquiry procedures, IT acceptable use policies, and POSH guidelines.'
        },
        {
          name: 'Consultancy & Independent Contractor Pacts',
          desc: 'Independent contractor terms establishing non-employee status, intellectual work ownership, and tax indemnities.'
        }
      ]
    },
    ip: {
      label: 'Intellectual Property & Licensing',
      description: 'Legal instruments securing proprietary software, technology transfer, and commercial trademark exploitation.',
      items: [
        {
          name: 'Software License & SaaS Subscription Pacts',
          desc: 'End-user licensing, subscription terms, data privacy covenants, uptime warranties, and service tier specifications.'
        },
        {
          name: 'Technology Transfer & Know-How Agreements',
          desc: 'Technical collaboration terms, technical documentation transfer, royalty calculations, and confidentiality covenants.'
        },
        {
          name: 'Trademark & Brand Licensing Agreements',
          desc: 'Permitted brand usage guidelines, quality inspection mechanisms, territory limitations, and sub-licensing controls.'
        },
        {
          name: 'Copyright Assignment & Work-For-Hire Deeds',
          desc: 'Formal assignment instruments conveying economic and moral rights in artistic, literary, and digital creations.'
        }
      ]
    }
  };

  const currentCategory = docCategories[activeTab];

  return (
    <section id="documentation" className="py-24 sm:py-28 bg-navy-950 relative overflow-hidden border-b border-navy-800/80 scroll-mt-20">
      {/* Background Lighting */}
      <div className="absolute left-1/3 top-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-400/40 text-gold-300 text-xs font-cinzel tracking-[0.22em] uppercase mb-4 shadow-gold-sm">
            <FileText className="w-3.5 h-3.5 text-gold-400" />
            Vertical III • Contractual Architecture & Risk Mitigation
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white tracking-wide">
            Business <span className="text-gold-gradient">Documentation</span>
          </h2>
          <div className="gold-divider max-w-xs mx-auto my-4" />
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Precise legal drafting and review of commercial contracts, corporate charters, and transactional instruments.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {Object.entries(docCategories).map(([key, cat]) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-cinzel tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gold-400 text-navy-950 font-bold shadow-gold-sm scale-[1.02]'
                    : 'bg-navy-900/80 text-slate-300 hover:text-white hover:bg-navy-850 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Active Tab Description Banner */}
        <div className="max-w-3xl mx-auto text-center mb-10 p-4 rounded-xl bg-navy-900/60 border border-slate-800 text-xs text-slate-300 font-light">
          {currentCategory.description}
        </div>

        {/* Items Grid with Concise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {currentCategory.items.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-navy-900/75 border border-slate-800 hover:border-gold-400/50 hover:bg-navy-850/80 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 flex-shrink-0">
                    <PenTool className="w-4 h-4" />
                  </div>
                  <h3 className="font-cinzel font-bold text-sm sm:text-base text-white group-hover:text-gold-300 transition-colors">
                    {item.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono text-[10px]">
                  Structured Instrument
                </span>
                <button
                  onClick={onOpenConsultation}
                  className="text-gold-400 hover:text-gold-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Inquire Drafting</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BusinessDocumentation;
