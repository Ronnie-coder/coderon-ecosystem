"use client";
import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

export const ConsultationForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', service: 'Web Development', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage('');
    setIsError(false);
    try {
      const response = await fetch('/api/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await response.json();
      if (response.ok) {
        setFormMessage("Thank you! Your request has been sent. We'll be in touch soon.");
        setIsError(false);
        setFormData({ name: '', email: '', service: 'Web Development', message: '' });
      } else {
        setFormMessage(`Error: ${data.error || 'Something went wrong.'}`);
        setIsError(true);
      }
    } catch (error) {
      setFormMessage("An unexpected error occurred. Please try again.");
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (formMessage && !isError) {
    return (
      <div className="c-form__success-message">
        <FiCheckCircle />
        <h3>Request Sent!</h3>
        <p>{formMessage}</p>
      </div>
    );
  }

  return (
    <form className="c-form" onSubmit={handleSubmit}>
      <div className="c-form__group">
        <label htmlFor="name" className="c-form__label">Full Name</label>
        <input type="text" id="name" name="name" className="c-form__input" required value={formData.name} onChange={handleChange} disabled={isSubmitting} />
      </div>
      <div className="c-form__group">
        <label htmlFor="email" className="c-form__label">Email Address</label>
        <input type="email" id="email" name="email" className="c-form__input" required value={formData.email} onChange={handleChange} disabled={isSubmitting} />
      </div>
      <div className="c-form__group">
        <label htmlFor="service" className="c-form__label">Service of Interest</label>
        <div className="c-form__select-wrapper">
          <select id="service" name="service" className="c-form__input" required value={formData.service} onChange={handleChange} disabled={isSubmitting}>
            <option>Web Development</option>
            <option>AI Solutions & Integration</option>
            <option>Digital Transformation</option>
            <option>Custom Software Development</option>
            <option>Business Automation</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className="c-form__group">
        <label htmlFor="message" className="c-form__label">Tell us about your project</label>
        <textarea id="message" name="message" className="c-form__textarea" required value={formData.message} onChange={handleChange} disabled={isSubmitting} />
      </div>
      <button type="submit" className="c-form__button" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Book My Free Session'}
      </button>
      {formMessage && isError && (
        <p className="c-form__message c-form__message--error">{formMessage}</p>
      )}
    </form>
  );
};