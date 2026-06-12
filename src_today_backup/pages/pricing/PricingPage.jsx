import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import { useToast } from '../../context/ToastContext'

const PLANS = [
  {
    id:'trial', name:'₹19 Trial', price:19, period:'7 days',
    color:'#22C55E', bg:'linear-gradient(135deg,#065F46,#047857)',
    badge:'START HERE', popular:false,
    features:[
      '7 full mock tests (any exam)',
      'All-India ranking after each test',
      'Guru Hub — 5 doubt questions',
      '7-layer explanations',
      'Career Compass quiz',
      'Access in all 40+ languages',
      'Student ID Card (Royal Gold template)',
    ],
    cta:'Start ₹19 Trial',
  },
  {
    id:'plus', name:'TryIT Plus', price:199, period:'month',
    color:'#1E3A5F', bg:'linear-gradient(135deg,#1E3A5F,#0F2140)',
    badge:'MOST POPULAR', popular:true,
    features:[
      'Unlimited mock tests',
      'All-India + State rankings',
      'Unlimited Guru Hub doubts',
      'All 5 ID Card templates + 3D flip',
      'Focus Mode + Ambient sounds',
      'Current Affairs daily',
      'Study Planner + Roadmap',
      'The Hall (join or create)',
      'Brain Games unlimited',
      'Download question PDFs',
    ],
    cta:'Get Plus — ₹199/mo',
  },
  {
    id:'pro', name:'TryIT Pro', price:399, period:'month',
    color:'#D4AF37', bg:'linear-gradient(135deg,#92400E,#B45309)',
    badge:'BEST VALUE', popular:false,
    features:[
      'Everything in Plus',
      'Guru Books — 3 free/month',
      'Mentor 1-on-1 doubt sessions',
      'Previous 10-year PYQ bank',
      'Performance AI analysis',
      'Family Hub (4 members)',
      'Centre test access unlimited',
      'Priority support',
      '⚡ Baahuveer badge on signup',
    ],
    cta:'Go Pro — ₹399/mo',
  },
  {
    id:'annual', name:'Pro Annual', price:2999, period:'year',
    color:'#D4AF37', bg:'linear-gradient(135deg,#1E3A5F,#D4AF37)',
    badge:'SAVE ₹1,789', popular:false,
    yearSaving:'₹1,789 saved vs monthly',
    features:[
      'Everything in Pro',
      '12 months at ₹250/mo effectively',
      'Free Guru Book every month',
      'Dedicated mentor assignment',
      'Early access to new features',
      '🏆 The Legend badge on signup',
    ],
    cta:'Get Annual — ₹2,999/yr',
  },
]

export default function PricingPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [selected, setSelected] = useState('plus')

  const handleBuy = (plan) => {
    if (plan.id === 'trial') {
      showToast('success', '🎉 Redirecting to ₹19 Trial checkout...')
    } else {
      showToast('info', `Opening payment for ${plan.name}...`)
    }
  }

  return (
    <AppLayout>
      <div style={{ textAlign:'center', marginBottom:36 }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#1E3A5F', fontSize:'clamp(24px,4vw,38px)', marginBottom:10 }}>
          Simple, Honest Pricing
        </h1>
        <p style={{ color:'#64748B', fontSize:16 }}>
          Start for ₹19. No hidden fees. Cancel anytime.
        </p>
        <div style={{ marginTop:12, display:'inline-flex', alignItems:'center', gap:8, background:'#DCFCE7', border:'1px solid #22C55E', borderRadius:20, padding:'6px 16px' }}>
          <span style={{ color:'#15803D', fontSize:13, fontWeight:700 }}>🤝 6 communities get 100% FREE for life — </span>
          <button onClick={() => navigate('/equity')} style={{ background:'none', border:'none', color:'#15803D', fontWeight:800, cursor:'pointer', fontSize:13, textDecoration:'underline' }}>Check eligibility →</button>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,260px),1fr))', gap:16, marginBottom:32 }}>
        {PLANS.map(plan => (
          <div key={plan.id} onClick={() => setSelected(plan.id)}
            style={{ borderRadius:24, overflow:'hidden', cursor:'pointer',
              border:`2px solid ${selected===plan.id?plan.color:'#E2E8F0'}`,
              boxShadow: selected===plan.id ? `0 12px 32px ${plan.color}33` : '0 2px 12px rgba(0,0,0,0.05)',
              transform: selected===plan.id ? 'translateY(-4px)' : 'none',
              transition:'all 0.2s', background:'#fff' }}>

            {/* Header */}
            <div style={{ background:plan.bg, padding:'20px 22px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:800, color:'#fff', fontSize:18 }}>{plan.name}</p>
                <span style={{ background:'rgba(255,255,255,0.2)', color:'#fff', fontSize:9, fontWeight:800, padding:'3px 10px', borderRadius:20, letterSpacing:'1px' }}>{plan.badge}</span>
              </div>
              <div style={{ display:'flex', alignItems:'baseline', gap:4 }}>
                <span style={{ fontFamily:'Poppins,sans-serif', fontWeight:900, color:'#fff', fontSize:34 }}>₹{plan.price.toLocaleString()}</span>
                <span style={{ color:'rgba(255,255,255,0.65)', fontSize:13 }}>/ {plan.period}</span>
              </div>
              {plan.yearSaving && <p style={{ color:'rgba(255,255,255,0.8)', fontSize:12, marginTop:4 }}>{plan.yearSaving}</p>}
            </div>

            {/* Features */}
            <div style={{ padding:'18px 20px' }}>
              {plan.features.map((f,i) => (
                <div key={i} style={{ display:'flex', gap:8, marginBottom:9 }}>
                  <span style={{ color: plan.color, fontWeight:800, fontSize:14, flexShrink:0 }}>✓</span>
                  <span style={{ color:'#475569', fontSize:13, lineHeight:1.4 }}>{f}</span>
                </div>
              ))}
              <button onClick={() => handleBuy(plan)}
                style={{ width:'100%', marginTop:16, padding:'13px', borderRadius:14, border:'none', cursor:'pointer', background: plan.popular ? 'linear-gradient(135deg,#1E3A5F,#0F2140)' : `linear-gradient(135deg,${plan.color},${plan.color}CC)`, color: plan.popular?'#D4AF37':'#fff', fontFamily:'Poppins,sans-serif', fontWeight:800, fontSize:14 }}>
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={{ background:'#F8FAFC', borderRadius:22, padding:24, border:'1.5px solid #E2E8F0' }}>
        <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:18, marginBottom:18 }}>Frequently Asked</p>
        {[
          ['Can I cancel anytime?','Yes. Cancel from Settings → Subscription. No questions asked. Access continues until end of billing period.'],
          ['Does the ₹19 trial auto-renew?','No. It\'s a one-time ₹19 payment. No automatic charges. You choose to upgrade after.'],
          ['Are my 6 equity tiers really free forever?','Yes, 100%. Verified Hope Scholars, Divyang, Swachhta Warriors, Veer Nari families, Transgender youth, and Agrarian Distress families get full Pro access for life.'],
          ['Can I switch plans mid-month?','Yes. Upgrade instantly. Downgrade at end of billing period. Prorated credits applied.'],
        ].map(([q,a],i) => (
          <div key={i} style={{ marginBottom: i<3?16:0, paddingBottom: i<3?16:0, borderBottom: i<3?'1px solid #E2E8F0':'none' }}>
            <p style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, color:'#1E3A5F', fontSize:14, marginBottom:6 }}>❓ {q}</p>
            <p style={{ color:'#64748B', fontSize:13, lineHeight:1.65 }}>{a}</p>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
