import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, ChevronRight, Activity, Zap } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const CHAT_SEQUENCE = [
    { type: 'user', text: "Hi, I have a problem with my recent order #49201." },
    { type: 'bot', text: "I can help with that. Give me a moment to pull up order #49201.", delay: 500, intent: "Support / Check Order" },
    { type: 'bot', text: "I see your order for the 'Pro Wireless Headphones' was delayed in transit. It is currently at our regional hub and will be delivered tomorrow.", delay: 1500, status: "Resolution Found" },
    { type: 'user', text: "Thanks. Can I get a refund for the shipping fee?" },
    { type: 'bot', text: "Absolutely. I've processed a refund of $15.00 for the expedited shipping fee. It will appear on your card in 1-3 business days.", delay: 1000, intent: "Billing / Refund" },
    { type: 'user', text: "Perfect, that's all I needed." },
    { type: 'bot', text: "You're welcome! Is there anything else I can assist you with today?", delay: 600 }
];

const ChatBotDemo = () => {
    const { theme } = useTheme();
    const [messages, setMessages] = useState<any[]>([]);
    const [step, setStep] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    useEffect(() => {
        if (step >= CHAT_SEQUENCE.length) return;

        const nextMessage = CHAT_SEQUENCE[step];
        
        let timeout: ReturnType<typeof setTimeout>;
        
        if (nextMessage.type === 'bot') {
            setIsTyping(true);
            timeout = setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, nextMessage]);
                setStep(s => s + 1);
            }, nextMessage.delay || 1000);
        } else {
            timeout = setTimeout(() => {
                setMessages(prev => [...prev, nextMessage]);
                setStep(s => s + 1);
            }, 800);
        }

        return () => clearTimeout(timeout);
    }, [step]);

    const handleReset = () => {
        setMessages([]);
        setStep(0);
        setIsTyping(false);
    };

    return (
        <div className={`w-full rounded-2xl border overflow-hidden flex flex-col md:flex-row ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-white border-gray-200'}`}>
            
            {/* Chat Area */}
            <div className={`flex-1 flex flex-col h-[500px] border-b md:border-b-0 md:border-r ${theme === 'dark' ? 'border-zinc-800/50 bg-[#0a0a0a]' : 'border-gray-200 bg-gray-50'}`}>
                {/* Chat Header */}
                <div className={`p-4 border-b flex items-center gap-3 ${theme === 'dark' ? 'bg-dark-card border-zinc-800/50' : 'bg-white border-gray-200'}`}>
                    <div className="relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-dark-accent/20 text-dark-accent' : 'bg-orange-500/10 text-orange-500'}`}>
                            <Bot className="w-5 h-5" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-dark-bg"></div>
                    </div>
                    <div>
                        <h4 className={`font-semibold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>AI Support Agent</h4>
                        <p className="text-xs text-green-500 font-medium">Online</p>
                    </div>
                </div>

                {/* Messages List */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col scroll-smooth">
                    <AnimatePresence>
                        {messages.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex items-end gap-2 max-w-[80%]`}>
                                    {msg.type === 'bot' && (
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mb-1 ${theme === 'dark' ? 'bg-dark-accent/20 text-dark-accent' : 'bg-orange-500/10 text-orange-500'}`}>
                                            <Bot className="w-3 h-3" />
                                        </div>
                                    )}
                                    <div className={`
                                        p-3 rounded-2xl text-sm
                                        ${msg.type === 'user' 
                                            ? (theme === 'dark' ? 'bg-dark-accent text-dark-bg rounded-br-sm' : 'bg-orange-500 text-white rounded-br-sm')
                                            : (theme === 'dark' ? 'bg-dark-bg border border-dark-accent/20 text-dark-text-muted rounded-bl-sm' : 'bg-white border border-gray-200 text-gray-700 rounded-bl-sm')
                                        }
                                    `}>
                                        {msg.text}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-start"
                        >
                            <div className={`flex items-end gap-2 max-w-[80%]`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mb-1 ${theme === 'dark' ? 'bg-dark-accent/20 text-dark-accent' : 'bg-orange-500/10 text-orange-500'}`}>
                                    <Bot className="w-3 h-3" />
                                </div>
                                <div className={`px-4 py-3 rounded-2xl rounded-bl-sm ${theme === 'dark' ? 'bg-dark-bg border border-dark-accent/20' : 'bg-white border border-gray-200'}`}>
                                    <div className="flex gap-1">
                                        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-dark-accent/50' : 'bg-orange-500/50'}`} />
                                        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-dark-accent/50' : 'bg-orange-500/50'}`} />
                                        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-dark-accent/50' : 'bg-orange-500/50'}`} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Chat Input */}
                <div className={`p-4 border-t ${theme === 'dark' ? 'bg-dark-card border-zinc-800/50' : 'bg-white border-gray-200'}`}>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/20' : 'bg-gray-50 border-gray-200'}`}>
                        <div className={`flex-1 text-sm ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-400'}`}>
                            {step >= CHAT_SEQUENCE.length ? 'Conversation ended' : 'User typing...'}
                        </div>
                        <button disabled className={`p-1.5 rounded-full ${theme === 'dark' ? 'bg-dark-accent text-dark-bg opacity-50' : 'bg-orange-500 text-white opacity-50'}`}>
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                    {step >= CHAT_SEQUENCE.length && (
                        <div className="mt-3 text-center">
                            <button onClick={handleReset} className={`text-xs font-medium ${theme === 'dark' ? 'text-dark-accent hover:text-orange-400' : 'text-orange-600 hover:text-orange-700'}`}>
                                Restart Demo
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* AI Insights Panel */}
            <div className={`w-full md:w-64 p-6 flex flex-col ${theme === 'dark' ? 'bg-dark-bg' : 'bg-orange-50/5'}`}>
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-dark-accent' : 'text-orange-500'}`}>
                    <Activity className="w-4 h-4" />
                    Agent Insights
                </h4>

                <div className="space-y-6 flex-1">
                    {/* Live Intent */}
                    <div>
                        <div className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>Current Intent Processing</div>
                        <AnimatePresence mode="popLayout">
                            {messages.filter(m => m.type === 'bot' && (m.intent || m.status)).slice(-1).map((msg, i) => (
                                <motion.div 
                                    key={`intent-${step}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`px-3 py-2 border rounded-lg text-sm flex items-center gap-2 ${theme === 'dark' ? 'border-dark-accent/30 bg-dark-accent/10 text-dark-accent' : 'border-orange-500/30 bg-orange-500/10 text-orange-700'}`}
                                >
                                    <Zap className="w-3.5 h-3.5" />
                                    {msg.intent || msg.status}
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`px-3 py-2 border border-dashed rounded-lg text-sm text-center ${theme === 'dark' ? 'border-dark-accent/30 text-dark-text-muted' : 'border-gray-300 text-gray-500'}`}
                                >
                                    Analyzing intent...
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Backend Action Logs */}
                    <div>
                        <div className={`text-xs font-semibold mb-3 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>Backend Execution</div>
                        <div className="space-y-2">
                            {step > 1 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-xs p-2 rounded flex items-center gap-2 ${theme === 'dark' ? 'bg-dark-card text-green-400' : 'bg-white text-green-600 border border-gray-100'}`}>
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> API: lookup_order(49201)
                                </motion.div>
                            )}
                            {step > 4 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-xs p-2 rounded flex items-center gap-2 ${theme === 'dark' ? 'bg-dark-card text-blue-400' : 'bg-white text-blue-600 border border-gray-100'}`}>
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> API: issue_refund(15.00)
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={`mt-auto pt-4 border-t ${theme === 'dark' ? 'border-dark-accent/20' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-center text-xs">
                        <span className={theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}>Latency</span>
                        <span className={`font-mono text-green-500`}>142ms</span>
                    </div>
                    <div className="flex justify-between items-center text-xs mt-1">
                        <span className={theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}>Cost</span>
                        <span className={`font-mono ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>{`< $0.01`}</span>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default ChatBotDemo;
