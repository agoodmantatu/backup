import{u as c,r as i,j as t}from"./index-CRqGQxXy.js";import{L as p}from"./LogoAnimated-Dh2IQysg.js";function f(){const n=c(),[s,o]=i.useState(!1),[r,l]=i.useState(!1),d=()=>{o(!0),setTimeout(()=>l(!0),1200),setTimeout(()=>n("/landing"),1900)};return t.jsxs("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#071428,#0F2140,#1E3A5F)",opacity:r?0:1,transition:"opacity 0.7s ease",position:"relative",overflow:"hidden"},children:[[300,520,740].map((e,a)=>t.jsx("div",{style:{position:"absolute",width:e,height:e,borderRadius:"50%",border:`1px solid rgba(212,175,55,${.08-a*.02})`,animation:`ring ${3+a}s ease-in-out ${a*.4}s infinite`,pointerEvents:"none"}},a)),t.jsx("div",{style:{position:"relative",zIndex:10},children:t.jsx(p,{size:"splash",mode:"auto",dark:!0,onComplete:d})}),t.jsx("p",{style:{fontFamily:"Inter, sans-serif",fontStyle:"italic",color:"rgba(212,175,55,0.9)",fontSize:15,letterSpacing:"1.5px",textAlign:"center",marginTop:20,zIndex:10,opacity:s?1:0,transform:`translateY(${s?0:10}px)`,transition:"all 0.6s ease"},children:"Your Exam. Your Rank. Your Success."}),t.jsx("div",{style:{position:"absolute",bottom:50,display:"flex",gap:10,zIndex:10,opacity:s?1:0,transition:"opacity 0.4s ease 0.3s"},children:[0,1,2].map(e=>t.jsx("div",{style:{width:7,height:7,borderRadius:"50%",background:"rgba(212,175,55,0.6)",animation:`dot 1.2s ease-in-out ${e*.2}s infinite`}},e))}),t.jsx("style",{children:`
        @keyframes ring {
          0%,100% { transform: scale(1); opacity: 0.6; }
          50%      { transform: scale(1.05); opacity: 0.3; }
        }
        @keyframes dot {
          0%,100% { transform: translateY(0); opacity: 0.5; }
          50%      { transform: translateY(-8px); opacity: 1; }
        }
      `})]})}export{f as default};
