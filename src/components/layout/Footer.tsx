import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Linkedin, Instagram, Mail, ArrowUp, Sparkles, MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { NAV_ITEMS, COMPANY_INFO } from '../../utils/constants';



const Footer = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  const footerRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);



  // Intersection Observer for footer reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);





  const handleLocationClick = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(COMPANY_INFO.address), '_blank');
  };



  return (
    <>
      <style>{`
        /* ... (keep existing animations) ... */
        @keyframes footerReveal { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes underlineExpand { from { width: 0; } to { width: 100%; } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes linkFadeIn { from { opacity: 0; transform: translateX(-4px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes emailShimmer { 0% { left: -100%; } 100% { left: 200%; } }
        @keyframes ripple { 0% { transform: scale(0); opacity: 0.6; } 100% { transform: scale(2); opacity: 0; } }
        @keyframes networkPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }

        .footer-revealed { animation: footerReveal 300ms ease-out forwards; }
        .section-title { position: relative; display: inline-block; }
        .section-title::after { content: ''; position: absolute; bottom: -4px; left: 0; height: 2px; background: rgba(176, 117, 82, 0.5); width: 0; }
        .footer-revealed .section-title::after { animation: underlineExpand 400ms ease-out 150ms forwards; }
        .footer-link { position: relative; display: inline-block; transition: color 150ms ease-out; }
        .footer-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100%; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform 200ms ease-out; }
        .footer-link:hover::after { transform: scaleX(1); }
        .footer-revealed .footer-link { animation: linkFadeIn 300ms ease-out forwards; }
        .social-icon { position: relative; overflow: hidden; transition: all 150ms ease-out; }
        .social-icon:hover { transform: translateY(-2px); }
        .social-icon:active { transform: translateY(1px); }
        .social-icon::before { content: ''; position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; background: rgba(255, 255, 255, 0.5); border-radius: 50%; transform: translate(-50%, -50%) scale(0); pointer-events: none; }
        .social-icon:active::before { animation: ripple 600ms ease-out; }
        .iso-badge { transition: all 200ms ease-out; }
        .iso-badge:hover { transform: scale(1.02); box-shadow: 0 0 12px rgba(176, 117, 82, 0.3); }

        .feedback-tab { transition: all 200ms ease-out; }
        .feedback-tab:hover { padding-right: 20px; }
        .feedback-panel { animation: slideIn 280ms ease-out; }
        .careers-card { transition: all 200ms ease-out; }
        .careers-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); }
        .careers-card:active { transform: translateY(2px); }
        .careers-icon { transition: opacity 200ms ease-out; }
        .careers-card:hover .careers-icon { opacity: 1; }
        .network-node { animation: networkPulse 3s ease-in-out infinite; }
        .network-node:nth-child(1) { animation-delay: 0s; }
        .network-node:nth-child(2) { animation-delay: 0.6s; }
        .network-node:nth-child(3) { animation-delay: 1.2s; }
        .network-node:nth-child(4) { animation-delay: 1.8s; }
        .back-to-top { animation: fadeSlideUp 250ms ease-out; }
        .back-to-top:hover .arrow-icon { transform: translateY(-2px); }
        .arrow-icon { transition: transform 150ms ease-out; }
        .copy-notification { animation: copyPulse 200ms ease-out; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* Careers Banner CTA - Hide on contact page */}
      {location.pathname !== '/contact' && (
        <div className={`py-4 md:py-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-[#FAFAFA]'}`}>
          <div className="container mx-auto px-4 md:px-6">
            <div className={`max-w-[900px] mx-auto rounded-2xl p-5 md:p-6 lg:p-8 transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6
              ${theme === 'dark' 
                ? 'bg-[#111110] border border-orange-500/20 shadow-xl shadow-black/50' 
                : 'bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)]'}`}
            >
              <div className="flex-1 text-center md:text-left">
                <h3 className={`font-sans text-2xl md:text-3xl font-bold tracking-tight mb-2 flex flex-wrap items-center justify-center md:justify-start gap-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Build the Future of AI
                  <div className={`w-[36px] h-[36px] rounded-lg flex items-center justify-center -rotate-3 ${theme === 'dark' ? 'bg-dark-accent/10' : 'bg-[#FFFBEB]'}`}>
                    <Sparkles className={`w-[18px] h-[18px] ${theme === 'dark' ? 'text-dark-accent' : 'text-[#F59E0B]'}`} />
                  </div>
                </h3>
                <p className={`font-sans text-sm md:text-base leading-relaxed max-w-[480px] mx-auto md:mx-0 ${theme === 'dark' ? 'text-[#A1A1AA]' : 'text-gray-500'}`}>
                  Join our team of innovators solving real-world problems. Discover careers where your work truly matters.
                </p>
              </div>
              
              <div className="flex-shrink-0 mt-4 md:mt-0">
                <Link to="/contact" className={`font-sans inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold transition-all duration-300 rounded-full
                   ${theme === 'dark' 
                     ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-white hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:-translate-y-0.5' 
                     : 'bg-gradient-to-r from-orange-500 to-amber-400 text-white hover:shadow-lg hover:-translate-y-0.5'}`}>
                  <span className="flex items-center gap-2">
                     Explore Opportunities 
                     <svg className="w-4 h-4 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                     </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        ref={footerRef}
        className={`border-t pt-8 pb-4 transition-colors duration-300 ${isVisible ? 'footer-revealed' : 'opacity-0'} ${theme === 'dark' ? 'bg-dark-navbar border-dark-accent/20' : 'bg-gradient-to-b from-white to-gray-50 border-gray-200'}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
            {/* Brand & Info (Left - Uses 3/12 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 group">
                  <Link to="/" className="flex items-center group">
                    <img src="/VAS_logo.png" alt="VAS Tech Logo" className="h-14 w-auto transition-all transition-transform group-hover:scale-110 brightness-110 contrast-125 saturate-150" />
                  </Link>
                  {/* ISO Badges - Now Next to Logo */}
                  <div className="flex items-center gap-2">
                    <div className={`iso-badge px-2 py-0.5 border rounded text-[10px] font-bold tracking-wide transition-colors ${theme === 'dark' ? 'bg-dark-card border-dark-accent/30 text-dark-accent' : 'bg-[#FDFBF7] border-[#E6D0C6] text-[#8A5A35]'}`}>
                      ISO 27001
                    </div>
                    <div className={`iso-badge px-2 py-0.5 border rounded text-[10px] font-bold tracking-wide transition-colors ${theme === 'dark' ? 'bg-dark-card border-dark-accent/30 text-dark-accent' : 'bg-[#FDFBF7] border-[#E6D0C6] text-[#8A5A35]'}`}>
                      ISO 9001
                    </div>
                  </div>
                </div>

                <p className={`text-sm leading-relaxed max-w-sm ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                  Empowering industries through AI, automation, and innovation - one intelligent solution at a time.
                </p>
              </div>


              {/* Social Icons - Moved here */}
              <div className="flex items-center gap-3 flex-wrap">
                <a href={COMPANY_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className={`social-icon w-8 h-8 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-dark-card text-dark-accent hover:bg-dark-accent hover:text-white' : 'bg-[#fdfbf7] text-[#B07552] hover:bg-[#B07552] hover:text-white'}`}><Linkedin size={16} /></a>
                <a href={COMPANY_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className={`social-icon w-8 h-8 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-dark-card text-dark-accent hover:bg-dark-accent hover:text-white' : 'bg-[#fdfbf7] text-[#B07552] hover:bg-[#B07552] hover:text-white'}`}><Instagram size={16} /></a>
                <a href="https://wa.me/17574722491" target="_blank" rel="noopener noreferrer" className={`social-icon group w-8 h-8 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-dark-card text-dark-accent hover:bg-dark-accent hover:text-white' : 'bg-[#fdfbf7] text-[#B07552] hover:bg-[#B07552] hover:text-white'}`}><img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain transition-all group-hover:brightness-0 group-hover:invert" /></a>
                <a href="mailto:contact@vastech.com" className={`social-icon w-8 h-8 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-dark-card text-dark-accent hover:bg-dark-accent hover:text-white' : 'bg-[#fdfbf7] text-[#B07552] hover:bg-[#B07552] hover:text-white'}`}><Mail size={16} /></a>
              </div>
            </div>

            {/* Links (Right - Uses 9/12 cols) */}
            <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Products */}
              <div className="space-y-3">
                <h4 className={`section-title font-semibold mb-2 text-sm uppercase tracking-wider ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Products</h4>
                <ul className="space-y-2">
                  {NAV_ITEMS.find(n => n.label === 'Products')?.megaMenu?.flatMap(s => s.items).slice(0, 5).map(item => (
                    <li key={item.name}>
                      <Link to={item.href} className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div className="space-y-3">
                <h4 className={`section-title font-semibold mb-2 text-sm uppercase tracking-wider ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Solutions</h4>
                <ul className="space-y-2">
                  {NAV_ITEMS.find(n => n.label === 'Solutions')?.megaMenu?.flatMap(s => s.items).map(item => (
                    <li key={item.name}>
                      <Link to={item.href} className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>{item.name}</Link>
                    </li>
                  ))}
                  <li>
                    <a href="https://vastech.com/" target="_blank" rel="noopener noreferrer" className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>AI Training</a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-3">
                <h4 className={`section-title font-semibold mb-2 text-sm uppercase tracking-wider ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Company</h4>
                <ul className="space-y-2">
                  <li><Link to="/about" className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>About Us</Link></li>
                  <li><Link to="/experience" className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>Experience</Link></li>
                  <li><Link to="/resources" className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>Resources</Link></li>
                  <li><Link to="/schedule-demo" className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>Schedule Demo</Link></li>
                  <li><Link to="/contact" className={`footer-link text-sm ${theme === 'dark' ? 'text-dark-text-muted hover:text-dark-accent' : 'text-gray-600 hover:text-[#B07552]'}`}>Contact</Link></li>
                </ul>
              </div>

              {/* Connect (Map only) */}
              <div className="space-y-3">
                <h4 className={`section-title font-semibold mb-3 text-xs uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>Our Headquarters</h4>

                {/* Embedded Map - Slim & Refined */}
                <div ref={locationRef} onClick={handleLocationClick} className={`relative w-full h-32 rounded-2xl overflow-hidden shadow-2xl border group cursor-pointer transition-all duration-500 ${theme === 'dark' ? 'border-orange-500/20 bg-black hover:border-orange-500/30' : 'border-gray-200 bg-gray-50 hover:shadow-xl'}`}>
                  <iframe
                    title="Office Location"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    src="https://maps.google.com/maps?q=McNicholl%20Circle,%20St%20Catharines,%20Ontario%20L2N%207C5&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="transition-opacity duration-300 opacity-80 group-hover:opacity-100"
                    style={{ filter: theme === 'dark' ? 'grayscale(1) invert(90%) contrast(1.2) brightness(0.8)' : 'grayscale(0.2)' }}
                  ></iframe>

                  {/* Address Badge - Sleek Glassmorphic */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 z-[400]">
                    <div className={`px-3 py-2 rounded-xl backdrop-blur-md border flex items-center gap-2 shadow-2xl transform group-hover:-translate-y-1 transition-transform duration-300 ${theme === 'dark' ? 'bg-black/60 text-white border-orange-500/20' : 'bg-white/80 text-gray-900 border-gray-200'}`}>
                      <div className={`p-1.5 rounded-lg ${theme === 'dark' ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
                        <MapPin size={12} fill="currentColor" fillOpacity={0.2} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold tracking-tight">St Catharines, ON</span>
                        <span className="text-[8px] opacity-60 font-medium">VAS Tech Global HQ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`text-center pt-4 border-t ${theme === 'dark' ? 'border-dark-accent/10' : 'border-gray-200'} text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            &copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </div>

        </div>
      </footer >


    </>
  );
};

export default Footer;
