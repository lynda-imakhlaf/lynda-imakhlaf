import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'
import { useTheme } from '../ThemeContext'

interface F { name:string; email:string; subject:string; message:string }

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  const [form, setForm] = useState<F>({ name:'', email:'', subject:'', message:'' })
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'err'>('idle')
  const { theme: t } = useTheme()

  const socials = [
    { l:'GitHub',   v:'github.com/lynda-imakhlaf',      h:'https://github.com/lynda-imakhlaf',      ...t.pairs.purple,
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
    { l:'LinkedIn', v:'linkedin.com/in/lynda-imakhlaf',  h:'https://linkedin.com/in/lynda-imakhlaf', ...t.pairs.blue,
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
    { l:'Email',    v:'imakhlflyndatiane@gmail.com',      h:'mailto:imakhlflyndatiane@gmail.com',      ...t.pairs.pink,
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.749L12 10.87l9.615-7.048h.749c.904 0 1.636.732 1.636 1.636z"/></svg> },
  ]

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('sending')
    try { await axios.post('/api/contact/', form); setStatus('ok'); setForm({ name:'', email:'', subject:'', message:'' }) }
    catch { setStatus('err') }
  }

  return (
    <section id="contact" ref={ref} style={{ padding:'100px 0', position:'relative', overflow:'hidden', background:'transparent' }}>

      <div style={{ position:'absolute', top:'-60px', right:'-40px', width:'320px', height:'320px',
        borderRadius:'50%', pointerEvents:'none',
        background:`radial-gradient(circle,${t.pairs.purple.bg} 0%,transparent 70%)` }} />
      <div style={{ position:'absolute', bottom:'-40px', left:'-40px', width:'260px', height:'260px',
        borderRadius:'50%', pointerEvents:'none',
        background:`radial-gradient(circle,${t.pairs.pink.bg} 0%,transparent 70%)` }} />

      <style>{`
        @keyframes ct-in { from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);} }
        .ct { opacity:0; }
        .ct.v { animation:ct-in 0.65s ease forwards; }
        .f-inp {
          width:100%;
          background:${t.inputBg};
          backdrop-filter:blur(12px);
          border:${t.isDark ? '1px solid rgba(168,85,247,0.2)' : '1.5px solid rgba(255,255,255,0.85)'};
          border-radius:14px; padding:13px 16px;
          color:${t.text}; font-family:'Nunito',sans-serif; font-size:14px; font-weight:600;
          outline:none; transition:all 0.25s; box-sizing:border-box;
          box-shadow:${t.isDark ? 'none' : '0 2px 10px rgba(124,58,237,0.06)'};
        }
        .f-inp::placeholder { color:${t.mute}; opacity:${t.isDark ? '0.8' : '0.7'}; }
        .f-inp:focus { border-color:${t.pairs.purple.color}; box-shadow:0 0 0 ${t.isDark ? '3px rgba(168,85,247,0.15)' : '4px rgba(168,85,247,0.12)'}${t.isDark ? ', 0 0 18px rgba(168,85,247,0.2)' : ''}; background:${t.isDark ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.85)'}; }
        .f-label {
          font-family:'Nunito',sans-serif; font-size:12px;
          font-weight:800; color:${t.soft}; letter-spacing:1px;
          text-transform:uppercase; margin-bottom:7px; display:block;
        }
        .s-link {
          display:flex; align-items:center; gap:14px;
          padding:14px 18px; border-radius:18px;
          transition:all 0.28s; text-decoration:none;
          backdrop-filter:blur(14px);
        }
        .s-link:hover { transform:translateX(6px); }
        .send-btn {
          width:100%; padding:14px;
          background:linear-gradient(135deg,${t.pairs.purple.color},${t.pairs.pink.color});
          border:none; border-radius:14px; color:white;
          font-family:'Nunito',sans-serif; font-size:14px;
          font-weight:800; cursor:pointer; transition:all 0.3s;
          box-shadow:0 6px 22px rgba(168,85,247,${t.isDark ? '0.45' : '0.35'})${t.isDark ? ', 0 0 24px rgba(168,85,247,0.2)' : ''};
        }
        .send-btn:hover:not(:disabled) { transform:translateY(-3px); box-shadow:0 10px 32px rgba(168,85,247,${t.isDark ? '0.55' : '0.45'})${t.isDark ? ', 0 0 36px rgba(168,85,247,0.3)' : ''}; }
        .send-btn:disabled { opacity:0.5; cursor:not-allowed; }
      `}</style>

      <div className="container">

        <div className={`ct ${inView?'v':''}`} style={{ animationDelay:'0s', marginBottom:'60px' }}>
          <p className="section-label"> Contact</p>
          <h2 className="section-title">
            Travaillons{' '}
            <span style={{ background:'var(--grad-text-main)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontStyle:'italic' }}>
              ensemble
            </span>
          </h2>
          <div className="title-bar" />
          <p className="section-sub">Disponible pour du freelance. Web, 3D, jeux — discutons de ton projet.</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'44px', alignItems:'start' }}>

          {/* Left */}
          <div className={`ct ${inView?'v':''}`} style={{ animationDelay:'0.15s' }}>
            <div style={{
              background: t.card, backdropFilter:'blur(18px)',
              border: t.cardBorder,
              borderRadius:'20px', padding:'22px', marginBottom:'18px',
              boxShadow: t.cardShadow,
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}>
                <img src="/papi4.png" alt="" style={{ width:'28px', height:'28px', objectFit:'contain',
                  filter: t.isDark ? 'drop-shadow(0 0 8px rgba(168,85,247,0.6))' : 'drop-shadow(0 2px 6px rgba(124,58,237,0.2))' }} />
                <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:'13px', fontWeight:800,
                  color: t.isDark ? '#C084FC' : '#7C3AED',
                  textShadow: t.isDark ? '0 0 10px rgba(192,132,252,0.4)' : 'none' }}>
                  Disponible pour le freelance
                </span>
              </div>
              <p style={{ color: t.soft, fontSize:'0.88rem', lineHeight:1.75, fontWeight:500 }}>
                Full-time le jour, freelance le soir et week-end. Projets web, 3D, jeux — je m'adapte.
              </p>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {socials.map(({ l, v, h, color, bg, border, icon }) => (
                <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                  className="s-link" style={{ background: bg, border:`1px solid ${border}` }}>
                  <div style={{
                    width:'40px', height:'40px', borderRadius:'12px', flexShrink:0,
                    // background: t.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.8)',
                    // border:`1px solid ${border}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color,
                    // boxShadow: t.isDark ? `0 0 10px ${color}30` : 'none',
                  }}>
                    {icon}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:'10px', color, opacity:0.8,
                      textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:'2px', fontWeight:800 }}>{l}</div>
                    <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:'12px', color, fontWeight:700 }}>{v}</div>
                  </div>
                  <span style={{ color, fontSize:'16px', opacity:0.7 }}>→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className={`ct ${inView?'v':''}`} style={{ animationDelay:'0.28s' }}>
            <div style={{
              background: t.card, backdropFilter:'blur(20px)',
              border: t.cardBorder,
              borderRadius:'24px', padding:'32px',
              boxShadow: t.cardShadow,
              position:'relative', overflow:'hidden',
            }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px',
                background:`linear-gradient(90deg,${t.pairs.purple.color},${t.pairs.pink.color},${t.pairs.orange.color},${t.pairs.green.color},${t.pairs.blue.color})`,
                boxShadow: t.isDark ? '0 0 12px rgba(168,85,247,0.6)' : 'none',
              }} />

              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'24px', paddingTop:'8px' }}>
                <img src="/papi4.png" alt="" style={{ width:'28px', height:'28px', objectFit:'contain',
                  filter: t.isDark ? 'drop-shadow(0 0 8px rgba(168,85,247,0.6))' : 'drop-shadow(0 2px 6px rgba(124,58,237,0.2))' }} />
                <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:'13px', fontWeight:800, color: t.soft }}>
                  Envoie-moi un message
                </span>
              </div>

              {status === 'ok' ? (
                <div style={{ textAlign:'center', padding:'40px 0' }}>
                  <img src="/papi4.png" alt="" style={{ width:'80px', marginBottom:'16px',
                    filter: t.isDark ? 'drop-shadow(0 0 16px rgba(168,85,247,0.7))' : 'drop-shadow(0 4px 12px rgba(124,58,237,0.3))' }} />
                  <h3 style={{ fontFamily:"'Playfair Display',serif",
                    background:'var(--grad-text-main)',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                    marginBottom:'10px', fontSize:'1.3rem' }}>Message envoyé !</h3>
                  <p style={{ color: t.soft, fontSize:'0.9rem', fontWeight:500 }}>Je te réponds dès que possible.</p>
                  <button onClick={()=>setStatus('idle')} style={{
                    marginTop:'20px', background: t.card,
                    border: t.cardBorder, borderRadius:'999px',
                    color: t.soft, padding:'8px 20px',
                    fontFamily:"'Nunito',sans-serif", fontSize:'13px', fontWeight:700, cursor:'pointer',
                  }}>
                    Envoyer un autre
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
                    <div>
                      <label className="f-label">Nom</label>
                      <input className="f-inp" name="name" value={form.name} onChange={onChange} placeholder="Ton prénom" required />
                    </div>
                    <div>
                      <label className="f-label">Email</label>
                      <input className="f-inp" type="email" name="email" value={form.email} onChange={onChange} placeholder="toi@exemple.com" required />
                    </div>
                  </div>
                  <div>
                    <label className="f-label">Sujet</label>
                    <input className="f-inp" name="subject" value={form.subject} onChange={onChange} placeholder="Un projet, une collaboration..." required />
                  </div>
                  <div>
                    <label className="f-label">Message</label>
                    <textarea className="f-inp" name="message" value={form.message} onChange={onChange}
                      placeholder="Parle-moi de ton projet..." rows={5} required style={{ resize:'vertical', minHeight:'115px' }} />
                  </div>
                  {status === 'err' && (
                    <p style={{ color: t.pairs.pink.color, fontFamily:"'Nunito',sans-serif", fontSize:'12px', fontWeight:700,
                      background: t.pairs.pink.bg, border:`1px solid ${t.pairs.pink.border}`,
                      borderRadius:'10px', padding:'10px' }}>
                      Erreur. Écris-moi directement à imakhlflyndatiane@gmail.com
                    </p>
                  )}
                  <button type="submit" className="send-btn" disabled={status==='sending'}>
                    {status==='sending' ? 'Envoi en cours...' : 'Envoyer mon message '}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
