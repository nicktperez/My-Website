import { useState } from 'react';
import { ArrowUpRight, Check, Clipboard, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../data';

const linkedInUrl = 'https://www.linkedin.com/in/nicholas-perez-47748773/';

const ContactForm = () => {
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);

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
          <p className="chapter-label">Contact</p>
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

        <div className="contact-invitation">
          <h3>Let’s talk about your team.</h3>
          <p>For IT systems, endpoint management, or automation opportunities, send me a note with the role and what your team needs.</p>
          <a className="button button-primary" href={`mailto:${portfolioData.email}`}>Email Nicholas <ArrowUpRight size={17} aria-hidden="true" /></a>
          <p className="form-status" aria-live="polite">{status}</p>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
