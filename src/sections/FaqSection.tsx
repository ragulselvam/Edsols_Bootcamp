import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { bootcampData } from '../data/bootcamp';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-slate-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Parent & Student FAQs"
          badgeVariant="blue"
          title="FREQUENTLY ASKED"
          highlightText="QUESTIONS"
          subtitle="Everything you need to know about the EDSOLS Technology Bootcamp, prerequisites, hardware kits, and batch logistics."
        />

        <div className="space-y-4">
          {bootcampData.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-edsols-card transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                      <HelpCircle className="w-4 h-4" />
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.question}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fade-in font-normal">
                    <p>{faq.answer}</p>
                    <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <span>CATEGORY: {faq.category.toUpperCase()}</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-bold">VERIFIED ANSWER</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Contact Support Strip */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Have specific academic or scheduling questions?</h4>
              <p className="text-xs text-slate-600">Speak directly with our technical admissions advisors.</p>
            </div>
          </div>

          <a
            href={`tel:${bootcampData.contact.phone.replace(/\s+/g, '')}`}
            className="text-xs font-mono font-bold text-blue-700 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200 hover:border-blue-300 transition-all whitespace-nowrap shadow-sm"
          >
            Call {bootcampData.contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
};
