import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const SOCIALS = [
  {
    label: 'GitHub',
    value: 'github.com/lynda-imakhlaf',
    href: 'https://github.com/lynda-imakhlaf',
    icon: GitHubIcon,
    color: '#ffffff',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/lynda-imakhlaf',
    href: 'https://linkedin.com/in/lynda-imakhlaf',
    icon: LinkedInIcon,
    color: '#0A66C2',
  },
  {
    label: 'Email',
    value: 'imakhlflyndatiane@gmail.com',
    href: 'mailto:imakhlflyndatiane@gmail.com',
    icon: EmailIcon,
    color: '#a855f7',
  },
]

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await axios.post('/api/contact/', form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={ref} style={{
      padding: '100px 0',
      background: 'linear-gradient(180deg, #0d0221 0%, #10032a 100%)',
      position: 'relative',
    }}>
      <div className="grid-bg" />

      <style>{`
        @keyframes contact-fade {
          from { opacity: 0; transform: translateY(35px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .contact-anim { opacity: 0; }
        .contact-anim.visible { animation: contact-fade 0.65s ease forwards; }

        .form-input {
          width: 100%;
          background: rgba(22, 4, 56, 0.6);
          border: 1.5px solid rgba(168, 85, 247, 0.15);
          border-radius: 10px;
          padding: 13px 16px;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          outline: none;
          transition: all 0.25s;
          box-sizing: border-box;
        }
        .form-input::placeholder { color: #4a3a64; }
        .form-input:focus {
          border-color: #a855f7;
          background: rgba(22, 4, 56, 0.8);
          box-shadow: 0 0 0 3px rgba(168,85,247,0.1);
        }
        .form-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 600;
          color: #7c6fa0;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 7px;
          display: block;
        }
        .social-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          background: rgba(22, 4, 56, 0.5);
          border: 1px solid rgba(168, 85, 247, 0.1);
          border-radius: 12px;
          transition: all 0.25s;
          text-decoration: none;
        }
        .social-row:hover {
          border-color: rgba(168, 85, 247, 0.35);
          background: rgba(22, 4, 56, 0.75);
          transform: translateX(4px);
        }
        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #6e00ff, #a855f7);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 14px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 20px rgba(110,0,255,0.35);
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(110,0,255,0.45);
        }
        .submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <div className={`contact-anim ${inView ? 'visible' : ''}`} style={{ animationDelay: '0s', marginBottom: '64px' }}>
          <p className="section-label">04. Contact</p>
          <h2 className="section-title">
            Let's <span>Work Together</span>
          </h2>
          <div className="divider" />
          <p className="section-subtitle">
            Available for freelance projects. Whether it's a web app, a 3D experience, or a game — let's build something great.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '48px',
          alignItems: 'start',
        }}>
          {/* Left: info */}
          <div className={`contact-anim ${inView ? 'visible' : ''}`} style={{ animationDelay: '0.15s' }}>
            <div style={{
              background: 'rgba(22, 4, 56, 0.5)',
              border: '1px solid rgba(168, 85, 247, 0.12)',
              borderRadius: '18px',
              padding: '32px',
              marginBottom: '24px',
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '12px', color: '#ffffff' }}>
                Open for opportunities
              </h3>
              <p style={{ color: '#7c6fa0', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '24px' }}>
                I'm currently available for freelance projects alongside my full-time role.
                Fast turnaround, clean code, and honest communication.
              </p>

              {/* Availability badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(74, 222, 128, 0.08)',
                border: '1px solid rgba(74, 222, 128, 0.2)',
                borderRadius: '999px',
                padding: '7px 16px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: '#4ade80',
              }}>
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: '#4ade80',
                  boxShadow: '0 0 8px #4ade80',
                  animation: 'pulse-dot 2s ease-in-out infinite',
                }} />
                Available for freelance
              </div>
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SOCIALS.map(({ label, value, href, icon: Icon, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-row">
                  <div style={{
                    width: '38px', height: '38px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${color}15`,
                    border: `1px solid ${color}30`,
                    borderRadius: '9px',
                    color,
                    flexShrink: 0,
                  }}>
                    <Icon />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      color: '#7c6fa0',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      marginBottom: '2px',
                    }}>
                      {label}
                    </div>
                    <div style={{ fontSize: '13px', color: '#c4b5fd', fontFamily: "'JetBrains Mono', monospace" }}>
                      {value}
                    </div>
                  </div>
                  <div style={{ marginLeft: 'auto', color: '#4a3a64' }}>
                    <ArrowIcon />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: contact form */}
          <div className={`contact-anim ${inView ? 'visible' : ''}`} style={{ animationDelay: '0.3s' }}>
            <div style={{
              background: 'rgba(22, 4, 56, 0.6)',
              border: '1px solid rgba(168, 85, 247, 0.12)',
              borderRadius: '18px',
              padding: '32px',
            }}>
              {/* Terminal header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                marginBottom: '28px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(168,85,247,0.1)',
              }}>
                {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                  <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
                ))}
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  color: '#7c6fa0',
                  marginLeft: '8px',
                }}>
                  ~/send-message.sh
                </span>
              </div>

              {status === 'success' ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>✅</div>
                  <h3 style={{ color: '#4ade80', marginBottom: '8px' }}>Message sent!</h3>
                  <p style={{ color: '#7c6fa0', fontSize: '0.9rem' }}>
                    I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    style={{
                      marginTop: '20px',
                      background: 'transparent',
                      border: '1px solid rgba(168,85,247,0.3)',
                      borderRadius: '8px',
                      color: '#a855f7',
                      padding: '8px 18px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label className="form-label">Name</label>
                      <input
                        className="form-input"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Lynda"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Email</label>
                      <input
                        className="form-input"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="hello@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Subject</label>
                    <input
                      className="form-input"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Project inquiry..."
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-input"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={5}
                      required
                      style={{ resize: 'vertical', minHeight: '120px' }}
                    />
                  </div>

                  {status === 'error' && (
                    <p style={{ color: '#f87171', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>
                      Something went wrong. Please email me directly at imakhlflyndatiane@gmail.com
                    </p>
                  )}

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function GitHubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}
