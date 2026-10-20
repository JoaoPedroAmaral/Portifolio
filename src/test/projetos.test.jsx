import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import Projects from '../components/sections/Projects'
import { FEATURED_PROJECTS, PAST_PROJECTS } from '../constants/projects'
import { PROJECT_STATUS } from '../constants/projectStatus'
import { pt } from '../i18n/locales/pt'
import { renderWithLanguage } from './helpers'

const FEATURED_HEADING_LEVEL = 3
const EXPECTED_FEATURED_COUNT = 2
const EXPECTED_PAST_TITLES = ['Colorashin', 'Mentech', 'Chat JP']

function renderProjects() {
  return renderWithLanguage(<Projects />)
}

function cardFor(title) {
  const heading = screen.getByRole('heading', { level: FEATURED_HEADING_LEVEL, name: title })
  return heading.closest('article')
}

describe('Projetos em destaque', () => {
  it('2.1 apresenta exatamente dois projetos em destaque', () => {
    expect(FEATURED_PROJECTS).toHaveLength(EXPECTED_FEATURED_COUNT)
  })

  it('2.2 traz Cofre de Gastos e Bot de Emprego entre os destaques', () => {
    renderProjects()
    expect(screen.getByRole('heading', { name: 'Cofre de Gastos' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Bot de Emprego' })).toBeInTheDocument()
  })

  it('2.3 oferece a ação de ver o código do Cofre de Gastos', () => {
    renderProjects()
    const card = cardFor('Cofre de Gastos')
    expect(within(card).getByRole('link', { name: /ver código de Cofre de Gastos/i })).toHaveAttribute(
      'href',
      'https://github.com/JoaoPedroAmaral/Cofre-de-gastos'
    )
  })

  it('2.4 oferece a demonstração publicada do Cofre de Gastos', () => {
    renderProjects()
    const card = cardFor('Cofre de Gastos')
    expect(within(card).getByRole('link', { name: /abrir demonstração/i })).toHaveAttribute(
      'href',
      'https://cofre-de-gastos.pages.dev/'
    )
  })

  it('2.5 não oferece link de código para o Bot de Emprego, cujo repositório é privado', () => {
    renderProjects()
    const card = cardFor('Bot de Emprego')
    expect(within(card).queryByRole('link', { name: /ver código/i })).toBeNull()
  })

  it('2.6 informa que o código do Bot de Emprego é fechado', () => {
    renderProjects()
    const card = cardFor('Bot de Emprego')
    expect(within(card).getByText(/código fechado/i)).toBeInTheDocument()
  })

  it('2.7 não renderiza nenhuma ação apontando para destino vazio', () => {
    renderProjects()
    screen.getAllByRole('link').forEach((link) => {
      const href = link.getAttribute('href')
      expect(href).toBeTruthy()
      expect(href).not.toMatch(/undefined|null/)
    })
  })
})

describe('Projetos anteriores', () => {
  it('3.1 lista Colorashin, Mentech e Chat JP', () => {
    renderProjects()
    EXPECTED_PAST_TITLES.forEach((title) => {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    })
  })

  it('3.2 exibe um selo de estado em cada projeto anterior', () => {
    renderProjects()
    PAST_PROJECTS.forEach((project) => {
      const card = cardFor(project.title)
      const expectedLabel = pt.status[project.status]
      expect(within(card).getByText(expectedLabel)).toBeInTheDocument()
    })
  })

  it('3.3 usa apenas selos do conjunto válido', () => {
    const validStatuses = Object.values(PROJECT_STATUS)
    const allProjects = [...FEATURED_PROJECTS, ...PAST_PROJECTS]

    allProjects.forEach((project) => {
      expect(validStatuses).toContain(project.status)
    })
  })

  it('3.4 não repete os destaques na lista de anteriores', () => {
    const featuredIds = FEATURED_PROJECTS.map((project) => project.id)
    const pastIds = PAST_PROJECTS.map((project) => project.id)
    const overlap = pastIds.filter((id) => featuredIds.includes(id))

    expect(overlap).toHaveLength(0)
  })

  it('3.5 omite a demonstração no projeto que não tem deploy publicado', () => {
    renderProjects()
    const card = cardFor('Chat JP')
    expect(within(card).queryByRole('link', { name: /abrir demonstração/i })).toBeNull()
  })

  it('3.6 oferece demonstração nos projetos anteriores que estão no ar', () => {
    renderProjects()
    const card = cardFor('Colorashin')
    expect(within(card).getByRole('link', { name: /abrir demonstração/i })).toHaveAttribute(
      'href',
      'https://colorashin.onrender.com'
    )
  })
})
