import { Link } from 'react-scroll'

export default function Footer() {
  return (
    <footer style={{
      padding:'32px 28px', background:'white',
      borderTop:'1.5px solid rgba(26,22,48,0.08)',
    }}>
      <div style={{
        maxWidth:'1100px', margin:'0 auto',
        display:'flex', flexWrap:'wrap',
        alignItems:'center', justifyContent:'space-between', gap:'16px',
      }}>
        <Link to="hero" smooth duration={800} style={{ cursor:'pointer' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{
              width:'28px', height:'28px', borderRadius:'8px',
              background:'linear-gradient(135deg,#FF2D78,#8B5CF6)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:"'JetBrains Mono',monospace", fontWeight:900,
              fontSize:'11px', color:'white',
            }}>
              LI
            </div>
            <span style={{ fontFamily:"'JetBrains Mono',monospace",
              fontSize:'0.9rem', fontWeight:800, color:'#1A1630' }}>
              lynda<span style={{
                background:'linear-gradient(135deg,#FF2D78,#8B5CF6)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              }}>.</span>
            </span>
          </div>
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
