import { ABOUT_FACT_KEYS, PROFILE, SECTION_IDS } from '../../constants/site'
import { useTranslation } from '../../i18n/languageContext'
import Reveal from '../ui/Reveal'

const ABOUT_HEADING_ID = 'aboutHeading'
const AVATAR_SIZE = 320
const PARAGRAPH_STEP_OFFSET = 3

export default function About() {
  const { t } = useTranslation()

  return (
    <section
      id={SECTION_IDS.about}
      aria-labelledby={ABOUT_HEADING_ID}
      className="w-full border-t border-line py-20 md:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-5 sm:px-8 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-16">
        <Reveal step={0} className="order-1 md:order-none">
          <div className="relative mx-auto w-full max-w-[280px] md:max-w-none">
            <div aria-hidden="true" className="absolute -inset-3 rounded-full border border-line" />
            <img
              src={PROFILE.avatar}
              alt={t.about.photoAlt}
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              loading="lazy"
              decoding="async"
              className="relative aspect-square w-full rounded-full object-cover shadow-card ring-2 ring-accent/30"
            />
          </div>
        </Reveal>

        <div>
          <Reveal step={1} className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {t.about.label}
            </span>
          </Reveal>

          <Reveal
            step={2}
            as="h2"
            id={ABOUT_HEADING_ID}
            className="mb-2 text-4xl font-semibold text-ink md:text-5xl"
          >
            {t.about.title}
          </Reveal>

          {t.about.paragraphs.map((paragraph, index) => (
            <Reveal
              key={paragraph.slice(0, 32)}
              step={index + PARAGRAPH_STEP_OFFSET}
              as="p"
              className="mb-5 text-base leading-relaxed text-ink-muted"
            >
              {paragraph}
            </Reveal>
          ))}

          <Reveal step={5}>
            <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {ABOUT_FACT_KEYS.map((key) => (
                <div key={key} className="bg-surface px-5 py-4">
                  <dt className="mb-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                    {t.about.facts[key].label}
                  </dt>
                  <dd className="m-0 text-sm font-medium text-ink">{t.about.facts[key].value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
