import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Sparkles, Zap, Linkedin, MessageCircle, FileText, BarChart3 } from 'lucide-react';
import VoiceCallWidget from '../components/experience/VoiceCallWidget';
import ChatbotDemo from '../components/experience/ChatbotDemo';
import WhatsappBotDemo from '../components/demos/WhatsappBotDemo';
import LinkedinOutreachDemo from '../components/demos/LinkedinOutreachDemo';
import InvoiceAIOcrDemo from '../components/demos/InvoiceAIOcrDemo';
import EmailAutomationDemo from '../components/demos/EmailAutomationDemo';
import CTASection from '../components/home/CTASection';

const ExperiencePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050505] text-white">
            {/* Background Effects */}
            <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.05)_0%,_transparent_70%)] pointer-events-none" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 bg-[#111110] border-orange-500/30">
                            <Sparkles className="w-4 h-4 text-orange-400" />
                            <span className="text-[11px] uppercase tracking-widest font-black text-orange-400">Interactive Demo</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif mb-6 leading-tight">
                            Experience{' '}
                            <span className="bg-clip-text text-transparent bg-supportiq-button">
                                AI in Action
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg max-w-2xl mx-auto mb-8 text-zinc-400 font-medium">
                            Don't just read about our AI solutions. Test our conversational agents, document extraction models, and data analytics live, right here.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Demo Cards Section */}
            <section className="relative pb-24 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-[1400px] mx-auto space-y-16 lg:space-y-24">
                    
                    {/* Row 1: Document Processing & Analytics (THE NEW STUFF) */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                        {/* Invoice OCR Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)] bg-[#1A1A1A] border border-orange-500/20">
                                    <FileText className="w-7 h-7 text-orange-400" />
                                </div>
                                <div>
                                    <span className="inline-block py-0.5 px-2.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] uppercase font-black tracking-widest mb-2">
                                        Operations
                                    </span>
                                    <h2 className="text-3xl font-serif text-white leading-tight">Document AI Processing</h2>
                                </div>
                            </div>
                            
                            <p className="text-zinc-400 text-sm">Upload invoices, POs, or receipts to watch real-time OCR extraction convert messy PDFs into structured JSON records.</p>
                            
                            <InvoiceAIOcrDemo />
                        </motion.div>

                        {/* Email Automation Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)] bg-[#1A1A1A] border border-orange-500/20">
                                    <MessageSquare className="w-7 h-7 text-amber-400" />
                                </div>
                                <div>
                                    <span className="inline-block py-0.5 px-2.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-amber-400 text-[10px] uppercase font-black tracking-widest mb-2">
                                        Communication
                                    </span>
                                    <h2 className="text-3xl font-serif text-white leading-tight">AI Email Automation</h2>
                                </div>
                            </div>

                            <p className="text-zinc-400 text-sm">Experience our enterprise email agent dynamically parsing context and auto-drafting perfect replies instantly.</p>

                            <EmailAutomationDemo />
                        </motion.div>
                    </div>


                    {/* Row 2: Voice & Chat */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                        {/* Voice AI Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)] bg-[#1A1A1A] border border-orange-500/20">
                                    <Phone className="w-7 h-7 text-orange-400" />
                                </div>
                                <div>
                                    <span className="inline-block py-0.5 px-2.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] uppercase font-black tracking-widest mb-2">
                                        Communication
                                    </span>
                                    <h2 className="text-3xl font-serif text-white leading-tight">Live Voice Agent</h2>
                                </div>
                            </div>

                            <p className="text-zinc-400 text-sm">Experience sub-500ms latency voice AI capable of handling complex booking, routing, and customer support scenarios.</p>

                            <VoiceCallWidget />
                        </motion.div>

                        {/* Chatbot Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)] bg-[#1A1A1A] border border-orange-500/20">
                                    <MessageSquare className="w-7 h-7 text-orange-400" />
                                </div>
                                <div>
                                    <span className="inline-block py-0.5 px-2.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] uppercase font-black tracking-widest mb-2">
                                        Communication
                                    </span>
                                    <h2 className="text-3xl font-serif text-white leading-tight">Website Copilot</h2>
                                </div>
                            </div>

                            <p className="text-zinc-400 text-sm">Deploy sophisticated conversational LLMs deeply trained on your technical documentation and product catalog.</p>

                            <ChatbotDemo />
                        </motion.div>
                    </div>

                    {/* Row 3: LinkedIn Outreach & WhatsApp */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                        {/* LinkedIn Outreach Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,119,181,0.2)] bg-[#1A1A1A] border border-[#0077B5]/30">
                                    <Linkedin className="w-7 h-7 text-[#0077B5]" />
                                </div>
                                <div>
                                    <span className="inline-block py-0.5 px-2.5 rounded-full bg-[#0077B5]/10 border border-[#0077B5]/30 text-[#0077B5] text-[10px] uppercase font-black tracking-widest mb-2">
                                        Sales & CRM
                                    </span>
                                    <h2 className="text-3xl font-serif text-white leading-tight">LinkedIn Outreach</h2>
                                </div>
                            </div>
                            
                            <p className="text-zinc-400 text-sm">Automate B2B lead generation. Our AI identifies decision-makers, extracts verified contacts, and initiates personalized sequences.</p>

                            <LinkedinOutreachDemo />
                        </motion.div>

                        {/* WhatsApp Bot Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.2)] bg-[#1A1A1A] border border-[#25D366]/30">
                                    <MessageCircle className="w-7 h-7 text-[#25D366]" />
                                </div>
                                <div>
                                    <span className="inline-block py-0.5 px-2.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-[10px] uppercase font-black tracking-widest mb-2">
                                        Communication
                                    </span>
                                    <h2 className="text-3xl font-serif text-white leading-tight">WhatsApp Engine</h2>
                                </div>
                            </div>
                            
                            <p className="text-zinc-400 text-sm">Engage customers where they are. Full e-commerce, tracking, and support flows over the WhatsApp Business API.</p>

                            <div className="flex justify-center w-full bg-[#111110] border border-[#25D366]/20 rounded-2xl p-6 shadow-inner">
                                <WhatsappBotDemo />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CTASection />
        </div>
    );
};

export default ExperiencePage;
