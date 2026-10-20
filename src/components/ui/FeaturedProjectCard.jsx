import { ArrowUpRight, Github, Lock } from 'lucide-react'
import { useTranslation } from '../../i18n/languageContext'
import ExternalLink from './ExternalLink'
import StatusBadge from './StatusBadge'
import Tag from './Tag'

const ICON_SIZE = 15

export default function FeaturedProjectCard({ project }) {
  const { t } = useTranslation()
  const content = t.projects.items[project.id]

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-7 shadow-card transition-colors duration-300 hover:border-accent/40 md:p-9">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-3xl font-semibold text-ink">{project.title}</h3>
        <StatusBadge status={project.status} />
      </div>

      <p className="mb-7 text-base leading-relaxed text-ink-muted">{content.summary}</p>

      <ul className="mb-8 flex flex-col gap-3">
        {content.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
            <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-accent" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <ul className="mb-7 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag}>
            <Tag>{tag}</Tag>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-5 border-t border-line pt-6">
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

        {project.privateCode ? (
          <span className="inline-flex min-h-[44px] items-center gap-2 text-sm text-ink-muted">
            <Lock size={ICON_SIZE} />
            {t.projects.closedSource}
          </span>
        ) : null}
      </div>
    </article>
  )
}
