// src/context/ThemeContext.jsx
// TryIT Educations — Theme Context
// Provides: activeTheme, setActiveTheme, theme, themes,
//           isThemeUnlocked(themeId), applyTheme(themeId)
//
// CIRCULAR-IMPORT SAFETY:
// ThemeContext does NOT directly import AuthContext.
// Instead, ThemeProvider accepts an optional `userLevel` prop.
// In App.jsx (where both providers live), read user.level from
// AuthContext and pass it down: <ThemeProvider userLevel={user?.level ?? 1}>
// This gives full unlock awareness with zero circular dependency risk.

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  THEMES,
  THEME_LIST,
  applyTheme as applyThemeTokens,
  isThemeUnlocked as checkThemeUnlocked,
  getUnlockLevel,
} from '../lib/themes';

// ─────────────────────────────────────────────────────────
// CONTEXT SHAPE
// ─────────────────────────────────────────────────────────
const ThemeContext = createContext({
  activeTheme: 'cosmic-default',
  setActiveTheme: () => {},
  theme: THEMES['cosmic-default'],
  themes: THEME_LIST,
  isThemeUnlocked: () => true,
  applyTheme: () => {},
  userLevel: 1,
});

// ─────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────
const STORAGE_KEY = 'tryit_active_theme';
const DEFAULT_THEME = 'cosmic-default';

// ─────────────────────────────────────────────────────────
// PROVIDER
// ─────────────────────────────────────────────────────────

/**
 * ThemeProvider
 *
 * @prop {number} userLevel — current user's level (1–10).
 *   Pass from App.jsx: <ThemeProvider userLevel={user?.level ?? 1}>
 *   Defaults to 1 (only core themes unlocked) if not provided.
 */
export function ThemeProvider({ children, userLevel = 1 }) {
  // ── Restore persisted theme on mount ──────────────────
  const [activeTheme, setActiveThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // Validate that the saved id still exists in our theme catalogue
      if (saved && THEMES[saved]) return saved;
    } catch {
      // localStorage unavailable (e.g. SSR, private mode)
    }
    return DEFAULT_THEME;
  });

  // ── Resolve theme object from active id ───────────────
  const theme = THEMES[activeTheme] ?? THEMES[DEFAULT_THEME];

  // ── Core unlock check (uses prop, not AuthContext) ────
  const isThemeUnlocked = useCallback(
    (themeId) => checkThemeUnlocked(themeId, userLevel),
    [userLevel],
  );

  // ── Apply CSS vars whenever activeTheme changes ───────
  useEffect(() => {
    applyThemeTokens(activeTheme);
  }, [activeTheme]);

  // ── Also apply on first mount (covers page refresh) ───
  useEffect(() => {
    applyThemeTokens(activeTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Re-apply if userLevel rises (user just leveled up,
  //    some theme's color tokens might now be visible) ───
  // No-op for CSS vars themselves, but triggers re-render so
  // unlock gates in UI update without a page refresh.
  useEffect(() => {
    // Nothing to do for CSS vars, but the context re-provides
    // updated isThemeUnlocked, so consumers re-render correctly.
  }, [userLevel]);

  // ── Public setter ─────────────────────────────────────
  const setActiveTheme = useCallback(
    (themeId) => {
      if (!THEMES[themeId]) {
        console.warn(`[ThemeContext] Unknown theme id: "${themeId}"`);
        return;
      }
      if (!checkThemeUnlocked(themeId, userLevel)) {
        console.warn(
          `[ThemeContext] Theme "${themeId}" is locked (requires level ${getUnlockLevel(themeId)}, user is level ${userLevel}).`,
        );
        return; // Silently block — UI should guard before calling
      }
      setActiveThemeState(themeId);
      try {
        localStorage.setItem(STORAGE_KEY, themeId);
      } catch {
        // Silently ignore if storage unavailable
      }
    },
    [userLevel],
  );

  // ── Expose applyTheme directly (for rare imperative use) ──
  const applyTheme = useCallback((themeId) => {
    applyThemeTokens(themeId);
  }, []);

  // ─────────────────────────────────────────────────────
  const value = {
    activeTheme,
    setActiveTheme,
    theme,
    themes: THEME_LIST,
    isThemeUnlocked,
    applyTheme,
    userLevel,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ─────────────────────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────────────────────

/**
 * useTheme()
 *
 * Returns:
 *   activeTheme    — string id of current theme
 *   setActiveTheme — (themeId) => void  — respects unlock gate
 *   theme          — full theme object { navy, gold, bg, ... }
 *   themes         — THEME_LIST (ordered, all 29)
 *   isThemeUnlocked — (themeId) => boolean
 *   applyTheme     — (themeId) => void  — imperative CSS-var apply
 *   userLevel      — number passed from App.jsx
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }
  return ctx;
}

export default ThemeContext;
