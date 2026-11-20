import { useEffect, useState } from 'react';
import { getChatResponse, PORTFOLIO_DATA } from '../data/portfolioData';

export default function ChatWidget({ lang }) {
  const copy = PORTFOLIO_DATA[lang].chat;
  const personal = PORTFOLIO_DATA.personal;

  const [messages, setMessages] = useState([
    { sender: 'bot', text: copy.greeting },
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    setMessages((prev) =>
      prev.length === 1 && prev[0].sender === 'bot' ? [{ sender: 'bot', text: copy.greeting }] : prev
    );
  }, [copy.greeting]);

  const sendQuery = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const reply = getChatResponse(trimmed);
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: trimmed },
      { sender: 'bot', text: reply },
    ]);
    setInput('');
  };

  return (
    <section className="section" id="ask" data-section="chat" data-theme="light">
      <div className="container grid-12" style={{ alignItems: 'center' }}>
        <div style={{ gridColumn: '1 / 6' }} className="exp-left">
          <h2
            style={{
              fontSize: 'var(--step-5)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: '1.25rem',
            }}
          >
            {copy.heading}
          </h2>
          <p style={{ color: 'var(--fg-muted)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
            {copy.description}
          </p>
          <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            {copy.fallbackLabel}{' '}
            <a href={`mailto:${personal.email}`} className="t-link" style={{ color: 'var(--accent-text)' }}>
              {personal.email} <span className="link-arrow">↗</span>
            </a>
          </p>
          <span className="pill-tag" style={{ display: 'inline-block' }}>
            {copy.badge}
          </span>
        </div>

        <div style={{ gridColumn: '6 / 13' }} className="exp-right">
          <div className="chat-card">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                paddingBottom: '1rem',
                marginBottom: '1rem',
                borderBottom: '1px solid rgba(10,10,10,0.08)',
              }}
            >
              <img
                src={personal.profileImage}
                alt={personal.shortBrand}
                data-cursor="hide"
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{personal.brand}</div>
                <div style={{ fontSize: '0.76rem', color: '#555' }}>
                  <span style={{ color: '#20b261' }}>●</span> Interactive Assistant
                </div>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((m, idx) => (
                <div key={idx} className={`chat-bubble ${m.sender}`}>
                  {m.text}
                </div>
              ))}
            </div>

            <div className="chat-chips">
              {copy.chips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="chat-chip fill"
                  onClick={() => sendQuery(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>

            <form
              className="chat-input-row"
              onSubmit={(e) => {
                e.preventDefault();
                sendQuery(input);
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={copy.placeholder}
                aria-label="Ask portfolio assistant"
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
                <span>Ask ↗</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
