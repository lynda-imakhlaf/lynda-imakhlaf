import { Link } from 'react-scroll'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      padding: '40px 24px 32px',
      borderTop: '1px solid rgba(168, 85, 247, 0.1)',
      background: '#0d0221',
      position: 'relative',
    }}>
      <style>{`
        .footer-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: #7c6fa0;
          cursor: pointer;
          transition: color 0.2s;
          text-decoration: none;
        }
        .footer-link:hover { color: #a855f7; }
      `}</style>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      }}>
        {/* Logo */}
        <Link to="hero" smooth duration={600} style={{ cursor: 'pointer' }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#a855f7',
          }}>
            LI<span style={{ color: '#6e00ff' }}>_</span>
          </span>
        </Link>

        {/* Copyright */}
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          color: '#4a3a64',
          textAlign: 'center',
        }}>
          © {year} Lynda Imakhlaf — Built with React + Three.js + Django
        </p>

        {/* Back to top */}
        <Link to="hero" smooth duration={800} style={{ cursor: 'pointer' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: '#7c6fa0',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#a855f7')}
          onMouseLeave={e => (e.currentTarget.style.color = '#7c6fa0')}
          >
            Back to top
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </div>
        </Link>
      </div>
    </footer>
  )
}
