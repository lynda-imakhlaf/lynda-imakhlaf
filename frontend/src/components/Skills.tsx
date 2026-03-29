import { useInView } from 'react-intersection-observer'

const CATS = [
  {
    label:'Frontend', icon:'/papi.png', color:'#0369A1', bg:'rgba(3,105,161,0.08)', border:'rgba(3,105,161,0.2)',
    skills:[{name:'React',level:95},{name:'TypeScript',level:88},{name:'Three.js',level:80},{name:'JavaScript',level:95},{name:'Vite',level:85}],
  },
  {
    label:'Backend', icon:'/papi1.png', color:'#15803D', bg:'rgba(21,128,61,0.08)', border:'rgba(21,128,61,0.2)',
    skills:[{name:'Django / DRF',level:92},{name:'Python',level:90},{name:'MySQL / PG',level:86},{name:'REST APIs',level:93},{name:'Docker',level:78}],
  },
  {
    label:'Créatif', icon:'/papi2.png', color:'#C2410C', bg:'rgba(194,65,12,0.08)', border:'rgba(194,65,12,0.2)',
    skills:[{name:'Blender',level:85},{name:'Unity',level:82},{name:'C#',level:78},{name:'Animation',level:80},{name:'C++',level:70}],
  },
  {
    label:'Outils', icon:'/papi3.png', color:'#DB2777', bg:'rgba(219,39,119,0.08)', border:'rgba(219,39,119,0.2)',
    skills:[{name:'Git / GitHub',level:93},{name:'Figma',level:82},{name:'Postman',level:88},{name:'Linux',level:80},{name:'CI/CD',level:72}],
  },
]

const BUBBLES = [
  {t:'React',c:'#0369A1'},{t:'Python',c:'#15803D'},{t:'Django',c:'#15803D'},
  {t:'Blender',c:'#C2410C'},{t:'Unity',c:'#7C3AED'},{t:'Three.js',c:'#0369A1'},
  {t:'Docker',c:'#0369A1'},{t:'TypeScript',c:'#0369A1'},{t:'PostgreSQL',c:'#7C3AED'},
  {t:'Figma',c:'#DB2777'},{t:'C#',c:'#7C3AED'},{t:'Git',c:'#C2410C'},
  {t:'MySQL',c:'#15803D'},{t:'Nginx',c:'#15803D'},{t:'Linux',c:'#D97706'},
]

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="skills" ref={ref} style={{ padding:'100px 0', position:'relative', overflow:'hidden', background:'transparent' }}>

      <style>{`
        @keyframes sk-in { from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);} }
        .sk { opacity:0; }
        .sk.v { animation:sk-in 0.65s ease forwards; }
        @keyframes bar-grow { from{width:0%;} }
        .sk-card {
          background:rgba(255,255,255,0.62);
          backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px);
          border-radius:22px; padding:28px;
          box-shadow:0 4px 20px rgba(124,58,237,0.08);
          transition:all 0.32s ease; position:relative; overflow:hidden;
        }
        .sk-card:hover { transform:translateY(-6px); box-shadow:0 16px 44px rgba(124,58,237,0.14); }
        .bubble-chip {
          display:inline-flex; align-items:center; gap:7px;
          padding:8px 16px; border-radius:999px;
          background:rgba(255,255,255,0.7); border:1.5px solid rgba(255,255,255,0.9);
          font-family:'Nunito',sans-serif; font-size:13px; font-weight:700;
          color:#3B1F6E; transition:all 0.25s;
          box-shadow:0 2px 10px rgba(124,58,237,0.08);
          backdrop-filter:blur(8px);
          cursor:default;
        }
        .bubble-chip:hover { transform:translateY(-4px) scale(1.04); box-shadow:0 8px 20px rgba(124,58,237,0.15); }
      `}</style>

      <div className="container">

        {/* Header */}
        <div className={`sk ${inView?'v':''}`} style={{ animationDelay:'0s', marginBottom:'64px' }}>
          <p className="section-label">🦋 Stack & Compétences</p>
          <h2 className="section-title">
            Mon{' '}
            <span style={{ background:'linear-gradient(135deg,#0369A1,#15803D)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontStyle:'italic' }}>
              arsenal
            </span>
          </h2>
          <div className="title-bar" style={{ background:'linear-gradient(90deg,#0369A1,#15803D)' }} />
          <p className="section-sub">Du frontend élégant au backend solide, en passant par la 3D et les jeux.</p>
        </div>

        {/* 4 category cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'16px', marginBottom:'52px' }}>
          {CATS.map((cat, ci) => (
            <div key={ci} className={`sk-card sk ${inView?'v':''}`}
              style={{
                animationDelay:`${0.12 + ci * 0.1}s`,
                border:`1.5px solid ${cat.border}`,
                transform:`rotate(${ci % 2 === 0 ? '0.4deg' : '-0.4deg'})`,
              }}>

              {/* Top accent */}
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px', background:cat.color, borderRadius:'22px 22px 0 0', opacity:0.7 }} />

              {/* Header */}
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'22px', paddingTop:'8px' }}>
                <img src={cat.icon} alt="" style={{ width:'36px', height:'36px', objectFit:'contain' }} />
                <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:'14px', fontWeight:800, color:cat.color }}>{cat.label}</span>
              </div>

              {/* Skill bars */}
              {cat.skills.map((sk, si) => (
                <div key={si} style={{ marginBottom:'12px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'5px' }}>
                    <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:'12px', fontWeight:700, color:'#2E1065' }}>{sk.name}</span>
                    <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:'11px', color:cat.color, fontWeight:800 }}>{sk.level}%</span>
                  </div>
                  <div style={{ height:'5px', background:cat.bg, borderRadius:'3px', overflow:'hidden', border:`1px solid ${cat.border}` }}>
                    <div style={{
                      height:'100%', borderRadius:'3px',
                      width: inView ? `${sk.level}%` : '0%',
                      background:`linear-gradient(90deg,${cat.color}70,${cat.color})`,
                      animation: inView ? `bar-grow 1.1s cubic-bezier(0.4,0,0.2,1) ${0.5 + ci*0.08 + si*0.06}s both` : 'none',
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
            background:'rgba(255,255,255,0.55)', backdropFilter:'blur(18px)',
            borderRadius:'22px', padding:'28px',
            border:'1.5px solid rgba(255,255,255,0.85)',
            boxShadow:'0 4px 20px rgba(124,58,237,0.06)',
          }}>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'12px', fontWeight:800,
              letterSpacing:'2px', color:'#8B5CF6', textTransform:'uppercase', marginBottom:'20px' }}>
              & bien d'autres technologies
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'10px' }}>
              {BUBBLES.map((b, i) => (
                <span key={i} className="bubble-chip"
                  style={{ animation:`float ${3.5 + (i%4)*0.5}s ease-in-out infinite ${i*0.2}s` }}>
                  <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:b.c, flexShrink:0, boxShadow:`0 0 5px ${b.c}60` }} />
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
