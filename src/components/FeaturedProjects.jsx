import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const PROJECTS = [
  {
    id: 'colorashin',
    title: 'Colorashin',
    description:
      'O Colorashin é um sistema cujo objetivo é transformar qualquer imagem em uma página para colorir. Nosso maior propósito é incentivar a liberdade criativa, permitindo que você crie de forma rápida e acessível seus próprios livros de colorir, quadros, pinturas e muito mais.',
    tags: ['React', 'Javascript', 'Java', 'Spring Boot', 'HTML', 'Tailwind', 'Eslint', 'Git', 'Mercado Pago'],
    liveUrl: 'colorashin.onrender.com',
    githubUrl: 'https://github.com/JoaoPedroAmaral/Colorashin',
    img: '/IMG/Colorashin.png',
  },
  {
    id: 'Mentech',
    title: 'Mentech',
    description:
      ' Mentech é um sistema web desenvolvido para auxiliar profissionais da Terapia Cognitivo-Comportamental (TCC) no gerenciamento completo de pacientes e atendimentos. A plataforma permite o controle detalhado de pacientes, acompanhamento do progresso terapêutico e registro de informações clínicas, incluindo anamnese e prontuários.',
    tags: ['Flask', 'Python', 'Javascript', 'JWT', 'MYSQL', 'React'],
    liveUrl: 'Mentech.app.br',
    githubUrl: 'https://github.com/JoaoPedroAmaral/MentechFrontEnd',
    img: '/IMG/Mentech.png',
  },
  {
    id: 'chatjp',
    title: 'Chat JP',
    description:
      'Interface de chat construída com ReactJS consumindo a API da OpenAI, simulando uma experiência de chatbot.',
    tags: ['React', 'OpenAI API', 'JavaScript'],
    liveUrl: null,
    githubUrl: 'https://github.com/JoaoPedroAmaral/ChatJP',
    img: '/IMG/ChatJP.png',
  }
]

const FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'java', label: 'Java' },
  { id: 'js', label: 'JavaScript' },
]

const JAVA_TAGS = new Set(['Java', 'Spring Boot', 'BCrypt', 'Jakarta EE'])

function matchesFilter(project, filter) {
  if (filter === 'all') return true
  if (filter === 'java') return project.tags.some((t) => JAVA_TAGS.has(t))
  if (filter === 'js')
    return project.tags.some((t) =>
      ['JavaScript', 'React', 'HTML', 'CSS', 'OpenAI API', 'GitHub API', 'Node.js'].includes(t)
    )
  return true
}

import { useState } from 'react'

export default function FeaturedProjects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = PROJECTS.filter((p) => matchesFilter(p, activeFilter))

  return (
    <section
      id="projetos"
      className="w-full py-16 md:py-24 border-t border-[#1f1f1f]"
      aria-labelledby="projectsHeading"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-[#39ff14] tracking-widest uppercase mb-4"
        >
          Portfólio
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          id="projectsHeading"
          className="font-display text-3xl md:text-4xl font-bold mb-8"
        >
          Projetos em destaque
        </motion.h2>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-2 mb-12"
          role="group"
          aria-label="Filtrar projetos"
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 font-mono text-xs tracking-widest uppercase border transition-colors ${
                activeFilter === f.id
                  ? 'border-[#39ff14] text-[#39ff14] bg-[#39ff14]/5'
                  : 'border-[#1f1f1f] text-[#71717a] hover:border-[#333] hover:text-[#f5f5f5]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, inView }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 + 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="group bg-[#111111] border border-[#1f1f1f] hover:border-[#39ff14]/40 transition-colors overflow-hidden"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-44 bg-[#0d0d0d]">
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-90 transition-opacity duration-300"
          loading="lazy"
          width={400}
          height={220}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-widest uppercase text-[#39ff14] border border-[#39ff14]/20 px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-base font-bold mb-2">{project.title}</h3>
        <p className="text-sm text-[#71717a] leading-relaxed mb-5">{project.description}</p>

        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#39ff14] hover:underline"
              aria-label={`Ver ${project.title} ao vivo`}
            >
              <ExternalLink size={12} />
              Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#71717a] hover:text-[#f5f5f5] transition-colors"
              aria-label={`Ver código de ${project.title} no GitHub`}
            >
              <Github size={12} />
              Código
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
