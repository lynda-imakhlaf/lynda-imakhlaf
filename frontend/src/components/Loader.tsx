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
      backgroundColor:'#EDE9FE',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      zIndex:9999, gap:'0',
    }}>
      <style>{`
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes papi-bounce { 0%,100%{transform:scale(1) rotate(-5deg);}50%{transform:scale(1.12) rotate(5deg);} }
      `}</style>

      {/* Spinning rainbow ring with papi4 */}
      <div style={{
        width:'100px', height:'100px', borderRadius:'50%', marginBottom:'30px',
        background:'conic-gradient(from 0deg, #7C3AED, #DB2777, #C2410C, #D97706, #15803D, #0369A1, #7C3AED)',
        animation:'spin 1.4s linear infinite',
        display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative',
      }}>
        <div style={{
          width:'82px', height:'82px', borderRadius:'50%',
          backgroundImage:'url(/bg.jpg)', backgroundSize:'cover',
          backgroundColor:'#EDE9FE',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <img src="/papi4.png" alt="" style={{
            width:'62px', height:'62px', objectFit:'contain',
            animation:'papi-bounce 1.4s ease-in-out infinite',
          }} />
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        width:'200px', height:'5px',
        background:'rgba(124,58,237,0.12)',
        borderRadius:'3px', overflow:'hidden', marginBottom:'14px',
        border:'1px solid rgba(168,85,247,0.2)',
      }}>
        <div style={{
          height:'100%', borderRadius:'3px',
          width:`${p}%`,
          background:'linear-gradient(90deg,#7C3AED,#DB2777,#C2410C)',
          transition:'width 0.12s ease',
        }} />
      </div>

      <span style={{
        fontFamily:"'Nunito',sans-serif", fontSize:'13px',
        color:'#7C3AED', fontWeight:800, letterSpacing:'2px',
      }}>
        {Math.round(p)}%
      </span>

      <p style={{
        marginTop:'10px', fontFamily:"'Pacifico',cursive",
        fontSize:'14px', color:'#A855F7', opacity:0.7,
      }}>
        lynda.
      </p>
    </div>
  )
}
