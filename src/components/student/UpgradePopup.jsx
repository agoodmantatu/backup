// src/components/student/UpgradePopup.jsx
import { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { getPricing } from '../../lib/studentLib'

const LIMIT_MESSAGES = {
  tests:      { icon:'📝', title:'3 free tests used today',    sub:'Unlock unlimited tests'    },
  games:      { icon:'🎮', title:'Free games limit reached',   sub:'Play all 24 games'         },
  doubts:     { icon:'🤝', title:'Free doubt limit reached',   sub:'Post unlimited doubts'     },
  leaderboard:{ icon:'🏆', title:'See your real All-India rank',sub:'Full leaderboard access'  },
  theme:      { icon:'🎨', title:'Premium theme locked',       sub:'Unlock 20 themes'          },
  bookmark:   { icon:'🔖', title:'Bookmark limit reached',     sub:'Save unlimited content'    },
}

export default function UpgradePopup({ type, category='ssc_railway', onClose, onUpgrade }) {
  const { theme } = useTheme()
  const isDark  = theme?.isDark ?? false
  const accent  = theme?.accent ?? '#C9A84C'
  const accentL = theme?.accentLight ?? '#E8C44A'
  const primD   = theme?.primaryDark ?? '#0F2140'
  const primary = theme?.primary ?? '#1E3A5F'

  const [pricing,  setPricing]  = useState(null)
  const [selected, setSelected] = useState('day1')

  const txt  = isDark ? '#fff' : '#0F1020'
  const muted= isDark ? 'rgba(255,255,255,0.55)' : '#64748B'
  const bdr  = isDark ? 'rgba(255,255,255,0.08)' : '#E2E8F0'

  const msg = LIMIT_MESSAGES[type] || LIMIT_MESSAGES.tests

  useEffect(() => {
    getPricing(category).then(setPricing).catch(() => {})
  }, [category])

  const OPTIONS = pricing ? [
    { id:'day1',    label:'1 Day Pass',  price:pricing.day_1_price,   badge:null         },
    { id:'day3',    label:'3 Day Pass',  price:pricing.day_3_price,   badge:null         },
    { id:'day7',    label:'7 Day Pass',  price:pricing.day_7_price,   badge:'Popular'    },
    { id:'monthly', label:'Pro Monthly', price:pricing.monthly_price, badge:null         },
    { id:'yearly',  label:'Pro Yearly',  price:pricing.yearly_price,  badge:'Best Value' },
  ] : []

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:9999,
      background:'rgba(0,0,0,0.7)',
      display:'flex', alignItems:'center',
      justifyContent:'center', padding:'16px'
    }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:isDark
          ?`linear-gradient(135deg,${primary},${primD})`
          :'#fff',
        borderRadius:24, padding:'28px 24px',
        width:'100%', maxWidth:380,
        border:`1px solid ${accent}30`,
        boxShadow:'0 20px 60px rgba(0,0,0,0.3)',
      }}>
        <div style={{textAlign:'center',marginBottom:20}}>
          <div style={{fontSize:40,marginBottom:8}}>{msg.icon}</div>
          <p style={{color:txt,fontFamily:'Poppins,sans-serif',
            fontWeight:900,fontSize:18,margin:'0 0 4px'}}>{msg.title}</p>
          <p style={{color:muted,fontSize:13,margin:0}}>{msg.sub}</p>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:16}}>
          {OPTIONS.map(opt=>(
            <button key={opt.id} onClick={()=>setSelected(opt.id)}
              style={{
                display:'flex',alignItems:'center',
                justifyContent:'space-between',
                padding:'12px 14px',borderRadius:12,cursor:'pointer',
                border:`2px solid ${selected===opt.id?accent:bdr}`,
                background:selected===opt.id?`${accent}15`:'transparent',
                transition:'all 0.2s'
              }}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{
                  width:16,height:16,borderRadius:'50%',
                  border:`2px solid ${selected===opt.id?accent:muted}`,
                  background:selected===opt.id?accent:'transparent'
                }}/>
                <span style={{color:txt,fontSize:13,fontWeight:600}}>
                  {opt.label}
                </span>
                {opt.badge&&(
                  <span style={{
                    background:`${accent}20`,color:accent,
                    fontSize:9,fontWeight:700,
                    padding:'2px 6px',borderRadius:20
                  }}>{opt.badge}</span>
                )}
              </div>
              <span style={{color:accent,fontWeight:900,
                fontFamily:'Poppins,sans-serif',fontSize:15}}>
                {opt.price ? `₹${opt.price}` : '...'}
              </span>
            </button>
          ))}
        </div>

        <div style={{
          background:`${accent}10`,border:`1px solid ${accent}25`,
          borderRadius:10,padding:'8px 12px',
          marginBottom:16,textAlign:'center'
        }}>
          <p style={{color:accent,fontSize:11,fontWeight:700,margin:0}}>
            💡 Refer 1 friend who buys Pro → get 7 days free!
          </p>
        </div>

        <button onClick={()=>onUpgrade(selected)} style={{
          width:'100%',
          background:`linear-gradient(135deg,${accent},${accentL})`,
          border:'none',borderRadius:14,padding:'14px',
          color:primD,fontWeight:800,fontSize:15,
          cursor:'pointer',fontFamily:'Poppins,sans-serif',
          boxShadow:`0 6px 20px ${accent}44`,
          marginBottom:8
        }}>
          Unlock Now →
        </button>
        <button onClick={onClose} style={{
          width:'100%',background:'transparent',
          border:`1px solid ${bdr}`,borderRadius:12,
          padding:'10px',color:muted,fontSize:12,cursor:'pointer'
        }}>
          Continue with free plan
        </button>
      </div>
    </div>
  )
}
