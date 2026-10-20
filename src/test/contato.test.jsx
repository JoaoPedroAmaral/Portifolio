import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuickContact from '../components/layout/QuickContact'
import About from '../components/sections/About'
import Footer from '../components/layout/Footer'
import { pt } from '../i18n/locales/pt'
import { renderWithLanguage } from './helpers'

const REAL_LINKEDIN = 'https://www.linkedin.com/in/joaopedroamaralrosa/'
const OUTDATED_LINKEDIN_HANDLES = ['JoaoPedroAmaralRosa', 'joao-pedro-amaral-rosa-8a36b61a2']

async function openQuickContact() {
  const user = userEvent.setup()
  renderWithLanguage(<QuickContact />)
  await user.click(screen.getByRole('button', { name: pt.contact.openQuickContact }))
}

describe('Dados de contato e identidade', () => {
  it('5.1 aponta para o perfil real do LinkedIn', async () => {
    await openQuickContact()
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', REAL_LINKEDIN)
  })

  it('5.2 não mantém referência a nenhum perfil antigo do LinkedIn', async () => {
    await openQuickContact()
    OUTDATED_LINKEDIN_HANDLES.forEach((handle) => {
      expect(document.body.innerHTML).not.toContain(handle)
    })
  })

  it('5.3 exibe a localização correta na seção Sobre', () => {
    renderWithLanguage(<About />)
    expect(screen.getByText('Brasília, DF')).toBeInTheDocument()
  })

  it('5.8 exibe a formação e a certificação na seção Sobre', () => {
    renderWithLanguage(<About />)
    expect(screen.getByText('Ciência da Computação, UDF')).toBeInTheDocument()
    expect(screen.getByText('ServiceNow CSA')).toBeInTheDocument()
  })

  it('5.4 declara rel seguro em todo link que abre em nova aba', async () => {
    await openQuickContact()

    screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('target') === '_blank')
      .forEach((link) => {
        const rel = link.getAttribute('rel') ?? ''
        expect(rel).toContain('noopener')
        expect(rel).toContain('noreferrer')
      })
  })

  it('5.5 oferece caminho de e-mail acionável', async () => {
    await openQuickContact()
    const emailLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.startsWith('mailto:'))

    expect(emailLinks.length).toBeGreaterThan(0)
  })

  it('5.6 usa foto com texto alternativo não vazio', () => {
    renderWithLanguage(<About />)
    const photo = screen.getByRole('img')
    expect(photo).toHaveAccessibleName()
    expect(photo.getAttribute('alt')).not.toBe('')
  })

  it('5.7 não repete canais de contato no rodapé', () => {
    renderWithLanguage(<Footer />)
    expect(screen.queryByRole('link', { name: /linkedin|github|e-mail/i })).toBeNull()
  })
})
