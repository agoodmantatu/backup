// TARGET_FILE: src/components/Logo.jsx
// Works on: Web browser, Android app, iOS app
// Static mode = used in Navbar, Sidebar, Footer, Login
// Animated mode = used on Splash screen only

import { useState } from 'react'
import LogoAnimated from './LogoAnimated'

// ── Static SVG logo — matches the real logo exactly ──────────────
// Used everywhere except Splash. No image file needed.
// Scales perfectly at any size. Works offline. No blink on load.
function LogoStatic({ height = 44, dark = false }) {
  const W = height * 2.6   // maintain aspect ratio
  const H = height
  const NAVY = dark ? '#FFFFFF' : '#1E3A5F'
  const GOLD = '#D4AF37'

  const sunCX = W * 0.595
  const sunCY = H * 0.31
  const sunR  = W * 0.082

  const rays = [-85,-60,-35,-10,15,40,65,90]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}
      style={{ display:'block', flexShrink:0 }}
      aria-label="TryIT Educations">
      <defs>
        <linearGradient id="sGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"  stopColor="#B8860B"/>
          <stop offset="50%" stopColor="#F5D76E"/>
          <stop offset="100%" stopColor="#D4AF37"/>
        </linearGradient>
        <filter id="sGlow">
          <feGaussianBlur stdDeviation="1" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Sun */}
      <ellipse cx={sunCX} cy={sunCY + sunR * 0.28}
        rx={sunR * 0.9} ry={sunR * 0.56}
        fill="url(#sGold)" filter="url(#sGlow)" />

      {/* Rays */}
      {rays.map((angle, i) => {
        const rad = (angle - 90) * Math.PI / 180
        const major = i % 2 === 0
        return (
          <line key={i}
            x1={sunCX + Math.cos(rad) * sunR * 1.28}
            y1={sunCY + Math.sin(rad) * sunR * 1.28}
            x2={sunCX + Math.cos(rad) * sunR * (major ? 1.85 : 2.15)}
            y2={sunCY + Math.sin(rad) * sunR * (major ? 1.85 : 2.15)}
            stroke="url(#sGold)"
            strokeWidth={major ? 1.8 : 1.1}
            strokeLinecap="round"
          />
        )
      })}

      {/* Arrow */}
      <line
        x1={sunCX + sunR * 0.38} y1={sunCY + sunR * 0.08}
        x2={sunCX + sunR * 1.55} y2={sunCY - sunR * 1.28}
        stroke="url(#sGold)" strokeWidth={2.2} strokeLinecap="round"
      />
      <polygon
        points={`
          ${sunCX + sunR * 1.55},${sunCY - sunR * 1.28}
          ${sunCX + sunR * 1.14},${sunCY - sunR * 1.06}
          ${sunCX + sunR * 1.32},${sunCY - sunR * 0.65}
        `}
        fill="url(#sGold)"
      />

      {/* TRY */}
      <text x={W * 0.015} y={H * 0.72}
        fontFamily="'Arial Black',Impact,sans-serif"
        fontWeight="900"
        fontSize={H * 0.52}
        fill={NAVY}>TRY</text>

      {/* IT */}
      <text x={W * 0.605} y={H * 0.72}
        fontFamily="'Arial Black',Impact,sans-serif"
        fontWeight="900"
        fontSize={H * 0.52}
        fill="url(#sGold)" filter="url(#sGlow)">IT</text>

      {/* Top line */}
      <rect x={W * 0.015} y={H * 0.77}
        width={W * 0.965} height={H * 0.028} rx={H * 0.014}
        fill="url(#sGold)" />

      {/* EDUCATIONS */}
      <text x={W * 0.5} y={H * 0.91}
        textAnchor="middle"
        fontFamily="Arial,'Helvetica Neue',sans-serif"
        fontWeight="800"
        fontSize={H * 0.155}
        letterSpacing={H * 0.048}
        fill="url(#sGold)">EDUCATIONS</text>

      {/* Bottom line */}
      <rect x={W * 0.015} y={H * 0.945}
        width={W * 0.965} height={H * 0.022} rx={H * 0.011}
        fill="url(#sGold)" />
    </svg>
  )
}

// ── Main Logo component ───────────────────────────────────────────
export default function Logo({
  height    = 44,
  dark      = false,
  animated  = false,
  loop      = false,
  size      = 'md',
  onComplete,
}) {
  const [imgFailed, setImgFailed] = useState(false)

  // Splash screen — use full animation
  if (animated) {
    return (
      <LogoAnimated
        size={size}
        mode={loop ? 'loop' : 'auto'}
        dark={dark}
        onComplete={onComplete}
      />
    )
  }

  // Try real webp image first
  if (!imgFailed) {
    return (
      <img
        src="/tryit-logo.webp"
        alt="TryIT Educations"
        style={{ height:`${height}px`, width:'auto', objectFit:'contain', display:'block' }}
        onError={() => setImgFailed(true)}
      />
    )
  }

  // Fallback: pixel-perfect SVG (works 100% offline, Android, iOS)
  return <LogoStatic height={height} dark={dark} />
}