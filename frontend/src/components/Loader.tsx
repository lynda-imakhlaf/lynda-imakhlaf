import { useEffect, useState } from 'react'

export default function Loader() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => {
      setPct(p => { if (p >= 100) { clearInterval(iv); return 100 } return p + Math.random() * 15 })
    }, 120)
    return () => clearInterval(iv)
  }, [])

  const colors = ['#FF2D78','#FF6B35','#8B5CF6']
  const p = Math.min(pct, 100)
  const idx = Math.floor((p / 100) * (colors.length - 1))
  const accentColor = colors[idx]

  return (
    <div style={{
      position:'fixed', inset:0,
      background:'#F6F4FF',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      zIndex:9999, gap:'0',
    }}>
      <style>{`
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes ld-pop { 0%,100%{transform:scale(1);}50%{transform:scale(1.08);} }
      `}</style>

      {/* Spinning rainbow ring + papi4 inside */}
      <div style={{
        width:'90px', height:'90px', borderRadius:'50%', marginBottom:'30px',
        background:`conic-gradient(from 0deg, #FF2D78, #8B5CF6, #FF2D78)`,
        animation:'spin 1.2s linear infinite',
        display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative',
      }}>
        {/* White inner circle */}
        <div style={{
          width:'74px', height:'74px', borderRadius:'50%',
          background:'#F6F4FF',
          display:'flex', alignItems:'center', justifyContent:'center',
          animation:'ld-pop 1.2s ease-in-out infinite',
          overflow:'hidden',
        }}>
          <img src="/papi4.png" alt="" style={{
            width:'58px', height:'58px', objectFit:'contain',
            filter:'drop-shadow(0 2px 6px rgba(255,45,120,0.3))',
          }} />
        </div>
      </div>

      {/* Rainbow progress bar */}
      <div style={{
        width:'200px', height:'5px',
        background:'rgba(26,22,48,0.08)',
        borderRadius:'3px', overflow:'hidden', marginBottom:'14px',
        border:'1px solid rgba(26,22,48,0.06)',
      }}>
        <div style={{
          height:'100%', borderRadius:'3px',
          width:`${p}%`,
          background:'linear-gradient(90deg,#FF2D78,#FF6B35,#FFBD35,#00C896,#0EA5E9,#8B5CF6)',
          transition:'width 0.12s ease',
          backgroundSize:'200px 100%',
        }} />
      </div>

      <span style={{
        fontFamily:"'JetBrains Mono',monospace", fontSize:'11px',
        color: accentColor, fontWeight:700, letterSpacing:'2px',
        transition:'color 0.4s ease',
      }}>
        {Math.round(p)}%
      </span>
    </div>
  )
}
