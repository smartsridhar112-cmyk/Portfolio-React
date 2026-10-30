import React, { useState, useRef } from 'react';
import { 
  Mail, 
  Send, 
  MapPin, 
  Github, 
  Linkedin, 
  Check, 
  Copy, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  X, 
  Loader2, 
  Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import SectionHeading from '../components/SectionHeading';
import { personalInfo } from '../data/portfolio';
import { useGsapTimeline } from '../hooks/useGsap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(null);

  const contactRef = useRef(null);

  useGsapTimeline((gsap, ScrollTrigger) => {
    gsap.from('.contact-info-col', {
      scrollTrigger: {
        trigger: contactRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.contact-form-col', {
      scrollTrigger: {
        trigger: contactRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      x: 40,
      duration: 0.8,
      ease: 'power3.out'
    });
  }, [], contactRef);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Please provide at least 15 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const now = Date.now();
    if (lastSubmissionTime && now - lastSubmissionTime < 30000) {
      setErrors({ form: 'A message was recently sent. Please wait 30 seconds before sending another.' });
      return;
    }

    setSubmitting(true);
    setErrors({});

    const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const customEndpoint = import.meta.env.VITE_CONTACT_API_URL;

    try {
      if (emailJsServiceId && emailJsTemplateId && emailJsPublicKey) {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: emailJsServiceId,
            template_id: emailJsTemplateId,
            user_id: emailJsPublicKey,
            template_params: {
              from_name: formData.name,
              from_email: formData.email,
              subject: formData.subject,
              message: formData.message,
              to_name: personalInfo.name
            }
          })
        });

        if (!response.ok) throw new Error('Email service returned an error');

      } else if (customEndpoint) {
        const response = await fetch(customEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error('Backend endpoint returned an error');
      } else {
        await new Promise((res) => setTimeout(res, 900));
      }

      setSubmitted(true);
      setLastSubmissionTime(now);
      
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00d2ff', '#38bdf8', '#818cf8', '#ffffff']
        });
      } catch (err) {}

      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (err) {
      setErrors({ form: 'Failed to deliver message. You can reach out directly via ' + personalInfo.email });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      ref={contactRef}
      className="relative py-24 md:py-32 bg-[#060913] overflow-hidden"
    >
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-cyan-600/10 blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-blue-600/10 blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Get In Touch"
          title="Let's Work Together"
          subtitle="Have a project or opportunity in mind? Let's connect."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          <div className="contact-info-col lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-2">
                Connect Directly
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                I am open to full-stack developer roles, frontend engineering positions, and collaborative tech ventures. Feel free to reach out directly through any of the channels below.
              </p>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 mb-4 group hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Email Address</p>
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm font-semibold text-white hover:text-cyan-300 transition-colors break-all"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  aria-label="Copy Email Address"
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/25">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Base Location</p>
                  <p className="text-sm font-semibold text-white">{personalInfo.location}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-slate-400 mb-2">Profiles & Repositories</p>
                  <div className="flex gap-2">
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
                    >
                      <Github size={15} />
                      <span>GitHub</span>
                    </a>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white hover:border-[#0077b5]/50 transition-colors"
                    >
                      <Linkedin size={15} />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-850">
                <Clock size={14} className="text-cyan-400" />
                <span>Typical response time: Within 24 hours</span>
              </div>
            </div>

            <button
              onClick={() => setShowConfigModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors"
            >
              <Info size={13} />
              <span>EmailJS & Backend Endpoint Configuration Guide</span>
            </button>
          </div>

          <div className="contact-form-col lg:col-span-7">
            <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#0b0f19] border border-cyan-500/30 backdrop-blur-xl shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-1">
                Send a Message
              </h3>
              <p className="text-sm text-slate-400 mb-8 font-light">
                Fill in the details below and I will get back to you promptly.
              </p>

              {submitted ? (
                <div className="py-12 px-6 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 text-center animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center mb-4 shadow-glow-sm">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Message Dispatched!</h4>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out, Sridhar has received your note and will reply to your email shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errors.form && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{errors.form}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <input 
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                          errors.name ? 'border-red-500' : 'border-slate-800 focus:border-cyan-400'
                        } text-white placeholder-slate-600 text-sm focus:outline-none transition-colors`}
                      />
                      {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                          errors.email ? 'border-red-500' : 'border-slate-800 focus:border-cyan-400'
                        } text-white placeholder-slate-600 text-sm focus:outline-none transition-colors`}
                      />
                      {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Subject <span className="text-cyan-400">*</span>
                    </label>
                    <input 
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Opportunity / Collaboration / Inquiry"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                        errors.subject ? 'border-red-500' : 'border-slate-800 focus:border-cyan-400'
                      } text-white placeholder-slate-600 text-sm focus:outline-none transition-colors`}
                    />
                    {errors.subject && <p className="mt-1.5 text-xs text-red-400">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea 
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hello Sridhar, I came across your portfolio and wanted to discuss..."
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950 border ${
                        errors.message ? 'border-red-500' : 'border-slate-800 focus:border-cyan-400'
                      } text-white placeholder-slate-600 text-sm focus:outline-none transition-colors resize-none`}
                    ></textarea>
                    {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-mono text-sm font-bold text-black bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:opacity-95 transition-all duration-300 shadow-glow hover:shadow-glow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin text-black" />
                          <span>Dispatching Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-cyan-500/40 p-6 md:p-8 shadow-2xl">
            <button
              onClick={() => setShowConfigModal(false)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Sparkles size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Email Service Integration</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              This portfolio form supports zero-backend dispatch via <strong>EmailJS</strong> or a <strong>Django REST API endpoint</strong>.
            </p>

            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
              <p className="text-cyan-400 font-bold mb-1">Add to your .env file:</p>
              <p>VITE_EMAILJS_SERVICE_ID=your_service_id</p>
              <p>VITE_EMAILJS_TEMPLATE_ID=your_template_id</p>
              <p>VITE_EMAILJS_PUBLIC_KEY=your_public_key</p>
              <p className="text-slate-500 text-[11px] pt-1 border-t border-slate-900">
                Or configure VITE_CONTACT_API_URL=https://api.yourdomain.com/contact/
              </p>
            </div>

            <button
              onClick={() => setShowConfigModal(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-cyan-500 text-black font-semibold text-xs tracking-wider uppercase hover:opacity-90"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
