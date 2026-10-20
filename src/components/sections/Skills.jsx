import { SECTION_IDS } from '../../constants/site'
import { SKILL_GROUPS } from '../../constants/skills'
import { useTranslation } from '../../i18n/languageContext'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import Tag from '../ui/Tag'

const SKILLS_HEADING_ID = 'skillsHeading'

export default function Skills() {
  const { t } = useTranslation()

  return (
    <section
      id={SECTION_IDS.skills}
      aria-labelledby={SKILLS_HEADING_ID}
      className="w-full border-t border-line bg-surface py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          label={t.skills.label}
          title={t.skills.title}
          description={t.skills.description}
          headingId={SKILLS_HEADING_ID}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, index) => (
            <Reveal
              key={group.id}
              step={index}
              as="article"
              className="rounded-xl border border-line bg-bg p-6 transition-colors duration-300 hover:border-line-strong"
            >
              <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {t.skills.groups[group.id]}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <Tag>{skill}</Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
