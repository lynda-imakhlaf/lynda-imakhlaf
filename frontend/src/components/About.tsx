import { useInView } from 'react-intersection-observer'

const CARDS = [
  { icon:'⚡', title:'Full Stack Web',   desc:'React + Django de bout en bout. APIs, bases de données, déploiement.',     color:'#7C3AED', bg:'rgba(124,58,237,0.08)',  border:'rgba(124,58,237,0.2)'  },
  { icon:'🎮', title:'Game Dev',          desc:'Unity + C#. Mécaniques de jeu, physique, mondes immersifs en 3D.',           color:'#C2410C', bg:'rgba(194,65,12,0.08)',  border:'rgba(194,65,12,0.2)'   },
  { icon:'🦋', title:'3D & Animation',   desc:'Blender : modélisation, rigging, animation. Assets prêts pour le web.',       color:'#0369A1', bg:'rgba(3,105,161,0.08)',  border:'rgba(3,105,161,0.2)'   },
  { icon:'✨', title:'Freelance',          desc:'Livraison rapide, code propre, communication claire. Toujours.',               color:'#15803D', bg:'rgba(21,128,61,0.08)',  border:'rgba(21,128,61,0.2)'   },
]

const STATS = [
  { n:'5+', l:'ans d\'exp.', color:'#7C3AED', bg:'rgba(124,58,237,0.1)' },
  { n:'20+', l:'projets',    color:'#DB2777',  bg:'rgba(219,39,119,0.1)' },
  { n:'3',   l:'domaines',   color:'#0369A1',  bg:'rgba(3,105,161,0.1)'  },
  { n:'∞',   l:'créativité', color:'#15803D',  bg:'rgba(21,128,61,0.1)'  },
]

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="about" ref={ref} style={{ padding:'100px 0', position:'relative', overflow:'hidden', background:'transparent' }}>

      <style>{`
        @keyframes ab-in { from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);} }
        .ab { opacity:0; }
        .ab.v { animation:ab-in 0.65s ease forwards; }
        .about-card {
          border-radius:20px; padding:24px;
          transition:all 0.32s ease;
          backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
        }
        .about-card:hover { transform:translateY(-6px) rotate(0deg)!important; box-shadow:0 20px 50px rgba(124,58,237,0.15)!important; }
      `}</style>

      <div className="container">

        {/* Header */}
        <div className={`ab ${inView?'v':''}`} style={{ animationDelay:'0s', marginBottom:'60px' }}>
          <p className="section-label">🦋 À propos</p>
          <h2 className="section-title">
            Qui je{' '}
            <span style={{ background:'linear-gradient(135deg,#7C3AED,#DB2777)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontStyle:'italic' }}>
              suis
            </span>
          </h2>
          <div className="title-bar" />
          <p className="section-sub">
            Développeuse full-stack, artiste 3D et créatrice de jeux. Je construis des choses belles et qui fonctionnent.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'40px', alignItems:'start' }}>

          {/* Bio card */}
          <div className={`ab ${inView?'v':''}`} style={{ animationDelay:'0.15s' }}>
            <div style={{
              background:'rgba(255,255,255,0.65)', backdropFilter:'blur(18px)',
              border:'1.5px solid rgba(255,255,255,0.85)',
              borderRadius:'24px', padding:'32px',
              boxShadow:'0 8px 32px rgba(124,58,237,0.1)',
              position:'relative', overflow:'hidden',
            }}>
              {/* Gradient top bar */}
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px', background:'linear-gradient(90deg,#7C3AED,#DB2777,#C2410C,#15803D,#0369A1)' }} />

              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px', paddingTop:'8px' }}>
                <img src="/papi4.png" alt="" style={{ width:'36px', height:'36px', objectFit:'contain' }} />
                <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:'13px', fontWeight:800, color:'#5B21B6', letterSpacing:'1px', textTransform:'uppercase' }}>
                  lynda.portfolio
                </span>
              </div>

              <p style={{ color:'#5B21B6', lineHeight:1.9, fontSize:'0.95rem', fontWeight:500, marginBottom:'24px' }}>
                Développeuse passionnée avec <strong style={{color:'#2E1065'}}>5+ ans d'expérience</strong> en développement web full-stack, modélisation 3D avec Blender, et création de jeux sous Unity.
                <br /><br />
                J'aime transformer des idées complexes en expériences digitales élégantes — qu'il s'agisse d'une API Django robuste, d'un shader Three.js ou d'un personnage animé.
              </p>

              {/* Stats */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:'10px' }}>
                {STATS.map(s => (
                  <div key={s.n} style={{
                    padding:'8px 16px', borderRadius:'999px',
                    background:s.bg, border:`1px solid ${s.color}30`,
                    display:'flex', alignItems:'center', gap:'6px',
                  }}>
                    <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.1rem', fontWeight:900, color:s.color }}>{s.n}</span>
                    <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:'11px', fontWeight:700, color:s.color, opacity:0.8 }}>{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skill cards */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
            {CARDS.map((c, i) => (
              <div key={i} className={`about-card ab ${inView?'v':''}`}
                style={{
                  animationDelay:`${0.25 + i * 0.1}s`,
                  background:'rgba(255,255,255,0.6)',
                  border:`1.5px solid ${c.border}`,
                  boxShadow:`0 4px 20px ${c.color}12`,
                  transform: i % 2 === 0 ? 'rotate(0.5deg)' : 'rotate(-0.5deg)',
                }}>
                <div style={{
                  width:'44px', height:'44px', borderRadius:'14px',
                  background:c.bg, border:`1.5px solid ${c.border}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'1.3rem', marginBottom:'14px',
                }}>
                  {c.icon}
                </div>
                <h3 style={{ fontFamily:"'Nunito',sans-serif", fontSize:'14px', fontWeight:800, color:'#2E1065', marginBottom:'8px' }}>{c.title}</h3>
                <p style={{ fontSize:'12px', color:'#6B4FA0', lineHeight:1.6, fontWeight:500 }}>{c.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
