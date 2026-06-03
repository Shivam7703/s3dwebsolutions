"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  RiWhatsappLine,
  RiChat3Line,
  RiCloseLine,
  RiSendPlaneFill,
  RiUser3Line,
  RiRobot2Line,
  RiArrowLeftLine,
  RiCheckDoubleLine,
} from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";

/* ─────────────── TYPES ─────────────── */
type ChatMode = null | "whatsapp" | "chat";
interface Message {
  id: number;
  from: "user" | "bot";
  text: string;
  time: string;
}

const WHATSAPP_NUMBER = "918218885483";
const WHATSAPP_MSG    = encodeURIComponent("Hi S3D Web Solutions! I'd like to discuss a project.");

/* ─────────────── BOT REPLIES ─────────────── */
const BOT_REPLIES = [
  "Hey! 👋 Thanks for reaching out to S3D Web Solutions. How can we help you today?",
  "Great question! Our team typically responds within 2 hours. Could you tell us more about your project?",
  "We specialize in Next.js, React, brand identity, and 3D web experiences. What are you looking to build?",
  "Awesome! Let me connect you with our team. In the meantime, feel free to share any references or details.",
  "We'd love to work with you! You can also reach us directly on WhatsApp for a faster response. 🚀",
];

function getTime() {
  const d = new Date();
  return `${d.getHours() % 12 || 12}:${d.getMinutes().toString().padStart(2, "0")} ${d.getHours() >= 12 ? "PM" : "AM"}`;
}

/* ─────────────── 3D ORBIT FAB ─────────────── */
function OrbitFAB({ onClick }: { onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-0.5, 0.5], [15, -15]);
  const rotY = useTransform(mx, [-0.5, 0.5], [-15, 15]);
  const sRotX = useSpring(rotX, { stiffness: 200, damping: 18 });
  const sRotY = useSpring(rotY, { stiffness: 200, damping: 18 });

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() { mx.set(0); my.set(0); }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: "600px" }}
      whileTap={{ scale: 0.92 }}
      className="relative focus:outline-none"
      aria-label="Open chat"
    >
      <motion.div
        style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: "preserve-3d" }}
        className="relative w-14 h-14"
      >
        {/* Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl blur-xl
                     bg-orange-500/50 dark:bg-violet-600/50"
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(-10px)" }}
        />
        {/* Button face */}
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center
                     bg-gradient-to-br from-orange-500 to-red-500
                     dark:from-violet-600 dark:via-blue-600 dark:to-purple-600
                     shadow-lg shadow-orange-300/40 dark:shadow-violet-900/50"
          style={{ transform: "translateZ(4px)" }}
        >
          <RiChat3Line className="text-white text-2xl" />
        </div>
        {/* Gloss */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            transform: "translateZ(6px)",
            background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%)",
          }}
        />
      </motion.div>

      {/* Ping ring */}
      <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full
                         bg-orange-400 dark:bg-violet-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3
                         bg-orange-500 dark:bg-violet-500" />
      </span>
    </motion.button>
  );
}

/* ─────────────── MENU PANEL ─────────────── */
function MenuPanel({ onSelect }: { onSelect: (m: "whatsapp" | "chat") => void }) {
  return (
    <motion.div
      key="menu"
      initial={{ opacity: 0, scale: 0.88, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 16 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="w-[220px] rounded-2xl overflow-hidden
                 border border-zinc-200/60 dark:border-zinc-800/60
                 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl
                 shadow-2xl shadow-black/10 dark:shadow-black/40"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
        <p className="text-[11px] font-bold tracking-widest uppercase
                      text-zinc-400 dark:text-zinc-600">
          Talk to us
        </p>
        <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">
          S3D Web Solutions
        </p>
      </div>

      {/* Options */}
      <div className="p-2 flex flex-col gap-1.5">
        <button
          onClick={() => onSelect("whatsapp")}
          className="flex items-center gap-3 px-3 py-3 rounded-xl w-full text-left
                     hover:bg-emerald-50 dark:hover:bg-emerald-900/20
                     transition-colors duration-200 group"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center
                          bg-emerald-500 text-white text-lg shrink-0
                          group-hover:scale-110 transition-transform duration-200">
            <FaWhatsapp />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">WhatsApp</p>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Fast response</p>
          </div>
        </button>

        <button
          onClick={() => onSelect("chat")}
          className="flex items-center gap-3 px-3 py-3 rounded-xl w-full text-left
                     hover:bg-orange-50 dark:hover:bg-violet-900/20
                     transition-colors duration-200 group"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0
                          bg-gradient-to-br from-orange-500 to-red-500
                          dark:from-violet-600 dark:to-blue-600 text-white
                          group-hover:scale-110 transition-transform duration-200">
            <RiChat3Line />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">Live Chat</p>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Chat with our team</p>
          </div>
        </button>
      </div>

      {/* Online badge */}
      <div className="px-4 pb-3 flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
          Team online now
        </span>
      </div>
    </motion.div>
  );
}

/* ─────────────── WHATSAPP REDIRECT ─────────────── */
function WhatsAppPanel({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    const t = setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`, "_blank");
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      key="wa"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="w-[260px] rounded-2xl overflow-hidden
                 border border-zinc-200/60 dark:border-zinc-800/60
                 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl
                 shadow-2xl shadow-black/10 dark:shadow-black/40"
    >
      <div className="p-5 flex flex-col items-center gap-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-3xl shadow-lg shadow-emerald-300/30">
          <FaWhatsapp />
        </div>
        <div>
          <p className="text-[14px] font-bold text-zinc-800 dark:text-zinc-200">Opening WhatsApp</p>
          <p className="text-[12px] text-zinc-400 dark:text-zinc-500 mt-1">
            Redirecting you to chat with our team...
          </p>
        </div>
        <motion.div
          className="w-full h-1 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "linear" }}
            className="h-full rounded-full bg-emerald-500"
          />
        </motion.div>
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[12px] text-zinc-400 dark:text-zinc-500
                     hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
        >
          <RiArrowLeftLine /> Go back
        </button>
      </div>
    </motion.div>
  );
}

/* ─────────────── CHAT BOX ─────────────── */
function ChatBox({ onBack, isMobile }: { onBack: () => void; isMobile: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "bot", text: "Hey! 👋 Welcome to S3D Web Solutions. How can we help you today?", time: getTime() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [replyIdx, setReplyIdx] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function sendMessage() {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), from: "user", text: input, time: getTime() };
    setMessages(p => [...p, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const botMsg: Message = {
        id: Date.now() + 1,
        from: "bot",
        text: BOT_REPLIES[replyIdx % BOT_REPLIES.length],
        time: getTime(),
      };
      setMessages(p => [...p, botMsg]);
      setReplyIdx(i => i + 1);
    }, 1400);
  }

  const boxClass = isMobile
    ? "fixed inset-0 z-[200] flex flex-col bg-white dark:bg-zinc-950"
    : "w-[320px] h-[460px] rounded-2xl flex flex-col overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/50";

  return (
    <motion.div
      key="chatbox"
      initial={{ opacity: 0, y: isMobile ? "100%" : 20, scale: isMobile ? 1 : 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: isMobile ? "100%" : 20, scale: isMobile ? 1 : 0.94 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className={boxClass}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b
                      border-zinc-100 dark:border-zinc-800
                      bg-white dark:bg-zinc-900 shrink-0">
        {isMobile && (
          <button onClick={onBack}
            className="w-8 h-8 rounded-xl flex items-center justify-center
                       text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200
                       hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
            <RiArrowLeftLine />
          </button>
        )}
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0
                        bg-gradient-to-br from-orange-500 to-red-500
                        dark:from-violet-600 dark:to-blue-600">
          <RiRobot2Line className="text-lg" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-zinc-800 dark:text-zinc-200">S3D Support</p>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500">Online</span>
          </div>
        </div>
        {!isMobile && (
          <button onClick={onBack}
            className="w-8 h-8 rounded-xl flex items-center justify-center
                       text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200
                       hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
            <RiCloseLine className="text-lg" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3
                      scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`flex gap-2 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-auto text-[10px] text-white
              ${msg.from === "bot"
                ? "bg-gradient-to-br from-orange-500 to-red-500 dark:from-violet-600 dark:to-blue-600"
                : "bg-zinc-700 dark:bg-zinc-600"
              }`}>
              {msg.from === "bot" ? <RiRobot2Line /> : <RiUser3Line />}
            </div>

            <div className={`flex flex-col gap-0.5 max-w-[76%] ${msg.from === "user" ? "items-end" : "items-start"}`}>
              <div className={`px-3.5 py-2.5 rounded-2xl text-[13px] leading-[1.6] font-medium
                ${msg.from === "user"
                  ? "bg-gradient-to-br from-orange-500 to-red-500 dark:from-violet-600 dark:to-blue-600 text-white rounded-tr-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-sm"
                }`}>
                {msg.text}
              </div>
              <div className={`flex items-center gap-1 px-1 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
                <span className="text-[10px] text-zinc-300 dark:text-zinc-600">{msg.time}</span>
                {msg.from === "user" && <RiCheckDoubleLine className="text-[10px] text-orange-400 dark:text-violet-400" />}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] text-white
                              bg-gradient-to-br from-orange-500 to-red-500 dark:from-violet-600 dark:to-blue-600">
                <RiRobot2Line />
              </div>
              <div className="px-3.5 py-3 rounded-2xl rounded-tl-sm bg-zinc-100 dark:bg-zinc-800 flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 block"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-zinc-100 dark:border-zinc-800
                      bg-white dark:bg-zinc-900 shrink-0">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl
                        border border-zinc-200/60 dark:border-zinc-800/60
                        bg-zinc-50 dark:bg-zinc-950 focus-within:border-orange-400/50 dark:focus-within:border-violet-500/40
                        transition-all duration-200">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-[13px] text-zinc-800 dark:text-zinc-200
                       placeholder:text-zinc-300 dark:placeholder:text-zinc-600
                       focus:outline-none"
          />
          <motion.button
            onClick={sendMessage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!input.trim()}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm
                       bg-gradient-to-br from-orange-500 to-red-500
                       dark:from-violet-600 dark:to-blue-600
                       text-white shadow-sm disabled:opacity-40 transition-opacity shrink-0"
          >
            <RiSendPlaneFill />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────── MAIN WIDGET ─────────────── */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  function handleClose() { setOpen(false); setMode(null); }
  function handleBack()  { setMode(null); }

  return (
    <>
      {/* Mobile chat overlay — outside fixed wrapper */}
      <AnimatePresence>
        {open && mode === "chat" && isMobile && (
          <ChatBox onBack={handleClose} isMobile={true} />
        )}
      </AnimatePresence>

      {/* Fixed bottom-right container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">

        {/* Floating panel (menu / whatsapp / chat desktop) */}
        <AnimatePresence mode="wait">
          {open && mode === null && (
            <MenuPanel onSelect={m => {
              if (m === "whatsapp") setMode("whatsapp");
              else setMode("chat");
            }} />
          )}
          {open && mode === "whatsapp" && (
            <WhatsAppPanel onBack={handleBack} />
          )}
          {open && mode === "chat" && !isMobile && (
            <ChatBox onBack={handleBack} isMobile={false} />
          )}
        </AnimatePresence>

        {/* FAB row — Chat + WhatsApp buttons */}
        <div className="flex items-center gap-3">

          {/* WhatsApp quick button */}
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-12 h-12 rounded-2xl flex items-center justify-center
                       bg-emerald-500 hover:bg-emerald-600
                       text-white text-2xl
                       shadow-lg shadow-emerald-400/30
                       transition-colors duration-200"
          >
            <FaWhatsapp />
            {/* Ping */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
            </span>
          </motion.a>

          {/* Main 3D Chat FAB */}
          <AnimatePresence mode="wait">
            {open ? (
              <motion.button
                key="close"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={handleClose}
                className="w-14 h-14 rounded-2xl flex items-center justify-center
                           bg-zinc-800 dark:bg-zinc-700 text-white text-2xl
                           shadow-lg hover:scale-105 transition-transform"
                aria-label="Close"
              >
                <RiCloseLine />
              </motion.button>
            ) : (
              <motion.div
                key="fab"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <OrbitFAB onClick={() => setOpen(true)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </>
  );
}