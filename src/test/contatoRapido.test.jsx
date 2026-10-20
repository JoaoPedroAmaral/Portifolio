import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuickContact from '../components/layout/QuickContact'
import { CONTACT_CHANNELS } from '../constants/contact'
import { pt } from '../i18n/locales/pt'
import { renderWithLanguage } from './helpers'

function openPanel(user) {
  return user.click(screen.getByRole('button', { name: pt.contact.openQuickContact }))
}

describe('Contato rápido', () => {
  it('10.1 começa fechado, sem expor os canais', () => {
    renderWithLanguage(<QuickContact />)

    expect(screen.getByRole('button', { name: pt.contact.openQuickContact })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
    expect(screen.queryByRole('link')).toBeNull()
  })

  it('10.2 revela os canais de acesso rápido ao ser acionado', async () => {
    const user = userEvent.setup()
    renderWithLanguage(<QuickContact />)

    await openPanel(user)

    expect(screen.getAllByRole('link')).toHaveLength(CONTACT_CHANNELS.length)
  })

  it('10.3 leva cada canal ao seu destino real', async () => {
    const user = userEvent.setup()
    renderWithLanguage(<QuickContact />)

    await openPanel(user)

    CONTACT_CHANNELS.forEach((channel) => {
      const label = pt.contact.channels[channel.id]
      const value = channel.value ?? pt.contact.lattesValue
      expect(screen.getByRole('link', { name: `${label}: ${value}` })).toHaveAttribute(
        'href',
        channel.href
      )
    })
  })

  it('10.4 anuncia o estado expandido e permite fechar', async () => {
    const user = userEvent.setup()
    renderWithLanguage(<QuickContact />)

    await openPanel(user)
    const closeButton = screen.getByRole('button', { name: pt.contact.closeQuickContact })
    expect(closeButton).toHaveAttribute('aria-expanded', 'true')

    await user.click(closeButton)

    expect(screen.getByRole('button', { name: pt.contact.openQuickContact })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  it('10.5 fecha ao pressionar Escape', async () => {
    const user = userEvent.setup()
    renderWithLanguage(<QuickContact />)

    await openPanel(user)
    await user.keyboard('{Escape}')

    expect(screen.getByRole('button', { name: pt.contact.openQuickContact })).toBeInTheDocument()
  })

  it('10.6 declara rel seguro nos canais que abrem em nova aba', async () => {
    const user = userEvent.setup()
    renderWithLanguage(<QuickContact />)

    await openPanel(user)

    screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('target') === '_blank')
      .forEach((link) => {
        const rel = link.getAttribute('rel') ?? ''
        expect(rel).toContain('noopener')
        expect(rel).toContain('noreferrer')
      })
  })

  it('10.7 expõe também o currículo acadêmico, que não tem mais seção própria', async () => {
    const user = userEvent.setup()
    renderWithLanguage(<QuickContact />)

    await openPanel(user)

    expect(
      screen.getByRole('link', { name: `${pt.contact.channels.lattes}: ${pt.contact.lattesValue}` })
    ).toBeInTheDocument()
  })
})
