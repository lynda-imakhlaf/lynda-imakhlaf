import { useInView } from 'react-intersection-observer'

const CATS = [
  {
    label:'Frontend', icon:'🖥', color:'#8B5CF6', bg:'#F5F3FF', border:'rgba(139,92,246,0.18)',
    skills:[
      {name:'React',      level:95},{name:'TypeScript',level:88},
      {name:'Three.js',   level:80},{name:'JavaScript',level:95},{name:'Vite',       level:85},
    ],
  },
  {
    label:'Backend', icon:'⚙️', color:'#00C896', bg:'#F0FDF9', border:'rgba(0,200,150,0.18)',
    skills:[
      {name:'Django / DRF',level:92},{name:'Python',    level:90},
      {name:'MySQL / PG',  level:86},{name:'REST APIs', level:93},{name:'Docker',     level:78},
    ],
  },
  {
    label:'Créatif', icon:'🎨', color:'#FF6B35', bg:'#FFF4F0', border:'rgba(255,107,53,0.18)',
    skills:[
      {name:'Blender',    level:85},{name:'Unity',     level:82},
      {name:'C#',         level:78},{name:'Animation', level:80},{name:'C++',         level:70},
    ],
  },
  {
    label:'Tools', icon:'🛠', color:'#0EA5E9', bg:'#F0F9FF', border:'rgba(14,165,233,0.18)',
    skills:[
      {name:'Git / GitHub',level:93},{name:'Figma',     level:82},
      {name:'Postman',     level:88},{name:'Linux',     level:80},{name:'CI/CD',       level:72},
    ],
  },
]

const BUBBLES = [
  {t:'React',     c:'#61DAFB'},{t:'Python',    c:'#3776AB'},{t:'Django',    c:'#00C896'},
  {t:'Blender',   c:'#E87D0D'},{t:'Unity',     c:'#1A1630'},{t:'Three.js',  c:'#8B5CF6'},
  {t:'Docker',    c:'#2496ED'},{t:'TypeScript',c:'#3178C6'},{t:'PostgreSQL',c:'#4169E1'},
  {t:'Figma',     c:'#F24E1E'},{t:'C#',        c:'#239120'},{t:'Git',       c:'#F05032'},
  {t:'MySQL',     c:'#00758F'},{t:'Nginx',     c:'#009639'},{t:'Linux',     c:'#FCC624'},
]

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="skills" ref={ref} style={{
      padding:'100px 0', position:'relative', overflow:'hidden',
      background:'#F6F4FF',
    }}>

      <style>{`
        @keyframes sk-in { from{opacity:0;transform:translateY(34px);}to{opacity:1;transform:translateY(0);} }
        .sk { opacity:0; }
        .sk.v { animation:sk-in 0.65s ease forwards; }
        @keyframes bar-grow { from{width:0%;} }

        .sk-card {
          background:white; border-radius:22px; padding:28px;
          box-shadow:0 4px 20px rgba(26,22,48,0.07);
          transition:all 0.32s ease; position:relative; overflow:hidden;
        }
        .sk-card:hover {
          transform:translateY(-6px);
          box-shadow:0 16px 44px rgba(26,22,48,0.12);
        }

        .bubble-chip {
          display:inline-flex; align-items:center; gap:7px;
          padding:8px 16px; border-radius:999px;
          background:white; border:1.5px solid rgba(26,22,48,0.1);
          font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:600;
          color:#1A1630; transition:all 0.25s;
          box-shadow:0 2px 8px rgba(26,22,48,0.06);
          cursor:default;
        }
        .bubble-chip:hover {
          transform:translateY(-4px) scale(1.04);
          box-shadow:0 8px 20px rgba(26,22,48,0.12);
          border-color:rgba(26,22,48,0.18);
        }
      `}</style>

      <div className="container">

        {/* Header */}
        <div className={`sk ${inView?'v':''}`} style={{ animationDelay:'0s', marginBottom:'64px' }}>
          <p className="section-label" style={{ color:'#00C896' }}>✦ Stack & Compétences</p>
          <h2 className="section-title">
            Mon{' '}
            <span style={{
              background:'linear-gradient(135deg,#00C896,#0EA5E9)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            }}>
              arsenal
            </span>
          </h2>
          <div style={{ width:'70px', height:'5px', borderRadius:'3px',
            background:'linear-gradient(90deg,#00C896,#0EA5E9)', marginBottom:'20px' }} />
          <p className="section-sub">
            Du frontend coloré au backend solide, en passant par la 3D et les jeux.
          </p>
        </div>

        {/* 4 category cards */}
        <div style={{
          display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',
          gap:'16px', marginBottom:'52px',
        }}>
          {CATS.map((cat, ci) => (
            <div key={ci} className={`sk-card sk ${inView?'v':''}`}
              style={{
                animationDelay:`${0.12 + ci * 0.1}s`,
                border:`1.5px solid ${cat.border}`,
                // Asymmetric tilt per card
                transform: `rotate(${ci % 2 === 0 ? '0.4deg' : '-0.4deg'})`,
              }}>

              {/* Colored top accent bar */}
              <div style={{
                position:'absolute', top:0, left:0, right:0, height:'4px',
                background:cat.color, borderRadius:'22px 22px 0 0',
                opacity:0.7,
              }} />

              {/* Header */}
              <div style={{
                display:'flex', alignItems:'center', gap:'10px',
                marginBottom:'22px', paddingTop:'8px',
              }}>
                <div style={{
                  width:'38px', height:'38px', borderRadius:'12px',
                  background:cat.bg, border:`1.5px solid ${cat.border}`,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem',
                }}>
                  {cat.icon}
                </div>
                <span style={{
                  fontFamily:"'JetBrains Mono',monospace", fontSize:'13px',
                  fontWeight:800, color:cat.color,
                }}>
                  {cat.label}
                </span>
              </div>

              {/* Skills */}
              {cat.skills.map((sk, si) => (
                <div key={si} style={{ marginBottom:'12px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'5px' }}>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace",
                      fontSize:'12px', fontWeight:600, color:'#1A1630' }}>
                      {sk.name}
                    </span>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace",
                      fontSize:'11px', color:cat.color, fontWeight:700 }}>
                      {sk.level}%
                    </span>
                  </div>
                  <div style={{ height:'5px', background:cat.bg, borderRadius:'3px',
                    overflow:'hidden', border:`1px solid ${cat.border}` }}>
                    <div style={{
                      height:'100%', borderRadius:'3px',
                      width: inView ? `${sk.level}%` : '0%',
                      background:`linear-gradient(90deg,${cat.color}80,${cat.color})`,
                      animation: inView
                        ? `bar-grow 1.1s cubic-bezier(0.4,0,0.2,1) ${0.5 + ci*0.08 + si*0.06}s both`
                        : 'none',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Tech bubbles */}
        <div className={`sk ${inView?'v':''}`} style={{ animationDelay:'0.6s' }}>
          <div style={{
            background:'white', borderRadius:'22px', padding:'28px',
            border:'1.5px solid rgba(26,22,48,0.08)',
            boxShadow:'0 4px 20px rgba(26,22,48,0.06)',
          }}>
            <p style={{
              fontFamily:"'JetBrains Mono',monospace", fontSize:'11px',
              fontWeight:700, letterSpacing:'2px', color:'#9B99B0',
              textTransform:'uppercase', marginBottom:'20px',
            }}>
              & bien d'autres technologies
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'10px' }}>
              {BUBBLES.map((b, i) => (
                <span key={i} className="bubble-chip"
                  style={{ animationDelay:`${i * 0.25}s`,
                    animation:`float ${3.5 + (i%4)*0.5}s ease-in-out infinite ${i*0.25}s` }}>
                  <span style={{
                    width:'8px', height:'8px', borderRadius:'50%',
                    background:b.c, flexShrink:0,
                    boxShadow:`0 0 5px ${b.c}`,
                  }} />
                  {b.t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
