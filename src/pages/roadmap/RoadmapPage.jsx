import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import { useAuth } from '../../context/AuthContext'

// 10-week study plan template — reused and labelled per exam
const buildPlan = (examName) => [
  {
    week: 1,
    title: 'Foundation & Syllabus',
    topics: [
      { id: 't1', subject: 'General', topic: 'Download & study official syllabus', hours: 2 },
      { id: 't2', subject: 'Quantitative Aptitude', topic: 'Number System & Simplification', hours: 3 },
      { id: 't3', subject: 'Reasoning', topic: 'Analogy & Classification', hours: 2 },
      { id: 't4', subject: 'English', topic: 'Grammar: Tenses & Articles', hours: 2 },
    ],
  },
  {
    week: 2,
    title: 'Core Quant & Reasoning',
    topics: [
      { id: 't5', subject: 'Quantitative Aptitude', topic: 'Percentage & Profit-Loss', hours: 4 },
      { id: 't6', subject: 'Reasoning', topic: 'Seating Arrangement & Puzzle', hours: 3 },
      { id: 't7', subject: 'English', topic: 'Reading Comprehension (basic)', hours: 2 },
    ],
  },
  {
    week: 3,
    title: 'Speed & Accuracy',
    topics: [
      { id: 't8', subject: 'Quantitative Aptitude', topic: 'Time, Work & Distance', hours: 4 },
      { id: 't9', subject: 'Reasoning', topic: 'Coding-Decoding & Blood Relations', hours: 3 },
      { id: 't10', subject: 'General Awareness', topic: 'Current Affairs — last 3 months', hours: 3 },
    ],
  },
  {
    week: 4,
    title: 'Mock Test #1 + Weak Area',
    topics: [
      { id: 't11', subject: 'Mock Test', topic: 'Full-length Practice Test #1', hours: 3 },
      { id: 't12', subject: 'Analysis', topic: 'Review mistakes, identify weak topics', hours: 2 },
      { id: 't13', subject: 'Quantitative Aptitude', topic: 'Ratio, Proportion & Mixture', hours: 3 },
    ],
  },
  {
    week: 5,
    title: 'Advanced Topics — Part 1',
    topics: [
      { id: 't14', subject: 'Quantitative Aptitude', topic: 'Algebra & Geometry basics', hours: 4 },
      { id: 't15', subject: 'Reasoning', topic: 'Syllogism & Direction Sense', hours: 3 },
      { id: 't16', subject: 'English', topic: 'Error Spotting & Sentence Correction', hours: 3 },
    ],
  },
  {
    week: 6,
    title: 'General Awareness Deep Dive',
    topics: [
      { id: 't17', subject: 'General Awareness', topic: 'Indian Constitution & Polity', hours: 3 },
      { id: 't18', subject: 'General Awareness', topic: 'History — Ancient to Modern', hours: 3 },
      { id: 't19', subject: 'General Awareness', topic: 'Science & Technology', hours: 2 },
    ],
  },
  {
    week: 7,
    title: 'Mock Test #2 + Revision',
    topics: [
      { id: 't20', subject: 'Mock Test', topic: 'Full-length Practice Test #2', hours: 3 },
      { id: 't21', subject: 'Revision', topic: 'Quant formulas quick revision', hours: 2 },
      { id: 't22', subject: 'Revision', topic: 'Reasoning shortcuts revision', hours: 2 },
      { id: 't23', subject: 'English', topic: 'Vocabulary building — 20 words/day', hours: 2 },
    ],
  },
  {
    week: 8,
    title: 'Intensive Practice',
    topics: [
      { id: 't24', subject: 'Quantitative Aptitude', topic: 'Speed drills — 50 Qs in 30 min', hours: 3 },
      { id: 't25', subject: 'Reasoning', topic: 'Mixed practice — all topic types', hours: 3 },
      { id: 't26', subject: 'General Awareness', topic: 'Current Affairs — last 6 months', hours: 3 },
    ],
  },
  {
    week: 9,
    title: 'Full Mock Series',
    topics: [
      { id: 't27', subject: 'Mock Test', topic: 'Mock Test #3 — full exam pattern', hours: 3 },
      { id: 't28', subject: 'Mock Test', topic: 'Mock Test #4 — speed focus', hours: 3 },
      { id: 't29', subject: 'Analysis', topic: 'Sectional analysis + time management', hours: 2 },
    ],
  },
  {
    week: 10,
    title: 'Final Revision & Strategy',
    topics: [
      { id: 't30', subject: 'Revision', topic: 'Formula & shortcut master sheet', hours: 2 },
      { id: 't31', subject: 'Revision', topic: 'High-priority topics only', hours: 3 },
      { id: 't32', subject: 'Strategy', topic: 'Exam day plan, time allocation per section', hours: 1 },
      { id: 't33', subject: 'Mock Test', topic: 'Final full mock — timed, exam conditions', hours: 3 },
    ],
  },
]

const SUBJECT_COLORS = {
  'Quantitative Aptitude': 'bg-blue-100 text-blue-700',
  'Reasoning': 'bg-purple-100 text-purple-700',
  'English': 'bg-green-100 text-green-700',
  'General Awareness': 'bg-amber-100 text-amber-700',
  'Mock Test': 'bg-red-100 text-red-700',
  'Analysis': 'bg-pink-100 text-pink-700',
  'Revision': 'bg-teal-100 text-teal-700',
  'Strategy': 'bg-orange-100 text-orange-700',
  'General': 'bg-gray-100 text-gray-600',
}

export default function RoadmapPage() {
  const { examId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [exam, setExam] = useState(null)
  const [plan, setPlan] = useState([])
  const [checked, setChecked] = useState({})
  const storageKey = `roadmap_${examId}`

  useEffect(() => {
    fetch('/data/exams.json')
      .then(r => r.json())
      .then(data => {
        const found = (data.exams || []).find(e => e.id === examId)
        setExam(found || { name: examId })
      })
  }, [examId])

  useEffect(() => {
    const examName = exam?.name || examId
    setPlan(buildPlan(examName))
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '{}')
      setChecked(saved)
    } catch {
      setChecked({})
    }
  }, [exam])

  if (!user) return null

  const allTopics = plan.flatMap(w => w.topics)
  const completedCount = allTopics.filter(t => checked[t.id]).length
  const totalCount = allTopics.length
  const progressPct = totalCount ? Math.round((completedCount / totalCount) * 100) : 0

  const toggleTopic = (topicId) => {
    setChecked(prev => {
      const updated = { ...prev, [topicId]: !prev[topicId] }
      localStorage.setItem(storageKey, JSON.stringify(updated))
      return updated
    })
  }

  const totalHours = (week) => week.topics.reduce((s, t) => s + t.hours, 0)

  return (
    <AppLayout title="Study Roadmap">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">

        {/* Header */}
        <div className="bg-gradient-to-br from-[#1E3A5F] to-[#064E3B] rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{exam?.emoji || '🗺️'}</span>
            <div>
              <h1 className="text-xl font-bold">{exam?.name || examId}</h1>
              <p className="text-white/70 text-sm">10-Week Study Roadmap</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/80">{completedCount} / {totalCount} topics completed</span>
              <span className="font-bold text-[#D4AF37]">{progressPct}%</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D4AF37] rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Week-by-week plan */}
        {plan.map((week) => {
          const weekDone = week.topics.filter(t => checked[t.id]).length
          const weekTotal = week.topics.length
          const weekPct = Math.round((weekDone / weekTotal) * 100)
          const isComplete = weekDone === weekTotal

          return (
            <div
              key={week.week}
              className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition ${
                isComplete ? 'border-green-200' : 'border-gray-100'
              }`}
            >
              {/* Week header */}
              <div className={`px-5 py-4 flex items-center justify-between ${isComplete ? 'bg-green-50' : 'bg-gray-50'}`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      isComplete ? 'bg-green-500 text-white' : 'bg-[#1E3A5F] text-white'
                    }`}>
                      {isComplete ? '✓' : week.week}
                    </span>
                    <span className="font-bold text-[#1E3A5F] text-sm">Week {week.week}: {week.title}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 ml-9">~{totalHours(week)} hrs · {weekDone}/{weekTotal} done</p>
                </div>
                <div className="text-sm font-bold text-gray-500">{weekPct}%</div>
              </div>

              {/* Topics */}
              <div className="divide-y divide-gray-50">
                {week.topics.map(topic => (
                  <label
                    key={topic.id}
                    className="flex items-start gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition"
                  >
                    <input
                      type="checkbox"
                      checked={!!checked[topic.id]}
                      onChange={() => toggleTopic(topic.id)}
                      className="mt-0.5 w-4 h-4 accent-[#D4AF37] shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SUBJECT_COLORS[topic.subject] || 'bg-gray-100 text-gray-500'}`}>
                          {topic.subject}
                        </span>
                        <span className="text-xs text-gray-400">{topic.hours}h</span>
                      </div>
                      <p className={`text-sm mt-1 ${checked[topic.id] ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {topic.topic}
                      </p>
                    </div>
                    {checked[topic.id] && <span className="text-green-500 text-sm mt-0.5 shrink-0">✓</span>}
                  </label>
                ))}
              </div>
            </div>
          )
        })}

        {/* Bottom CTAs */}
        <div className="flex gap-3 pb-4">
          <button
            onClick={() => navigate(`/exams/${examId}/universe`)}
            className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition text-sm"
          >
            🌌 Universe View
          </button>
          <button
            onClick={() => navigate('/test-engine', { state: { exam: examId } })}
            className="flex-1 py-3 bg-[#D4AF37] text-white font-semibold rounded-2xl hover:bg-[#E8C84A] transition text-sm"
          >
            ⚡ Practice Now
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
