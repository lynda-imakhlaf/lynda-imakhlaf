import { useEffect, useState } from 'react'

export default function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + Math.random() * 18
      })
    }, 120)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0d0221',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      <style>{`
        @keyframes loader-glow {
          0%, 100% { text-shadow: 0 0 20px #a855f7, 0 0 40px #a855f7; }
          50% { text-shadow: 0 0 40px #a855f7, 0 0 80px #6e00ff; }
        }
        @keyframes loader-bar {
          0% { width: 0%; }
        }
      `}</style>

      {/* Logo */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '2.4rem',
        fontWeight: 700,
        color: '#a855f7',
        marginBottom: '48px',
        letterSpacing: '-1px',
        animation: 'loader-glow 2s ease-in-out infinite',
      }}>
        LI<span style={{ color: '#6e00ff' }}>_</span>
      </div>

      {/* Progress bar track */}
      <div style={{
        width: '240px',
        height: '2px',
        background: 'rgba(168, 85, 247, 0.15)',
        borderRadius: '1px',
        overflow: 'hidden',
        marginBottom: '16px',
      }}>
        <div style={{
          height: '100%',
          width: `${Math.min(progress, 100)}%`,
          background: 'linear-gradient(90deg, #6e00ff, #a855f7)',
          borderRadius: '1px',
          transition: 'width 0.12s ease',
          boxShadow: '0 0 8px #a855f7',
        }} />
      </div>

      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '12px',
        color: '#7c6fa0',
        letterSpacing: '2px',
      }}>
        {Math.min(Math.round(progress), 100)}%
      </div>
    </div>
  )
}
