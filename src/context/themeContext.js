import { createContext, useContext } from 'react'

export const THEME_STORAGE_KEY = 'portfolio-theme'
export const DARK = 'dark'
export const LIGHT = 'light'
export const LIGHT_QUERY = '(prefers-color-scheme: light)'
export const THEME_ATTRIBUTE = 'data-theme'

export const ThemeContext = createContext(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === null) {
    throw new Error('useTheme precisa estar dentro de ThemeProvider')
  }
  return context
}
