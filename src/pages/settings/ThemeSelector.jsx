// FILE: src/pages/settings/ThemeSelector.jsx
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Check, Sparkles } from 'lucide-react'
import AppLayout from '../../components/layout/AppLayout'
import { useTheme } from '../../context/ThemeContext'

const springTap = { type: 'spring', stiffness: 400, damping: 28 }

function ThemeCard({ t, isActive, onSelect }) {
  const [pressed, setPressed] = useState(false)
  const locked = !t.unlocked

  return (
    <motion.button
      onClick={() => !locked && onSelect(t.id)}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      whileHover={locked ? {} : { y: -4 }}
      whileTap={locked ? {} : { scale: 0.97 }}
      transition={springTap}
      style={{
        textAlign: 'left',
        borderRadius: 20,
        padding: 18,
        cursor: locked ? 'default' : 'pointer',
        position: 'relative',
        overflow: 'hidden',
        border: isActive ? `2px solid ${t.accent}` : '1.5px solid rgba(226,232,240,0.9)',
        background: locked ? 'var(--color-surface, #FFFFFF)' : t.surface,
        boxShadow: isActive
          ? `0 18px 40px rgba(0,0,0,0.10), 0 0 0 1px ${t.accent}33`
          : '0 12px 28px rgba(15,23,42,0.06)',
      }}
    >
      {locked && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'rgba(15,23,42,0.55)',
          backdropFilter: 'blur(2px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 8,
          color: '#FFFFFF', padding: 14, textAlign: 'center',
        }}>
          <Lock size={20} strokeWidth={2.2} />
          <span style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.3 }}>
            {t.unlockLabel || 'Keep going to unlock'}
          </span>
          <div style={{ width: '70%', height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.25)', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 4,
              width: `${Math.round((t.progress || 0) * 100)}%`,
              background: '#FFFFFF',
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 24, filter: locked ? 'grayscale(1)' : 'none' }}>{t.emoji}</span>
        {isActive && !locked && (
          <motion.span
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={springTap}
            style={{ display: 'flex', alignItems: 'center', gap: 4, color: t.accent, fontWeight: 800, fontSize: 12 }}
          >
            <Check size={14} strokeWidth={3} /> Active
          </motion.span>
        )}
      </div>

      <p style={{
        fontFamily: 'Poppins,sans-serif', fontWeight: 800,
        color: locked ? 'transparent' : t.text, fontSize: 15, marginBottom: 10,
        position: 'relative', zIndex: locked ? 0 : 1,
      }}>
        {t.name}
      </p>

      <div style={{ display: 'flex', gap: 6, position: 'relative', zIndex: locked ? 0 : 1 }}>
        {[t.primary, t.accent, t.bg, t.surface].map((c, i) => (
          <div key={i} style={{ width: 28, height: 28, borderRadius: 8, background: c, border: '1px solid rgba(0,0,0,0.08)' }} />
        ))}
      </div>
    </motion.button>
  )
}

export default function ThemeSelector() {
  const { activeTheme, setActiveTheme, themesWithStatus } = useTheme()
  const [justUnlockedToast, setJustUnlockedToast] = useState(null)

  const baseThemes = useMemo(() => themesWithStatus.filter(t => t.tier === 'base'), [themesWithStatus])
  const unlockThemes = useMemo(() => themesWithStatus.filter(t => t.tier !== 'base'), [themesWithStatus])
  const unlockedCount = useMemo(() => themesWithStatus.filter(t => t.unlocked).length, [themesWithStatus])

  const handleSelect = (id) => {
    setActiveTheme(id)
  }

  return (
    <AppLayout>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, color: 'var(--heading-color, var(--color-text, #1E3A5F))', fontSize: 28, marginBottom: 6 }}>
          🎨 Themes
        </h1>
        <p style={{ color: 'var(--subtext-color, #64748B)', fontSize: 14, marginBottom: 4 }}>
          Pick a look that feels like yours. Changes apply instantly across the app.
        </p>
        <p style={{ color: 'var(--color-accent, #D4AF37)', fontSize: 13, fontWeight: 700 }}>
          {unlockedCount} of {themesWithStatus.length} themes unlocked
        </p>
      </div>

      <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 14, color: 'var(--subtext-color, #64748B)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        Always available
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14, marginBottom: 32 }}>
        {baseThemes.map(t => (
          <ThemeCard key={t.id} t={t} isActive={activeTheme === t.id} onSelect={handleSelect} />
        ))}
      </div>

      <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 14, color: 'var(--subtext-color, #64748B)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Sparkles size={14} /> Unlock by reaching your goals
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
        {unlockThemes.map(t => (
          <ThemeCard key={t.id} t={t} isActive={activeTheme === t.id} onSelect={handleSelect} />
        ))}
      </div>

      <AnimatePresence>
        {justUnlockedToast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
              background: 'var(--color-primary-dark, #0F2140)', color: '#FFFFFF',
              padding: '14px 22px', borderRadius: 16, fontWeight: 700, fontSize: 14,
              boxShadow: '0 20px 48px rgba(0,0,0,0.25)', zIndex: 9999,
            }}
            onAnimationComplete={() => setTimeout(() => setJustUnlockedToast(null), 2400)}
          >
            🎉 New theme unlocked: {justUnlockedToast}
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  )
}