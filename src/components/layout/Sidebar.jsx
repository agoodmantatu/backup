// FILE: src/components/layout/Sidebar.jsx
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Home, FileText, Target, BookOpen, Gamepad2, GraduationCap,
  Users, Trophy, School, Newspaper,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Logo from '../Logo'

// Routes corrected to match actual App.jsx routes (previous version
// pointed at /brain-games, /all-exams, /my-tests, /the-hall, /subjects
// which don't exist in App.jsx — they fell through to the catch-all
// "*" route and redirected to /dashboard).
const NAV_ITEMS = [
  { to: '/dashboard',     icon: Home,         label: 'Dashboard' },
  { to: '/test-engine',   icon: FileText,     label: 'My Tests', badge: 'newTests' },
  { to: '/exams',         icon: Target,       label: 'All Exams' },
  { to: '/analytics',     icon: BookOpen,     label: 'Subjects' },
  { to: '/games',         icon: Gamepad2,     label: 'Brain Games', badge: 'hot' },
  { to: '/guru-hub',      icon: GraduationCap,label: 'Guru Hub', badge: 'guruPoints' },
  { to: '/hall',          icon: Users,        label: 'The Hall' },
  { to: '/tournaments',   icon: Trophy,       label: 'Tournaments', badge: 'dot' },
  { to: '/classroom',     icon: School,       label: 'Classroom' },
  { to: '/current-affairs',icon: Newspaper,   label: 'Current Affairs', badge: 'today' },
]

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  const xpPct = user?.xpToNext
    ? Math.min(100, Math.round(((user.xp || 0) / user.xpToNext) * 100))
    : 0

  const initials = user?.initials || user?.name?.[0]?.toUpperCase() || '?'

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onClose} />}

      <aside className={`fixed top-0 left-0 h-full w-[260px] z-40 transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        style={{ background: 'linear-gradient(180deg,#1E3A5F,#0F2140)' }}>

        <div className="p-5 flex flex-col h-full overflow-y-auto">
          <div className="mb-2">
            <Logo dark height={36} />
            <p className="text-white/50 text-[11px] mt-1 italic">Your Exam. Your Rank. Your Success.</p>
          </div>

          <div className="flex flex-col gap-2 mt-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg,#D4AF37,#E8C84A)',
                  color: '#1E3A5F',
                }}>
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm truncate">
                  {user?.name || 'New Learner'}
                </p>
                <p className="text-[#D4AF37] text-xs">
                  {user?.levelEmoji} {user?.levelTitle || 'The Fierce One'}
                </p>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-white/50 mb-1">
                <span>XP</span>
                <span>{user?.xp || 0} / {user?.xpToNext || 500}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full" style={{
                  width: `${xpPct}%`,
                  background: 'linear-gradient(90deg,#D4AF37,#E8C84A)',
                }} />
              </div>
            </div>
          </div>

          <button onClick={() => navigate('/exams')}
            className="flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-xl px-3 py-2.5 mb-4 transition-colors">
            <div className="text-left">
              <p className="text-[10px] text-white/40 uppercase tracking-wide">Active Exam</p>
              <p className="text-[#D4AF37] text-sm font-semibold">
                {user?.exams?.[0]?.name || 'Choose your exam'}
              </p>
            </div>
            <span className="text-white/40 text-xs">Switch ›</span>
          </button>

          <nav className="flex flex-col gap-1 flex-1">
            {NAV_ITEMS.map(item => (
              <NavLink key={item.to} to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                  ${isActive ? 'bg-white/10 text-[#D4AF37]' : 'text-white/70 hover:bg-white/5 hover:text-white'}`
                }>
                <span className="flex items-center gap-3">
                  <item.icon size={18} />
                  {item.label}
                </span>
                {item.badge === 'hot' && <span className="text-[10px] bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded-full">🔥 Hot</span>}
                {item.badge === 'dot' && <span className="w-2 h-2 rounded-full bg-red-500" />}
                {item.badge === 'today' && <span className="text-[10px] bg-white/10 text-white/50 px-1.5 py-0.5 rounded-full">Today</span>}
                {item.badge === 'newTests' && <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded-full">3 New</span>}
                {item.badge === 'guruPoints' && (user?.guruPoints ?? 0) > 0 && (
                  <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded-full">{user.guruPoints}</span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}