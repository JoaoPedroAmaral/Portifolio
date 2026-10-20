import Reveal from './Reveal'

export default function SectionHeading({ label, title, description, headingId }) {
  return (
    <div className="mb-12 md:mb-16 max-w-2xl">
      <Reveal step={0} className="flex items-center gap-3 mb-5">
        <span className="h-px w-8 bg-accent" aria-hidden="true" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{label}</span>
      </Reveal>

      <Reveal step={1} as="h2" id={headingId} className="mb-2 text-4xl font-semibold text-ink md:text-5xl">
        {title}
      </Reveal>

      {description ? (
        <Reveal step={2} as="p" className="mt-5 text-base leading-relaxed text-ink-muted">
          {description}
        </Reveal>
      ) : null}
    </div>
  )
}
