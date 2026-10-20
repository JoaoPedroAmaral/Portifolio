import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LanguageProvider from '../i18n/LanguageProvider'
import LanguageSwitcher from '../components/layout/LanguageSwitcher'
import About from '../components/sections/About'
import { LANGUAGES, LANGUAGE_STORAGE_KEY } from '../i18n/languages'
import { pt } from '../i18n/locales/pt'
import { en } from '../i18n/locales/en'
import { es } from '../i18n/locales/es'

const EXPECTED_CODES = ['pt', 'en', 'es']

function renderSwitcher() {
  return render(
    <LanguageProvider>
      <LanguageSwitcher />
      <About />
    </LanguageProvider>
  )
}

function stubBrowserLanguages(languages) {
  vi.spyOn(navigator, 'languages', 'get').mockReturnValue(languages)
}

describe('Idiomas', () => {
  it('9.1 oferece português, inglês e espanhol', () => {
    expect(LANGUAGES.map((entry) => entry.code)).toEqual(EXPECTED_CODES)
  })

  it('9.2 abre no idioma persistido', () => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'es')
    renderSwitcher()
    expect(screen.getByRole('heading', { name: es.about.title })).toBeInTheDocument()
  })

  it('9.3 cai para o idioma do navegador quando não há escolha persistida', () => {
    localStorage.clear()
    stubBrowserLanguages(['en-US', 'en'])
    renderSwitcher()
    expect(screen.getByRole('heading', { name: en.about.title })).toBeInTheDocument()
  })

  it('9.4 cai para português quando o navegador pede idioma não suportado', () => {
    localStorage.clear()
    stubBrowserLanguages(['de-DE', 'ja'])
    renderSwitcher()
    expect(screen.getByRole('heading', { name: pt.about.title })).toBeInTheDocument()
  })

  it('9.5 troca o conteúdo ao escolher outro idioma', async () => {
    const user = userEvent.setup()
    renderSwitcher()
    expect(screen.getByRole('heading', { name: pt.about.title })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: pt.language.choose }))
    await user.click(screen.getByRole('button', { name: /English/ }))

    expect(screen.getByRole('heading', { name: en.about.title })).toBeInTheDocument()
  })

  it('9.6 persiste o idioma escolhido', async () => {
    const user = userEvent.setup()
    renderSwitcher()

    await user.click(screen.getByRole('button', { name: pt.language.choose }))
    await user.click(screen.getByRole('button', { name: /Español/ }))

    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('es')
  })

  it('9.7 declara o idioma escolhido no documento', async () => {
    const user = userEvent.setup()
    renderSwitcher()

    await user.click(screen.getByRole('button', { name: pt.language.choose }))
    await user.click(screen.getByRole('button', { name: /English/ }))

    expect(document.documentElement.lang).toBe('en')
  })

  it('9.8 mantém a mesma estrutura de chaves nos três idiomas', () => {
    const shape = (value) => {
      if (Array.isArray(value)) return 'array'
      if (typeof value !== 'object' || value === null) return typeof value
      return Object.fromEntries(
        Object.keys(value)
          .sort()
          .map((key) => [key, shape(value[key])])
      )
    }

    expect(shape(en)).toEqual(shape(pt))
    expect(shape(es)).toEqual(shape(pt))
  })
})
