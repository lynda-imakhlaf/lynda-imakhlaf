import { useInView } from 'react-intersection-observer'

const CARDS = [
  { icon:'⚡', title:'Full Stack Web', desc:'React + Django de bout en bout. APIs, bases de données, déploiement.', color:'#8B5CF6', bg:'#F5F3FF', border:'rgba(139,92,246,0.2)' },
  { icon:'🎮', title:'Game Dev',       desc:'Unity + C#. Mécaniques de jeu, physique, mondes immersifs en 3D.',   color:'#FF6B35', bg:'#FFF4F0', border:'rgba(255,107,53,0.2)' },
  { icon:'🎨', title:'3D & Animation', desc:'Blender : modélisation, rigging, animation. Assets prêts pour le web.',color:'#0EA5E9', bg:'#F0F9FF', border:'rgba(14,165,233,0.2)' },
  { icon:'🚀', title:'Freelance',       desc:'Livraison rapide, code propre, communication claire. Toujours.',       color:'#00C896', bg:'#F0FDF9', border:'rgba(0,200,150,0.2)' },
]

const STATS = [
  { n:'5+', l:'ans d\'exp.', color:'#FF2D78', bg:'#FFF0F5' },
  { n:'20+', l:'projets',   color:'#8B5CF6', bg:'#F5F3FF' },
  { n:'3',  l:'domaines',   color:'#0EA5E9', bg:'#F0F9FF' },
  { n:'∞',  l:'café ☕',   color:'#FF6B35', bg:'#FFF4F0' },
]

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="about" ref={ref} style={{
      padding:'100px 0', position:'relative', overflow:'hidden',
      background:'transparent',
    }}>
      {/* Polka dot pattern — subtle */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', opacity:0.4,
        backgroundImage:'radial-gradient(circle, rgba(139,92,246,0.12) 1px, transparent 1px)',
        backgroundSize:'28px 28px',
      }} />

      <style>{`
        @keyframes ab-in { from{opacity:0;transform:translateY(34px);}to{opacity:1;transform:translateY(0);} }
        .ab { opacity:0; }
        .ab.v { animation:ab-in 0.65s ease forwards; }

        .about-card {
          border-radius:20px; padding:24px;
          transition:all 0.32s cubic-bezier(0.4,0,0.2,1);
          position:relative; overflow:hidden;
        }
        .about-card:hover {
          transform:translateY(-6px) rotate(0.5deg);
          box-shadow:0 16px 40px rgba(26,22,48,0.12);
        }

        .stat-pill {
          border-radius:18px; padding:18px 16px;
          text-align:center; transition:all 0.3s;
          border:1.5px solid transparent;
        }
        .stat-pill:hover {
          transform:translateY(-5px) scale(1.04);
          box-shadow:0 12px 28px rgba(26,22,48,0.1);
        }

        .terminal-bar {
          display:flex; align-items:center; gap:7px;
          padding:10px 16px;
          border-bottom:1px solid rgba(26,22,48,0.07);
          margin-bottom:20px;
        }
        .terminal-dot { width:10px; height:10px; border-radius:50%; }
      `}</style>

      <div className="container">

        {/* Header */}
        <div className={`ab ${inView?'v':''}`} style={{ animationDelay:'0s', marginBottom:'64px' }}>
          <p className="section-label" style={{ color:'#8B5CF6' }}>✦ About me</p>
          <h2 className="section-title">
            Je construis des{' '}
            <span style={{
              background:'linear-gradient(135deg,#FF2D78,#8B5CF6)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            }}>
              expériences
            </span>
          </h2>
          <div style={{ width:'70px', height:'5px', borderRadius:'3px',
            background:'linear-gradient(90deg,#FF2D78,#8B5CF6)', marginBottom:'20px' }} />
          <p className="section-sub">
            5 ans d'expérience. Web, 3D, jeux. Full-time + freelance.
          </p>
        </div>

        <div style={{
          display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',
          gap:'56px', alignItems:'start',
        }}>

          {/* Left — bio card */}
          <div className={`ab ${inView?'v':''}`} style={{ animationDelay:'0.15s' }}>
            <div style={{
              background:'white',
              border:'1.5px solid rgba(26,22,48,0.09)',
              borderRadius:'24px', overflow:'hidden',
              boxShadow:'0 8px 32px rgba(26,22,48,0.08)',
            }}>
              {/* Colored header bar */}
              <div style={{
                height:'6px',
                background:'linear-gradient(90deg,#FF2D78,#FF6B35,#FFBD35,#00C896,#0EA5E9,#8B5CF6)',
              }} />
              <div className="terminal-bar">
                <div className="terminal-dot" style={{ background:'#FF5F57' }} />
                <div className="terminal-dot" style={{ background:'#FEBC2E' }} />
                <div className="terminal-dot" style={{ background:'#28C840' }} />
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'12px', color:'#9B99B0', marginLeft:'6px' }}>
                  ~/lynda/about.md
                </span>
              </div>
              <div style={{ padding:'0 24px 26px' }}>
                {[
                  <>Bonjour 👋 Je suis <strong>Lynda Imakhlaf</strong>, ingénieure full-stack basée en Algérie, avec 5+ ans d'expérience sur des projets réels.</>,
                  <>Je travaille full-time en entreprise et prends des missions <strong style={{color:'#8B5CF6'}}>freelance</strong> sur mon temps libre — e-commerce, ERP, apps complexes.</>,
                  <>Au-delà du web, je modélise en <strong style={{color:'#FF6B35'}}>Blender</strong>, développe des jeux avec <strong style={{color:'#0EA5E9'}}>Unity</strong>, et j'anime. Technique + créativité.</>,
                ].map((text, i) => (
                  <p key={i} style={{ color:'#5A5878', lineHeight:1.8, fontSize:'0.95rem',
                    marginBottom: i < 2 ? '14px' : '20px' }}>
                    {text}
                  </p>
                ))}
                <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
                  <a href="mailto:imakhlflyndatiane@gmail.com"
                    style={{
                      display:'inline-flex', alignItems:'center', gap:'8px',
                      padding:'10px 22px', borderRadius:'999px',
                      background:'linear-gradient(135deg,#FF2D78,#8B5CF6)',
                      color:'white', fontFamily:"'JetBrains Mono',monospace",
                      fontSize:'12px', fontWeight:700,
                      boxShadow:'0 4px 16px rgba(255,45,120,0.3)',
                    }}>
                    Contact
                  </a>
                  <a href="https://github.com/lynda-imakhlaf" target="_blank" rel="noopener noreferrer"
                    style={{
                      display:'inline-flex', alignItems:'center', gap:'8px',
                      padding:'10px 20px', borderRadius:'999px',
                      background:'white', color:'#1A1630',
                      border:'1.5px solid rgba(26,22,48,0.12)',
                      fontFamily:"'JetBrains Mono',monospace", fontSize:'12px', fontWeight:600,
                      boxShadow:'0 2px 8px rgba(26,22,48,0.07)',
                    }}>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — 4 colorful cards + stats */}
          <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>

            {/* Cards 2×2 — slightly rotated for asymmetry */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
              {CARDS.map((c, i) => (
                <div key={i} className={`about-card ab ${inView?'v':''}`}
                  style={{
                    animationDelay:`${0.2 + i * 0.1}s`,
                    background:c.bg,
                    border:`1.5px solid ${c.border}`,
                    transform: `rotate(${i % 2 === 0 ? '0.6deg' : '-0.6deg'})`,
                  }}>
                  <div style={{ fontSize:'1.5rem', marginBottom:'10px' }}>{c.icon}</div>
                  <h3 style={{ fontSize:'0.88rem', fontWeight:800, color:c.color, marginBottom:'7px' }}>
                    {c.title}
                  </h3>
                  <p style={{ fontSize:'0.78rem', color:'#5A5878', lineHeight:1.65 }}>{c.desc}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className={`ab ${inView?'v':''}`} style={{
              animationDelay:'0.55s',
              display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'10px',
            }}>
              {STATS.map(({ n, l, color, bg }, i) => (
                <div key={i} className="stat-pill" style={{ background:bg, borderColor:`${color}25` }}>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace",
                    fontSize:'1.6rem', fontWeight:900, color, marginBottom:'4px', lineHeight:1 }}>
                    {n}
                  </div>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace",
                    fontSize:'10px', color:'#9B99B0', lineHeight:1.4, textAlign:'center' }}>
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
