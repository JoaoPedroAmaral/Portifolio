import { useState, useEffect } from 'react'

const GITHUB_USERNAME = 'JoaoPedroAmaral'

export function useGitHubStats() {
  const [stats, setStats] = useState({ repos: null, followers: null, stars: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
        ])

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error')

        const user = await userRes.json()
        const repos = await reposRes.json()

        const totalStars = Array.isArray(repos)
          ? repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
          : 0

        setStats({
          repos: user.public_repos ?? 0,
          followers: user.followers ?? 0,
          stars: totalStars,
        })
      } catch {
        setStats({ repos: 0, followers: 0, stars: 0 })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading }
}
