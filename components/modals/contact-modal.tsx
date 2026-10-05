"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useLanguage } from "@/providers/language-provider";
import { useLenisModal } from "@/hooks/use-lenis-modal";
import { ArrowUpRight, Check, Mail, Phone, Send, Sparkles } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const { content, dict, language } = useLanguage();
  useLenisModal(open);

  const isEn = language === "en";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website_url_hp: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitting(false);
        setSubmitted(true);
      } else {
        setIsSubmitting(false);
        setErrorMessage(
          data.error ||
            (isEn
              ? "Failed to send message. Please try again."
              : "Mesaj gönderilemedi. Lütfen tekrar deneyin.")
        );
      }
    } catch (err) {
      console.error("Submission error:", err);
      setIsSubmitting(false);
      setErrorMessage(
        isEn
          ? "Network error. Please try again or email directly."
          : "Bağlantı hatası. Lütfen tekrar deneyin veya doğrudan e-posta gönderin."
      );
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMessage(null);
    setFormData({ name: "", email: "", message: "", website_url_hp: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="flex flex-col sm:max-w-[560px] p-0 gap-0 border-zinc-800/80 bg-zinc-950/95 backdrop-blur-2xl shadow-2xl overflow-hidden rounded-3xl"
      >
        {/* Subtle Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent z-10" />

        <div className="p-7 sm:p-9">
          {/* Eyebrow & Header */}
          <div className="mb-7">
            <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase font-semibold block mb-2">
              {isEn ? "GET IN TOUCH" : "İLETİŞİME GEÇİN"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2 flex-wrap">
              <span>{isEn ? "Start a" : "Bir konuşma"}</span>
              <span className="font-serif italic font-normal text-zinc-400">
                {isEn ? "conversation" : "başlatın"}
              </span>
            </h2>
          </div>

          {submitted ? (
            <div className="py-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 animate-in zoom-in-75">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {isEn ? "Message Sent Successfully!" : "Mesajınız Başarıyla İletildi!"}
              </h3>
              <p className="text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
                {isEn
                  ? "Thank you for reaching out! Your inquiry has been delivered directly to my inbox. I will review it and reply within 24 hours."
                  : "İletişime geçtiğiniz için teşekkürler! Mesajınız doğrudan gelen kutuma iletildi. 24 saat içinde dönüş yapacağım."}
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-mono uppercase tracking-wider text-primary hover:underline"
              >
                {isEn ? "Send another message" : "Başka bir mesaj gönder"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-400 font-semibold"
                  >
                    {isEn ? "NAME" : "İSİM"}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder={isEn ? "Your name" : "Adınız"}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all font-sans"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-email"
                    className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-400 font-semibold"
                  >
                    {isEn ? "EMAIL" : "E-POSTA"}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-400 font-semibold"
                >
                  {isEn ? "MESSAGE" : "MESAJ"}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  placeholder={
                    isEn
                      ? "Tell me about your project..."
                      : "Projenizden bahsedin..."
                  }
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all resize-none font-sans"
                />
                {/* Honeypot field (hidden from real users, traps spam bots) */}
                <input
                  type="text"
                  name="website_url_hp"
                  value={formData.website_url_hp}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, website_url_hp: e.target.value }))
                  }
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                  aria-hidden="true"
                />
              </div>

              {/* Error Alert Banner */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono leading-relaxed">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3.5 px-6 rounded-xl bg-zinc-200 hover:bg-white text-zinc-950 font-mono font-bold text-xs uppercase tracking-[0.18em] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                    <span>{isEn ? "SENDING..." : "GÖNDERİLİYOR..."}</span>
                  </div>
                ) : (
                  <>
                    <span>{isEn ? "SEND MESSAGE" : "MESAJ GÖNDER"}</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Quick Direct Contacts Footer */}
          <div className="mt-8 pt-6 border-t border-zinc-800/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
            <a
              href={`mailto:${content.contact.email}`}
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-500" />
              <span>{content.contact.email}</span>
            </a>

            <div className="flex items-center gap-4">
              <a
                href={content.social.find((s: { label: string }) => s.label === "LinkedIn")?.href || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
              <span className="text-zinc-700">·</span>
              <a
                href={content.social.find((s: { label: string }) => s.label === "GitHub")?.href || "https://github.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
