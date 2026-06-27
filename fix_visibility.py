import os

def w(path, txt):
    d = os.path.dirname(path)
    if d: os.makedirs(d, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(txt)
    print('OK', path)

# ============================================================
# 1. MOTION CSS — make orbs invisible, keep ONLY shooting stars
# ============================================================
w('src/styles/motion-graphics.css', """/* =====================================================
   TRYIT EDUCATIONS — SHOOTING STARS ONLY
   ===================================================== */

.mg-layer {
  position: fixed; inset: 0; z-index: 0;
  pointer-events: none; overflow: hidden;
}

/* Very faint ambient colour — barely visible */
.mg-orb {
  position: absolute; border-radius: 50%;
  filter: blur(140px); pointer-events: none;
}
.mg-orb-0 {
  width:900px; height:900px; top:-300px; left:-300px;
  background: var(--color-primary,#1E3A5F);
  opacity: 0.03;
  animation: mg-orb0 40s ease-in-out infinite;
}
.mg-orb-1 {
  width:700px; height:700px; bottom:-200px; right:-200px;
  background: var(--color-accent,#C9A84C);
  opacity: 0.025;
  animation: mg-orb1 50s ease-in-out infinite;
}
@keyframes mg-orb0 {
  0%,100%{transform:translate(0,0);} 50%{transform:translate(80px,100px);}
}
@keyframes mg-orb1 {
  0%,100%{transform:translate(0,0);} 50%{transform:translate(-80px,-80px);}
}

/* ── FLYING PLATES (shooting stars) ── */
.mg-shoot {
  position: absolute;
  border-radius: 4px;
  opacity: 0;
  animation: mg-fly ease-out infinite;
}
.mg-shoot::before {
  content:'';
  position:absolute; right:0; top:50%;
  transform:translateY(-50%);
  width:9px; height:9px; border-radius:50%;
  background:var(--color-accent,#C9A84C);
  box-shadow:0 0 14px 5px var(--color-accent,#C9A84C);
}
.mg-shoot::after {
  content:'';
  position:absolute; right:9px; top:50%;
  transform:translateY(-50%);
  height:2px; border-radius:2px;
  background:linear-gradient(90deg,transparent,var(--color-accent,#C9A84C));
}
.mg-shoot-0{width:180px;height:2px;top:7%;left:-15%;animation-duration:7s;animation-delay:0.5s;}
.mg-shoot-0::after{width:140px;}
.mg-shoot-1{width:110px;height:1.5px;top:19%;left:-12%;animation-duration:10s;animation-delay:3s;}
.mg-shoot-1::after{width:85px;}
.mg-shoot-1::before{width:6px;height:6px;}
.mg-shoot-2{width:230px;height:2.5px;top:4%;left:-18%;animation-duration:12s;animation-delay:6s;}
.mg-shoot-2::after{width:195px;}
.mg-shoot-2::before{width:11px;height:11px;box-shadow:0 0 18px 7px var(--color-accent,#C9A84C);}
.mg-shoot-3{width:90px;height:1px;top:32%;left:-10%;animation-duration:9s;animation-delay:9s;}
.mg-shoot-3::after{width:70px;background:linear-gradient(90deg,transparent,var(--color-primary,#1E3A5F));}
.mg-shoot-3::before{background:var(--color-primary,#1E3A5F);box-shadow:0 0 10px 3px var(--color-primary,#1E3A5F);}
.mg-shoot-4{width:200px;height:2px;top:13%;left:-16%;animation-duration:15s;animation-delay:12s;}
.mg-shoot-4::after{width:165px;}
.mg-shoot-5{width:140px;height:1.5px;top:44%;left:-12%;animation-duration:11s;animation-delay:16s;}
.mg-shoot-5::after{width:110px;}
.mg-shoot-5::before{width:7px;height:7px;}

@keyframes mg-fly {
  0%    {transform:translateX(0) translateY(0) rotate(-26deg);opacity:0;}
  3%    {opacity:1;}
  50%   {opacity:0.85;}
  90%   {opacity:0.3;}
  100%  {transform:translateX(130vw) translateY(46vh) rotate(-26deg);opacity:0;}
}

/* Global body defaults — ALL pages get theme */
body { color:var(--color-text,#1E293B); background:var(--color-background,#F8FAFC); }
body.theme-dark  { color:var(--color-text,#F1F5F9); }
body.theme-light { color:var(--color-text,#1E293B); }

/* Scroll reveal */
.mg-reveal{opacity:0;transform:translateY(24px);transition:opacity 0.5s ease,transform 0.5s ease;}
.mg-reveal.mg-visible{opacity:1;transform:translateY(0);}
.mg-reveal-delay-1{transition-delay:0.1s;} .mg-reveal-delay-2{transition-delay:0.2s;}
.mg-reveal-delay-3{transition-delay:0.3s;} .mg-reveal-delay-4{transition-delay:0.4s;}

/* Card hover */
.mg-card{transition:transform 0.22s ease,box-shadow 0.22s ease;}
.mg-card:hover{transform:translateY(-4px);box-shadow:0 18px 44px rgba(0,0,0,0.13);}

/* Shimmer button */
.mg-btn{position:relative;overflow:hidden;}
.mg-btn::after{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;
  background:rgba(255,255,255,0.18);transform:skewX(-20deg);transition:left 0.5s ease;}
.mg-btn:hover::after{left:160%;}

/* Scrollbar */
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:var(--color-primary,#1E3A5F)55;border-radius:2px;}
""")

# ============================================================
# 2. StudentTournament.jsx — proper theme-aware contrast
# ============================================================
w('src/pages/student/StudentTournament.jsx', """// src/pages/student/StudentTournament.jsx
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const LIVE = [
  {name:'TNPSC Grand Challenge',participants:8432,prize:'5000',exam:'TNPSC',ends:'2h 14m'},
  {name:'SSC CGL Weekly Blitz',participants:3201,prize:'2000',exam:'SSC',ends:'5h 40m'},
]
const UPCOMING = [
  {name:'UPSC Sunday Showdown',participants:1240,prize:'10000',exam:'UPSC',date:'Tomorrow 10AM'},
  {name:'IBPS Banking Battle',participants:890,prize:'3000',exam:'IBPS',date:'Sunday 2PM'},
  {name:'RRB Railways Rush',participants:2100,prize:'4000',exam:'RRB',date:'Mon 6PM'},
]

export default function StudentTournament() {
  const nav = useNavigate()
  const { theme } = useTheme()
  const p = theme?.primary||'#1E3A5F'
  const a = theme?.accent||'#C9A84C'
  const t = theme?.text||'#1E293B'
  const m = theme?.textLight||'#64748B'
  const bg = theme?.background||'#F8FAFC'
  const c = theme?.surface||'#FFFFFF'
  const b = theme?.border||'#E2E8F0'
  const isDark = theme?.isDark||false

  return (
    <div style={{minHeight:'100vh',background:bg,fontFamily:'Poppins,sans-serif'}}>

      {/* Header */}
      <div style={{background:p,padding:'16px 20px',
        display:'flex',alignItems:'center',gap:12,position:'sticky',top:0,zIndex:10}}>
        <button onClick={()=>nav('/student')} style={{background:'rgba(255,255,255,0.15)',
          border:'1px solid rgba(255,255,255,0.3)',borderRadius:10,padding:'6px 14px',
          color:'#fff',fontSize:13,cursor:'pointer',fontWeight:600}}>
          Back
        </button>
        <div style={{flex:1}}>
          <h1 style={{color:'#fff',fontSize:18,fontWeight:800,margin:0}}>Tournaments</h1>
          <p style={{color:'rgba(255,255,255,0.75)',fontSize:11,margin:0}}>
            Compete live · Win coins · Climb ranks
          </p>
        </div>
        <div style={{background:'#EF4444',borderRadius:20,padding:'4px 10px',
          display:'flex',alignItems:'center',gap:4}}>
          <div style={{width:6,height:6,borderRadius:'50%',background:'#fff',
            animation:'pulse 1.5s infinite'}}/>
          <span style={{color:'#fff',fontSize:10,fontWeight:700}}>LIVE</span>
        </div>
      </div>

      <div style={{padding:'20px',maxWidth:760,margin:'0 auto'}}>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:20}}>
          {[{l:'Active Now',v:'2',e:'🏟️'},{l:'Registered',v:'0',e:'✅'},{l:'Results at',v:'8:00 PM',e:'🏆'}]
            .map((s,i)=>(
            <div key={i} style={{background:c,border:'1px solid '+b,borderRadius:14,
              padding:'14px',textAlign:'center'}}>
              <div style={{fontSize:22,marginBottom:4}}>{s.e}</div>
              <p style={{color:t,fontWeight:800,fontSize:15,margin:'0 0 2px'}}>{s.v}</p>
              <p style={{color:m,fontSize:10,margin:0}}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* LIVE section */}
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
          <div style={{width:8,height:8,borderRadius:'50%',background:'#EF4444',
            animation:'pulse 1.5s infinite'}}/>
          <p style={{color:t,fontWeight:700,fontSize:14,margin:0}}>Live Tournaments</p>
        </div>

        {LIVE.map((l,i)=>(
          <div key={i} style={{background:p,border:'2px solid '+a+'50',
            borderRadius:18,padding:'18px',marginBottom:12,cursor:'pointer'}}
            onClick={()=>nav('/tournament')}
            onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
            onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>

            <div style={{display:'flex',justifyContent:'space-between',
              alignItems:'flex-start',marginBottom:10}}>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                  <span style={{background:'#EF444430',color:'#EF4444',fontSize:9,
                    fontWeight:700,padding:'3px 10px',borderRadius:20,
                    border:'1px solid #EF444440'}}>LIVE</span>
                  <span style={{background:a+'25',color:a,fontSize:9,fontWeight:700,
                    padding:'3px 10px',borderRadius:20}}>{l.exam}</span>
                </div>
                <p style={{color:'#fff',fontWeight:800,fontSize:16,margin:'0 0 4px'}}>
                  {l.name}
                </p>
                <div style={{display:'flex',gap:14}}>
                  <span style={{color:'rgba(255,255,255,0.75)',fontSize:12}}>
                    {l.participants.toLocaleString()} students
                  </span>
                  <span style={{color:'rgba(255,255,255,0.75)',fontSize:12}}>
                    Ends in {l.ends}
                  </span>
                </div>
              </div>
              <div style={{textAlign:'right',flexShrink:0}}>
                <p style={{color:a,fontWeight:900,fontSize:20,margin:'0 0 2px'}}>
                  {l.prize}
                </p>
                <p style={{color:'rgba(255,255,255,0.6)',fontSize:10,margin:0}}>coins prize</p>
              </div>
            </div>

            <button onClick={e=>{e.stopPropagation();nav('/tournament')}}
              style={{background:'linear-gradient(135deg,'+a+',#E8C44A)',
                border:'none',borderRadius:12,padding:'10px 24px',
                color:p,fontWeight:800,fontSize:13,cursor:'pointer',
                boxShadow:'0 4px 16px '+a+'44'}}>
              Join Now
            </button>
          </div>
        ))}

        {/* Upcoming section */}
        <p style={{color:t,fontWeight:700,fontSize:14,margin:'20px 0 12px'}}>
          Upcoming Tournaments
        </p>

        {UPCOMING.map((u,i)=>(
          <div key={i} onClick={()=>nav('/tournament')}
            style={{background:isDark?'rgba(255,255,255,0.08)':c,
              border:'1px solid '+b,borderRadius:16,padding:'16px',
              marginBottom:10,cursor:'pointer',
              display:'flex',justifyContent:'space-between',alignItems:'center',
              transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=a;
              e.currentTarget.style.transform='translateX(4px)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=b;
              e.currentTarget.style.transform='translateX(0)'}}>
            <div>
              <p style={{color:t,fontWeight:700,fontSize:14,margin:'0 0 4px'}}>{u.name}</p>
              <span style={{color:m,fontSize:12}}>
                {u.date} · {u.participants.toLocaleString()} registered
              </span>
            </div>
            <div style={{textAlign:'right',flexShrink:0}}>
              <p style={{color:a,fontWeight:800,fontSize:15,margin:'0 0 4px'}}>
                {u.prize}
              </p>
              <span style={{background:p+'15',color:p,fontSize:10,fontWeight:700,
                padding:'2px 8px',borderRadius:20}}>{u.exam}</span>
            </div>
          </div>
        ))}

        <div style={{height:80}}/>
      </div>

      <style>{`
        @keyframes pulse {
          0%,100%{opacity:1;transform:scale(1);}
          50%{opacity:0.5;transform:scale(1.3);}
        }
      `}</style>
    </div>
  )
}
""")

print('')
print('ALL DONE! Now run:')
print('npm run build 2>&1 | Select-Object -Last 3')
