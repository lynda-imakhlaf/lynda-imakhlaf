import { useEffect, useState } from 'react'

export default function Loader() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => {
      setPct(p => { if (p >= 100) { clearInterval(iv); return 100 } return p + Math.random() * 15 })
    }, 120)
    return () => clearInterval(iv)
  }, [])

  const p = Math.min(pct, 100)

  return (
    <div style={{
      position:'fixed', inset:0,
      backgroundImage:'url(/bg.jpg)', backgroundSize:'cover', backgroundPosition:'center',
      backgroundColor:'#0F0520',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      zIndex:9999, gap:'0',
    }}>
      {/* Dark overlay */}
      <div style={{ position:'absolute', inset:0, background:'rgba(15,5,32,0.72)', zIndex:0 }} />

      <style>{`
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes papi-bounce { 0%,100%{transform:scale(1) rotate(-5deg);}50%{transform:scale(1.12) rotate(5deg);} }
      `}</style>

      {/* Spinning rainbow ring with papi4 */}
      <div style={{
        width:'100px', height:'100px', borderRadius:'50%', marginBottom:'30px',
        background:'conic-gradient(from 0deg, #A855F7, #F472B6, #FB923C, #FBBF24, #4ADE80, #38BDF8, #A855F7)',
        animation:'spin 1.4s linear infinite',
        display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative', zIndex:1,
        boxShadow:'0 0 30px rgba(168,85,247,0.6), 0 0 60px rgba(168,85,247,0.3)',
      }}>
        <div style={{
          width:'82px', height:'82px', borderRadius:'50%',
          backgroundImage:'url(/bg.jpg)', backgroundSize:'cover',
          backgroundColor:'#0F0520',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <img src="/papi4.png" alt="" style={{
            width:'62px', height:'62px', objectFit:'contain',
            animation:'papi-bounce 1.4s ease-in-out infinite',
            filter:'drop-shadow(0 0 10px rgba(168,85,247,0.7))',
          }} />
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        width:'200px', height:'5px', zIndex:1,
        background:'rgba(168,85,247,0.15)',
        borderRadius:'3px', overflow:'hidden', marginBottom:'14px',
        border:'1px solid rgba(168,85,247,0.25)',
      }}>
        <div style={{
          height:'100%', borderRadius:'3px',
          width:`${p}%`,
          background:'linear-gradient(90deg,#A855F7,#F472B6,#FB923C)',
          boxShadow:'0 0 8px rgba(168,85,247,0.8)',
          transition:'width 0.12s ease',
        }} />
      </div>

      <span style={{
        fontFamily:"'Nunito',sans-serif", fontSize:'13px', zIndex:1,
        color:'#C084FC', fontWeight:800, letterSpacing:'2px',
        textShadow:'0 0 10px rgba(192,132,252,0.6)',
      }}>
        {Math.round(p)}%
      </span>

      <p style={{
        marginTop:'10px', fontFamily:"'Pacifico',cursive", zIndex:1,
        fontSize:'14px', color:'#A855F7', opacity:0.85,
        textShadow:'0 0 12px rgba(168,85,247,0.6)',
      }}>
        lynda.
      </p>
    </div>
  )
}
