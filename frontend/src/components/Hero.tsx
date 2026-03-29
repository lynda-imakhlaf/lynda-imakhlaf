import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-scroll'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // --- Scene setup ---
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200)
    camera.position.set(0, 3, 12)
    camera.lookAt(0, 0, 0)

    // --- Galaxy geometry ---
    const PARTICLES = 9000
    const BRANCHES = 5
    const RADIUS = 8
    const SPIN = 1.2
    const RANDOMNESS = 0.35
    const RANDOMNESS_POWER = 2.8

    const positions = new Float32Array(PARTICLES * 3)
    const colors = new Float32Array(PARTICLES * 3)

    const colorInner = new THREE.Color('#a855f7')
    const colorOuter = new THREE.Color('#6e00ff')
    const colorAccent = new THREE.Color('#c4b5fd')

    for (let i = 0; i < PARTICLES; i++) {
      const i3 = i * 3
      const r = Math.random() * RADIUS
      const branchAngle = ((i % BRANCHES) / BRANCHES) * Math.PI * 2
      const spinAngle = r * SPIN

      const rx = Math.pow(Math.random(), RANDOMNESS_POWER) * (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * r
      const ry = Math.pow(Math.random(), RANDOMNESS_POWER) * (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * r * 0.3
      const rz = Math.pow(Math.random(), RANDOMNESS_POWER) * (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * r

      positions[i3]     = Math.cos(branchAngle + spinAngle) * r + rx
      positions[i3 + 1] = ry
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + rz

      // Color mix: inner bright, outer deep
      const mixedColor = colorInner.clone()
      mixedColor.lerp(colorOuter, r / RADIUS)
      if (Math.random() < 0.08) mixedColor.lerp(colorAccent, 0.7)

      colors[i3]     = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.055,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    })

    const galaxy = new THREE.Points(geometry, material)
    scene.add(galaxy)

    // --- Ambient floating particles (stars) ---
    const STARS = 1200
    const starPositions = new Float32Array(STARS * 3)
    const starColors = new Float32Array(STARS * 3)
    for (let i = 0; i < STARS; i++) {
      starPositions[i * 3]     = (Math.random() - 0.5) * 60
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 40
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 60
      const b = 0.4 + Math.random() * 0.6
      starColors[i * 3]     = b * 0.7
      starColors[i * 3 + 1] = b * 0.4
      starColors[i * 3 + 2] = b
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3))
    const starMat = new THREE.PointsMaterial({
      size: 0.04,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    // --- Mouse tracking ---
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // --- Animation ---
    let raf: number
    const clock = new THREE.Clock()

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Galaxy slow rotation
      galaxy.rotation.y = elapsed * 0.06
      stars.rotation.y = elapsed * 0.015
      stars.rotation.x = elapsed * 0.008

      // Subtle mouse parallax on camera
      camera.position.x += (mouseRef.current.x * 1.2 - camera.position.x) * 0.02
      camera.position.y += (mouseRef.current.y * 0.8 + 3 - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    // --- Resize ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      starGeo.dispose()
      starMat.dispose()
    }
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 0,
      }}
    >
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />

      {/* Gradient overlay — bottom fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '220px',
        background: 'linear-gradient(to bottom, transparent, #0d0221)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: '0 24px',
        maxWidth: '900px',
      }}>
        <style>{`
          @keyframes hero-fade-in {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .hero-line { animation: hero-fade-in 0.8s ease forwards; opacity: 0; }
          .hero-line:nth-child(1) { animation-delay: 0.1s; }
          .hero-line:nth-child(2) { animation-delay: 0.25s; }
          .hero-line:nth-child(3) { animation-delay: 0.4s; }
          .hero-line:nth-child(4) { animation-delay: 0.6s; }
          .hero-line:nth-child(5) { animation-delay: 0.8s; }
          .hero-line:nth-child(6) { animation-delay: 1s; }
          .hero-cta-btn {
            background: linear-gradient(135deg, #6e00ff, #a855f7);
            color: white;
            padding: 14px 32px;
            border-radius: 12px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.5px;
            border: none;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            box-shadow: 0 4px 24px rgba(110,0,255,0.45);
            transition: all 0.3s ease;
          }
          .hero-cta-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 36px rgba(110,0,255,0.55);
            color: white;
          }
          .hero-cta-ghost {
            color: #a855f7;
            padding: 14px 32px;
            border-radius: 12px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            font-weight: 600;
            border: 1.5px solid rgba(168,85,247,0.5);
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
            background: transparent;
          }
          .hero-cta-ghost:hover {
            border-color: #a855f7;
            background: rgba(168,85,247,0.1);
            color: #c4b5fd;
            transform: translateY(-3px);
          }
        `}</style>

        {/* Status badge */}
        <div className="hero-line" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(168, 85, 247, 0.1)',
          border: '1px solid rgba(168, 85, 247, 0.25)',
          borderRadius: '999px',
          padding: '6px 16px',
          marginBottom: '28px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          color: '#c4b5fd',
          letterSpacing: '1px',
        }}>
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#4ade80',
            boxShadow: '0 0 8px #4ade80',
            display: 'inline-block',
          }} />
          Available for freelance
        </div>

        {/* Name */}
        <h1 className="hero-line" style={{
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          fontWeight: 800,
          lineHeight: 1.05,
          marginBottom: '16px',
          letterSpacing: '-2px',
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #ffffff 30%, #c4b5fd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Lynda Imakhlaf
          </span>
        </h1>

        {/* Type animation */}
        <div className="hero-line" style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          color: '#a855f7',
          marginBottom: '24px',
          minHeight: '36px',
        }}>
          <TypeAnimation
            sequence={[
              'Full Stack Engineer', 2000,
              'React + Django Developer', 2000,
              '3D Artist & Blender', 2000,
              'Unity Game Developer', 2000,
              'Creative + Technical', 2000,
            ]}
            wrapper="span"
            cursor
            repeat={Infinity}
            speed={55}
            deletionSpeed={70}
          />
        </div>

        {/* Description */}
        <p className="hero-line" style={{
          fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
          color: '#c4b5fd',
          maxWidth: '560px',
          margin: '0 auto 40px',
          lineHeight: 1.75,
          opacity: 0.85,
        }}>
          5+ years building things that ship — from scalable web platforms to
          immersive 3D worlds. I write clean code and craft beautiful experiences.
        </p>

        {/* CTA buttons */}
        <div className="hero-line" style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <Link to="projects" smooth duration={700} offset={-64}>
            <span className="hero-cta-btn">View My Work</span>
          </Link>
          <Link to="contact" smooth duration={700} offset={-64}>
            <span className="hero-cta-ghost">Get In Touch</span>
          </Link>
        </div>

        {/* Social row */}
        <div className="hero-line" style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          marginTop: '40px',
        }}>
          {[
            { label: 'GitHub', href: 'https://github.com/lynda-imakhlaf', icon: GitHubIcon },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/lynda-imakhlaf', icon: LinkedInIcon },
            { label: 'Email', href: 'mailto:imakhlflyndatiane@gmail.com', icon: EmailIcon },
          ].map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              title={label}
              style={{
                width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '10px',
                background: 'rgba(168,85,247,0.08)',
                border: '1px solid rgba(168,85,247,0.2)',
                color: '#a855f7',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(168,85,247,0.18)'
                el.style.borderColor = '#a855f7'
                el.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(168,85,247,0.08)'
                el.style.borderColor = 'rgba(168,85,247,0.2)'
                el.style.transform = 'translateY(0)'
              }}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}>
        <style>{`
          @keyframes scroll-bounce {
            0%, 100% { transform: translateY(0); opacity: 0.5; }
            50% { transform: translateY(6px); opacity: 1; }
          }
        `}</style>
        <div style={{
          width: '24px', height: '38px',
          border: '1.5px solid rgba(168,85,247,0.4)',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '6px',
        }}>
          <div style={{
            width: '4px', height: '8px',
            background: '#a855f7',
            borderRadius: '2px',
            animation: 'scroll-bounce 1.8s ease-in-out infinite',
          }} />
        </div>
      </div>
    </section>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}
