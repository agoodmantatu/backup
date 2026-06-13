import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import { useAuth } from '../../context/AuthContext'

const MILESTONE_SETS = {
  govt_central: [
    { id: 'foundation', label: 'Foundation', emoji: '📚', desc: 'Basic concepts, syllabus understanding', weeks: '1–2' },
    { id: 'prelims', label: 'Prelims Prep', emoji: '✏️', desc: 'Topic-wise practice, mock tests', weeks: '3–6' },
    { id: 'mains', label: 'Mains Prep', emoji: '📝', desc: 'Advanced topics, writing skills', weeks: '7–10' },
    { id: 'interview', label: 'Interview / Final', emoji: '🎤', desc: 'Personality test, revision', weeks: '11–12' },
  ],
  banking: [
    { id: 'foundation', label: 'Foundation', emoji: '📚', desc: 'Quant, Reasoning, English basics', weeks: '1–2' },
    { id: 'prelims', label: 'Prelims', emoji: '✏️', desc: 'Section-wise mock tests', weeks: '3–5' },
    { id: 'mains', label: 'Mains', emoji: '📝', desc: 'Full-length mocks, GA preparation', weeks: '6–9' },
    { id: 'interview', label: 'Interview', emoji: '🎤', desc: 'Banking awareness, GD prep', weeks: '10–12' },
  ],
  school_competitive: [
    { id: 'foundation', label: 'Foundation', emoji: '📚', desc: 'NCERT / board concepts', weeks: '1–3' },
    { id: 'practice', label: 'Practice', emoji: '✏️', desc: 'Topic tests, problem solving', weeks: '4–7' },
    { id: 'revision', label: 'Full Revision', emoji: '🔄', desc: 'Formula sheets, mock papers', weeks: '8–10' },
    { id: 'exam', label: 'Exam Ready', emoji: '🏆', desc: 'Final mocks, exam strategy', weeks: '11–12' },
  ],
  default: [
    { id: 'foundation', label: 'Foundation', emoji: '📚', desc: 'Understand syllabus & basics', weeks: '1–2' },
    { id: 'practice', label: 'Core Practice', emoji: '✏️', desc: 'Topic-wise tests & revision', weeks: '3–7' },
    { id: 'mock', label: 'Full Mocks', emoji: '📝', desc: 'Timed mock tests', weeks: '8–10' },
    { id: 'final', label: 'Final Prep', emoji: '🏆', desc: 'Weak area focus, strategy', weeks: '11–12' },
  ],
}

export default function ExamUniverse() {
  const { examId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [exam, setExam] = useState(null)

  useEffect(() => {
    fetch('/data/exams.json')
      .then(r => r.json())
      .then(data => {
        const found = (data.exams || []).find(e => e.id === examId)
        setExam(found || { id: examId, name: examId, emoji: '📋', category: 'default' })
      })
  }, [examId])

  if (!user) return null

  const userExam = (user.exams || []).find(e => e.id === examId)
  const readiness = userExam?.readiness || 0
  const milestones = MILESTONE_SETS[exam?.category] || MILESTONE_SETS.default

  // Determine which milestone is active based on readiness %
  const activeMilestoneIndex = Math.min(
    Math.floor((readiness / 100) * milestones.length),
    milestones.length - 1
  )

  return (
    <AppLayout title={`${exam?.name || 'Exam'} Universe`}>
      <div className="max-w-xl mx-auto px-4 py-6 space-y-6">

        {/* Header */}
        <div className="bg-gradient-to-br from-[#1E3A5F] to-[#4C1D95] rounded-2xl p-6 text-white text-center">
          <div className="text-5xl mb-3">{exam?.emoji || '📋'}</div>
          <h1 className="text-xl font-bold">{exam?.name || examId}</h1>
          <p className="text-white/70 text-sm mt-1">Your journey to success</p>

          {/* Readiness ring */}
          <div className="mt-5 flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-black text-[#D4AF37]">{readiness}%</div>
              <div className="text-xs text-white/60 mt-0.5">Readiness</div>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-black text-green-300">
                {milestones.filter((_, i) => i < activeMilestoneIndex).length}
              </div>
              <div className="text-xs text-white/60 mt-0.5">Milestones Done</div>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-black text-white">{milestones.length}</div>
              <div className="text-xs text-white/60 mt-0.5">Total Phases</div>
            </div>
          </div>
        </div>

        {/* Roadmap timeline */}
        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200 z-0" />

          <div className="space-y-4 relative z-10">
            {milestones.map((milestone, i) => {
              const isDone = i < activeMilestoneIndex
              const isActive = i === activeMilestoneIndex
              const isLocked = i > activeMilestoneIndex

              return (
                <div key={milestone.id} className="flex items-start gap-4">
                  {/* Icon node */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 border-2 transition ${
                    isDone
                      ? 'bg-green-500 border-green-500 text-white'
                      : isActive
                      ? 'bg-[#D4AF37] border-[#D4AF37] text-white shadow-md'
                      : 'bg-white border-gray-200 text-gray-400'
                  }`}>
                    {isDone ? '✓' : milestone.emoji}
                  </div>

                  {/* Card */}
                  <div className={`flex-1 rounded-2xl border p-4 transition ${
                    isDone
                      ? 'bg-green-50 border-green-200'
                      : isActive
                      ? 'bg-[#1E3A5F] border-[#1E3A5F] text-white shadow-md'
                      : 'bg-white border-gray-100 opacity-60'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-bold text-sm ${isActive ? 'text-white' : isDone ? 'text-green-800' : 'text-gray-500'}`}>
                        {milestone.label}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        Week {milestone.weeks}
                      </span>
                    </div>
                    <p className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                      {milestone.desc}
                    </p>
                    {isActive && (
                      <button
                        onClick={() => navigate('/test-engine', { state: { exam: examId } })}
                        className="mt-3 text-xs bg-[#D4AF37] text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-[#E8C84A] transition"
                      >
                        Practice Now →
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate(`/roadmap/${examId}`)}
            className="py-3 bg-[#1E3A5F] text-white font-semibold rounded-2xl hover:bg-[#0F2140] transition text-sm"
          >
            🗺️ Full Roadmap
          </button>
          <button
            onClick={() => navigate('/test-engine', { state: { exam: examId } })}
            className="py-3 bg-[#D4AF37] text-white font-semibold rounded-2xl hover:bg-[#E8C84A] transition text-sm"
          >
            ⚡ Start Test
          </button>
        </div>

        {!userExam && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center text-sm">
            <p className="text-amber-700">
              This exam isn't in your list yet.{' '}
              <button
                onClick={() => navigate(`/exams/${examId}`)}
                className="font-semibold underline"
              >
                Add it to track progress.
              </button>
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  )
}