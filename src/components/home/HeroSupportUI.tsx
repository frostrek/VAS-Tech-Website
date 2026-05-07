import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MoreHorizontal, Paperclip, Smile, Zap, Send, MessageCircle, PhoneCall, Mic, MicOff, ChevronLeft, Info } from 'lucide-react';

const MOCKUPS = [
    {
        id: 'chatbot',
        name: 'VAS Chat',
        icon: <MessageCircle size={18} />
    },
    {
        id: 'whatsapp',
        name: 'WA Agent',
        icon: <MessageCircle size={18} className="text-orange-500" />
    },
    {
        id: 'calling',
        name: 'Voice AI',
        icon: <PhoneCall size={18} className="text-orange-400" />
    }
];

const HeroSupportUI = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // --- Chatbot State ---
    const [chatbotInput, setChatbotInput] = useState("");
    const [chatbotMessages, setChatbotMessages] = useState([
        { sender: 'bot', text: "Hii, welcome! I am VAS Tech AI chatbot. How may I help you?" }
    ]);
    const chatbotScrollRef = useRef<HTMLDivElement>(null);

    // --- WhatsApp State ---
    const [waInput, setWaInput] = useState("");
    const [waMessages, setWaMessages] = useState([
        { sender: 'user', text: "Can I return the item I bought yesterday?", time: "10:41 AM" },
        { sender: 'bot', text: "Yes! Since you ordered it yesterday, you are within the 30-day return window. Would you like a return label?", time: "10:42 AM" }
    ]);
    const waScrollRef = useRef<HTMLDivElement>(null);

    // --- Calling State ---
    const [callStatus, setCallStatus] = useState<"incoming" | "connected">("incoming");
    const [callTranscription, setCallTranscription] = useState<string>("Processing connection...");
    const [callSeconds, setCallSeconds] = useState(0);

    // Call Duration Timer
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
        if (callStatus === 'connected') {
            interval = setInterval(() => {
                setCallSeconds(prev => prev + 1);
            }, 1000);
        } else {
            setCallSeconds(0);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [callStatus]);

    const formatCallDuration = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Voice Agent Automated Dialogue & Text-to-Speech
    useEffect(() => {
        if (callStatus === 'connected') {
            window.speechSynthesis.cancel(); // Stop any previous speech
            setCallTranscription("Hello?");
            
            const message = "Hi I'm the VAS Tech AI calling agent. You can also build a calling agent for yourself by VAS Tech Consulting.";
            
            const t1 = setTimeout(() => {
                setCallTranscription("Hi I'm VAS Tech AI, a calling agent. You can also build a calling agent for yourself by VAS Tech Consulting");
                
                const utterance = new SpeechSynthesisUtterance(message);
                utterance.pitch = 1.0;
                utterance.rate = 1.0;
                window.speechSynthesis.speak(utterance);
            }, 1200);
            
            return () => {
                clearTimeout(t1);
                window.speechSynthesis.cancel();
            };
        } else {
            setCallTranscription("Awaiting Connection...");
            window.speechSynthesis.cancel();
        }
    }, [callStatus]);

    // Scroll chat containers safely without affecting layout wrapper
    useEffect(() => {
        if (chatbotScrollRef.current) {
            chatbotScrollRef.current.scrollTop = chatbotScrollRef.current.scrollHeight;
        }
    }, [chatbotMessages]);
    
    useEffect(() => {
        if (waScrollRef.current) {
            waScrollRef.current.scrollTop = waScrollRef.current.scrollHeight;
        }
    }, [waMessages]);


    const handleSendChatbot = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!chatbotInput.trim()) return;

        setChatbotMessages(prev => [...prev, { sender: 'user', text: chatbotInput }]);
        setChatbotInput("");

        setTimeout(() => {
            setChatbotMessages(prev => [...prev, { 
                sender: 'bot', 
                text: "At VAS Tech Consulting, we build custom AI chatbots capable of instantaneous support logic for your company. Try integrating it today!" 
            }]);
        }, 1200);
    };

    const handleSendWA = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!waInput.trim()) return;

        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        setWaMessages(prev => [...prev, { sender: 'user', text: waInput, time: now }]);
        setWaInput("");

        setTimeout(() => {
            setWaMessages(prev => [...prev, { 
                sender: 'bot', 
                text: "Our WhatsApp agents effortlessly handle customer intent natively. Would you like to schedule a deep dive?", 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            }]);
        }, 1200);
    };

    const handleCallAction = () => {
        if (callStatus === 'incoming') {
            setCallStatus('connected');
        } else {
            setCallStatus('incoming'); 
        }
    };

    const renderChatbotUI = () => (
        <motion.div 
            key="chatbot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex flex-col relative overflow-hidden bg-black"
        >
            {/* Header */}
            <div className="w-full px-4 py-3 border-b border-orange-500/20 flex items-center justify-between bg-zinc-900/40 backdrop-blur-xl z-20 shrink-0 h-14 pt-6">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-orange-500/30">
                        <img src="/VAS_logo.png" alt="Support" className="w-full h-full object-contain p-1.5 bg-black" loading="lazy" decoding="async" />
                    </div>
                    <div>
                        <h3 className="text-white text-[13px] font-bold tracking-tight leading-none">VAS Tech Assistant</h3>
                        <div className="flex items-center gap-1 mt-1">
                            <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
                            <p className="text-orange-400 text-[9px] font-medium uppercase tracking-widest">Online</p>
                        </div>
                    </div>
                </div>
                <button className="text-zinc-500 hover:text-white transition-colors bg-white/5 p-1 rounded-md border border-orange-500/20">
                    <Info size={14} />
                </button>
            </div>

            {/* Chat Body Area */}
            <div ref={chatbotScrollRef} className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto w-full text-sm scroll-smooth bg-[#050505] relative">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none"></div>
                <div className="w-full flex justify-center py-2 relative z-10">
                    <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest bg-zinc-900/50 px-3 py-1 rounded-full border border-orange-500/20">Interactive Demo</span>
                </div>
                {chatbotMessages.map((msg, idx) => (
                    <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} key={idx} className={`flex items-end gap-2.5 w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                         {msg.sender === 'bot' && (
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shrink-0 flex items-center justify-center text-[10px] shadow-lg text-black font-bold">
                                VT
                            </div>
                         )}
                        <div className={
                            msg.sender === 'bot' 
                            ? "bg-zinc-900/60 backdrop-blur-md text-gray-200 text-[12px] p-3 rounded-2xl rounded-bl-none border border-orange-500/20 shadow-lg leading-snug max-w-[85%]"
                            : "bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[12px] p-3 rounded-2xl rounded-br-none font-bold shadow-lg leading-snug max-w-[85%]"
                        }>
                            {msg.text}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Input box */}
            <div className="p-3 border-t border-orange-500/20 w-full bg-zinc-950/80 backdrop-blur-xl shrink-0 pb-8">
                <form onSubmit={handleSendChatbot} className="bg-white/5 rounded-2xl p-1.5 flex items-center gap-2 border border-orange-500/20 focus-within:border-orange-500/30 transition-all">
                    <button type="button" className="text-zinc-600 hover:text-white transition-colors p-1.5 shrink-0">
                        <Smile size={18} />
                    </button>
                    <input 
                        type="text" 
                        value={chatbotInput}
                        onChange={(e) => setChatbotInput(e.target.value)}
                        placeholder="Type a message..." 
                        className="bg-transparent border-none outline-none text-gray-300 text-[12.5px] flex-1 font-body py-1 placeholder:text-zinc-700 w-full min-w-0" 
                    />
                    <button 
                        type="submit"
                        disabled={!chatbotInput.trim()}
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 disabled:opacity-30 text-black w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-all shrink-0 group"
                    >
                        <Send size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="currentColor" />
                    </button>
                </form>
            </div>
            
             <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[80px] right-4 bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 z-20 shadow-2xl border border-orange-500/20">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div>
                <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest">Live Experience</p>
            </motion.div>
        </motion.div>
    );

    const renderWhatsAppUI = () => (
        <motion.div 
            key="whatsapp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex flex-col relative overflow-hidden bg-[#0D1117]"
        >
            {/* WhatsApp Header */}
            <div className="w-full px-4 py-3 bg-[#0D1418] border-b border-orange-500/20 flex items-center gap-3 shrink-0 shadow-lg z-10 pt-6">
                <button className="text-zinc-500 hover:text-white transition-colors shrink-0"><ChevronLeft size={20} /></button>
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-orange-500/20">
                    <img src="https://i.pravatar.cc/150?img=33" alt="Avatar" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div className="flex-1 overflow-hidden">
                    <h3 className="text-zinc-100 text-[13px] font-bold leading-tight truncate">VAS Tech Support</h3>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
                        <p className="text-orange-400 text-[9px] truncate font-medium uppercase tracking-wider">Online</p>
                    </div>
                </div>
                <div className="flex gap-4 text-zinc-400 shrink-0 pr-1">
                    <PhoneCall size={18} className="cursor-pointer hover:text-white transition-colors" />
                    <MoreHorizontal size={18} className="cursor-pointer hover:text-white transition-colors" />
                </div>
            </div>

            {/* WA Background */}
            <div className="absolute inset-0 top-[50px] bottom-[60px] opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png")', backgroundRepeat: 'repeat' }} />

            {/* WA Chat Area */}
            <div ref={waScrollRef} className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto w-full text-[11.5px] bg-[#0B141A] scroll-smooth">
                <div className="w-full flex justify-center py-2">
                    <span className="text-[10px] bg-zinc-900/80 text-zinc-500 px-3 py-1 rounded-full border border-orange-500/20 uppercase tracking-widest font-bold">Today</span>
                </div>
                {waMessages.map((msg, idx) => (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={idx} className={`max-w-[85%] rounded-[12px] p-3 shadow-xl font-body relative ${msg.sender === 'user' ? 'bg-orange-600/80 text-[#E9EDEF] self-end rounded-tr-none border border-orange-500/20' : 'bg-[#1F2C33] text-[#E9EDEF] self-start rounded-tl-none border border-orange-500/20'}`}>
                        <span className="leading-relaxed break-words font-medium">{msg.text}</span>
                        <div className="flex items-center justify-end gap-1 mt-1 -mb-1 relative opacity-60">
                            <span className="text-[9px]">{msg.time}</span>
                            {msg.sender === 'user' && (
                                <svg viewBox="0 0 16 15" width="12" height="11" className="text-[#53bdeb] ml-0.5">
                                    <path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                                </svg>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* WA Input Area */}
            <div className="px-2 py-2 bg-[#202C33] flex items-end gap-1.5 shrink-0 z-10 pb-4">
                <div className="bg-[#2A3942] rounded-2xl flex-1 flex items-end px-2 py-1.5 border border-orange-500/20 shadow-sm min-h-[36px]">
                    <div className="text-[#8696A0] p-1.5 hover:text-white cursor-pointer transition-colors shrink-0"><Smile size={18} /></div>
                    <form onSubmit={handleSendWA} className="flex-1 flex items-center min-h-[24px] overflow-hidden">
                        <input 
                            type="text" 
                            value={waInput}
                            onChange={(e) => setWaInput(e.target.value)}
                            placeholder="Message" 
                            className="bg-transparent border-none outline-none text-[#D1D7DB] px-1.5 flex-1 font-body text-[12.5px] w-full min-w-0" 
                        />
                    </form>
                    <div className="text-[#8696A0] p-1.5 hover:text-white cursor-pointer transition-colors shrink-0"><Paperclip size={16} className="-rotate-45" /></div>
                </div>
                <div className="shrink-0 flex items-end">
                    <button onClick={handleSendWA} className="bg-orange-600 w-9 h-9 rounded-full text-white flex items-center justify-center hover:bg-orange-500 transition-all active:scale-95 shadow-lg">
                        {waInput.trim() ? <Send size={15} className="ml-0.5" fill="currentColor"/> : <Mic size={17} fill="currentColor"/>}
                    </button>
                </div>
            </div>
            
             <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[65px] left-2 glass-card p-1 rounded-lg flex items-center gap-1.5 z-20 shadow-xl border border-orange-500/20 scale-75 origin-left">
                <div className="bg-orange-500/20 p-1 rounded text-orange-400"><Zap size={10} fill="currentColor"/></div>
                <div className="pr-1">
                    <p className="text-orange-400 text-[9px] font-bold">Intent Synced</p>
                </div>
            </motion.div>
        </motion.div>
    );

    const renderVoiceUI = () => (
        <motion.div 
            key="calling"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full bg-gradient-to-b from-[#111827] via-[#0F172A] to-[#020617] flex flex-col relative overflow-hidden items-center pt-20 pb-6 border border-orange-500/20"
        >
            <div className="text-center flex flex-col items-center">
                <p className="text-orange-500 text-[11px] mb-2 uppercase tracking-[0.2em] font-black flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,1)]"></span>
                    {callStatus === 'incoming' ? 'Incoming Agent' : 'Agent Connected'}
                </p>
                <h3 className="text-white text-2xl font-bold tracking-tight mb-1">
                     {callStatus === 'incoming' ? 'VAS Tech AI' : formatCallDuration(callSeconds)}
                </h3>
                <div className="bg-zinc-900/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-orange-500/20 shadow-xl">
                    <p className="text-zinc-400 text-[10.5px] font-bold italic max-w-[200px] leading-relaxed">
                        {callStatus === 'incoming' ? '+1 (289) 438-4445' : callTranscription}
                    </p>
                </div>
            </div>

            <div className="relative w-40 h-40 flex items-center justify-center mt-12 mb-auto shrink-0">
                {callStatus === 'incoming' ? (
                    <>
                        <motion.div animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 bg-orange-500/30 rounded-full blur-xl" />
                        <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="absolute inset-4 bg-orange-500/40 rounded-full blur-lg" />
                    </>
                ) : (
                    <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl" />
                )}
                
                <div className={`relative z-10 w-28 h-28 rounded-full flex items-center justify-center shadow-2xl transition-all duration-700 overflow-hidden border-2 ${callStatus === 'incoming' ? 'border-orange-500/50 bg-black' : 'border-orange-500/50 bg-black'}`}>
                   {callStatus === 'incoming' ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                            <PhoneCall size={40} className="text-orange-500 animate-pulse relative z-10" fill="currentColor"/>
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent"></div>
                        </div>
                   ) : (
                        <div className="flex gap-2 items-center justify-center h-12 w-16">
                           {[1,2,3,4,5].map(i => (
                               <motion.div 
                                    key={i}
                                    animate={{ height: ['20%', '100%', '20%'] }}
                                    transition={{ duration: 0.4 + (Math.random() * 0.6), repeat: Infinity, ease: "easeInOut" }}
                                    className="w-2 bg-gradient-to-t from-orange-400 to-yellow-400 rounded-full"
                               />
                           ))}
                        </div>
                   )}
                </div>
            </div>

            <div className="flex w-full justify-evenly items-center px-4 mt-auto mb-6 shrink-0">
                {callStatus === 'incoming' ? (
                    <>
                        <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-white transition-colors group">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:bg-slate-700 transition-colors">
                                <MessageCircle size={18} className="opacity-80" />
                            </div>
                            <span className="text-[10px] font-medium tracking-wide">Message</span>
                        </button>
                        <button onClick={handleCallAction} className="flex flex-col items-center gap-1.5 group">
                            <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.3)] group-hover:scale-105 transition-transform">
                                <Phone size={26} fill="currentColor" className="animate-[wiggle_1s_ease-in-out_infinite]"/>
                            </div>
                            <span className="text-[11px] font-semibold text-orange-400 mt-1">Accept</span>
                        </button>
                    </>
                ) : (
                    <>
                        <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-white transition-colors group">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:bg-slate-700 transition-colors">
                                <MicOff size={18} className="opacity-80" />
                            </div>
                            <span className="text-[10px] font-medium tracking-wide">Mute</span>
                        </button>
                        <button onClick={handleCallAction} className="flex flex-col items-center gap-1.5 group">
                            <div className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.3)] group-hover:scale-105 transition-transform">
                                <Phone size={26} className="rotate-[135deg]" fill="currentColor" />
                            </div>
                            <span className="text-[11px] font-semibold text-red-400 mt-1">End Call</span>
                        </button>
                         <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-white transition-colors group">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:bg-slate-700 transition-colors">
                                <Zap size={18} className="opacity-80" />
                            </div>
                            <span className="text-[10px] font-medium tracking-wide">Actions</span>
                        </button>
                    </>
                )}
            </div>
            
        </motion.div>
    );

    return (
        <div className="w-full flex flex-col xl:flex-row items-center justify-center gap-6 lg:gap-10 relative">
            
            {/* The Left Side Floating Tab Menu */}
            <div className="flex flex-row xl:flex-col gap-3 z-20 shrink-0">
                {MOCKUPS.map((mockup, i) => (
                    <button 
                        key={mockup.id}
                        onClick={() => setActiveIndex(i)}
                        className={`flex items-center gap-2 px-3 py-3 rounded-2xl font-bold transition-all duration-300 backdrop-blur-md shadow-lg ${
                            activeIndex === i 
                            ? 'bg-white/10 text-white ring-1 ring-white/20 scale-105 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                            : 'bg-black/30 text-gray-500 hover:text-white hover:bg-black/50 border border-transparent'
                        }`}
                        title={mockup.name}
                    >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${activeIndex === i ? 'bg-white/10' : 'bg-transparent'}`}>
                            {mockup.icon}
                        </div>
                        <span className="hidden sm:inline text-xs xl:text-[14px]">{mockup.name}</span>
                    </button>
                ))}
            </div>

            {/* The Smartphone Device Frame */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="relative z-10 flex shrink-0"
            >
                {/* Device Hardware Bezel - Refined & Thinner */}
                <div className="relative w-[320px] sm:w-[380px] h-[620px] sm:h-[680px] bg-[#0A0A0A] rounded-[3.2rem] border-[5px] border-[#1A1A1A] shadow-[0_40px_100px_rgba(0,0,0,0.5),inset_0_0_2px_rgba(255,255,255,0.1)] shrink-0 ring-1 ring-white/10 overflow-hidden mx-auto">
                    
                    {/* Hardware Buttons - Sleeker */}
                    <div className="absolute top-[100px] -right-[5px] w-[2px] h-[50px] bg-[#222222] rounded-r-sm z-50"></div>
                    <div className="absolute top-[80px] -left-[5px] w-[2px] h-[25px] bg-[#222222] rounded-l-sm z-50"></div>
                    <div className="absolute top-[130px] -left-[5px] w-[2px] h-[50px] bg-[#222222] rounded-l-sm z-50"></div>

                    {/* Outer Glow behind the phone */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-transparent to-blue-500/10 rounded-[3.2rem] blur-3xl -z-10 animate-pulse"></div>

                    {/* Inner Screen Area */}
                    <div className="relative w-full h-full bg-black overflow-hidden rounded-[2.8rem] flex flex-col pt-6 isolation-auto border border-orange-500/20">
                        
                        {/* Dynamic Island Notch - Smaller/Pro */}
                        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[80px] h-[20px] bg-black rounded-full z-[60] flex items-center justify-between px-2.5 shadow-[inset_0_0_2px_rgba(255,255,255,0.15)]">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-900/40"></div>
                            <div className="w-1 h-1 rounded-full bg-gray-950 border border-gray-800"></div>
                        </div>

                        {/* Glass Reflection Effect Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-50 mix-blend-overlay"></div>

                        {/* Status Bar */}
                        <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-7 z-40 text-white font-bold text-[10px] pointer-events-none mix-blend-difference opacity-80 pb-1">
                            <span>9:41</span>
                            <div className="flex gap-1.5 items-center">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M2 20h20M5 15h14M8 10h8M11 5h2"/></svg>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1 15v-2H8v-2h3V9l4 4-4 4z"/></svg>
                            </div>
                        </div>

                        {/* Tab Content Box */}
                        <div className="flex-1 overflow-hidden relative rounded-bl-[2.5rem] rounded-br-[2.5rem]">
                            <AnimatePresence mode="wait">
                                {activeIndex === 0 && renderChatbotUI()}
                                {activeIndex === 1 && renderWhatsAppUI()}
                                {activeIndex === 2 && renderVoiceUI()}
                            </AnimatePresence>
                        </div>
                        
                        {/* iOS Home Indicator Bar */}
                        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[100px] h-1 bg-white/30 rounded-full z-50 pointer-events-none"></div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HeroSupportUI;
