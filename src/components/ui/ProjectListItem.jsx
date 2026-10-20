import { ArrowUpRight, Github } from 'lucide-react'
import { useTranslation } from '../../i18n/languageContext'
import ExternalLink from './ExternalLink'
import StatusBadge from './StatusBadge'

const ICON_SIZE = 14
const TAG_SEPARATOR = ' · '

export default function ProjectListItem({ project }) {
  const { t } = useTranslation()
  const content = t.projects.items[project.id]

  return (
    <article className="flex flex-col gap-4 border-b border-line py-7 last:border-0 md:flex-row md:items-start md:justify-between md:gap-10">
      <div className="max-w-2xl">
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-semibold text-ink">{project.title}</h3>
          <StatusBadge status={project.status} />
        </div>

        <p className="mb-3 text-sm leading-relaxed text-ink-muted">{content.summary}</p>

        <p className="font-mono text-[11px] tracking-wide text-ink-muted">
          {project.tags.map((tag) => t.terms[tag] ?? tag).join(TAG_SEPARATOR)}
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-5">
        {project.liveUrl ? (
          <ExternalLink
            href={project.liveUrl}
            aria-label={`${t.projects.liveAria} ${project.title}`}
            className="group/link inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-accent"
          >
            {t.projects.viewLive}
            <ArrowUpRight
              size={ICON_SIZE}
              className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </ExternalLink>
        ) : null}

        {project.codeUrl ? (
          <ExternalLink
            href={project.codeUrl}
            aria-label={`${t.projects.codeAria} ${project.title}`}
            className="inline-flex min-h-[44px] items-center gap-2 text-sm text-ink-muted transition-colors duration-300 hover:text-ink"
          >
            <Github size={ICON_SIZE} />
            {t.projects.viewCode}
          </ExternalLink>
        ) : null}
      </div>
    </article>
  )
}
