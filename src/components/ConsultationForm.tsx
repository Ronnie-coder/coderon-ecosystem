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
    if (topic === 'software') setFormData((prev) => ({ ...prev, service: 'Custom software' }));
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
      aria-label="Contact Coderon"
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
      <div className="c-form__group">
        <label htmlFor="website" className="c-form__label">
          Your website (if you have one)
        </label>
        <input
          id="website"
          name="website"
          type="text"
          inputMode="url"
          autoComplete="url"
          className="c-form__input"
          placeholder="e.g. yourbusiness.com"
          value={formData.website}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      {/* Message */}
      <div className="c-form__group">
        <label htmlFor="message" className="c-form__label">
          Tell us a bit about your business
          <span className="c-form__required" aria-hidden="true"> *</span>
        </label>
        <textarea
          id="message"
          name="message"
          className="c-form__textarea"
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
          className="c-form__hint"
        >
          A few sentences is enough. We reply within one business day.
        </span>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="c-form__button"
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
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
          'Send my request'
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