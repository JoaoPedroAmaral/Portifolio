import { BadgeCheck } from 'lucide-react'
import { CERTIFICATIONS } from '../../constants/certifications'
import { useTranslation } from '../../i18n/languageContext'
import { formatMonthYear } from '../../utils/date'
import Reveal from './Reveal'

const ICON_SIZE = 16
const CERTIFICATIONS_HEADING_ID = 'certificationsHeading'

export default function CertificationList() {
  const { t, language } = useTranslation()

  return (
    <div className="mt-20">
      <Reveal step={0} className="mb-3 flex items-center gap-3">
        <span className="h-px w-8 bg-accent" aria-hidden="true" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {t.certifications.label}
        </span>
      </Reveal>

      <Reveal
        step={1}
        as="h3"
        id={CERTIFICATIONS_HEADING_ID}
        className="mb-2 text-2xl font-semibold text-ink md:text-3xl"
      >
        {t.certifications.title}
      </Reveal>

      <ul
        aria-labelledby={CERTIFICATIONS_HEADING_ID}
        className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2"
      >
        {CERTIFICATIONS.map((certification) => (
          <li key={certification.id} className="flex items-start gap-3 bg-bg px-5 py-4">
            <BadgeCheck size={ICON_SIZE} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
            <span>
              <span className="block text-sm font-medium text-ink">{certification.name}</span>
              <span className="mt-0.5 block font-mono text-[11px] text-ink-muted">
                {certification.issuer} · {formatMonthYear(certification.issued, language)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
