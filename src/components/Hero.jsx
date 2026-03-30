import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useMotionTemplate } from 'framer-motion'
import { ArrowDown, Github, FolderOpen } from 'lucide-react'
import { useGitHubStats } from '../hooks/useGitHubStats'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const STATS_CONFIG = [
  { key: 'repos', label: 'repositórios' },
  { key: 'followers', label: 'seguidores' },
  { key: 'stars', label: 'stars' },
]

export default function Hero() {
  const { stats, loading } = useGitHubStats()
  const prefersReducedMotion = useReducedMotion()

  const sectionRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const nameX = useTransform(x, [-window.innerWidth / 2, window.innerWidth / 2], [-20, 20])
  const nameY = useTransform(y, [-window.innerHeight / 2, window.innerHeight / 2], [-10, 10])

  const glowX = useMotionValue(-9999)
  const glowY = useMotionValue(-9999)
  const glowBackground = useMotionTemplate`radial-gradient(600px circle at ${glowX}px ${glowY}px, rgba(57,255,20,0.07), transparent 70%)`

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
    glowX.set(e.clientX - rect.left)
    glowY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Introdução"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(#1f1f1f 1px, transparent 1px), linear-gradient(90deg, #1f1f1f 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          opacity: 0.4,
        }}
      />

      {/* Cursor glow */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: glowBackground }}
        />
      )}

      {/* Accent line top-left */}
      <div
        className="absolute top-0 left-0 w-px h-32 bg-[#39ff14]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">

        {/* Label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-[#39ff14]" aria-hidden="true" />
          <span className="font-mono text-xs text-[#39ff14] tracking-widest uppercase">
            Desenvolvedor
          </span>
        </motion.div>

        {/* Name — typographic hero with mouse parallax */}
        <h1
          className="font-display font-bold leading-none tracking-tighter mb-8 overflow-hidden"
          style={{ letterSpacing: '-0.02em' }}
        >
          {['João', 'Pedro', 'Amaral'].map((word, i) => (
            <motion.span
              key={word}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i + 1}
              style={
                prefersReducedMotion
                  ? {}
                  : { x: nameX, y: nameY }
              }
              className={`block text-[clamp(3.5rem,8vw,7rem)] ${
                i === 1 ? 'text-[#39ff14]' : 'text-[#f5f5f5]'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="text-[#71717a] text-base md:text-lg max-w-xl mb-10 font-mono leading-relaxed"
        >
          Java · Spring Boot · MySQL · front-end moderno.
          <br />
          Construo sistemas que funcionam. Do back-end ao browser.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="flex flex-col sm:flex-row flex-wrap gap-4 mb-16"
        >
          <a
            href="#projetos"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#39ff14] text-[#0a0a0a] font-mono text-sm font-bold tracking-wide hover:bg-[#2de010] transition-colors"
          >
            <FolderOpen size={16} />
            Ver projetos
          </a>
          <a
            href="https://github.com/JoaoPedroAmaral"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] border border-[#1f1f1f] text-[#f5f5f5] font-mono text-sm tracking-wide hover:border-[#39ff14] hover:text-[#39ff14] transition-colors"
          >
            <Github size={16} />
            GitHub
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
          className="flex flex-wrap gap-8 border-t border-[#1f1f1f] pt-8"
        >
          {STATS_CONFIG.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-1">
              <span className="font-mono text-2xl font-bold text-[#f5f5f5]">
                {loading ? '—' : stats[key]}
              </span>
              <span className="font-mono text-xs text-[#71717a] tracking-wide">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-xs text-[#71717a] tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-[#71717a]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
