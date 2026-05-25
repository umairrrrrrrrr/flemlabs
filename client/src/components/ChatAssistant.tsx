import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Populate initial greeting
    setMessages([
      {
        sender: 'bot',
        text: 'hey! welcome to flemlabs 👋 i\'m flembot, your creative assistant. what can i help you with today — orders, services, or something else?',
        timestamp: new Date()
      }
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const triggerBotResponse = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text,
        timestamp: new Date()
      }]);
    }, 900);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, {
      sender: 'user',
      text,
      timestamp: new Date()
    }]);
    setInputValue('');

    const query = text.toLowerCase();

    // Contextual Simulated Responses
    if (query.includes('order') || query.includes('place') || query.includes('buy')) {
      triggerBotResponse('To place a commission, head to our Services page or Pricing tiers, select the package that fits your goals, and complete the check-out forms. You can track its production timeline in real-time on your dashboard!');
    } else if (query.includes('price') || query.includes('cost') || query.includes('rate')) {
      triggerBotResponse('Our premium services are structured in Basic, Standard, and Pro tiers to suit various budgets. You can review them in detail on our Pricing page.');
    } else if (query.includes('portfolio') || query.includes('work') || query.includes('art')) {
      triggerBotResponse('Our master showcase is available on the Portfolio page. We feature pixel art, low-poly 3D props, character rigs, cinematic illustrations, and minimalist branding concepts.');
    } else if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('location')) {
      triggerBotResponse('You can contact us directly through the Contact Page form, email us at muhammadumairshake@gmail.com, or visit our studio at Air University E-9 Islamabad, Pakistan.');
    } else if (query.includes('wallet') || query.includes('metamask') || query.includes('crypto') || query.includes('eth')) {
      triggerBotResponse('flemlabs is a fully Web3-enabled digital art agency! You can connect your MetaMask wallet using the "Connect Wallet" button on our floating header navbar. If you don\'t have a wallet, we also support an automated sandbox simulator for testing.');
    } else if (query.includes('escrow') || query.includes('secure') || query.includes('safety') || query.includes('cancel')) {
      triggerBotResponse('All transactions are secured in our high-end studio escrow ledger. The creative team accepts commissions after verify sign-offs, and you can request escrow refunds directly from your orders history tab.');
    } else {
      triggerBotResponse('Thank you for reaching out to flemlabs support. A senior design producer will review your query shortly and follow up. In the meantime, feel free to inspect our services and portfolio catalogs.');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      {/* Launcher Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-cream hover:bg-cream-light text-black w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_25px_rgba(222,219,200,0.4)] transition-transform duration-300 hover:scale-105"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Floating Chat Container */}
      {isOpen && (
        <div className="glass-panel w-[350px] sm:w-[380px] h-[500px] rounded-2xl flex flex-col shadow-2xl overflow-hidden border border-cream/20">
          {/* Header */}
          <div className="bg-surface-dark border-b border-cream/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cream/10 border border-cream/30 flex items-center justify-center">
                <span className="text-cream text-xs font-bold font-serif italic">F</span>
              </div>
              <div>
                <span className="text-sm font-bold text-cream block">flembot</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Active support assistant
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-cream transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages display */}
          <div 
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-black/40"
          >
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-cream text-[9px] font-bold">F</span>
                  </div>
                )}
                <div>
                  <div 
                    className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-cream text-black font-medium rounded-tr-none' 
                        : 'bg-surface-dark text-cream-light border border-cream/5 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-gray-500 mt-1 block px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 max-w-[85%] mr-auto items-center">
                <div className="w-6 h-6 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-cream text-[9px] font-bold">F</span>
                </div>
                <div className="bg-surface-dark text-cream-light rounded-2xl rounded-tl-none px-4 py-2 border border-cream/5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-cream/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-cream/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-cream/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick replies */}
          <div className="p-3 bg-black border-t border-cream/5 flex flex-wrap gap-2">
            <button
              onClick={() => handleSend('How do I place an order?')}
              className="text-[10px] bg-surface-dark hover:bg-cream/10 border border-cream/15 text-cream-light rounded-full px-3 py-1 transition-all duration-300"
            >
              Commission rates?
            </button>
            <button
              onClick={() => handleSend('Tell me about your services.')}
              className="text-[10px] bg-surface-dark hover:bg-cream/10 border border-cream/15 text-cream-light rounded-full px-3 py-1 transition-all duration-300"
            >
              Services info?
            </button>
            <button
              onClick={() => handleSend('How do I connect my MetaMask crypto wallet?')}
              className="text-[10px] bg-surface-dark hover:bg-cream/10 border border-cream/15 text-cream-light rounded-full px-3 py-1 transition-all duration-300"
            >
              Connect Wallet?
            </button>
          </div>

          {/* Send Input */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="p-3 bg-surface-dark border-t border-cream/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-black border border-cream/10 focus:border-cream/30 text-cream-light text-xs rounded-full px-4 py-2.5 outline-none transition-colors"
            />
            <button
              type="submit"
              className="bg-cream hover:bg-cream-light text-black p-2.5 rounded-full transition-colors flex-shrink-0"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
