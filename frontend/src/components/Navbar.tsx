import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'

const NAV_LINKS = [
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Contact', to: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        .nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          color: #c4b5fd;
          cursor: pointer;
          padding: 6px 4px;
          position: relative;
          transition: color 0.2s ease;
          letter-spacing: 0.5px;
          text-decoration: none;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1.5px;
          background: linear-gradient(90deg, #6e00ff, #a855f7);
          transition: width 0.25s ease;
        }
        .nav-link:hover {
          color: #ffffff;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .hamburger-line {
          display: block;
          width: 22px;
          height: 2px;
          background: #a855f7;
          border-radius: 1px;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .mobile-nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.1rem;
          font-weight: 600;
          color: #c4b5fd;
          cursor: pointer;
          padding: 12px 0;
          border-bottom: 1px solid rgba(168, 85, 247, 0.1);
          transition: color 0.2s;
          text-decoration: none;
        }
        .mobile-nav-link:hover { color: #fff; }
      `}</style>

      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled
          ? 'rgba(13, 2, 33, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(168, 85, 247, 0.12)'
          : '1px solid transparent',
        transition: 'all 0.4s ease',
        maxWidth: '100vw',
      }}>

        {/* Logo */}
        <Link to="hero" smooth duration={600} style={{ cursor: 'pointer' }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#a855f7',
            letterSpacing: '-0.5px',
            textShadow: scrolled ? 'none' : '0 0 20px rgba(168,85,247,0.5)',
          }}>
            LI<span style={{ color: '#6e00ff' }}>_</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}
          className="desktop-nav">
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={600}
              offset={-64}
              className="nav-link"
            >
              <span style={{ color: 'rgba(168,85,247,0.6)', marginRight: '4px' }}>./</span>
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:imakhlflyndatiane@gmail.com"
            className="btn btn-outline"
            style={{
              padding: '7px 18px',
              fontSize: '12px',
              fontFamily: "'JetBrains Mono', monospace",
              borderRadius: '8px',
            }}
          >
            Hire Me
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px',
          }}
          aria-label="Menu"
        >
          <span className="hamburger-line" style={menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
          <span className="hamburger-line" style={menuOpen ? { opacity: 0 } : {}} />
          <span className="hamburger-line" style={menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          background: 'rgba(13, 2, 33, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(168, 85, 247, 0.15)',
          padding: '16px 24px 24px',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
        }}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={600}
              offset={-64}
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              <span style={{ color: 'rgba(168,85,247,0.6)', marginRight: '8px' }}>./</span>
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:imakhlflyndatiane@gmail.com"
            style={{
              marginTop: '16px',
              textAlign: 'center',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px',
              padding: '12px',
              background: 'linear-gradient(135deg, #6e00ff, #a855f7)',
              color: 'white',
              borderRadius: '10px',
              textDecoration: 'none',
            }}
          >
            Hire Me
          </a>
        </div>
      )}

      {/* Responsive override */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
