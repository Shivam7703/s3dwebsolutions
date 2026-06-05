"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

import {
  RiChat3Line,
  RiArrowLeftLine,
  RiRobot2Line,
  RiSunLine,
  RiMoonLine,
  RiPhoneLine,
  RiMailLine,
  RiCloseLine,
  RiSendPlaneFill,
} from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";

/* ─────────────── TYPES & CONFIG ─────────────── */
type ChatMode = null | "chat";

const WHATSAPP_NUMBER = "918218885483";
const WHATSAPP_MSG    = encodeURIComponent("Hi S3D Web Solutions! I'd like to discuss a project.");
const PHONE_NUMBER    = "+918218885483";
const EMAIL_ADDRESS   = "info@s3dwebsolutions.com";

// ⬇️ Apna Express server ka URL yahan daalein
const BACKEND_URL = "https://s3d-backend.onrender.com";

interface Message {
  role: "user" | "assistant";
  text: string;
}

interface DockItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  gradient: string;
  onClick?: () => void;
  href?: string;
}

/* ─────────────── CHAT BOX ─────────────── */
function ChatBox({ onBack, isMobile }: { onBack: () => void; isMobile: boolean }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi there! 👋 Welcome to S3D Web Solutions. How can I help you today? Feel free to share your project requirements!" },
  ]);
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).slice(2));
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Sorry, something went wrong. Please try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const boxClass = isMobile
    ? "fixed inset-0 z-[250] flex flex-col bg-white dark:bg-zinc-950"
    : "absolute bottom-16 right-0 w-[400px] h-[520px] rounded-2xl flex flex-col overflow-hidden border border-zinc-200/60 dark:border-zinc-700/60 bg-white dark:bg-zinc-900 shadow-2xl";

  return (
    <motion.div
      key="chatbox"
      initial={{ opacity: 0, y: isMobile ? "100%" : 15, scale: isMobile ? 1 : 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: isMobile ? "100%" : 15, scale: isMobile ? 1 : 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={boxClass}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
        >
          <RiArrowLeftLine />
        </button>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 bg-gradient-to-br dark:from-violet-500 dark:to-blue-500 from-orange-500 to-red-500">
          <RiRobot2Line className="text-base" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100">S3D Support</p>
          <span className="text-[10px] text-emerald-500 font-medium">● Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50 dark:bg-zinc-950">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-linear-to-br dark:from-violet-500 dark:to-blue-500 from-orange-500 to-red-500 text-white rounded-br-sm"
                  : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-bl-sm shadow-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl rounded-bl-sm shadow-sm">
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex gap-2 items-center">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-600 rounded-xl text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-600 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          className="w-10 h-10 rounded-xl bg-gradient-to-br dark:from-violet-500 dark:to-blue-500 from-orange-500 to-red-500 text-white flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition active:scale-95 shrink-0"
        >
          <RiSendPlaneFill />
        </button>
      </div>
    </motion.div>
  );
}

/* ─────────────── INDIVIDUAL DOCK ICON ─────────────── */
function DockIcon({ item }: { item: DockItem }) {
  const content = (
    <div className="relative flex flex-col items-center group cursor-pointer">
      <span className="absolute -top-8 px-2 py-0.5 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-bold whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 pointer-events-none z-50">
        {item.title}
      </span>
      <div
        className={`sm:w-10 sm:h-10 w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl sm:text-lg shadow-md border border-white/10 transition-all duration-200 transform group-hover:scale-110 active:scale-95 ${item.gradient}`}
      >
        {item.icon}
      </div>
    </div>
  );

  if (item.href) {
    return (
      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="no-underline">
        {content}
      </a>
    );
  }

  return <div onClick={item.onClick}>{content}</div>;
}

/* ─────────────── MAIN CHAT WIDGET & DOCK ─────────────── */
export default function ChatWidget() {
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>(null);
  const isDark = resolvedTheme === "dark";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggleDarkMode = () => setTheme(isDark ? "light" : "dark");

  const isChatOpen = open && mode === "chat";

  const dockItems: DockItem[] = [
    {
      id: "theme",
      title: isDark ? "Light Mode" : "Dark Mode",
      icon: isDark ? <RiSunLine /> : <RiMoonLine />,
      gradient: isDark
        ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-orange-500/10"
        : "bg-gradient-to-r from-rose-400 to-pink-700 shadow-cyan-500/10",
      onClick: toggleDarkMode,
    },
    {
      id: "call",
      title: "Call Us",
      icon: <RiPhoneLine />,
      gradient: "bg-gradient-to-br from-blue-400 to-indigo-600 shadow-blue-500/10",
      href: `tel:${PHONE_NUMBER}`,
    },
    {
      id: "chat",
      title: isChatOpen ? "Close Chat" : "Live Chat",
      // ✅ Chat open ho to Cross icon, band ho to Chat icon
      icon: isChatOpen ? <RiCloseLine className="text-xl" /> : <RiChat3Line />,
      gradient: `bg-gradient-to-br from-violet-500 to-purple-600 shadow-purple-500/10 scale-125 !-mt-2 mr-1 ml-1.25 ${
        !isChatOpen ? "animate-pulse" : ""
      }`,
      onClick: () => {
        if (isChatOpen) {
          setOpen(false);
          setMode(null);
        } else {
          setOpen(true);
          setMode("chat");
        }
      },
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      icon: <FaWhatsapp />,
      gradient: "bg-gradient-to-br from-emerald-400 to-green-600 shadow-emerald-500/10",
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`,
    },
    {
      id: "mail",
      title: "Email Us",
      icon: <RiMailLine />,
      gradient: "bg-gradient-to-br from-cyan-400 to-blue-500 shadow-cyan-500/10",
      href: `mailto:${EMAIL_ADDRESS}`,
    },
  ];

  return (
    <>
      {/* Mobile Fullscreen Chat */}
      <AnimatePresence>
        {isChatOpen && isMobile && (
          <ChatBox onBack={() => { setOpen(false); setMode(null); }} isMobile={true} />
        )}
      </AnimatePresence>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:bottom-6 md:translate-x-0 z-[200] flex flex-col items-end gap-2">

        {/* Desktop Chat Box */}
        <AnimatePresence>
          {isChatOpen && !isMobile && (
            <ChatBox onBack={() => { setOpen(false); setMode(null); }} isMobile={false} />
          )}
        </AnimatePresence>

        {/* Dock */}
        <div className="flex items-center gap-4 sm:gap-3 px-2.5 py-1.5 rounded-full border border-zinc-200/40 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-lg">
          {dockItems.map((item) => (
            <DockIcon key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}