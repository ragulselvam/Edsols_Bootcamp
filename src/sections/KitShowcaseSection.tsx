import React, { useState } from 'react';
import { Layers, CheckCircle2, ChevronRight, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { hardwareKits, HardwareKit } from '../data/kits';

interface KitShowcaseSectionProps {
  selectedKitId?: string | null;
  onRegisterClick: () => void;
}

export const KitShowcaseSection: React.FC<KitShowcaseSectionProps> = ({
  onRegisterClick,
}) => {
  const [activeKitModal, setActiveKitModal] = useState<HardwareKit | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'robotics' | 'iot' | 'ai'>('all');
  const [showAll, setShowAll] = useState(false);

  const filteredKits = activeTab === 'all'
    ? hardwareKits
    : hardwareKits.filter((k) => k.track.toLowerCase() === activeTab);

  const displayedKits = showAll ? filteredKits : filteredKits.slice(0, 3);

  return (
    <section id="kits" className="relative py-24 sm:py-32 bg-white/80 border-t border-slate-200/80 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-radial from-rose-100/35 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Tangible Engineering Hardware"
          badgeVariant="blue"
          title="THE HARDWARE THEY"
          highlightText="ACTUALLY BUILD WITH"
          subtitle="No simulations. No passive learning. Students work hands-on with industrial-grade microcontrollers, 6-DOF robotic limbs, sensors, and IoT automation kits."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Hardware Kits' },
            { id: 'robotics', label: 'Robotics Kits' },
            { id: 'iot', label: 'Smart Home & Sensors' },
            { id: 'ai', label: 'AI Vision & Robotics' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-500/25 border border-rose-500'
                  : 'bg-white text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedKits.map((kit) => (
            <div
              key={kit.id}
              className="group relative rounded-3xl bg-white border border-slate-200/90 hover:border-rose-300 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-edsols-card hover:shadow-xl hover:shadow-rose-500/10"
            >
              <div className="flex flex-col">
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-rose-700 uppercase bg-rose-50 px-3.5 py-1 rounded-full border border-rose-200 shadow-sm">
                    {kit.badge}
                  </span>
                </div>

                {/* Product Title & Tagline with fixed height alignment */}
                <div className="min-h-[76px] flex flex-col justify-start">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-rose-600 transition-colors">
                    {kit.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-1 font-semibold leading-relaxed line-clamp-2">
                    {kit.tagline}
                  </p>
                </div>

                {/* Product Image Frame */}
                <div className="relative my-5 h-52 rounded-2xl bg-slate-50/80 border border-slate-200/80 p-4 flex items-center justify-center overflow-hidden group-hover:border-rose-300 group-hover:bg-rose-50/20 transition-all duration-300">
                  <img
                    src={kit.image}
                    alt={kit.fullName}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = kit.fallbackImage;
                    }}
                    className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Hardware Feature Highlights with consistent min-height */}
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-2.5">
                    Core Engineering Modules:
                  </span>
                  <div className="space-y-2.5 min-h-[148px] flex flex-col justify-start">
                    {kit.highlightFeatures.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium leading-relaxed">
                        <Zap className="w-3.5 h-3.5 text-rose-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveKitModal(kit)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 font-mono tracking-wider transition-colors cursor-pointer"
                >
                  <span>FULL SPECIFICATIONS</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRegisterClick}
                  className="text-xs"
                >
                  Join Bootcamp
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Fewer Toggle */}
        {filteredKits.length > 3 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50/40 shadow-sm font-semibold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
            >
              <span>{showAll ? 'Show Fewer Kits' : `Show All ${filteredKits.length} Hardware Platforms (${filteredKits.length - 3} More)`}</span>
              {showAll ? (
                <ChevronUp className="w-4 h-4 text-rose-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-rose-600" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Hardware Deep Dive Modal */}
      {activeKitModal && (
        <Modal
          isOpen={!!activeKitModal}
          onClose={() => setActiveKitModal(null)}
          title={activeKitModal.fullName}
          badgeText={`${activeKitModal.track} Platform · Hands-On Hardware`}
          maxWidth="4xl"
        >
          <div className="space-y-6">
            {/* Top Grid: Image + Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="h-64 rounded-2xl bg-slate-50 border border-slate-200 p-4 flex items-center justify-center">
                <img
                  src={activeKitModal.image}
                  alt={activeKitModal.fullName}
                  className="max-h-full max-w-full object-contain drop-shadow-md"
                />
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="text-xl font-bold text-slate-900">
                  {activeKitModal.tagline}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeKitModal.overview}
                </p>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  {activeKitModal.specs.map((spec, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">{spec.label}</span>
                      <span className="text-xs font-bold text-slate-900 truncate block">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Components Breakdown Table */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-rose-700 font-bold mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> Integrated Hardware Components:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeKitModal.components.map((comp, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{comp.name}</span>
                      <span className="text-[10px] font-mono text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {comp.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{comp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What Students Learn */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Applied Engineering Competencies:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeKitModal.whatStudentsLearn.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-700 font-medium flex items-start gap-1.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer buttons */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setActiveKitModal(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setActiveKitModal(null);
                  onRegisterClick();
                }}
              >
                Register For This Program
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
