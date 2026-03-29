import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { useTheme } from '../ThemeContext'

const NAV = [
  { label: 'À propos',    to: 'about'    },
  { label: 'Compétences', to: 'skills'   },
  { label: 'Projets',     to: 'projects' },
  { label: 'Contact',     to: 'contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme: t, toggle } = useTheme()

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
          color:${t.soft}; cursor:pointer; padding:8px 16px; border-radius:999px;
          transition:all 0.22s; text-decoration:none; white-space:nowrap;
        }
        .nav-link:hover { color:${t.isDark ? '#C084FC' : '#7C3AED'}; background:rgba(168,85,247,0.1); ${t.isDark ? 'text-shadow:0 0 10px rgba(192,132,252,0.5);' : ''} }
        .nav-hire {
          font-family:'Nunito',sans-serif; font-size:13px; font-weight:800;
          padding:9px 22px; border-radius:999px;
          background:linear-gradient(135deg,${t.isDark ? '#A855F7,#F472B6' : '#7C3AED,#DB2777'});
          color:white; border:none; cursor:pointer;
          box-shadow:0 4px 16px rgba(168,85,247,${t.isDark ? '0.45' : '0.35'}), ${t.isDark ? '0 0 20px rgba(168,85,247,0.2)' : 'none'};
          transition:all 0.25s; text-decoration:none; display:inline-block;
        }
        .nav-hire:hover { transform:translateY(-2px) scale(1.03); color:white; }
        .mob-link {
          font-family:'Nunito',sans-serif; font-size:1rem; font-weight:700;
          color:${t.soft}; padding:14px 0; cursor:pointer;
          border-bottom:1px solid rgba(168,85,247,0.15);
          transition:all 0.2s; display:block; text-decoration:none;
        }
        .mob-link:hover { color:${t.isDark ? '#C084FC' : '#7C3AED'}; }
        .ham-bar {
          display:block; width:20px; height:2px;
          background:${t.isDark ? '#A855F7' : '#7C3AED'}; border-radius:1px; transition:all 0.28s;
          ${t.isDark ? 'box-shadow:0 0 4px rgba(168,85,247,0.6);' : ''}
        }
      `}</style>

      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:1000,
        height:'64px', display:'flex', alignItems:'center',
        justifyContent:'space-between', padding:'0 28px',
        background: scrolled ? t.navBg : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? `1px solid rgba(168,85,247,${t.isDark ? '0.15' : '0.12'})` : 'none',
        boxShadow: scrolled ? (t.isDark ? '0 2px 24px rgba(0,0,0,0.5), 0 0 30px rgba(124,58,237,0.1)' : '0 2px 20px rgba(124,58,237,0.08)') : 'none',
        transition:'all 0.35s ease',
      }}>

        {/* Logo */}
        <Link to="hero" smooth duration={600} style={{ cursor:'pointer' }}>
          <img src={t.isDark ? '/lynda-logo.png' : '/lynda-logo-dark.png'} alt="Lynda Imakhlaf" style={{
            height:'40px', objectFit:'contain',
            filter: t.isDark
              ? 'drop-shadow(0 0 10px rgba(168,85,247,0.7)) drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
              : 'drop-shadow(0 2px 8px rgba(124,58,237,0.2))',
          }} />
        </Link>

        {/* Desktop */}
        <div style={{ display:'flex', alignItems:'center', gap:'4px' }} className="d-nav">
                 {/* Theme toggle */}
          <button onClick={toggle} style={{
            marginLeft:'8px', background:'none', border:'none', cursor:'pointer',
            fontSize:'18px', lineHeight:1, padding:'6px', borderRadius:'50%',
            transition:'all 0.25s',
            filter: t.isDark ? 'drop-shadow(0 0 4px rgba(251,191,36,0.5))' : 'none',
          }} title={t.isDark ? 'Mode clair' : 'Mode sombre'}>
            {t.isDark ? '☀️' : '🌙'}
          </button>
          {NAV.map(({ label, to }) => (
            <Link key={to} to={to} smooth duration={650} offset={-64} className="nav-link">
              {label}
            </Link>
          ))}
          <div style={{ width:'1px', height:'18px', background:'rgba(168,85,247,0.2)', margin:'0 8px' }} />
          <a href="mailto:imakhlflyndatiane@gmail.com" className="nav-hire">
            Me contacter 
          </a>
   
        </div>

       
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position:'fixed', top:'64px', left:0, right:0, zIndex:999,
          background: t.mobileBg, backdropFilter:'blur(28px)',
          borderBottom:`1px solid rgba(168,85,247,${t.isDark ? '0.15' : '0.1'})`,
          padding:'8px 28px 24px',
          boxShadow: t.isDark ? '0 8px 32px rgba(0,0,0,0.6)' : '0 8px 32px rgba(124,58,237,0.1)',
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
              background:`linear-gradient(135deg,${t.isDark ? '#A855F7,#F472B6' : '#7C3AED,#DB2777'})`,
              color:'white', borderRadius:'999px', padding:'13px',
              fontFamily:"'Nunito',sans-serif", fontSize:'14px', fontWeight:800,
              boxShadow:`0 4px 16px rgba(168,85,247,${t.isDark ? '0.45' : '0.3'})`,
            }}>
            Me contacter 
          </a>
        </div>
      )}

      <style>{`
        @media(max-width:768px){
          .d-nav{display:none!important;}
          .ham-btn{display:flex!important;}
          .ham-toggle{display:block!important;}
        }
        .ham-toggle{display:none;}
      `}</style>
    </>
  )
}
