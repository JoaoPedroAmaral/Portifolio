import { useGitHubProfile } from '../hooks/useGitHubProfile'
import { GitHubContext } from './githubContext'

export default function GitHubProvider({ children }) {
  const profile = useGitHubProfile()
  return <GitHubContext.Provider value={profile}>{children}</GitHubContext.Provider>
}
