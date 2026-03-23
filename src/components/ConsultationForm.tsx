// src/components/ConsultationForm.tsx
"use client";

import { useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';

export const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Engineering',
    message: '',
  });
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
        body: JSON.stringify(formData),
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
          service: 'Web Engineering',
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
        className="c-form__success-state"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <FiCheckCircle
          className="c-form__success-icon"
          aria-hidden="true"
        />
        <h3 className="c-form__success-title">Request Sent!</h3>
        <p className="c-form__success-body">{formMessage}</p>
      </div>
    );
  }

  return (
    <form
      className="c-form"
      onSubmit={handleSubmit}
      aria-label="Book a free consultation with Coderon"
      aria-busy={isSubmitting}
      noValidate
    >

      {/* Name */}
      <div className="c-form__group">
        <label htmlFor="name" className="c-form__label">
          Full Name
          <span className="c-form__required" aria-hidden="true"> *</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="c-form__input"
          required
          autoComplete="name"
          placeholder="e.g. Ronnie Nyamhute"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-required="true"
          aria-disabled={isSubmitting}
        />
      </div>

      {/* Email */}
      <div className="c-form__group">
        <label htmlFor="email" className="c-form__label">
          Email Address
          <span className="c-form__required" aria-hidden="true"> *</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="c-form__input"
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
      <div className="c-form__group">
        <label htmlFor="service" className="c-form__label">
          What do you need help with?
          <span className="c-form__required" aria-hidden="true"> *</span>
        </label>
        <div className="c-form__select-wrapper">
          <select
            id="service"
            name="service"
            className="c-form__input"
            required
            value={formData.service}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-required="true"
            aria-disabled={isSubmitting}
          >
            <option value="Web Engineering">Web Engineering</option>
            <option value="AI Integration">AI Integration</option>
            <option value="Digital Transformation">Digital Transformation</option>
            <option value="Custom Software">Custom Software</option>
            <option value="Business Automation">Business Automation</option>
            <option value="Not sure yet">Not sure yet — let&apos;s talk</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="c-form__group">
        <label htmlFor="message" className="c-form__label">
          Tell us about your business and what you want to fix
          <span className="c-form__required" aria-hidden="true"> *</span>
        </label>
        <textarea
          id="message"
          name="message"
          className="c-form__textarea"
          required
          placeholder="e.g. We're a logistics company manually tracking deliveries in spreadsheets. We need something better..."
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-required="true"
          aria-describedby="message-hint"
          aria-disabled={isSubmitting}
        />
        <span
          id="message-hint"
          className="c-form__hint"
        >
          The more detail you give us, the more useful our first call will be.
        </span>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="c-form__button"
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
        aria-label={
          isSubmitting
            ? 'Sending your request, please wait'
            : 'Book my free consultation'
        }
      >
        {isSubmitting ? (
          <>
            <FiLoader
              className="c-form__spinner"
              aria-hidden="true"
            />
            Sending...
          </>
        ) : (
          'Book My Free Session'
        )}
      </button>

      {/* Error message — aria-live so screen readers announce it */}
      {formMessage && isError && (
        <div
          className="c-form__message c-form__message--error"
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          <FiAlertCircle
            className="c-form__message-icon"
            aria-hidden="true"
          />
          <span>{formMessage}</span>
        </div>
      )}

      {/* Required fields note */}
      <p className="c-form__footnote">
        <span aria-hidden="true">*</span> Required fields.
        We respond within one business day.
      </p>

    </form>
  );
};