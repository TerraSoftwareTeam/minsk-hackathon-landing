import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, MessageSquare, X, Send, Shield, User, Bot } from 'lucide-react';

export default function FloatingWidgets({ theme, onToggleTheme }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [ultraPrivate, setUltraPrivate] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'kyoko',
      text: 'Hi! I’m Kyoko, your Kyun assistant. How can I help you today? Need help picking VM specs or curious about our privacy policies?',
      time: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (chatOpen) {
      scrollToBottom();
    }
  }, [messages, chatOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, time: 'Just now' },
    ]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = userMsg.toLowerCase();

      if (ultraPrivate) {
        reply = '[Staff Operator]: Ultra-Private mode is enabled. An on-call human staff member has received your secure message without AI processing.';
      } else if (lower.includes('kyc') || lower.includes('id') || lower.includes('passport')) {
        reply = 'Kyun has a strict No-KYC policy. We will never ask for your identity or passport. You can sign up with just an anonymous token or email, and pay with Monero (XMR).';
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('vm')) {
        reply = 'Containers start at $1.85/mo and full KVM virtual machines start from $2.90/mo. All resources are prorated to the second with automatic refunds upon termination!';
      } else if (lower.includes('monero') || lower.includes('xmr') || lower.includes('crypto')) {
        reply = 'Monero is our first-class preferred payment method with zero confirmations required for top-ups!';
      } else {
        reply = 'Thanks for reaching out! Kyun offers KVM VMs, on-demand containers, and hot-attachable block storage with 99.99% uptime in European datacenters.';
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'kyoko', text: reply, time: 'Just now' },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Fixed bottom-left buttons */}
      <div className="fixed bottom-4 left-4 z-[9999] flex items-center gap-2.5">
        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="w-10 h-10 rounded-full bg-[#1e1e1e] border border-white/20 text-[#aaa] hover:text-white hover:border-white/50 flex items-center justify-center shadow-2xl transition-all cursor-pointer backdrop-blur-md"
        >
          {theme === 'dark' ? <Moon className="w-4 h-4 text-sky-300" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Live Chat Toggle Button */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          title="Open Kyun Live Chat"
          className="relative h-10 px-3.5 rounded-full bg-[#1e1e1e] border border-white/20 text-[#aaa] hover:text-white hover:border-white/50 flex items-center gap-2 shadow-2xl transition-all cursor-pointer backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-medium text-white hidden sm:inline">
            Chat with Kyun
          </span>
        </button>
      </div>

      {/* Live Chat Modal Drawer */}
      {chatOpen && (
        <div className="fixed bottom-16 left-4 z-[10000] w-[340px] sm:w-[380px] h-[480px] bg-[#181818] border border-white/20 rounded-lg shadow-2xl flex flex-col overflow-hidden animate-fade-in backdrop-blur-lg">
          {/* Header */}
          <div className="bg-[#1f1f1f] border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <img
                  src="/assets/kyoko-DdSesS4Q.gif"
                  alt="Kyoko"
                  className="w-7 h-7 rounded-full border border-white/20 object-cover bg-black"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-black" />
              </div>
              <div className="text-left">
                <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <span>Kyoko</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1 py-0.2 rounded font-normal">
                    {ultraPrivate ? 'Staff Only' : 'AI Assistant'}
                  </span>
                </div>
                <div className="text-[10px] text-kyun-textDark font-mono">Instant Support</div>
              </div>
            </div>

            <button
              onClick={() => setChatOpen(false)}
              className="p-1 text-[#888] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Ultra Private Mode Toggle Bar */}
          <div className="bg-black/40 border-b border-white/5 px-3 py-1.5 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-1.5 text-kyun-textFocus">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Ultra Private Mode</span>
            </div>
            <button
              onClick={() => setUltraPrivate(!ultraPrivate)}
              className={`text-[10px] px-2 py-0.5 rounded font-bold transition-colors ${
                ultraPrivate
                  ? 'bg-amber-400 text-black'
                  : 'bg-white/10 text-[#aaa] hover:text-white'
              }`}
            >
              {ultraPrivate ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 font-sans text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 ${
                  m.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.sender === 'kyoko' && (
                  <div className="w-6 h-6 rounded-full bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-300">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] rounded-lg p-2.5 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-white text-black font-medium text-right'
                      : 'bg-[#222] border border-white/10 text-kyun-textFocus text-left'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-white">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs font-mono text-kyun-textDark">
                <Bot className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Kyoko is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSend}
            className="p-2.5 bg-[#1f1f1f] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Kyun..."
              className="flex-1 bg-black/60 border border-white/15 rounded px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 font-mono"
            />
            <button
              type="submit"
              className="p-1.5 bg-white text-black rounded hover:bg-gray-200 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
