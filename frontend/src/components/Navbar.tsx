import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'

const NAV = [
  { label: 'About',    to: 'about'    },
  { label: 'Skills',   to: 'skills'   },
  { label: 'Projects', to: 'projects' },
  { label: 'Contact',  to: 'contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <style>{`
        .nav-link {
          font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:600;
          color:#5A5878; cursor:pointer; padding:8px 14px; border-radius:10px;
          transition:all 0.22s; text-decoration:none; white-space:nowrap;
        }
        .nav-link:hover { color:#1A1630; background:rgba(139,92,246,0.08); }

        .nav-hire {
          font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:700;
          padding:9px 22px; border-radius:999px;
          background:linear-gradient(135deg,#FF2D78,#8B5CF6);
          color:white; border:none; cursor:pointer;
          box-shadow:0 4px 14px rgba(255,45,120,0.35);
          transition:all 0.25s; text-decoration:none; display:inline-block;
        }
        .nav-hire:hover { transform:translateY(-2px) scale(1.03); box-shadow:0 6px 22px rgba(255,45,120,0.45); color:white; }

        .mob-link {
          font-family:'JetBrains Mono',monospace; font-size:1rem; font-weight:700;
          color:#5A5878; padding:15px 0; cursor:pointer;
          border-bottom:1px solid rgba(26,22,48,0.06);
          transition:color 0.2s; display:block; text-decoration:none;
        }
        .mob-link:hover { color:#1A1630; }
        .ham-bar {
          display:block; width:20px; height:2px;
          background:#1A1630; border-radius:1px; transition:all 0.28s;
        }
      `}</style>

      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:1000,
        height:'62px', display:'flex', alignItems:'center',
        justifyContent:'space-between', padding:'0 28px',
        background: scrolled ? 'rgba(255,255,255,0.55)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(26,22,48,0.08)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(26,22,48,0.06)' : 'none',
        transition:'all 0.35s ease',
      }}>

        {/* Logo */}
        <Link to="hero" smooth duration={600} style={{ cursor:'pointer' }}>
          <img src="/lynda-logo.png" alt="Lynda Imakhlaf" style={{
            height:'38px', objectFit:'contain',
            filter:'drop-shadow(0 2px 8px rgba(255,45,120,0.25))',
          }} />
        </Link>

        {/* Desktop */}
        <div style={{ display:'flex', alignItems:'center', gap:'4px' }} className="d-nav">
          {NAV.map(({ label, to }) => (
            <Link key={to} to={to} smooth duration={650} offset={-62} className="nav-link">
              {label}
            </Link>
          ))}
          <div style={{ width:'1px', height:'18px', background:'rgba(26,22,48,0.1)', margin:'0 8px' }} />
          <a href="mailto:imakhlflyndatiane@gmail.com" className="nav-hire">
            Hire me ✦
          </a>
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} className="ham-btn"
          style={{ background:'none', border:'none', cursor:'pointer',
            display:'none', flexDirection:'column', gap:'5px', padding:'5px' }}>
          <span className="ham-bar" style={open ? { transform:'rotate(45deg) translate(5px,5px)' } : {}} />
          <span className="ham-bar" style={open ? { opacity:0 } : {}} />
          <span className="ham-bar" style={open ? { transform:'rotate(-45deg) translate(5px,-5px)' } : {}} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position:'fixed', top:'62px', left:0, right:0, zIndex:999,
          background:'rgba(246,244,255,0.98)', backdropFilter:'blur(24px)',
          borderBottom:'1px solid rgba(26,22,48,0.08)',
          padding:'8px 28px 24px',
          boxShadow:'0 8px 32px rgba(26,22,48,0.1)',
        }}>
          {NAV.map(({ label, to }) => (
            <Link key={to} to={to} smooth duration={650} offset={-62}
              className="mob-link" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <a href="mailto:imakhlflyndatiane@gmail.com"
            style={{
              display:'block', marginTop:'16px', textAlign:'center',
              background:'linear-gradient(135deg,#FF2D78,#8B5CF6)',
              color:'white', borderRadius:'999px', padding:'13px',
              fontFamily:"'JetBrains Mono',monospace", fontSize:'13px', fontWeight:700,
              boxShadow:'0 4px 16px rgba(255,45,120,0.3)',
            }}>
            Hire me ✦
          </a>
        </div>
      )}

      <style>{`
        @media(max-width:768px){ .d-nav{display:none!important;} .ham-btn{display:flex!important;} }
      `}</style>
    </>
  )
}
