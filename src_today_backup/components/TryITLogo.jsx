export default function TryITLogo({ size = 148, variant = 'dark', className = '' }) {
  const W = size, H = Math.round(W * 0.42)
  const sunX = W * 0.372, sunY = H * 0.30, sunR = W * 0.058
  const RAY_ANGLES = [0,45,90,135,180,225,270,315]
  const RAY_INNER = sunR*1.5, RAY_OUTER = sunR*2.6
  const RAY_THICK = [1.8,1.2,1.8,1.2,1.8,1.2,1.8,1.2]
  const arrowStartX = sunX+sunR*0.5, arrowStartY = sunY-sunR*0.5
  const arrowEndX = sunX+sunR*2.2, arrowEndY = sunY-sunR*2.2
  const goldColor = '#D4AF37', goldLight = '#F0C84A'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className={className} aria-label="TryIT Educations" style={{ display:'block', flexShrink:0 }}>
      <defs>
        <linearGradient id={`gold-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8860B" /><stop offset="40%" stopColor={goldLight} /><stop offset="100%" stopColor={goldColor} />
        </linearGradient>
        <filter id={`glow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" /><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id={`sunGlow-${size}`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {RAY_ANGLES.map((angleDeg,i)=>{
        const rad = (angleDeg*Math.PI)/180
        return <line key={i} x1={sunX+Math.cos(rad)*RAY_INNER} y1={sunY+Math.sin(rad)*RAY_INNER} x2={sunX+Math.cos(rad)*RAY_OUTER} y2={sunY+Math.sin(rad)*RAY_OUTER} stroke={`url(#gold-${size})`} strokeWidth={RAY_THICK[i]} strokeLinecap="round" opacity={0.9}/>
      })}

      <circle cx={sunX} cy={sunY} r={sunR*1.25} fill="none" stroke={goldColor} strokeWidth={0.6} opacity={0.3}/>
      <circle cx={sunX} cy={sunY} r={sunR} fill={`url(#gold-${size})`} filter={`url(#sunGlow-${size})`}/>
      <circle cx={sunX-sunR*0.2} cy={sunY-sunR*0.2} r={sunR*0.35} fill="rgba(255,255,255,0.35)"/>

      <line x1={arrowStartX} y1={arrowStartY} x2={arrowEndX} y2={arrowEndY} stroke={`url(#gold-${size})`} strokeWidth={W*0.015} strokeLinecap="round" filter={`url(#glow-${size})`}/>
      <polygon points={`${arrowEndX},${arrowEndY} ${arrowEndX-W*0.032},${arrowEndY+W*0.005} ${arrowEndX-W*0.005},${arrowEndY+W*0.032}`} fill={`url(#gold-${size})`}/>

      <text x={W*0.018} y={H*0.78} fontFamily="'Arial Black','Impact',Arial,sans-serif" fontWeight="900" fontSize={H*0.68} fill={variant==='light'?'#FFFFFF':'#1E3A5F'} letterSpacing={-1}>TRY</text>
      <text x={W*0.618} y={H*0.78} fontFamily="'Arial Black','Impact',Arial,sans-serif" fontWeight="900" fontSize={H*0.68} fill={`url(#gold-${size})`} filter={`url(#glow-${size})`} letterSpacing={-1}>IT</text>
      <rect x={W*0.018} y={H*0.84} width={W*0.964} height={Math.max(1.5,H*0.045)} rx={H*0.022} fill={`url(#gold-${size})`}/>
      <text x={W*0.5} y={H*0.985} textAnchor="middle" fontFamily="Arial,'Helvetica Neue',sans-serif" fontWeight="800" fontSize={H*0.185} letterSpacing={H*0.042} fill={`url(#gold-${size})`}>EDUCATIONS</text>
    </svg>
  )
}
