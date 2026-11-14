import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import LegalServices from './components/LegalServices';
import CorporateConsultancy from './components/CorporateConsultancy';
import BusinessDocumentation from './components/BusinessDocumentation';
import PropertyConsultancy from './components/PropertyConsultancy';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LegalDisclaimerModal from './components/LegalDisclaimerModal';
import ConsultationModal from './components/ConsultationModal';

export function App() {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-gold-500 selection:text-navy-950">
      {/* Premium Navigation */}
      <Navbar 
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero 
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* 2. About Sheladiya Consultancy */}
        <About />

        {/* 3. Legal Services (Regulated Advocate Practice) */}
        <LegalServices 
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* 4. Corporate Consultancy (Enterprise Strategy & Governance) */}
        <CorporateConsultancy 
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* 5. Business Documentation (Contracts & Drafting) */}
        <BusinessDocumentation 
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* 6. Property Consultancy (Real Estate Title Due Diligence) */}
        <PropertyConsultancy 
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* 7. Professional Team (Structured with Verified Editable Slots) */}
        <Team 
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* 8. Contact Information & Interactive Consultation Booking */}
        <Contact 
          onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        />
      </main>

      {/* 9. Premium Footer with Comprehensive Regulatory Disclaimer */}
      <Footer 
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
      />

      {/* Modals */}
      <LegalDisclaimerModal 
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />

      <ConsultationModal 
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}

export default App;
