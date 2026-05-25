import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSending(true);
    setSendError(null);

    const templateParams = {
      from_name: name,
      from_email: email,
      to_email: 'muhammadumairshake@gmail.com',
      subject: subject || 'No Subject Specified',
      message: message,
    };

    emailjs.send(
      'service_tq8w66k',
      'template_i9k0ate',
      templateParams,
      '6dd0IOrLBT-Y2yBJL'
    )
      .then(() => {
        setSubmitted(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      })
      .catch((err: any) => {
        console.error('EmailJS send error:', err);
        const errorMsg = err?.text || err?.message || (typeof err === 'string' ? err : 'Unknown error occurred');
        setSendError(`Failed to send: ${errorMsg}`);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6 md:px-12">
      <motion.div
        className="max-w-6xl mx-auto w-full space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Title */}
        <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] text-cream uppercase font-bold tracking-[0.3em] block">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-cream mt-2">
            Let's make something cool together.
          </h2>
          <p className="text-xs text-gray-500 font-light max-w-md mx-auto leading-relaxed">
            Have an idea for a project, need premium custom assets, or just want to talk creative direction? Drop us a line below and we'll get right back to you.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
          {/* Left Side: Contact Coordinates Cards */}
          <div className="lg:col-span-1 space-y-6 flex flex-col justify-between">
            <div className="glass-panel p-6 rounded-2xl border border-cream/10 space-y-6">
              <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-bold">
                Direct Contact
              </span>

              <div className="space-y-4">
                <div className="flex gap-3.5 items-start">
                  <div className="w-9 h-9 bg-cream/5 border border-cream/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="text-cream" size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-semibold">Email Us</span>
                    <a href="mailto:muhammadumairshake@gmail.com" className="text-xs text-cream hover:underline font-light block mt-0.5">
                      muhammadumairshake@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="w-9 h-9 bg-cream/5 border border-cream/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="text-cream" size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-semibold">Call the Studio</span>
                    <a href="tel:+923442226667" className="text-xs text-cream hover:underline font-light block mt-0.5">
                      +92 344 2226667
                    </a>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="w-9 h-9 bg-cream/5 border border-cream/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="text-cream" size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-semibold">Office Address</span>
                    <span className="text-xs text-cream-dark font-light block mt-0.5 leading-relaxed">
                      Air University E-9 Islamabad, Pakistan
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-dark border border-cream/5 p-6 rounded-2xl space-y-3">
              <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-bold">
                Consultation hours
              </span>
              <div className="text-xs text-cream-light font-light space-y-1">
                <p>Monday - Friday: 09:00 - 18:00 PST</p>
                <p className="text-gray-500 font-serif italic">Saturday - Sunday: Closed for creative design</p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-3xl border border-cream/15">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-lg font-bold text-cream font-serif italic border-b border-cream/5 pb-3">
                  Tell us about your project
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 uppercase font-semibold">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alexander Drake"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-black border border-cream/10 rounded-xl p-3 text-xs text-cream-light focus:border-cream/35 outline-none transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 uppercase font-semibold">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alexander@drakedesigns.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-black border border-cream/10 rounded-xl p-3 text-xs text-cream-light focus:border-cream/35 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 uppercase font-semibold">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g., Custom 3D character rigs or website layout"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full bg-black border border-cream/10 rounded-xl p-3 text-xs text-cream-light focus:border-cream/35 outline-none transition-colors"
                  />
                </div>

                {/* Message input */}
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 uppercase font-semibold">Project Details</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe what you need, reference styles, formats, and estimated timelines..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full bg-black border border-cream/10 rounded-xl p-4 text-xs text-cream-light focus:border-cream/35 outline-none transition-colors resize-none leading-relaxed"
                  />
                </div>

                {sendError && (
                  <div className="text-red-400 text-xs font-light text-right">
                    {sendError}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSending}
                    className={`bg-cream hover:bg-cream-light text-black font-semibold text-xs py-3 px-8 rounded-full flex items-center gap-1.5 shadow-[0_4px_15px_rgba(222,219,200,0.15)] transition-all duration-300 transform hover:scale-[1.02] ${isSending ? 'opacity-50 cursor-not-allowed scale-100 hover:scale-100' : ''
                      }`}
                  >
                    {isSending ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin mr-1" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={12} />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Success contact overlay */
              <div className="h-full flex flex-col items-center justify-center py-16 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-cream/15 border border-cream/30 flex items-center justify-center">
                  <MessageCircle className="text-cream" size={24} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-cream font-serif italic">Message Sent!</h4>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-1 block">
                    We've got your back
                  </span>
                </div>
                <p className="text-xs text-gray-400 max-w-sm font-light leading-relaxed">
                  Thanks for reaching out! We'll look over your ideas and get back to you via email within a few hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-cream text-black font-semibold text-xs py-2 px-5 rounded-full mt-2"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
