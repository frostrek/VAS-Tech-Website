import { useState } from 'react';
import { MapPin, Clock, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import { useTheme } from '../context/ThemeContext';

const CALENDAR_URL = 'https://calendar.app.google/zm9hU7K2Gqo2Q5Hh6';

const ScheduleDemo = () => {
    const { theme } = useTheme();
    const [calendarLoaded, setCalendarLoaded] = useState(false);

    return (
        <div className={`min-h-screen pt-32 pb-24 relative overflow-hidden ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#FAFAFA]'}`}>
            {theme === 'dark' && <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,0.06)_0%,_transparent_70%)] pointer-events-none" />}
            {theme !== 'dark' && <CuteBackground />}
            
            <div className="container mx-auto px-4 md:px-8 xl:px-0 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 max-w-[1100px] mx-auto items-center">
                    
                    {/* Left Column - Company Info */}
                    <div className={`relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 border transition-all ${theme === 'dark' ? 'bg-[#080808] border-orange-500/20 shadow-2xl' : 'bg-white border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'}`}>
                        {theme === 'dark' && <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />}
                        
                        <div className="relative z-10">
                            <div className="mb-12">
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10.5px] font-black tracking-widest uppercase mb-7 border ${theme === 'dark' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-amber-50 text-amber-600 border-amber-200'}`}>
                                    VAS TECH EXCLUSIVE
                                </div>
                                
                                <h1 className={`text-4xl md:text-5xl lg:text-[4rem] font-serif font-semibold mb-6 leading-[1.1] ${theme === 'dark' ? 'bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent' : 'text-gray-900'}`}>
                                    Schedule a<br/>Demo
                                </h1>
                                
                                <p className={`text-base md:text-[17px] leading-relaxed max-w-[90%] ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                                    Meet with our team to discover how VAS Tech can transform your business with AI-powered automation.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {[
                                    {
                                        icon: Clock,
                                        title: 'Meeting Duration',
                                        desc: '30 minutes'
                                    },
                                    {
                                        icon: MapPin,
                                        title: 'Meeting Location',
                                        desc: 'Microsoft Teams / Google Meet'
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-5 group">
                                        <div className={`w-14 h-14 rounded-[1.25rem] flex items-center justify-center flex-shrink-0 shadow-lg transition-transform group-hover:scale-105 duration-300 ${theme === 'dark' ? 'bg-[#111] border border-orange-500/20' : 'bg-amber-50 border border-amber-100'}`}>
                                            <item.icon className={`w-[22px] h-[22px] ${theme === 'dark' ? 'text-orange-400' : 'text-amber-600'}`} />
                                        </div>
                                        <div className="pt-2.5">
                                            <h3 className={`text-[15px] font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                                            <p className={`text-[14px] ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex items-start gap-5 group">
                                    <div className={`w-14 h-14 rounded-[1.25rem] flex items-center justify-center flex-shrink-0 shadow-lg transition-transform group-hover:scale-105 duration-300 ${theme === 'dark' ? 'bg-[#111] border border-orange-500/20' : 'bg-amber-50 border border-amber-100'}`}>
                                        <CalendarIcon className={`w-[22px] h-[22px] ${theme === 'dark' ? 'text-orange-400' : 'text-amber-600'}`} />
                                    </div>
                                    <div className="pt-2">
                                        <h3 className={`text-[15px] font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>What to Expect</h3>
                                        <ul className={`space-y-2.5 text-[14.5px] font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                                            <li className="flex items-center gap-3"><div className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-orange-500' : 'bg-amber-500'}`} /> Product walkthrough</li>
                                            <li className="flex items-center gap-3"><div className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-orange-500' : 'bg-amber-500'}`} /> Q&A session</li>
                                            <li className="flex items-center gap-3"><div className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-orange-500' : 'bg-amber-500'}`} /> Custom solution discussion</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Google Calendar Booking */}
                    <div className={`relative rounded-[2.5rem] shadow-2xl p-2 md:p-3 overflow-hidden border transition-all ${theme === 'dark' ? 'bg-[#0F0F0F] border-orange-500/20' : 'bg-white border-gray-100'}`}>
                        {theme === 'dark' && <div className="absolute top-1/4 -right-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] pointer-events-none" />}
                        
                        <div className={`relative w-full min-h-[500px] md:min-h-[640px] rounded-[2rem] overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-[#FAFAFA]'}`}>
                            {/* Loading state indicator */}
                            {!calendarLoaded && (
                                <div className={`absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-[2rem] ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-[#FAFAFA]'}`}>
                                    <div className={`w-10 h-10 rounded-full border-[3px] border-t-transparent animate-spin ${theme === 'dark' ? 'border-orange-500/30 border-t-orange-500' : 'border-amber-500/30 border-t-amber-500'}`} />
                                    <p className={`text-[13px] font-bold tracking-widest uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}`}>
                                        Connecting to Calendar...
                                    </p>
                                </div>
                            )}
                            
                            <iframe
                                src={CALENDAR_URL}
                                style={{
                                    border: 0,
                                    opacity: calendarLoaded ? 1 : 0,
                                    transition: 'opacity 0.8s ease-in-out',
                                    filter: theme === 'dark' ? 'invert(0.92) hue-rotate(180deg) sepia(0.2) brightness(0.95) contrast(0.85)' : 'none',
                                    WebkitFilter: theme === 'dark' ? 'invert(0.92) hue-rotate(180deg) sepia(0.2) brightness(0.95) contrast(0.85)' : 'none',
                                }}
                                width="100%"
                                height="640"
                                title="Schedule a Demo"
                                className="w-full min-h-[500px] md:min-h-[640px] rounded-[2rem]"
                                loading="eager"
                                onLoad={() => setCalendarLoaded(true)}
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleDemo;
