import React, { useState, useEffect, useRef } from 'react';
import { sounds } from '../utils/soundEffects';
import { generateNyxResponse } from '../utils/nyxAI';
import { quickSuggestions } from '../data/nyxKnowledgeBase';
import { personalInfo } from '../data/portfolioData';
import {
  MessageSquare, X, Send, Mic, MicOff, Volume2, VolumeX,
  Minimize2, Maximize2, Trash2, Sparkles, Shield, Cpu,
  ExternalLink, FileText, Download, Check, Copy, Radio,
  CornerDownLeft, Play, Square, User, Terminal
} from 'lucide-react';

export default function NyxChatbot({
  isOpen,
  onToggle,
  onOpenResume,
  activeTheme = 'emerald'
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'nyx',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text:
        `🌌 **SYSTEM INITIALIZED // NYX ONLINE**\n\n` +
        `Greetings, Operator. I am **Nyx**, the tactical intelligence AI representing **D R Akshay**.\n\n` +
        `I have direct access to Akshay's complete operational dossier. Ask me about his **resume PDF**, **1,000+ branch enterprise infrastructure experience**, **cybersecurity & EDR/XDR skillset**, **classified 3D projects**, or **contact uplink**.\n\n` +
        `*Tip: You can type your questions or use the 🎙️ voice microphone to speak!*`,
      actionButtons: [
        { label: '📄 Resume Summary & PDF', action: 'open_resume', icon: 'FileText' },
        { label: '🏢 Enterprise Experience', action: 'send_query', query: 'Summarize Akshay\'s experience at Muthoot Mcred' },
        { label: '🛡️ Cyber Defense Skills', action: 'send_query', query: 'What are his cybersecurity and EDR skills?' }
      ],
      followUps: [
        'Tell me about his key projects',
        'Can I download his resume?',
        'How do I contact Akshay?'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [hasNewMessagePing, setHasNewMessagePing] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          sounds.playMicActive();
        };

        recognition.onresult = (event) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setInputQuery(transcript);
        };

        recognition.onerror = (event) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
      setHasNewMessagePing(false);
    }
  }, [isOpen, isMinimized]);

  // Text-To-Speech function
  const speakText = (text) => {
    if (typeof window === 'undefined' || !window.speechSynthesis || !isVoiceOutputEnabled) {
      return;
    }

    try {
      window.speechSynthesis.cancel();

      // Clean markdown tags for natural speech
      const cleaned = text
        .replace(/[*_#`~[\]()]/g, ' ')
        .replace(/https?:\/\/\S+/g, 'link')
        .replace(/[•–—]/g, ', ')
        .replace(/\s+/g, ' ')
        .trim();

      if (!cleaned) return;

      const utterance = new SpeechSynthesisUtterance(cleaned);
      const voices = window.speechSynthesis.getVoices();

      // Look for smooth English female/AI voice
      const preferredVoice =
        voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Female'))) ||
        voices.find((v) => v.lang.startsWith('en')) ||
        voices[0];

      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Toggle speech-to-text mic
  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      stopSpeaking();
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Recognition start failed', err);
      }
    }
  };

  // Send a user query
  const handleSendMessage = (queryText) => {
    const query = (queryText || inputQuery).trim();
    if (!query) return;

    stopSpeaking();
    sounds.playKeypress();

    const userMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsTyping(true);

    // Dynamic processing delay for realistic tactical feeling
    setTimeout(() => {
      const response = generateNyxResponse(query);
      const nyxMessage = {
        id: `nyx-${Date.now()}`,
        sender: 'nyx',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: response.text,
        actionButtons: response.actionButtons,
        followUps: response.followUps
      };

      setMessages((prev) => [...prev, nyxMessage]);
      setIsTyping(false);
      sounds.playNyxMessage();

      if (!isOpen) {
        setHasNewMessagePing(true);
      }

      if (isVoiceOutputEnabled) {
        speakText(response.text);
      }
    }, 450);
  };

  // Handle action button clicks inside messages
  const handleActionClick = (btn) => {
    sounds.playBeep(1000, 0.05);

    if (btn.action === 'open_resume') {
      if (onOpenResume) onOpenResume();
    } else if (btn.action === 'download_resume') {
      const link = document.createElement('a');
      link.href = '/akshay-resume.html';
      link.target = '_blank';
      link.download = 'D_R_Akshay_Resume.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (btn.action === 'scroll_section') {
      const el = document.getElementById(btn.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (btn.action === 'email') {
      window.open(`mailto:${personalInfo.email}?subject=Inquiry%20via%20Nyx%20AI`, '_blank');
    } else if (btn.action === 'send_query') {
      handleSendMessage(btn.query);
    }
  };

  const copyMessage = (text, id) => {
    sounds.playBeep(1200, 0.04);
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    sounds.playBeep(600, 0.06);
    stopSpeaking();
    setMessages([
      {
        id: 'reset-1',
        sender: 'nyx',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `🧹 **MEMORY BUFFER CLEARED**\n\nI am ready for new queries regarding Akshay's resume, enterprise experience, security skills, and projects.`,
        actionButtons: [
          { label: '📄 Resume Summary & PDF', action: 'open_resume', icon: 'FileText' },
          { label: '🏢 Enterprise Experience', action: 'send_query', query: 'Tell me about Muthoot Mcred experience' }
        ],
        followUps: [
          'What are his core cybersecurity skills?',
          'What projects has he built?'
        ]
      }
    ]);
  };

  // Formats text into readable markdown elements
  const renderMessageContent = (text) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5 leading-relaxed text-[13px] font-sans">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;

          // Process bold (**bold**) and inline code (`code`)
          const formatted = line.split(/(\*\*.*?\*\*|`.*?`)/g).map((chunk, cIdx) => {
            if (chunk.startsWith('**') && chunk.endsWith('**')) {
              return (
                <strong key={cIdx} className="font-bold text-white">
                  {chunk.slice(2, -2)}
                </strong>
              );
            }
            if (chunk.startsWith('`') && chunk.endsWith('`')) {
              return (
                <code key={cIdx} className="px-1.5 py-0.5 rounded bg-slate-900 border border-emerald-500/30 text-emerald-300 font-mono text-[11px]">
                  {chunk.slice(1, -1)}
                </code>
              );
            }
            return chunk;
          });

          // Bullet points
          if (line.trim().startsWith('• ') || line.trim().startsWith('- ')) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1 text-gray-300">
                <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                <span>{formatted}</span>
              </div>
            );
          }

          // Numbered lists
          const numMatch = line.trim().match(/^(\d+\.)\s+(.*)/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1 text-gray-300">
                <span className="text-cyan-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                  {numMatch[1]}
                </span>
                <span>{formatted}</span>
              </div>
            );
          }

          return (
            <p key={idx} className="text-gray-300">
              {formatted}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* ======================================================== */}
      {/* 1. FLOATING ACTION ACCESS TRIGGER (BOTTOM-RIGHT CORNER)  */}
      {/* ======================================================== */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
        {/* Unread / Helpful callout beacon badge (when closed) */}
        {!isOpen && (
          <div
            onClick={() => {
              sounds.playNyxOpen();
              onToggle();
            }}
            className="group cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/95 border border-emerald-500/50 shadow-2xl backdrop-blur-md glow-green hover:border-emerald-400 transition-all duration-300 animate-bounce-subtle"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-xs font-bold text-emerald-300 tracking-wider">
              ASK NYX // AI ASSISTANT
            </span>
            <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-[10px] font-mono text-cyan-300 border border-emerald-500/30">
              [N]
            </span>
          </div>
        )}

        {/* Tactical Circular Orb Launcher Button */}
        <button
          onClick={() => {
            if (isOpen) {
              sounds.playNyxClose();
              stopSpeaking();
            } else {
              sounds.playNyxOpen();
            }
            onToggle();
          }}
          aria-label="Toggle Nyx AI Chatbot"
          title="Toggle Nyx AI Tactical Assistant [Press N]"
          className={`relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
            isOpen
              ? 'bg-slate-950 border-2 border-emerald-400 text-emerald-400 shadow-[0_0_25px_rgba(0,255,102,0.5)]'
              : 'bg-gradient-to-tr from-slate-950 via-slate-900 to-emerald-950 border-2 border-emerald-500/80 text-emerald-400 hover:scale-105 shadow-[0_0_30px_rgba(0,255,102,0.4)] hover:shadow-[0_0_45px_rgba(0,255,102,0.7)]'
          }`}
        >
          {/* Outer rotating tactical radar ring */}
          <div
            className={`absolute -inset-1 rounded-full border border-dashed border-emerald-500/40 pointer-events-none ${
              isOpen ? 'animate-spin-slow' : 'group-hover:animate-spin-slow'
            }`}
            style={{ animationDuration: '20s' }}
          />

          {/* Pulse aura */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition" />

          {/* Icon */}
          {isOpen ? (
            <X className="w-6 h-6 text-emerald-400 transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
              {/* Center tactical dot */}
              <span className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>
          )}

          {/* Small online beacon on orb */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-md" />
        </button>
      </div>

      {/* ======================================================== */}
      {/* 2. EXPANDED POP-UP TAB (DOCKED AT BOTTOM-RIGHT)          */}
      {/* ======================================================== */}
      {isOpen && (
        <div
          className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] md:w-[440px] flex flex-col rounded-2xl bg-slate-950/95 border border-emerald-500/50 shadow-[0_0_60px_rgba(0,255,102,0.3)] backdrop-blur-xl overflow-hidden transition-all duration-300 animate-fadeIn ${
            isMinimized ? 'h-[64px]' : 'h-[82vh] max-h-[640px]'
          }`}
        >
          {/* POP-UP TAB HEADER */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-emerald-500/30 select-none">
            {/* Left: Avatar & Tactical Title */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-slate-950 border border-emerald-400/80 flex items-center justify-center shadow-md">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                </div>
                {/* Heartbeat pulse */}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950 animate-ping" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black font-tactical tracking-wide text-white">
                    NYX // CYBER TACTICAL AI
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    V2.4
                  </span>
                </div>
                <div className="text-[10px] font-mono text-gray-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>INTELLIGENCE ORACLE • AKSHAY DOSSIER</span>
                </div>
              </div>
            </div>

            {/* Right: Controls (Voice Output, Clear, Minimize, Close) */}
            <div className="flex items-center gap-1 text-gray-400">
              {/* Voice Output Toggle */}
              <button
                onClick={() => {
                  sounds.playBeep(isVoiceOutputEnabled ? 600 : 1200, 0.05);
                  if (isSpeaking) stopSpeaking();
                  setIsVoiceOutputEnabled(!isVoiceOutputEnabled);
                }}
                className={`p-1.5 rounded-lg border transition ${
                  isVoiceOutputEnabled
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 glow-green'
                    : 'bg-slate-900 border-slate-800 hover:text-white'
                }`}
                title={isVoiceOutputEnabled ? 'Voice Output: ACTIVE (Click to mute)' : 'Voice Output: MUTED (Click to speak answers)'}
                aria-label="Toggle voice output"
              >
                {isVoiceOutputEnabled ? (
                  <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>

              {/* Clear chat history */}
              {!isMinimized && (
                <button
                  onClick={clearChat}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-rose-400 transition"
                  title="Purge chat history"
                  aria-label="Clear chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              {/* Minimize / Expand */}
              <button
                onClick={() => {
                  sounds.playBeep(900, 0.04);
                  setIsMinimized(!isMinimized);
                }}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-white transition"
                title={isMinimized ? 'Expand pop-up tab' : 'Minimize pop-up tab'}
                aria-label="Minimize or Expand"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>

              {/* Close Pop-up */}
              <button
                onClick={() => {
                  sounds.playNyxClose();
                  stopSpeaking();
                  onToggle();
                }}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:bg-slate-800 transition"
                title="Close Nyx Assistant [ESC]"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ACTIVE VOICE BAR (WHILE NYX IS SPEAKING) */}
          {isSpeaking && !isMinimized && (
            <div className="bg-emerald-950/80 border-b border-emerald-500/40 px-4 py-1.5 flex items-center justify-between text-xs font-mono text-emerald-300 animate-pulse">
              <div className="flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                <span>NYX IS SPEAKING...</span>
              </div>
              <button
                onClick={stopSpeaking}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-emerald-500/40 text-[11px] text-rose-300 hover:bg-rose-950 transition"
              >
                <Square className="w-3 h-3 fill-current" />
                <span>Stop Voice</span>
              </button>
            </div>
          )}

          {/* POP-UP BODY (MESSAGES) */}
          {!isMinimized && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/80">
              {messages.map((msg) => {
                const isNyx = msg.sender === 'nyx';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isNyx ? 'items-start' : 'items-end'}`}
                  >
                    {/* Message Header Pill */}
                    <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] font-mono text-gray-500">
                      {isNyx ? (
                        <>
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">NYX AI</span>
                          <span>• {msg.timestamp}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-cyan-400 font-bold">YOU // OPERATOR</span>
                          <span>• {msg.timestamp}</span>
                          <User className="w-3 h-3 text-cyan-400" />
                        </>
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`relative max-w-[92%] sm:max-w-[88%] p-3.5 rounded-2xl shadow-lg ${
                        isNyx
                          ? 'bg-slate-900/90 border border-emerald-500/35 text-gray-200 rounded-tl-sm'
                          : 'bg-cyan-950/40 border border-cyan-500/40 text-cyan-100 rounded-tr-sm'
                      }`}
                    >
                      {/* Message Content */}
                      {renderMessageContent(msg.text)}

                      {/* Interactive Action Buttons */}
                      {isNyx && msg.actionButtons && msg.actionButtons.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-2">
                          {msg.actionButtons.map((btn, bIdx) => (
                            <button
                              key={bIdx}
                              onClick={() => handleActionClick(btn)}
                              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-500/10 text-emerald-300 font-mono text-xs transition glow-green"
                            >
                              {btn.action === 'open_resume' && <FileText className="w-3.5 h-3.5" />}
                              {btn.action === 'download_resume' && <Download className="w-3.5 h-3.5" />}
                              {btn.action === 'scroll_section' && <ExternalLink className="w-3.5 h-3.5" />}
                              {btn.action === 'send_query' && <CornerDownLeft className="w-3.5 h-3.5" />}
                              <span>{btn.label}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Message Utilities (Copy & Replay Speech) */}
                      {isNyx && (
                        <div className="mt-2 flex items-center justify-end gap-2 pt-1 text-[10px] font-mono text-gray-500">
                          <button
                            onClick={() => copyMessage(msg.text, msg.id)}
                            className="hover:text-emerald-400 transition flex items-center gap-1"
                            title="Copy response to clipboard"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => speakText(msg.text)}
                            className="hover:text-cyan-400 transition flex items-center gap-1"
                            title="Listen to this answer"
                          >
                            <Play className="w-2.5 h-2.5" />
                            <span>Speak</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Follow-up question chips */}
                    {isNyx && msg.followUps && msg.followUps.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                        {msg.followUps.map((chip, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => handleSendMessage(chip)}
                            className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-gray-400 hover:text-emerald-300 hover:border-emerald-500/40 transition"
                          >
                            💬 {chip}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing / Processing Indicator */}
              {isTyping && (
                <div className="flex flex-col items-start space-y-1">
                  <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>NYX IS ACCESSING TACTICAL DOSSIER...</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse delay-100" />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse delay-200" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* POP-UP QUICK SUGGESTION CHIPS TRAY */}
          {!isMinimized && messages.length <= 2 && (
            <div className="px-3 py-2 bg-slate-900/50 border-t border-slate-900 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-mono text-gray-500 shrink-0">QUICK INTEL:</span>
              {quickSuggestions.slice(0, 4).map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(sug.query)}
                  className="px-2 py-1 rounded bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-gray-300 hover:text-emerald-300 text-[11px] font-mono whitespace-nowrap transition shrink-0"
                >
                  {sug.label}
                </button>
              ))}
            </div>
          )}

          {/* POP-UP INPUT BAR & VOICE CONTROLS */}
          {!isMinimized && (
            <div className="p-3 bg-slate-950 border-t border-emerald-500/30">
              {/* Listening feedback pulse */}
              {isListening && (
                <div className="mb-2 px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-between text-xs font-mono text-emerald-300 animate-pulse">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span>LISTENING... SPEAK YOUR QUESTION</span>
                  </div>
                  <button
                    onClick={toggleListening}
                    className="text-[10px] text-rose-300 hover:underline"
                  >
                    Done Speaking
                  </button>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                {/* Voice / Mic Button */}
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center shrink-0 ${
                    isListening
                      ? 'bg-rose-500/20 border-rose-500 text-rose-400 glow-red animate-pulse'
                      : 'bg-slate-900 border-slate-800 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/40'
                  }`}
                  title={speechSupported ? (isListening ? 'Stop listening' : 'Speak your question (Voice input)') : 'Speech input not supported'}
                  aria-label="Voice input"
                >
                  {isListening ? (
                    <Mic className="w-4 h-4 text-rose-400 animate-bounce" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </button>

                {/* Text input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask Nyx about Akshay's resume, experience, skills..."
                  className="flex-1 px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-emerald-400 text-xs sm:text-sm font-mono text-white placeholder-gray-500 focus:outline-none transition shadow-inner"
                />

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!inputQuery.trim()}
                  className={`p-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center shrink-0 ${
                    inputQuery.trim()
                      ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 glow-green shadow-lg'
                      : 'bg-slate-900 text-gray-600 border border-slate-800 cursor-not-allowed'
                  }`}
                  aria-label="Send query"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Bottom footer tip */}
              <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-gray-500">
                <span>Nyx AI Oracle • Tactical Assistant</span>
                <span className="hidden sm:inline">Press Enter to send</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
