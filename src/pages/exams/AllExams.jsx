import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout'
import { useAuth } from '../../context/AuthContext'

const CATEGORY_LABELS = {
  govt_central: '🏛️ Central Govt',
  govt_state: '🗺️ State Govt',
  banking: '🏦 Banking',
  railways: '🚂 Railways',
  defence: '🪖 Defence',
  medical: '🩺 Medical',
  engineering: '⚙️ Engineering',
  engineering_pg: '🎓 Engg PG',
  teaching: '📚 Teaching',
  school_competitive: '🏫 School',
  scholarship: '🌟 Scholarship',
  professional_cert: '📜 Professional',
  foreign_language: '🌐 Language',
}

export default function AllExams() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    fetch('/data/exams.json')
      .then(r => r.json())
      .then(data => { setExams(data.exams || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (!user) return null

  const categories = ['all', ...Object.keys(CATEGORY_LABELS)]

  const filtered = exams.filter(ex => {
    const matchSearch = ex.name.toLowerCase().includes(search.toLowerCase()) ||
      (ex.body || '').toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'all' || ex.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <AppLayout title="All Exams">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[#1E3A5F]">Exam Catalogue</h1>
            {!loading && (
              <p className="text-sm text-gray-500 mt-0.5">
                {exams.length} exams and growing — new exams added weekly
              </p>
            )}
          </div>
          <input
            type="text"
            placeholder="Search exams..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-64 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />
        </div>

        {/* Category chips */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#1E3A5F]'
              }`}
            >
              {cat === 'all' ? '🔍 All Exams' : CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-36 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}

        {/* Results count */}
        {!loading && filtered.length > 0 && (
          <p className="text-xs text-gray-400">Showing {filtered.length} exam{filtered.length !== 1 ? 's' : ''}</p>
        )}

        {/* Exam grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(exam => (
              <button
                key={exam.id}
                onClick={() => navigate(`/exams/${exam.id}`)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-left hover:shadow-md hover:border-[#D4AF37] transition group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{exam.emoji || '📋'}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    !exam.price_inr || exam.price_inr === 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {!exam.price_inr || exam.price_inr === 0 ? 'Free' : `₹${exam.price_inr}`}
                  </span>
                </div>
                <h3 className="font-bold text-[#1E3A5F] text-sm leading-snug group-hover:text-[#0F2140]">
                  {exam.name}
                </h3>
                {exam.body && (
                  <p className="text-xs text-gray-500 mt-1">{exam.body}</p>
                )}
                <div className="flex items-center gap-2 mt-3">
                  {exam.level && (
                    <span className="text-xs bg-[#1E3A5F]/10 text-[#1E3A5F] px-2 py-0.5 rounded-full capitalize">
                      {exam.level}
                    </span>
                  )}
                  {exam.vacancies && (
                    <span className="text-xs text-gray-400">{exam.vacancies} vacancies</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-semibold text-gray-600">No exams found</p>
            <p className="text-sm text-gray-400 mt-1">Try a different search or category.</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('all') }}
              className="mt-4 px-5 py-2 bg-[#D4AF37] text-white rounded-xl font-semibold hover:bg-[#E8C84A] transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  )
}