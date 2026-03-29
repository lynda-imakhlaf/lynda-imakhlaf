import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useTheme } from '../ThemeContext'
import { fetchSkills, type ApiSkill } from '../api'

const FALLBACK_SKILLS: ApiSkill[] = [
  {id:1,  name:'React',       category:'frontend', level:95, color:'#38BDF8', order:1},
  {id:2,  name:'TypeScript',  category:'frontend', level:88, color:'#38BDF8', order:2},
  {id:3,  name:'Three.js',    category:'frontend', level:80, color:'#38BDF8', order:3},
  {id:4,  name:'JavaScript',  category:'frontend', level:95, color:'#38BDF8', order:4},
  {id:5,  name:'Vite',        category:'frontend', level:85, color:'#38BDF8', order:5},
  {id:6,  name:'Django / DRF',category:'backend',  level:92, color:'#4ADE80', order:1},
  {id:7,  name:'Python',      category:'backend',  level:90, color:'#4ADE80', order:2},
  {id:8,  name:'MySQL / PG',  category:'backend',  level:86, color:'#4ADE80', order:3},
  {id:9,  name:'REST APIs',   category:'backend',  level:93, color:'#4ADE80', order:4},
  {id:10, name:'Docker',      category:'backend',  level:78, color:'#4ADE80', order:5},
  {id:11, name:'Blender',     category:'creative', level:85, color:'#FB923C', order:1},
  {id:12, name:'Unity',       category:'creative', level:82, color:'#FB923C', order:2},
  {id:13, name:'C#',          category:'creative', level:78, color:'#FB923C', order:3},
  {id:14, name:'Animation',   category:'creative', level:80, color:'#FB923C', order:4},
  {id:15, name:'C++',         category:'creative', level:70, color:'#FB923C', order:5},
  {id:16, name:'Git / GitHub',category:'tools',    level:93, color:'#F472B6', order:1},
  {id:17, name:'Figma',       category:'tools',    level:82, color:'#F472B6', order:2},
  {id:18, name:'Postman',     category:'tools',    level:88, color:'#F472B6', order:3},
  {id:19, name:'Linux',       category:'tools',    level:80, color:'#F472B6', order:4},
  {id:20, name:'CI/CD',       category:'tools',    level:72, color:'#F472B6', order:5},
]

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  const { theme: t } = useTheme()
  const [apiSkills, setApiSkills] = useState<ApiSkill[]>(FALLBACK_SKILLS)

  useEffect(() => {
    fetchSkills()
      .then(data => { if (data.length) setApiSkills(data) })
      .catch(() => { /* keep fallback */ })
  }, [])

  const byCategory = (cat: ApiSkill['category']) =>
    apiSkills.filter(s => s.category === cat).map(s => ({ name: s.name, level: s.level }))

  const cats = [
    { label:'Frontend', icon:'/papi.png',  ...t.pairs.blue,   skills: byCategory('frontend') },
    { label:'Backend',  icon:'/papi1.png', ...t.pairs.green,  skills: byCategory('backend')  },
    { label:'Créatif',  icon:'/papi2.png', ...t.pairs.orange, skills: byCategory('creative') },
    { label:'Outils',   icon:'/papi3.png', ...t.pairs.pink,   skills: byCategory('tools')    },
  ]

  const bubbles = apiSkills.map(s => ({ name: s.name, color: s.color }))

  return (
    <section id="skills" ref={ref} style={{ padding:'100px 0', position:'relative', overflow:'hidden', background:'transparent' }}>

      <style>{`
        @keyframes sk-in { from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);} }
        .sk { opacity:0; }
        .sk.v { animation:sk-in 0.65s ease forwards; }
        @keyframes bar-grow { from{width:0%;} }
        .sk-card {
          backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
          border-radius:22px; padding:28px;
          transition:all 0.32s ease; position:relative; overflow:hidden;
        }
        .bubble-chip {
          display:inline-flex; align-items:center; gap:7px;
          padding:8px 16px; border-radius:999px;
          font-family:'Nunito',sans-serif; font-size:13px; font-weight:700;
          transition:all 0.25s; backdrop-filter:blur(8px); cursor:default;
        }
        .bubble-chip:hover { transform:translateY(-4px) scale(1.04); }
      `}</style>

      <div className="container">

        <div className={`sk ${inView?'v':''}`} style={{ animationDelay:'0s', marginBottom:'64px' }}>
          <p className="section-label"> Stack & Compétences</p>
          <h2 className="section-title">
            Mon{' '}
            <span style={{ background:'var(--grad-text-cool)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontStyle:'italic' }}>
              arsenal
            </span>
          </h2>
          <div className="title-bar" style={{ background:`linear-gradient(90deg,${t.pairs.blue.color},${t.pairs.green.color})`,
            boxShadow: t.isDark ? `0 0 12px ${t.pairs.blue.color}80` : 'none' }} />
          <p className="section-sub">Du frontend élégant au backend solide, en passant par la 3D et les jeux.</p>
        </div>

        {/* 4 category cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'16px', marginBottom:'52px' }}>
          {cats.map((cat, ci) => (
            <div key={ci} className={`sk-card sk ${inView?'v':''}`}
              style={{
                animationDelay:`${0.12 + ci * 0.1}s`,
                background: t.card,
                border:`1px solid ${cat.border}`,
                transform:`rotate(${ci % 2 === 0 ? '0.4deg' : '-0.4deg'})`,
                boxShadow: t.isDark
                  ? `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${cat.color}15`
                  : `0 4px 20px rgba(124,58,237,0.08)`,
              }}>

              <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px',
                background: cat.color, borderRadius:'22px 22px 0 0',
                opacity: t.isDark ? 0.85 : 0.7,
                boxShadow: t.isDark ? `0 0 10px ${cat.color}` : 'none',
              }} />

              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'22px', paddingTop:'8px' }}>
                <img src={cat.icon} alt="" style={{ width:'36px', height:'36px', objectFit:'contain',
                  filter: t.isDark ? `drop-shadow(0 0 8px ${cat.color}80)` : `drop-shadow(0 2px 6px ${cat.color}40)` }} />
                <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:'14px', fontWeight:800, color: cat.color,
                  textShadow: t.isDark ? `0 0 10px ${cat.color}60` : 'none' }}>{cat.label}</span>
              </div>

              {cat.skills.map((sk, si) => (
                <div key={si} style={{ marginBottom:'12px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'5px' }}>
                    <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:'12px', fontWeight:700, color: t.text }}>{sk.name}</span>
                    <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:'11px', color: cat.color, fontWeight:800 }}>{sk.level}%</span>
                  </div>
                  <div style={{ height:'5px', background: t.isDark ? 'rgba(255,255,255,0.07)' : cat.bg,
                    borderRadius:'3px', overflow:'hidden', border:`1px solid ${cat.border}` }}>
                    <div style={{
                      height:'100%', borderRadius:'3px',
                      width: inView ? `${sk.level}%` : '0%',
                      background:`linear-gradient(90deg,${cat.color}70,${cat.color})`,
                      boxShadow: t.isDark ? `0 0 8px ${cat.color}80` : 'none',
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
            background: t.card, backdropFilter:'blur(20px)',
            borderRadius:'22px', padding:'28px',
            border: t.cardBorder,
            boxShadow: t.cardShadow,
          }}>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:'12px', fontWeight:800,
              letterSpacing:'2px', color: t.mute, textTransform:'uppercase', marginBottom:'20px',
              textShadow: t.isDark ? `0 0 10px ${t.pairs.purple.color}40` : 'none',
            }}>
              & bien d'autres technologies
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'10px' }}>
              {bubbles.map((b, i) => (
                <span key={i} className="bubble-chip"
                  style={{
                    background: t.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)',
                    border: t.isDark ? '1px solid rgba(168,85,247,0.15)' : '1.5px solid rgba(255,255,255,0.9)',
                    color: t.isDark ? '#C4B5FD' : '#3B1F6E',
                    animation:`float ${3.5 + (i%4)*0.5}s ease-in-out infinite ${i*0.2}s`,
                  }}>
                  <span style={{ width:'8px', height:'8px', borderRadius:'50%', background: b.color, flexShrink:0,
                    boxShadow: t.isDark ? `0 0 6px ${b.color}` : 'none' }} />
                  {b.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
