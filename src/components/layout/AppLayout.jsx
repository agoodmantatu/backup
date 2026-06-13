import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

/**
 * AppLayout — the shell for every authenticated page.
 *
 * Props:
 *   title    {string}    Displayed in Topbar and used as page heading context.
 *   children {ReactNode} Page content.
 *
 * Prop contracts (must match exactly):
 *   <Sidebar open={bool} onClose={fn} />
 *   <Topbar  onMenuClick={fn} title={string} />
 *
 * Layout maths:
 *   Sidebar: 260px wide, fixed left, full height (desktop only).
 *   Topbar:  68px tall, fixed top, spans full width.
 *   Main:    offset by sidebar (lg:ml-[260px]) + topbar (pt-[68px]).
 *            On mobile sidebar is an overlay (open=false by default).
 */
export default function AppLayout({ children, title = '' }) {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Double-guard: don't render shell for logged-out states.
  // Pages using AppLayout also guard, but this prevents flash/errors.
  if (!user) return null

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      {/* ── Sidebar ────────────────────────────────────────────── */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ── Topbar ─────────────────────────────────────────────── */}
      <Topbar onMenuClick={() => setSidebarOpen(true)} title={title} />

      {/* ── Main content ───────────────────────────────────────── */}
      {/*
        Desktop: pushed right by 260px sidebar + down by 68px topbar.
        Mobile:  only pushed down by 68px (sidebar is an overlay).
        Tailwind classes used where possible; inline fallback ensures
        correctness even if Tailwind JIT misses dynamic values.
      */}
      <main
        className="lg:ml-[260px] pt-[68px]"
        style={{
          minHeight: '100vh',
          background: '#F8FAFC',
          boxSizing: 'border-box',
        }}
      >
        {/* Max-width cap for very large screens */}
        <div
          className="max-w-[1400px] mx-auto p-5 lg:p-6"
          style={{ width: '100%', boxSizing: 'border-box' }}
        >
          {children}
        </div>
      </main>
    </div>
  )
}