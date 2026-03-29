import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-scroll'

const PAPIS = [
  {
    src: '/papi.png',
    size: 200, top: '8%', right: '32%',
    anim: 'papi-a', dur: '5s', delay: '0s',
    halo: 'rgba(255,45,120,0.18)', rotate: '-6deg',
  },
  {
    src: '/papi1.png',
    size: 155, top: '18%', right: '10%',
    anim: 'papi-b', dur: '4.2s', delay: '0.7s',
    halo: 'rgba(139,92,246,0.18)', rotate: '5deg',
  },
  {
    src: '/papi2.png',
    size: 175, top: '52%', right: '28%',
    anim: 'papi-c', dur: '6s', delay: '1.3s',
    halo: 'rgba(14,165,233,0.18)', rotate: '-3deg',
  },
  {
    src: '/papi3.png',
    size: 135, top: '62%', right: '8%',
    anim: 'papi-a', dur: '4.8s', delay: '0.4s',
    halo: 'rgba(0,200,150,0.18)', rotate: '8deg',
  },
  {
    src: '/papi4.png',
    size: 160, top: '36%', right: '18%',
    anim: 'papi-b', dur: '5.5s', delay: '1.0s',
    halo: 'rgba(255,107,53,0.18)', rotate: '-10deg',
  },
]

export default function Hero() {
  return (
    <section id="hero" style={{
      position: 'relative', height: '100vh', display: 'flex',
      alignItems: 'center', overflow: 'hidden', padding: 0,
      background: 'transparent',
    }}>

      <style>{`
        @keyframes papi-a {
          0%,100% { transform: translateY(0px) rotate(var(--rot)); }
          40%     { transform: translateY(-22px) rotate(calc(var(--rot) + 4deg)); }
          70%     { transform: translateY(-10px) rotate(calc(var(--rot) - 2deg)); }
        }
        @keyframes papi-b {
          0%,100% { transform: translateY(0px) rotate(var(--rot)); }
          35%     { transform: translateY(-18px) rotate(calc(var(--rot) - 5deg)); }
          65%     { transform: translateY(-8px)  rotate(calc(var(--rot) + 3deg)); }
        }
        @keyframes papi-c {
          0%,100% { transform: translateY(0px) rotate(var(--rot)) scale(1); }
          50%     { transform: translateY(-26px) rotate(calc(var(--rot) + 2deg)) scale(1.04); }
        }
        @keyframes hero-slide {
          from { opacity:0; transform:translateX(-36px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes badge-pop {
          0%,100%{ transform:translateY(0) scale(1); }
          50%{ transform:translateY(-5px) scale(1.03); }
        }
        @keyframes scroll-bounce {
          0%,100%{ transform:translateY(0); opacity:0.5; }
          50%{ transform:translateY(8px); opacity:1; }
        }
        .hl { animation:hero-slide 0.7s ease forwards; opacity:0; }
        .hl:nth-child(1){ animation-delay:0.05s; }
        .hl:nth-child(2){ animation-delay:0.2s; }
        .hl:nth-child(3){ animation-delay:0.35s; }
        .hl:nth-child(4){ animation-delay:0.5s; }
        .hl:nth-child(5){ animation-delay:0.65s; }
        .hl:nth-child(6){ animation-delay:0.8s; }
        .hl:nth-child(7){ animation-delay:0.95s; }
        .h-btn-main {
          display:inline-flex; align-items:center; gap:8px;
          padding:15px 34px; border-radius:999px;
          background:linear-gradient(135deg,#FF2D78,#8B5CF6);
          color:white; font-family:'JetBrains Mono',monospace;
          font-size:14px; font-weight:700; border:none; cursor:pointer;
          box-shadow:0 6px 24px rgba(255,45,120,0.4);
          transition:all 0.3s; text-decoration:none;
        }
        .h-btn-main:hover { transform:translateY(-4px) scale(1.03); box-shadow:0 12px 36px rgba(255,45,120,0.5); color:white; }
        .h-btn-ghost {
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 32px; border-radius:999px;
          background:white; color:#1A1630;
          font-family:'JetBrains Mono',monospace; font-size:14px; font-weight:700;
          border:2px solid rgba(26,22,48,0.12); cursor:pointer; transition:all 0.3s;
          box-shadow:0 2px 12px rgba(26,22,48,0.08); text-decoration:none;
        }
        .h-btn-ghost:hover { border-color:#8B5CF6; color:#8B5CF6; transform:translateY(-4px); box-shadow:0 8px 28px rgba(139,92,246,0.2); }
        .soc {
          width:42px; height:42px; border-radius:12px;
          display:flex; align-items:center; justify-content:center;
          background:white; color:#5A5878;
          border:1.5px solid rgba(26,22,48,0.1);
          box-shadow:0 2px 8px rgba(26,22,48,0.08);
          transition:all 0.25s; text-decoration:none;
        }
        .soc:hover { background:#8B5CF6; color:white; border-color:#8B5CF6; transform:translateY(-4px) rotate(-5deg); box-shadow:0 8px 20px rgba(139,92,246,0.35); }
        .papi-wrap {
          position:absolute;
          pointer-events:none;
          display:flex; align-items:center; justify-content:center;
        }
        .papi-wrap img {
          display:block;
          filter: drop-shadow(0 16px 32px rgba(26,22,48,0.18));
          width:100%; height:100%; object-fit:contain;
        }
      `}</style>

      {/* ── Decorative blobs ── */}
      <div style={{ position:'absolute', top:'-80px', right:'-60px', width:'500px', height:'500px',
        borderRadius:'50%', pointerEvents:'none', zIndex:0,
        background:'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 65%)' }} />
      <div style={{ position:'absolute', bottom:'-60px', left:'-40px', width:'400px', height:'400px',
        borderRadius:'50%', pointerEvents:'none', zIndex:0,
        background:'radial-gradient(circle, rgba(255,45,120,0.08) 0%, transparent 65%)' }} />

      {/* ── Papi images (unique, CSS-animated) ── */}
      {PAPIS.map((p, i) => (
        <div key={i} className="papi-wrap" style={{
          top: p.top, right: p.right,
          width: p.size, height: p.size,
          zIndex: 1,
          ['--rot' as string]: p.rotate,
          animation: `${p.anim} ${p.dur} ease-in-out infinite`,
          animationDelay: p.delay,
        }}>
          {/* colored halo behind the image */}
          <div style={{
            position:'absolute', inset:'-20%',
            borderRadius:'50%',
            background: `radial-gradient(circle, ${p.halo} 0%, transparent 70%)`,
          }} />
          <img src={p.src} alt="" />
        </div>
      ))}

      {/* ── Bottom fade ── */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:'200px',
        background:'linear-gradient(to bottom, transparent, rgba(246,244,255,0.6))',
        zIndex:2, pointerEvents:'none',
      }} />

      {/* ── Content ── */}
      <div style={{ position:'relative', zIndex:3, width:'100%', padding:'0 28px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>

          {/* Available badge */}
          <div className="hl" style={{
            display:'inline-flex', alignItems:'center', gap:'8px',
            background:'white', border:'1.5px solid rgba(0,200,150,0.3)',
            borderRadius:'999px', padding:'7px 16px', marginBottom:'28px',
            fontFamily:"'JetBrains Mono',monospace", fontSize:'12px', color:'#00A87A',
            boxShadow:'0 2px 12px rgba(0,200,150,0.15)',
            animation:'badge-pop 2.5s ease-in-out infinite',
          }}>
            <span style={{ width:'8px', height:'8px', borderRadius:'50%',
              background:'#00C896', boxShadow:'0 0 8px #00C896',
              display:'inline-block', animation:'pulse-ring 2s infinite',
            }} />
            Disponible pour du freelance
          </div>

          {/* Big name */}
          <h1 className="hl" style={{
            fontSize:'clamp(3.2rem, 8.5vw, 7rem)',
            fontWeight:900, lineHeight:0.95,
            letterSpacing:'-4px', color:'#1A1630', marginBottom:'8px',
          }}>
            Lynda
          </h1>
          <h1 className="hl" style={{
            fontSize:'clamp(3.2rem, 8.5vw, 7rem)',
            fontWeight:900, lineHeight:0.95,
            letterSpacing:'-4px', marginBottom:'28px',
            background:'linear-gradient(135deg,#FF2D78 0%,#FF6B35 35%,#8B5CF6 100%)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          }}>
            Imakhlaf.
          </h1>

          {/* Type animation */}
          <div className="hl" style={{
            fontFamily:"'JetBrains Mono',monospace",
            fontSize:'clamp(0.95rem, 2vw, 1.2rem)',
            color:'#9B99B0', marginBottom:'22px', minHeight:'30px',
          }}>
            <span style={{ color:'#FF2D78', marginRight:'8px', fontWeight:700 }}>//</span>
            <TypeAnimation
              sequence={[
                'Full Stack Engineer', 2000,
                'React + Django Dev', 2000,
                '3D Artist & Blender', 2000,
                'Unity Game Dev', 2000,
                'Créative & Technique', 2000,
              ]}
              wrapper="span" cursor repeat={Infinity} speed={58} deletionSpeed={72}
            />
          </div>

          {/* Description */}
          <p className="hl" style={{
            fontSize:'1.1rem', color:'#5A5878',
            maxWidth:'500px', lineHeight:1.8, marginBottom:'40px',
          }}>
            5+ ans à construire des apps web, des mondes en 3D et des jeux.
            {' '}<strong style={{ color:'#1A1630' }}>Full-time</strong> en entreprise
            {' '}+{' '}<span style={{
              background:'linear-gradient(135deg,#FF2D78,#8B5CF6)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              fontWeight:700,
            }}>freelance</span>{' '}disponible.
          </p>

          {/* CTA buttons */}
          <div className="hl" style={{ display:'flex', gap:'14px', flexWrap:'wrap', marginBottom:'40px' }}>
            <Link to="projects" smooth duration={700} offset={-62}>
              <span className="h-btn-main">Voir mes projets →</span>
            </Link>
            <Link to="contact" smooth duration={700} offset={-62}>
              <span className="h-btn-ghost">Me contacter</span>
            </Link>
          </div>

          {/* Social + mini stats */}
          <div className="hl" style={{ display:'flex', alignItems:'center', gap:'16px', flexWrap:'wrap' }}>
            {[
              { l:'GitHub',   h:'https://github.com/lynda-imakhlaf',      i:<GHIcon /> },
              { l:'LinkedIn', h:'https://linkedin.com/in/lynda-imakhlaf', i:<LIIcon /> },
              { l:'Email',    h:'mailto:imakhlflyndatiane@gmail.com',      i:<MailIcon /> },
            ].map(({ l, h, i }) => (
              <a key={l} href={h} target={l!=='Email'?'_blank':undefined}
                rel="noopener noreferrer" className="soc" title={l}>{i}</a>
            ))}
            <div style={{ width:'1px', height:'26px', background:'rgba(26,22,48,0.1)' }} />
            {[
              { n:'5+', l:'ans' },
              { n:'20+', l:'projets' },
              { n:'3', l:'domaines' },
            ].map(({ n, l }) => (
              <div key={l} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'1.1rem', fontWeight:800, color:'#1A1630' }}>{n}</div>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'10px', color:'#9B99B0', letterSpacing:'1px' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position:'absolute', bottom:'32px', left:'50%',
        transform:'translateX(-50%)', zIndex:3,
        display:'flex', flexDirection:'column', alignItems:'center',
      }}>
        <div style={{
          width:'24px', height:'38px', borderRadius:'12px',
          border:'2px solid rgba(26,22,48,0.15)',
          display:'flex', justifyContent:'center', paddingTop:'6px',
          background:'white', boxShadow:'0 2px 8px rgba(26,22,48,0.08)',
        }}>
          <div style={{
            width:'4px', height:'8px', borderRadius:'2px',
            background:'linear-gradient(180deg,#FF2D78,#8B5CF6)',
            animation:'scroll-bounce 1.8s ease-in-out infinite',
          }} />
        </div>
      </div>
    </section>
  )
}

function GHIcon()   { return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> }
function LIIcon()   { return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> }
function MailIcon() { return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> }
