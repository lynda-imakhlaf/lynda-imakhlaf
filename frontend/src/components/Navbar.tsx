import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'

const NAV = [
  { label: 'À propos', to: 'about'    },
  { label: 'Compétences', to: 'skills'   },
  { label: 'Projets', to: 'projects' },
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
          font-family:'Nunito',sans-serif; font-size:14px; font-weight:700;
          color:#5B21B6; cursor:pointer; padding:8px 16px; border-radius:999px;
          transition:all 0.22s; text-decoration:none; white-space:nowrap;
        }
        .nav-link:hover { color:#7C3AED; background:rgba(168,85,247,0.1); }
        .nav-hire {
          font-family:'Nunito',sans-serif; font-size:13px; font-weight:800;
          padding:9px 22px; border-radius:999px;
          background:linear-gradient(135deg,#7C3AED,#DB2777);
          color:white; border:none; cursor:pointer;
          box-shadow:0 4px 16px rgba(124,58,237,0.35);
          transition:all 0.25s; text-decoration:none; display:inline-block;
        }
        .nav-hire:hover { transform:translateY(-2px) scale(1.03); box-shadow:0 8px 24px rgba(124,58,237,0.45); color:white; }
        .mob-link {
          font-family:'Nunito',sans-serif; font-size:1rem; font-weight:700;
          color:#5B21B6; padding:14px 0; cursor:pointer;
          border-bottom:1px solid rgba(124,58,237,0.1);
          transition:color 0.2s; display:block; text-decoration:none;
        }
        .mob-link:hover { color:#7C3AED; }
        .ham-bar {
          display:block; width:20px; height:2px;
          background:#7C3AED; border-radius:1px; transition:all 0.28s;
        }
      `}</style>

      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:1000,
        height:'64px', display:'flex', alignItems:'center',
        justifyContent:'space-between', padding:'0 28px',
        background: scrolled ? 'rgba(255,255,255,0.55)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(168,85,247,0.15)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(124,58,237,0.08)' : 'none',
        transition:'all 0.35s ease',
      }}>

        {/* Logo */}
        <Link to="hero" smooth duration={600} style={{ cursor:'pointer' }}>
          <img src="/lynda-logo.png" alt="Lynda Imakhlaf" style={{
            height:'40px', objectFit:'contain',
            filter:'drop-shadow(0 2px 8px rgba(124,58,237,0.2))',
          }} />
        </Link>

        {/* Desktop */}
        <div style={{ display:'flex', alignItems:'center', gap:'4px' }} className="d-nav">
          {NAV.map(({ label, to }) => (
            <Link key={to} to={to} smooth duration={650} offset={-64} className="nav-link">
              {label}
            </Link>
          ))}
          <div style={{ width:'1px', height:'18px', background:'rgba(124,58,237,0.15)', margin:'0 8px' }} />
          <a href="mailto:imakhlflyndatiane@gmail.com" className="nav-hire">
            Me contacter 🦋
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
          position:'fixed', top:'64px', left:0, right:0, zIndex:999,
          background:'rgba(255,255,255,0.88)', backdropFilter:'blur(24px)',
          borderBottom:'1px solid rgba(168,85,247,0.15)',
          padding:'8px 28px 24px',
          boxShadow:'0 8px 32px rgba(124,58,237,0.1)',
        }}>
          {NAV.map(({ label, to }) => (
            <Link key={to} to={to} smooth duration={650} offset={-64}
              className="mob-link" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <a href="mailto:imakhlflyndatiane@gmail.com"
            style={{
              display:'block', marginTop:'16px', textAlign:'center',
              background:'linear-gradient(135deg,#7C3AED,#DB2777)',
              color:'white', borderRadius:'999px', padding:'13px',
              fontFamily:"'Nunito',sans-serif", fontSize:'14px', fontWeight:800,
              boxShadow:'0 4px 16px rgba(124,58,237,0.3)',
            }}>
            Me contacter 🦋
          </a>
        </div>
      )}

      <style>{`
        @media(max-width:768px){ .d-nav{display:none!important;} .ham-btn{display:flex!important;} }
      `}</style>
    </>
  )
}
