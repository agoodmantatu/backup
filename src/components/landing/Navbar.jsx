// TARGET_FILE: src/components/landing/Navbar.jsx
// Compressed logo – fits perfectly without overlap when scrolled

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoAnimated from '../LogoAnimated'

export default function Navbar() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  // Compressed logo sizes & navbar heights
  const [logoSz, setLogoSz] = useState('md')
  const [navH, setNavH] = useState(64)

const updateSize = () => {
  setLogoSz('sm')
  setNavH(68)       // taller header
}

  useEffect(() => {
    updateSize()
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateSize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  const links = [
    { label: 'Features',     href: '#features'     },
    { label: 'Exams',        href: '/exams'        },
    { label: 'Pricing',      href: '/pro'          },
    { label: 'Impact',       href: '/impact'       },
    { label: 'Free Access',  href: '/equity'       },
    { label: 'Institutions', href: '#institutions' },
  ]

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 500,
        height: navH,
        background: scrolled ? 'rgba(10,21,50,0.98)' : 'rgba(10,21,50,0.92)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(212,175,55,0.2)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(12px, 3vw, 24px)',
        gap: 'clamp(8px, 1.5vw, 16px)',
        transition: 'background 0.3s, height 0.2s',
      }}>
        {/* Logo – animated, white text, compressed size */}
        <div
          onClick={() => navigate('/')}
          style={{
            cursor: 'pointer',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            lineHeight: 0, // removes extra spacing
          }}
        >
          <LogoAnimated size={logoSz} mode="loop" dark={true} />
        </div>

        {/* Desktop nav links – hidden on mobile */}
        <div
          className="nav-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              style={{
                color: 'rgba(255,255,255,0.72)',
                fontSize: 'clamp(11px, 1.2vw, 13px)',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                padding: '6px clamp(6px, 1vw, 10px)',
                borderRadius: 8,
                textDecoration: 'none',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.target.style.color = '#D4AF37'
                e.target.style.background = 'rgba(212,175,55,0.08)'
              }}
              onMouseLeave={e => {
                e.target.style.color = 'rgba(255,255,255,0.72)'
                e.target.style.background = 'none'
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right side – live indicator + login button (compressed) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(6px, 1.5vw, 10px)',
            marginLeft: 'auto',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              background: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.25)',
              borderRadius: 16,
              padding: '3px clamp(6px, 1.5vw, 10px)',
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#22C55E',
                display: 'inline-block',
                animation: 'liveDot 1.4s ease-in-out infinite',
              }}
            />
            <span
              className="live-text"
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: 11,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Live
            </span>
          </div>

          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
              border: 'none',
              borderRadius: 'clamp(8px, 1.5vw, 12px)',
              padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 2vw, 18px)',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(12px, 1.3vw, 14px)',
              color: '#1E3A5F',
              cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(212,175,55,0.3)',
              whiteSpace: 'nowrap',
            }}
          >
            Login →
          </button>
        </div>
      </nav>

      <style>{`
        @keyframes liveDot {
          0%   { box-shadow: 0 0 0 0   rgba(34,197,94,0.6); }
          70%  { box-shadow: 0 0 0 6px rgba(34,197,94,0);   }
          100% { box-shadow: 0 0 0 0   rgba(34,197,94,0);   }
        }
        @media (max-width: 767px) {
          .nav-links   { display: none !important; }
          .live-text   { display: none !important; }
        }
        @media (max-width: 359px) {
          .live-text { display: none !important; }
        }
      `}</style>
    </>
  )
}