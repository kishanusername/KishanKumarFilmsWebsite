import "./Contact.css";

const CONTACT_INFO = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: "Email",
    value: "kishanusername670@gmail.com",
    href: "mailto:kishanusername670@gmail.com",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "Call",
    value: "+91 9102077670",
    href: "tel:+919102077670",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.7 5.9L.2 24l6.5-1.7a11.7 11.7 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.3-6.1-3.5-8.3Z" />
        <path d="M8.8 6.4c-.3-.7-.6-.7-.9-.7h-.7c-.2 0-.6.1-.9.5-.3.3-1.1 1.1-1.1 2.7s1.1 3.2 1.3 3.4c.2.2 2.2 3.4 5.3 4.7 2.6 1.1 3.1.9 3.7.8.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.5.2-1.6-.1-.2-.2-.2-.5-.4-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.2.3-.6.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.9-1.7-2.2-.2-.3 0-.4.1-.6l.5-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2Z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "+91 9102077670",
    href: "https://wa.me/919102077670",
  },
  {
    icon: (
      <svg
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
  <path d="M16 11.37a4 4 0 1 1-2.83-2.83A4 4 0 0 1 16 11.37z" />
  <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
</svg>


    
    ),
    label: "Social Sites",
    value: "Instagram",
    href: "https://www.instagram.com/kishankumar_1.24/",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Based in",
    value: "Delhi, India",
    href: "https://maps.google.com/?q=Delhi,India",
  },
];

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <header className="contact-header">
        <span className="contact-eyebrow">Get in Touch</span>
        <h2>Contact</h2>
        <p className="contact-intro">Have a story worth remembering? Let&apos;s create it with intent.</p>
      </header>

      <div className="contact-grid">
        <div className="contact-info">
          <h3>Reach Out</h3>
          <p className="contact-info-desc"></p>

          <div className="contact-cards">
            {CONTACT_INFO.map((item) => (
              <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="contact-card">
                <span className="contact-card-icon">{item.icon}</span>
                <span className="contact-card-label">{item.label}</span>
                <span className="contact-card-value">{item.value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
