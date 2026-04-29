"use client";

import {
  ChevronRight, Mail, MapPin, Linkedin, Github, Instagram,
  SendHorizonal, CheckCircle, AlertCircle, Loader2,
} from "lucide-react";
import { goalsData } from "@/data/goals";
import { useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

const currentYear = new Date().getFullYear();

export function Footer() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio Contact from ${form.name}`,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const socials = [
    {
      href: "https://www.linkedin.com/in/rudnie-casinillo/",
      icon: <Linkedin className="w-4 h-4" />,
      label: "LinkedIn",
      handle: "rudnie-casinillo",
    },
    {
      href: "https://github.com/rudnie-casinillo",
      icon: <Github className="w-4 h-4" />,
      label: "GitHub",
      handle: "rudnie",
    },
    {
      href: "https://www.instagram.com/_whois.rdn/?hl=en",
      icon: <Instagram className="w-4 h-4" />,
      label: "Instagram",
      handle: "_whois.rdn",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

        {/* Goals */}
        <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl shadow-lg border border-gray-300 dark:border-zinc-700 p-6 transition-all hover:shadow-lg h-full">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">Goals</h3>
          <ul className="space-y-1.5">
            {goalsData.map((goal, idx) => (
              <li key={idx} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl shadow-lg border border-gray-300 dark:border-zinc-700 p-6 transition-all hover:shadow-lg h-full">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">Connect With Me</h3>
          <div className="flex flex-col gap-3">
            {socials.map(({ href, icon, label, handle }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all group"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                  {icon}
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">{label}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{handle}</span>
                </div>
                <ChevronRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl shadow-lg border border-gray-300 dark:border-zinc-700 p-6 transition-all hover:shadow-lg h-full flex flex-col">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">Contact</h3>

          {status === "success" ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center py-6">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Message Sent!</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 flex-1">
              {status === "error" && (
                <div className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-xs text-red-600 dark:text-red-400">
                    Something went wrong. Please try again.
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  disabled={status === "loading"}
                  className={`w-full rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-zinc-900 border text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none transition-colors disabled:opacity-50 ${
                    errors.name
                      ? "border-red-400 dark:border-red-500 focus:border-red-400"
                      : "border-gray-300 dark:border-zinc-600 focus:border-blue-500 dark:focus:border-blue-500"
                  }`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-0.5">{errors.name}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  disabled={status === "loading"}
                  className={`w-full rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-zinc-900 border text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none transition-colors disabled:opacity-50 ${
                    errors.email
                      ? "border-red-400 dark:border-red-500 focus:border-red-400"
                      : "border-gray-300 dark:border-zinc-600 focus:border-blue-500 dark:focus:border-blue-500"
                  }`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>}
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about opportunities, collaboration, or just say hi..."
                  disabled={status === "loading"}
                  className={`w-full flex-1 min-h-[80px] rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-zinc-900 border text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none transition-colors resize-none h-full disabled:opacity-50 ${
                    errors.message
                      ? "border-red-400 dark:border-red-500 focus:border-red-400"
                      : "border-gray-300 dark:border-zinc-600 focus:border-blue-500 dark:focus:border-blue-500"
                  }`}
                />
                {errors.message && <p className="text-xs text-red-500 mt-0.5">{errors.message}</p>}
              </div>

              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <SendHorizonal className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-sm text-gray-400 dark:text-gray-500">
        <p>© {currentYear} Rudnie Casinillo. All rights reserved.</p>
      </div>
    </>
  );
}