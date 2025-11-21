"use client";

import { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', service: 'Web Development', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [isError, setIsError] = useState(false); // To track message type

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
      if (response.ok) {
        setFormMessage("Thank you for your message! We'll be in touch soon.");
        setFormData({ name: '', email: '', service: 'Web Development', message: '' });
      } else {
        const errorData = await response.json();
        setFormMessage(`Error: ${errorData.error?.message || 'Something went wrong. Please try again.'}`);
        setIsError(true);
      }
    } catch (error) {
      setFormMessage("An unexpected error occurred. Please check your connection and try again.");
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="c-contact" id="contact">
      <div className="c-contact__wrapper">
        <div className="c-contact__info">
          <h2>Book Your Free Strategy Session</h2>
          <p>Ready to discuss your project? Schedule a complimentary 30-minute call. We'll explore your goals, identify key opportunities, and provide initial, actionable recommendations. No strings attached.</p>
          <ul className="c-contact__details">
            <li><span>📍</span> Based in South Africa, Serving all of Africa.</li>
            <li><span>🕒</span> Business Hours: Mon - Fri, 9:00 - 17:00 (SAST)</li>
          </ul>
          <a href="https://wa.me/27678184898" target="_blank" rel="noopener noreferrer" className="c-contact__whatsapp-btn">
            Chat on WhatsApp
          </a>
        </div>
        
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
            <select id="service" name="service" className="c-form__input" required value={formData.service} onChange={handleChange} disabled={isSubmitting}>
              <option>Web Development</option><option>AI Solutions & Integration</option><option>Digital Transformation</option><option>Custom Software Development</option><option>Business Automation</option><option>Other</option>
            </select>
          </div>
          <div className="c-form__group">
            <label htmlFor="message" className="c-form__label">Your Message</label>
            <textarea id="message" name="message" className="c-form__textarea" required value={formData.message} onChange={handleChange} disabled={isSubmitting} />
          </div>
          <button type="submit" className="c-form__button" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Message'}</button>
          {/* FIX: Replaced inline style with a dynamic className */}
          {formMessage && (
            <p className={`c-form__message ${isError ? 'c-form__message--error' : 'c-form__message--success'}`}>
              {formMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;