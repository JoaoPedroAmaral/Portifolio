import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  DARK,
  LIGHT,
  LIGHT_QUERY,
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
  ThemeContext,
} from './themeContext'

function readStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === DARK || stored === LIGHT) return stored
  } catch {
    return null
  }
  return null
}

function readSystemTheme() {
  if (typeof window.matchMedia !== 'function') return DARK
  return window.matchMedia(LIGHT_QUERY).matches ? LIGHT : DARK
}

function resolveInitialTheme() {
  return readStoredTheme() ?? readSystemTheme()
}

function persistTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    return
  }
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(resolveInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute(THEME_ATTRIBUTE, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    const commit = () => {
      setTheme((current) => {
        const next = current === DARK ? LIGHT : DARK
        persistTheme(next)
        return next
      })
    }

    if (typeof document.startViewTransition !== 'function') {
      commit()
      return
    }

    document.startViewTransition(commit)
  }, [])

  const value = useMemo(
    () => ({ theme, toggleTheme, isDark: theme === DARK }),
    [theme, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
