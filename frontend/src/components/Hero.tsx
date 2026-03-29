import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-scroll'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200)
    camera.position.set(0, 1.5, 11)

    // Vivid rainbow palette — lighter/more saturated for light bg
    const palette = [
      new THREE.Color('#FF2D78'),
      new THREE.Color('#FF6B35'),
      new THREE.Color('#FFBD35'),
      new THREE.Color('#00C896'),
      new THREE.Color('#0EA5E9'),
      new THREE.Color('#8B5CF6'),
    ]

    const N = 7000
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)

    for (let i = 0; i < N; i++) {
      const i3     = i * 3
      const branch = i % 6
      const r      = Math.pow(Math.random(), 1.5) * 8
      const angle  = (branch / 6) * Math.PI * 2 + r * 1.2
      const s      = 0.2 + (r / 8) * 0.5

      pos[i3]     = Math.cos(angle) * r + (Math.random()-0.5) * s * r * 0.55
      pos[i3 + 1] = (Math.random()-0.5) * s * r * 0.18
      pos[i3 + 2] = Math.sin(angle) * r + (Math.random()-0.5) * s * r * 0.55

      const c = palette[branch].clone()
      c.lerp(palette[(branch + 1) % 6], Math.random() * 0.3)
      // On a light bg, particles need to be bright/saturated
      c.multiplyScalar(0.85 + (1 - r/8) * 0.2)
      col[i3]=c.r; col[i3+1]=c.g; col[i3+2]=c.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3))
    const mat = new THREE.PointsMaterial({
      size: 0.065, sizeAttenuation: true, depthWrite: false,
      blending: THREE.NormalBlending, vertexColors: true,
      transparent: true, opacity: 0.75,
    })
    const galaxy = new THREE.Points(geo, mat)
    scene.add(galaxy)

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    let raf: number
    const clock = new THREE.Clock()
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()
      galaxy.rotation.y = t * 0.055
      galaxy.rotation.x = Math.sin(t * 0.1) * 0.05
      camera.position.x += (mouseRef.current.x * 1.2 - camera.position.x) * 0.02
      camera.position.y += (mouseRef.current.y * 0.7 + 1.5 - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }
    tick()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose(); geo.dispose(); mat.dispose()
    }
  }, [])

  return (
    <section id="hero" style={{
      position:'relative', height:'100vh', display:'flex',
      alignItems:'center', overflow:'hidden', padding:0,
      background:'linear-gradient(135deg, #F6F4FF 0%, #FFF5F8 40%, #F0F9FF 100%)',
    }}>

      {/* Canvas — behind everything */}
      <canvas ref={canvasRef} style={{
        position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0,
      }} />

      {/* Colorful blobs — decorative */}
      <div style={{ position:'absolute', top:'-80px', right:'-60px', width:'500px', height:'500px',
        borderRadius:'50%', pointerEvents:'none', zIndex:1,
        background:'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 65%)' }} />
      <div style={{ position:'absolute', bottom:'-60px', left:'-40px', width:'400px', height:'400px',
        borderRadius:'50%', pointerEvents:'none', zIndex:1,
        background:'radial-gradient(circle, rgba(255,45,120,0.1) 0%, transparent 65%)' }} />
      <div style={{ position:'absolute', top:'30%', right:'15%', width:'300px', height:'300px',
        borderRadius:'50%', pointerEvents:'none', zIndex:1,
        background:'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 65%)' }} />

      {/* Bottom fade to next section */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:'200px',
        background:'linear-gradient(to bottom, transparent, #F6F4FF)',
        zIndex:2, pointerEvents:'none',
      }} />

      {/* ===== CONTENT — ASYMMETRIC LEFT ===== */}
      <div style={{ position:'relative', zIndex:3, width:'100%', padding:'0 28px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>

          <style>{`
            @keyframes hero-slide {
              from { opacity:0; transform:translateX(-36px); }
              to   { opacity:1; transform:translateX(0); }
            }
            .hl { animation:hero-slide 0.7s ease forwards; opacity:0; }
            .hl:nth-child(1){ animation-delay:0.05s; }
            .hl:nth-child(2){ animation-delay:0.2s; }
            .hl:nth-child(3){ animation-delay:0.35s; }
            .hl:nth-child(4){ animation-delay:0.5s; }
            .hl:nth-child(5){ animation-delay:0.65s; }
            .hl:nth-child(6){ animation-delay:0.8s; }
            .hl:nth-child(7){ animation-delay:0.95s; }

            @keyframes badge-pop {
              0%,100%{ transform:translateY(0) scale(1); }
              50%{ transform:translateY(-5px) scale(1.03); }
            }

            .h-btn-main {
              display:inline-flex; align-items:center; gap:8px;
              padding:15px 34px; border-radius:999px;
              background:linear-gradient(135deg,#FF2D78,#8B5CF6);
              color:white; font-family:'JetBrains Mono',monospace;
              font-size:14px; font-weight:700; border:none; cursor:pointer;
              box-shadow:0 6px 24px rgba(255,45,120,0.4);
              transition:all 0.3s; text-decoration:none;
            }
            .h-btn-main:hover {
              transform:translateY(-4px) scale(1.03);
              box-shadow:0 12px 36px rgba(255,45,120,0.5); color:white;
            }
            .h-btn-ghost {
              display:inline-flex; align-items:center; gap:8px;
              padding:14px 32px; border-radius:999px;
              background:white; color:#1A1630;
              font-family:'JetBrains Mono',monospace;
              font-size:14px; font-weight:700;
              border:2px solid rgba(26,22,48,0.12);
              cursor:pointer; transition:all 0.3s;
              box-shadow:0 2px 12px rgba(26,22,48,0.08);
              text-decoration:none;
            }
            .h-btn-ghost:hover {
              border-color:#8B5CF6; color:#8B5CF6;
              transform:translateY(-4px);
              box-shadow:0 8px 28px rgba(139,92,246,0.2);
            }
            .soc {
              width:42px; height:42px; border-radius:12px;
              display:flex; align-items:center; justify-content:center;
              background:white; color:#5A5878;
              border:1.5px solid rgba(26,22,48,0.1);
              box-shadow:0 2px 8px rgba(26,22,48,0.08);
              transition:all 0.25s; text-decoration:none;
            }
            .soc:hover {
              background:#8B5CF6; color:white;
              border-color:#8B5CF6; transform:translateY(-4px) rotate(-5deg);
              box-shadow:0 8px 20px rgba(139,92,246,0.35);
            }
            @keyframes scroll-bounce {
              0%,100%{ transform:translateY(0); opacity:0.5; }
              50%{ transform:translateY(8px); opacity:1; }
            }

            /* Floating decorative shapes */
            @keyframes shape-float {
              0%,100%{ transform:translateY(0) rotate(0deg); }
              33%{ transform:translateY(-14px) rotate(5deg); }
              66%{ transform:translateY(-7px) rotate(-3deg); }
            }
          `}</style>

          {/* Floating colored shapes — decorative */}
          {[
            { color:'#FF2D78', size:18, top:'12%', right:'28%', delay:'0s' },
            { color:'#FFBD35', size:14, top:'22%', right:'20%', delay:'0.8s', shape:'square' },
            { color:'#00C896', size:20, top:'65%', right:'35%', delay:'1.5s' },
            { color:'#0EA5E9', size:12, top:'42%', right:'22%', delay:'0.4s', shape:'square' },
            { color:'#8B5CF6', size:16, top:'78%', right:'28%', delay:'1.1s' },
            { color:'#FF6B35', size:22, top:'30%', right:'42%', delay:'0.6s', shape:'square' },
          ].map((s, i) => (
            <div key={i} style={{
              position:'absolute', top:s.top, right:s.right,
              width:s.size, height:s.size,
              borderRadius: s.shape === 'square' ? '4px' : '50%',
              background:s.color, opacity:0.5,
              zIndex:2, pointerEvents:'none',
              animation:`shape-float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay:s.delay,
            }} />
          ))}

          {/* Available badge */}
          <div className="hl" style={{
            display:'inline-flex', alignItems:'center', gap:'8px',
            background:'white', border:'1.5px solid rgba(0,200,150,0.3)',
            borderRadius:'999px', padding:'7px 16px', marginBottom:'28px',
            fontFamily:"'JetBrains Mono',monospace", fontSize:'12px', color:'#00A87A',
            boxShadow:'0 2px 12px rgba(0,200,150,0.15)',
            animation:'badge-pop 2.5s ease-in-out infinite',
          }}>
            <span style={{ width:'8px', height:'8px', borderRadius:'50%',
              background:'#00C896', boxShadow:'0 0 8px #00C896',
              display:'inline-block', animation:'pulse-ring 2s infinite',
            }} />
            Disponible pour du freelance
          </div>

          {/* Big name */}
          <h1 className="hl" style={{
            fontSize:'clamp(3.2rem, 8.5vw, 7rem)',
            fontWeight:900, lineHeight:0.95,
            letterSpacing:'-4px', color:'#1A1630',
            marginBottom:'8px',
          }}>
            Lynda
          </h1>
          <h1 className="hl" style={{
            fontSize:'clamp(3.2rem, 8.5vw, 7rem)',
            fontWeight:900, lineHeight:0.95,
            letterSpacing:'-4px', marginBottom:'28px',
            background:'linear-gradient(135deg,#FF2D78 0%,#FF6B35 35%,#8B5CF6 100%)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          }}>
            Imakhlaf.
          </h1>

          {/* Type animation */}
          <div className="hl" style={{
            fontFamily:"'JetBrains Mono',monospace",
            fontSize:'clamp(0.95rem, 2vw, 1.2rem)',
            color:'#9B99B0', marginBottom:'22px', minHeight:'30px',
          }}>
            <span style={{ color:'#FF2D78', marginRight:'8px', fontWeight:700 }}>//</span>
            <TypeAnimation
              sequence={[
                'Full Stack Engineer', 2000,
                'React + Django Dev', 2000,
                '3D Artist & Blender', 2000,
                'Unity Game Dev', 2000,
                'Créative & Technique', 2000,
              ]}
              wrapper="span" cursor repeat={Infinity} speed={58} deletionSpeed={72}
            />
          </div>

          {/* Description */}
          <p className="hl" style={{
            fontSize:'1.1rem', color:'#5A5878',
            maxWidth:'500px', lineHeight:1.8,
            marginBottom:'40px',
          }}>
            5+ ans à construire des apps web, des mondes en 3D et des jeux.
            {' '}<strong style={{ color:'#1A1630' }}>Full-time</strong> en entreprise
            {' '}+{' '}<span style={{
              background:'linear-gradient(135deg,#FF2D78,#8B5CF6)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              fontWeight:700,
            }}>freelance</span>{' '}disponible.
          </p>

          {/* CTA buttons */}
          <div className="hl" style={{ display:'flex', gap:'14px', flexWrap:'wrap', marginBottom:'40px' }}>
            <Link to="projects" smooth duration={700} offset={-62}>
              <span className="h-btn-main">Voir mes projets →</span>
            </Link>
            <Link to="contact" smooth duration={700} offset={-62}>
              <span className="h-btn-ghost">Me contacter</span>
            </Link>
          </div>

          {/* Social + mini stats */}
          <div className="hl" style={{ display:'flex', alignItems:'center', gap:'16px', flexWrap:'wrap' }}>
            {[
              { l:'GitHub',   h:'https://github.com/lynda-imakhlaf',      i:<GHIcon /> },
              { l:'LinkedIn', h:'https://linkedin.com/in/lynda-imakhlaf', i:<LIIcon /> },
              { l:'Email',    h:'mailto:imakhlflyndatiane@gmail.com',      i:<MailIcon /> },
            ].map(({ l, h, i }) => (
              <a key={l} href={h} target={l!=='Email'?'_blank':undefined}
                rel="noopener noreferrer" className="soc" title={l}>{i}</a>
            ))}
            <div style={{ width:'1px', height:'26px', background:'rgba(26,22,48,0.1)' }} />
            {[
              { n:'5+', l:'ans' },
              { n:'20+', l:'projets' },
              { n:'3', l:'domaines' },
            ].map(({ n, l }) => (
              <div key={l} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'1.1rem',
                  fontWeight:800, color:'#1A1630' }}>{n}</div>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'10px',
                  color:'#9B99B0', letterSpacing:'1px' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position:'absolute', bottom:'32px', left:'50%',
        transform:'translateX(-50%)', zIndex:3,
        display:'flex', flexDirection:'column', alignItems:'center', gap:'6px',
      }}>
        <div style={{
          width:'24px', height:'38px', borderRadius:'12px',
          border:'2px solid rgba(26,22,48,0.15)',
          display:'flex', justifyContent:'center', paddingTop:'6px',
          background:'white', boxShadow:'0 2px 8px rgba(26,22,48,0.08)',
        }}>
          <div style={{
            width:'4px', height:'8px', borderRadius:'2px',
            background:'linear-gradient(180deg,#FF2D78,#8B5CF6)',
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
