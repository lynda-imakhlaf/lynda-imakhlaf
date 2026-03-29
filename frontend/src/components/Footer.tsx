import { Link } from 'react-scroll'

export default function Footer() {
  return (
    <footer style={{
      padding:'32px 28px',
      background:'rgba(255,255,255,0.55)',
      backdropFilter:'blur(16px)',
      borderTop:'1.5px solid rgba(168,85,247,0.15)',
      boxShadow:'0 -4px 20px rgba(124,58,237,0.06)',
    }}>
      <div style={{
        maxWidth:'1100px', margin:'0 auto',
        display:'flex', flexWrap:'wrap',
        alignItems:'center', justifyContent:'space-between', gap:'16px',
      }}>

        <Link to="hero" smooth duration={800} style={{ cursor:'pointer' }}>
          <img src="/lynda-logo.png" alt="Lynda Imakhlaf" style={{
            height:'34px', objectFit:'contain',
            filter:'drop-shadow(0 2px 8px rgba(124,58,237,0.2))',
          }} />
        </Link>

        <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'12px', fontWeight:600,
          color:'#8B5CF6', textAlign:'center' }}>
          © {new Date().getFullYear()} Lynda Imakhlaf — React · Three.js · Django
        </p>

        <Link to="hero" smooth duration={900} style={{ cursor:'pointer' }}>
          <div
            style={{
              display:'flex', alignItems:'center', gap:'6px',
              fontFamily:"'Nunito',sans-serif", fontSize:'12px', fontWeight:700,
              color:'#8B5CF6', transition:'all 0.25s', padding:'7px 16px',
              borderRadius:'999px', border:'1.5px solid rgba(168,85,247,0.2)',
              background:'rgba(255,255,255,0.6)', backdropFilter:'blur(8px)',
            } as React.CSSProperties}
            onMouseEnter={e=>{ const el=e.currentTarget as HTMLDivElement; el.style.color='#7C3AED'; el.style.borderColor='rgba(124,58,237,0.4)'; el.style.background='rgba(124,58,237,0.08)'; }}
            onMouseLeave={e=>{ const el=e.currentTarget as HTMLDivElement; el.style.color='#8B5CF6'; el.style.borderColor='rgba(168,85,247,0.2)'; el.style.background='rgba(255,255,255,0.6)'; }}
          >
            🦋 Haut de page
          </div>
        </Link>
      </div>
    </footer>
  )
}
