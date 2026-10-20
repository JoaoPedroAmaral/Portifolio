import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeProvider from '../context/ThemeProvider'
import LanguageProvider from '../i18n/LanguageProvider'
import ThemeToggle from '../components/layout/ThemeToggle'
import { mockMatchMedia } from './setup'

const THEME_ATTRIBUTE = 'data-theme'
const STORAGE_KEY = 'portfolio-theme'

function renderToggle() {
  return render(
    <LanguageProvider>
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    </LanguageProvider>
  )
}

function currentTheme() {
  return document.documentElement.getAttribute(THEME_ATTRIBUTE)
}

describe('Tema', () => {
  it('1.1 abre no escuro em primeira visita sem preferência de sistema', () => {
    renderToggle()
    expect(currentTheme()).toBe('dark')
  })

  it('1.2 abre no claro quando o sistema declara preferência por claro', () => {
    mockMatchMedia({ prefersLight: true })
    renderToggle()
    expect(currentTheme()).toBe('light')
  })

  it('1.3 faz o tema persistido vencer a preferência do sistema', () => {
    localStorage.setItem(STORAGE_KEY, 'light')
    mockMatchMedia({ prefersLight: false })
    renderToggle()
    expect(currentTheme()).toBe('light')
  })

  it('1.4 alterna de escuro para claro quando acionado', async () => {
    const user = userEvent.setup()
    renderToggle()
    expect(currentTheme()).toBe('dark')

    await user.click(screen.getByRole('button'))

    expect(currentTheme()).toBe('light')
  })

  it('1.5 persiste a escolha para a próxima visita', async () => {
    const user = userEvent.setup()
    renderToggle()

    await user.click(screen.getByRole('button'))

    expect(localStorage.getItem(STORAGE_KEY)).toBe('light')
  })

  it('1.6 expõe um botão cujo rótulo descreve a ação, não o estado', () => {
    renderToggle()
    expect(screen.getByRole('button', { name: /mudar para tema claro/i })).toBeInTheDocument()
  })
})
