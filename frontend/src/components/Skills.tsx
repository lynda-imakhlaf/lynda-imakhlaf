import { useInView } from 'react-intersection-observer'

const SKILL_CATEGORIES = [
  {
    label: 'Frontend',
    icon: '🖥',
    skills: [
      { name: 'React', level: 95, color: '#61DAFB' },
      { name: 'TypeScript', level: 88, color: '#3178C6' },
      { name: 'Three.js', level: 80, color: '#a855f7' },
      { name: 'Vite / Webpack', level: 85, color: '#646CFF' },
      { name: 'JavaScript', level: 95, color: '#F7DF1E' },
    ],
  },
  {
    label: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Django / DRF', level: 92, color: '#00d4aa' },
      { name: 'Python', level: 90, color: '#3776AB' },
      { name: 'PostgreSQL', level: 85, color: '#4169E1' },
      { name: 'REST APIs', level: 92, color: '#a855f7' },
      { name: 'Docker', level: 78, color: '#2496ED' },
    ],
  },
  {
    label: 'Creative',
    icon: '🎨',
    skills: [
      { name: 'Blender', level: 85, color: '#E87D0D' },
      { name: 'Unity', level: 82, color: '#ffffff' },
      { name: 'C#', level: 78, color: '#239120' },
      { name: 'C++', level: 70, color: '#00599C' },
      { name: 'Animation', level: 80, color: '#a855f7' },
    ],
  },
  {
    label: 'Tools',
    icon: '🛠',
    skills: [
      { name: 'Git / GitHub', level: 93, color: '#F05032' },
      { name: 'Figma', level: 82, color: '#F24E1E' },
      { name: 'Postman', level: 88, color: '#FF6C37' },
      { name: 'Linux', level: 80, color: '#FCC624' },
      { name: 'CI/CD', level: 72, color: '#a855f7' },
    ],
  },
]

const TECH_BADGES = [
  'React', 'TypeScript', 'Python', 'Django', 'PostgreSQL',
  'Three.js', 'Blender', 'Unity', 'Docker', 'Git',
  'JavaScript', 'C#', 'C++', 'Figma', 'REST APIs',
  'Vite', 'Linux', 'Tailwind', 'WebGL', 'Postman',
]

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="skills" ref={ref} style={{
      padding: '100px 0',
      background: 'linear-gradient(180deg, #0d0221 0%, #10032a 50%, #0d0221 100%)',
      position: 'relative',
    }}>
      <style>{`
        @keyframes skills-fade-up {
          from { opacity: 0; transform: translateY(35px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .skills-anim { opacity: 0; }
        .skills-anim.visible { animation: skills-fade-up 0.65s ease forwards; }

        @keyframes bar-fill {
          from { width: 0%; }
        }
        .skill-bar { animation: bar-fill 1.1s cubic-bezier(0.4,0,0.2,1) forwards; }

        .skills-cat-card {
          background: rgba(22, 4, 56, 0.6);
          border: 1px solid rgba(168, 85, 247, 0.12);
          border-radius: 18px;
          padding: 28px;
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }
        .skills-cat-card:hover {
          border-color: rgba(168, 85, 247, 0.3);
          box-shadow: 0 8px 32px rgba(110, 0, 255, 0.15);
          transform: translateY(-4px);
        }
        .badge-float {
          animation: badge-float 3s ease-in-out infinite;
        }
        @keyframes badge-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .skills-badge {
          background: rgba(168, 85, 247, 0.08);
          border: 1px solid rgba(168, 85, 247, 0.18);
          border-radius: 999px;
          padding: 7px 16px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          color: #c4b5fd;
          transition: all 0.25s;
          white-space: nowrap;
        }
        .skills-badge:hover {
          background: rgba(168, 85, 247, 0.18);
          border-color: #a855f7;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(168,85,247,0.25);
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <div className={`skills-anim ${inView ? 'visible' : ''}`} style={{ animationDelay: '0s', marginBottom: '64px' }}>
          <p className="section-label">02. Skills</p>
          <h2 className="section-title">
            My <span>Tech Stack</span>
          </h2>
          <div className="divider" />
          <p className="section-subtitle">
            From crafting pixel-perfect frontends to building robust APIs to modeling immersive 3D worlds.
          </p>
        </div>

        {/* Skill categories grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '60px',
        }}>
          {SKILL_CATEGORIES.map((cat, ci) => (
            <div
              key={ci}
              className={`skills-cat-card skills-anim ${inView ? 'visible' : ''}`}
              style={{ animationDelay: `${0.15 + ci * 0.12}s` }}
            >
              {/* Category header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                marginBottom: '22px',
                paddingBottom: '14px',
                borderBottom: '1px solid rgba(168,85,247,0.1)',
              }}>
                <span style={{ fontSize: '1.3rem' }}>{cat.icon}</span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#a855f7',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  {cat.label}
                </span>
              </div>

              {/* Skills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {cat.skills.map((skill, si) => (
                  <div key={si}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      marginBottom: '6px',
                    }}>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '12.5px',
                        color: '#c4b5fd',
                      }}>
                        {skill.name}
                      </span>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        color: '#7c6fa0',
                      }}>
                        {skill.level}%
                      </span>
                    </div>
                    {/* Bar track */}
                    <div style={{
                      height: '4px',
                      background: 'rgba(168, 85, 247, 0.1)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}>
                      <div
                        className={inView ? 'skill-bar' : ''}
                        style={{
                          height: '100%',
                          width: inView ? `${skill.level}%` : '0%',
                          background: `linear-gradient(90deg, #6e00ff, ${skill.color})`,
                          borderRadius: '2px',
                          boxShadow: `0 0 6px ${skill.color}55`,
                          animationDelay: inView ? `${0.4 + ci * 0.1 + si * 0.06}s` : '0s',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech badges floating row */}
        <div className={`skills-anim ${inView ? 'visible' : ''}`} style={{ animationDelay: '0.7s' }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: '#7c6fa0',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '20px',
          }}>
            Also work with
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
          }}>
            {TECH_BADGES.map((badge, i) => (
              <span
                key={i}
                className="skills-badge"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
