import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'

interface F { name:string; email:string; subject:string; message:string }

const SOCIALS = [
  { l:'GitHub',   v:'github.com/lynda-imakhlaf',      h:'https://github.com/lynda-imakhlaf',         c:'#8B5CF6', bg:'#F5F3FF', border:'rgba(139,92,246,0.2)' },
  { l:'LinkedIn', v:'linkedin.com/in/lynda-imakhlaf',  h:'https://linkedin.com/in/lynda-imakhlaf',   c:'#0EA5E9', bg:'#F0F9FF', border:'rgba(14,165,233,0.2)'  },
  { l:'Email',    v:'imakhlflyndatiane@gmail.com',      h:'mailto:imakhlflyndatiane@gmail.com',        c:'#FF2D78', bg:'#FFF0F5', border:'rgba(255,45,120,0.2)'  },
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
    <section id="contact" ref={ref} style={{
      padding:'100px 0', position:'relative', overflow:'hidden',
      background:'#F6F4FF',
    }}>
      {/* Polka dots */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', opacity:0.3,
        backgroundImage:'radial-gradient(circle,rgba(255,45,120,0.15) 1px,transparent 1px)',
        backgroundSize:'28px 28px',
      }} />
      {/* Corner blobs */}
      <div style={{ position:'absolute', top:'-60px', right:'-40px', width:'320px', height:'320px',
        borderRadius:'50%', pointerEvents:'none',
        background:'radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 70%)' }} />
      <div style={{ position:'absolute', bottom:'-40px', left:'-40px', width:'260px', height:'260px',
        borderRadius:'50%', pointerEvents:'none',
        background:'radial-gradient(circle,rgba(255,45,120,0.08) 0%,transparent 70%)' }} />

      <style>{`
        @keyframes ct-in { from{opacity:0;transform:translateY(34px);}to{opacity:1;transform:translateY(0);} }
        .ct { opacity:0; }
        .ct.v { animation:ct-in 0.65s ease forwards; }

        .f-inp {
          width:100%; background:white;
          border:1.5px solid rgba(26,22,48,0.1);
          border-radius:12px; padding:13px 16px;
          color:#1A1630; font-family:'Inter',sans-serif; font-size:14px;
          outline:none; transition:all 0.25s; box-sizing:border-box;
          box-shadow:0 2px 8px rgba(26,22,48,0.05);
        }
        .f-inp::placeholder { color:#9B99B0; }
        .f-inp:focus {
          border-color:#8B5CF6;
          box-shadow:0 0 0 4px rgba(139,92,246,0.1);
        }
        .f-label {
          font-family:'JetBrains Mono',monospace; font-size:11px;
          font-weight:700; color:#5A5878; letter-spacing:1.5px;
          text-transform:uppercase; margin-bottom:7px; display:block;
        }
        .s-link {
          display:flex; align-items:center; gap:14px;
          padding:14px 18px; border-radius:16px;
          transition:all 0.28s; text-decoration:none;
          box-shadow:0 2px 10px rgba(26,22,48,0.06);
        }
        .s-link:hover { transform:translateX(6px); box-shadow:0 6px 20px rgba(26,22,48,0.1); }
        .send-btn {
          width:100%; padding:14px;
          background:linear-gradient(135deg,#FF2D78,#8B5CF6);
          border:none; border-radius:12px; color:white;
          font-family:'JetBrains Mono',monospace; font-size:13px;
          font-weight:700; cursor:pointer; transition:all 0.3s;
          box-shadow:0 6px 22px rgba(255,45,120,0.35);
          letter-spacing:0.3px;
        }
        .send-btn:hover:not(:disabled) { transform:translateY(-3px); box-shadow:0 10px 32px rgba(255,45,120,0.45); }
        .send-btn:disabled { opacity:0.6; cursor:not-allowed; }
      `}</style>

      <div className="container">

        {/* Header */}
        <div className={`ct ${inView?'v':''}`} style={{ animationDelay:'0s', marginBottom:'60px' }}>
          <p className="section-label" style={{ color:'#FF2D78' }}>✦ Contact</p>
          <h2 className="section-title">
            Travaillons{' '}
            <span style={{
              background:'linear-gradient(135deg,#FF2D78,#8B5CF6)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            }}>
              ensemble
            </span>
          </h2>
          <div style={{ width:'70px', height:'5px', borderRadius:'3px',
            background:'linear-gradient(90deg,#FF2D78,#8B5CF6)', marginBottom:'20px' }} />
          <p className="section-sub">
            Dispo pour du freelance. Web, 3D, jeux — discutons de ton projet.
          </p>
        </div>

        <div style={{
          display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',
          gap:'44px', alignItems:'start',
        }}>

          {/* Left */}
          <div className={`ct ${inView?'v':''}`} style={{ animationDelay:'0.15s' }}>
            {/* Availability card */}
            <div style={{
              background:'white', border:'1.5px solid rgba(0,200,150,0.25)',
              borderRadius:'20px', padding:'24px', marginBottom:'18px',
              boxShadow:'0 4px 20px rgba(0,200,150,0.1)',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}>
                <span style={{
                  width:'10px', height:'10px', borderRadius:'50%',
                  background:'#00C896', animation:'pulse-ring 2s infinite',
                  flexShrink:0,
                }} />
                <span style={{ fontFamily:"'JetBrains Mono',monospace",
                  fontSize:'13px', fontWeight:800, color:'#00A87A' }}>
                  Disponible pour le freelance
                </span>
              </div>
              <p style={{ color:'#5A5878', fontSize:'0.88rem', lineHeight:1.75 }}>
                Full-time le jour, freelance le soir et week-end.
                Projets web, 3D, jeux — je m'adapte.
              </p>
            </div>

            {/* Social links */}
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {SOCIALS.map(({ l, v, h, c, bg, border }) => (
                <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                  className="s-link" style={{ background:bg, border:`1.5px solid ${border}` }}>
                  <div style={{
                    width:'38px', height:'38px', borderRadius:'11px', flexShrink:0,
                    background:'white', border:`1.5px solid ${border}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontFamily:"'JetBrains Mono',monospace", fontSize:'12px',
                    fontWeight:800, color:c,
                    boxShadow:`0 2px 8px ${c}25`,
                  }}>
                    {l[0]}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'10px',
                      color:'#9B99B0', textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:'2px' }}>
                      {l}
                    </div>
                    <div style={{ fontFamily:"'JetBrains Mono',monospace",
                      fontSize:'12px', color:c, fontWeight:700 }}>{v}</div>
                  </div>
                  <span style={{ color:'#9B99B0', fontSize:'16px' }}>→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className={`ct ${inView?'v':''}`} style={{ animationDelay:'0.28s' }}>
            <div style={{
              background:'white',
              border:'1.5px solid rgba(26,22,48,0.09)',
              borderRadius:'24px', padding:'32px',
              boxShadow:'0 8px 32px rgba(26,22,48,0.08)',
              position:'relative', overflow:'hidden',
            }}>
              {/* Rainbow top bar */}
              <div style={{
                position:'absolute', top:0, left:0, right:0, height:'4px',
                background:'linear-gradient(90deg,#FF2D78,#FF6B35,#FFBD35,#00C896,#0EA5E9,#8B5CF6)',
              }} />

              {/* Terminal dots */}
              <div style={{ display:'flex', gap:'7px', marginBottom:'24px',
                paddingBottom:'14px', borderBottom:'1px solid rgba(26,22,48,0.07)',
                paddingTop:'6px',
              }}>
                {['#FF5F57','#FEBC2E','#28C840'].map(c => (
                  <div key={c} style={{ width:'10px', height:'10px', borderRadius:'50%', background:c }} />
                ))}
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'11px',
                  color:'#9B99B0', marginLeft:'8px' }}>
                  ~/contact.sh
                </span>
              </div>

              {status === 'ok' ? (
                <div style={{ textAlign:'center', padding:'40px 0' }}>
                  <div style={{ fontSize:'3rem', marginBottom:'16px' }}>🎉</div>
                  <h3 style={{
                    background:'linear-gradient(135deg,#FF2D78,#8B5CF6)',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                    marginBottom:'10px', fontSize:'1.2rem',
                  }}>Message envoyé !</h3>
                  <p style={{ color:'#5A5878', fontSize:'0.9rem' }}>Je te réponds dès que possible.</p>
                  <button onClick={()=>setStatus('idle')} style={{
                    marginTop:'20px', background:'white',
                    border:'1.5px solid rgba(26,22,48,0.12)', borderRadius:'999px',
                    color:'#5A5878', padding:'8px 20px',
                    fontFamily:"'JetBrains Mono',monospace", fontSize:'12px', cursor:'pointer',
                  }}>
                    Envoyer un autre
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
                    <div>
                      <label className="f-label">Nom</label>
                      <input className="f-inp" name="name" value={form.name}
                        onChange={onChange} placeholder="Ton prénom" required />
                    </div>
                    <div>
                      <label className="f-label">Email</label>
                      <input className="f-inp" type="email" name="email" value={form.email}
                        onChange={onChange} placeholder="toi@exemple.com" required />
                    </div>
                  </div>
                  <div>
                    <label className="f-label">Sujet</label>
                    <input className="f-inp" name="subject" value={form.subject}
                      onChange={onChange} placeholder="Un projet, une collaboration..." required />
                  </div>
                  <div>
                    <label className="f-label">Message</label>
                    <textarea className="f-inp" name="message" value={form.message}
                      onChange={onChange} placeholder="Parle-moi de ton projet..."
                      rows={5} required style={{ resize:'vertical', minHeight:'115px' }} />
                  </div>
                  {status === 'err' && (
                    <p style={{ color:'#FF2D78', fontFamily:"'JetBrains Mono',monospace",
                      fontSize:'11px', background:'#FFF0F5', border:'1px solid rgba(255,45,120,0.2)',
                      borderRadius:'8px', padding:'10px' }}>
                      Erreur. Écris-moi directement à imakhlflyndatiane@gmail.com
                    </p>
                  )}
                  <button type="submit" className="send-btn" disabled={status==='sending'}>
                    {status==='sending' ? 'Envoi...' : 'Envoyer mon message ✦'}
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
