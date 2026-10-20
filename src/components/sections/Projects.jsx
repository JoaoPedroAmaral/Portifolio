import { SECTION_IDS } from '../../constants/site'
import { FEATURED_PROJECTS, PAST_PROJECTS } from '../../constants/projects'
import { useTranslation } from '../../i18n/languageContext'
import FeaturedProjectCard from '../ui/FeaturedProjectCard'
import ProjectListItem from '../ui/ProjectListItem'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const PROJECTS_HEADING_ID = 'projectsHeading'
const PAST_PROJECTS_HEADING_ID = 'pastProjectsHeading'

export default function Projects() {
  const { t } = useTranslation()

  return (
    <section
      id={SECTION_IDS.projects}
      aria-labelledby={PROJECTS_HEADING_ID}
      className="w-full border-t border-line py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label={t.projects.label}
          title={t.projects.title}
          description={t.projects.description}
          headingId={PROJECTS_HEADING_ID}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {FEATURED_PROJECTS.map((project, index) => (
            <Reveal key={project.id} step={index} className="h-full">
              <FeaturedProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <div className="mt-24">
          <Reveal step={0} className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t.projects.pastLabel}
            </span>
          </Reveal>

          <Reveal
            step={1}
            as="h3"
            id={PAST_PROJECTS_HEADING_ID}
            className="mb-2 text-2xl font-semibold text-ink md:text-3xl"
          >
            {t.projects.pastTitle}
          </Reveal>

          <div aria-labelledby={PAST_PROJECTS_HEADING_ID}>
            {PAST_PROJECTS.map((project, index) => (
              <Reveal key={project.id} step={index}>
                <ProjectListItem project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
