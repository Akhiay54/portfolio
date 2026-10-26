"use client";

import emailjs from "@emailjs/browser";
import React, { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";
import { isValidEmail } from "@/../utils/check-email";
import { personalData } from "@/../utils/Data/PersonalData";
import { User, Mail, MessageSquare } from "lucide-react";

const emailJsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

const isConfigured = Boolean(
  emailJsConfig.serviceId &&
    emailJsConfig.templateId &&
    emailJsConfig.publicKey,
);

const ContactForm = () => {
  const [input, setInput] = useState({ name: "", email: "", message: "" });
  const [emailError, setEmailError] = useState(false);
  const [requiredError, setRequiredError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange =
    (field: keyof typeof input) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInput((current) => ({ ...current, [field]: event.target.value }));
      if (field === "email" && emailError && isValidEmail(event.target.value)) {
        setEmailError(false);
      }
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!input.name || !input.email || !input.message) {
      setRequiredError(true);
      return;
    }
    if (!isValidEmail(input.email)) {
      setEmailError(true);
      return;
    }
    setRequiredError(false);

    if (!isConfigured) {
      toast.error(
        `Contact form is offline. Please email ${personalData.email}.`,
      );
      return;
    }

    try {
      setIsLoading(true);
      const res = await emailjs.send(
        emailJsConfig.serviceId!,
        emailJsConfig.templateId!,
        {
          from_name: input.name,
          email: input.email,
          message: `${input.message} \nEmail: ${input.email}`,
        },
        { publicKey: emailJsConfig.publicKey! },
      );

      if (res.status === 200) {
        toast.success("Message sent successfully!");
        setInput({ name: "", email: "", message: "" });
      } else {
        toast.error("Message could not be sent. Please try again.");
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative group p-8 lg:p-10 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl shadow-2xl">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Send a Message
          </h3>
          <p className="text-slate-400 text-sm">
            I&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 group/input">
            <label
              htmlFor="contact-name"
              className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within/input:text-brand transition-colors"
            >
              <User className="w-4 h-4" aria-hidden="true" />
              Your Name
            </label>
            <input
              id="contact-name"
              name="name"
              className="bg-white/5 w-full border border-white/10 rounded-2xl focus:border-brand/50 focus:bg-white/10 ring-0 outline-0 transition-all duration-300 px-5 py-4 text-white placeholder:text-slate-600"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              maxLength={100}
              required
              value={input.name}
              onChange={handleChange("name")}
              onBlur={() => setRequiredError(false)}
            />
          </div>

          <div className="flex flex-col gap-2 group/input">
            <label
              htmlFor="contact-email"
              className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within/input:text-brand transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Your Email
            </label>
            <input
              id="contact-email"
              name="email"
              className={`bg-white/5 w-full border rounded-2xl focus:bg-white/10 ring-0 outline-0 transition-all duration-300 px-5 py-4 text-white placeholder:text-slate-600 ${emailError ? "border-brand/50" : "border-white/10 focus:border-brand/50"}`}
              type="email"
              placeholder="john@example.com"
              autoComplete="email"
              maxLength={100}
              required
              aria-invalid={emailError}
              aria-describedby={emailError ? "contact-email-error" : undefined}
              value={input.email}
              onChange={handleChange("email")}
              onBlur={() => setEmailError(!isValidEmail(input.email))}
            />
            {emailError && (
              <p id="contact-email-error" className="text-xs text-brand ml-1">
                Please provide a valid email address.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 group/input">
            <label
              htmlFor="contact-message"
              className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2 group-focus-within/input:text-brand transition-colors"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              Your Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              className="bg-white/5 w-full border border-white/10 rounded-2xl focus:border-brand/50 focus:bg-white/10 ring-0 outline-0 transition-all duration-300 px-5 py-4 text-white placeholder:text-slate-600 resize-none"
              placeholder="Tell me about your project..."
              maxLength={500}
              required
              rows={4}
              value={input.message}
              onChange={handleChange("message")}
              onBlur={() => setRequiredError(false)}
            />
          </div>

          <div className="flex flex-col gap-4 mt-2">
            {requiredError && (
              <p className="text-sm text-brand text-center font-medium">
                Oops! Looks like some fields are still empty.
              </p>
            )}

            <button
              type="submit"
              className="relative group/btn overflow-hidden rounded-2xl bg-gradient-to-r from-brand to-brand-strong p-[1px] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
              disabled={isLoading}
            >
              <div className="relative flex items-center justify-center gap-2 bg-[#050505] group-hover/btn:bg-transparent transition-all rounded-[15px] px-8 py-4 text-white font-bold uppercase tracking-widest text-sm">
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    Send Message
                    <TbMailForward
                      className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </form>

      <div className="absolute w-1 h-20 bg-gradient-to-b from-brand to-transparent left-0 top-20 rounded-full" />
    </div>
  );
};

export default ContactForm;
