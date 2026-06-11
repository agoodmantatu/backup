import { useEffect, useState, useRef } from 'react'

export default function LogoAnimated({ size = 'md', mode = 'auto', dark = true, onComplete }) {
  const [stage, setStage] = useState(mode === 'static' ? 'done' : 'hidden')
  const [pulse, setPulse] = useState(false)
  const timersRef = useRef([])

  const SIZES = {
    sm:     { width: 100 },
    md:     { width: 140 },
    lg:     { width: 200 },
    xl:     { width: 280 },
    splash: { width: 320 },
  }
  const W = SIZES[size]?.width || 140
  const H = Math.round(W * 0.68)
  const NAVY = dark ? '#FFFFFF' : '#1E3A5F'

  const sunCX = W * 0.62
  const sunCY = H * 0.30
  const sunR  = W * 0.115

  // ---- Animation sequence for auto/loop ----
  useEffect(() => {
    if (mode === 'static') {
      setStage('done')
      return
    }

    const timers = []
    timers.push(setTimeout(() => setStage('rays'),  120))
    timers.push(setTimeout(() => setStage('arrow'), 380))
    timers.push(setTimeout(() => setStage('text'),  640))
    timers.push(setTimeout(() => setStage('lines'), 960))
    timers.push(setTimeout(() => setStage('done'), 1300))
    timers.push(setTimeout(() => {
      onComplete?.()
    }, 2100))

    timersRef.current = timers
    return () => timers.forEach(clearTimeout)
  }, [mode, onComplete])

  // ---- Pulse loop for "loop" mode after construction ----
  useEffect(() => {
    if (mode !== 'loop' || stage !== 'done') return

    const interval = setInterval(() => {
      setPulse(prev => !prev)
    }, 1400)
    return () => clearInterval(interval)
  }, [mode, stage])

  // Helper: check if a stage is visible
  const isVisible = (requiredStage) => {
    const order = ['hidden', 'rays', 'arrow', 'text', 'lines', 'done']
    return order.indexOf(stage) >= order.indexOf(requiredStage)
  }
  const isDone = stage === 'done'

  // Ray angles
  const RAY_ANGLES = [-85, -65, -45, -25, -5, 15, 35, 55, 75, 95]

  // Pulse animation values
  const pulseScale = pulse ? 1.08 : 1
  const sunGlow = pulse ? '0 0 12px rgba(212,175,55,0.8)' : 'none'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}
      style={{ overflow: 'visible', display: 'block' }}>
      <defs>
        <linearGradient id="lgGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#C9A020"/>
          <stop offset="50%"  stopColor="#F5D76E"/>
          <stop offset="100%" stopColor="#D4AF37"/>
        </linearGradient>
        <linearGradient id="lgNavy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={dark ? '#FFFFFF' : '#2C4F8A'}/>
          <stop offset="100%" stopColor={dark ? '#D0E4FF' : '#1E3A5F'}/>
        </linearGradient>
        <filter id="lglow">
          <feGaussianBlur stdDeviation="1.8" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="lglowStrong">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* SUN BODY */}
      <ellipse
        cx={sunCX} cy={sunCY + sunR * 0.28}
        rx={sunR} ry={sunR * 0.62}
        fill="url(#lgGold)"
        filter={isDone && mode === 'loop' ? 'url(#lglowStrong)' : 'url(#lglow)'}
        style={{
          opacity: isVisible('rays') ? 1 : 0,
          transform: `scale(${isVisible('rays') ? 1 : 0.1})`,
          transformOrigin: `${sunCX}px ${sunCY}px`,
          transition: 'all 0.55s cubic-bezier(0.34,1.56,0.64,1)',
          filter: sunGlow,
        }}
      />

      {/* STATIC RAYS */}
      {RAY_ANGLES.map((angle, i) => {
        const rad = (angle - 90) * Math.PI / 180
        const innerR = sunR * 1.25
        const outerR = sunR * (i % 2 === 0 ? 1.75 : 2.1)
        return (
          <line key={`sr${i}`}
            x1={sunCX + Math.cos(rad) * innerR}
            y1={sunCY + Math.sin(rad) * innerR}
            x2={sunCX + Math.cos(rad) * outerR}
            y2={sunCY + Math.sin(rad) * outerR}
            stroke="url(#lgGold)"
            strokeWidth={i % 2 === 0 ? 2.2 : 1.4}
            strokeLinecap="round"
            style={{
              opacity: isVisible('rays') ? (isDone ? 0.35 : 0.9) : 0,
              transform: `scale(${isVisible('rays') ? 1 : 0})`,
              transformOrigin: `${sunCX}px ${sunCY}px`,
              transition: `all 0.4s ease ${i * 0.025}s`,
            }}
          />
        )
      })}

      {/* PULSE RINGS (only in loop mode after done) */}
      {isDone && mode === 'loop' && [0, 1, 2].map(i => (
        <circle key={`pulse${i}`}
          cx={sunCX} cy={sunCY}
          r={sunR * 1.2}
          fill="none"
          stroke="#D4AF37"
          strokeWidth={1.5}
          style={{
            animation: `signalPulse 2.4s ease-out ${i * 0.8}s infinite`,
            transformOrigin: `${sunCX}px ${sunCY}px`,
          }}
        />
      ))}

      {/* PULSE RAYS (only in loop mode after done) */}
      {isDone && mode === 'loop' && RAY_ANGLES.filter((_, i) => i % 2 === 0).map((angle, i) => {
        const rad = (angle - 90) * Math.PI / 180
        const innerR = sunR * 1.6
        const outerR = sunR * 2.8
        return (
          <line key={`pr${i}`}
            x1={sunCX + Math.cos(rad) * innerR}
            y1={sunCY + Math.sin(rad) * innerR}
            x2={sunCX + Math.cos(rad) * outerR}
            y2={sunCY + Math.sin(rad) * outerR}
            stroke="#D4AF37"
            strokeWidth={1.2}
            strokeLinecap="round"
            style={{
              animation: `rayPulse 2.4s ease-out ${i * 0.3}s infinite`,
              transformOrigin: `${sunCX}px ${sunCY}px`,
            }}
          />
        )
      })}

      {/* ARROW SHAFT */}
      <line
        x1={sunCX + sunR * 0.42} y1={sunCY + sunR * 0.1}
        x2={sunCX + sunR * 1.52} y2={sunCY - sunR * 1.25}
        stroke="url(#lgGold)" strokeWidth={2.5} strokeLinecap="round"
        style={{
          opacity: isVisible('arrow') ? 1 : 0,
          strokeDasharray: sunR * 4,
          strokeDashoffset: isVisible('arrow') ? 0 : sunR * 4,
          transition: 'all 0.45s ease',
          animation: (isDone && mode === 'loop') ? `arrowPulse 2.4s ease-in-out 0.4s infinite` : 'none',
        }}
      />
      {/* Arrow head */}
      <polygon
        points={`
          ${sunCX + sunR * 1.52},${sunCY - sunR * 1.25}
          ${sunCX + sunR * 1.12},${sunCY - sunR * 1.05}
          ${sunCX + sunR * 1.32},${sunCY - sunR * 0.72}
        `}
        fill="url(#lgGold)"
        style={{
          opacity: isVisible('arrow') ? 1 : 0,
          transition: 'opacity 0.3s ease 0.35s',
          animation: (isDone && mode === 'loop') ? `arrowPulse 2.4s ease-in-out 0.4s infinite` : 'none',
        }}
      />

      {/* TRY text */}
      <text
        x={W * 0.015} y={H * 0.79}
        fontFamily="'Arial Black',Impact,'Poppins',sans-serif"
        fontWeight="900" fontSize={W * 0.295}
        letterSpacing={-1}
        fill="url(#lgNavy)"
        style={{
          opacity: isVisible('text') ? 1 : 0,
          transform: `translateX(${isVisible('text') ? 0 : -24}px)`,
          transition: 'all 0.45s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >TRY</text>

      {/* IT text with pulse scale in loop mode */}
      <text
        x={W * 0.62} y={H * 0.79}
        fontFamily="'Arial Black',Impact,'Poppins',sans-serif"
        fontWeight="900" fontSize={W * 0.295}
        letterSpacing={-1}
        fill="url(#lgGold)" filter="url(#lglow)"
        style={{
          opacity: isVisible('text') ? 1 : 0,
          transform: `translateX(${isVisible('text') ? 0 : 24}px) scale(${isDone && mode === 'loop' ? pulseScale : 1})`,
          transformOrigin: `${W * 0.575}px ${H * 0.79}px`,
          transition: 'all 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.1s, transform 0.3s ease',
        }}
      >IT</text>

      {/* TOP LINE */}
      <rect
        x={W * 0.015} y={H * 0.835}
        width={W * 0.965} height={2.2} rx={1.1}
        fill="url(#lgGold)"
        style={{
          opacity: isVisible('lines') ? 1 : 0,
          transform: `scaleX(${isVisible('lines') ? 1 : 0})`,
          transformOrigin: `${W * 0.5}px 0`,
          transition: 'all 0.45s ease',
        }}
      />

      {/* EDUCATIONS text */}
      <text
        x={W * 0.5} y={H * 0.94}
        textAnchor="middle"
        fontFamily="Arial,'Helvetica Neue',sans-serif"
        fontWeight="700" fontSize={W * 0.087}
        letterSpacing={W * 0.022}
        fill="url(#lgGold)"
        style={{
          opacity: isVisible('lines') ? 1 : 0,
          transform: `translateY(${isVisible('lines') ? 0 : 8}px)`,
          transition: 'all 0.4s ease 0.05s',
        }}
      >EDUCATIONS</text>

      {/* BOTTOM LINE */}
      <rect
        x={W * 0.015} y={H * 0.965}
        width={W * 0.965} height={1.6} rx={0.8}
        fill="url(#lgGold)"
        style={{
          opacity: isVisible('lines') ? 1 : 0,
          transform: `scaleX(${isVisible('lines') ? 1 : 0})`,
          transformOrigin: `${W * 0.5}px 0`,
          transition: 'all 0.45s ease 0.12s',
        }}
      />

      <style>{`
        @keyframes signalPulse {
          0%   { r: ${sunR * 1.2}px; opacity: 0.8; stroke-width: 2; }
          100% { r: ${sunR * 4.5}px; opacity: 0;   stroke-width: 0.3; }
        }
        @keyframes rayPulse {
          0%   { opacity: 0.9; stroke-width: 1.8; }
          50%  { opacity: 0.15; stroke-width: 0.5; }
          100% { opacity: 0.9; stroke-width: 1.8; }
        }
        @keyframes arrowPulse {
          0%,100% { opacity: 1; filter: drop-shadow(0 0 2px #D4AF37); }
          50%     { opacity: 0.6; filter: drop-shadow(0 0 8px #D4AF37); }
        }
      `}</style>
    </svg>
  )
}