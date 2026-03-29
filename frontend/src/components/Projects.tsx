import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

type Cat = 'all' | 'web' | '3d' | 'game'

const PROJECTS = [
  { id:1, emoji:'🛒', title:'E-Commerce Platform',
    desc:'Boutique complète avec React, Django, Stripe et gestion d\'inventaire en temps réel.',
    tags:['React','Django','PostgreSQL','Stripe','Docker'],
    cat:'web' as Cat, color:'#7C3AED', bg:'rgba(124,58,237,0.08)', border:'rgba(124,58,237,0.2)', year:'2024', impact:'10k+ produits',
    gradient:'linear-gradient(135deg, rgba(124,58,237,0.7), rgba(219,39,119,0.7))',
  },
  { id:2, emoji:'📊', title:'Système ERP',
    desc:'RH, inventaire, comptabilité, reporting. Architecture modulaire pour une entreprise de fabrication.',
    tags:['React','Django','PostgreSQL','Charts.js'],
    cat:'web' as Cat, color:'#0369A1', bg:'rgba(3,105,161,0.08)', border:'rgba(3,105,161,0.2)', year:'2023', impact:'50+ utilisateurs',
    gradient:'linear-gradient(135deg, rgba(3,105,161,0.7), rgba(21,128,61,0.7))',
  },
  { id:3, emoji:'🎮', title:'Jeu Unity 3D',
    desc:'Monde immersif Unity avec personnages Blender, shaders custom et physique avancée.',
    tags:['Unity','C#','Blender','Animation'],
    cat:'game' as Cat, color:'#C2410C', bg:'rgba(194,65,12,0.08)', border:'rgba(194,65,12,0.2)', year:'2023', impact:'Indie · Shipped',
    gradient:'linear-gradient(135deg, rgba(194,65,12,0.7), rgba(217,119,6,0.7))',
  },
  { id:4, emoji:'🦋', title:'3D Product Viewer',
    desc:'Visualiseur Three.js interactif : matériaux, éclairage HDR, rotations — dans le navigateur.',
    tags:['Three.js','React','WebGL','GLTF'],
    cat:'3d' as Cat, color:'#DB2777', bg:'rgba(219,39,119,0.08)', border:'rgba(219,39,119,0.2)', year:'2024', impact:'Web · Interactive',
    gradient:'linear-gradient(135deg, rgba(219,39,119,0.7), rgba(124,58,237,0.7))',
  },
  { id:5, emoji:'🏠', title:'App Immobilière',
    desc:'Filtres avancés, carte Leaflet, visites virtuelles, dashboard admin complet.',
    tags:['React','Django','Leaflet','PostgreSQL'],
    cat:'web' as Cat, color:'#15803D', bg:'rgba(21,128,61,0.08)', border:'rgba(21,128,61,0.2)', year:'2024', impact:'Production · Live',
    gradient:'linear-gradient(135deg, rgba(21,128,61,0.7), rgba(3,105,161,0.7))',
  },
  { id:6, emoji:'🎨', title:'Pack Personnages 3D',
    desc:'Personnages riggés et animés dans Blender, exportés pour Unity et Unreal Engine.',
    tags:['Blender','Rigging','Animation','FBX'],
    cat:'3d' as Cat, color:'#D97706', bg:'rgba(217,119,6,0.08)', border:'rgba(217,119,6,0.2)', year:'2023', impact:'3D Assets',
    gradient:'linear-gradient(135deg, rgba(217,119,6,0.7), rgba(194,65,12,0.7))',
  },
]

const FILTERS: {label:string;value:Cat;color:string;bg:string}[] = [
  {label:'Tout',       value:'all',  color:'#2E1065', bg:'rgba(255,255,255,0.7)'},
  {label:'Web Apps',   value:'web',  color:'#7C3AED', bg:'rgba(124,58,237,0.1)' },
  {label:'3D / WebGL', value:'3d',   color:'#C2410C', bg:'rgba(194,65,12,0.1)'  },
  {label:'Game Dev',   value:'game', color:'#15803D', bg:'rgba(21,128,61,0.1)'  },
]

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  const [active, setActive] = useState<Cat>('all')
  const list = active === 'all' ? PROJECTS : PROJECTS.filter(p => p.cat === active)

  return (
    <section id="projects" ref={ref} style={{ padding:'100px 0', position:'relative', background:'transparent' }}>

      <style>{`
        @keyframes pj-in { from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);} }
        .pj { opacity:0; }
        .pj.v { animation:pj-in 0.65s ease forwards; }
        .proj-card {
          background:rgba(255,255,255,0.62);
          backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px);
          border-radius:22px; overflow:hidden;
          box-shadow:0 4px 20px rgba(124,58,237,0.08);
          transition:all 0.35s cubic-bezier(0.4,0,0.2,1);
          display:flex; flex-direction:column;
          border:1.5px solid rgba(255,255,255,0.85);
        }
        .proj-card:hover { transform:translateY(-8px); box-shadow:0 20px 52px rgba(124,58,237,0.16); border-color:rgba(168,85,247,0.3); }
        .f-btn {
          font-family:'Nunito',sans-serif; font-size:12px; font-weight:800;
          padding:8px 18px; border-radius:999px; cursor:pointer;
          border:1.5px solid rgba(255,255,255,0.8);
          transition:all 0.22s; backdrop-filter:blur(8px);
        }
      `}</style>

      <div className="container">

        {/* Header */}
        <div className={`pj ${inView?'v':''}`} style={{ animationDelay:'0s', marginBottom:'56px' }}>
          <p className="section-label">🦋 Projets</p>
          <h2 className="section-title">
            Ce que j'ai{' '}
            <span style={{ background:'linear-gradient(135deg,#C2410C,#D97706)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontStyle:'italic' }}>
              construit
            </span>
          </h2>
          <div className="title-bar" style={{ background:'linear-gradient(90deg,#C2410C,#D97706)' }} />
          <p className="section-sub">Web · 3D · Jeux. Des projets livrés, pas juste démarrés.</p>
        </div>

        {/* Filters */}
        <div className={`pj ${inView?'v':''}`} style={{ animationDelay:'0.1s', display:'flex', gap:'8px', marginBottom:'44px', flexWrap:'wrap' }}>
          {FILTERS.map(f => (
            <button key={f.value} className="f-btn" onClick={() => setActive(f.value)}
              style={{
                background: active===f.value ? f.bg : 'rgba(255,255,255,0.55)',
                color: active===f.value ? f.color : '#5B21B6',
                borderColor: active===f.value ? `${f.color}50` : 'rgba(255,255,255,0.8)',
                boxShadow: active===f.value ? `0 4px 14px ${f.color}25` : 'none',
              }}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))', gap:'18px' }}>
          {list.map((p, i) => (
            <div key={p.id} className={`proj-card pj ${inView?'v':''}`}
              style={{ animationDelay:`${0.18 + i * 0.08}s` }}>

              {/* Banner */}
              <div style={{
                height:'110px', background:p.gradient,
                position:'relative', display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <div style={{ position:'absolute', inset:0, background:'rgba(255,255,255,0.08)' }} />
                <span style={{ fontSize:'2.8rem', position:'relative', zIndex:1, filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
                  animation:`float ${3.5 + i*0.4}s ease-in-out infinite ${i*0.3}s` }}>
                  {p.emoji}
                </span>
                <span style={{ position:'absolute', top:'12px', left:'14px', zIndex:1,
                  fontFamily:"'Nunito',sans-serif", fontSize:'11px', fontWeight:800,
                  color:'white', background:'rgba(0,0,0,0.2)', backdropFilter:'blur(8px)',
                  padding:'3px 10px', borderRadius:'999px' }}>{p.year}</span>
                <span style={{ position:'absolute', top:'12px', right:'14px', zIndex:1,
                  fontFamily:"'Nunito',sans-serif", fontSize:'10px', fontWeight:800,
                  color:'white', background:'rgba(255,255,255,0.25)',
                  padding:'3px 10px', borderRadius:'999px', display:'flex', alignItems:'center', gap:'4px' }}>
                  <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'white' }} />
                  Livré
                </span>
              </div>

              {/* Body */}
              <div style={{ padding:'20px 22px', flex:1, display:'flex', flexDirection:'column' }}>
                <span style={{
                  display:'inline-block', marginBottom:'10px',
                  fontFamily:"'Nunito',sans-serif", fontSize:'10px', fontWeight:800,
                  color:p.color, background:p.bg, border:`1.5px solid ${p.border}`,
                  padding:'3px 10px', borderRadius:'999px', textTransform:'uppercase',
                  letterSpacing:'1px', alignSelf:'flex-start',
                }}>
                  {p.cat==='web'?'Web App':p.cat==='3d'?'3D / WebGL':'Game Dev'}
                </span>
                <h3 style={{ fontFamily:"'Nunito',sans-serif", fontSize:'1rem', fontWeight:800, color:'#2E1065', marginBottom:'8px', lineHeight:1.3 }}>{p.title}</h3>
                <p style={{ fontSize:'0.84rem', color:'#5B21B6', lineHeight:1.7, flex:1, marginBottom:'16px', fontWeight:500 }}>{p.desc}</p>
              </div>

              {/* Footer */}
              <div style={{ padding:'12px 22px 18px', borderTop:'1px solid rgba(124,58,237,0.08)',
                display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'8px' }}>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'5px' }}>
                  {p.tags.slice(0,3).map(t => (
                    <span key={t} className="tag" style={{ fontSize:'10px', padding:'3px 9px' }}>{t}</span>
                  ))}
                  {p.tags.length > 3 && <span className="tag" style={{ fontSize:'10px', padding:'3px 9px' }}>+{p.tags.length-3}</span>}
                </div>
                <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:'10px', fontWeight:800, color:p.color,
                  background:p.bg, border:`1px solid ${p.border}`, padding:'3px 10px', borderRadius:'999px', whiteSpace:'nowrap' }}>
                  {p.impact}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className={`pj ${inView?'v':''}`} style={{ animationDelay:'0.7s', textAlign:'center', marginTop:'52px' }}>
          <a href="https://github.com/lynda-imakhlaf" target="_blank" rel="noopener noreferrer"
            style={{
              display:'inline-flex', alignItems:'center', gap:'10px',
              padding:'13px 28px', borderRadius:'999px',
              background:'rgba(255,255,255,0.65)', color:'#2E1065',
              border:'1.5px solid rgba(255,255,255,0.85)',
              backdropFilter:'blur(12px)',
              fontFamily:"'Nunito',sans-serif", fontSize:'14px', fontWeight:800,
              boxShadow:'0 4px 16px rgba(124,58,237,0.1)', transition:'all 0.28s',
            }}
            onMouseEnter={e=>{ const el=e.currentTarget as HTMLAnchorElement; el.style.borderColor='#7C3AED'; el.style.color='#7C3AED'; el.style.transform='translateY(-3px)'; el.style.boxShadow='0 8px 24px rgba(124,58,237,0.2)'; }}
            onMouseLeave={e=>{ const el=e.currentTarget as HTMLAnchorElement; el.style.borderColor='rgba(255,255,255,0.85)'; el.style.color='#2E1065'; el.style.transform='translateY(0)'; el.style.boxShadow='0 4px 16px rgba(124,58,237,0.1)'; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            Voir plus sur GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
