"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiSendPlaneLine,
  RiCheckDoubleLine,
  RiArrowRightLine,
  RiUser3Line,
  RiMessage2Line,
} from "react-icons/ri";

/* ─────────────── FLOATING ORB ─────────────── */
function Orb({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[100px] pointer-events-none opacity-40 dark:opacity-20 ${className}`}
      animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.6, 0.4] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ─────────────── CONTACT INFO CARD ─────────────── */
function InfoCard({
  icon,
  label,
  value,
  href,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState(false);

  const Tag = href ? "a" : "div";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Tag
        {...(href ? { href } : {})}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`
          flex items-center gap-4 p-4 rounded-2xl border
          transition-all duration-300 cursor-pointer group
          ${hovered
            ? "border-orange-400 bg-white dark:border-zinc-500 dark:bg-zinc-900 shadow-md"
            : "border-zinc-500/60 dark:border-zinc-500/60 bg-zinc-50/80 dark:bg-zinc-800/70"
          }
          backdrop-blur-sm
        `}
      >
        <div
          className={`
            w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0
            transition-all duration-300
            ${hovered
              ? "bg-linear-to-br from-orange-500 to-red-500 dark:from-violet-600 dark:to-blue-600 text-white shadow-sm"
              : "bg-zinc-200 dark:bg-zinc-100/80 text-zinc-500 dark:text-zinc-900"
            }
          `}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-600 dark:text-zinc-300 mb-0.5">
            {label}
          </p>
          <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200 truncate">
            {value}
          </p>
        </div>
        {href && (
          <RiArrowRightLine
            className={`ml-auto shrink-0 transition-all duration-300 text-zinc-300 dark:text-zinc-600
              ${hovered ? "translate-x-1 text-orange-500 dark:text-violet-400" : ""}`}
          />
        )}
      </Tag>
    </motion.div>
  );
}

/* ─────────────── FORM FIELD ─────────────── */
function FormField({
  label,
  icon,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  multiline = false,
  required = false,
}: {
  label: string;
  icon: React.ReactNode;
  type?: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const Tag = multiline ? "textarea" : "input";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
        <span className="text-zinc-600 dark:text-zinc-300">{icon}</span>
        {label} {required && <span className="text-red-500/80">*</span>}
      </label>
      <div className={`
        relative rounded-xl border transition-all duration-300
        ${focused
          ? "border-orange-400/60 dark:border-violet-500/50 bg-white dark:bg-zinc-900 shadow-sm"
          : "border-zinc-200/80 dark:border-zinc-800/70 bg-zinc-50/40 dark:bg-zinc-900/20"
        }
      `}>
        <Tag
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={multiline ? 4 : undefined}
          required={required}
          className={`
            w-full bg-transparent px-4 py-3 text-[13px] font-medium
            text-zinc-800 dark:text-zinc-200
            placeholder:text-zinc-500 
            focus:outline-none resize-none
            ${multiline ? "min-h-25" : ""}
          `}
        />
      </div>
    </div>
  );
}

/* ─────────────── LEFT PANEL (3D TILT) ─────────────── */
function LeftPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-0.5, 0.5], [5, -5]);
  const rotY = useTransform(mx, [-0.5, 0.5], [-5, 5]);
  const sRotX = useSpring(rotX, { stiffness: 100, damping: 22 });
  const sRotY = useSpring(rotY, { stiffness: 100, damping: 22 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() { mx.set(0); my.set(0); }

  return (
    <div
      ref={ref}
      className="flex flex-col gap-8 max-w-md mx-auto lg:max-w-none"
      style={{ perspective: "1000px" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="block text-xs font-extrabold tracking-widest uppercase mb-3
                         text-orange-500 dark:text-violet-500">
          get in touch
        </span>
        <h2 className="font-bold leading-tight
                       sm:text-5xl text-3xl text-zinc-900 dark:text-zinc-100">
          Let's build{" "}
          <span className=" bg-linear-to-r from-orange-500 to-red-500
                         dark:from-violet-500
                         dark:via-blue-500 dark:to-purple-500
                         bg-clip-text text-transparent">
            something
          </span>
          <br />great together
        </h2>
        <p className="mt-4  text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
          Have a project in mind? We'd love to hear about it. Drop us a message or reach out directly — we typically respond shortly.
        </p>
      </motion.div>

      <motion.div
        style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: "preserve-3d" }}
        className="flex flex-col gap-3"
      >
        <InfoCard
          icon={<RiMailLine />}
          label="Email us"
          value="hello@s3dwebsolutions.com"
          href="mailto:hello@s3dwebsolutions.com"
          delay={0.1}
        />
        <InfoCard
          icon={<RiPhoneLine />}
          label="Call us"
          value="+91 82188 85483"
          href="tel:+918218885483"
          delay={0.18}
        />
        <InfoCard
          icon={<RiMapPinLine />}
          label="Location"
          value="Varanasi, Uttar Pradesh, India"
          delay={0.26}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl w-fit
                   border border-zinc-200/60 dark:border-zinc-800/60
                   bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-sm"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
          Usually responds within <strong className="text-zinc-700 dark:text-zinc-300">4 hours</strong>
        </span>
      </motion.div>
    </div>
  );
}

/* ─────────────── CONTACT FORM (OPTIMIZED LOOK) ─────────────── */
function ContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [fields, setFields] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch("https://s3d-backend.onrender.com/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        throw new Error(data.error || "Something went wrong while sending message.");
      }
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to establish server connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      // Slim structural design layout with rich custom soft shadow map
      className="w-full max-w-md mx-auto lg:max-w-none rounded-2xl
                 bg-white dark:bg-zinc-900
                 shadow-[0_20px_50px_rgba(0,0,0,0.24)]"
    >
      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4.5"
            >
              <div className="mb-1">
                <h3 className="text-base sm:text-xl  font-bold text-zinc-900 dark:text-zinc-100 mb-0.5">
                  Send us a message
                </h3>
                <p className="text-sm text-zinc-400 dark:text-zinc-500">
                  Fill in the details and we'll get back to you shortly.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Your name"
                  icon={<RiUser3Line />}
                  placeholder="John Doe"
                  name="name"
                  value={fields.name}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Email address"
                  icon={<RiMailLine />}
                  type="email"
                  placeholder="john@example.com"
                  name="email"
                  value={fields.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <FormField
                label="Phone number"
                icon={<RiPhoneLine />}
                type="tel"
                placeholder="+91 00000 00000"
                name="phone"
                value={fields.phone}
                onChange={handleChange}
                required
              />

              <FormField
                label="Your message"
                icon={<RiMessage2Line />}
                placeholder="Tell us about your project..."
                name="message"
                value={fields.message}
                onChange={handleChange}
                multiline
                required
              />

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="
                  w-full py-3 rounded-xl text-[13px] font-bold mt-2
                  flex items-center justify-center gap-2
                  bg-linear-to-r from-orange-500 to-red-500 text-white
                  dark:from-violet-600 dark:to-indigo-600
                  shadow-sm hover:brightness-105 transition-all duration-200
                  disabled:opacity-60 relative overflow-hidden
                "
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                      Sending...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      Send Message
                      <RiSendPlaneLine className="text-xs" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex flex-col items-center justify-center text-center py-10 gap-4"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl
                              bg-green-500 text-white shadow-md shadow-green-500/10"
              >
                <RiCheckDoubleLine />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  Message sent!
                </h3>
                <p className="text-[12px] text-zinc-400 dark:text-zinc-500 leading-relaxed max-w-65 mx-auto">
                  Thanks for reaching out. We'll get back to you within 2 hours.
                </p>
              </div>
              <button
                type="button"
                onClick={() => { setSubmitted(false); setFields({ name: "", email: "", phone: "", message: "" }); }}
                className="text-[12px] font-semibold text-orange-500 dark:text-violet-400
                           hover:opacity-80 transition-opacity mt-2"
              >
                Send another message
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─────────────── MAIN EXPORT ─────────────── */
export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className="relative w-full py-20 px-6 md:px-12 lg:px-20 ">


      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <LeftPanel />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}