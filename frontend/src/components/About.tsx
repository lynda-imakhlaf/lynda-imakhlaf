import { useInView } from 'react-intersection-observer'
import { useTheme } from '../ThemeContext'

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  const { theme: t } = useTheme()

  const cards = [
    { icon:'⚡', title:'Full Stack Web',  desc:'React + Django de bout en bout. APIs, bases de données, déploiement.',   ...t.pairs.purple },
    { icon:'🎮', title:'Game Dev',        desc:'Unity + C#. Mécaniques de jeu, physique, mondes immersifs en 3D.',        ...t.pairs.orange  },
    { icon:'', title:'3D & Animation', desc:'Blender : modélisation, rigging, animation. Assets prêts pour le web.',    ...t.pairs.blue    },
    { icon:'✨', title:'Freelance',        desc:'Livraison rapide, code propre, communication claire. Toujours.',           ...t.pairs.green   },
  ]

  const stats = [
    { n:'5+',  l:"ans d'exp.", ...t.pairs.purple },
    { n:'20+', l:'projets',    ...t.pairs.pink   },
    { n:'3',   l:'domaines',   ...t.pairs.blue   },
    { n:'∞',   l:'créativité', ...t.pairs.green  },
  ]

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
      `}</style>

      <div className="container">

        <div className={`ab ${inView?'v':''}`} style={{ animationDelay:'0s', marginBottom:'60px' }}>
          <p className="section-label"> À propos</p>
          <h2 className="section-title">
            Qui je{' '}
            <span style={{ background:'var(--grad-text-main)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontStyle:'italic' }}>
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

              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px', paddingTop:'8px' }}>
                <img src="/papi4.png" alt="" style={{ width:'36px', height:'36px', objectFit:'contain',
                  filter: t.isDark ? 'drop-shadow(0 0 8px rgba(168,85,247,0.6))' : 'drop-shadow(0 2px 6px rgba(124,58,237,0.2))' }} />
                <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:'13px', fontWeight:800, color: t.soft, letterSpacing:'1px', textTransform:'uppercase' }}>
                  lynda.portfolio
                </span>
              </div>

              <p style={{ color: t.soft, lineHeight:1.9, fontSize:'0.95rem', fontWeight:500, marginBottom:'24px' }}>
                Développeuse passionnée avec <strong style={{color: t.text}}>5+ ans d'expérience</strong> en développement web full-stack, modélisation 3D avec Blender, et création de jeux sous Unity.
                <br /><br />
                J'aime transformer des idées complexes en expériences digitales élégantes — qu'il s'agisse d'une API Django robuste, d'un shader Three.js ou d'un personnage animé.
              </p>

              <div style={{ display:'flex', flexWrap:'wrap', gap:'10px' }}>
                {stats.map(s => (
                  <div key={s.n} style={{
                    padding:'8px 16px', borderRadius:'999px',
                    background: s.bg, border:`1px solid ${s.color}35`,
                    display:'flex', alignItems:'center', gap:'6px',
                    boxShadow: t.isDark ? `0 0 12px ${s.color}22` : 'none',
                  }}>
                    <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.1rem', fontWeight:900, color: s.color }}>{s.n}</span>
                    <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:'11px', fontWeight:700, color: s.color, opacity:0.85 }}>{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skill cards */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
            {cards.map((c, i) => (
              <div key={i} className={`about-card ab ${inView?'v':''}`}
                style={{
                  animationDelay:`${0.25 + i * 0.1}s`,
                  background: t.card,
                  border:`1px solid ${c.border}`,
                  boxShadow: t.isDark ? `0 4px 20px rgba(0,0,0,0.35), 0 0 16px ${c.color}18` : `0 4px 20px ${c.color}12`,
                  transform: i % 2 === 0 ? 'rotate(0.5deg)' : 'rotate(-0.5deg)',
                }}>
                <div style={{
                  width:'44px', height:'44px', borderRadius:'14px',
                  background: c.bg, border:`1px solid ${c.border}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'1.3rem', marginBottom:'14px',
                  boxShadow: t.isDark ? `0 0 14px ${c.color}30` : 'none',
                }}>
                  {c.icon}
                </div>
                <h3 style={{ fontFamily:"'Nunito',sans-serif", fontSize:'14px', fontWeight:800, color: t.text, marginBottom:'8px' }}>{c.title}</h3>
                <p style={{ fontSize:'12px', color: t.soft, lineHeight:1.6, fontWeight:500 }}>{c.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
