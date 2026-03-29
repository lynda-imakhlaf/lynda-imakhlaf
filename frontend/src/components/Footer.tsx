import { Link } from 'react-scroll'
import { useTheme } from '../ThemeContext'

export default function Footer() {
  const { theme: t } = useTheme()

  return (
    <footer style={{
      padding:'32px 28px',
      background: t.isDark ? 'rgba(15,5,32,0.8)' : 'rgba(255,255,255,0.55)',
      backdropFilter:'blur(20px)',
      borderTop:`1px solid rgba(168,85,247,${t.isDark ? '0.15' : '0.12'})`,
      boxShadow: t.isDark
        ? '0 -4px 24px rgba(0,0,0,0.4), 0 0 20px rgba(124,58,237,0.08)'
        : '0 -4px 20px rgba(124,58,237,0.06)',
    }}>
      <div style={{
        maxWidth:'1100px', margin:'0 auto',
        display:'flex', flexWrap:'wrap',
        alignItems:'center', justifyContent:'space-between', gap:'16px',
      }}>

        <Link to="hero" smooth duration={800} style={{ cursor:'pointer' }}>
          <img src={t.isDark ? '/lynda-logo.png' : '/lynda-logo-dark.png'} alt="Lynda Imakhlaf" style={{
            height:'34px', objectFit:'contain',
            filter: t.isDark
              ? 'drop-shadow(0 0 10px rgba(168,85,247,0.7))'
              : 'drop-shadow(0 2px 8px rgba(124,58,237,0.2))',
          }} />
        </Link>

        <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'12px', fontWeight:600,
          color: t.mute, textAlign:'center' }}>
          © {new Date().getFullYear()} Lynda Imakhlaf — React · Three.js · Django
        </p>

        <Link to="hero" smooth duration={900} style={{ cursor:'pointer' }}>
          <div
            style={{
              display:'flex', alignItems:'center', gap:'6px',
              fontFamily:"'Nunito',sans-serif", fontSize:'12px', fontWeight:700,
              color: t.soft, transition:'all 0.25s', padding:'7px 16px',
              borderRadius:'999px', border: t.cardBorder,
              background: t.card, backdropFilter:'blur(8px)',
            } as React.CSSProperties}
            onMouseEnter={e=>{ const el=e.currentTarget as HTMLDivElement; el.style.color=t.pairs.purple.color; el.style.boxShadow=t.isDark?'0 0 16px rgba(168,85,247,0.3)':'none'; }}
            onMouseLeave={e=>{ const el=e.currentTarget as HTMLDivElement; el.style.color=t.soft; el.style.boxShadow='none'; }}
          >
             Haut de page
          </div>
        </Link>
      </div>
    </footer>
  )
}
