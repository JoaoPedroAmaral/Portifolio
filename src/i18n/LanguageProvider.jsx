import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  LANGUAGE_STORAGE_KEY,
  isSupported,
  matchBrowserLanguage,
} from './languages'
import { LanguageContext, TRANSLATIONS } from './languageContext'

function readStoredLanguage() {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (isSupported(stored)) return stored
  } catch {
    return null
  }
  return null
}

function resolveInitialLanguage() {
  return readStoredLanguage() ?? matchBrowserLanguage(navigator.languages ?? [navigator.language])
}

function persistLanguage(language) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  } catch {
    return
  }
}

export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(resolveInitialLanguage)

  const translations = TRANSLATIONS[language] ?? TRANSLATIONS[DEFAULT_LANGUAGE]

  useEffect(() => {
    const descriptor = LANGUAGES.find((entry) => entry.code === language)
    document.documentElement.lang = descriptor?.htmlLang ?? language
    document.title = translations.meta.title

    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', translations.meta.description)
  }, [language, translations])

  const changeLanguage = useCallback((next) => {
    if (!isSupported(next)) return
    persistLanguage(next)
    setLanguage(next)
  }, [])

  const value = useMemo(
    () => ({ language, changeLanguage, t: translations }),
    [language, changeLanguage, translations]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
