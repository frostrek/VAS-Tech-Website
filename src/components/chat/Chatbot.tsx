import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { X, Send, Sparkles, Mic, Square, Paperclip, Trash2, Minus } from 'lucide-react';

// Webhook URL
const WEBHOOK_URL = 'https://n8n.vastech.com/webhook/cac2fab9-d171-4d67-8587-9ac8d834f436';

// --- ID Helpers ---
function getOrCreateUserId(): string {
    let userId = localStorage.getItem('user_id');
    if (!userId) {
        userId = 'UID-' + crypto.randomUUID();
        localStorage.setItem('user_id', userId);
    }
    return userId;
}

function getOrCreateSessionId(): string {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
}

// Color Scheme - AI Copilot Theme
// Color Scheme - VAS Tech Pro Theme
const COLORS = {
    primary: '#F97316', // Orange
    primaryDark: '#EA580C',
    primaryLight: '#FDBA74',
    accent: '#FACC15', // Yellow
    accentLight: '#FEF08A',
    background: '#050505', // Pitch Black
    card: '#111111',       // Dark Gray
    text: '#F9FAFB',
    textLight: '#A1A1AA',
    white: '#FFFFFF',
    border: 'rgba(255, 255, 255, 0.1)',
};

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', content: string, image?: string }>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Persistent IDs
    const [userId] = useState<string>(() => getOrCreateUserId());
    const [sessionId] = useState<string>(() => getOrCreateSessionId());
    const [conversationId, setConversationId] = useState<string>(() => crypto.randomUUID());

    // Audio Recording State
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const dragControls = useDragControls();


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);


    const toggleChat = () => setIsOpen(!isOpen);

    const clearChat = () => {
        setMessages([]);
        setMessage('');
        setSelectedFile(null);
        setConversationId(crypto.randomUUID()); // New conversation

        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };


    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // 20MB size limit
        const MAX_SIZE = 20 * 1024 * 1024; // 20MB in bytes

        if (file.size > MAX_SIZE) {
            setMessages(prev => [
                ...prev,
                {
                    type: 'bot',
                    content: `⚠️ File too large. Maximum allowed size is 20MB. Your file size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`
                }
            ]);

            // Reset input so user can reselect
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            return;
        }

        setSelectedFile(file);

        setMessages(prev => [
            ...prev,
            { type: 'user', content: `📎 File selected: ${file.name}` }
        ]);
    };


    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                handleSendMessage(undefined, audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Cannot access microphone. Please check permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleSendMessage = async (textInput?: string, audioBlob?: Blob) => {
        if (!textInput && !audioBlob && !selectedFile) return;

        setIsLoading(true);

        if (textInput) {
            setMessages(prev => [...prev, { type: 'user', content: textInput }]);
            setMessage('');
        } else if (audioBlob) {
            setMessages(prev => [...prev, { type: 'user', content: '🎤 Audio Message Sent' }]);
        }

        try {
            let response;
            const messageId = crypto.randomUUID();

            if (audioBlob) {
                // Voice: multipart/form-data
                const formData = new FormData();
                formData.append('audio', audioBlob, 'voice-message.webm');
                formData.append('user_id', userId);
                formData.append('session_id', sessionId);
                formData.append('conversation_id', conversationId);
                formData.append('message_id', messageId);
                formData.append('message', '[Voice message]');
                formData.append('type', 'voice');

                response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    body: formData,
                });
            } else if (selectedFile) {
                // Image: multipart/form-data
                const formData = new FormData();
                formData.append('image', selectedFile);
                formData.append('user_id', userId);
                formData.append('session_id', sessionId);
                formData.append('conversation_id', conversationId);
                formData.append('message_id', messageId);
                formData.append('message', textInput || '[Image]');
                formData.append('type', 'image');

                response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    body: formData,
                });
            } else {
                // Text: application/json
                const payload = {
                    user_id: userId,
                    session_id: sessionId,
                    conversation_id: conversationId,
                    message_id: messageId,
                    message: textInput || '',
                    type: 'text',
                };

                console.log('Sending JSON payload:', payload);
                response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            }

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            // hello 
            const contentType = response.headers.get('content-type') || '';

            if (contentType.includes('audio/')) {
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);

                setMessages(prev => [
                    ...prev,
                    { type: 'bot', content: '🔊 Playing voice response…' }
                ]);

                // const audio = new Audio()  ;
                // audio.src = audioUrl;
                // audio.preload = 'auto';

                // audio.oncanplaythrough = () => {
                //     audio.play().catch(err => {
                //         console.error('Autoplay blocked:', err);
                //     });
                // };

                // audio.onerror = (e) => {
                //     console.error('Audio playback error', e);
                // };

                const audio = new Audio(audioUrl);
                audio.preload = 'auto';

                try {
                    await audio.play(); // user already interacted → autoplay allowed
                } catch (err) {
                    console.error('Audio play failed:', err);
                }

                return;
            } else if (contentType.includes('image/')) {
                const imageBlob = await response.blob();
                const imageUrl = URL.createObjectURL(imageBlob);

                setMessages(prev => [
                    ...prev,
                    { type: 'bot', content: 'Here is the generated image:', image: imageUrl }
                ]);

                return;
            }
            else {
                const rawText = await response.text();
                console.log('Raw Server Response:', rawText);

                if (!rawText) {
                    setMessages(prev => [
                        ...prev,
                        { type: 'bot', content: textInput ? '✅ Message received.' : '✅ Voice received. Processing…' }
                    ]);
                    return;
                }

                let data: any;

                try {
                    data = JSON.parse(rawText);
                    console.log('=== FULL PARSED RESPONSE ===');
                    console.log('Type:', typeof data);
                    console.log('Is Array:', Array.isArray(data));
                    console.log('Data:', JSON.stringify(data, null, 2));
                    if (Array.isArray(data)) {
                        console.log('Array Length:', data.length);
                        console.log('First Item:', data[0]);
                    }
                    console.log('Keys:', Object.keys(data));
                    console.log('===========================');
                } catch {
                    console.log('Could not parse JSON, displaying raw text');
                    setMessages(prev => [
                        ...prev,
                        { type: 'bot', content: rawText }
                    ]);
                    return;
                }

                // Try to extract the bot response from various possible structures
                let botText: string | undefined;

                // Handle array response (n8n often returns arrays)
                if (Array.isArray(data)) {
                    const firstItem = data[0];
                    if (firstItem) {
                        console.log('First array item keys:', Object.keys(firstItem));
                        botText =
                            firstItem.reply ||
                            firstItem.output ||
                            firstItem.text ||
                            firstItem.message ||
                            firstItem.response ||
                            firstItem.content ||
                            (firstItem.body && (firstItem.body.message || firstItem.body.output || firstItem.body.text)) ||
                            (typeof firstItem === 'string' ? firstItem : undefined);
                    }
                } else {
                    // Handle object response
                    botText =
                        data.reply ||
                        data.output ||
                        data.text ||
                        data.message ||
                        data.response ||
                        data.content ||
                        (data.body && (data.body.message || data.body.output || data.body.text));
                }

                // Fallback to raw JSON if nothing found
                if (!botText) {
                    console.warn('Could not extract text from response, showing raw JSON');
                    botText = JSON.stringify(data, null, 2);
                }

                console.log('Extracted botText:', botText);

                setMessages(prev => [
                    ...prev,
                    { type: 'bot', content: botText }
                ]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { type: 'bot', content: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setIsLoading(false);
            setSelectedFile(null);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() || selectedFile) {
            handleSendMessage(message);
        }
    };

    return (
        <>
            <style>{`
                .ai-copilot-chat {
                    touch-action: pan-y !important;
                    pointer-events: auto !important;
                }
                .ai-copilot-button:hover {
                    background-color: ${COLORS.primaryDark} !important;
                }
                .ai-copilot-suggestion {
                    background-color: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(249, 115, 22, 0.3);
                    color: white;
                    border-radius: 12px;
                    padding: 8px 16px;
                    font-size: 11.5px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                }
                .ai-copilot-suggestion:hover {
                    background-color: ${COLORS.primary};
                    border-color: ${COLORS.primary};
                    color: black;
                    transform: translateY(-2px) scale(1.02);
                    box-shadow: 0 10px 20px ${COLORS.primary}40;
                }
                /* Custom Scrollbar Styling */
                .ai-copilot-chat::-webkit-scrollbar {
                    width: 8px;
                }
                .ai-copilot-chat::-webkit-scrollbar-track {
                    background: ${COLORS.background};
                    border-radius: 10px;
                }
                .ai-copilot-chat::-webkit-scrollbar-thumb {
                    background: ${COLORS.accent};
                    border-radius: 10px;
                    transition: all 0.3s ease;
                }
                .ai-copilot-chat::-webkit-scrollbar-thumb:hover {
                    background: ${COLORS.accentLight};
                }
                /* Firefox Scrollbar */
                .ai-copilot-chat {
                    scrollbar-color: ${COLORS.accent} ${COLORS.background};
                    scrollbar-width: thin;
                }
            `}</style>

            {/* Trigger Button - Truly 'Small & Cute' Scale */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleChat}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    zIndex: 10000,
                    background: isOpen ? '#000000' : `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.primary})`,
                    boxShadow: isOpen ? '0 8px 20px rgba(0,0,0,0.4)' : `0 6px 20px ${COLORS.primary}40`,
                    border: isOpen ? '1px solid rgba(255,255,255,0.2)' : 'none'
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ai-copilot-button ${isOpen ? '' : 'animate-pulse-subtle'}`}
            >
                {isOpen ? (
                    <X className="w-5 h-5 text-white" />
                ) : (
                    <div className="w-[70%] h-[70%] relative flex items-center justify-center p-0.5">
                        <img
                            src="/bot.png"
                            alt="Chat"
                            className="w-full h-full object-contain filter drop-shadow-md"
                        />
                    </div>
                )}
            </motion.button>

            {/* Chat Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop for mobile */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleChat}
                            className="fixed inset-0 bg-black/40 z-[9998] backdrop-blur-sm md:hidden"
                        />

                        {/* Draggable Sidebar Panel */}
                        <motion.div
                            ref={chatContainerRef}
                            drag
                            dragControls={dragControls}
                            dragElastic={0.15}
                            dragMomentum={false}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed bottom-[85px] right-4 md:right-6 
                                        w-[360px] max-w-[95vw] h-[580px] max-h-[75vh] 
                                        rounded-[24px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border border-orange-500/20
                                        overflow-hidden flex flex-col z-[9999] backdrop-blur-xl"
                            style={{ backgroundColor: 'rgba(11, 11, 11, 0.95)' }}
                        >

                            {/* Header - Draggable Area */}
                            <div
                                className="p-4 flex items-center justify-between text-white rounded-t-2xl cursor-grab active:cursor-grabbing select-none touch-none"
                                style={{ backgroundColor: COLORS.primary }} onPointerDown={(e) => dragControls.start(e)}
                            >
                                <div className="flex items-center gap-3 pointer-events-none">
                                    <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-orange-500/20 shadow-lg">
                                        <img src="/bot.png" className="w-9 h-9 object-contain" alt="Robot" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm">VAS Tech Assistant</h3>
                                        <p className="text-xs opacity-90">Online • Ready to help</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pointer-events-auto">

                                    {/* Show Clear Chat Button ONLY if chat exists */}
                                    <AnimatePresence>
                                        {messages.length > 0 && (
                                            <motion.button
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                onClick={clearChat}
                                                title="Clear Chat"
                                                className="p-1.5 rounded-lg transition-all duration-200 
                           hover:bg-red-500/20 group"
                                            >
                                                <Trash2 className="w-5 h-5 text-white/80 group-hover:text-red-400 transition" />
                                            </motion.button>
                                        )}
                                    </AnimatePresence>

                                    {/* Close Chat Button */}
                                    <button
                                        onClick={toggleChat}
                                        title="Close Chat"
                                        className="p-1.5 rounded-lg transition-all duration-200 hover:bg-white/20"
                                    >
                                        <Minus className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>
                            {/* Chat Body (Messages) */}
                            <div
                                className="ai-copilot-chat flex-1 overflow-y-auto p-6 flex flex-col gap-4"
                                style={{
                                    backgroundColor: COLORS.background,
                                    overscrollBehavior: 'contain',
                                    touchAction: 'pan-y',
                                    pointerEvents: 'auto'
                                }}

                                onWheel={(e) => {
                                    e.stopPropagation();
                                }}

                                onTouchMove={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <AnimatePresence>
                                    {messages.length === 0 && (
                                        <motion.div
                                            initial={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="text-center px-6 py-6"
                                        >
                                            <img src="/bot.png" className="w-32 mx-auto mb-4 object-contain" alt="Robot" />
                                            <h4 className="text-lg font-bold" style={{ color: COLORS.text }}>
                                                Hi, I'm VAS Tech AI 👋
                                            </h4>
                                            <p className="text-sm mt-2 font-medium" style={{ color: COLORS.textLight }}>
                                                I can help you with customized AI solutions, operations, and business automation.
                                            </p>

                                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                                                <button className="ai-copilot-suggestion">💡 Get ideas</button>
                                                <button className="ai-copilot-suggestion">📊 Analytics</button>
                                                <button className="ai-copilot-suggestion">🛠 Support</button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>


                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'self-end flex-row-reverse' : ''}`}
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${msg.type === 'user' ? 'text-xs font-bold' : ''}`}
                                            style={{
                                                backgroundColor: msg.type === 'user' ? '#e8e8e8' : COLORS.accent + '20',
                                                color: msg.type === 'user' ? COLORS.text : COLORS.accent,
                                            }}
                                        >
                                            {msg.type === 'user' ? (
                                                <span>You</span>
                                            ) : (
                                                <img src="/bot.png" alt="Bot" className="w-7 h-7 object-contain" />
                                            )}
                                        </div>
                                        <div
                                            className={`p-3.5 rounded-2xl shadow-xl text-[12.5px] leading-relaxed whitespace-pre-wrap font-medium ${msg.type === 'user' ? 'text-black rounded-br-none' : 'text-zinc-100 rounded-bl-none border border-orange-500/20'}`}
                                            style={{
                                                background: msg.type === 'user' ? `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.primary})` : '#1A1A1A',
                                                boxShadow: msg.type === 'user' ? `0 8px 25px ${COLORS.primary}30` : 'none',
                                            }}
                                        >
                                            {msg.content && (
                                                <div className="whitespace-pre-wrap">
                                                    {msg.content.split(/(https?:\/\/[^\s]+)/g).map((part, i) => {
                                                        if (part.match(/https?:\/\/[^\s]+/)) {
                                                            return (
                                                                <a
                                                                    key={i}
                                                                    href={part}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className={`underline hover:opacity-80 break-all ${msg.type === 'user' ? 'text-white' : 'text-blue-600'}`}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    {part}
                                                                </a>
                                                            );
                                                        }
                                                        return part;
                                                    })}
                                                </div>
                                            )}
                                            {msg.image && (
                                                <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                                                    <img src={msg.image} alt="Generated" className="w-full h-auto" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Typing Indicator Style */}
                                <style>{`
                                        @keyframes blink {
                                            0% { opacity: 0.2; }
                                            20% { opacity: 1; }
                                            100% { opacity: 0.2; }
                                        }
                                        .typing-dot {
                                            animation: blink 1.4s infinite both;
                                            height: 6px;
                                            width: 6px;
                                            border-radius: 50%;
                                            background-color: ${COLORS.primary};
                                            display: inline-block;
                                        }
                                        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
                                        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
                                    `}</style>

                                {isLoading && (
                                    <div className="flex gap-3 max-w-[85%]">
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border"
                                            style={{
                                                backgroundColor: COLORS.accent + '20',
                                                borderColor: COLORS.accent,
                                            }}
                                        >
                                            <Sparkles className="w-4 h-4" style={{ color: COLORS.accent }} />
                                        </div>
                                        <div className="p-4 rounded-2xl rounded-tl-none shadow-lg border flex items-center bg-[#1A1A1A] border-orange-500/20">
                                            <div className="flex gap-1.5">
                                                <span className="typing-dot"></span>
                                                <span className="typing-dot"></span>
                                                <span className="typing-dot"></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Footer (Input) */}
                            <div className="p-4 border-t border-orange-500/20" style={{ backgroundColor: '#0A0A0A' }}>
                                {selectedFile && (
                                    <div className="text-xs mb-2 flex items-center gap-2" style={{ color: COLORS.textLight }}>
                                        <span>📎 {selectedFile.name}</span>
                                        <button
                                            onClick={() => setSelectedFile(null)}
                                            className="text-red-500 text-xs hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}

                                <form onSubmit={onSubmit} className="flex items-center gap-2 rounded-full px-3 py-2 shadow-sm border" style={{ backgroundColor: COLORS.background, borderColor: '#d0d0d0' }}>
                                    {/* Hidden File Input */}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />

                                    {/* Upload Button */}
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="p-2 rounded-lg transition-all duration-200"
                                        style={{
                                            backgroundColor: COLORS.primary + '20',
                                            color: COLORS.primary,
                                        }}
                                        title="Upload file"
                                    >
                                        <Paperclip className="w-5 h-5" />
                                    </button>

                                    {/* Mic Button */}
                                    <button
                                        type="button"
                                        onClick={isRecording ? stopRecording : startRecording}
                                        className={`p-2 rounded-lg transition-all duration-200 ${isRecording ? 'animate-pulse' : ''}`}
                                        style={{
                                            backgroundColor: isRecording ? '#ff4444' : COLORS.primary + '20',
                                            color: isRecording ? 'white' : COLORS.primary,
                                        }}
                                        title={isRecording ? "Stop Recording" : "Start Recording"}
                                    >
                                        {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
                                    </button>

                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder={isRecording ? "Listening..." : "Type your message..."}
                                        disabled={isRecording || isLoading}
                                        className="flex-1 bg-transparent outline-none text-sm px-2"
                                        style={{ color: COLORS.text }}
                                    />

                                    <button
                                        type="submit"
                                        disabled={!message.trim() || isLoading || isRecording}
                                        className="w-9 h-9 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-shadow disabled:opacity-50"
                                        style={{ backgroundColor: COLORS.primary }}
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>

                                <div className="text-center mt-2">
                                    <p className="text-[10px]" style={{ color: COLORS.textLight }}>Powered by VAS Tech AI</p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
