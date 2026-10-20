import { createContext, useContext } from 'react'

export const GitHubContext = createContext(null)

export function useGitHub() {
  const context = useContext(GitHubContext)
  if (context === null) {
    throw new Error('useGitHub precisa estar dentro de GitHubProvider')
  }
  return context
}
