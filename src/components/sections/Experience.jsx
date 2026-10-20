import { SECTION_IDS } from '../../constants/site'
import { EXPERIENCES } from '../../constants/experience'
import { useTranslation } from '../../i18n/languageContext'
import { formatPeriod } from '../../utils/date'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const EXPERIENCE_HEADING_ID = 'experienceHeading'

function TimelineMarker({ current }) {
  const markerTone = current ? 'bg-accent' : 'bg-line-strong'
  const pulseClass = current ? 'animate-pulse-dot' : ''

  return (
    <span
      aria-hidden="true"
      className={`absolute left-0 top-2 h-3 w-3 -translate-x-[6.5px] rounded-full ring-4 ring-bg ${markerTone} ${pulseClass}`}
    />
  )
}

export default function Experience() {
  const { t, language } = useTranslation()

  return (
    <section
      id={SECTION_IDS.experience}
      aria-labelledby={EXPERIENCE_HEADING_ID}
      className="w-full border-t border-line py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label={t.experience.label}
          title={t.experience.title}
          headingId={EXPERIENCE_HEADING_ID}
        />

        <ol className="relative ml-1 border-l border-line">
          {EXPERIENCES.map((experience, index) => {
            const content = t.experience.items[experience.id]
            const period = formatPeriod(
              experience.start,
              experience.end,
              language,
              t.experience.present
            )

            return (
              <li key={experience.id} className="relative pb-14 pl-8 last:pb-0 md:pl-12">
                <TimelineMarker current={experience.current} />

                <Reveal step={index}>
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">
                    {period}
                  </p>
                  <h3 className="text-2xl font-semibold text-ink">{content.role}</h3>
                  <p className="mt-1 font-mono text-sm text-accent">{experience.company}</p>

                  <ul className="mt-5 flex flex-col gap-2.5">
                    {content.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                        <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-line-strong" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
