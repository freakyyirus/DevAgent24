'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Send,
  Phone,
  PhoneOff,
  Volume2,
  MessageSquare,
  Clock,
  BarChart3,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  role: 'interviewer' | 'candidate';
  content: string;
  timestamp: number;
}

const INTERVIEW_QUESTIONS = {
  technical: [
    "Let's start with a warm-up. Can you explain what a hash table is and when you'd use one over a balanced BST?",
    "Great. Now tell me, how would you design a rate limiter for an API? Walk me through your approach step by step.",
    "Interesting approach. What's the time complexity of your lookup operation? Can you think of any edge cases?",
    "Let's switch gears. Can you explain the difference between processes and threads? When would you choose one over the other?",
    "Can you walk me through how you would debug a memory leak in a Node.js application?",
    "Last question — how would you design a URL shortening service like TinyURL? Think about scalability.",
  ],
  behavioral: [
    "Tell me about a time when you had to deal with a difficult team member. How did you handle it?",
    "Describe a project where you had to learn a new technology quickly. What was your approach?",
    "Can you share an example of a time when you failed? What did you learn from it?",
    "Tell me about the most challenging technical problem you've solved. What made it challenging?",
    "How do you prioritize tasks when you have multiple deadlines approaching?",
  ],
  system_design: [
    "Let's design a chat application like Slack. Where would you start?",
    "How would you design a notification system that needs to handle millions of users?",
    "Design a file storage system like Google Drive. What components would you need?",
    "How would you build a real-time collaborative editor like Google Docs?",
  ],
};

type InterviewType = 'technical' | 'behavioral' | 'system_design';

export default function InterviewPage() {
  const [started, setStarted] = useState(false);
  const [interviewType, setInterviewType] = useState<InterviewType>('technical');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [waveformHeights, setWaveformHeights] = useState<number[]>(Array(30).fill(4));
  const chatRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  // Timer
  useEffect(() => {
    if (!started) return;
    const timer = setInterval(() => setElapsed((p) => p + 1), 1000);
    return () => clearInterval(timer);
  }, [started]);

  // Auto-scroll chat
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  // Waveform animation
  useEffect(() => {
    if (!isListening && !isSpeaking) return;
    const interval = setInterval(() => {
      setWaveformHeights(Array(30).fill(0).map(() => Math.random() * 36 + 4));
    }, 100);
    return () => clearInterval(interval);
  }, [isListening, isSpeaking]);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined') return;
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);
  }, []);

  const startInterview = () => {
    setStarted(true);
    setMessages([]);
    setQuestionIndex(0);
    setElapsed(0);

    const firstQ = INTERVIEW_QUESTIONS[interviewType][0];
    const msg: Message = { role: 'interviewer', content: firstQ, timestamp: Date.now() };
    setMessages([msg]);

    setTimeout(() => speak(firstQ), 500);
    toast.success('Interview started! Good luck.');
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newCandidateMsg: Message = { role: 'candidate', content: userInput, timestamp: Date.now() };
    const updatedMessages = [...messages, newCandidateMsg];
    
    setMessages(updatedMessages);
    setUserInput('');

    try {
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          interviewType
        }),
      });

      const data = await res.json();
      if (data.reply) {
        const aiMsg: Message = { role: 'interviewer', content: data.reply, timestamp: Date.now() };
        setMessages(prev => [...prev, aiMsg]);
        speak(data.reply);
      } else if (data.score) {
        // Handle end of interview mode if needed
        const endMsg: Message = { role: 'interviewer', content: `Interview concluded. Your approximate score is ${data.score}/100. ${data.feedback}`, timestamp: Date.now() };
        setMessages(prev => [...prev, endMsg]);
        speak(endMsg.content);
        setStarted(false);
      } else {
        throw new Error('No reply from AI');
      }
    } catch (error) {
      console.error(error);
      const fallbackMsg: Message = { role: 'interviewer', content: "I'm having trouble connecting to the network. Could you please repeat that?", timestamp: Date.now() };
      setMessages(prev => [...prev, fallbackMsg]);
      speak(fallbackMsg.content);
    }
  };

  const toggleListening = () => {
    if (typeof window === 'undefined') return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Speech recognition not supported. Use Chrome for best experience.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setUserInput(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast.error('Voice recognition error. Try again or type your response.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const endInterview = () => {
    speechSynthesis.cancel();
    recognitionRef.current?.stop();
    setStarted(false);
    setIsListening(false);
    setIsSpeaking(false);
    toast.success('Interview ended. Check your results!');
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  // ─── Pre-interview screen ───
  if (!started) {
    return (
      <div>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>
            <Mic size={28} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 10, color: '#06b6d4' }} />
            AI Mock Interview
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Practice with an AI interviewer. Use voice or text. Adaptive questions that simulate real interview pressure.
          </p>
        </motion.div>

        {/* Interview type selection */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 32 }}>
          {([
            { type: 'technical' as InterviewType, icon: '🔧', title: 'Technical', desc: 'Data structures, algorithms, system design questions', color: '#6366f1' },
            { type: 'behavioral' as InterviewType, icon: '💬', title: 'Behavioral', desc: 'STAR method, leadership, teamwork, conflict resolution', color: '#10b981' },
            { type: 'system_design' as InterviewType, icon: '🏗️', title: 'System Design', desc: 'Architecture, scalability, distributed systems', color: '#f59e0b' },
          ]).map((opt) => (
            <motion.button
              key={opt.type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setInterviewType(opt.type)}
              className="glass-card"
              style={{
                padding: '28px',
                cursor: 'pointer',
                textAlign: 'left',
                borderColor: interviewType === opt.type ? `${opt.color}60` : undefined,
                background: interviewType === opt.type ? `${opt.color}10` : undefined,
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>{opt.icon}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 6 }}>{opt.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{opt.desc}</p>
            </motion.button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button onClick={startInterview} className="btn-primary" style={{ padding: '14px 32px' }}>
            <Phone size={18} /> Start Interview
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <AlertCircle size={14} />
            Use Chrome for best voice recognition
          </div>
        </div>
      </div>
    );
  }

  // ─── Active interview ───
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#10b981',
              animation: 'pulse-glow 2s infinite',
            }}
          />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
            {interviewType === 'technical' ? '🔧' : interviewType === 'behavioral' ? '💬' : '🏗️'}{' '}
            {interviewType.charAt(0).toUpperCase() + interviewType.slice(1).replace('_', ' ')} Interview
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <Clock size={14} /> {formatTime(elapsed)}
          </div>
        </div>
        <button onClick={endInterview} className="btn-secondary" style={{ padding: '6px 16px', color: '#f43f5e', borderColor: '#f43f5e40' }}>
          <PhoneOff size={16} /> End
        </button>
      </div>

      {/* Chat area */}
      <div
        ref={chatRef}
        className="glass-card"
        style={{ flex: 1, padding: '20px', overflow: 'auto', marginBottom: 16 }}
      >
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'candidate' ? 'flex-end' : 'flex-start',
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  maxWidth: '70%',
                  padding: '14px 18px',
                  borderRadius: 14,
                  borderBottomLeftRadius: msg.role === 'interviewer' ? 4 : 14,
                  borderBottomRightRadius: msg.role === 'candidate' ? 4 : 14,
                  background:
                    msg.role === 'interviewer'
                      ? 'rgba(99,102,241,0.12)'
                      : 'rgba(16,185,129,0.12)',
                  border: `1px solid ${msg.role === 'interviewer' ? 'rgba(99,102,241,0.2)' : 'rgba(16,185,129,0.2)'}`,
                }}
              >
                <div style={{ fontSize: '0.7rem', fontWeight: 600, marginBottom: 6, color: msg.role === 'interviewer' ? '#818cf8' : '#34d399' }}>
                  {msg.role === 'interviewer' ? '🤖 Interviewer' : '👤 You'}
                </div>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                  {msg.content}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isSpeaking && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#818cf8', fontSize: '0.8rem' }}>
            <Volume2 size={14} /> AI is speaking...
          </div>
        )}
      </div>

      {/* Waveform */}
      {(isListening || isSpeaking) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            marginBottom: 12,
            height: 40,
          }}
        >
          {waveformHeights.map((h, i) => (
            <div
              key={i}
              className="waveform-bar"
              style={{
                height: h,
                background: isListening ? '#10b981' : '#6366f1',
                opacity: 0.7 + Math.random() * 0.3,
              }}
            />
          ))}
        </div>
      )}

      {/* Input area */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
        <button
          onClick={toggleListening}
          className={isListening ? 'btn-primary' : 'btn-secondary'}
          style={{
            padding: '12px 16px',
            borderRadius: 12,
            ...(isListening ? { background: '#10b981', boxShadow: '0 0 20px rgba(16,185,129,0.3)' } : {}),
          }}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 12,
            padding: '0 16px',
          }}
        >
          <MessageSquare size={16} color="var(--text-muted)" style={{ marginRight: 10, flexShrink: 0 }} />
          <input
            type="text"
            placeholder={isListening ? 'Listening... speak now' : 'Type your response or click the mic...'}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              padding: '12px 0',
            }}
          />
        </div>
        <button onClick={handleSend} className="btn-primary" style={{ padding: '12px 20px', borderRadius: 12 }}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

// Add global type augmentation for Speech API
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any;
  }
}
