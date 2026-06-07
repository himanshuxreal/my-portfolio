"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { openEmailCompose } from "@/lib/email";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Status = "idle" | "loading" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");

  const validate = (): boolean => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email.trim())) e.email = "Enter a valid email.";
    if (form.message.trim().length < 10) e.message = "At least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const composeEmail = () => {
    // Hands off to the Gmail app on mobile (mailto) or Gmail web on desktop,
    // with the user's name, email, and message pre-filled.
    const subject = `Portfolio message from ${form.name}`;
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    openEmailCompose(profile.email, subject, body);
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (status === "loading") return;
    if (!validate()) return;

    setStatus("loading");
    setServerMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "", company: "" });
        return;
      }
      if (data.code === "NO_PROVIDER") {
        // Email backend not configured — never lose the message.
        setServerMsg("Opening your email app with the message…");
        composeEmail();
        setStatus("idle");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setStatus("error");
      setServerMsg(data.error || "Something went wrong.");
    } catch {
      setStatus("error");
      setServerMsg("Network error. You can email me directly.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.06] p-10 text-center"
        role="status"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        >
          <CheckCircle2 className="h-14 w-14 text-emerald-400" />
        </motion.div>
        <h3 className="mt-4 font-heading text-2xl font-semibold text-white">Transmission received</h3>
        <p className="mt-2 max-w-sm font-sans text-sm text-mist">
          Thanks for reaching out — I&apos;ll get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 font-hud text-xs font-semibold uppercase tracking-[0.2em] text-monarch-glow transition hover:text-white"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Name"
          error={errors.name}
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
          placeholder="Your name"
          autoComplete="name"
        />
        <Field
          label="Email"
          type="email"
          error={errors.email}
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <FieldArea
        label="Message"
        error={errors.message}
        value={form.message}
        onChange={(v) => setForm({ ...form, message: v })}
        placeholder="Tell me about the role, project, or idea…"
      />

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <MagneticButton type="submit" variant="primary" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /> Send Message
            </>
          )}
        </MagneticButton>

        <AnimatePresence>
          {status === "error" && serverMsg && (
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-2 font-sans text-sm text-red-300"
              role="alert"
            >
              <AlertCircle className="h-4 w-4" /> {serverMsg}
            </motion.p>
          )}
          {serverMsg && status === "idle" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-sans text-sm text-mist"
            >
              {serverMsg}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="hud-label">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={cn(
          "mt-2 w-full rounded-xl border bg-white/[0.03] px-4 py-3 font-sans text-sm text-white placeholder:text-mist-dim transition focus:outline-none focus:ring-2",
          error
            ? "border-red-400/50 focus:ring-red-400/40"
            : "border-white/10 focus:border-monarch/50 focus:ring-monarch/30"
        )}
      />
      {error && <span className="mt-1 block font-sans text-xs text-red-300">{error}</span>}
    </label>
  );
}

function FieldArea({
  label,
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="hud-label">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        aria-invalid={!!error}
        className={cn(
          "mt-2 w-full resize-none rounded-xl border bg-white/[0.03] px-4 py-3 font-sans text-sm text-white placeholder:text-mist-dim transition focus:outline-none focus:ring-2",
          error
            ? "border-red-400/50 focus:ring-red-400/40"
            : "border-white/10 focus:border-monarch/50 focus:ring-monarch/30"
        )}
      />
      {error && <span className="mt-1 block font-sans text-xs text-red-300">{error}</span>}
    </label>
  );
}
