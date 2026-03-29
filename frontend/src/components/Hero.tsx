import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-scroll'

const PAPIS = [
  { src:'/papi.png',  size:190, top:'6%',  right:'30%', anim:'papi-a', dur:'5s',   delay:'0s',   halo:'rgba(3,105,161,0.15)',   rotate:'-6deg' },
  { src:'/papi1.png', size:150, top:'16%', right:'10%', anim:'papi-b', dur:'4.2s', delay:'0.7s', halo:'rgba(21,128,61,0.15)',   rotate:'5deg'  },
  { src:'/papi2.png', size:170, top:'50%', right:'26%', anim:'papi-c', dur:'6s',   delay:'1.3s', halo:'rgba(194,65,12,0.15)',   rotate:'-3deg' },
  { src:'/papi3.png', size:130, top:'60%', right:'8%',  anim:'papi-a', dur:'4.8s', delay:'0.4s', halo:'rgba(219,39,119,0.15)',  rotate:'8deg'  },
  { src:'/papi4.png', size:155, top:'33%', right:'17%', anim:'papi-b', dur:'5.5s', delay:'1.0s', halo:'rgba(124,58,237,0.15)',  rotate:'-10deg'},
]

export default function Hero() {
  return (
    <section id="hero" style={{
      position:'relative', height:'100vh', display:'flex',
      alignItems:'center', overflow:'hidden', padding:0,
      background:'transparent',
    }}>

      <style>{`
        @keyframes papi-a {
          0%,100% { transform:translateY(0) rotate(var(--rot)); }
          40%     { transform:translateY(-22px) rotate(calc(var(--rot) + 4deg)); }
          70%     { transform:translateY(-10px) rotate(calc(var(--rot) - 2deg)); }
        }
        @keyframes papi-b {
          0%,100% { transform:translateY(0) rotate(var(--rot)); }
          35%     { transform:translateY(-18px) rotate(calc(var(--rot) - 5deg)); }
          65%     { transform:translateY(-8px) rotate(calc(var(--rot) + 3deg)); }
        }
        @keyframes papi-c {
          0%,100% { transform:translateY(0) rotate(var(--rot)) scale(1); }
          50%     { transform:translateY(-26px) rotate(calc(var(--rot) + 2deg)) scale(1.04); }
        }
        @keyframes hero-up {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes badge-float {
          0%,100%{ transform:translateY(0); }
          50%{ transform:translateY(-6px); }
        }
        @keyframes scroll-bounce {
          0%,100%{ transform:translateY(0); opacity:0.5; }
          50%{ transform:translateY(8px); opacity:1; }
        }
        .hero-el { opacity:0; animation:hero-up 0.75s ease forwards; }
        .hero-el:nth-child(1){ animation-delay:0.1s; }
        .hero-el:nth-child(2){ animation-delay:0.25s; }
        .hero-el:nth-child(3){ animation-delay:0.4s; }
        .hero-el:nth-child(4){ animation-delay:0.55s; }
        .hero-el:nth-child(5){ animation-delay:0.7s; }
        .hero-el:nth-child(6){ animation-delay:0.85s; }
        .hero-el:nth-child(7){ animation-delay:1s; }
        .h-btn-main {
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 32px; border-radius:999px;
          background:linear-gradient(135deg,#7C3AED,#DB2777);
          color:white; font-family:'Nunito',sans-serif;
          font-size:15px; font-weight:800; border:none; cursor:pointer;
          box-shadow:0 6px 24px rgba(124,58,237,0.38);
          transition:all 0.3s; text-decoration:none;
        }
        .h-btn-main:hover { transform:translateY(-4px) scale(1.02); box-shadow:0 12px 36px rgba(124,58,237,0.48); color:white; }
        .h-btn-ghost {
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 30px; border-radius:999px;
          background:rgba(255,255,255,0.65); color:#5B21B6;
          font-family:'Nunito',sans-serif; font-size:15px; font-weight:800;
          border:2px solid rgba(168,85,247,0.3);
          backdrop-filter:blur(12px);
          cursor:pointer; transition:all 0.3s;
          box-shadow:0 4px 16px rgba(124,58,237,0.1); text-decoration:none;
        }
        .h-btn-ghost:hover { border-color:#7C3AED; color:#7C3AED; transform:translateY(-4px); box-shadow:0 8px 28px rgba(124,58,237,0.2); }
        .soc {
          width:44px; height:44px; border-radius:14px;
          display:flex; align-items:center; justify-content:center;
          background:rgba(255,255,255,0.65); color:#7C3AED;
          border:1.5px solid rgba(168,85,247,0.25);
          backdrop-filter:blur(12px);
          box-shadow:0 2px 10px rgba(124,58,237,0.1);
          transition:all 0.25s; text-decoration:none;
        }
        .soc:hover { background:#7C3AED; color:white; border-color:#7C3AED; transform:translateY(-4px) rotate(-5deg); box-shadow:0 8px 20px rgba(124,58,237,0.35); }
        .papi-wrap { position:absolute; pointer-events:none; }
        .papi-wrap img { width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 12px 28px rgba(124,58,237,0.2)); }
      `}</style>

      {/* Soft blobs */}
      <div style={{ position:'absolute', top:'-60px', left:'-60px', width:'400px', height:'400px',
        borderRadius:'50%', pointerEvents:'none', zIndex:0,
        background:'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 65%)' }} />
      <div style={{ position:'absolute', bottom:'-40px', right:'-40px', width:'350px', height:'350px',
        borderRadius:'50%', pointerEvents:'none', zIndex:0,
        background:'radial-gradient(circle, rgba(219,39,119,0.08) 0%, transparent 65%)' }} />

      {/* Butterfly images */}
      {PAPIS.map((p, i) => (
        <div key={i} className="papi-wrap" style={{
          top:p.top, right:p.right, width:p.size, height:p.size, zIndex:1,
          ['--rot' as string]: p.rotate,
          animation:`${p.anim} ${p.dur} ease-in-out infinite`,
          animationDelay:p.delay,
        }}>
          <div style={{
            position:'absolute', inset:'-25%', borderRadius:'50%',
            background:`radial-gradient(circle, ${p.halo} 0%, transparent 70%)`,
          }} />
          <img src={p.src} alt="" />
        </div>
      ))}

      {/* Bottom fade */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:'180px',
        background:'linear-gradient(to bottom, transparent, rgba(237,233,254,0.5))',
        zIndex:2, pointerEvents:'none',
      }} />

      {/* Content */}
      <div style={{ position:'relative', zIndex:3, width:'100%', padding:'0 28px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>

          {/* Available badge */}
          <div className="hero-el" style={{
            display:'inline-flex', alignItems:'center', gap:'10px',
            background:'rgba(255,255,255,0.72)', backdropFilter:'blur(12px)',
            border:'1.5px solid rgba(124,58,237,0.2)',
            borderRadius:'999px', padding:'8px 18px', marginBottom:'28px',
            fontFamily:"'Nunito',sans-serif", fontSize:'13px', fontWeight:700, color:'#5B21B6',
            boxShadow:'0 4px 16px rgba(124,58,237,0.12)',
            animation:'badge-float 3s ease-in-out infinite',
          }}>
            <span style={{ fontSize:'16px' }}>🦋</span>
            Disponible pour du freelance
          </div>

          {/* Name */}
          <h1 className="hero-el" style={{
            fontFamily:"'Playfair Display', serif",
            fontSize:'clamp(3.2rem, 8.5vw, 7rem)',
            fontWeight:900, lineHeight:0.95,
            letterSpacing:'-2px', color:'#2E1065', marginBottom:'6px',
          }}>
            Lynda
          </h1>
          <h1 className="hero-el" style={{
            fontFamily:"'Playfair Display', serif",
            fontSize:'clamp(3.2rem, 8.5vw, 7rem)',
            fontWeight:900, lineHeight:0.95, fontStyle:'italic',
            letterSpacing:'-2px', marginBottom:'28px',
            background:'linear-gradient(135deg,#7C3AED 0%,#DB2777 60%,#C2410C 100%)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          }}>
            Imakhlaf.
          </h1>

          {/* Type animation */}
          <div className="hero-el" style={{
            fontFamily:"'Nunito',sans-serif",
            fontSize:'clamp(1rem, 2vw, 1.25rem)', fontWeight:600,
            color:'#8B5CF6', marginBottom:'20px', minHeight:'32px',
          }}>
            <TypeAnimation
              sequence={[
                '✦ Full Stack Engineer', 2000,
                '✦ React + Django Dev', 2000,
                '✦ 3D Artist & Blender', 2000,
                '✦ Unity Game Dev', 2000,
                '✦ Créative & Technique', 2000,
              ]}
              wrapper="span" cursor repeat={Infinity} speed={58} deletionSpeed={72}
            />
          </div>

          {/* Description */}
          <p className="hero-el" style={{
            fontSize:'1.1rem', color:'#5B21B6', fontWeight:500,
            maxWidth:'480px', lineHeight:1.85, marginBottom:'38px',
          }}>
            5+ ans à construire des apps web, des mondes en 3D et des jeux.
            {' '}<strong style={{ color:'#2E1065', fontWeight:800 }}>Full-time</strong> en entreprise
            {' '}+{' '}<span style={{
              background:'linear-gradient(135deg,#7C3AED,#DB2777)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              fontWeight:800,
            }}>freelance</span>{' '}disponible.
          </p>

          {/* CTAs */}
          <div className="hero-el" style={{ display:'flex', gap:'14px', flexWrap:'wrap', marginBottom:'40px' }}>
            <Link to="projects" smooth duration={700} offset={-64}>
              <span className="h-btn-main">Voir mes projets →</span>
            </Link>
            <Link to="contact" smooth duration={700} offset={-64}>
              <span className="h-btn-ghost">Me contacter</span>
            </Link>
          </div>

          {/* Socials + stats */}
          <div className="hero-el" style={{ display:'flex', alignItems:'center', gap:'14px', flexWrap:'wrap' }}>
            {[
              { l:'GitHub',   h:'https://github.com/lynda-imakhlaf',      i:<GHIcon /> },
              { l:'LinkedIn', h:'https://linkedin.com/in/lynda-imakhlaf', i:<LIIcon /> },
              { l:'Email',    h:'mailto:imakhlflyndatiane@gmail.com',      i:<MailIcon /> },
            ].map(({ l, h, i }) => (
              <a key={l} href={h} target={l!=='Email'?'_blank':undefined}
                rel="noopener noreferrer" className="soc" title={l}>{i}</a>
            ))}
            <div style={{ width:'1px', height:'26px', background:'rgba(124,58,237,0.15)' }} />
            {[
              { n:'5+', l:'ans' },
              { n:'20+', l:'projets' },
              { n:'3', l:'domaines' },
            ].map(({ n, l }) => (
              <div key={l} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.2rem', fontWeight:800, color:'#2E1065' }}>{n}</div>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:'10px', color:'#8B5CF6', letterSpacing:'1px', fontWeight:700, textTransform:'uppercase' }}>{l}</div>
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
          border:'2px solid rgba(124,58,237,0.25)',
          display:'flex', justifyContent:'center', paddingTop:'6px',
          background:'rgba(255,255,255,0.6)', backdropFilter:'blur(8px)',
        }}>
          <div style={{
            width:'4px', height:'8px', borderRadius:'2px',
            background:'linear-gradient(180deg,#7C3AED,#DB2777)',
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
