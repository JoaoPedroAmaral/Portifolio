import { createContext, useContext } from 'react'
import { pt } from './locales/pt'
import { en } from './locales/en'
import { es } from './locales/es'

export const TRANSLATIONS = { pt, en, es }

export const LanguageContext = createContext(null)

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (context === null) {
    throw new Error('useTranslation precisa estar dentro de LanguageProvider')
  }
  return context
}
