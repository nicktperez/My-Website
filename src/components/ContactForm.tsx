import { useState } from 'react';
import { ArrowUpRight, Check, Clipboard, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../data';

const linkedInUrl = 'https://www.linkedin.com/in/nicholas-perez-47748773/';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Hi Nicholas,\n\n${formData.message}\n\nBest,\n${formData.name}\n${formData.email}`,
    );

    setStatus(`Your email app is opening. If it does not, copy ${portfolioData.email} below.`);
    window.location.href = `mailto:${portfolioData.email}?subject=${subject}&body=${body}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.email);
      setCopied(true);
      setStatus('Email address copied.');
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatus(`Copying is unavailable here. Email me directly at ${portfolioData.email}.`);
    }
  };

  return (
    <section className="contact-section manual-chapter" id="contact">
      <div className="page-width contact-layout">
        <div className="contact-intro">
          <p className="chapter-label">Open channel</p>
          <h2>Contact.</h2>
          <p>
            I’m a Sacramento-based IT Systems Engineer open to Bay Area hybrid
            and remote opportunities.
          </p>
          <div className="contact-methods">
            <a href={`mailto:${portfolioData.email}`}>
              <Mail size={18} aria-hidden="true" />
              {portfolioData.email}
            </a>
            <a href={linkedInUrl} target="_blank" rel="me noreferrer">
              <Linkedin size={18} aria-hidden="true" />
              Connect on LinkedIn
            </a>
            <button type="button" onClick={copyEmail}>
              {copied ? <Check size={18} aria-hidden="true" /> : <Clipboard size={18} aria-hidden="true" />}
              {copied ? 'Email copied' : 'Copy email address'}
            </button>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              <span>Name</span>
              <input
                required
                autoComplete="name"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                placeholder="Your name"
              />
            </label>
            <label>
              <span>Email</span>
              <input
                required
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                placeholder="you@company.com"
              />
            </label>
          </div>
          <label>
            <span>Subject</span>
            <input
              required
              value={formData.subject}
              onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
              placeholder="Role, project, or question"
            />
          </label>
          <label>
            <span>Message</span>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(event) => setFormData({ ...formData, message: event.target.value })}
              placeholder="Tell me a little about what you’re working on."
            />
          </label>
          <div className="form-footer">
            <p>Your message opens in your email app, so nothing is sent without your review.</p>
            <button className="button button-contact" type="submit">
              Prepare email
              <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          </div>
          <p className="form-status" aria-live="polite">{status}</p>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
