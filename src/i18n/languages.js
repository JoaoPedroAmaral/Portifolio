export const LANGUAGE_STORAGE_KEY = 'portfolio-language'

export const LANGUAGES = [
  { code: 'pt', label: 'Português', short: 'PT', htmlLang: 'pt-BR' },
  { code: 'en', label: 'English', short: 'EN', htmlLang: 'en' },
  { code: 'es', label: 'Español', short: 'ES', htmlLang: 'es' },
]

export const DEFAULT_LANGUAGE = 'pt'

export function isSupported(code) {
  return LANGUAGES.some((language) => language.code === code)
}

export function matchBrowserLanguage(browserLanguages) {
  const candidates = Array.isArray(browserLanguages) ? browserLanguages : []

  for (const entry of candidates) {
    const code = String(entry).slice(0, 2).toLowerCase()
    if (isSupported(code)) return code
  }

  return DEFAULT_LANGUAGE
}
