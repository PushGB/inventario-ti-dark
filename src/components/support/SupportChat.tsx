import React, { useState } from 'react';
import { MessageSquare, X, Send, User } from 'lucide-react';
import { Button } from '../ui/Button';

export function SupportChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hola, soy el soporte técnico. ¿En qué puedo ayudarte hoy?', isUser: false }
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newMsg = { id: Date.now(), text: inputValue, isUser: true };
        setMessages(prev => [...prev, newMsg]);
        setInputValue('');

        // Simulate response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: 'Gracias por tu mensaje. Un técnico revisará tu caso en breve.',
                isUser: false
            }]);
        }, 1000);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 h-14 w-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50"
            >
                <MessageSquare className="w-6 h-6" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-[#1E1E1E] border border-[#333333] rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
            {/* Header */}
            <div className="p-4 bg-[#252525] border-b border-[#333333] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 bg-blue-900/30 text-blue-400 rounded-full flex items-center justify-center border border-blue-900">
                            <User className="w-5 h-5" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#252525] rounded-full"></div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-white text-sm">Soporte Técnico</h3>
                        <p className="text-xs text-[#9E9E9E]">En línea</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                    <X className="w-4 h-4" />
                </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 h-80 overflow-y-auto space-y-4 bg-[#121212]">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${msg.isUser
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-[#252525] text-[#E0E0E0] rounded-bl-none'
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-[#1E1E1E] border-t border-[#333333]">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 bg-[#252525] border border-[#333333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-500 text-white border-none">
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </form>
        </div>
    );
}
