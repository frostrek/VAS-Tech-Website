import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileSignature, MonitorSmartphone, MailPlus, Check } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const TASKS = [
    { id: 1, title: 'Generate Offer Letter', icon: FileSignature, duration: 1500 },
    { id: 2, title: 'Send Welcome Email Sequence', icon: MailPlus, duration: 2000 },
    { id: 3, title: 'Provision IT Accounts (Google, Slack)', icon: MonitorSmartphone, duration: 2500 }
];

const HrOnboardingDemo = () => {
    const { theme } = useTheme();
    const [activeTask, setActiveTask] = useState(-1);
    const [completed, setCompleted] = useState<number[]>([]);

    useEffect(() => {
        let isCancelled = false;

        const runProcess = async () => {
            if (isCancelled) return;
            
            setCompleted([]);
            setActiveTask(-1);
            await new Promise(r => setTimeout(r, 1000));

            for (let i = 0; i < TASKS.length; i++) {
                if (isCancelled) return;
                setActiveTask(i);
                await new Promise(r => setTimeout(r, TASKS[i].duration));
                if (isCancelled) return;
                setCompleted(prev => [...prev, i]);
            }

            setActiveTask(-1);
            await new Promise(r => setTimeout(r, 3000));
            if (!isCancelled) runProcess();
        };

        runProcess();
        return () => { isCancelled = true; };
    }, []);

    return (
        <div className={`w-full max-w-3xl mx-auto rounded-2xl border p-6 md:p-10 ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-gray-50 border-gray-200'}`}>
            <h3 className={`text-xl font-bold mb-2 flex items-center gap-3 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                <Users className={`w-6 h-6 ${theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}`} />
                Automated Employee Onboarding
            </h3>
            <p className={`text-sm mb-8 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>
                Triggered automatically when a candidate is marked "Hired" in an ATS (e.g., Workday/Greenhouse).
            </p>

            <div className="space-y-4">
                {TASKS.map((task, idx) => {
                    const isCompleted = completed.includes(idx);
                    const isActive = activeTask === idx;
                    const Icon = task.icon;

                    return (
                        <div 
                            key={task.id}
                            className={`relative overflow-hidden p-4 rounded-xl border flex items-center gap-4 transition-all duration-300
                                ${isActive ? (theme === 'dark' ? 'bg-[#151515] border-dark-accent shadow-lg shadow-dark-accent/10' : 'bg-white border-[#B07552] shadow-lg') : ''}
                                ${isCompleted ? (theme === 'dark' ? 'bg-dark-bg border-dark-accent/20 opacity-70' : 'bg-gray-100 border-gray-200 opacity-70') : ''}
                                ${!isActive && !isCompleted ? (theme === 'dark' ? 'bg-[#0a0a0a] border-gray-800' : 'bg-white border-gray-200') : ''}
                            `}
                        >
                            {/* Loading progress bar background */}
                            {isActive && (
                                <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: '100%' }} 
                                    transition={{ duration: task.duration / 1000, ease: 'linear' }}
                                    className={`absolute left-0 top-0 bottom-0 opacity-10 z-0 ${theme === 'dark' ? 'bg-dark-accent' : 'bg-[#B07552]'}`}
                                />
                            )}

                            <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{
                                backgroundColor: isCompleted ? '#22c55e' : (isActive ? (theme === 'dark' ? '#F97316' : '#B07552') : (theme === 'dark' ? '#333' : '#e5e7eb')),
                                color: isCompleted || isActive ? '#fff' : (theme === 'dark' ? '#888' : '#9ca3af')
                            }}>
                                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                            </div>

                            <div className="relative z-10 flex-1">
                                <h4 className={`font-semibold ${isCompleted ? 'line-through' : ''} ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                                    {task.title}
                                </h4>
                                <div className="h-4 overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        {isActive && (
                                            <motion.span 
                                                key="processing"
                                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                                className={`text-xs font-mono font-medium ${theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}`}
                                            >
                                                Executing via API...
                                            </motion.span>
                                        )}
                                        {isCompleted && (
                                            <motion.span 
                                                key="done"
                                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                                className="text-xs text-green-500 font-mono"
                                            >
                                                Done.
                                            </motion.span>
                                        )}
                                        {!isActive && !isCompleted && (
                                            <motion.span 
                                                key="waiting"
                                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                                className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}
                                            >
                                                Pending
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {isActive && (
                                <div className="relative z-10">
                                    <div className="w-5 h-5 border-2 border-t-transparent border-orange-500 rounded-full animate-spin" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            
            {completed.length === TASKS.length && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className={`mt-6 p-4 rounded-xl text-center border font-bold text-green-500 flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-200'}`}
                >
                    <Check className="w-5 h-5" /> Onboarding sequence fully automated
                </motion.div>
            )}
        </div>
    );
};

export default HrOnboardingDemo;
