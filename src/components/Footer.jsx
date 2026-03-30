import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="w-full border-t border-[#1f1f1f] py-8"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        <a
          href="#hero"
          className="font-mono text-sm font-bold text-[#71717a] hover:text-[#39ff14] transition-colors"
          aria-label="Voltar ao topo"
        >
          <span className="text-[#39ff14]">[</span>JP<span className="text-[#39ff14]">]</span>
        </a>

        <p className="font-mono text-xs text-[#71717a] text-center">
          &copy; {year} João Pedro Amaral Rosa
        </p>

        <div className="flex items-center gap-4">
          {[
            {
              href: 'https://github.com/JoaoPedroAmaral',
              icon: <Github size={16} />,
              label: 'GitHub',
            },
            {
              href: 'https://www.linkedin.com/in/JoaoPedroAmaralRosa',
              icon: <Linkedin size={16} />,
              label: 'LinkedIn',
            },
            {
              href: 'mailto:joaopedro251900@gmail.com',
              icon: <Mail size={16} />,
              label: 'Email',
            },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="text-[#71717a] hover:text-[#39ff14] transition-colors"
              aria-label={label}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
