import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILL_GROUPS = [
  {
    label: 'Back-end',
    skills: ['Java', 'Spring Boot', 'Jakarta EE', 'REST APIs', 'BCrypt', 'JPA / Hibernate', 'JWT', 'Liferay'],
  },
  {
    label: 'Banco de dados',
    skills: ['MySQL', 'SQL', 'PostgreSQL'],
  },
  {
    label: 'Front-end',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Vite', 'Tailwind CSS', 'Bootstrap', 'Vue.js', 'React Native'],
  },
  {
    label: 'Ferramentas',
    skills: ['Git', 'GitHub', 'Node.js', 'Express', 'Maven', 'IntelliJ IDEA'],
  },
  {
    label: 'Princípios',
    skills: ['Clean Code', 'Clean Architecture', 'DRY', 'KISS', 'SOLID'],
  },
  {
    label: 'DevOps',
    skills: ['CI/CD', 'Versionamento de código', 'Deploy de sistemas'],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="skills"
      className="w-full py-16 md:py-24 border-t border-[#1f1f1f] bg-[#0d0d0d]"
      aria-labelledby="skillsHeading"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-[#39ff14] tracking-widest uppercase mb-4"
        >
          Tecnologias
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          id="skillsHeading"
          className="font-display text-3xl md:text-4xl font-bold mb-12 md:mb-16"
        >
          Stack & ferramentas
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.1 + 0.2 }}
            >
              <p className="font-mono text-xs text-[#39ff14] tracking-widest uppercase mb-4 border-l-2 border-[#39ff14] pl-3">
                {group.label}
              </p>
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="flex flex-col gap-2"
                role="list"
              >
                {group.skills.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={itemVariants}
                    className="font-mono text-sm text-[#71717a] hover:text-[#f5f5f5] transition-colors cursor-default py-1 border-b border-[#1a1a1a] last:border-0"
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
