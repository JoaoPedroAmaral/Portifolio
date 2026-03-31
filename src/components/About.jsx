import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const CODE_LINES = [
  { key: 'name', op: ':', value: '"João Pedro"', color: 'text-[#e8c97b]' },
  { key: 'role', op: ':', value: '"FullStack Developer"', color: 'text-[#e8c97b]' },
  { key: 'stack', op: ':', value: '["Java", "Spring", "MySQL", "JS"]', color: 'text-[#71c4ef]' },
  { key: 'status', op: ':', value: '"open to work"', color: 'text-[#39ff14]' },
  { key: 'location', op: ':', value: '"Brasil"', color: 'text-[#e8c97b]' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="sobre" className="w-full py-16 md:py-24 border-t border-[#1f1f1f]" aria-labelledby="aboutHeading">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
          className="font-mono text-xs text-[#39ff14] tracking-widest uppercase mb-4"
        >
          Sobre mim
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={1}
            className="flex flex-col"
          >
            <h2
              id="aboutHeading"
              className="font-display text-3xl md:text-4xl font-bold leading-tight mb-8"
            >
              Desenvolvedor focado em soluções reais
            </h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={2}
              className="text-[#71717a] leading-relaxed mb-4"
            >
              Construo sistemas do zero ao deploy — APIs robustas e escaláveis com Java e Spring Boot no back-end, e interfaces modernas e integradas com HTML, CSS e JavaScript no front. Código limpo, arquitetura sólida e entrega que funciona de verdade.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={2}
            className="bg-[#111111] border border-[#1f1f1f] p-6 font-mono text-sm"
            aria-hidden="true"
          >
            <span className="text-[#71717a] text-xs block mb-4">{'// dev profile'}</span>
            {CODE_LINES.map(({ key, op, value, color }) => (
              <div key={key} className="flex gap-1 py-1">
                <span className="text-[#c9a1ff]">{key}</span>
                <span className="text-[#71717a]">{op}</span>
                <span className={`ml-1 ${color}`}>{value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
