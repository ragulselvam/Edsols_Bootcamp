import React, { useState } from 'react';
import { Bot, Wifi, Cpu, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { projectsData, ProjectItem } from '../data/projects';

interface ProjectsSectionProps {
  onRegisterClick: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onRegisterClick }) => {
  const [filter, setFilter] = useState<'All' | 'Robotics' | 'IoT' | 'AI'>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = filter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Robotics':
        return <Bot className="w-3.5 h-3.5" />;
      case 'IoT':
        return <Wifi className="w-3.5 h-3.5" />;
      case 'AI':
        return <Cpu className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Student Inventions & Builds"
          badgeVariant="blue"
          title="WHAT WILL YOU"
          highlightText="BUILD?"
          subtitle="Real engineers learn by making. Every weekend, students tackle real-world challenges, turning raw microcontrollers and sensors into intelligent moving robots and automated smart devices."
        />

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(['All', 'Robotics', 'IoT', 'AI'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                filter === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 border border-blue-500'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              {cat !== 'All' && getCategoryIcon(cat)}
              <span>{cat === 'All' ? 'All Inventions (9)' : `${cat} Projects`}</span>
            </button>
          ))}
        </div>

        {/* Interactive Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative rounded-3xl bg-white border border-slate-200/90 hover:border-blue-300 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-edsols-card hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer overflow-hidden"
            >
              <div>
                {/* Project Image Banner */}
                <div className="relative h-48 -mx-6 -mt-6 mb-5 overflow-hidden bg-slate-100">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md bg-white/95 text-slate-800 border border-slate-200 shadow-sm"
                    >
                      {getCategoryIcon(project.category)}
                      {project.category}
                    </span>

                    <span className="text-[10px] font-mono bg-slate-900/80 text-white px-2.5 py-1 rounded-full backdrop-blur-md">
                      {project.duration}
                    </span>
                  </div>

                  {/* Difficulty Tag */}
                  <span className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-100 bg-slate-900/80 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                    Difficulty: <span className="text-white font-bold">{project.difficulty}</span>
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Hardware Spec */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="text-slate-500 font-medium">Hardware:</span>
                  <span className="text-slate-900 font-bold truncate max-w-[170px]">
                    {project.hardware}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                  View Project Blueprint →
                </span>
                <span className="h-2 w-2 rounded-full bg-blue-500/60 group-hover:bg-blue-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Blueprint Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          badgeText={`${selectedProject.category} Capstone Blueprint · ${selectedProject.duration}`}
          maxWidth="2xl"
        >
          <div className="space-y-5">
            <div className="h-52 rounded-2xl overflow-hidden relative border border-slate-100">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider font-mono">
                Project Overview
              </h4>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {selectedProject.shortDescription}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
                Hardware & Sensor Requirements:
              </span>
              <span className="text-sm font-bold text-slate-900 block">
                {selectedProject.hardware}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3">
                Key Engineering Challenges Solved:
              </h4>
              <div className="space-y-2">
                {selectedProject.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setSelectedProject(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedProject(null);
                  onRegisterClick();
                }}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Build This In Class
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
