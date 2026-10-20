import { BadgeCheck } from 'lucide-react'
import { CERTIFICATIONS } from '../../constants/certifications'
import { SECTION_IDS } from '../../constants/site'
import { useTranslation } from '../../i18n/languageContext'
import { formatMonthYear } from '../../utils/date'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'

const CERTIFICATIONS_HEADING_ID = 'certificationsHeading'
const ICON_SIZE = 16

export default function Certifications() {
  const { t, language } = useTranslation()

  return (
    <section
      id={SECTION_IDS.certifications}
      aria-labelledby={CERTIFICATIONS_HEADING_ID}
      className="w-full border-t border-line py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label={t.certifications.label}
          title={t.certifications.title}
          description={t.certifications.description}
          headingId={CERTIFICATIONS_HEADING_ID}
        />

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {CERTIFICATIONS.map((certification, index) => (
            <Reveal key={certification.id} step={index} as="li" className="bg-surface">
              <span className="flex items-start gap-3 px-5 py-4">
                <BadgeCheck
                  size={ICON_SIZE}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-accent"
                />
                <span>
                  <span className="block text-sm font-medium text-ink">{certification.name}</span>
                  <span className="mt-0.5 block font-mono text-[11px] text-ink-muted">
                    {certification.issuer} · {formatMonthYear(certification.issued, language)}
                  </span>
                </span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
