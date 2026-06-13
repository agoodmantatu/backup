// Change the default height from 44 to 32 here:
export default function Logo({ height = 32, dark = false }) {
  const W = height * 2.6
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

      {/* Rays */}
      {rays.map((deg,i) => {
        const rad = (deg * Math.PI) / 180
        const inner = sunR * 1.4, outer = sunR * 2.5
        return (
          <line key={i}
            x1={sunCX + Math.cos(rad)*inner} y1={sunCY + Math.sin(rad)*inner}
            x2={sunCX + Math.cos(rad)*outer} y2={sunCY + Math.sin(rad)*outer}
            stroke="url(#sGold)" strokeWidth={H*0.018} strokeLinecap="round" opacity={0.85}/>
        )
      })}

      {/* Sun */}
      <circle cx={sunCX} cy={sunCY} r={sunR} fill="url(#sGold)" filter="url(#sGlow)"/>
      <circle cx={sunCX - sunR*0.25} cy={sunCY - sunR*0.25} r={sunR*0.32} fill="rgba(255,255,255,0.4)"/>

      {/* Arrow accent */}
      <line x1={sunCX + sunR*0.4} y1={sunCY - sunR*0.4}
            x2={sunCX + sunR*1.9} y2={sunCY - sunR*1.9}
            stroke="url(#sGold)" strokeWidth={H*0.022} strokeLinecap="round" filter="url(#sGlow)"/>
      <polygon
        points={`${sunCX+sunR*1.9},${sunCY-sunR*1.9} ${sunCX+sunR*1.35},${sunCY-sunR*1.85} ${sunCX+sunR*1.85},${sunCY-sunR*1.35}`}
        fill="url(#sGold)"/>

      {/* TRY */}
      <text x={W*0.015} y={H*0.62} fontFamily="'Arial Black',Impact,Arial,sans-serif"
        fontWeight="900" fontSize={H*0.5} fill={NAVY} letterSpacing={-1}>TRY</text>
      {/* IT */}
      <text x={W*0.395} y={H*0.62} fontFamily="'Arial Black',Impact,Arial,sans-serif"
        fontWeight="900" fontSize={H*0.5} fill="url(#sGold)" filter="url(#sGlow)" letterSpacing={-1}>IT</text>

      {/* underline */}
      <rect x={W*0.015} y={H*0.70} width={W*0.62} height={Math.max(1.5,H*0.035)} rx={H*0.017} fill="url(#sGold)"/>
      
      {/* EDUCATIONS (Adjusted y coordinate from 0.93 to 0.89 so it doesn't clip) */}
      <text x={W*0.015} y={H*0.89} fontFamily="Arial,'Helvetica Neue',sans-serif"
        fontWeight="800" fontSize={H*0.155} letterSpacing={H*0.025} fill={dark ? 'rgba(255,255,255,0.85)' : '#1E3A5F'}>EDUCATIONS</text>
    </svg>
  )
}