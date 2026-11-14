import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { 
  Scale, 
  ShieldCheck, 
  Award, 
  FileCheck2, 
  ArrowRight, 
  Compass, 
  CheckCircle2,
  Lock,
  ChevronDown,
  Info
} from 'lucide-react';
import { OfficialLogo } from './OfficialLogo';

export const Hero = ({ onOpenConsultation }) => {
  const bgRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    // Subtle GSAP ambient motion for background and luxury glow
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        scale: 1.15,
        opacity: 0.2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    if (bgRef.current) {
      gsap.to(bgRef.current, {
        scale: 1.04,
        duration: 22,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[96vh] pt-32 pb-24 md:pt-40 md:pb-32 flex items-center justify-center overflow-hidden bg-navy-950"
    >
      {/* Large Premium Cinematic Legal Background (Law Library & Classical Courtroom Architecture) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 transform scale-100 opacity-25 filter brightness-85 contrast-125"
          style={{
            // High-resolution licensed classical law library & courtroom chamber photography
            backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2400&q=85')`
          }}
        />

        {/* Multi-layered Deep Navy Linear & Radial Vignettes for Pristine Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/90 to-navy-950/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#040914_80%)]" />

        {/* Subtle Luxury Geometric Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#16335F18_1px,transparent_1px),linear-gradient(to_bottom,#16335F18_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)]" />

        {/* Ambient Gold Radial Glow Effect */}
        <div 
          ref={glowRef}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gold-400/10 rounded-full blur-[140px]" 
        />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-navy-700/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          
          {/* Official Emblem & Category Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy-900/90 border border-gold-400/50 shadow-gold-sm mb-6 backdrop-blur-md"
          >
            <OfficialLogo size="xs" showText={false} />
            <div className="h-3.5 w-[1px] bg-gold-400/40" />
            <span className="font-cinzel text-xs font-semibold tracking-[0.22em] text-gold-300 uppercase">
              SHELADIYA CONSULTANCY • ADVISORY CHAMBERS
            </span>
          </motion.div>

          {/* Main Professional Law Firm Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-cinzel font-bold tracking-[0.05em] text-white leading-[1.18] sm:leading-[1.15] max-w-5xl"
          >
            LEGAL GUIDANCE BUILT ON <span className="text-gold-gradient">TRUST AND INTEGRITY.</span>
          </motion.h1>

          {/* Official Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="my-6 flex items-center justify-center gap-3 sm:gap-6 flex-wrap"
          >
            <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-gold-400/60 to-gold-400" />
            <p className="font-cinzel text-sm sm:text-lg md:text-xl font-bold tracking-[0.28em] sm:tracking-[0.34em] text-gold-300 uppercase drop-shadow-sm">
              TRUTH • HONESTY • DISCIPLINE
            </p>
            <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent via-gold-400/60 to-gold-400" />
          </motion.div>

          {/* Core Firm Narrative - Neutral, Professional & BCI-Compliant */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-base sm:text-lg text-slate-300 font-sans max-w-3xl leading-relaxed font-light mb-10"
          >
            A multidisciplinary legal and corporate consultancy providing structured advisory across civil disputes, commercial arbitration, corporate compliance, business documentation, and real estate due diligence.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16"
          >
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 shadow-gold-sm border border-gold-400/90 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-navy-950 hover:shadow-gold-md hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={scrollToAbout}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 bg-navy-900/90 hover:bg-navy-850 text-slate-200 hover:text-gold-300 border border-slate-700/80 hover:border-gold-400/50 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Compass className="w-4 h-4 text-gold-400" />
              <span>Explore Practice Areas</span>
            </button>
          </motion.div>

          {/* 3 Foundational Pillars Cards: Truth • Honesty • Discipline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left"
          >
            {/* Truth */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-navy-900/95 via-navy-900/90 to-navy-950 border border-gold-400/30 hover:border-gold-400/70 transition-all duration-300 shadow-xl group hover:shadow-gold-sm">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/40 flex items-center justify-center text-gold-400 group-hover:scale-105 group-hover:bg-gold-400/20 transition-all">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-base text-white group-hover:text-gold-300 transition-colors">TRUTH</h3>
                  <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">Statutory Standing</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Objective evaluation of dispute merits and statutory positions. Every advisory opinion is founded strictly on authentic legal jurisprudence.
              </p>
            </div>

            {/* Honesty */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-navy-900/95 via-navy-900/90 to-navy-950 border border-gold-400/30 hover:border-gold-400/70 transition-all duration-300 shadow-xl group hover:shadow-gold-sm">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/40 flex items-center justify-center text-gold-400 group-hover:scale-105 group-hover:bg-gold-400/20 transition-all">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-base text-white group-hover:text-gold-300 transition-colors">HONESTY</h3>
                  <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">Fiduciary Transparency</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Candid viability assessments, transparent terms of engagement, and ethical stewardship prioritizing genuine client interests.
              </p>
            </div>

            {/* Discipline */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-navy-900/95 via-navy-900/90 to-navy-950 border border-gold-400/30 hover:border-gold-400/70 transition-all duration-300 shadow-xl group hover:shadow-gold-sm">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/40 flex items-center justify-center text-gold-400 group-hover:scale-105 group-hover:bg-gold-400/20 transition-all">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-base text-white group-hover:text-gold-300 transition-colors">DISCIPLINE</h3>
                  <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">Procedural Rigour</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Methodical drafting, strict adherence to statutory limitation timelines, and thorough documentation due diligence.
              </p>
            </div>
          </motion.div>

          {/* Ethics & Compliance Strip (Bar Council Rule 36 Aligned) */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-gold-400" />
              Bar Council of India Rule 36 Observed
            </span>
            <span className="hidden sm:inline text-navy-700">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
              Distinct Advocate & Corporate Divisions
            </span>
            <span className="hidden sm:inline text-navy-700">•</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-gold-400" />
              Zero Prohibited Client Solicitation
            </span>
          </div>

          {/* Scroll Down Indicator */}
          <button
            onClick={scrollToAbout}
            aria-label="Scroll to About section"
            className="mt-8 text-slate-500 hover:text-gold-400 transition-colors flex flex-col items-center gap-1 cursor-pointer"
          >
            <span className="text-[10px] uppercase tracking-widest font-mono text-slate-400">Chambers Profile</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-gold-400" />
          </button>

        </div>
      </div>
    </section>
  );
};

export default Hero;
