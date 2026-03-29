import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'

interface F { name:string; email:string; subject:string; message:string }

const SOCIALS = [
  { l:'GitHub',   v:'github.com/lynda-imakhlaf',       h:'https://github.com/lynda-imakhlaf',       c:'#7C3AED', bg:'rgba(124,58,237,0.08)', border:'rgba(124,58,237,0.2)' },
  { l:'LinkedIn', v:'linkedin.com/in/lynda-imakhlaf',   h:'https://linkedin.com/in/lynda-imakhlaf',  c:'#0369A1', bg:'rgba(3,105,161,0.08)',   border:'rgba(3,105,161,0.2)'  },
  { l:'Email',    v:'imakhlflyndatiane@gmail.com',       h:'mailto:imakhlflyndatiane@gmail.com',       c:'#DB2777', bg:'rgba(219,39,119,0.08)',  border:'rgba(219,39,119,0.2)' },
]

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  const [form, setForm] = useState<F>({ name:'', email:'', subject:'', message:'' })
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'err'>('idle')

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('sending')
    try { await axios.post('/api/contact/', form); setStatus('ok'); setForm({ name:'', email:'', subject:'', message:'' }) }
    catch { setStatus('err') }
  }

  return (
    <section id="contact" ref={ref} style={{ padding:'100px 0', position:'relative', overflow:'hidden', background:'transparent' }}>

      {/* Decorative blobs */}
      <div style={{ position:'absolute', top:'-60px', right:'-40px', width:'320px', height:'320px',
        borderRadius:'50%', pointerEvents:'none',
        background:'radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%)' }} />
      <div style={{ position:'absolute', bottom:'-40px', left:'-40px', width:'260px', height:'260px',
        borderRadius:'50%', pointerEvents:'none',
        background:'radial-gradient(circle,rgba(219,39,119,0.07) 0%,transparent 70%)' }} />

      <style>{`
        @keyframes ct-in { from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);} }
        .ct { opacity:0; }
        .ct.v { animation:ct-in 0.65s ease forwards; }
        .f-inp {
          width:100%;
          background:rgba(255,255,255,0.7);
          backdrop-filter:blur(12px);
          border:1.5px solid rgba(255,255,255,0.85);
          border-radius:14px; padding:13px 16px;
          color:#2E1065; font-family:'Nunito',sans-serif; font-size:14px; font-weight:600;
          outline:none; transition:all 0.25s; box-sizing:border-box;
          box-shadow:0 2px 10px rgba(124,58,237,0.06);
        }
        .f-inp::placeholder { color:#8B5CF6; opacity:0.7; }
        .f-inp:focus { border-color:#A855F7; box-shadow:0 0 0 4px rgba(168,85,247,0.12); background:rgba(255,255,255,0.85); }
        .f-label {
          font-family:'Nunito',sans-serif; font-size:12px;
          font-weight:800; color:#5B21B6; letter-spacing:1px;
          text-transform:uppercase; margin-bottom:7px; display:block;
        }
        .s-link {
          display:flex; align-items:center; gap:14px;
          padding:14px 18px; border-radius:18px;
          transition:all 0.28s; text-decoration:none;
          backdrop-filter:blur(14px);
        }
        .s-link:hover { transform:translateX(6px); box-shadow:0 8px 24px rgba(124,58,237,0.12); }
        .send-btn {
          width:100%; padding:14px;
          background:linear-gradient(135deg,#7C3AED,#DB2777);
          border:none; border-radius:14px; color:white;
          font-family:'Nunito',sans-serif; font-size:14px;
          font-weight:800; cursor:pointer; transition:all 0.3s;
          box-shadow:0 6px 22px rgba(124,58,237,0.35);
        }
        .send-btn:hover:not(:disabled) { transform:translateY(-3px); box-shadow:0 10px 32px rgba(124,58,237,0.45); }
        .send-btn:disabled { opacity:0.6; cursor:not-allowed; }
      `}</style>

      <div className="container">

        {/* Header */}
        <div className={`ct ${inView?'v':''}`} style={{ animationDelay:'0s', marginBottom:'60px' }}>
          <p className="section-label">🦋 Contact</p>
          <h2 className="section-title">
            Travaillons{' '}
            <span style={{ background:'linear-gradient(135deg,#7C3AED,#DB2777)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontStyle:'italic' }}>
              ensemble
            </span>
          </h2>
          <div className="title-bar" />
          <p className="section-sub">Disponible pour du freelance. Web, 3D, jeux — discutons de ton projet.</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'44px', alignItems:'start' }}>

          {/* Left */}
          <div className={`ct ${inView?'v':''}`} style={{ animationDelay:'0.15s' }}>
            {/* Availability */}
            <div style={{
              background:'rgba(255,255,255,0.65)', backdropFilter:'blur(16px)',
              border:'1.5px solid rgba(124,58,237,0.2)',
              borderRadius:'20px', padding:'22px', marginBottom:'18px',
              boxShadow:'0 4px 20px rgba(124,58,237,0.08)',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}>
                <img src="/papi4.png" alt="" style={{ width:'28px', height:'28px', objectFit:'contain' }} />
                <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:'13px', fontWeight:800, color:'#7C3AED' }}>
                  Disponible pour le freelance
                </span>
              </div>
              <p style={{ color:'#5B21B6', fontSize:'0.88rem', lineHeight:1.75, fontWeight:500 }}>
                Full-time le jour, freelance le soir et week-end. Projets web, 3D, jeux — je m'adapte.
              </p>
            </div>

            {/* Socials */}
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {SOCIALS.map(({ l, v, h, c, bg, border }) => (
                <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                  className="s-link" style={{ background:bg, border:`1.5px solid ${border}` }}>
                  <div style={{
                    width:'40px', height:'40px', borderRadius:'12px', flexShrink:0,
                    background:'rgba(255,255,255,0.8)', border:`1.5px solid ${border}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontFamily:"'Nunito',sans-serif", fontSize:'13px', fontWeight:900, color:c,
                  }}>
                    {l[0]}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:'10px', color:c, opacity:0.7,
                      textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:'2px', fontWeight:800 }}>{l}</div>
                    <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:'12px', color:c, fontWeight:700 }}>{v}</div>
                  </div>
                  <span style={{ color:c, fontSize:'16px', opacity:0.6 }}>→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className={`ct ${inView?'v':''}`} style={{ animationDelay:'0.28s' }}>
            <div style={{
              background:'rgba(255,255,255,0.65)', backdropFilter:'blur(18px)',
              border:'1.5px solid rgba(255,255,255,0.85)',
              borderRadius:'24px', padding:'32px',
              boxShadow:'0 8px 32px rgba(124,58,237,0.1)',
              position:'relative', overflow:'hidden',
            }}>
              {/* Top bar */}
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px',
                background:'linear-gradient(90deg,#7C3AED,#DB2777,#C2410C,#15803D,#0369A1)' }} />

              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'24px', paddingTop:'8px' }}>
                <img src="/papi4.png" alt="" style={{ width:'28px', height:'28px', objectFit:'contain' }} />
                <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:'13px', fontWeight:800, color:'#5B21B6' }}>
                  Envoie-moi un message
                </span>
              </div>

              {status === 'ok' ? (
                <div style={{ textAlign:'center', padding:'40px 0' }}>
                  <img src="/papi4.png" alt="" style={{ width:'80px', marginBottom:'16px' }} />
                  <h3 style={{ fontFamily:"'Playfair Display',serif",
                    background:'linear-gradient(135deg,#7C3AED,#DB2777)',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                    marginBottom:'10px', fontSize:'1.3rem' }}>Message envoyé !</h3>
                  <p style={{ color:'#5B21B6', fontSize:'0.9rem', fontWeight:500 }}>Je te réponds dès que possible.</p>
                  <button onClick={()=>setStatus('idle')} style={{
                    marginTop:'20px', background:'rgba(255,255,255,0.7)',
                    border:'1.5px solid rgba(124,58,237,0.2)', borderRadius:'999px',
                    color:'#5B21B6', padding:'8px 20px',
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
                    <p style={{ color:'#DB2777', fontFamily:"'Nunito',sans-serif", fontSize:'12px', fontWeight:700,
                      background:'rgba(219,39,119,0.08)', border:'1px solid rgba(219,39,119,0.2)',
                      borderRadius:'10px', padding:'10px' }}>
                      Erreur. Écris-moi directement à imakhlflyndatiane@gmail.com
                    </p>
                  )}
                  <button type="submit" className="send-btn" disabled={status==='sending'}>
                    {status==='sending' ? 'Envoi en cours...' : 'Envoyer mon message 🦋'}
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
