import { useState, useEffect } from 'react'

const GITHUB_USERNAME = 'JoaoPedroAmaral'

export function useGitHubRepos() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
        )
        if (!res.ok) throw new Error(`GitHub API: ${res.status}`)
        const data = await res.json()
        setRepos(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  return { repos, loading, error }
}
