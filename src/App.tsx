import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { HeroSection } from './sections/HeroSection';
import { OverviewSection } from './sections/OverviewSection';
import { KitShowcaseSection } from './sections/KitShowcaseSection';
import { JourneySection } from './sections/JourneySection';
import { SkillsSection } from './sections/SkillsSection';
import { ScheduleSection } from './sections/ScheduleSection';
import { RegistrationSection } from './sections/RegistrationSection';

export const App: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<'October 2026' | 'November 2026'>('October 2026');
  const [selectedBatch, setSelectedBatch] = useState<'Morning' | 'Afternoon'>('Morning');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegisterClick = () => {
    scrollToSection('register');
  };

  const handleExploreClick = () => {
    scrollToSection('overview');
  };

  const handleSelectMonthAndRegister = (
    month: 'October 2026' | 'November 2026',
    batch?: 'Morning' | 'Afternoon'
  ) => {
    setSelectedMonth(month);
    if (batch) setSelectedBatch(batch);
    scrollToSection('register');
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-rose-500 selection:text-white font-sans overflow-x-hidden">
      {/* Background EDSOLS Emblem Watermark: starts below Register Now button, cut 20% from right, rotated 20deg to right, zoomed out another 10% */}
      <div
        className="fixed top-20 sm:top-[84px] right-0 pointer-events-none select-none z-10 overflow-hidden"
        aria-hidden="true"
      >
        <img
          src="/edsols-emblem.png"
          alt=""
          className="w-[208px] h-[208px] sm:w-[260px] sm:h-[260px] md:w-[356px] md:h-[356px] lg:w-[438px] lg:h-[438px] xl:w-[500px] xl:h-[500px] object-contain translate-x-[20%] rotate-[20deg] opacity-20 sm:opacity-25 filter drop-shadow-sm transition-transform duration-500"
          loading="eager"
        />
      </div>

      {/* Sticky Top Navigation */}
      <Navbar onRegisterClick={handleRegisterClick} />

      {/* Main Content Sections */}
      <main>
        {/* Section 1: Hero */}
        <HeroSection
          onRegisterClick={handleRegisterClick}
          onExploreClick={handleExploreClick}
        />

        {/* Section 2: Bootcamp Overview */}
        <OverviewSection />

        {/* Section 3: Real Kit Showcase */}
        <KitShowcaseSection
          onRegisterClick={handleRegisterClick}
        />

        {/* Section 6: 4-Week Learning Journey */}
        <JourneySection onRegisterClick={handleRegisterClick} />

        {/* Section 7: Skills & Outcomes */}
        <SkillsSection />

        {/* Section 8: Batch & Schedule */}
        <ScheduleSection
          onSelectMonthAndRegister={handleSelectMonthAndRegister}
        />

        {/* Section 9: Registration CTA & Form */}
        <RegistrationSection
          preselectedMonth={selectedMonth}
          preselectedBatch={selectedBatch}
        />
      </main>

      {/* Section 10: Footer */}
      <Footer />
    </div>
  );
};

export default App;
