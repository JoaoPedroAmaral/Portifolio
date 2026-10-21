import { describe, expect, it, vi } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import Hero from '../components/sections/Hero'
import { NAV_LINKS } from '../constants/site'
import { readFileSync } from 'node:fs'
import { BROWSER_BAR_COLORS, DARK, LIGHT } from '../context/themeContext'
import { pt } from '../i18n/locales/pt'
import { makeRepo, mockGitHub, renderWithProviders } from './helpers'

const THEME_COLOR_SELECTOR = 'meta[name="theme-color"]'
const EMPTY_STAT = '—'

function installThemeColorMeta() {
  const meta = document.createElement('meta')
  meta.setAttribute('name', 'theme-color')
  meta.setAttribute('content', '#000000')
  document.head.appendChild(meta)
  return meta
}

async function openMobileMenu(user) {
  await user.click(screen.getByRole('button', { name: pt.nav.openMenu }))
  return document.getElementById('menu-navegacao')
}

describe('Navegação pelo menu estreito', () => {
  it('12.1 rola até a seção escolhida em vez de confiar no salto do navegador', async () => {
    const user = userEvent.setup()
    mockGitHub({ repos: [] })
    renderWithProviders(<App />)

    const destino = document.getElementById('projetos')
    const scrollIntoView = vi.fn()
    destino.scrollIntoView = scrollIntoView

    const menu = await openMobileMenu(user)
    await user.click(within(menu).getByRole('link', { name: pt.nav.projects }))

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled())
    expect(scrollIntoView.mock.calls[0][0]).toMatchObject({ block: 'start' })
  })

  it('12.2 rola somente depois que o menu termina de fechar', async () => {
    const user = userEvent.setup()
    mockGitHub({ repos: [] })
    renderWithProviders(<App />)

    const destino = document.getElementById('sobre')
    let menuAbertoNoMomentoDaRolagem = null
    destino.scrollIntoView = vi.fn(() => {
      menuAbertoNoMomentoDaRolagem = !!screen.queryByRole('button', { name: pt.nav.closeMenu })
    })

    const menu = await openMobileMenu(user)
    await user.click(within(menu).getByRole('link', { name: pt.nav.about }))

    await waitFor(() => expect(destino.scrollIntoView).toHaveBeenCalled())
    expect(menuAbertoNoMomentoDaRolagem).toBe(false)
  })

  it('12.3 registra o destino escolhido no endereço', async () => {
    const user = userEvent.setup()
    mockGitHub({ repos: [] })
    renderWithProviders(<App />)

    document.getElementById('skills').scrollIntoView = vi.fn()

    const menu = await openMobileMenu(user)
    await user.click(within(menu).getByRole('link', { name: pt.nav.skills }))

    await waitFor(() => expect(window.location.hash).toBe('#skills'))
  })

  it('12.4 cobre todos os destinos declarados', async () => {
    const user = userEvent.setup()
    mockGitHub({ repos: [] })
    renderWithProviders(<App />)

    const menu = await openMobileMenu(user)

    NAV_LINKS.forEach((link) => {
      const destino = within(menu).getByRole('link', { name: pt.nav[link.key] })
      expect(destino).toHaveAttribute('href', `#${link.id}`)
      expect(document.getElementById(link.id)).not.toBeNull()
    })
  })
})

describe('Cor da barra do navegador', () => {
  it('12.5 acompanha o tema escolhido, não o do sistema', async () => {
    const meta = installThemeColorMeta()
    const user = userEvent.setup()
    mockGitHub({ repos: [] })
    renderWithProviders(<App />)

    await waitFor(() => expect(meta.getAttribute('content')).not.toBe('#000000'))
    const noEscuro = meta.getAttribute('content')

    await user.click(screen.getByRole('button', { name: pt.theme.toLight }))

    await waitFor(() => expect(meta.getAttribute('content')).not.toBe(noEscuro))
    expect(meta.getAttribute('content')).toBe(BROWSER_BAR_COLORS[LIGHT])
    expect(noEscuro).toBe(BROWSER_BAR_COLORS[DARK])
    expect(document.querySelectorAll(THEME_COLOR_SELECTOR)).toHaveLength(1)

    meta.remove()
  })

  it('12.8 usa exatamente o fundo declarado no sistema de design', () => {
    const css = readFileSync('src/index.css', 'utf8')
    const escuro = css.match(/\[data-theme="dark"\][^}]*--bg:\s*([^;]+);/)
    const claro = css.match(/\[data-theme="light"\][^}]*--bg:\s*([^;]+);/)

    expect(escuro?.[1].trim()).toBe(BROWSER_BAR_COLORS[DARK])
    expect(claro?.[1].trim()).toBe(BROWSER_BAR_COLORS[LIGHT])
  })
})

describe('Números do perfil quando a API falha', () => {
  it('12.6 não anuncia zero repositórios quando a consulta falha', async () => {
    mockGitHub({ failing: true })
    renderWithProviders(<Hero />)

    await waitFor(() => {
      expect(screen.getAllByText(EMPTY_STAT).length).toBe(3)
    })
    expect(screen.queryByText('0')).toBeNull()
  })

  it('12.7 exibe os números reais quando a consulta funciona', async () => {
    mockGitHub({ user: { public_repos: 45, followers: 15 }, repos: [makeRepo({ stargazers_count: 7 })] })
    renderWithProviders(<Hero />)

    await waitFor(() => expect(screen.getByText('45')).toBeInTheDocument())
    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
  })
})
