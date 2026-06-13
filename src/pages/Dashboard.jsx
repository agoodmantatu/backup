// FILE: src/pages/Dashboard.jsx
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (!user) return null

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  })()

  const firstName = user.name?.split(' ')[0] || user.email?.split('@')[0] || 'there'
  const primaryExam = user.exams?.[0]
  const subjects = user.subjects || []
  const coinsThisWeek = user.coinsThisWeek ?? 0
  const coinsWeekGoal = 500
  const streakDays = ['M','T','W','T','F','S','S']
  const streak = user.streak || 0

  return (
    <AppLayout title="Dashboard">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1E3A5F] font-poppins">
          {greeting}, {firstName}! 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {primaryExam
            ? <>Preparing for <strong className="text-[#1E3A5F]">{primaryExam.name}</strong> · Language Stream: English</>
            : <>Pick your exam to unlock a personalized study plan →{' '}
                <button onClick={()=>navigate('/all-exams')} className="text-[#D4AF37] font-semibold underline">Browse Exams</button>
              </>}
        </p>
      </div>

      {/* ── Exam Readiness ─────────────────────────────────────── */}
      {primaryExam ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="font-bold text-[#1E3A5F] font-poppins">Exam Readiness</p>
              <p className="text-xs text-slate-400">{primaryExam.name} · {primaryExam.examDate || 'Date TBD'}</p>
            </div>
          </div>
          <span className="text-xs font-semibold bg-green-50 text-green-700 px-3 py-1.5 rounded-full">
            Predicted: {primaryExam.readiness ? `${Math.round(primaryExam.readiness*1.5+50)}-${Math.round(primaryExam.readiness*1.6+62)}` : '—'} / 200 · {primaryExam.readiness >= 50 ? 'ON TRACK ✅' : 'GET STARTED'}
          </span>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-5 mb-6 text-center">
          <p className="text-3xl mb-2">🎯</p>
          <p className="font-bold text-[#1E3A5F] font-poppins mb-1">No exam selected yet</p>
          <p className="text-slate-400 text-sm mb-3">Choose an exam to see your personalized readiness score.</p>
          <button onClick={()=>navigate('/all-exams')}
            className="bg-[#1E3A5F] text-[#D4AF37] font-semibold text-sm rounded-xl px-5 py-2">
            Browse 9,600+ Exams →
          </button>
        </div>
      )}

      {/* ── Main grid ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Study Streak */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="font-bold text-[#1E3A5F] font-poppins mb-1">🔥 Study Streak</p>
          <p className="text-xs text-slate-400 mb-3">consecutive days</p>
          <div className="flex gap-1.5 mb-2">
            {streakDays.map((d,i)=>(
              <div key={i} className={`flex-1 h-9 rounded-lg flex items-center justify-center text-xs font-bold
                ${i < streak ? 'bg-[#D4AF37] text-[#1E3A5F]' : i === streak ? 'bg-[#1E3A5F] text-white' : 'bg-slate-100 text-slate-400'}`}>
                {i < streak ? '✓' : d}
              </div>
            ))}
          </div>
          {streak === 0 ? (
            <p className="text-xs text-slate-400">Complete a test today to start your streak!</p>
          ) : (
            <p className="text-xs text-[#D4AF37]">❄️ Use Streak Freeze ({user.streakFreezes ?? 0} left)</p>
          )}
        </div>

        {/* Coins */}
        <div className="rounded-2xl p-5" style={{ background:'linear-gradient(135deg,#D4AF37,#E8C84A)' }}>
          <p className="font-bold text-[#1E3A5F] font-poppins mb-1">🪙 Coins</p>
          <div className="flex justify-between text-xs text-[#1E3A5F]/70 mb-1">
            <span>This week</span><span>{coinsThisWeek}/{coinsWeekGoal}</span>
          </div>
          <div className="h-2 rounded-full bg-white/30 mb-3 overflow-hidden">
            <div className="h-full bg-[#1E3A5F] rounded-full" style={{ width:`${Math.min(100,(coinsThisWeek/coinsWeekGoal)*100)}%` }}/>
          </div>
          {(user.coinHistory || []).length === 0 ? (
            <p className="text-xs text-[#1E3A5F]/70 mb-3">Earn coins by playing games, daily quizzes, and helping in Guru Hub.</p>
          ) : (
            <div className="text-xs text-[#1E3A5F]/80 space-y-1 mb-3">
              {user.coinHistory.map((h,i)=>(
                <div key={i} className="flex justify-between"><span>{h.label}</span><span>+{h.amount} 🪙</span></div>
              ))}
            </div>
          )}
          <button onClick={()=>navigate('/wallet')} className="w-full bg-[#1E3A5F] text-white rounded-xl py-2 text-sm font-semibold">
            View Wallet →
          </button>
        </div>

        {/* Daily Quiz */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="font-bold text-[#1E3A5F] font-poppins mb-1">📅 Daily Quiz</p>
          <p className="text-xs text-slate-500 mb-3">Today · 5 Questions · Current Affairs Focus</p>
          <div className="h-1.5 rounded-full bg-slate-100 mb-3"/>
          <button onClick={()=>navigate('/daily-quiz')} className="w-full bg-[#D4AF37] text-[#1E3A5F] rounded-xl py-2 text-sm font-bold mb-2">
            Start Daily Quiz →
          </button>
          <p className="text-xs text-green-600 text-center">+50 🪙 bonus waiting!</p>
        </div>
      </div>

      {/* ── Quick Test + Score Trend ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <div className="bg-[#1E3A5F] rounded-2xl p-5">
          <p className="font-bold text-white font-poppins mb-3">⚡ Quick Test</p>
          <div className="flex gap-2">
            {['Practice','Mock','Speed'].map(m=>(
              <button key={m} onClick={()=>navigate(`/test/quick?mode=${m.toLowerCase()}`)}
                className="flex-1 bg-white/10 hover:bg-[#D4AF37] hover:text-[#1E3A5F] text-white rounded-xl py-2.5 text-sm font-semibold transition-colors">
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex justify-between items-center mb-3">
            <p className="font-bold text-[#1E3A5F] font-poppins">📈 Score Trend</p>
            <span className="text-xs text-slate-400">Last 30 days</span>
          </div>
          {user.testsCompleted > 0 ? (
            <div className="h-20 flex items-end gap-1">
              {(user.scoreTrend || []).map((v,i)=>(
                <div key={i} className="flex-1 bg-[#D4AF37] rounded-t" style={{ height:`${v}%` }}/>
              ))}
            </div>
          ) : (
            <div className="h-20 flex items-center justify-center text-center">
              <p className="text-sm text-slate-400">Take your first test to see your score trend 📊</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Subject Accuracy ─────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6">
        <p className="font-bold text-[#1E3A5F] font-poppins mb-3">📚 Subject Accuracy</p>
        {subjects.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-3xl mb-2">📊</p>
            <p className="text-slate-500 text-sm mb-3">No subject data yet — complete a few tests to see your strengths and weak areas here.</p>
            <button onClick={()=>navigate('/test/quick')} className="bg-[#1E3A5F] text-[#D4AF37] font-semibold text-sm rounded-xl px-5 py-2">
              Take a Test →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {subjects.map(s=>(
              <div key={s.name} className="bg-slate-50 rounded-xl p-3 text-center">
                <p className="text-2xl mb-1">{s.emoji}</p>
                <p className="text-sm font-semibold text-[#1E3A5F]">{s.name}</p>
                <p className="text-lg font-bold" style={{ color: s.accuracy >= 75 ? '#22C55E' : s.accuracy >= 50 ? '#D4AF37' : '#EF4444' }}>
                  {s.accuracy}%
                </p>
                <p className="text-xs text-slate-400">{s.trend === 'up' ? '↑ improving' : s.trend === 'down' ? '↓ needs work' : '→ steady'}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Your Rank / Leaderboard ──────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex justify-between items-center mb-3">
          <p className="font-bold text-[#1E3A5F] font-poppins">🏆 Your All-India Rank</p>
          <button onClick={()=>navigate('/the-hall')} className="text-xs text-[#D4AF37] font-semibold">View Leaderboard →</button>
        </div>
        {user.rank ? (
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-[#1E3A5F] font-poppins">#{user.rank.toLocaleString()}</span>
            <div>
              <p className="text-sm text-slate-500">out of all {primaryExam?.name || 'TryIT'} aspirants</p>
              <p className="text-xs text-green-600">{user.avgScore ? `Avg score: ${user.avgScore}%` : ''}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-3xl mb-2">🏆</p>
            <p className="text-slate-500 text-sm mb-3">You're unranked — complete your first test to join the leaderboard!</p>
            <button onClick={()=>navigate('/test/quick')} className="bg-[#D4AF37] text-[#1E3A5F] font-bold text-sm rounded-xl px-5 py-2">
              Take Your First Test →
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  )
}

