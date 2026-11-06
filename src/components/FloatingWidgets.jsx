import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, MessageSquare, X, Send, Award, User, Bot } from 'lucide-react';

export default function FloatingWidgets({ theme, onToggleTheme }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'Привет! Я дежурный помощник по 6-му школьному дню платформы «ЛІГА». Могу рассказать, как устроены сквозные турниры, как назначить матч со сборной соседней школы или выбрать мероприятие из афиши.',
      time: 'Сейчас',
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
      { sender: 'user', text: userMsg, time: 'Сейчас' },
    ]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = userMsg.toLowerCase();

      if (lower.includes('турнир') || lower.includes('этап') || lower.includes('республик')) {
        reply = 'Сквозные турниры проходят по схеме «Школа ➔ Район ➔ Город ➔ Республика». Ученики сами собирают состав в приложении, школьный физрук курирует внутришкольный отбор, а победители автоматически продвигаются на следующий уровень!';
      } else if (lower.includes('матч') || lower.includes('школ') || lower.includes('соперник') || lower.includes('физрук')) {
        reply = 'В формате «Школа на Школу» сборные формируются по заявкам учеников. Физрук выбирает команду соседней школы и назначает удобное время игры в один клик без долгих согласований и бумажек.';
      } else if (lower.includes('скачать') || lower.includes('apk') || lower.includes('ios') || lower.includes('android')) {
        reply = 'Прямая установка доступна прямо сейчас по кнопке «Скачать .APK» (файл liga-v1.0.0.apk, 24 МБ). Версии для App Store и Google Play выйдут в ближайшее время.';
      } else if (lower.includes('мероприят') || lower.includes('афиш') || lower.includes('не спорт') || lower.includes('квиз')) {
        reply = 'Для тех, кто хочет провести субботу с пользой вне спорта, в приложении есть вкладка «Афиша»: там собраны мастер-классы, встречи с интересными людьми, краеведческие экскурсии и интеллектуальные квизы.';
      } else if (lower.includes('баз') || lower.includes('вход') || lower.includes('регистрац') || lower.includes('заявк')) {
        reply = 'Все ученики и учителя уже внесены в систему своих школ. Никаких подтверждений и сложных заявок на вход: просто введите номер своей школы и открывайте приложение!';
      } else {
        reply = '«ЛІГА» делает 6-й школьный день живым и наполненным реальным делом. Если хотите участвовать в турнире или организовать матч между школами, скачивайте .APK и присоединяйтесь!';
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'assistant', text: reply, time: 'Сейчас' },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Fixed bottom-left buttons */}
      <div className="fixed bottom-4 left-4 z-[9999] flex items-center gap-2.5">
        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
          className="w-10 h-10 rounded-none bg-[#1e1e1e] border-2 border-white/20 text-[#aaa] hover:text-white hover:border-white/50 flex items-center justify-center shadow-2xl transition-all cursor-pointer backdrop-blur-md"
        >
          {theme === 'dark' ? <Moon className="w-4 h-4 text-sky-300" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Live Chat Toggle Button */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          title="Открыть помощник ЛІГА"
          className="relative h-10 px-3.5 rounded-none bg-[#1e1e1e] border-2 border-white/20 text-[#aaa] hover:text-white hover:border-white/50 flex items-center gap-2 shadow-2xl transition-all cursor-pointer backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <MessageSquare className="w-4 h-4 text-white" />
          <span className="text-xs font-mono font-medium text-white hidden sm:inline">
            Дежурный ЛІГА
          </span>
        </button>
      </div>

      {/* Live Chat Modal Drawer */}
      {chatOpen && (
        <div className="fixed bottom-16 left-4 z-[10000] w-[340px] sm:w-[380px] h-[480px] bg-[#181818] border-2 border-white/20 rounded-none shadow-2xl flex flex-col overflow-hidden animate-fade-in backdrop-blur-lg">
          {/* Header */}
          <div className="bg-[#1f1f1f] border-b-2 border-white/10 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 bg-white/10 border border-white/30 flex items-center justify-center text-white font-mono font-bold text-xs">
                  ЛІГА
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-white border border-black" />
              </div>
              <div className="text-left">
                <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <span>Дежурный ЛІГА</span>
                  <span className="_statusTag_xnoig_1 text-[9px] text-white border border-white/30">
                    ОНЛАЙН
                  </span>
                </div>
                <div className="text-[10px] text-[#888] font-mono">Школьный 6-й день</div>
              </div>
            </div>

            <button
              onClick={() => setChatOpen(false)}
              className="p-1 text-[#888] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Info Bar */}
          <div className="bg-black/50 border-b border-white/10 px-3 py-1.5 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-1.5 text-white">
              <Award className="w-3.5 h-3.5 text-white" />
              <span>Единая база всех школ</span>
            </div>
            <span className="text-[10px] text-[#aaa] font-mono">[АКТИВНА]</span>
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
                {m.sender === 'assistant' && (
                  <div className="w-6 h-6 bg-white/10 border border-white/30 flex items-center justify-center shrink-0 text-white font-mono text-[10px] font-bold">
                    Л
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-2.5 leading-relaxed font-mono text-xs ${
                    m.sender === 'user'
                      ? 'bg-white text-black font-semibold text-right border border-white'
                      : 'bg-[#222] border border-white/10 text-white text-left'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                {m.sender === 'user' && (
                  <div className="w-6 h-6 bg-white/20 border border-white/30 flex items-center justify-center shrink-0 text-white">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#888]">
                <span className="w-2 h-2 bg-white animate-pulse" />
                <span>Дежурный печатает ответ...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Suggestions */}
          <div className="px-2.5 py-1.5 bg-[#171717] border-t border-white/5 flex gap-1.5 overflow-x-auto text-[10px] font-mono text-neutral-400 whitespace-nowrap">
            <button
              onClick={() => setInput('Как устроены сквозные турниры?')}
              className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
            >
              Сквозные турниры
            </button>
            <button
              onClick={() => setInput('Как сыграть Школа на Школу?')}
              className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
            >
              Школа на Школу
            </button>
            <button
              onClick={() => setInput('Где скачать приложение?')}
              className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
            >
              Скачать .APK
            </button>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSend}
            className="p-2.5 bg-[#1f1f1f] border-t-2 border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Спросите о турнирах, матчах..."
              className="flex-1 bg-black/70 border border-white/20 px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/50 font-mono"
            />
            <button
              type="submit"
              className="px-2.5 py-1.5 bg-white text-black font-bold uppercase hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
