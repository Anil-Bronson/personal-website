'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bartenderFallbacks, bartenderThinking } from '@/lib/data';
import styles from './ChatInterface.module.css';

interface Message {
  role: 'user' | 'bartender';
  content: string;
  bartender?: 'kon' | 'tsutsui';
}

interface Props {
  activeBartender: 'kon' | 'tsutsui';
  onBartenderChange: (b: 'kon' | 'tsutsui') => void;
  autoOpen?: boolean;
}

const BARTENDER_LABELS = { kon: 'Satoshi Kon', tsutsui: 'Y. Tsutsui' };

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function ChatInterface({ activeBartender, onBartenderChange, autoOpen }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [streamContent, setStreamContent] = useState('');
  const [thinkingPhrase, setThinkingPhrase] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, streamContent, streaming]);

  useEffect(() => {
    if (autoOpen && !isOpen) {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoOpen]);

  const openChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || streaming) return;
    setInput('');

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setStreaming(true);
    setStreamContent('');
    setThinkingPhrase(pickRandom(bartenderThinking[activeBartender]));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          persona: activeBartender,
          history: messages.slice(-8).map((m) => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content,
          })),
        }),
      });

      if (!res.ok || !res.body) throw new Error('no response');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setStreamContent(full);
      }

      setMessages((prev) => [
        ...prev,
        { role: 'bartender', content: full, bartender: activeBartender },
      ]);
    } catch {
      const reply = pickRandom(bartenderFallbacks[activeBartender]);
      setMessages((prev) => [
        ...prev,
        { role: 'bartender', content: reply, bartender: activeBartender },
      ]);
    } finally {
      setStreaming(false);
      setStreamContent('');
    }
  };

  const isThinking = streaming && !streamContent;

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.messageArea}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.messages} ref={messagesRef}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`${styles.message} ${msg.role === 'user' ? styles.userMsg : styles.bartenderMsg}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {msg.role === 'bartender' && (
                    <span className={styles.msgName}>{BARTENDER_LABELS[msg.bartender!]}</span>
                  )}
                  <span className={styles.msgText}>{msg.content}</span>
                </motion.div>
              ))}

              {/* Thinking state — waiting for first chunk */}
              <AnimatePresence>
                {isThinking && (
                  <motion.div
                    className={`${styles.message} ${styles.bartenderMsg}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className={styles.msgName}>{BARTENDER_LABELS[activeBartender]}</span>
                    <span className={`${styles.msgText} ${styles.thinking}`}>
                      {thinkingPhrase}
                      <span className={styles.thinkingDots}>
                        <span>.</span><span>.</span><span>.</span>
                      </span>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Streaming state — content arriving */}
              {streaming && streamContent && (
                <motion.div
                  className={`${styles.message} ${styles.bartenderMsg}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className={styles.msgName}>{BARTENDER_LABELS[activeBartender]}</span>
                  <span className={styles.msgText}>
                    {streamContent}
                    <span className={styles.cursor} />
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.inputBar}>
        <div className={styles.bartenderPicker}>
          {(['kon', 'tsutsui'] as const).map((b) => (
            <button
              key={b}
              className={`${styles.pickerBtn} ${activeBartender === b ? styles.pickerActive : ''}`}
              onClick={() => { onBartenderChange(b); openChat(); }}
            >
              {b === 'kon' ? 'Kon' : 'Tsutsui'}
            </button>
          ))}
        </div>

        <div className={styles.inputWrapper} onClick={openChat}>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder="Ask the bartender…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            onFocus={openChat}
            disabled={streaming}
          />
          <button
            className={styles.sendBtn}
            onClick={sendMessage}
            disabled={!input.trim() || streaming}
            aria-label="Send"
          >
            ↵
          </button>
        </div>
      </div>
    </div>
  );
}
