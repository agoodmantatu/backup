import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import ExamReadinessWidget   from '../components/dashboard/ExamReadinessWidget'
import StreakWidget           from '../components/dashboard/StreakWidget'
import CoinsWidget            from '../components/dashboard/CoinsWidget'
import QuickTestWidget        from '../components/dashboard/QuickTestWidget'
import DailyQuizWidget        from '../components/dashboard/DailyQuizWidget'
import SubjectBarsWidget      from '../components/dashboard/SubjectBarsWidget'
import ScoreTrendWidget       from '../components/dashboard/ScoreTrendWidget'
import LeaderboardWidget      from '../components/dashboard/LeaderboardWidget'
import RecentActivityWidget   from '../components/dashboard/RecentActivityWidget'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Retrieve user data from localStorage
    const role = localStorage.getItem('tryit_role')
    const email = localStorage.getItem('tryit_email')
    const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}')
    
    if (!email) {
      // No user found, redirect to login
      navigate('/login')
      return
    }

    // Build user object matching the expected structure
    const fullName = onboardingData.fullName || email.split('@')[0]
    const exams = onboardingData.exams && onboardingData.exams.length > 0 
      ? onboardingData.exams.map((exam, idx) => ({
          id: idx,
          name: exam,
          examDate: null, // Could be added later
          readiness: Math.floor(Math.random() * 40) + 60 // Mock readiness 60-100%
        }))
      : [{ id: 0, name: 'Your Exam', examDate: null, readiness: 75 }]

    setUser({
      name: fullName,
      email: email,
      role: role,
      exams: exams,
      ...onboardingData
    })
    setLoading(false)
  }, [navigate])

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-slate-500">Loading your dashboard...</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (!user) return null

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const firstName = user.name?.split(' ')[0] || 'Guest'

  // Get primary exam (first one)
  const primaryExam = user.exams?.[0] || { name: 'Your Exam', examDate: null, readiness: 75 }

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] font-poppins">
          {greeting}, {firstName}! 👋
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Preparing for{' '}
          <span className="font-semibold text-[#1E3A5F]">{primaryExam.name}</span>
          {primaryExam.examDate ? ` · Exam: ${primaryExam.examDate}` : ''}
          {' · '}{primaryExam.readiness}% ready
        </p>
        {/* Exam switcher chips */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {user.exams?.map((e, i) => (
            <button
              key={e.id}
              className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all
                ${i === 0 ? 'bg-[#D4AF37] text-[#1E3A5F]' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#D4AF37]'}`}
            >
              {e.name}
            </button>
          ))}
        </div>
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <ExamReadinessWidget />
        <StreakWidget />
        <CoinsWidget />
        <DailyQuizWidget />
        <QuickTestWidget />
        <ScoreTrendWidget />
        <SubjectBarsWidget />
        <LeaderboardWidget />
        <RecentActivityWidget />
      </div>
    </AppLayout>
  )
}