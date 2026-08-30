"use client";

import { useState } from "react";
import { brand } from "@/data/site";

/** No backend on this build, so "sending" opens the visitor's own mail app
 *  with the message pre-filled to care@silverplay.in — a real, working
 *  handoff rather than a form that pretends to submit somewhere. */
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || `Message from ${form.name || "your website"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`);
    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
  };

  const field = "w-full rounded-[var(--radius-sm)] border border-ink/15 bg-transparent px-4 py-3 font-body text-[0.95rem] text-ink outline-none transition-colors duration-300 focus:border-[#8a6a2e] placeholder:text-ink/35";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block font-display text-[0.62rem] uppercase tracking-[0.16em] text-ink/55">
            Name *
          </label>
          <input id="name" required value={form.name} onChange={set("name")} className={field} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block font-display text-[0.62rem] uppercase tracking-[0.16em] text-ink/55">
            Email *
          </label>
          <input id="email" type="email" required value={form.email} onChange={set("email")} className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block font-display text-[0.62rem] uppercase tracking-[0.16em] text-ink/55">
          Subject
        </label>
        <input id="subject" value={form.subject} onChange={set("subject")} className={field} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block font-display text-[0.62rem] uppercase tracking-[0.16em] text-ink/55">
          Message *
        </label>
        <textarea id="message" required rows={5} value={form.message} onChange={set("message")} className={field} />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-display text-[0.68rem] uppercase tracking-[0.22em] text-bone transition-colors duration-500 hover:bg-ink-3"
      >
        Send Message
        <span aria-hidden>&rarr;</span>
      </button>
    </form>
  );
}
