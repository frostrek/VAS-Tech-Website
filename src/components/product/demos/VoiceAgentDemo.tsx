import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Phone, PhoneOff, Volume2, Activity } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const TRANSCRIPT = [
    { role: 'agent', text: "Hi, this is Vas Tech calling from Wellness Clinics. Am I speaking with Sarah?" },
    { role: 'user', text: "Yes, this is Sarah." },
    { role: 'agent', text: "Great. I'm calling to confirm your appointment for tomorrow at 2:00 PM. Does that time still work for you?" },
    { role: 'user', text: "Actually, I need to reschedule. Something came up." },
    { role: 'agent', text: "No problem at all. We have openings this Thursday at 10:00 AM or Friday at 3:30 PM. Would either of those work?" },
    { role: 'user', text: "Thursday at 10 works perfect." },
    { role: 'agent', text: "Excellent, I've updated your appointment to Thursday at 10:00 AM. We'll see you then!" }
];

const VoiceAgentDemo = () => {
    const { theme } = useTheme();
    const [isActive, setIsActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(-1);
    
    useEffect(() => {
        if (!isActive) {
            setCurrentStep(-1);
            return;
        }
        
        let timeout: NodeJS.Timeout;
        const advanceStep = () => {
            setCurrentStep(prev => {
                const next = prev + 1;
                if (next < TRANSCRIPT.length) {
                    timeout = setTimeout(advanceStep, TRANSCRIPT[next].role === 'agent' ? 2500 : 1500);
                    return next;
                }
                setTimeout(() => setIsActive(false), 2000);
                return prev;
            });
        };
        
        timeout = setTimeout(advanceStep, 500);
        return () => clearTimeout(timeout);
    }, [isActive]);

    // Waveform simulation
    const bars = Array.from({ length: 40 });

    return (
        <div className={`w-full max-w-4xl mx-auto rounded-2xl border overflow-hidden p-6 md:p-10 ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-white border-gray-200'} shadow-2xl`}>
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <div>
                    <h3 className={`text-2xl font-bold flex items-center gap-3 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${isActive ? (theme === 'dark' ? 'bg-dark-accent/20 border-dark-accent text-dark-accent' : 'bg-[#B07552]/20 border-[#B07552] text-[#B07552]') : (theme === 'dark' ? 'bg-dark-bg border-dark-accent/10 text-dark-text-muted' : 'bg-gray-50 border-gray-200 text-gray-400')}`}>
                            <Phone className="w-5 h-5" />
                        </div>
                        Live Call Simulation
                    </h3>
                    <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>
                        Ultra-low latency conversational voice agent in action.
                    </p>
                </div>

                <button 
                    onClick={() => setIsActive(!isActive)}
                    className={`
                        px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all
                        ${isActive 
                            ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20' 
                            : (theme === 'dark' ? 'bg-dark-accent text-dark-bg hover:bg-dark-accent/90' : 'bg-[#B07552] text-white hover:bg-[#8A5A35]')
                        }
                    `}
                >
                    {isActive ? <PhoneOff className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
                    {isActive ? 'End Call' : 'Start Demo Call'}
                </button>
            </div>

            {/* Visualizer & Transcript Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* Audio Visualizer */}
                <div className={`p-8 rounded-2xl flex flex-col items-center justify-center border ${theme === 'dark' ? 'bg-[#0a0a0a] border-dark-accent/20' : 'bg-gray-50 border-gray-200'} min-h-[300px]`}>
                    <div className="relative mb-8">
                        {isActive && (
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className={`absolute inset-0 rounded-full blur-2xl ${theme === 'dark' ? 'bg-dark-accent/30' : 'bg-[#B07552]/30'}`}
                            />
                        )}
                        <div className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-inner z-10 ${theme === 'dark' ? 'bg-dark-card border border-dark-accent/30' : 'bg-white border border-[#B07552]/30'}`}>
                            <Mic className={`w-10 h-10 ${isActive ? (theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]') : (theme === 'dark' ? 'text-gray-600' : 'text-gray-300')}`} />
                        </div>
                    </div>

                    <div className="flex items-center gap-1 h-16 px-4 w-full justify-center">
                        {bars.map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: '4px' }}
                                animate={{ 
                                    height: isActive 
                                        ? `${Math.random() * (currentStep >= 0 && TRANSCRIPT[currentStep]?.role === 'agent' ? 60 : 20) + 4}px` 
                                        : '4px' 
                                }}
                                transition={{ duration: 0.1, repeat: isActive ? Infinity : 0, repeatType: "mirror" }}
                                className={`w-1.5 rounded-full ${isActive ? (theme === 'dark' ? 'bg-dark-accent' : 'bg-[#B07552]') : (theme === 'dark' ? 'bg-dark-accent/20' : 'bg-gray-200')}`}
                            />
                        ))}
                    </div>

                    <div className={`mt-6 flex items-center gap-2 text-sm font-mono ${isActive ? 'text-green-500' : (theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500')}`}>
                        <Activity className="w-4 h-4" />
                        {isActive ? 'Processing Latency: ~320ms' : 'Status: Idle'}
                    </div>
                </div>

                {/* Transcript Log */}
                <div className={`p-6 rounded-2xl border flex flex-col h-[300px] ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/20' : 'bg-white border-gray-200'}`}>
                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}`}>
                        <Volume2 className="w-4 h-4" />
                        Live Transcript
                    </h4>
                    
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        {!isActive && currentStep === -1 && (
                            <div className={`h-full flex items-center justify-center text-sm italic ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-400'}`}>
                                Click 'Start Demo Call' to begin...
                            </div>
                        )}
                        {TRANSCRIPT.slice(0, currentStep + 1).map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                            >
                                <span className={`text-[10px] uppercase font-bold mb-1 opacity-50 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-600'}`}>
                                    {msg.role === 'agent' ? 'AI Agent' : 'Customer'}
                                </span>
                                <div className={`px-4 py-2 rounded-xl text-sm max-w-[90%] border ${
                                    msg.role === 'agent' 
                                        ? (theme === 'dark' ? 'bg-dark-accent/10 border-dark-accent/30 text-dark-text' : 'bg-[#B07552]/10 border-[#B07552]/30 text-gray-900') 
                                        : (theme === 'dark' ? 'bg-dark-card border-dark-accent/10 text-dark-text-muted' : 'bg-gray-50 border-gray-200 text-gray-600')
                                }`}>
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceAgentDemo;
