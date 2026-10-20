export const pt = {
  meta: {
    title: 'João Pedro Amaral — Desenvolvedor Fullstack',
    description:
      'Desenvolvedor fullstack em Java, Spring Boot e React, certificado ServiceNow CSA. Integrações REST e automação de processos.',
  },
  nav: {
    label: 'Navegação principal',
    home: 'Voltar ao início',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    skipToContent: 'Pular para o conteúdo',
    about: 'Sobre',
    experience: 'Experiência',
    skills: 'Stack',
    certifications: 'Certificações',
    projects: 'Projetos',
    github: 'Repositórios',
  },
  theme: {
    toLight: 'Mudar para tema claro',
    toDark: 'Mudar para tema escuro',
  },
  language: {
    label: 'Idioma',
    choose: 'Escolher idioma',
  },
  hero: {
    availability: 'Aberto a oportunidades',
    tagline:
      'Desenvolvedor fullstack em Java, Spring Boot e React. Integrações REST e automação de processos em ServiceNow.',
    viewProjects: 'Ver projetos',
    scrollHint: 'rolar',
    stats: {
      repos: 'repositórios',
      followers: 'seguidores',
      stars: 'estrelas',
    },
  },
  about: {
    label: 'Sobre mim',
    title: 'Sistemas que continuam de pé depois do deploy',
    paragraphs: [
      'Trabalho do banco de dados ao navegador. No back-end, construo APIs em Java e Spring Boot com camadas bem separadas e persistência pensada para durar. No front, entrego interfaces em React que carregam rápido e continuam legíveis depois de meses de manutenção.',
      'Hoje divido o tempo entre produto e plataforma: desenvolvimento de interfaces na SEA Tecnologia e construção de aplicações em ServiceNow, da modelagem da tabela à interface. O que mais me chamou atenção nessa virada foi quanto da base de APIs REST se transferiu direto — contrato de integração, modelagem de dados e tratamento de erro são os mesmos problemas, com outro nome e outra tela.',
    ],
    photoAlt: 'Retrato de João Pedro Amaral Rosa',
    facts: {
      role: { label: 'Função', value: 'Desenvolvedor Fullstack' },
      base: { label: 'Base', value: 'Brasília, DF' },
      education: { label: 'Formação', value: 'Ciência da Computação, UDF' },
      certification: { label: 'Certificação', value: 'ServiceNow CSA' },
      focus: { label: 'Foco', value: 'Java, Spring Boot, React e ServiceNow' },
      status: { label: 'Situação', value: 'Aberto a oportunidades' },
    },
  },
  experience: {
    label: 'Carreira',
    title: 'Experiência profissional',
    present: 'atual',
    items: {
      'chain-academy': {
        role: 'Desenvolvedor ServiceNow',
        highlights: [
          'Programa de formação técnica em ServiceNow em instância própria, com entregas avaliadas: administração da plataforma, scripting, Flow Designer, UI Builder e inteligência artificial',
          'Aplicações completas em escopo próprio, da modelagem à interface: dicionário de dados, choice lists, ACLs, menus de aplicação e grupos de acesso',
          'Scripted REST API para recebimento de dados de sistema externo, com validação de contrato, verificação de usuário e retorno padronizado em JSON',
          'Integração de saída via REST Message encapsulada em Script Include, acionada por Business Rule assíncrona e com reprocessamento automático por Scheduled Job em caso de falha',
          'Importação de bases externas com Import Sets e Transform Maps, usando coalesce para evitar duplicidade',
          'Widgets de Service Portal em JavaScript, HTML e CSS, incluindo interface de arrastar e soltar construída sem biblioteca externa',
        ],
      },
      'sea-tecnologia': {
        role: 'Frontend Developer',
        highlights: [
          'Interfaces web em React e Tailwind CSS, com atenção a responsividade e desempenho',
          'Integração com APIs REST em Java, tratando os estados de carregamento, erro e ausência de dados',
          'Gerenciamento de estado e cache de requisições com TanStack Query, reduzindo chamadas redundantes ao servidor',
          'Build com Maven e publicação em Liferay',
          'Versionamento com Git, GitHub e GitLab, em fluxo de merge requests com revisão por pares',
          'Participação no refinamento das demandas, nas estimativas e nas cerimônias do ciclo',
        ],
      },
      'cbtu-estagio': {
        role: 'Estagiário de Desenvolvimento',
        highlights: [
          'Manutenção e evolução de sistemas corporativos que sustentam a operação de transporte urbano, onde indisponibilidade tem efeito direto no serviço ao público',
          'Manutenção e evolução de aplicações em Java, com foco em estabilidade',
          'Modelagem de consultas, ajustes e manutenção preventiva em bancos Oracle e MySQL',
          'Diagnóstico e correção de defeitos em código legado',
          'Atendimento a usuários internos na identificação e resolução de problemas',
        ],
      },
      'cbtu-aprendiz': {
        role: 'Jovem Aprendiz',
        highlights: [
          'Primeira experiência em tecnologia, com desenvolvimento e manutenção de rotinas em Java',
          'Operação e manutenção de bancos de dados Oracle e MySQL',
          'Apoio em rotinas de TI voltadas a sistemas de transporte urbano',
        ],
      },
    },
  },
  skills: {
    label: 'Tecnologias',
    title: 'Stack e ferramentas',
    description: 'O conjunto com que trabalho hoje, agrupado por onde cada peça atua no sistema.',
    groups: {
      backend: 'Back-end',
      frontend: 'Front-end',
      servicenow: 'ServiceNow',
      data: 'Dados',
      tooling: 'Ferramentas',
      practices: 'Práticas',
    },
  },
  certifications: {
    label: 'Credenciais',
    title: 'Certificações',
    description: 'Credenciais emitidas por ServiceNow, Alura, Rocketseat e VMEdu.',
    issuedIn: 'Emitida em',
  },
  projects: {
    label: 'Portfólio',
    title: 'Projetos em destaque',
    description:
      'Dois sistemas que resolvem um problema concreto e carregam a decisão técnica que me interessa defender.',
    pastLabel: 'Trabalhos anteriores',
    pastTitle: 'O que veio antes',
    viewLive: 'Ver ao vivo',
    viewCode: 'Código',
    closedSource: 'Código fechado',
    liveAria: 'Abrir demonstração de',
    codeAria: 'Ver código de',
    items: {
      'cofre-de-gastos': {
        summary:
          'Controle de gastos pessoais a partir de extratos bancários, que roda inteiro no navegador. Nenhum dado sai da máquina de quem usa.',
        highlights: [
          'Deriva uma chave de comerciante da descrição do extrato, removendo data, parcela e código de loja, de modo que categorizar uma vez vale para todo o histórico e para as importações futuras',
          'Importa OFX, CSV, XLSX e PDF de fatura com detecção pelo conteúdo, deduplica reimportação e separa transferência entre contas próprias, que não é gasto',
          'Cifra em AES-256-GCM no IndexedDB, com chave derivada por PBKDF2 em 600 mil iterações e chave de dados envelopada, o que permite trocar a senha sem recifrar o histórico',
          'A política de segurança declara connect-src none: nem uma biblioteca comprometida conseguiria enviar os dados para fora',
        ],
      },
      'bot-de-emprego': {
        summary:
          'Automação que varre vagas de desenvolvedor em quatro plataformas, filtra por relevância real e acompanha cada candidatura até o registro.',
        highlights: [
          'Quatro plataformas sobre uma abstração comum, em que cada integração implementa apenas login, busca e processamento de vaga',
          'Motor de respostas com cerca de 140 regras por palavra-chave, com normalização de acentos e recuo por tipo de campo',
          'Quando encontra uma pergunta desconhecida, pausa e consulta por Telegram; a resposta fica aprendida para as próximas vagas',
          'Filtros em camadas por localização, título e stack, seleção automática do currículo conforme o perfil da vaga, e painel web local para acompanhar a execução',
        ],
      },
      colorashin: {
        summary:
          'Transforma qualquer imagem em página para colorir, com processamento no servidor e checkout integrado.',
      },
      mentech: {
        summary:
          'Plataforma para profissionais de Terapia Cognitivo-Comportamental gerenciarem pacientes, anamnese e evolução clínica.',
      },
      'chat-jp': {
        summary:
          'Interface de conversa em React consumindo a API da OpenAI, feita para estudar streaming de resposta e estado de mensagens.',
      },
    },
  },
  status: {
    active: 'Ativo',
    evolving: 'Em evolução',
    maintenance: 'Em manutenção',
    archived: 'Arquivado',
  },
  github: {
    label: 'GitHub ao vivo',
    title: 'Repositórios recentes',
    description:
      'Lista consultada diretamente na API pública do GitHub, ordenada pela atualização mais recente.',
    gridLabel: 'Repositórios do GitHub',
    errorMessage: 'Não foi possível carregar os repositórios agora.',
    errorLink: 'Ver o perfil no GitHub',
    viewProfile: 'Ver perfil completo',
    noDescription: 'Sem descrição.',
    repoAria: 'Abrir repositório',
  },
  contact: {
    label: 'Contato',
    title: 'Vamos conversar',
    description:
      'Aberto a oportunidades. Se tiver um problema técnico interessante para resolver, me escreva.',
    sendEmail: 'Enviar e-mail',
    openQuickContact: 'Abrir contato rápido',
    closeQuickContact: 'Fechar contato rápido',
    channels: {
      email: 'E-mail',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      phone: 'Telefone',
      lattes: 'Lattes',
    },
    lattesValue: 'Currículo acadêmico',
  },
  footer: {
    backToTop: 'Voltar ao início',
  },
  terms: {
    'es-modules': 'Módulos ES',
    'relational-modeling': 'Modelagem relacional',
  },
  time: {
    today: 'hoje',
    yesterday: 'ontem',
    days: (value) => `${value} dias atrás`,
    months: (value) => `${value} meses atrás`,
    years: (value) => `${value} anos atrás`,
  },
}
