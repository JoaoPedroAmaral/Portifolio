import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, GitFork, ExternalLink, AlertCircle } from 'lucide-react'
import { useGitHubRepos } from '../hooks/useGitHubRepos'

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Java: '#b07219',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  default: '#71717a',
}

function LanguageDot({ language }) {
  const color = LANGUAGE_COLORS[language] ?? LANGUAGE_COLORS.default
  return (
    <span className="flex items-center gap-1.5 font-mono text-xs text-[#71717a]">
      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
      {language ?? 'Unknown'}
    </span>
  )
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'hoje'
  if (days === 1) return 'ontem'
  if (days < 30) return `${days}d atrás`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}m atrás`
  return `${Math.floor(months / 12)}a atrás`
}

function RepoSkeleton() {
  return (
    <div className="bg-[#111111] border border-[#1f1f1f] p-5 animate-pulse" aria-hidden="true">
      <div className="h-4 bg-[#1f1f1f] w-3/4 mb-3" />
      <div className="h-3 bg-[#1f1f1f] w-full mb-2" />
      <div className="h-3 bg-[#1f1f1f] w-2/3 mb-6" />
      <div className="flex gap-4">
        <div className="h-3 bg-[#1f1f1f] w-16" />
        <div className="h-3 bg-[#1f1f1f] w-10" />
        <div className="h-3 bg-[#1f1f1f] w-10" />
      </div>
    </div>
  )
}

export default function GitHubProjects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { repos, loading, error } = useGitHubRepos()

  return (
    <section
      id="github"
      className="w-full py-16 md:py-24 border-t border-[#1f1f1f] bg-[#0d0d0d]"
      aria-labelledby="githubHeading"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-[#39ff14] tracking-widest uppercase mb-4"
        >
          GitHub ao vivo
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          id="githubHeading"
          className="font-display text-3xl md:text-4xl font-bold mb-3"
        >
          Repositórios recentes
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[#71717a] text-sm font-mono mb-12"
        >
          Dados carregados diretamente da API do GitHub.
        </motion.p>

        {/* Error state */}
        {error && !loading && (
          <div
            className="flex items-center gap-3 border border-red-900/40 bg-red-950/20 p-4 mb-8 text-sm text-[#71717a]"
            role="alert"
          >
            <AlertCircle size={16} className="text-red-400 shrink-0" />
            <span>
              Não foi possível carregar os repositórios.{' '}
              <a
                href="https://github.com/JoaoPedroAmaral"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5f5f5] underline"
              >
                Ver no GitHub
              </a>
            </span>
          </div>
        )}

        {/* Repo grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          aria-live="polite"
          aria-label="Repositórios do GitHub"
        >
          {loading
            ? Array.from({ length: 6 }, (_, i) => <RepoSkeleton key={i} />)
            : repos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.07 + 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  className="group bg-[#111111] border border-[#1f1f1f] hover:border-[#39ff14]/40 transition-colors p-5 flex flex-col gap-4"
                  aria-label={`Repositório ${repo.name}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-mono text-sm font-bold text-[#f5f5f5] group-hover:text-[#39ff14] transition-colors break-all">
                      {repo.name}
                    </h3>
                    <ExternalLink
                      size={13}
                      className="text-[#71717a] group-hover:text-[#39ff14] transition-colors shrink-0 mt-0.5"
                    />
                  </div>

                  <p className="text-xs text-[#71717a] leading-relaxed flex-1 line-clamp-2">
                    {repo.description ?? 'Sem descrição.'}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-auto">
                    {repo.language && <LanguageDot language={repo.language} />}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 font-mono text-xs text-[#71717a]">
                        <Star size={11} />
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1 font-mono text-xs text-[#71717a]">
                        <GitFork size={11} />
                        {repo.forks_count}
                      </span>
                    )}
                    <span className="font-mono text-[10px] text-[#71717a] ml-auto">
                      {timeAgo(repo.updated_at)}
                    </span>
                  </div>
                </motion.a>
              ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="https://github.com/JoaoPedroAmaral"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#1f1f1f] font-mono text-sm text-[#71717a] hover:border-[#39ff14] hover:text-[#39ff14] transition-colors"
          >
            <ExternalLink size={14} />
            Ver perfil completo no GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
