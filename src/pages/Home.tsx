import HeroSection from '../components/home/HeroSection';
import AISolutionsShowcase from '../components/home/AISolutionsShowcase';
import TrustedBySection from '../components/home/TrustedBySection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';
import { useSEO } from '../hooks/useSEO';

const Home = () => {
    useSEO({
        title: 'AI-Powered Enterprise Solutions & Conversational AI Agents',
        description: 'Transform your business with VAS Tech\'s cutting-edge AI solutions. Explore conversational AI agents, intelligent automation, and enterprise-grade AI copilots.',
        canonical: 'https://vastechconsulting.com/',
        schema: {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "VAS Tech",
            "url": "https://vastechconsulting.com",
            "logo": "https://vastechconsulting.com/logo.png",
            "description": "Transform your business with VAS Tech's cutting-edge AI solutions. Explore conversational AI agents, intelligent automation, and enterprise-grade AI copilots.",
            "sameAs": [
                "https://www.linkedin.com/company/vas-tech"
            ]
        }
    });

    return (
        <div className="min-h-screen relative bg-dark-bg text-dark-text">
            <HeroSection />
            <AISolutionsShowcase />
            <TrustedBySection />
            <FeaturesSection />
            <TestimonialsSection />
            <FAQSection />
            <CTASection />
        </div>
    );
};

export default Home;
