import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles, Shield, User, Phone, Mail, MapPin, GraduationCap } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { BrandLogo } from '../components/common/BrandLogo';

interface RegistrationSectionProps {
  preselectedMonth?: 'October 2026' | 'November 2026';
  preselectedBatch?: 'Morning' | 'Afternoon';
}

export interface RegistrationFormData {
  studentName: string;
  parentName: string;
  studentGrade: string;
  phone: string;
  email: string;
  month: 'October 2026' | 'November 2026';
  batch: 'Morning' | 'Afternoon';
  city: string;
  message: string;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  preselectedMonth = 'October 2026',
  preselectedBatch = 'Morning',
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    studentName: '',
    parentName: '',
    studentGrade: 'Grade 8',
    phone: '',
    email: '',
    month: preselectedMonth,
    batch: preselectedBatch,
    city: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Synchronize when preselected props change
  React.useEffect(() => {
    if (preselectedMonth) {
      setFormData((prev) => ({ ...prev, month: preselectedMonth }));
    }
    if (preselectedBatch) {
      setFormData((prev) => ({ ...prev, batch: preselectedBatch }));
    }
  }, [preselectedMonth, preselectedBatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic validation
    if (!formData.studentName.trim()) {
      setErrorMessage('Please enter the student’s name.');
      return;
    }
    if (!formData.parentName.trim()) {
      setErrorMessage('Please enter the parent/guardian’s name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMessage('Please enter a valid phone number for WhatsApp confirmation.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.city.trim()) {
      setErrorMessage('Please specify your city.');
      return;
    }

    setIsSubmitting(true);

    try {
      /**
       * Extensible Handler: Easily connect to backend API, Google Forms,
       * Webhook, CRM or Supabase here!
       */
      await new Promise((resolve) => setTimeout(resolve, 900));

      // Successful submission
      setShowSuccessModal(true);
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      studentName: '',
      parentName: '',
      studentGrade: 'Grade 8',
      phone: '',
      email: '',
      month: 'October 2026',
      batch: 'Morning',
      city: '',
      message: '',
    });
    setShowSuccessModal(false);
  };

  return (
    <section id="register" className="relative py-16 sm:py-24 md:py-32 bg-white overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-radial from-rose-100/35 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Column: Urgency, Specs & Value Proposition (5 cols) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono font-bold tracking-widest text-rose-700 bg-rose-50 px-3 sm:px-3.5 py-1 rounded-full border border-rose-200">
              <Sparkles className="w-3.5 h-3.5" />
              ADMISSIONS OPEN 2026
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight font-display">
              READY TO BUILD{' '}
              <span className="gradient-text-edsols block mt-1">
                THE FUTURE?
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal">
              Registrations are now open for both the <strong className="text-slate-900">October and November 2026</strong> cohorts. Give your child a head start in Robotics, IoT, and AI with hands-on hardware engineering at EDSOLS.
            </p>

            {/* Quick Cohort Summary Box */}
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 sm:space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-200">
                <span className="text-[11px] sm:text-xs font-mono uppercase text-slate-500 font-bold">Target Cohort</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">Grades 6–12 Students</span>
              </div>

              <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-200">
                <span className="text-[11px] sm:text-xs font-mono uppercase text-slate-500 font-bold">Format</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">1 Month · Weekend Sessions</span>
              </div>

              <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-200">
                <span className="text-[11px] sm:text-xs font-mono uppercase text-slate-500 font-bold">Available Batches</span>
                <span className="text-xs sm:text-sm font-bold text-rose-600">Morning & Afternoon</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-mono uppercase text-slate-500 font-bold">Cohort Cap</span>
                <span className="text-[11px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">16 Seats Per Batch</span>
              </div>
            </div>

            {/* Reassurance Badge */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 sm:gap-3">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-900">Direct Guidance:</strong> Small batch sizes ensure every student gets direct 1:8 mentor support and complete hardware workstation access.
              </p>
            </div>
          </div>

          {/* Right Column: High-Converting Registration Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-8 md:p-10 shadow-xl shadow-slate-900/5">
              {/* Form Header */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Bootcamp Registration Form
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Fill in the details below to reserve a seat in the upcoming EDSOLS cohort.
                </p>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 sm:gap-3 text-xs text-rose-700">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Row 1: Student Name & Parent Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="studentName" className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 sm:mb-2 font-bold">
                      Student Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        placeholder="e.g. Alex Johnson"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="parentName" className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 sm:mb-2 font-bold">
                      Parent / Guardian Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Johnson"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Student Grade & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="studentGrade" className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 sm:mb-2 font-bold">
                      Student Grade *
                    </label>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <select
                        id="studentGrade"
                        name="studentGrade"
                        value={formData.studentGrade}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-base sm:text-sm text-slate-900 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-xs"
                      >
                        <option value="Grade 6">Grade 6 (Middle School)</option>
                        <option value="Grade 7">Grade 7 (Middle School)</option>
                        <option value="Grade 8">Grade 8 (Middle School)</option>
                        <option value="Grade 9">Grade 9 (High School)</option>
                        <option value="Grade 10">Grade 10 (High School)</option>
                        <option value="Grade 11">Grade 11 (High School)</option>
                        <option value="Grade 12">Grade 12 (High School)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 sm:mb-2 font-bold">
                      City *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Bangalore / Chennai"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Phone Number & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 sm:mb-2 font-bold">
                      Phone Number (WhatsApp) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 sm:mb-2 font-bold">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="parent@example.com"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 4: Select Month & Select Batch */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1 sm:pt-2">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 sm:mb-2 font-bold">
                      Select Cohort Month *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['October 2026', 'November 2026'] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, month: m }))}
                          className={`p-2.5 sm:p-3 rounded-xl text-xs font-bold font-mono transition-all border text-center cursor-pointer ${
                            formData.month === m
                              ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-500/25'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                          }`}
                        >
                          {m.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 sm:mb-2 font-bold">
                      Select Weekend Batch *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['Morning', 'Afternoon'] as const).map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, batch: b }))}
                          className={`p-2.5 sm:p-3 rounded-xl text-xs font-bold font-mono transition-all border text-center cursor-pointer ${
                            formData.batch === b
                              ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-500/25'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                          }`}
                        >
                          {b.toUpperCase()} BATCH
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 5: Additional Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 sm:mb-2 font-bold">
                    Additional Message / Student Interests (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the student’s past projects, specific interests in AI/Robotics, or any questions."
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all resize-none shadow-xs"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                  <Button
                    variant="glow"
                    size="xl"
                    type="submit"
                    disabled={isSubmitting}
                    icon={<Send className="w-4 h-4" />}
                    className="w-full font-bold uppercase tracking-wider text-sm sm:text-base py-4 shadow-glow-rose"
                  >
                    {isSubmitting ? 'Processing Registration...' : 'Submit Registration →'}
                  </Button>

                  <p className="text-[11px] text-slate-500 text-center mt-3 font-mono font-medium">
                    Limited seats available. Registration confirmation and payment details will be shared via WhatsApp & Email within 24 hours.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Instant Confirmation Modal */}
      {showSuccessModal && (
        <Modal
          isOpen={showSuccessModal}
          onClose={handleReset}
          title="Registration Received!"
          badgeText="Confirmation Node // Active"
          maxWidth="md"
        >
          <div className="text-center space-y-4 py-4">
            <div className="flex justify-center mb-1">
              <BrandLogo theme="light" size="sm" showTagline={false} />
            </div>

            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-bold text-slate-900">
              Thank You, {formData.parentName}!
            </h4>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We have received the registration for <strong className="text-slate-900">{formData.studentName}</strong> ({formData.studentGrade}) for the <strong className="text-rose-600">{formData.month} ({formData.batch} Batch)</strong> at EDSOLS.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Student:</span>
                <span className="text-slate-900 font-bold">{formData.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cohort:</span>
                <span className="text-rose-700 font-bold">{formData.month}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Batch:</span>
                <span className="text-rose-700 font-bold">{formData.batch} Batch</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">WhatsApp:</span>
                <span className="text-slate-900 font-bold">{formData.phone}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Our admissions team will reach out to you shortly with syllabus handouts and venue directions.
            </p>

            <Button
              variant="primary"
              size="md"
              onClick={handleReset}
              className="w-full uppercase tracking-wider font-bold text-xs"
            >
              Done
            </Button>
          </div>
        </Modal>
      )}
    </section>
  );
};
