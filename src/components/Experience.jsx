import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'

const EXPERIENCES = [
  {
    role: 'Desenvolvedor Web',
    company: 'Sea Tecnologia',
    period: '2025 - Atual',
    description: [
      'Desenvolvimento de interfaces web performáticas com React, Tailwind CSS e Liferay (Client Extensions)',
      'Aplicação de princípios de arquitetura limpa e boas práticas de desenvolvimento (Clean Code, SOLID, KISS, DRY)',
      'Controle de versão e fluxo de desenvolvimento utilizando GitLab',
      'Implementação de testes automatizados com Jest, garantindo qualidade e confiabilidade do código',
      'Atuação no desenvolvimento de aplicação mobile utilizando React Native',
    ],
  },
  {
    role: 'Desenvolvedor Backend',
    company: 'BuildCLI',
    period: '2024 - 2025',
    description: [
      'Desenvolvimento de APIs robustas com Java e Spring Boot. Implementação de microsserviços',
      'Manutenção e operação com banco de dados MySQL e PostgreSQL',
    ],
  },
  {
    role: 'Estagiário',
    company: 'CBTU - Companhia Brasileira de Trens Urbanos',
    period: '2022 - 2025',
    description: [
      'Administração e otimização de bancos de dados MySQL e PostgreSQL',
      'Desenvolvimento de microsserviços com Java e Spring Boot, focados em escalabilidade e organização',
      'Utilização de versionamento com Git e GitLab para controle de código e colaboração em equipe',
    ],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="experiencia"
      className="w-full py-16 md:py-24 border-t border-[#1f1f1f]"
      aria-labelledby="experienceHeading"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-[#39ff14] tracking-widest uppercase mb-4"
        >
          Carreira
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          id="experienceHeading"
          className="font-display text-3xl md:text-4xl font-bold mb-12 md:mb-16"
        >
          Experiência profissional
        </motion.h2>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[#1f1f1f] transform md:-translate-x-px" aria-hidden="true" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 md:text-right">
                  <div className="inline-flex items-center gap-2 font-mono text-xs text-[#71717a] mb-2">
                    <Calendar size={12} />
                    {exp.period}
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#f5f5f5] mb-1">
                    {exp.role}
                  </h3>
                  <p className="font-mono text-sm text-[#39ff14]">
                    {exp.company}
                  </p>
                </div>

                <div
                  className={`absolute left-0 md:left-1/2 w-3 h-3 rounded-full transform md:-translate-x-1.5 -translate-y-1 mt-2 md:mt-0 md:top-1 border-2 ${
                    exp.period.includes('Atual')
                      ? 'bg-[#39ff14] border-[#39ff14]'
                      : 'bg-transparent border-[#39ff14]'
                  }`}
                  aria-hidden="true"
                />

                <div className="flex-1">
                  <ul className="space-y-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-[#71717a] text-sm leading-relaxed flex items-start gap-2">
                        <span className="text-[#39ff14] mt-auto">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
