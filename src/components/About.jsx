import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Linkedin, GraduationCap } from 'lucide-react'

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
  { key: 'role', op: ':', value: '"Java Developer"', color: 'text-[#e8c97b]' },
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
          {/* Text column */}
          <div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={1}
              id="aboutHeading"
              className="font-display text-3xl md:text-4xl font-bold leading-tight mb-8"
            >
              Desenvolvedor focado em soluções reais
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={2}
              className="text-[#71717a] leading-relaxed mb-4"
            >
              Sou João Pedro Amaral Rosa, desenvolvedor com foco em back-end Java e Spring Boot,
              criando APIs robustas e sistemas escaláveis. No front-end, desenvolvo interfaces
              modernas e integradas com HTML, CSS e JavaScript.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={3}
              className="text-[#71717a] leading-relaxed mb-10"
            >
              Tenho experiência com MVC, REST APIs, gerenciamento de banco de dados MySQL,
              e um olho treinado para entregar código limpo e manutenível.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={4}
              className="flex flex-wrap gap-3"
            >
              {[
                {
                  href: 'https://github.com/JoaoPedroAmaral',
                  icon: <Github size={15} />,
                  label: 'GitHub',
                },
                {
                  href: 'https://www.linkedin.com/in/JoaoPedroAmaralRosa',
                  icon: <Linkedin size={15} />,
                  label: 'LinkedIn',
                },
                {
                  href: 'http://lattes.cnpq.br/5937916297902258',
                  icon: <GraduationCap size={15} />,
                  label: 'Lattes',
                },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[#1f1f1f] font-mono text-sm text-[#71717a] hover:border-[#39ff14] hover:text-[#39ff14] transition-colors"
                >
                  {icon}
                  {label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Code card */}
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
