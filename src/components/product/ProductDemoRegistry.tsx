import React, { Suspense, lazy } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Loader2 } from 'lucide-react';

// Lazy load components for performance
const ChatBotDemo = lazy(() => import('./demos/ChatBotDemo'));
const VoiceAgentDemo = lazy(() => import('./demos/VoiceAgentDemo'));
const WhatsAppDemo = lazy(() => import('./demos/WhatsAppDemo'));
const WorkflowNodeDemo = lazy(() => import('./demos/WorkflowNodeDemo'));
const AnalyticsNLPDemo = lazy(() => import('./demos/AnalyticsNLPDemo'));
const WebScrapingDemo = lazy(() => import('./demos/WebScrapingDemo'));
const ContentGenerationDemo = lazy(() => import('./demos/ContentGenerationDemo'));
const SeoAutomationDemo = lazy(() => import('./demos/SeoAutomationDemo'));
const HrOnboardingDemo = lazy(() => import('./demos/HrOnboardingDemo'));
const KnowledgeBotDemo = lazy(() => import('./demos/KnowledgeBotDemo'));

interface ProductDemoRegistryProps {
    productId: string;
}

const ProductDemoRegistry: React.FC<ProductDemoRegistryProps> = ({ productId }) => {
    const { theme } = useTheme();

    const renderDemo = () => {
        switch (productId) {
            case 'ai-chatbot':
                return <ChatBotDemo />;
            case 'ai-calling-agent':
                return <VoiceAgentDemo />;
            case 'whatsapp-bot':
                return <WhatsAppDemo />;
            case 'workflow-builder':
                return <WorkflowNodeDemo />;
            case 'ai-analytics':
                return <AnalyticsNLPDemo />;
            case 'web-scraping':
                return <WebScrapingDemo />;
            case 'content-generation':
                return <ContentGenerationDemo />;
            case 'seo-automation':
                return <SeoAutomationDemo />;
            case 'hr-onboarding':
                return <HrOnboardingDemo />;
            case 'knowledge-bot':
                return <KnowledgeBotDemo />;
            // For other backend processes, fallback to generic visualization
            case 'email-automation':
            case 'crm-automation':
            case 'lead-generation':
                return <WorkflowNodeDemo />;
            default:
                return null;
        }
    };

    const demoContent = renderDemo();

    if (!demoContent) return null;

    return (
        <section className={`py-12 md:py-20 relative overflow-hidden ${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                        Interactive Live Engine
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>
                        Experience how our {productId.replace(/-/g, ' ')} works in real time.
                    </p>
                </div>
                
                <div className="flex justify-center max-w-5xl mx-auto">
                    <Suspense fallback={
                        <div className="flex items-center justify-center p-20">
                            <Loader2 className={`w-8 h-8 animate-spin ${theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}`} />
                        </div>
                    }>
                        {demoContent}
                    </Suspense>
                </div>
            </div>
        </section>
    );
};

export default ProductDemoRegistry;
