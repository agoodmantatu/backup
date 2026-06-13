import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import { useAuth } from '../../context/AuthContext'

const TABS = ['Overview', 'Syllabus', 'Pattern', 'Cutoffs', 'Resources', 'Community']

// Sample syllabus topics by level
const SAMPLE_SYLLABUS = {
  undergraduate: ['Quantitative Aptitude', 'Logical Reasoning', 'English Language', 'General Awareness', 'Computer Knowledge'],
  graduate: ['General Studies I', 'General Studies II', 'General Studies III', 'Essay', 'Optional Subject'],
  school: ['Mathematics', 'Science', 'Social Studies', 'English', 'Mental Ability'],
  default: ['Section A — Core Subject', 'Section B — Aptitude', 'Section C — General Knowledge', 'Section D — Language'],
}

const SAMPLE_PATTERN = [
  { section: 'Quantitative Aptitude', questions: 25, marks: 25, time: '20 min' },
  { section: 'Reasoning Ability', questions: 25, marks: 25, time: '20 min' },
  { section: 'English Language', questions: 25, marks: 25, time: '20 min' },
  { section: 'General Awareness', questions: 25, marks: 25, time: '20 min' },
]

export default function ExamDetail() {
  const { examId } = useParams()
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  const [exam, setExam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Overview')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    fetch('/data/exams.json')
      .then(r => r.json())
      .then(data => {
        const found = (data.exams || []).find(e => e.id === examId)
        setExam(found || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [examId])

  useEffect(() => {
    if (user && exam) {
      setAdded((user.exams || []).some(e => e.id === exam.id))
    }
  }, [user, exam])

  if (!user) return null

  const handleAddExam = () => {
    if (added) return
    const updated = [...(user.exams || []), { id: exam.id, name: exam.name, readiness: 0, examDate: null }]
    updateUser({ exams: updated })
    setAdded(true)
  }

  if (loading) {
    return (
      <AppLayout title="Exam Details">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="h-40 bg-gray-100 rounded-2xl animate-pulse mb-4" />
          <div className="h-8 bg-gray-100 rounded-xl animate-pulse w-1/2" />
        </div>
      </AppLayout>
    )
  }

  if (!exam) {
    return (
      <AppLayout title="Exam Not Found">
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-semibold text-gray-600">Exam not found</p>
          <button onClick={() => navigate('/exams')} className="mt-4 px-5 py-2 bg-[#D4AF37] text-white rounded-xl font-semibold">
            Browse All Exams
          </button>
        </div>
      </AppLayout>
    )
  }

  const syllabus = SAMPLE_SYLLABUS[exam.level] || SAMPLE_SYLLABUS.default

  return (
    <AppLayout title={exam.name}>
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">

        {/* Hero card */}
        <div className="bg-gradient-to-br from-[#1E3A5F] to-[#0F2140] rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{exam.emoji || '📋'}</span>
              <div>
                <h1 className="text-xl font-bold leading-tight">{exam.name}</h1>
                {exam.body && <p className="text-white/70 text-sm mt-1">{exam.body}</p>}
                <div className="flex flex-wrap gap-2 mt-3">
                  {exam.level && (
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full capitalize">{exam.level}</span>
                  )}
                  {exam.category && (
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full capitalize">{exam.category.replace(/_/g, ' ')}</span>
                  )}
                  {exam.vacancies && (
                    <span className="text-xs bg-[#D4AF37]/20 text-[#E8C84A] px-2 py-0.5 rounded-full">
                      {exam.vacancies} Vacancies
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className={`text-xs font-bold px-3 py-1 rounded-full ${
                !exam.price_inr || exam.price_inr === 0
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-amber-500/20 text-amber-300'
              }`}>
                {!exam.price_inr || exam.price_inr === 0 ? '100% Free' : `₹${exam.price_inr}`}
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => navigate('/test-engine', { state: { exam: exam.id } })}
              className="flex-1 py-2.5 bg-[#D4AF37] hover:bg-[#E8C84A] text-white font-bold rounded-xl transition text-sm"
            >
              ⚡ Start Practising
            </button>
            <button
              onClick={handleAddExam}
              disabled={added}
              className={`flex-1 py-2.5 font-bold rounded-xl transition text-sm border ${
                added
                  ? 'border-green-400 text-green-300 bg-green-500/10 cursor-default'
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              {added ? '✓ Added to My Exams' : '+ Add to My Exams'}
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-white text-[#1E3A5F] shadow-sm font-semibold'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

          {activeTab === 'Overview' && (
            <div className="space-y-4">
              <h2 className="font-bold text-[#1E3A5F] text-lg">About this Exam</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {exam.name} is conducted by {exam.body || 'the relevant authority'} for recruitment/selection at the {exam.level || 'national'} level.
                {exam.vacancies ? ` This cycle has ${exam.vacancies} vacancies available.` : ''}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                {[
                  { label: 'Conducting Body', value: exam.body || '—' },
                  { label: 'Level', value: exam.level ? exam.level.charAt(0).toUpperCase() + exam.level.slice(1) : '—' },
                  { label: 'Category', value: exam.category ? exam.category.replace(/_/g, ' ') : '—' },
                  { label: 'Vacancies', value: exam.vacancies || '—' },
                  { label: 'Application Fee', value: exam.price_inr ? `₹${exam.price_inr}` : 'Free' },
                  { label: 'Mode', value: 'Online (CBT)' },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-400">{item.label}</div>
                    <div className="font-semibold text-gray-800 text-sm mt-0.5 capitalize">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Syllabus' && (
            <div className="space-y-3">
              <h2 className="font-bold text-[#1E3A5F] text-lg">Syllabus Topics</h2>
              <p className="text-xs text-gray-400">Official syllabus — updated after each notification</p>
              <div className="space-y-2">
                {syllabus.map((topic, i) => (
                  <div key={topic} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="w-6 h-6 flex items-center justify-center bg-[#1E3A5F] text-white rounded-full text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Pattern' && (
            <div className="space-y-4">
              <h2 className="font-bold text-[#1E3A5F] text-lg">Exam Pattern</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 px-3 text-gray-500 font-semibold">Section</th>
                      <th className="text-center py-2 px-3 text-gray-500 font-semibold">Questions</th>
                      <th className="text-center py-2 px-3 text-gray-500 font-semibold">Marks</th>
                      <th className="text-center py-2 px-3 text-gray-500 font-semibold">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SAMPLE_PATTERN.map((row, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-3 px-3 font-medium text-gray-700">{row.section}</td>
                        <td className="py-3 px-3 text-center text-gray-600">{row.questions}</td>
                        <td className="py-3 px-3 text-center text-gray-600">{row.marks}</td>
                        <td className="py-3 px-3 text-center text-gray-600">{row.time}</td>
                      </tr>
                    ))}
                    <tr className="bg-[#1E3A5F]/5 font-bold">
                      <td className="py-3 px-3 text-[#1E3A5F]">Total</td>
                      <td className="py-3 px-3 text-center text-[#1E3A5F]">100</td>
                      <td className="py-3 px-3 text-center text-[#1E3A5F]">100</td>
                      <td className="py-3 px-3 text-center text-[#1E3A5F]">80 min</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400">* Negative marking: −0.25 per wrong answer. Pattern may vary — verify with official notification.</p>
            </div>
          )}

          {activeTab === 'Cutoffs' && (
            <div className="text-center py-10 space-y-3">
              <div className="text-4xl">📊</div>
              <p className="font-semibold text-gray-600">Cutoffs Updated After Official Notification</p>
              <p className="text-sm text-gray-400 max-w-xs mx-auto">
                Previous year cutoffs and category-wise analysis will be published here once the official notification is released.
              </p>
              <button
                onClick={() => {/* future: subscribe */}}
                className="mt-2 px-5 py-2 border border-[#D4AF37] text-[#D4AF37] rounded-xl font-semibold hover:bg-[#D4AF37] hover:text-white transition text-sm"
              >
                🔔 Notify me when available
              </button>
            </div>
          )}

          {activeTab === 'Resources' && (
            <div className="space-y-3">
              <h2 className="font-bold text-[#1E3A5F] text-lg">Study Materials</h2>
              <p className="text-sm text-gray-500">PDFs and materials tagged for this exam.</p>
              <button
                onClick={() => navigate('/classroom/pdf')}
                className="w-full py-3 border-2 border-dashed border-[#D4AF37] rounded-xl text-[#D4AF37] font-semibold hover:bg-[#D4AF37]/5 transition text-sm"
              >
                📚 Open PDF Library for {exam.name} →
              </button>
            </div>
          )}

          {activeTab === 'Community' && (
            <div className="space-y-3">
              <h2 className="font-bold text-[#1E3A5F] text-lg">Community Doubts</h2>
              <p className="text-sm text-gray-500">Questions and discussions tagged for this exam.</p>
              <button
                onClick={() => navigate('/guru-hub')}
                className="w-full py-3 border-2 border-dashed border-[#1E3A5F] rounded-xl text-[#1E3A5F] font-semibold hover:bg-[#1E3A5F]/5 transition text-sm"
              >
                💬 View {exam.name} Discussions in Guru Hub →
              </button>
            </div>
          )}
        </div>

        {/* Also navigate to universe / roadmap */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate(`/exams/${examId}/universe`)}
            className="bg-white rounded-2xl border border-gray-100 p-4 text-center hover:border-[#D4AF37] hover:shadow-sm transition"
          >
            <div className="text-2xl mb-1">🌌</div>
            <div className="text-sm font-semibold text-[#1E3A5F]">Exam Universe</div>
            <div className="text-xs text-gray-400 mt-0.5">Visual progress map</div>
          </button>
          <button
            onClick={() => navigate(`/roadmap/${examId}`)}
            className="bg-white rounded-2xl border border-gray-100 p-4 text-center hover:border-[#D4AF37] hover:shadow-sm transition"
          >
            <div className="text-2xl mb-1">🗺️</div>
            <div className="text-sm font-semibold text-[#1E3A5F]">Study Roadmap</div>
            <div className="text-xs text-gray-400 mt-0.5">Week-by-week plan</div>
          </button>
        </div>
      </div>
    </AppLayout>
  )
}