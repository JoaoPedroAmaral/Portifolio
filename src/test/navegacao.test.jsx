import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { NAV_LINKS } from '../constants/site'
import { pt } from '../i18n/locales/pt'
import { mockGitHub, renderWithProviders } from './helpers'

function renderApp() {
  mockGitHub({ repos: [] })
  return renderWithProviders(<App />)
}

describe('Navegação', () => {
  it('6.1 aponta cada destino para uma seção existente no documento', () => {
    renderApp()
    NAV_LINKS.forEach((link) => {
      expect(document.getElementById(link.id)).not.toBeNull()
    })
  })

  it('6.2 não prefixa os destinos com número de ordem', () => {
    renderApp()
    const navigation = screen.getByRole('navigation', { name: /navegação principal/i })

    expect(within(navigation).queryByText(/^\d{2}$/)).toBeNull()
    NAV_LINKS.forEach((link) => {
      const destination = within(navigation).getAllByRole('link', { name: pt.nav[link.key] })[0]
      expect(destination).toHaveAccessibleName(pt.nav[link.key])
    })
  })

  it('6.3 abre o menu estreito e anuncia o estado expandido', async () => {
    const user = userEvent.setup()
    renderApp()

    const toggle = screen.getByRole('button', { name: /abrir menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)

    expect(screen.getByRole('button', { name: /fechar menu/i })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
  })

  it('6.4 fecha o menu estreito ao escolher um destino', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', { name: /abrir menu/i }))

    const menu = document.getElementById('menu-navegacao')
    await user.click(within(menu).getByRole('link', { name: /sobre/i }))

    expect(screen.getByRole('button', { name: /abrir menu/i })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })
})

describe('Acessibilidade e estrutura', () => {
  it('7.1 declara os marcos semânticos da página', () => {
    renderApp()
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /navegação principal/i })).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('7.2 tem exatamente um título de nível um', () => {
    renderApp()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('7.3 dá nome acessível a cada seção de conteúdo', () => {
    renderApp()
    const sections = screen.getAllByRole('region')
    expect(sections.length).toBeGreaterThan(0)

    sections.forEach((section) => {
      expect(section).toHaveAccessibleName()
    })
  })

  it('7.4 oferece o atalho para o conteúdo como primeiro destino tabulável', () => {
    renderApp()
    const skipLink = screen.getByRole('link', { name: /pular para o conteúdo/i })

    expect(skipLink).toHaveAttribute('href', '#conteudo')
    expect(document.getElementById('conteudo')).not.toBeNull()
  })

  it('7.5 declara texto alternativo em toda imagem', () => {
    renderApp()
    document.querySelectorAll('img').forEach((image) => {
      expect(image.hasAttribute('alt')).toBe(true)
    })
  })

  it('7.6 dá nome acessível a todo controle acionável', () => {
    renderApp()
    screen.getAllByRole('button').forEach((button) => {
      expect(button).toHaveAccessibleName()
    })
  })
})
