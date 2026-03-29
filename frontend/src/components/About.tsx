import { useInView } from 'react-intersection-observer'

const STATS = [
  { value: '5+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Shipped' },
  { value: '3', label: 'Domains: Web · 3D · Games' },
  { value: '∞', label: 'Coffee Consumed' },
]

const HIGHLIGHTS = [
  {
    icon: '⚡',
    title: 'Full Stack Web',
    desc: 'React frontends, Django/Python backends, REST APIs, PostgreSQL databases. End-to-end delivery from architecture to deployment.',
  },
  {
    icon: '🎮',
    title: 'Game Development',
    desc: 'Unity + C# game design and programming. From mechanics to immersive 3D worlds — games that are actually fun to play.',
  },
  {
    icon: '🎨',
    title: '3D Modeling & Animation',
    desc: 'Blender modeling, rigging, and animation. Creating assets for games, visualizations, and interactive experiences.',
  },
  {
    icon: '🚀',
    title: 'Ship It Culture',
    desc: 'Full-time engineer by day, building side projects at night. I value clean code, fast iteration, and real impact over endless planning.',
  },
]

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="about" ref={ref} style={{ padding: '100px 0', position: 'relative' }}>
      <div className="grid-bg" />

      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .about-anim {
          opacity: 0;
        }
        .about-anim.visible {
          animation: fade-up 0.7s ease forwards;
        }
        .about-card {
          background: rgba(22, 4, 56, 0.7);
          border: 1px solid rgba(168, 85, 247, 0.12);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }
        .about-card:hover {
          border-color: rgba(168, 85, 247, 0.35);
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(110, 0, 255, 0.2);
        }
        .stat-card {
          background: rgba(22, 4, 56, 0.5);
          border: 1px solid rgba(168, 85, 247, 0.15);
          border-radius: 14px;
          padding: 20px;
          text-align: center;
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          border-color: rgba(168, 85, 247, 0.4);
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.15);
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <div className={`about-anim ${inView ? 'visible' : ''}`} style={{ animationDelay: '0s', marginBottom: '64px' }}>
          <p className="section-label">01. About Me</p>
          <h2 className="section-title">
            I build things that <span>work</span>.
          </h2>
          <div className="divider" />
          <p className="section-subtitle">
            Full-stack engineer with 5+ years of experience across web platforms,
            3D environments, and interactive games. Currently full-time, always building on the side.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '48px',
          alignItems: 'start',
          marginBottom: '64px',
        }}>
          {/* Bio text */}
          <div className={`about-anim ${inView ? 'visible' : ''}`} style={{ animationDelay: '0.15s' }}>
            <div style={{
              background: 'rgba(22, 4, 56, 0.5)',
              border: '1px solid rgba(168, 85, 247, 0.12)',
              borderRadius: '20px',
              padding: '32px',
              backdropFilter: 'blur(10px)',
            }}>
              {/* Terminal-style header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                marginBottom: '24px',
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
                }}>~/lynda/about.md</span>
              </div>

              <p style={{ color: '#c4b5fd', lineHeight: 1.8, marginBottom: '18px', fontSize: '0.97rem' }}>
                Hey — I'm <strong style={{ color: '#ffffff' }}>Lynda</strong>, a full-stack engineer
                based in Algeria. I've been building production web apps, 3D models, and games for
                over 5 years.
              </p>
              <p style={{ color: '#c4b5fd', lineHeight: 1.8, marginBottom: '18px', fontSize: '0.97rem' }}>
                By day I work full-time as a software engineer. By night (and weekends) I take on
                freelance projects — from e-commerce platforms to ERP systems to interactive
                3D experiences.
              </p>
              <p style={{ color: '#c4b5fd', lineHeight: 1.8, fontSize: '0.97rem' }}>
                I care about <strong style={{ color: '#a855f7' }}>clean architecture</strong>,
                {' '}<strong style={{ color: '#a855f7' }}>pixel-perfect UI</strong>, and shipping
                things that actually solve problems.
              </p>

              <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="mailto:imakhlflyndatiane@gmail.com"
                  className="btn btn-primary"
                  style={{ fontSize: '13px', padding: '10px 22px' }}
                >
                  <EmailIcon /> Contact Me
                </a>
                <a
                  href="https://github.com/lynda-imakhlaf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ fontSize: '13px', padding: '10px 22px' }}
                >
                  <GitHubIcon /> GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Highlight cards */}
          <div className={`about-anim ${inView ? 'visible' : ''}`} style={{
            animationDelay: '0.3s',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}>
            {HIGHLIGHTS.map((item, i) => (
              <div
                key={i}
                className="about-card"
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                <div style={{ fontSize: '1.6rem', marginBottom: '10px' }}>{item.icon}</div>
                <h3 style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '8px',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '0.8rem',
                  color: '#7c6fa0',
                  lineHeight: 1.6,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className={`about-anim ${inView ? 'visible' : ''}`} style={{
          animationDelay: '0.5s',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '16px',
        }}>
          {STATS.map((stat, i) => (
            <div key={i} className="stat-card">
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #a855f7, #6e00ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '6px',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.82rem',
                color: '#7c6fa0',
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}
