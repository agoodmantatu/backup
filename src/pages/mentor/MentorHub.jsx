// src/pages/mentor/MentorHub.jsx — home page for role==='mentor'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import { useAuth } from '../../context/AuthContext'

const SAMPLE_DOUBTS = [
  { id: 1, subject: 'Mathematics', question: 'How do I solve quadratic inequalities on a number line?', time: '12 min ago', coins: 5 },
  { id: 2, subject: 'History',     question: 'What were the main causes of the 1857 revolt?',            time: '34 min ago', coins: 5 },
  { id: 3, subject: 'Physics',     question: 'Explain Bernoulli\'s principle with a real-life example.',  time: '1 hr ago',   coins: 5 },
]

const QUICK_LINKS = [
  { emoji: '✍️', label: 'Answer Doubts',    path: '/guru-hub',              desc: 'Help students & earn coins' },
  { emoji: '📊', label: 'Analytics',         path: '/mentor-hub/analytics',  desc: 'Your impact metrics' },
  { emoji: '💰', label: 'Cashback Center',   path: '/mentor-hub/cashback',   desc: 'Track your referral earnings' },
  { emoji: '🎟️', label: 'Coupon Manager',   path: '/mentor-hub/coupons',    desc: 'Create discount codes' },
]

export default function MentorHub() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  if (loading) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',
      justifyContent:'center',background:'linear-gradient(135deg,#1E3A5F,#0F2140)'}}>
      <p style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif',fontSize:18}}>Loading...</p>
    </div>
  )
  if (!user) return null

  return (
    <AppLayout title="Mentor Hub">
      <div className="max-w-2xl mx-auto space-y-6 p-4">

        {/* Welcome */}
        <div className="bg-gradient-to-r from-[#064E3B] to-[#047857] rounded-2xl p-5 text-white">
          <p className="text-sm opacity-70">Welcome back, Mentor</p>
          <p className="text-2xl font-bold">{user.name} 🎓</p>
          {user.mentorSubjects && (
            <p className="text-sm opacity-70 mt-1">Subjects: {Array.isArray(user.mentorSubjects) ? user.mentorSubjects.join(', ') : user.mentorSubjects}</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Answers Given',   value: user.guruPoints ?? 0, emoji: '✍️' },
            { label: 'Coins Earned',     value: user.coins ?? 0,      emoji: '🪙' },
            { label: 'Students Helped',  value: 0,                    emoji: '👨‍🎓' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
              <p className="text-2xl">{s.emoji}</p>
              <p className="text-2xl font-black text-[#1E3A5F]">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3">
          {QUICK_LINKS.map(l => (
            <button
              key={l.label}
              onClick={() => navigate(l.path)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-left hover:shadow-md hover:border-[#D4AF37] transition"
            >
              <span className="text-2xl">{l.emoji}</span>
              <p className="font-bold text-[#1E3A5F] mt-2 text-sm">{l.label}</p>
              <p className="text-gray-400 text-xs">{l.desc}</p>
            </button>
          ))}
        </div>

        {/* Recent doubts */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-[#1E3A5F]">Recent Doubts You Can Help</h2>
            <button onClick={() => navigate('/guru-hub')} className="text-[#D4AF37] text-xs font-semibold hover:underline">See all →</button>
          </div>
          <ul className="divide-y divide-gray-50">
            {SAMPLE_DOUBTS.map(d => (
              <li key={d.id} className="p-4 flex items-start gap-3 hover:bg-gray-50 cursor-pointer transition" onClick={() => navigate('/guru-hub')}>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-[#064E3B] bg-emerald-50 px-2 py-0.5 rounded-full">{d.subject}</span>
                  <p className="text-sm text-gray-700 mt-1 line-clamp-2">{d.question}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{d.time}</p>
                </div>
                <span className="text-xs font-bold text-[#D4AF37] whitespace-nowrap">+{d.coins} 🪙</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </AppLayout>
  )
}