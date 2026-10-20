import { ArrowUpRight, GitFork, Star } from 'lucide-react'
import ExternalLink from './ExternalLink'
import { formatTimeAgo } from '../../utils/date'
import { FALLBACK_LANGUAGE_COLOR, LANGUAGE_COLORS } from '../../constants/languageColors'
import { useTranslation } from '../../i18n/languageContext'

const ICON_SIZE = 13

export default function RepoCard({ repo }) {
  const { t } = useTranslation()
  const languageColor = LANGUAGE_COLORS[repo.language] ?? FALLBACK_LANGUAGE_COLOR

  return (
    <ExternalLink
      href={repo.html_url}
      aria-label={`${t.github.repoAria} ${repo.name}`}
      className="group flex h-full flex-col gap-4 rounded-xl border border-line bg-bg p-5 transition-colors duration-300 hover:border-accent/40"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-sm font-medium text-ink transition-colors duration-300 group-hover:text-accent">
          {repo.name}
        </h3>
        <ArrowUpRight
          size={ICON_SIZE}
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-ink-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        />
      </div>

      <p className="flex-1 text-xs leading-relaxed text-ink-muted">
        {repo.description ?? t.github.noDescription}
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] text-ink-muted">
        {repo.language ? (
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: languageColor }}
            />
            {repo.language}
          </span>
        ) : null}

        {repo.stargazers_count > 0 ? (
          <span className="inline-flex items-center gap-1">
            <Star size={11} aria-hidden="true" />
            {repo.stargazers_count}
          </span>
        ) : null}

        {repo.forks_count > 0 ? (
          <span className="inline-flex items-center gap-1">
            <GitFork size={11} aria-hidden="true" />
            {repo.forks_count}
          </span>
        ) : null}

        <span className="ml-auto">{formatTimeAgo(repo.updated_at, t.time)}</span>
      </div>
    </ExternalLink>
  )
}
