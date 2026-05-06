import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, MoreVertical, Search, Check, CheckCheck, Mic, Send, RotateCcw, Sparkles, Shield, Zap, Clock, Bot } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

/* ─── TYPES ──────────────────────────────────────────────────────────────── */
interface WAMessage {
    id: number;
    type: 'bot' | 'user' | 'system';
    text: string;
    time: string;
    buttons?: string[];
    isImage?: boolean;
    imageLabel?: string;
    status?: 'sent' | 'delivered' | 'read';
}

interface FlowStep {
    type: 'bot' | 'user' | 'system';
    text: string;
    delay: number;
    buttons?: string[];
    isImage?: boolean;
    imageLabel?: string;
}

/* ─── CONVERSATION SCRIPT ────────────────────────────────────────────────── */
const FLOW: FlowStep[] = [
    { type: 'system', text: "Messages and calls are end-to-end encrypted.", delay: 400 },
    { type: 'bot', text: "Hello! 👋 Welcome to VasT AI Support.\n\nI'm your intelligent WhatsApp assistant powered by enterprise-grade AI.", delay: 1400 },
    { type: 'bot', text: "What would you like to explore?", delay: 900, buttons: ['🚀 Our Products', '📅 Book a Demo', '💬 Talk to a Human'] },
    { type: 'user', text: "🚀 Our Products", delay: 3000 },
    { type: 'bot', text: "Here are our top AI solutions:\n\n🤖 AI Chatbot - 24/7 support\n📞 AI Calling Agent - Voice AI\n📊 Smart Analytics - NLP insights\n⚡ Workflow Builder - No-code", delay: 1200, buttons: ['Learn More', 'Book a Demo'] },
    { type: 'user', text: "Learn More", delay: 2800 },
    { type: 'bot', text: "Our AI Chatbot resolves 90% of queries autonomously - cutting costs by up to 60%.", delay: 1000, isImage: true, imageLabel: "AI Chatbot Overview" },
    { type: 'bot', text: "Want to see it live? We can set up a 15-min personalized demo. ✨", delay: 1100, buttons: ['Yes, Book Demo', 'Maybe Later'] },
    { type: 'user', text: "Yes, Book Demo", delay: 3000 },
    { type: 'bot', text: "Perfect! 🎉 A specialist will reach out within 30 minutes.\n\nAnything else I can help with?", delay: 1400, buttons: ['No, thanks!', 'Another question'] },
    { type: 'user', text: "No, thanks!", delay: 2500 },
    { type: 'bot', text: "Thank you for choosing VasT! 🙌\nWe're excited to show you what AI automation can do. Talk soon!", delay: 1200 },
];

/* ─── LIVE STAT TICKER ───────────────────────────────────────────────────── */
const LiveStat = ({ icon: Icon, label, value, suffix, color, delay }: {
    icon: any; label: string; value: number; suffix: string; color: string; delay: number;
}) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => {
            let frame = 0;
            const total = 30;
            const interval = setInterval(() => {
                frame++;
                setCount(Math.round((frame / total) * value));
                if (frame >= total) clearInterval(interval);
            }, 25);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay / 1000 }}
            className="p-4 rounded-2xl border bg-[#0D0D0D] border-orange-500/10 hover:border-orange-500/25 transition-all duration-300 group"
        >
            <div className="flex items-center gap-2 mb-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${color} bg-current/10`}>
                    <Icon className="w-3.5 h-3.5 text-current" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">{label}</span>
            </div>
            <div className="text-3xl font-black text-white tracking-tight">
                {count}<span className="text-lg text-zinc-500">{suffix}</span>
            </div>
        </motion.div>
    );
};

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
const WhatsAppDemo = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [messages, setMessages] = useState<WAMessage[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [waitingForUser, setWaitingForUser] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);

    const now = () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();

    // Auto-scroll on new message
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    // Main step engine - only handles bot/system messages. User messages are ONLY sent via clicks.
    useEffect(() => {
        if (currentStep >= FLOW.length) { setIsComplete(true); return; }
        if (waitingForUser) return; // Paused - waiting for user click

        const step = FLOW[currentStep];

        // Skip user steps in the engine - they are handled by button clicks
        if (step.type === 'user') {
            setWaitingForUser(true);
            return;
        }

        // Bot or system message - auto-play with typing indicator
        if (step.type === 'bot') setIsTyping(true);

        const timer = setTimeout(() => {
            setIsTyping(false);
            const msg: WAMessage = {
                id: Date.now(), type: step.type, text: step.text, time: now(),
                buttons: step.buttons, isImage: step.isImage, imageLabel: step.imageLabel,
            };
            setMessages(prev => [...prev, msg]);
            setCurrentStep(s => s + 1);
        }, step.delay);

        return () => clearTimeout(timer);
    }, [currentStep, waitingForUser]);

    // User clicks a button - send their message & resume the bot flow
    const handleButtonClick = (btnText: string) => {
        if (!waitingForUser) return;

        const msgId = Date.now();
        const msg: WAMessage = { id: msgId, type: 'user', text: btnText, time: now(), status: 'sent' };
        setMessages(prev => [...prev, msg]);

        // Animate delivery status
        setTimeout(() => {
            setMessages(prev => prev.map(m => m.id === msgId ? { ...m, status: 'delivered' } : m));
        }, 400);
        setTimeout(() => {
            setMessages(prev => prev.map(m => m.id === msgId ? { ...m, status: 'read' } : m));
        }, 900);

        // Advance past the user step and resume bot flow
        setWaitingForUser(false);
        setCurrentStep(s => s + 1);
    };

    const handleRestart = () => {
        setMessages([]);
        setCurrentStep(0);
        setIsComplete(false);
        setIsTyping(false);
        setWaitingForUser(false);
    };

    const StatusIcon = ({ status }: { status?: WAMessage['status'] }) => {
        if (!status) return null;
        if (status === 'sent') return <Check className="w-3 h-3 text-zinc-500" />;
        if (status === 'delivered') return <CheckCheck className="w-3 h-3 text-zinc-500" />;
        return <CheckCheck className="w-3 h-3 text-[#53bdeb]" />;
    };

    /* ─── RENDER ─────────────────────────────────────────────────────────── */
    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">

            {/* ─── LEFT: Features + Stats ─────────────────────────────────── */}
            <div className="hidden lg:flex flex-col gap-5 pt-2">
                {/* Live Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <LiveStat icon={Zap} label="Avg Response" value={800} suffix="ms" color="text-orange-400" delay={200} />
                    <LiveStat icon={Shield} label="Resolution" value={94} suffix="%" color="text-green-400" delay={400} />
                    <LiveStat icon={Clock} label="Uptime" value={99} suffix=".9%" color="text-amber-400" delay={600} />
                </div>

                {/* Feature Cards */}
                <div className="space-y-3">
                    {[
                        { icon: Sparkles, title: 'Quick Reply Templates', desc: 'Deploy rich templates with buttons, lists, and CTAs - your customers tap to respond instantly.' },
                        { icon: MessageSquare, title: 'Catalog & Media', desc: 'Send product catalogs, images, and documents. Customers browse and order without leaving WhatsApp.' },
                        { icon: Bot, title: 'Context-Aware NLP', desc: 'Understands intent across 30+ languages. Remembers conversation history for natural follow-ups.' },
                        { icon: Zap, title: 'CRM Auto-Sync', desc: 'Every conversation logs to Salesforce, HubSpot, or your custom CRM - zero manual effort.' },
                    ].map((feat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                            className="group flex gap-4 items-start p-4 rounded-2xl border bg-[#0D0D0D] border-orange-500/10 hover:border-orange-500/30 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-orange-500/10 border border-orange-500/15 group-hover:bg-orange-500/20 transition-colors">
                                <feat.icon className="w-4 h-4 text-orange-400" />
                            </div>
                            <div className="min-w-0">
                                <h4 className="text-sm font-bold text-white mb-0.5">{feat.title}</h4>
                                <p className="text-xs text-zinc-500 leading-relaxed">{feat.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Compliance Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="flex items-center gap-3 p-4 rounded-2xl border bg-orange-500/05 border-orange-500/15"
                >
                    <Shield className="w-5 h-5 shrink-0 text-orange-400" />
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Built on the official <strong className="text-orange-400/80">WhatsApp Business API</strong>. End-to-end encrypted. Fully compliant with Meta policies.
                    </p>
                </motion.div>
            </div>

            {/* ─── RIGHT: Phone Mockup ────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="flex flex-col items-center gap-5"
            >
                {/* Phone shell */}
                <div className="relative w-full max-w-[360px] h-[660px] rounded-[40px] border-[6px] border-zinc-800 overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),0_0_0_1px_rgba(249,115,22,0.08)]"
                     style={{ background: '#0b141a' }}
                >
                    {/* Notch */}
                    <div className="absolute top-0 inset-x-0 h-7 z-50 flex justify-center">
                        <div className="w-28 h-6 rounded-b-2xl bg-zinc-800" />
                    </div>

                    {/* WA Header */}
                    <div className="pt-9 pb-3 px-4 flex items-center gap-3 z-40 relative bg-[#202c33]">
                        <div className="flex-1 flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm"
                                     style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)' }}>
                                    V
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#202c33]" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white text-[14px] leading-tight">VasT AI Support</h4>
                                <p className="text-[11px] text-white/60 flex items-center gap-1">
                                    <motion.span
                                        animate={{ opacity: [1, 0.4, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"
                                    />
                                    online
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-white/50">
                            <Search className="w-4 h-4" />
                            <MoreVertical className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Chat body */}
                    <div
                        ref={chatRef}
                        className="overflow-y-auto px-3 pt-3 pb-16 space-y-2 [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
                        style={{
                            height: 'calc(100% - 116px)',
                            backgroundColor: '#0b141a',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a2733' fill-opacity='0.35'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    >
                        <AnimatePresence>
                            {messages.map((msg) => {
                                /* System message */
                                if (msg.type === 'system') {
                                    return (
                                        <motion.div key={msg.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center my-2">
                                            <div className="px-3 py-2 rounded-lg text-[10px] text-center max-w-[88%] leading-relaxed bg-[#182229] text-[#8696a0]">
                                                🔒 {msg.text}
                                            </div>
                                        </motion.div>
                                    );
                                }

                                const isUser = msg.type === 'user';
                                // Buttons are clickable only on the latest bot message when waiting for user input
                                const msgIndex = messages.indexOf(msg);
                                const isLastMessage = msgIndex === messages.length - 1;
                                const buttonsClickable = !isUser && msg.buttons && isLastMessage && waitingForUser && !isTyping;

                                return (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`relative max-w-[85%] rounded-lg px-2.5 pt-1.5 pb-1 shadow-sm text-[13px] leading-relaxed
                                            ${isUser
                                                ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-none'
                                                : 'bg-[#202c33] text-[#e9edef] rounded-tl-none'
                                            }`}
                                        >
                                            {/* Image placeholder */}
                                            {msg.isImage && (
                                                <div className="w-full h-24 rounded-md mb-2 flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-500/10 to-amber-500/05 border border-orange-500/15">
                                                    <div className="text-center">
                                                        <MessageSquare className="w-5 h-5 mx-auto mb-1 text-orange-400/50" />
                                                        <span className="text-[9px] font-medium text-orange-400/70">{msg.imageLabel || 'Document'}</span>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="whitespace-pre-line break-words">
                                                {msg.text}
                                                <span className="inline-block w-[56px] h-3" />
                                            </div>

                                            {/* Timestamp + status */}
                                            <div className="absolute bottom-0.5 right-2 flex items-center gap-0.5 text-[10px] opacity-45">
                                                <span>{msg.time}</span>
                                                {isUser && <StatusIcon status={msg.status} />}
                                            </div>

                                            {/* Interactive buttons */}
                                            {msg.buttons && (
                                                <div className={`mt-2 pt-1 space-y-0.5 border-t border-white/10`}>
                                                    {msg.buttons.map((btn, i) => (
                                                        <motion.button
                                                            key={i}
                                                            onClick={() => buttonsClickable && handleButtonClick(btn)}
                                                            whileHover={buttonsClickable ? { backgroundColor: 'rgba(0,168,132,0.1)' } : {}}
                                                            whileTap={buttonsClickable ? { scale: 0.97 } : {}}
                                                            disabled={!buttonsClickable}
                                                            className={`w-full py-1.5 text-center text-[12.5px] font-medium rounded transition-all ${
                                                                buttonsClickable
                                                                    ? 'text-[#00a884] cursor-pointer'
                                                                    : 'text-[#00a884]/40 cursor-default'
                                                            }`}
                                                        >
                                                            {btn}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {/* Typing dots */}
                        <AnimatePresence>
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="px-4 py-2.5 rounded-lg rounded-tl-none shadow-sm bg-[#202c33]">
                                        <div className="flex gap-1.5 items-center h-4">
                                            {[0, 0.15, 0.3].map((d, i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ y: [0, -3, 0] }}
                                                    transition={{ repeat: Infinity, duration: 0.55, delay: d }}
                                                    className="w-1.5 h-1.5 rounded-full bg-zinc-500"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Input bar */}
                    <div className="absolute bottom-0 inset-x-0 p-2 flex items-center gap-1.5 z-30 bg-[#0b141a]">
                        <div className="flex-1 rounded-full px-4 py-2 flex items-center bg-[#2a3942]">
                            <span className="text-sm text-[#8696a0]">Message</span>
                        </div>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 bg-[#00a884]">
                            {isComplete ? <Send className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </div>
                    </div>
                </div>

                {/* Restart - properly below the phone */}
                <AnimatePresence>
                    {isComplete && (
                        <motion.button
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            onClick={handleRestart}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-all"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Replay Demo
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default WhatsAppDemo;
