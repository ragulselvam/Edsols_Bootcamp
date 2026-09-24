import React, { useState } from 'react';
import { ArrowRight, Bot, Wifi, Cpu, CheckCircle2, Sparkles, BookOpen, Layers } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { learningTracks, LearningTrack } from '../data/tracks';

interface TracksSectionProps {
  onHardwareKitSelect: (kitId: string) => void;
  onRegisterClick: () => void;
}

export const TracksSection: React.FC<TracksSectionProps> = ({
  onHardwareKitSelect,
  onRegisterClick,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<LearningTrack | null>(null);

  const getTrackIcon = (id: string) => {
    switch (id) {
      case 'robotics':
        return <Bot className="w-6 h-6 text-blue-600" />;
      case 'iot':
        return <Wifi className="w-6 h-6 text-sky-600" />;
      case 'ai':
        return <Cpu className="w-6 h-6 text-indigo-600" />;
      default:
        return <Bot className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="tracks" className="relative py-24 sm:py-32 bg-white overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Curriculum Tracks"
          badgeVariant="blue"
          title="THREE TECHNOLOGIES."
          highlightText="ONE BOOTCAMP."
          subtitle="Every student masters all three interlinked domains across four weeks of practical, hardware-centric experimentation."
        />

        {/* 3 Large Interactive Track Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {learningTracks.map((track) => (
            <div
              key={track.id}
              className="group relative rounded-3xl bg-white border border-slate-200/90 hover:border-blue-300 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-edsols-card hover:shadow-xl hover:shadow-blue-500/10"
            >
              {/* Top Track Header */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-700 uppercase bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    {track.number}
                  </span>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 group-hover:scale-110 transition-transform">
                    {getTrackIcon(track.id)}
                  </div>
                </div>

                <h3 className="text-3xl font-black text-slate-900 tracking-tight font-display">
                  {track.title}
                </h3>

                <p className="text-sm font-bold text-blue-600 mt-1">
                  {track.subtitle}
                </p>

                {/* Hardware Kit Association */}
                <div
                  onClick={() => onHardwareKitSelect(track.hardwareKitId)}
                  className="mt-5 p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-white flex items-center gap-3 transition-colors cursor-pointer shadow-sm"
                >
                  <img
                    src={track.hardwareImageUrl}
                    alt={track.hardwareName}
                    className="w-12 h-12 object-contain rounded-xl bg-white p-1 border border-slate-100"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Core Hardware Kit</span>
                    <span className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                      {track.hardwareName}
                    </span>
                  </div>
                </div>

                {/* Topics Matrix List */}
                <div className="mt-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    Key Learning Topics:
                  </h4>
                  <ul className="space-y-2">
                    {track.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedTrack(track)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors focus:outline-none cursor-pointer"
                >
                  <span>{track.ctaText}</span>
                </button>

                <span className="text-[10px] font-mono text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  HANDS-ON
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Track Syllabus & Deep Dive Modal */}
      {selectedTrack && (
        <Modal
          isOpen={!!selectedTrack}
          onClose={() => setSelectedTrack(null)}
          title={`${selectedTrack.title} Track Syllabus`}
          badgeText={selectedTrack.number}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            <div>
              <span className="text-sm font-bold text-blue-600 block mb-1">
                {selectedTrack.subtitle}
              </span>
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedTrack.detailedDescription}
              </p>
            </div>

            {/* Core Outcomes */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> What Students Master:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedTrack.coreOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Track Project */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Featured Track Milestone</span>
              <h5 className="text-sm font-bold text-slate-900 mt-1">
                {selectedTrack.sampleProject}
              </h5>
            </div>

            {/* Hardware Used */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-600" />
                <span className="text-slate-600">Hardware Platform:</span>
                <span className="font-bold text-slate-900">{selectedTrack.hardwareName}</span>
              </div>
              <button
                onClick={() => {
                  const kitId = selectedTrack.hardwareKitId;
                  setSelectedTrack(null);
                  onHardwareKitSelect(kitId);
                }}
                className="text-blue-600 hover:text-blue-700 underline font-mono text-xs cursor-pointer font-bold"
              >
                View Specs
              </button>
            </div>

            {/* Action buttons inside modal */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setSelectedTrack(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedTrack(null);
                  onRegisterClick();
                }}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Register For This Cohort
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
