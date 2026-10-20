import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Github } from 'lucide-react'
import { HERO_STATS, PROFILE, SECTION_IDS, SOCIAL } from '../../constants/site'
import { DURATION, EASE_OUT_SOFT, STAGGER_STEP } from '../../constants/motion'
import { usePointerGlow } from '../../hooks/usePointerGlow'
import { useGitHub } from '../../context/githubContext'
import { useTranslation } from '../../i18n/languageContext'
import ExternalLink from '../ui/ExternalLink'

const ICON_SIZE = 17
const SCROLL_HINT_DELAY = 1.1
const EMPTY_STAT = '—'

const NAME_WORDS = [PROFILE.firstName, PROFILE.middleName, PROFILE.lastName]
const ACCENT_WORD_INDEX = 1

const GRID_LINE = 'var(--line) 1px, transparent 1px'
const GRID_CELL_SIZE = '72px 72px'
const GRID_FADE_MASK = 'radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)'

const GRID_BACKDROP_STYLE = {
  backgroundImage: `linear-gradient(${GRID_LINE}), linear-gradient(90deg, ${GRID_LINE})`,
  backgroundSize: GRID_CELL_SIZE,
  maskImage: GRID_FADE_MASK,
  WebkitMaskImage: GRID_FADE_MASK,
}

function entrance(step) {
  return {
    initial: { opacity: 0, y: 28, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: DURATION.slow, delay: step * STAGGER_STEP, ease: EASE_OUT_SOFT },
  }
}

export default function Hero() {
  const { t } = useTranslation()
  const { stats, loading } = useGitHub()
  const { containerRef, handlePointerMove, handlePointerLeave, glowBackground, parallax } =
    usePointerGlow()

  return (
    <section
      id={SECTION_IDS.hero}
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      aria-labelledby="heroHeading"
      className="relative flex min-h-svh w-full flex-col justify-center overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={GRID_BACKDROP_STYLE}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: glowBackground }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-20 sm:px-8">
        <motion.div {...entrance(0)} className="mb-5 flex items-center gap-3">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {t.hero.availability}
          </span>
        </motion.div>

        <h1 id="heroHeading" className="mb-8 font-semibold leading-[0.95]">
          <span className="sr-only">{PROFILE.fullName}</span>
          <motion.span style={parallax ?? undefined} className="block" aria-hidden="true">
            {NAME_WORDS.map((word, index) => (
              <motion.span
                key={word}
                {...entrance(index + 1)}
                className={`block text-[clamp(2.5rem,min(8.5vw,10.8vh),6.25rem)] ${
                  index === ACCENT_WORD_INDEX ? 'text-accent' : 'text-ink'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        <motion.p {...entrance(4)} className="mb-8 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
          {t.hero.tagline}
        </motion.p>

        <motion.div {...entrance(5)} className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={`#${SECTION_IDS.projects}`}
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-medium text-accent-ink transition-colors duration-300 hover:bg-accent-hover"
          >
            {t.hero.viewProjects}
            <ArrowUpRight
              size={ICON_SIZE}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <ExternalLink
            href={SOCIAL.github}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-line px-7 text-sm text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <Github size={ICON_SIZE} />
            GitHub
          </ExternalLink>
        </motion.div>

        <motion.dl {...entrance(6)} className="flex flex-wrap gap-10 border-t border-line pt-5">
          {HERO_STATS.map((key) => (
            <div key={key} className="flex flex-col gap-1">
              <dt className="order-2 font-mono text-xs tracking-wide text-ink-muted">
                {t.hero.stats[key]}
              </dt>
              <dd className="order-1 m-0 font-display text-2xl font-semibold text-ink">
                {loading ? EMPTY_STAT : stats[key]}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: SCROLL_HINT_DELAY, duration: DURATION.base }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted">
          {t.hero.scrollHint}
        </span>
        <ArrowDown size={14} className="animate-float text-ink-muted" />
      </motion.div>
    </section>
  )
}
