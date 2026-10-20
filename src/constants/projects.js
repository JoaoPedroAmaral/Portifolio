import { PROJECT_STATUS } from './projectStatus'

export const FEATURED_PROJECTS = [
  {
    id: 'cofre-de-gastos',
    title: 'Cofre de Gastos',
    tags: ['JavaScript', 'es-modules', 'Web Crypto', 'IndexedDB', 'PWA', 'CSP'],
    status: PROJECT_STATUS.active,
    codeUrl: 'https://github.com/JoaoPedroAmaral/Cofre-de-gastos',
    liveUrl: 'https://cofre-de-gastos.pages.dev/',
    privateCode: false,
  },
  {
    id: 'bot-de-emprego',
    title: 'Bot de Emprego',
    tags: ['Python', 'Playwright', 'FastAPI', 'Telegram Bot API', 'YAML'],
    status: PROJECT_STATUS.evolving,
    codeUrl: null,
    liveUrl: null,
    privateCode: true,
  },
]

export const PAST_PROJECTS = [
  {
    id: 'colorashin',
    title: 'Colorashin',
    tags: ['React', 'Java', 'Spring Boot', 'Mercado Pago'],
    status: PROJECT_STATUS.maintenance,
    codeUrl: 'https://github.com/JoaoPedroAmaral/Colorashin',
    liveUrl: 'https://colorashin.onrender.com',
    privateCode: false,
  },
  {
    id: 'mentech',
    title: 'Mentech',
    tags: ['React', 'Python', 'Flask', 'MySQL', 'JWT'],
    status: PROJECT_STATUS.maintenance,
    codeUrl: 'https://github.com/JoaoPedroAmaral/MentechFrontEnd',
    liveUrl: 'https://mentech.app.br',
    privateCode: false,
  },
  {
    id: 'chat-jp',
    title: 'Chat JP',
    tags: ['React', 'JavaScript', 'OpenAI API'],
    status: PROJECT_STATUS.archived,
    codeUrl: 'https://github.com/JoaoPedroAmaral/ChatJP',
    liveUrl: null,
    privateCode: false,
  },
]
