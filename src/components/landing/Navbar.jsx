import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../Logo'
import ThemeSwitcher from '../ThemeSwitcher'

const NAV_LINKS = [
  { label: 'Features',       href: '#features' },
  { label: 'Pricing',        href: '#pricing' },
  { label: 'All Exams',      href: '#exams' },
  { label: 'Career Compass', href: '#career' },
  { label: 'Impact',         href: '#impact' },
]

function scrollToSection(href) {
  if (!href.startsWith('#')) return
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const linkColor   = scrolled ? '#1E3A5F' : '#fff'
  const bgStyle     = scrolled
    ? { background: '#fff', boxShadow: '0 1px 24px 0 rgba(30,58,95,0.10)' }
    : { background: 'rgba(15, 33, 64, 0.18)', backdropFilter: 'blur(12px)' }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={bgStyle}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center h-16" style={{ gap: 0 }}>

    
{/* Logo */}
<button
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  className="flex-shrink-0 focus:outline-none"
  aria-label="Go to top"
>
  <Logo dark={scrolled} height={32} />
</button>
          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 ml-8 flex-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 hover:opacity-80 focus:outline-none"
                style={{
                  color: linkColor,
                  fontFamily: 'Inter, sans-serif',
                  background: 'transparent',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#D4AF37'}
                onMouseLeave={e => e.currentTarget.style.color = linkColor}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3 ml-auto flex-shrink-0">
            {/* Theme switcher — prominently visible */}
            <div className="flex items-center">
              <ThemeSwitcher dark={!scrolled} />
            </div>

            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-150 hover:shadow-md focus:outline-none"
              style={{
                borderColor: scrolled ? '#1E3A5F' : 'rgba(255,255,255,0.6)',
                color: linkColor,
                background: 'transparent',
                fontFamily: 'Poppins, sans-serif',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#D4AF37'
                e.currentTarget.style.color = '#D4AF37'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = scrolled ? '#1E3A5F' : 'rgba(255,255,255,0.6)'
                e.currentTarget.style.color = linkColor
              }}
            >
              Login
            </button>

            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 hover:shadow-lg focus:outline-none"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
                color: '#0F2140',
                fontFamily: 'Poppins, sans-serif',
                boxShadow: '0 2px 12px rgba(212,175,55,0.30)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Start Now →
            </button>
          </div>

          {/* Mobile: theme switcher + hamburger */}
          <div className="md:hidden flex items-center gap-2 ml-auto">
            <ThemeSwitcher dark={!scrolled} />
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="p-2 rounded-lg transition-colors focus:outline-none"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{ color: linkColor }}
            >
              {menuOpen
                ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="3" y1="6"  x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                  </svg>
                )
              }
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <div
        className="fixed top-16 left-0 right-0 z-40 md:hidden transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: menuOpen ? '100vh' : '0',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <div
          className="px-5 pt-4 pb-6 flex flex-col gap-1"
          style={{ background: '#fff', boxShadow: '0 8px 32px rgba(30,58,95,0.12)' }}
        >
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => { scrollToSection(link.href); setMenuOpen(false) }}
              className="text-left px-3 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-slate-50 focus:outline-none"
              style={{ color: '#1E3A5F', fontFamily: 'Inter, sans-serif' }}
            >
              {link.label}
            </button>
          ))}

          <div className="h-px my-2" style={{ background: '#E2E8F0' }} />

          <button
            onClick={() => { navigate('/login'); setMenuOpen(false) }}
            className="px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all text-center"
            style={{ borderColor: '#1E3A5F', color: '#1E3A5F', fontFamily: 'Poppins, sans-serif' }}
          >
            Login
          </button>

          <button
            onClick={() => { navigate('/login'); setMenuOpen(false) }}
            className="px-4 py-3 rounded-xl text-sm font-semibold text-center"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
              color: '#0F2140',
              fontFamily: 'Poppins, sans-serif',
              boxShadow: '0 2px 12px rgba(212,175,55,0.25)',
            }}
          >
            Start Now →
          </button>
        </div>
      </div>

      {/* Mobile backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: 'rgba(15,33,64,0.4)', backdropFilter: 'blur(2px)' }}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}