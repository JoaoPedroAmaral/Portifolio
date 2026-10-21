import { useEffect, useState } from 'react'
import { GITHUB_USERNAME } from '../constants/site'

const API_ROOT = 'https://api.github.com'
const REPOS_PER_PAGE = 100
const RECENT_REPOS_LIMIT = 6
const EMPTY_STATS = { repos: 0, followers: 0, stars: 0 }

function isOwnWork(repo) {
  return !repo.fork && repo.name !== GITHUB_USERNAME
}

function sumStars(repos) {
  return repos
    .filter(isOwnWork)
    .reduce((total, repo) => total + (repo.stargazers_count ?? 0), 0)
}

function selectShowcaseRepos(repos) {
  return repos
    .filter(isOwnWork)
    .sort((first, second) => new Date(second.updated_at) - new Date(first.updated_at))
    .slice(0, RECENT_REPOS_LIMIT)
}

export function useGitHubProfile() {
  const [state, setState] = useState({
    stats: EMPTY_STATS,
    repos: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          fetch(`${API_ROOT}/users/${GITHUB_USERNAME}`, { signal: controller.signal }),
          fetch(`${API_ROOT}/users/${GITHUB_USERNAME}/repos?per_page=${REPOS_PER_PAGE}`, {
            signal: controller.signal,
          }),
        ])

        if (!userResponse.ok || !reposResponse.ok) {
          throw new Error('Não foi possível consultar a API do GitHub')
        }

        const user = await userResponse.json()
        const repos = await reposResponse.json()
        const repoList = Array.isArray(repos) ? repos : []

        setState({
          stats: {
            repos: user.public_repos ?? 0,
            followers: user.followers ?? 0,
            stars: sumStars(repoList),
          },
          repos: selectShowcaseRepos(repoList),
          loading: false,
          error: null,
        })
      } catch (error) {
        if (controller.signal.aborted) return
        setState({ stats: EMPTY_STATS, repos: [], loading: false, error: error.message })
      }
    }

    load()
    return () => controller.abort()
  }, [])

  return state
}
