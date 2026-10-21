import { describe, expect, it } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import GitHubRepos from '../components/sections/GitHubRepos'
import Hero from '../components/sections/Hero'
import {
  GITHUB_REPOS_PATTERN,
  GITHUB_USER_PATTERN,
  countCalls,
  makeRepo,
  mockGitHub,
  renderWithProviders,
} from './helpers'

const SKELETON_LABEL = 'Repositórios do GitHub'

function daysAgo(days) {
  return new Date(Date.now() - days * 86400000).toISOString()
}

describe('Integração com GitHub', () => {
  it('4.1 consulta o endereço de repositórios uma única vez', async () => {
    const fetchMock = mockGitHub({ repos: [makeRepo({ id: 1, name: 'alpha' })] })
    renderWithProviders(<GitHubRepos />)

    await waitFor(() => expect(screen.getByRole('heading', { name: 'alpha' })).toBeInTheDocument())

    expect(countCalls(fetchMock, GITHUB_REPOS_PATTERN)).toBe(1)
  })

  it('4.2 alimenta números do perfil e lista de repositórios na mesma passagem', async () => {
    const fetchMock = mockGitHub({
      user: { public_repos: 45, followers: 15 },
      repos: [makeRepo({ id: 2, name: 'beta', stargazers_count: 3 })],
    })

    renderWithProviders(
      <>
        <Hero />
        <GitHubRepos />
      </>
    )

    await waitFor(() => expect(screen.getByText('45')).toBeInTheDocument())
    expect(screen.getByRole('heading', { name: 'beta' })).toBeInTheDocument()

    expect(countCalls(fetchMock, GITHUB_REPOS_PATTERN)).toBe(1)
    expect(countCalls(fetchMock, GITHUB_USER_PATTERN)).toBe(1)
  })

  it('4.3 exibe esqueleto de carregamento antes da resposta', async () => {
    mockGitHub({ repos: [makeRepo({ id: 10, name: 'gama' })] })
    renderWithProviders(<GitHubRepos />)

    expect(screen.getByLabelText(SKELETON_LABEL)).toHaveAttribute('aria-busy', 'true')

    await waitFor(() =>
      expect(screen.getByLabelText(SKELETON_LABEL)).toHaveAttribute('aria-busy', 'false')
    )
  })

  it('4.4 exibe mensagem de erro quando a API falha', async () => {
    mockGitHub({ failing: true })
    renderWithProviders(<GitHubRepos />)

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(/não foi possível carregar os repositórios/i)
  })

  it('4.5 oferece link para o perfil quando a API falha', async () => {
    mockGitHub({ failing: true })
    renderWithProviders(<GitHubRepos />)

    const alert = await screen.findByRole('alert')
    expect(within(alert).getByRole('link')).toHaveAttribute(
      'href',
      'https://github.com/JoaoPedroAmaral'
    )
  })

  it('4.6 mantém a seção renderizada mesmo com a API falhando', async () => {
    mockGitHub({ failing: true })
    renderWithProviders(<GitHubRepos />)

    await screen.findByRole('alert')
    expect(screen.getByRole('heading', { name: /repositórios recentes/i })).toBeInTheDocument()
  })

  it('4.7 descarta bifurcações de outros repositórios', async () => {
    mockGitHub({
      repos: [
        makeRepo({ id: 3, name: 'proprio', fork: false }),
        makeRepo({ id: 4, name: 'bifurcado', fork: true }),
      ],
    })
    renderWithProviders(<GitHubRepos />)

    await waitFor(() => expect(screen.getByRole('heading', { name: 'proprio' })).toBeInTheDocument())
    expect(screen.queryByRole('heading', { name: 'bifurcado' })).toBeNull()
  })

  it('4.8 descarta o repositório de perfil, homônimo do usuário', async () => {
    mockGitHub({
      repos: [
        makeRepo({ id: 5, name: 'projeto-real' }),
        makeRepo({ id: 6, name: 'JoaoPedroAmaral' }),
      ],
    })
    renderWithProviders(<GitHubRepos />)

    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'projeto-real' })).toBeInTheDocument()
    )
    expect(screen.queryByRole('heading', { name: 'JoaoPedroAmaral' })).toBeNull()
  })

  it('4.10 conta estrelas apenas do trabalho próprio, sem bifurcações', async () => {
    mockGitHub({
      repos: [
        makeRepo({ id: 20, name: 'proprio-a', stargazers_count: 3 }),
        makeRepo({ id: 21, name: 'proprio-b', stargazers_count: 2 }),
        makeRepo({ id: 22, name: 'bifurcado', stargazers_count: 99, fork: true }),
        makeRepo({ id: 23, name: 'JoaoPedroAmaral', stargazers_count: 50 }),
      ],
    })
    renderWithProviders(<Hero />)

    await waitFor(() => expect(screen.getByText('5')).toBeInTheDocument())
    expect(screen.queryByText('154')).toBeNull()
  })

  it('4.9 ordena da atualização mais recente para a mais antiga', async () => {
    mockGitHub({
      repos: [
        makeRepo({ id: 7, name: 'antigo', updated_at: daysAgo(90) }),
        makeRepo({ id: 8, name: 'recente', updated_at: daysAgo(1) }),
        makeRepo({ id: 9, name: 'intermediario', updated_at: daysAgo(30) }),
      ],
    })
    renderWithProviders(<GitHubRepos />)

    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'recente' })).toBeInTheDocument()
    )

    const names = screen.getAllByRole('heading', { level: 3 }).map((node) => node.textContent)
    expect(names).toEqual(['recente', 'intermediario', 'antigo'])
  })
})
