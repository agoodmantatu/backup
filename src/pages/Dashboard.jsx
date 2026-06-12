import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'

// ── Student Core Widgets ──────────────────────────────────────────
import ExamReadinessWidget   from '../components/dashboard/ExamReadinessWidget'
import StreakWidget           from '../components/dashboard/StreakWidget'
import CoinsWidget            from '../components/dashboard/CoinsWidget'
import QuickTestWidget        from '../components/dashboard/QuickTestWidget'
import DailyQuizWidget        from '../components/dashboard/DailyQuizWidget'
import SubjectBarsWidget      from '../components/dashboard/SubjectBarsWidget'
import ScoreTrendWidget       from '../components/dashboard/ScoreTrendWidget'
import LeaderboardWidget      from '../components/dashboard/LeaderboardWidget'
import RecentActivityWidget   from '../components/dashboard/RecentActivityWidget'

// ==================================================================
// 🧑‍🏫 AUTHENTIC MENTOR WORKSPACE
// ==================================================================
function MentorDashboardView({ profile, email, greeting }) {
  const mentorName = profile.fullName || profile.name || email.split('@')[0]
  
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] font-poppins">
          {greeting}, Coach {mentorName}! 🧑‍🏫
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Current Role: <span className="font-semibold text-[#1E3A5F]">{profile.currentJob || 'Expert Educator'}</span>
          {profile.experience && ` · Experience: ${profile.experience}`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Expert Subjects</h3>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {profile.expertSubjects?.map(subject => (
              <span key={subject} className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg text-xs font-medium">
                {subject}
              </span>
            )) || <span className="text-xs text-slate-400">None selected</span>}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Target Exam Domain</h3>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {profile.expertExams?.map(exam => (
              <span key={exam} className="px-2.5 py-1 bg-blue-50 text-[#1E3A5F] rounded-lg text-xs font-medium">
                {exam}
              </span>
            )) || <span className="text-xs text-slate-400">None mapped</span>}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Availability & Payout</h3>
          <p className="text-lg font-bold text-[#1E3A5F] mt-2">{profile.availability || 'Flexible Time'}</p>
          <p className="text-[11px] text-slate-400 mt-1 truncate">UPI ID: {profile.upi || 'Not linked'}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-[#1E3A5F] mb-1">📥 Active Doubt Solver Queue</h3>
        <p className="text-xs text-slate-400 mb-4">
          Incoming student tickets matching your support languages ({profile.replyLangs?.join(', ') || 'English'}) will populate below.
        </p>
        <div className="p-8 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center text-slate-400 text-sm font-medium">
          No pending student doubts found in your queue right now.
        </div>
      </div>
    </AppLayout>
  )
}

// ==================================================================
// 🏫 AUTHENTIC INSTITUTION WORKSPACE
// ==================================================================
function InstitutionDashboardView({ profile, greeting }) {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] font-poppins">
          {greeting}, {profile.institutionName || 'Campus Admin Hub'}! 🏫
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Authorized Registrar: <span className="font-semibold text-[#1E3A5F]">{profile.contactName}</span> ({profile.contactDesignation || 'Administrator'})
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Provisioned Students</h3>
          <p className="text-2xl font-black text-[#1E3A5F] mt-2">{profile.studentEmails?.length || 0}</p>
          <p className="text-[11px] text-slate-400 mt-1">Scale Group Target: {profile.studentCount || 'N/A'}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Question Processing Mode</h3>
          <p className="text-lg font-bold text-[#1E3A5F] capitalize mt-2">{profile.questionFormat || 'Manual Upload'} Engine</p>
          <p className="text-[11px] text-slate-400 mt-1">Directly routes to localized test engines</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Campus Footprint</h3>
          <p className="text-sm font-bold text-[#1E3A5F] mt-2 truncate">{profile.city}, {profile.state}</p>
          <p className="text-[11px] text-slate-400 mt-1">Postal Pincode: {profile.pincode || 'N/A'}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-[#1E3A5F] text-sm mb-3">📋 Managed Exam Curriculums</h3>
        <div className="flex flex-wrap gap-2">
          {profile.examsConducted?.map(exam => (
            <span key={exam} className="px-3 py-1 bg-slate-100 text-slate-600 font-semibold rounded-xl text-xs">
              {exam}
            </span>
          )) || <span className="text-xs text-slate-400">No curating streams activated yet</span>}
        </div>
      </div>
    </AppLayout>
  )
}

// ==================================================================
// 👨‍👩‍👧 AUTHENTIC FAMILY WORKSPACE
// ==================================================================
function FamilyDashboardView({ profile, greeting }) {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] font-poppins">
          {greeting}, {profile.familyName || 'Family Workspace'}! 👨‍👩‍👧
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Primary Guardian: <span className="font-semibold text-[#1E3A5F]">{profile.headName}</span> ({profile.headRelation || 'Supervisor'})
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm col-span-2">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Core Educational Mission</h3>
          <p className="text-sm font-bold text-[#1E3A5F] bg-amber-50/40 p-3 rounded-xl border border-amber-100/50">
            🎯 "{profile.goalTogether || 'Coordinated learning path for all dependents.'}"
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sub-Profiles Linked</h3>
          <p className="text-2xl font-black text-[#1E3A5F] mt-1">{profile.members?.length || 0} Dependent(s)</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-[#1E3A5F] text-sm mb-4">👥 Real-Time Student Member Progress</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {profile.members?.map(member => (
            <div key={member.id} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#1E3A5F] font-bold flex items-center justify-center text-sm shadow-sm">
                {member.name?.[0]?.toUpperCase() || 'M'}
              </div>
              <div className="truncate">
                <h4 className="font-bold text-[#1E3A5F] text-xs truncate">
                  {member.name} <span className="text-[10px] text-slate-400 font-normal">({member.relation})</span>
                </h4>
                <p className="text-[11px] text-slate-500 truncate">{member.exam} · {member.email}</p>
              </div>
            </div>
          )) || <p className="text-xs text-slate-400">No sub-profiles linked to this dashboard container.</p>}
        </div>
      </div>
    </AppLayout>
  )
}

// ==================================================================
// 🚀 PRODUCTION PLATFORM ROUTER TRAFFIC CONTROLLER
// ==================================================================
export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const role = localStorage.getItem('tryit_role')
    const email = localStorage.getItem('tryit_email')

    // Safe authorization shield fallback
    if (!email) {
      navigate('/login')
      return
    }

    // Read authentic onboarding storage block directly
    const storedData = localStorage.getItem('onboardingData')
    let profile = {}
    
    if (storedData) {
      try {
        profile = JSON.parse(storedData)
      } catch (err) {
        console.error("Failed to extract authentic onboarding data object", err)
      }
    }

    setUser({
      email,
      role: role || 'student',
      profile
    })
    setLoading(false)
  }, [navigate])

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-slate-500 text-sm font-medium">Assembling workspace layout...</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (!user) return null

  // System greeting parameters
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  // 🔑 SWITCH ROUTING BASED ON AUTHENTIC ACCOUNT ROLE MAPS
  if (user.role === 'mentor') {
    return <MentorDashboardView profile={user.profile} email={user.email} greeting={greeting} />
  }
  if (user.role === 'institution') {
    return <InstitutionDashboardView profile={user.profile} greeting={greeting} />
  }
  if (user.role === 'family') {
    return <FamilyDashboardView profile={user.profile} greeting={greeting} />
  }

  // 👇 DYNAMIC STUDENT WORKSPACE VIEW (When role === 'student')
  const studentName = user.profile?.name || user.email.split('@')[0]
  const targetExams = user.profile?.exams || []
  const primaryExam = targetExams[0] || 'General Assessment Track'
  const studyLanguage = user.profile?.studyLang || 'English'

  return (
    <AppLayout>
      {/* Dynamic Header Frame */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] font-poppins">
          {greeting}, {studentName}! 👋
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Preparing for{' '}
          <span className="font-semibold text-[#1E3A5F]">{primaryExam}</span>
          {' · '}Language Stream: <span className="font-medium text-slate-600">{studyLanguage}</span>
        </p>
        
        {/* Exam Tracking Switcher Chips */}
        {targetExams.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {targetExams.map((exam, index) => (
              <button
                key={exam}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200
                  ${index === 0 ? 'bg-[#D4AF37] text-[#1E3A5F]' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#D4AF37]'}`}
              >
                {exam}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Production Widget Grid Layout */}
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