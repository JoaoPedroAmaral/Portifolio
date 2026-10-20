export const en = {
  meta: {
    title: 'João Pedro Amaral — Fullstack Developer',
    description:
      'Fullstack developer working in Java, Spring Boot and React, ServiceNow CSA certified. REST integrations and process automation.',
  },
  nav: {
    label: 'Main navigation',
    home: 'Back to top',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skipToContent: 'Skip to content',
    about: 'About',
    experience: 'Experience',
    skills: 'Stack',
    certifications: 'Certifications',
    projects: 'Projects',
    github: 'Repositories',
  },
  theme: {
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
  },
  language: {
    label: 'Language',
    choose: 'Choose language',
  },
  hero: {
    availability: 'Open to opportunities',
    tagline:
      'Fullstack developer in Java, Spring Boot and React. REST integrations and process automation on ServiceNow.',
    viewProjects: 'View projects',
    scrollHint: 'scroll',
    stats: {
      repos: 'repositories',
      followers: 'followers',
      stars: 'stars',
    },
  },
  about: {
    label: 'About me',
    title: 'Systems that stay standing after the deploy',
    paragraphs: [
      'I work from the database to the browser. On the back end, I build APIs in Java and Spring Boot with clearly separated layers and persistence designed to last. On the front end, I ship React interfaces that load fast and stay readable after months of maintenance.',
      'Today I split my time between product and platform: building interfaces at SEA Tecnologia and building applications on ServiceNow, from the table model to the interface. What struck me most in that shift was how much of the REST API groundwork carried straight over — integration contracts, data modelling and error handling are the same problems, under another name and on another screen.',
    ],
    photoAlt: 'Portrait of João Pedro Amaral Rosa',
    facts: {
      role: { label: 'Role', value: 'Fullstack Developer' },
      base: { label: 'Based in', value: 'Brasília, Brazil' },
      education: { label: 'Education', value: 'BSc Computer Science, UDF' },
      certification: { label: 'Certification', value: 'ServiceNow CSA' },
      focus: { label: 'Focus', value: 'Java, Spring Boot, React and ServiceNow' },
      status: { label: 'Status', value: 'Open to opportunities' },
    },
  },
  experience: {
    label: 'Career',
    title: 'Professional experience',
    present: 'present',
    items: {
      'chain-academy': {
        role: 'ServiceNow Developer',
        highlights: [
          'Technical ServiceNow training programme on a dedicated instance with assessed deliveries: platform administration, scripting, Flow Designer, UI Builder and artificial intelligence',
          'Complete scoped applications, from the data model to the interface: data dictionary, choice lists, ACLs, application menus and access groups',
          'Scripted REST API receiving data from an external system, with contract validation, user verification and a standardised JSON response',
          'Outbound integration through a REST Message wrapped in a Script Include, triggered by an asynchronous Business Rule and automatically reprocessed by a Scheduled Job on failure',
          'External data loading with Import Sets and Transform Maps, using coalesce to prevent duplicates',
          'Service Portal widgets in JavaScript, HTML and CSS, including a drag and drop interface built without external libraries',
        ],
      },
      'sea-tecnologia': {
        role: 'Frontend Developer',
        highlights: [
          'Web interfaces in React and Tailwind CSS, with care for responsiveness and performance',
          'Integration with REST APIs in Java, handling loading, error and empty states',
          'State management and request caching with TanStack Query, cutting redundant calls to the server',
          'Builds with Maven and publishing to Liferay',
          'Version control with Git, GitHub and GitLab, in a merge request flow with peer review',
          'Taking part in refinement, estimation and the ceremonies of the cycle',
        ],
      },
      'cbtu-estagio': {
        role: 'Development Intern',
        highlights: [
          'Maintenance and evolution of corporate systems supporting urban transport operations, where downtime directly affects public service',
          'Maintenance and evolution of Java applications, focused on stability',
          'Query modelling, tuning and preventive maintenance on Oracle and MySQL databases',
          'Diagnosis and correction of defects in legacy code',
          'Supporting internal users in identifying and resolving system problems',
        ],
      },
      'cbtu-aprendiz': {
        role: 'Apprentice',
        highlights: [
          'First experience in technology, developing and maintaining routines in Java',
          'Operation and maintenance of Oracle and MySQL databases',
          'Support for IT routines serving urban transport systems',
        ],
      },
    },
  },
  skills: {
    label: 'Technologies',
    title: 'Stack and tools',
    description: 'What I work with today, grouped by where each piece sits in the system.',
    groups: {
      backend: 'Back end',
      frontend: 'Front end',
      servicenow: 'ServiceNow',
      data: 'Data',
      tooling: 'Tooling',
      practices: 'Practices',
    },
  },
  certifications: {
    label: 'Credentials',
    title: 'Certifications',
    description: 'Credentials issued by ServiceNow, Alura, Rocketseat and VMEdu.',
    issuedIn: 'Issued',
  },
  projects: {
    label: 'Portfolio',
    title: 'Featured projects',
    description:
      'Two systems that solve a concrete problem and carry the technical decision I care to defend.',
    pastLabel: 'Earlier work',
    pastTitle: 'What came before',
    viewLive: 'View live',
    viewCode: 'Code',
    closedSource: 'Closed source',
    liveAria: 'Open live demo of',
    codeAria: 'View source code of',
    items: {
      'cofre-de-gastos': {
        summary:
          'Personal expense tracking built from bank statements, running entirely in the browser. No data ever leaves the user machine.',
        highlights: [
          'Derives a merchant key from the statement description, stripping date, instalment and store code, so categorising once applies to the whole history and to every future import',
          'Imports OFX, CSV, XLSX and statement PDFs with format detection by content, deduplicates re-imports and separates transfers between the owner accounts, which are not spending',
          'Encrypts with AES-256-GCM in IndexedDB, with a key derived by PBKDF2 over 600 thousand iterations and an enveloped data key, which allows changing the password without re-encrypting the history',
          'The content security policy declares connect-src none: not even a compromised library could send the data out',
        ],
      },
      'bot-de-emprego': {
        summary:
          'Automation that sweeps developer job postings across four platforms, filters by real relevance and tracks every application through to the log.',
        highlights: [
          'Four platforms over one shared abstraction, where each integration implements only login, search and job processing',
          'Answer engine with around 140 keyword rules, with accent normalisation and fallback by field type',
          'When it meets an unknown question it pauses and asks over Telegram; the answer is then learned for the next postings',
          'Layered filters by location, title and stack, automatic résumé selection matching the job profile, and a local web panel to follow the run',
        ],
      },
      colorashin: {
        summary:
          'Turns any image into a colouring page, with server-side processing and integrated checkout.',
      },
      mentech: {
        summary:
          'Platform for Cognitive Behavioural Therapy practitioners to manage patients, intake records and clinical progress.',
      },
      'chat-jp': {
        summary:
          'React chat interface consuming the OpenAI API, built to study response streaming and message state.',
      },
    },
  },
  status: {
    active: 'Active',
    evolving: 'Evolving',
    maintenance: 'Maintenance',
    archived: 'Archived',
  },
  github: {
    label: 'GitHub live',
    title: 'Recent repositories',
    description: 'Fetched straight from the public GitHub API, ordered by most recent update.',
    gridLabel: 'GitHub repositories',
    errorMessage: 'The repositories could not be loaded right now.',
    errorLink: 'View the GitHub profile',
    viewProfile: 'View full profile',
    noDescription: 'No description.',
    repoAria: 'Open repository',
  },
  contact: {
    label: 'Contact',
    title: 'Let us talk',
    description:
      'Open to opportunities. If you have an interesting technical problem to solve, write to me.',
    sendEmail: 'Send an email',
    openQuickContact: 'Open quick contact',
    closeQuickContact: 'Close quick contact',
    channels: {
      email: 'Email',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      phone: 'Phone',
      lattes: 'Lattes',
    },
    lattesValue: 'Academic CV',
  },
  footer: {
    backToTop: 'Back to top',
  },
  terms: {
    'es-modules': 'ES Modules',
    'relational-modeling': 'Relational modelling',
  },
  time: {
    today: 'today',
    yesterday: 'yesterday',
    days: (value) => `${value} days ago`,
    months: (value) => `${value} months ago`,
    years: (value) => `${value} years ago`,
  },
}
