import { render } from '@testing-library/react'
import { vi } from 'vitest'
import ThemeProvider from '../context/ThemeProvider'
import LanguageProvider from '../i18n/LanguageProvider'
import GitHubProvider from '../context/GitHubProvider'

export const GITHUB_USER_PATTERN = /api\.github\.com\/users\/[^/]+$/
export const GITHUB_REPOS_PATTERN = /api\.github\.com\/users\/[^/]+\/repos/

export const sampleUser = {
  public_repos: 45,
  followers: 15,
}

export function makeRepo(overrides = {}) {
  return {
    id: Math.random(),
    name: 'repositorio',
    description: 'Descrição do repositório',
    html_url: 'https://github.com/JoaoPedroAmaral/repositorio',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: new Date().toISOString(),
    ...overrides,
  }
}

function jsonResponse(payload) {
  return Promise.resolve({ ok: true, json: () => Promise.resolve(payload) })
}

export function mockGitHub({ user = sampleUser, repos = [], failing = false } = {}) {
  const fetchMock = vi.fn((url) => {
    if (failing) return Promise.resolve({ ok: false, json: () => Promise.resolve({}) })
    if (GITHUB_REPOS_PATTERN.test(url)) return jsonResponse(repos)
    if (GITHUB_USER_PATTERN.test(url)) return jsonResponse(user)
    return Promise.resolve({ ok: false, json: () => Promise.resolve({}) })
  })

  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

export function renderWithProviders(ui) {
  return render(
    <LanguageProvider>
      <ThemeProvider>
        <GitHubProvider>{ui}</GitHubProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export function renderWithLanguage(ui) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

export function countCalls(fetchMock, pattern) {
  return fetchMock.mock.calls.filter(([url]) => pattern.test(url)).length
}
