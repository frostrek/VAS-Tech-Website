import { useState } from 'react';
import { Mail, Send, Check, Loader2, ArrowRight, MessageCircle, Phone, Globe, MapPin, Sparkles, Shield, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

/* ─── FORM INPUT ─────────────────────────────────────────────────────────── */
const InputGroup = ({
    label, name, type = 'text', value, onChange, placeholder, required = true
}: {
    label: string; name: string; type?: string; value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string; required?: boolean;
}) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[11.5px] font-bold uppercase tracking-wider text-zinc-400">
            {label.replace('*', '')}
            {required && <span className="text-orange-500 ml-0.5">*</span>}
        </label>
        <input
            type={type} name={name} value={value} onChange={onChange}
            required={required} placeholder={placeholder}
            className="w-full px-4 py-3 rounded-[1rem] outline-none border-0 bg-[#0A0705] text-white placeholder-zinc-700 text-[13px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.02)]
                focus:bg-[#0D0A07] focus:shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(249,115,22,0.5),0_0_20px_rgba(249,115,22,0.1)] transition-all duration-300"
        />
    </div>
);

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────── */
const ContactPage = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', company: '', jobTitle: '',
        workEmail: '', reachType: '', projectDetails: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!formData.firstName.trim()) { setError('First name is required'); return false; }
        if (!formData.lastName.trim()) { setError('Last name is required'); return false; }
        if (!formData.workEmail.trim()) { setError('Work email is required'); return false; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) { setError('Please enter a valid email'); return false; }
        if (!formData.projectDetails.trim()) { setError('Please tell us about your project'); return false; }
        if (formData.projectDetails.trim().split(/\s+/).length < 5) { setError('Description must be at least 5 words'); return false; }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!validateForm()) return;
        setIsSubmitting(true);
        try {
            const fullName = `${formData.firstName} ${formData.lastName}`;
            await emailjs.send('service_jia14ic', 'template_hygc11p', {
                to_email: 'vastechconsulting@yahoo.com',
                from_name: fullName, user_name: fullName, name: fullName,
                from_email: formData.workEmail, user_email: formData.workEmail,
                email: formData.workEmail, reply_to: formData.workEmail,
                subject: `New Contact Inquiry: ${formData.reachType}`,
                message: `Name: ${fullName}\nCompany: ${formData.company || 'N/A'}\nJob Title: ${formData.jobTitle || 'N/A'}\nEmail: ${formData.workEmail}\nInquiry Type: ${formData.reachType}\n\nMessage:\n${formData.projectDetails}`.trim(),
                first_name: formData.firstName, last_name: formData.lastName,
                company: formData.company, job_title: formData.jobTitle,
                work_email: formData.workEmail, reach_type: formData.reachType,
                project_details: formData.projectDetails
            }, 'BiiX__h7V1vLoyEQb');
            setIsSuccess(true);
            setFormData({ firstName: '', lastName: '', company: '', jobTitle: '', workEmail: '', reachType: '', projectDetails: '' });
            setTimeout(() => setIsSuccess(false), 6000);
        } catch {
            setError('Failed to send. Please try again or email us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const REACH_OPTIONS = ['Sales Enquiry', 'Project Enquiry', 'Partnerships', 'Support', 'Careers', 'General Enquiry', 'Other'];

    const OFFICES = [
        { flag: '🇨🇦', title: 'Canada', subtitle: 'Global HQ', address: 'McNicholl Circle, St Catharines, Ontario L2N 7C5', isHQ: true, mapUrl: 'https://www.google.com/maps/search/?api=1&query=McNicholl+Circle+St+Catharines+Ontario' },
    ];

    return (
        <div className="min-h-screen bg-[#060606] text-white">

            {/* ── HERO ─────────────────────────────────────────────────── */}
            <div className="relative overflow-hidden pt-32 pb-16">
                {/* Dot grid */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                {/* Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_0%,_rgba(249,115,22,0.10)_0%,_transparent_70%)] pointer-events-none" />
                <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[120px] pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #F97316, transparent)' }} />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/08 mb-6">
                        <Sparkles size={12} className="text-orange-400" />
                        <span className="text-[10.5px] font-black uppercase tracking-[0.28em] text-orange-400">Let's Build Something Together</span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif text-white leading-tight mb-4">
                        Let's Start a<br />
                        <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Conversation</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}
                        className="text-zinc-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
                        Have a project in mind or want to explore how AI can transform your business? We respond within 24 hours.
                    </motion.p>

                    {/* Quick trust signals */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                        className="flex flex-wrap items-center justify-center gap-5 mt-8 text-[11.5px] text-zinc-600 font-medium">
                        {[
                            { icon: Clock, text: 'Response within 24 hours' },
                            { icon: Shield, text: 'No spam, ever' },
                            { icon: Zap, text: 'Free consultation call' },
                        ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-1.5">
                                <Icon size={12} className="text-orange-500/50" />
                                {text}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
            <div className="container mx-auto px-4 md:px-8 xl:px-0 max-w-[1200px] pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 items-start">

                    {/* ── LEFT: Contact Info ──────────────────────────── */}
                    <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
                        className="space-y-5">

                        {/* Direct channels */}
                        {/* Direct channels */}
                        <div className="rounded-3xl border-0 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]"
                            style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.04), rgba(10,6,3,1))' }}>
                            <div className="p-6 pb-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="w-4 h-[2px] rounded-full bg-gradient-to-r from-orange-500 to-yellow-400" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Get In Touch</span>
                                </div>
                                <p className="text-zinc-500 text-[12.5px]">Multiple ways to reach our team</p>
                            </div>

                            <div className="p-6 space-y-4">
                                {/* Phone - featured */}
                                <a href="tel:+12894384445"
                                    className="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(249,115,22,0.15)] bg-white/[0.02]"
                                    style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(251,191,36,0.05))' }}>
                                    <div className="w-12 h-12 rounded-[1rem] flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(249,115,22,0.4)]"
                                        style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)' }}>
                                        <Phone size={18} className="text-black" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[11px] font-black uppercase tracking-widest text-orange-400 mb-0.5">Call Us</div>
                                        <div className="text-white font-bold text-base">+1-289-438-4445</div>
                                    </div>
                                    <ArrowRight size={18} className="text-orange-400 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </a>

                                {/* Email + WhatsApp row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <a href="mailto:vastechconsulting@yahoo.com"
                                        className="group flex flex-col gap-3 p-5 rounded-2xl bg-[#140D0A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] hover:bg-[#1A110D] transition-all duration-300">
                                        <div className="w-10 h-10 rounded-[1rem] flex items-center justify-center bg-orange-500/10 text-orange-400 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all">
                                            <Mail size={18} />
                                        </div>
                                        <div>
                                            <div className="text-[10.5px] font-black uppercase tracking-wider text-zinc-500 mb-0.5">Email</div>
                                            <div className="text-[13px] text-white font-semibold break-all tracking-wide">vastechconsulting@yahoo.com</div>
                                        </div>
                                    </a>
                                    <a href="https://wa.me/12894384445" target="_blank" rel="noopener noreferrer"
                                        className="group flex flex-col gap-3 p-5 rounded-2xl bg-[#140D0A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] hover:bg-[#1A110D] transition-all duration-300">
                                        <div className="w-10 h-10 rounded-[1rem] flex items-center justify-center bg-orange-500/10 text-orange-400 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all">
                                            <MessageCircle size={18} />
                                        </div>
                                        <div>
                                            <div className="text-[10.5px] font-black uppercase tracking-wider text-zinc-500 mb-0.5">WhatsApp (CA)</div>
                                            <div className="text-[13px] text-white font-semibold tracking-wide">+1-289-438-4445</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Global Offices */}
                        <div className="rounded-3xl border-0 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]"
                            style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.04), rgba(10,6,3,1))' }}>
                            <div className="p-6 pb-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <Globe size={13} className="text-orange-400" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Global Offices</span>
                                </div>
                                <p className="text-zinc-500 text-[12.5px]">We operate across three continents</p>
                            </div>

                            <div className="p-6 space-y-2">
                                {OFFICES.map((office, i) => (
                                    <motion.a
                                        key={i}
                                        href={office.mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 + 0.3 }}
                                        className="group flex items-start gap-4 p-4 rounded-2xl bg-[#140D0A]/30 hover:bg-[#1A110D] shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] transition-all duration-300"
                                    >
                                        <div className="text-2xl leading-none mt-0.5 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all">{office.flag}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[14px] font-bold text-white group-hover:text-orange-300 transition-colors">{office.title}</span>
                                                {office.isHQ && (
                                                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-black uppercase tracking-wider shadow-sm">HQ</span>
                                                )}
                                                <span className="text-[11.5px] text-zinc-500">{office.subtitle}</span>
                                            </div>
                                            <div className="flex items-start gap-1.5">
                                                <MapPin size={12} className="text-zinc-600 mt-0.5 shrink-0" />
                                                <p className="text-[12.5px] text-zinc-400 leading-snug">{office.address}</p>
                                            </div>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* ── RIGHT: Contact Form ─────────────────────────── */}
                    <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
                        <div className="rounded-3xl border-0 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.02)] relative"
                            style={{ background: 'linear-gradient(135deg, rgba(20,13,10,0.8), rgba(8,8,8,1))' }}>

                            {/* Form header */}
                            <div className="p-8 pb-4 relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-4 h-[2px] rounded-full bg-gradient-to-r from-orange-500 to-yellow-400" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Send a Message</span>
                                </div>
                                <h2 className="text-3xl font-serif text-white">Tell us about your project</h2>
                                <p className="text-zinc-500 text-[13.5px] mt-1.5">We read every message. Expect a reply within 24 hours.</p>
                            </div>

                            {!isSuccess ? (
                                <form onSubmit={handleSubmit} className="p-8 space-y-6 relative z-10">
                                    {/* Name row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <InputGroup label="First name*" name="firstName" value={formData.firstName} onChange={handleChange as any} placeholder="Arjun" />
                                        <InputGroup label="Last name*" name="lastName" value={formData.lastName} onChange={handleChange as any} placeholder="Sharma" />
                                    </div>

                                    {/* Company + Title */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <InputGroup label="Company" name="company" value={formData.company} onChange={handleChange as any} placeholder="Acme Corp" required={false} />
                                        <InputGroup label="Job title" name="jobTitle" value={formData.jobTitle} onChange={handleChange as any} placeholder="Founder / CTO" required={false} />
                                    </div>

                                    {/* Email */}
                                    <InputGroup label="Work email*" name="workEmail" type="email" value={formData.workEmail} onChange={handleChange as any} placeholder="arjun@company.com" />

                                    {/* Inquiry type - pill buttons */}
                                    <div className="space-y-3">
                                        <label className="text-[11.5px] font-bold uppercase tracking-wider text-zinc-400">
                                            What are you reaching out about? <span className="text-orange-500">*</span>
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {REACH_OPTIONS.map(option => (
                                                <label key={option} className="cursor-pointer">
                                                    <input type="radio" name="reachType" value={option}
                                                        checked={formData.reachType === option}
                                                        onChange={handleChange} required className="sr-only" />
                                                    <span className={`inline-flex items-center px-4 py-2 rounded-2xl text-[12px] font-bold transition-all duration-300 select-none ${
                                                        formData.reachType === option
                                                            ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-black shadow-[0_0_20px_rgba(249,115,22,0.4)]'
                                                            : 'bg-[#140D0A] text-zinc-400 hover:bg-[#1A110D] hover:text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]'
                                                    }`}>
                                                        {option}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11.5px] font-bold uppercase tracking-wider text-zinc-400">
                                            Tell us more <span className="text-orange-500">*</span>
                                        </label>
                                        <textarea
                                            name="projectDetails" value={formData.projectDetails}
                                            onChange={handleChange} rows={4} required
                                            placeholder="What are you building? What's your biggest bottleneck right now? Any timeline or budget in mind?"
                                            className="w-full px-4 py-3 rounded-[1rem] outline-none border-0 bg-[#0A0705] text-white placeholder-zinc-700 text-[13px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.02)]
                                                focus:bg-[#0D0A07] focus:shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(249,115,22,0.5),0_0_20px_rgba(249,115,22,0.1)] transition-all duration-300 resize-none"
                                        />
                                    </div>

                                    {/* Privacy */}
                                    <p className="text-[11px] text-zinc-600 leading-relaxed">
                                        By submitting, your information will be processed in accordance with our Privacy Policy. We don't share your data with anyone.
                                    </p>

                                    {/* Error */}
                                    {error && (
                                        <div className="p-3.5 rounded-xl border border-red-500/25 bg-red-500/08 text-red-400 text-[13px] text-center">
                                            {error}
                                        </div>
                                    )}

                                    {/* Submit */}
                                    <button
                                        type="submit" disabled={isSubmitting}
                                        className={`w-full py-4 rounded-2xl font-black text-black text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2.5 ${
                                            isSubmitting ? 'opacity-70 cursor-wait' : 'hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]'
                                        }`}
                                        style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)', boxShadow: '0 0 24px rgba(249,115,22,0.3)' }}
                                    >
                                        {isSubmitting
                                            ? <><Loader2 size={18} className="animate-spin" /> Sending your message...</>
                                            : <><Send size={16} /> Send Message</>
                                        }
                                    </button>
                                </form>
                            ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                    className="p-8 flex flex-col items-center text-center py-20 gap-5">
                                    <div className="w-20 h-20 rounded-full border border-orange-500/25 flex items-center justify-center"
                                        style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(251,191,36,0.08))' }}>
                                        <Check size={36} className="text-orange-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-serif text-white mb-2">Message Received!</h3>
                                        <p className="text-zinc-400 text-sm max-w-xs mx-auto leading-relaxed">
                                            Thanks for reaching out. We'll review your message and reply within 24 hours.
                                        </p>
                                    </div>
                                    <button onClick={() => setIsSuccess(false)}
                                        className="mt-2 flex items-center gap-1.5 text-[13px] font-bold text-orange-400 hover:gap-2.5 transition-all">
                                        Send another message <ArrowRight size={14} />
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
