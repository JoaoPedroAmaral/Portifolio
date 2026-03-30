import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Linkedin, Github, Phone, GraduationCap } from 'lucide-react'

const CONTACT_ITEMS = [
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'joaopedro251900@gmail.com',
    href: 'mailto:joaopedro251900@gmail.com',
    external: false,
  },
  {
    icon: <Linkedin size={20} />,
    label: 'LinkedIn',
    value: 'JoaoPedroAmaralRosa',
    href: 'https://www.linkedin.com/in/JoaoPedroAmaralRosa',
    external: true,
  },
  {
    icon: <Github size={20} />,
    label: 'GitHub',
    value: 'JoaoPedroAmaral',
    href: 'https://github.com/JoaoPedroAmaral',
    external: true,
  },
  {
    icon: <Phone size={20} />,
    label: 'Telefone',
    value: '+55 61 98573-9227',
    href: 'tel:+5561985739227',
    external: false,
  },
  {
    icon: <GraduationCap size={20} />,
    label: 'Lattes',
    value: 'Currículo acadêmico',
    href: 'http://lattes.cnpq.br/5937916297902258',
    external: true,
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contato"
      className="w-full py-16 md:py-24 border-t border-[#1f1f1f]"
      aria-labelledby="contactHeading"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-[#39ff14] tracking-widest uppercase mb-4"
        >
          Vamos conversar
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          id="contactHeading"
          className="font-display text-3xl md:text-4xl font-bold mb-3"
        >
          Entre em contato
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[#71717a] text-sm mb-14"
        >
          Aberto a oportunidades, freelas e colaborações.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONTACT_ITEMS.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 + 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="group flex flex-col gap-3 p-5 bg-[#111111] border border-[#1f1f1f] hover:border-[#39ff14]/40 transition-colors"
              aria-label={item.label}
            >
              <span className="text-[#39ff14] group-hover:scale-110 transition-transform inline-block w-fit">
                {item.icon}
              </span>
              <div>
                <p className="font-mono text-xs text-[#71717a] uppercase tracking-widest mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-medium text-[#f5f5f5] break-all">{item.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
