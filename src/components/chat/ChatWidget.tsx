'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  text: 'こんにちは！money webのAIアドバイザー「かなちゃん」です😊\nお金やキャリアのことで気になることがあれば、なんでも聞いてみてくださいね！',
};

const SUGGESTED = [
  '相談の流れを教えて',
  '料金はいくらですか？',
  'iDeCoって何？',
  'オンライン対応してる？',
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, hasOpened]);

  const send = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages
        .filter(m => m !== INITIAL_MESSAGE)
        .map(m => ({ role: m.role, text: m.text }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply ?? data.error }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'ごめんなさい、うまく繋がりませんでした💦 時間をおいてお試しください。' }]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      {/* Launcher button */}
      <button
        className={`chat-launcher${isOpen ? ' chat-launcher--open' : ''}`}
        onClick={() => setIsOpen(v => !v)}
        aria-label={isOpen ? 'チャットを閉じる' : 'AIに相談する'}
      >
        <span className="chat-launcher__ring" />
        <Image
          src="/images/sd.jpg"
          alt="かなちゃん"
          width={56}
          height={56}
          className="chat-launcher__avatar"
        />
        {!isOpen && (
          <span className="chat-launcher__badge">？</span>
        )}
      </button>

      {/* Chat panel */}
      <div className={`chat-panel${isOpen ? ' chat-panel--open' : ''}`} role="dialog" aria-label="AIチャット">

        {/* Header */}
        <div className="chat-header">
          <div className="chat-header__avatar-wrap">
            <Image
              src="/images/sd.jpg"
              alt="かなちゃん"
              width={48}
              height={48}
              className="chat-header__avatar"
            />
          </div>
          <div className="chat-header__info">
            <p className="chat-header__name">かなちゃん</p>
            <p className="chat-header__role">AI お金・キャリア アドバイザー</p>
          </div>
          <button
            className="chat-close"
            onClick={() => setIsOpen(false)}
            aria-label="閉じる"
          >✕</button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble chat-bubble--${msg.role}`}>
              {msg.role === 'assistant' && (
                <Image src="/images/sd.jpg" alt="" width={28} height={28} className="chat-bubble__avatar" />
              )}
              <div className="chat-bubble__text">
                {msg.text.split('\n').map((line, j) => (
                  <span key={j}>{line}{j < msg.text.split('\n').length - 1 && <br />}</span>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chat-bubble chat-bubble--assistant">
              <Image src="/images/sd.jpg" alt="" width={28} height={28} className="chat-bubble__avatar" />
              <div className="chat-bubble__text chat-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="chat-suggestions">
            {SUGGESTED.map(s => (
              <button key={s} className="chat-suggestion" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form className="chat-input-row" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="chat-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="メッセージを入力..."
            disabled={isLoading}
            maxLength={500}
          />
          <button
            className="chat-send"
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="送信"
          >
            ↑
          </button>
        </form>
      </div>
    </>
  );
}
