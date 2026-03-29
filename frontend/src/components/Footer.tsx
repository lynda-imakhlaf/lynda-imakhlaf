import { Link } from 'react-scroll'

export default function Footer() {
  return (
    <footer style={{
      padding:'32px 28px', background:'rgba(255,255,255,0.6)', backdropFilter:'blur(12px)',
      borderTop:'1.5px solid rgba(26,22,48,0.08)',
    }}>
      <div style={{
        maxWidth:'1100px', margin:'0 auto',
        display:'flex', flexWrap:'wrap',
        alignItems:'center', justifyContent:'space-between', gap:'16px',
      }}>
        <Link to="hero" smooth duration={800} style={{ cursor:'pointer' }}>
          <img src="/lynda-logo.png" alt="Lynda Imakhlaf" style={{
            height:'34px', objectFit:'contain',
            filter:'drop-shadow(0 2px 6px rgba(255,45,120,0.2))',
          }} />
        </Link>

        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'11px',
          color:'#9B99B0', textAlign:'center' }}>
          © {new Date().getFullYear()} Lynda Imakhlaf — React · Three.js · Django
        </p>

        <Link to="hero" smooth duration={900} style={{ cursor:'pointer' }}>
          <div
            style={{
              display:'flex', alignItems:'center', gap:'6px',
              fontFamily:"'JetBrains Mono',monospace", fontSize:'11px',
              color:'#9B99B0', transition:'all 0.25s', padding:'7px 14px',
              borderRadius:'999px', border:'1.5px solid rgba(26,22,48,0.1)',
              background:'white',
            } as React.CSSProperties}
            onMouseEnter={e=>{ const el=e.currentTarget as HTMLDivElement; el.style.color='#8B5CF6'; el.style.borderColor='rgba(139,92,246,0.4)'; el.style.background='#F5F3FF'; }}
            onMouseLeave={e=>{ const el=e.currentTarget as HTMLDivElement; el.style.color='#9B99B0'; el.style.borderColor='rgba(26,22,48,0.1)'; el.style.background='white'; }}
          >
            ↑ Haut de page
          </div>
        </Link>
      </div>
    </footer>
  )
}
