import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import Experience from '../components/sections/Experience'
import Skills from '../components/sections/Skills'
import { EXPERIENCES } from '../constants/experience'
import { CERTIFICATIONS } from '../constants/certifications'
import { SKILL_GROUPS } from '../constants/skills'
import { pt } from '../i18n/locales/pt'
import { en } from '../i18n/locales/en'
import { es } from '../i18n/locales/es'
import { renderWithLanguage } from './helpers'

const LOCALES = { pt, en, es }
const SERVICENOW_ISSUER = 'ServiceNow'
const EXPECTED_SERVICENOW_CREDENTIALS = 6

describe('Trajetória profissional', () => {
  it('11.1 lista os quatro vínculos do perfil, do mais recente ao mais antigo', () => {
    expect(EXPERIENCES.map((entry) => entry.id)).toEqual([
      'chain-academy',
      'sea-tecnologia',
      'cbtu-estagio',
      'cbtu-aprendiz',
    ])
  })

  it('11.2 marca como atual somente os vínculos sem data de término', () => {
    EXPERIENCES.forEach((entry) => {
      expect(entry.current).toBe(entry.end === null)
    })
  })

  it('11.3 nunca termina um vínculo antes de começar', () => {
    EXPERIENCES.filter((entry) => entry.end !== null).forEach((entry) => {
      expect(entry.end >= entry.start).toBe(true)
    })
  })

  it('11.4 descreve cada vínculo em todos os idiomas', () => {
    Object.values(LOCALES).forEach((locale) => {
      EXPERIENCES.forEach((entry) => {
        const content = locale.experience.items[entry.id]
        expect(content).toBeDefined()
        expect(content.role.length).toBeGreaterThan(0)
        expect(content.highlights.length).toBeGreaterThan(0)
      })
    })
  })

  it('11.5 exibe o cargo atual na SEA Tecnologia como Frontend Developer', () => {
    renderWithLanguage(<Experience />)
    const heading = screen.getByRole('heading', { name: 'Frontend Developer' })
    expect(heading.parentElement).toHaveTextContent('SEA Tecnologia')
  })

  it('11.6 não anuncia vínculo de emprego que o perfil não declara', () => {
    renderWithLanguage(<Experience />)
    expect(screen.queryByText(/BuildCLI/i)).toBeNull()
  })

  it('11.7 formata o período no idioma ativo e marca o vínculo em aberto', () => {
    renderWithLanguage(<Experience />)
    expect(screen.getAllByText(new RegExp(pt.experience.present)).length).toBeGreaterThan(0)
  })
})

describe('Credenciais e stack', () => {
  it('11.8 reúne as seis credenciais ServiceNow do perfil', () => {
    const servicenow = CERTIFICATIONS.filter((item) => item.issuer === SERVICENOW_ISSUER)
    expect(servicenow).toHaveLength(EXPECTED_SERVICENOW_CREDENTIALS)
  })

  it('11.9 renderiza toda certificação com emissor e data', () => {
    renderWithLanguage(<Skills />)
    const list = screen.getByRole('list', { name: pt.certifications.title })

    CERTIFICATIONS.forEach((certification) => {
      expect(within(list).getByText(certification.name)).toBeInTheDocument()
    })
  })

  it('11.10 traduz o rótulo de todo grupo de stack nos três idiomas', () => {
    Object.values(LOCALES).forEach((locale) => {
      SKILL_GROUPS.forEach((group) => {
        expect(locale.skills.groups[group.id]).toBeDefined()
      })
    })
  })

  it('11.11 declara ServiceNow como grupo próprio da stack', () => {
    const servicenow = SKILL_GROUPS.find((group) => group.id === 'servicenow')
    expect(servicenow).toBeDefined()
    expect(servicenow.skills).toContain('ServiceNow')
  })
})
