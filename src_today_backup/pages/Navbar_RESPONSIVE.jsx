// TARGET_FILE: src/components/landing/Navbar.jsx
// Logo auto-fits: phone=100px, tablet=124px, desktop=148px

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function NavLogo({ width }) {
  const W = width
  const H = Math.round(W * 0.39)
  const sunCX = W * 0.595, sunCY = H * 0.48, sunR = W * 0.078
  const rays = [-85,-60,-35,-10,15,40,65,90]
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}
      style={{ display:'block', flexShrink:0 }} aria-label="TryIT Educations">
      <defs>
        <linearGradient id="ng" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"  stopColor="#B8860B"/>
          <stop offset="50%" stopColor="#F5D76E"/>
          <stop offset="100%" stopColor="#D4AF37"/>
        </linearGradient>
        <filter id="nf">
          <feGaussianBlur stdDeviation="0.7" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Sun */}
      <ellipse cx={sunCX} cy={sunCY + sunR * 0.28}
        rx={sunR * 0.9} ry={sunR * 0.56}
        fill="url(#ng)" filter="url(#nf)"/>

      {/* Rays */}
      {rays.map((a, i) => {
        const r = (a - 90) * Math.PI / 180, mj = i % 2 === 0
        return (
          <line key={i}
            x1={sunCX + Math.cos(r) * sunR * 1.28}
            y1={sunCY + Math.sin(r) * sunR * 1.28}
            x2={sunCX + Math.cos(r) * sunR * (mj ? 1.85 : 2.15)}
            y2={sunCY + Math.sin(r) * sunR * (mj ? 1.85 : 2.15)}
            stroke="url(#ng)" strokeWidth={mj ? 1.6 : 1.0} strokeLinecap="round"/>
        )
      })}

      {/* Arrow */}
      <line
        x1={sunCX + sunR * 0.38} y1={sunCY + sunR * 0.08}
        x2={sunCX + sunR * 1.55} y2={sunCY - sunR * 1.28}
        stroke="url(#ng)" strokeWidth={2} strokeLinecap="round"/>
      <polygon
        points={`
          ${sunCX + sunR * 1.55},${sunCY - sunR * 1.28}
          ${sunCX + sunR * 1.14},${sunCY - sunR * 1.06}
          ${sunCX + sunR * 1.32},${sunCY - sunR * 0.65}
        `}
        fill="url(#ng)"/>

      {/* TRY */}
      <text x={W * 0.015} y={H * 0.75}
        fontFamily="'Arial Black',Impact,sans-serif"
        fontWeight="900" fontSize={H * 0.68}
        fill="#FFFFFF">TRY</text>

      {/* IT */}
      <text x={W * 0.605} y={H * 0.75}
        fontFamily="'Arial Black',Impact,sans-serif"
        fontWeight="900" fontSize={H * 0.68}
        fill="url(#ng)" filter="url(#nf)">IT</text>

      {/* Top line */}
      <rect x={W * 0.015} y={H * 0.80}
        width={W * 0.965} height={H * 0.055} rx={H * 0.027}
        fill="url(#ng)"/>

      {/* EDUCATIONS */}
      <text x={W * 0.5} y={H * 0.97}
        textAnchor="middle"
        fontFamily="Arial,'Helvetica Neue',sans-serif"
        fontWeight="800" fontSize={H * 0.19}
        letterSpacing={H * 0.044}
        fill="url(#ng)">EDUCATIONS</text>
    </svg>
  )
}

export default function Navbar() {
  const navigate  = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  // Responsive logo width — read window width
  const [logoW, setLogoW] = useState(
    typeof window !== 'undefined'
      ? window.innerWidth < 480  ? 96
      : window.innerWidth < 768  ? 116
      : window.innerWidth < 1024 ? 132
      : 148
      : 148
  )
  // Responsive navbar height
  const navH = logoW < 100 ? 60 : logoW < 120 ? 68 : 80

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    const onResize = () => {
      const w = window.innerWidth
      setLogoW(w < 480 ? 96 : w < 768 ? 116 : w < 1024 ? 132 : 148)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const links = [
    { label:'Features',     href:'#features'    },
    { label:'Exams',        href:'/exams'        },
    { label:'Pricing',      href:'/pro'          },
    { label:'Impact',       href:'/impact'       },
    { label:'Free Access',  href:'/equity'       },
    { label:'Institutions', href:'#institutions' },
  ]

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 500,
        height: navH,
        background: scrolled ? 'rgba(10,21,50,0.98)' : 'rgba(10,21,50,0.92)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(212,175,55,0.2)',
        display: 'flex', alignItems: 'center',
        padding: '0 clamp(14px,3vw,28px)',
        gap: 'clamp(10px,2vw,20px)',
        transition: 'background 0.3s, height 0.2s',
      }}>

        {/* Logo — auto-sizes to device */}
        <div onClick={() => navigate('/')}
          style={{ cursor: 'pointer', flexShrink: 0,
            display: 'flex', alignItems: 'center' }}>
          <NavLogo width={logoW}/>
        </div>

        {/* Desktop nav links — hidden on mobile */}
        <div className="nav-links"
          style={{ display: 'flex', alignItems: 'center',
            gap: 4, flex: 1, justifyContent: 'center' }}>
          {links.map(l => (
            <a key={l.label} href={l.href}
              style={{ color: 'rgba(255,255,255,0.72)',
                fontSize: 'clamp(12px,1.3vw,14px)',
                fontFamily: 'Poppins,sans-serif', fontWeight: 600,
                padding: '7px clamp(8px,1vw,13px)',
                borderRadius: 10, textDecoration: 'none',
                transition: 'all 0.2s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => {
                e.target.style.color = '#D4AF37'
                e.target.style.background = 'rgba(212,175,55,0.08)'
              }}
              onMouseLeave={e => {
                e.target.style.color = 'rgba(255,255,255,0.72)'
                e.target.style.background = 'none'
              }}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center',
          gap: 'clamp(6px,1.5vw,12px)',
          marginLeft: 'auto', flexShrink: 0 }}>

          {/* Green live dot — no fake number */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.25)',
            borderRadius: 20,
            padding: 'clamp(4px,1vw,6px) clamp(8px,1.5vw,13px)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%',
              background: '#22C55E', display: 'inline-block',
              animation: 'liveDot 1.4s ease-in-out infinite' }}/>
            <span className="live-text"
              style={{ color: 'rgba(255,255,255,0.7)',
                fontSize: 12, fontFamily: 'Inter,sans-serif' }}>
              Live
            </span>
          </div>

          {/* Login button */}
          <button onClick={() => navigate('/login')} style={{
            background: 'linear-gradient(135deg,#D4AF37,#E8C84A)',
            border: 'none',
            borderRadius: 'clamp(10px,1.5vw,13px)',
            padding: 'clamp(8px,1.5vw,11px) clamp(14px,2vw,22px)',
            fontFamily: 'Poppins,sans-serif', fontWeight: 800,
            fontSize: 'clamp(13px,1.5vw,15px)',
            color: '#1E3A5F', cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(212,175,55,0.35)',
            whiteSpace: 'nowrap',
          }}>Login →</button>
        </div>
      </nav>

      <style>{`
        @keyframes liveDot {
          0%   { box-shadow: 0 0 0 0   rgba(34,197,94,0.6); }
          70%  { box-shadow: 0 0 0 7px rgba(34,197,94,0);   }
          100% { box-shadow: 0 0 0 0   rgba(34,197,94,0);   }
        }
        /* Hide nav links below 768px */
        @media (max-width: 767px) {
          .nav-links   { display: none !important; }
          .live-text   { display: none !important; }
        }
        /* Hide "Live" text on very small screens, keep just the dot */
        @media (max-width: 359px) {
          .live-text { display: none !important; }
        }
      `}</style>
    </>
  )
}
