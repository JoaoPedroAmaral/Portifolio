import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'
import Experience from '../components/sections/Experience'
import { mockMatchMedia } from './setup'
import { renderWithLanguage } from './helpers'

const REDUCED_MOTION = { prefersReducedMotion: true }

describe('Movimento reduzido', () => {
  it('8.1 entrega o conteúdo das seções em estado final, sem depender de animação', () => {
    mockMatchMedia(REDUCED_MOTION)

    renderWithLanguage(
      <>
        <About />
        <Experience />
        <Skills />
      </>
    )

    expect(screen.getByRole('heading', { name: /sistemas que continuam de pé/i })).toBeVisible()
    expect(screen.getByRole('heading', { name: /experiência profissional/i })).toBeVisible()
    expect(screen.getByRole('heading', { name: /stack e ferramentas/i })).toBeVisible()
    expect(screen.getByText('Spring Boot')).toBeVisible()
  })

  it('8.2 mantém o conteúdo legível sem transformação residual de entrada', () => {
    mockMatchMedia(REDUCED_MOTION)

    renderWithLanguage(<Skills />)

    const heading = screen.getByRole('heading', { name: /stack e ferramentas/i })
    expect(heading).toBeInTheDocument()
    expect(heading).not.toHaveStyle({ opacity: '0' })
  })
})
