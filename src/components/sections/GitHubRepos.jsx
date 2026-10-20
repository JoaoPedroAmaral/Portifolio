import { AlertCircle, ArrowUpRight } from 'lucide-react'
import { SECTION_IDS, SOCIAL } from '../../constants/site'
import { useGitHub } from '../../context/githubContext'
import { useTranslation } from '../../i18n/languageContext'
import ExternalLink from '../ui/ExternalLink'
import RepoCard from '../ui/RepoCard'
import RepoSkeleton from '../ui/RepoSkeleton'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const GITHUB_HEADING_ID = 'githubHeading'
const SKELETON_COUNT = 6
const ICON_SIZE = 15

function ErrorNotice() {
  const { t } = useTranslation()

  return (
    <div
      role="alert"
      className="mb-10 flex items-start gap-3 rounded-xl border border-line bg-surface p-5 text-sm text-ink-muted"
    >
      <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-danger" />
      <span>
        {t.github.errorMessage}{' '}
        <ExternalLink href={SOCIAL.github} className="text-accent underline underline-offset-4">
          {t.github.errorLink}
        </ExternalLink>
      </span>
    </div>
  )
}

export default function GitHubRepos() {
  const { t } = useTranslation()
  const { repos, loading, error } = useGitHub()
  const showGrid = loading || repos.length > 0

  return (
    <section
      id={SECTION_IDS.github}
      aria-labelledby={GITHUB_HEADING_ID}
      className="w-full border-t border-line bg-surface py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label={t.github.label}
          title={t.github.title}
          description={t.github.description}
          headingId={GITHUB_HEADING_ID}
        />

        {error ? <ErrorNotice /> : null}

        {showGrid ? (
          <div
            aria-label={t.github.gridLabel}
            aria-live="polite"
            aria-busy={loading}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {loading
              ? Array.from({ length: SKELETON_COUNT }, (_, index) => (
                  <RepoSkeleton key={`skeleton-${index}`} />
                ))
              : repos.map((repo, index) => (
                  <Reveal key={repo.id} step={index} className="h-full">
                    <RepoCard repo={repo} />
                  </Reveal>
                ))}
          </div>
        ) : null}

        <div className="mt-12 flex justify-center">
          <ExternalLink
            href={SOCIAL.github}
            className="group inline-flex min-h-[48px] items-center gap-2 rounded-full border border-line px-7 text-sm text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            {t.github.viewProfile}
            <ArrowUpRight
              size={ICON_SIZE}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </ExternalLink>
        </div>
      </div>
    </section>
  )
}
