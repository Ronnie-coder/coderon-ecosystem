// src/components/ConsultationForm.tsx
"use client";

import { useEffect, useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';

export const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Free website check',
    website: '',
    message: '',
  });

  // Pre-select the topic from links like /contact/?topic=software
  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get('topic');
    const map: Record<string, string> = {
      software: 'Custom software',
      care: 'Website care plan',
      fix: 'Website fix',
      website: 'Free website check',
      new: 'New website',
    };
    if (topic && map[topic]) setFormData((prev) => ({ ...prev, service: map[topic] }));
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage('');
    setIsError(false);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.website ? `${formData.message}\n\nWebsite: ${formData.website}` : formData.message,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setFormMessage(
          "Thank you! Your request has been sent. We'll be in touch within one business day."
        );
        setIsError(false);
        setFormData({
          name: '',
          email: '',
          service: 'Free website check',
          website: '',
          message: '',
        });
      } else {
        setFormMessage(data.error || 'Something went wrong. Please try again.');
        setIsError(true);
      }
    } catch {
      setFormMessage(
        'An unexpected error occurred. Please check your connection and try again.'
      );
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Success State ---
  if (formMessage && !isError) {
    return (
      <div
        className="card flex flex-col items-start gap-3 border-ink bg-gold p-8 text-[#16130E] dark:border-gold"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <FiCheckCircle
          className="text-4xl"
          aria-hidden="true"
        />
        <h3 className="text-2xl font-extrabold">Request Sent!</h3>
        <p className="">{formMessage}</p>
      </div>
    );
  }

  return (
    <form
      className="card-pop space-y-5 p-6 md:p-8"
      onSubmit={handleSubmit}
      aria-label="Contact Coderon"
      aria-busy={isSubmitting}
      noValidate
    >

      {/* Name */}
      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-sm font-bold">
          Your name
          <span className="text-bad" aria-hidden="true"> *</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full rounded-xl border-2 border-line bg-paper px-4 py-3 outline-none transition focus:border-ink disabled:opacity-60"
          required
          autoComplete="name"
          placeholder="e.g. Thandi Mokoena"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-required="true"
          aria-disabled={isSubmitting}
        />
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-bold">
          Email
          <span className="text-bad" aria-hidden="true"> *</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full rounded-xl border-2 border-line bg-paper px-4 py-3 outline-none transition focus:border-ink disabled:opacity-60"
          required
          autoComplete="email"
          placeholder="e.g. you@company.com"
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-required="true"
          aria-disabled={isSubmitting}
        />
      </div>

      {/* Service — updated to match rewritten servicesData.ts */}
      <div className="space-y-1.5">
        <label htmlFor="service" className="block text-sm font-bold">
          What do you need help with?
          <span className="text-bad" aria-hidden="true"> *</span>
        </label>
        <div className="relative">
          <select
            id="service"
            name="service"
            className="w-full rounded-xl border-2 border-line bg-paper px-4 py-3 outline-none transition focus:border-ink disabled:opacity-60"
            required
            value={formData.service}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-required="true"
            aria-disabled={isSubmitting}
          >
            <option value="Free website check">Free website check</option>
            <option value="Website fix">Fix my current website</option>
            <option value="New website">A new website</option>
            <option value="Website care plan">Monthly website care</option>
            <option value="Custom software">Custom software or automation</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
      </div>

      {/* Website (optional) */}
      <div className="space-y-1.5">
        <label htmlFor="website" className="block text-sm font-bold">
          Your website (if you have one)
        </label>
        <input
          id="website"
          name="website"
          type="text"
          inputMode="url"
          autoComplete="url"
          className="w-full rounded-xl border-2 border-line bg-paper px-4 py-3 outline-none transition focus:border-ink disabled:opacity-60"
          placeholder="e.g. yourbusiness.com"
          value={formData.website}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-sm font-bold">
          Tell us a bit about your business
          <span className="text-bad" aria-hidden="true"> *</span>
        </label>
        <textarea
          id="message"
          name="message"
          className="min-h-[140px] w-full rounded-xl border-2 border-line bg-paper px-4 py-3 outline-none transition focus:border-ink disabled:opacity-60"
          required
          placeholder="e.g. We're a roofing company in Dallas. Our website is slow and we get very few enquiries from it."
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-required="true"
          aria-describedby="message-hint"
          aria-disabled={isSubmitting}
        />
        <span
          id="message-hint"
          className="block text-sm text-ink/60"
        >
          A few sentences is enough. We reply within one business day.
        </span>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn-primary w-full text-lg disabled:opacity-70"
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <FiLoader
              className="animate-spin"
              aria-hidden="true"
            />
            Sending...
          </>
        ) : (
          'Send my request'
        )}
      </button>

      {/* Error message — aria-live so screen readers announce it */}
      {formMessage && isError && (
        <div
          className="flex items-start gap-2 rounded-xl border-2 border-bad p-4 font-semibold text-bad"
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          <FiAlertCircle
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />
          <span>{formMessage}</span>
        </div>
      )}

      {/* Required fields note */}
      <p className="text-sm text-ink/60">
        <span aria-hidden="true">*</span> Required fields.
        We respond within one business day.
      </p>

    </form>
  );
};