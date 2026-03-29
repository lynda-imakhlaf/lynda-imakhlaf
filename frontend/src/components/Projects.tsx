import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

type Category = 'all' | 'web' | '3d' | 'game'

const PROJECTS = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    desc: 'Full-featured online store with React storefront, Django REST backend, Stripe payments, and real-time inventory management.',
    tags: ['React', 'Django', 'PostgreSQL', 'Stripe', 'Docker'],
    category: 'web' as Category,
    gradient: 'linear-gradient(135deg, #6e00ff22, #a855f722)',
    accent: '#a855f7',
    status: 'Shipped',
    year: '2024',
  },
  {
    id: 2,
    title: 'ERP Management System',
    desc: 'Enterprise resource planning system: HR, inventory, accounting, and reporting modules. Built for a manufacturing company.',
    tags: ['React', 'Django', 'PostgreSQL', 'Charts', 'REST API'],
    category: 'web' as Category,
    gradient: 'linear-gradient(135deg, #0ea5e922, #6e00ff22)',
    accent: '#0ea5e9',
    status: 'Shipped',
    year: '2023',
  },
  {
    id: 3,
    title: '3D Game World',
    desc: 'Interactive Unity game with custom 3D models designed in Blender. Includes custom shaders, character animation, and physics.',
    tags: ['Unity', 'C#', 'Blender', '3D Modeling', 'Animation'],
    category: 'game' as Category,
    gradient: 'linear-gradient(135deg, #f59e0b22, #ef444422)',
    accent: '#f59e0b',
    status: 'Shipped',
    year: '2023',
  },
  {
    id: 4,
    title: '3D Product Visualizer',
    desc: 'Interactive Three.js product viewer with real-time material switching, ambient occlusion, and HDR lighting — embedded in a React app.',
    tags: ['Three.js', 'React', 'WebGL', 'GLTF', 'HDRI'],
    category: '3d' as Category,
    gradient: 'linear-gradient(135deg, #a855f722, #6e00ff22)',
    accent: '#a855f7',
    status: 'Shipped',
    year: '2024',
  },
  {
    id: 5,
    title: 'Real Estate Platform',
    desc: 'Full-stack property listing platform with advanced filtering, map integration, virtual tour support, and admin dashboard.',
    tags: ['React', 'Django', 'Leaflet', 'PostgreSQL', 'Cloudinary'],
    category: 'web' as Category,
    gradient: 'linear-gradient(135deg, #10b98122, #0ea5e922)',
    accent: '#10b981',
    status: 'Shipped',
    year: '2024',
  },
  {
    id: 6,
    title: 'Blender Character Pack',
    desc: 'Rigged and animated character models created in Blender, exported for Unity and Unreal Engine workflows.',
    tags: ['Blender', 'Rigging', 'Animation', 'FBX', 'Unity'],
    category: '3d' as Category,
    gradient: 'linear-gradient(135deg, #E87D0D22, #f59e0b22)',
    accent: '#E87D0D',
    status: 'Shipped',
    year: '2023',
  },
]

const FILTERS: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: '3D', value: '3d' },
  { label: 'Game', value: 'game' },
]

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [active, setActive] = useState<Category>('all')

  const filtered = active === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === active)

  return (
    <section id="projects" ref={ref} style={{ padding: '100px 0', position: 'relative' }}>
      <div className="grid-bg" />

      <style>{`
        @keyframes proj-fade {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .proj-anim { opacity: 0; }
        .proj-anim.visible { animation: proj-fade 0.65s ease forwards; }

        .proj-card {
          background: rgba(22, 4, 56, 0.65);
          border: 1px solid rgba(168, 85, 247, 0.12);
          border-radius: 18px;
          overflow: hidden;
          transition: all 0.35s ease;
          cursor: default;
          display: flex;
          flex-direction: column;
        }
        .proj-card:hover {
          border-color: rgba(168, 85, 247, 0.35);
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(110, 0, 255, 0.2);
        }
        .filter-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 600;
          padding: 8px 20px;
          border-radius: 999px;
          border: 1.5px solid rgba(168, 85, 247, 0.25);
          background: transparent;
          color: #7c6fa0;
          cursor: pointer;
          transition: all 0.25s;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .filter-btn:hover, .filter-btn.active {
          background: rgba(168, 85, 247, 0.15);
          border-color: #a855f7;
          color: #c4b5fd;
        }
        .filter-btn.active {
          background: linear-gradient(135deg, rgba(110,0,255,0.3), rgba(168,85,247,0.2));
          border-color: #a855f7;
          color: #ffffff;
          box-shadow: 0 0 14px rgba(168,85,247,0.25);
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <div className={`proj-anim ${inView ? 'visible' : ''}`} style={{ animationDelay: '0s', marginBottom: '48px' }}>
          <p className="section-label">03. Projects</p>
          <h2 className="section-title">
            Selected <span>Work</span>
          </h2>
          <div className="divider" />
          <p className="section-subtitle">
            Things I've built — web platforms, 3D experiences, and games.
          </p>
        </div>

        {/* Filter buttons */}
        <div className={`proj-anim ${inView ? 'visible' : ''}`} style={{
          animationDelay: '0.15s',
          display: 'flex',
          gap: '10px',
          marginBottom: '48px',
          flexWrap: 'wrap',
        }}>
          {FILTERS.map(f => (
            <button
              key={f.value}
              className={`filter-btn ${active === f.value ? 'active' : ''}`}
              onClick={() => setActive(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
        }}>
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`proj-card proj-anim ${inView ? 'visible' : ''}`}
              style={{ animationDelay: `${0.25 + i * 0.08}s` }}
            >
              {/* Project banner */}
              <div style={{
                height: '160px',
                background: project.gradient,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: `1px solid ${project.accent}22`,
              }}>
                {/* Noise/pattern overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(168,85,247,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(110,0,255,0.06) 0%, transparent 50%)',
                }} />
                {/* Big icon / number */}
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '3.5rem',
                  fontWeight: 800,
                  color: project.accent,
                  opacity: 0.15,
                  letterSpacing: '-3px',
                  userSelect: 'none',
                }}>
                  0{project.id}
                </span>
                {/* Status badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px', right: '12px',
                  background: 'rgba(74, 222, 128, 0.12)',
                  border: '1px solid rgba(74, 222, 128, 0.3)',
                  borderRadius: '999px',
                  padding: '3px 10px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  color: '#4ade80',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}>
                  <span style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: '#4ade80',
                    boxShadow: '0 0 6px #4ade80',
                  }} />
                  {project.status}
                </div>
                {/* Year */}
                <div style={{
                  position: 'absolute',
                  top: '12px', left: '12px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: '#7c6fa0',
                }}>
                  {project.year}
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Category dot */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  marginBottom: '10px',
                }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: project.accent,
                    boxShadow: `0 0 6px ${project.accent}`,
                  }} />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    color: project.accent,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}>
                    {project.category === 'web' ? 'Web App' : project.category === '3d' ? '3D / WebGL' : 'Game Dev'}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '10px',
                  lineHeight: 1.3,
                }}>
                  {project.title}
                </h3>

                <p style={{
                  fontSize: '0.85rem',
                  color: '#7c6fa0',
                  lineHeight: 1.65,
                  flex: 1,
                  marginBottom: '16px',
                }}>
                  {project.desc}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.tags.map(tag => (
                    <span key={tag} className="tag" style={{ fontSize: '11px', padding: '3px 10px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More work CTA */}
        <div className={`proj-anim ${inView ? 'visible' : ''}`} style={{
          animationDelay: '0.8s',
          textAlign: 'center',
          marginTop: '56px',
        }}>
          <a
            href="https://github.com/lynda-imakhlaf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <GitHubIcon />
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}
