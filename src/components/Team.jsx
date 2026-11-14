import React from 'react';
import { 
  Users2, 
  Scale, 
  Briefcase, 
  Building, 
  FileCheck2, 
  ShieldCheck, 
  AlertCircle, 
  UserCheck, 
  Lock,
  Edit3,
  ArrowRight,
  Award,
  Info
} from 'lucide-react';

export const Team = ({ onOpenConsultation }) => {
  // Purely structured editable placeholder profiles (Strictly no fictitious names or fake credentials)
  const teamProfiles = [
    {
      role: 'Principal Legal Counsel',
      division: 'Legal Advisory & Litigation Practice',
      namePlaceholder: '[Advocate Name — Pending Verified Appointment]',
      credentialsPlaceholder: '[LL.M / LL.B • State Bar Council Enrolment No: STATE/XXXX/YEAR]',
      experiencePlaceholder: '[XX+ Years in Civil, Commercial & Appellate Practice]',
      focusAreas: [
        'Commercial Dispute Strategy & Legal Counsel',
        'Appellate Advocacy & Regulatory Litigation',
        'Arbitration & Mediation Proceedings'
      ],
      icon: Scale,
      isAdvocate: true,
      categoryLabel: 'Advocate Practice'
    },
    {
      role: 'Corporate Practice Leader',
      division: 'Corporate Consultancy & Governance',
      namePlaceholder: '[Corporate Consultant Name — Pending Verified Appointment]',
      credentialsPlaceholder: '[FCS / ACS (Company Secretary) • MBA / LL.B]',
      experiencePlaceholder: '[XX+ Years in Corporate Law & Secretarial Governance]',
      focusAreas: [
        'MCA Filings, RoC Compliance & Corporate Restructuring',
        'Board Governance Charters & Director Compliance',
        'FDI, RBI/FEMA Regulatory Strategy'
      ],
      icon: Briefcase,
      isAdvocate: false,
      categoryLabel: 'Corporate Advisory'
    },
    {
      role: 'Real Estate Advisory Counsel',
      division: 'Property & Documentation Advisory',
      namePlaceholder: '[Property Counsel Name — Pending Verified Appointment]',
      credentialsPlaceholder: '[LL.B • Specialist in Land Laws & Revenue Codes]',
      experiencePlaceholder: '[XX+ Years in Title Verification & Real Estate Due Diligence]',
      focusAreas: [
        '30-Year Historical Title Search & Chain Verification',
        'Sale Deeds, Leases & Conveyance Documentation',
        'RERA Compliance & Revenue Authority Liaison'
      ],
      icon: Building,
      isAdvocate: true,
      categoryLabel: 'Property Advisory'
    },
    {
      role: 'Senior Associate – Documentation',
      division: 'Contractual Drafting & Risk Mitigation',
      namePlaceholder: '[Senior Associate Name — Pending Verified Appointment]',
      credentialsPlaceholder: '[B.B.A. LL.B (Hons.) • Specialization in Commercial Contracts]',
      experiencePlaceholder: '[XX+ Years in Commercial Contracts & Transactional Drafting]',
      focusAreas: [
        'Master Service Agreements (MSA) & SLAs',
        'Shareholders\' Agreements & Equity Charters',
        'Contract Redlining & Legal Risk Review'
      ],
      icon: FileCheck2,
      isAdvocate: false,
      categoryLabel: 'Documentation'
    }
  ];

  return (
    <section id="team" className="py-24 sm:py-28 bg-navy-950 relative overflow-hidden border-b border-navy-800/80 scroll-mt-20">
      {/* Background ambient glow */}
      <div className="absolute left-1/4 top-1/3 w-96 h-96 bg-gold-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-400/40 text-gold-300 text-xs font-cinzel tracking-[0.22em] uppercase mb-4 shadow-gold-sm">
            <Users2 className="w-3.5 h-3.5 text-gold-400" />
            Advisory Leadership & Chambers
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white tracking-wide">
            Professional <span className="text-gold-gradient">Team</span>
          </h2>
          <div className="gold-divider max-w-xs mx-auto my-4" />
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Our practice is steered by seasoned legal practitioners, company secretaries, and property documentation analysts dedicated to the highest fiduciary standards.
          </p>

          {/* Strict Compliance Notice - No Fabricated Profiles or Fake Photographs */}
          <div className="mt-5 p-3.5 rounded-xl bg-navy-900/90 border border-slate-700/80 text-xs text-slate-300 flex items-center justify-center gap-2.5 max-w-2xl mx-auto text-left shadow-lg">
            <AlertCircle className="w-4 h-4 text-gold-400 flex-shrink-0" />
            <span className="leading-normal">
              <strong className="text-white">Statutory Notice (BCI Rule 36):</strong> In strict adherence to advocate professional ethics, Sheladiya Consultancy never publishes fictitious profiles or stock photographs pretending to be real advocates. All profiles below are clearly designated editable placeholders awaiting verified advocate appointments.
            </span>
          </div>
        </div>

        {/* Team Cards Grid with Dignified Silhouette / Insignia Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-14">
          {teamProfiles.map((member, index) => {
            const Icon = member.icon;
            return (
              <div 
                key={index}
                className="rounded-2xl p-6 sm:p-7 bg-navy-900/80 border border-gold-400/30 hover:border-gold-400/60 transition-all duration-300 shadow-xl flex flex-col justify-between relative group hover:shadow-gold-sm"
              >
                {/* Clearly Identified Placeholder Profile Badge */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-navy-950 border border-gold-400/40 text-gold-300">
                    <Edit3 className="w-3 h-3 text-gold-400" />
                    Verified Placeholder Slot
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {member.categoryLabel}
                  </span>
                </div>

                <div>
                  {/* Dignified Judicial Insignia Silhouette Frame (No Fake Stock Portrait) */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-gold-400/40 bg-gradient-to-br from-navy-950 to-navy-900 flex flex-col items-center justify-center flex-shrink-0 shadow-inner group-hover:border-gold-400 transition-colors p-1">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-gold-400/80 mb-0.5" />
                      <span className="text-[7.5px] font-mono text-gold-300 uppercase tracking-widest block font-semibold text-center">
                        [VERIFIED PHOTO]
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-400 block mb-0.5">
                        {member.division}
                      </span>
                      <h3 className="text-base sm:text-lg font-cinzel font-bold text-white group-hover:text-gold-300 transition-colors">
                        {member.role}
                      </h3>
                      <div className="mt-1">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-navy-950 border border-slate-700/80 text-slate-300">
                          {member.isAdvocate ? 'State Bar Council Regulated' : 'Corporate Compliance Practitioner'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Placeholder Details */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-navy-950/90 border border-slate-800 space-y-2.5 mb-5">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-semibold">
                        Practitioner Name
                      </span>
                      <p className="font-mono text-xs sm:text-sm text-gold-300 font-medium">
                        {member.namePlaceholder}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-semibold">
                        Qualifications & Bar Enrolment
                      </span>
                      <p className="font-mono text-xs text-slate-300 font-light">
                        {member.credentialsPlaceholder}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-semibold">
                        Standing & Practice Experience
                      </span>
                      <p className="font-mono text-xs text-slate-300 font-light">
                        {member.experiencePlaceholder}
                      </p>
                    </div>
                  </div>

                  {/* Practice Focus Points */}
                  <div>
                    <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                      Core Practice Focus:
                    </span>
                    <div className="space-y-1.5">
                      {member.focusAreas.map((area, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <UserCheck className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                          <span className="font-light">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 font-light">
                    <Info className="w-3 h-3 text-gold-400" />
                    Subject to Advocate Approval
                  </span>
                  <button
                    onClick={onOpenConsultation}
                    className="text-gold-400 hover:text-gold-300 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer group"
                  >
                    <span>Inquire Practice</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Advisory Ethics Charter */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border border-gold-400/30 text-center shadow-xl">
          <h3 className="text-lg sm:text-xl font-cinzel font-bold text-white mb-2">
            The Sheladiya Advisory Standard
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Every practitioner associated with our chambers is bound by professional ethical conduct rules and a commitment to Truth, Honesty, and Discipline. We accept mandates solely where we can deliver thorough, unbiased, and legally defensible counsel.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Team;
