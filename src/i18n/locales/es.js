export const es = {
  meta: {
    title: 'João Pedro Amaral — Desarrollador Fullstack',
    description:
      'Desarrollador fullstack en Java, Spring Boot y React, certificado ServiceNow CSA. Integraciones REST y automatización de procesos.',
  },
  nav: {
    label: 'Navegación principal',
    home: 'Volver al inicio',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    skipToContent: 'Saltar al contenido',
    about: 'Sobre mí',
    experience: 'Experiencia',
    skills: 'Stack',
    certifications: 'Certificaciones',
    projects: 'Proyectos',
    github: 'Repositorios',
  },
  theme: {
    toLight: 'Cambiar al tema claro',
    toDark: 'Cambiar al tema oscuro',
  },
  language: {
    label: 'Idioma',
    choose: 'Elegir idioma',
  },
  hero: {
    availability: 'Abierto a oportunidades',
    tagline:
      'Desarrollador fullstack en Java, Spring Boot y React. Integraciones REST y automatización de procesos en ServiceNow.',
    viewProjects: 'Ver proyectos',
    scrollHint: 'desplazar',
    stats: {
      repos: 'repositorios',
      followers: 'seguidores',
      stars: 'estrellas',
    },
  },
  about: {
    label: 'Sobre mí',
    title: 'Sistemas que siguen en pie después del despliegue',
    paragraphs: [
      'Trabajo desde la base de datos hasta el navegador. En el back-end construyo APIs en Java y Spring Boot con capas bien separadas y una persistencia pensada para durar. En el front entrego interfaces en React que cargan rápido y siguen siendo legibles tras meses de mantenimiento.',
      'Hoy reparto el tiempo entre producto y plataforma: desarrollo de interfaces en SEA Tecnologia y construcción de aplicaciones en ServiceNow, desde el modelado de la tabla hasta la interfaz. Lo que más me sorprendió en ese cambio fue cuánto de la base de APIs REST se transfirió directamente: contrato de integración, modelado de datos y manejo de errores son los mismos problemas, con otro nombre y otra pantalla.',
    ],
    photoAlt: 'Retrato de João Pedro Amaral Rosa',
    facts: {
      role: { label: 'Función', value: 'Desarrollador Fullstack' },
      base: { label: 'Base', value: 'Brasilia, Brasil' },
      education: { label: 'Formación', value: 'Ciencias de la Computación, UDF' },
      certification: { label: 'Certificación', value: 'ServiceNow CSA' },
      focus: { label: 'Enfoque', value: 'Java, Spring Boot, React y ServiceNow' },
      status: { label: 'Situación', value: 'Abierto a oportunidades' },
    },
  },
  experience: {
    label: 'Trayectoria',
    title: 'Experiencia profesional',
    present: 'actual',
    items: {
      'chain-academy': {
        role: 'Desarrollador ServiceNow',
        highlights: [
          'Programa de formación técnica en ServiceNow sobre una instancia propia, con entregas evaluadas: administración de la plataforma, scripting, Flow Designer, UI Builder e inteligencia artificial',
          'Aplicaciones completas en ámbito propio, del modelado a la interfaz: diccionario de datos, choice lists, ACLs, menús de aplicación y grupos de acceso',
          'Scripted REST API para recibir datos de un sistema externo, con validación de contrato, verificación de usuario y respuesta estandarizada en JSON',
          'Integración de salida mediante REST Message encapsulada en un Script Include, activada por una Business Rule asíncrona y con reprocesamiento automático por Scheduled Job en caso de fallo',
          'Importación de bases externas con Import Sets y Transform Maps, usando coalesce para evitar duplicados',
          'Widgets de Service Portal en JavaScript, HTML y CSS, incluida una interfaz de arrastrar y soltar construida sin bibliotecas externas',
        ],
      },
      'sea-tecnologia': {
        role: 'Frontend Developer',
        highlights: [
          'Interfaces web en React y Tailwind CSS, cuidando la responsividad y el rendimiento',
          'Integración con APIs REST en Java, tratando los estados de carga, error y ausencia de datos',
          'Gestión de estado y caché de peticiones con TanStack Query, reduciendo llamadas redundantes al servidor',
          'Compilación con Maven y publicación en Liferay',
          'Versionado con Git, GitHub y GitLab, en un flujo de merge requests con revisión por pares',
          'Participación en el refinamiento, las estimaciones y las ceremonias del ciclo',
        ],
      },
      'cbtu-estagio': {
        role: 'Practicante de Desarrollo',
        highlights: [
          'Mantenimiento y evolución de sistemas corporativos que sostienen la operación de transporte urbano, donde la indisponibilidad afecta directamente al servicio público',
          'Mantenimiento y evolución de aplicaciones en Java, con foco en la estabilidad',
          'Modelado de consultas, ajustes y mantenimiento preventivo en bases Oracle y MySQL',
          'Diagnóstico y corrección de defectos en código heredado',
          'Atención a usuarios internos en la identificación y resolución de problemas',
        ],
      },
      'cbtu-aprendiz': {
        role: 'Joven Aprendiz',
        highlights: [
          'Primera experiencia en tecnología, desarrollando y manteniendo rutinas en Java',
          'Operación y mantenimiento de bases de datos Oracle y MySQL',
          'Apoyo en rutinas de TI orientadas a sistemas de transporte urbano',
        ],
      },
    },
  },
  skills: {
    label: 'Tecnologías',
    title: 'Stack y herramientas',
    description: 'El conjunto con el que trabajo hoy, agrupado por dónde actúa cada pieza en el sistema.',
    groups: {
      backend: 'Back-end',
      frontend: 'Front-end',
      servicenow: 'ServiceNow',
      data: 'Datos',
      tooling: 'Herramientas',
      practices: 'Prácticas',
    },
  },
  certifications: {
    label: 'Credenciales',
    title: 'Certificaciones',
    description: 'Credenciales emitidas por ServiceNow, Alura, Rocketseat y VMEdu.',
    issuedIn: 'Emitida en',
  },
  projects: {
    label: 'Portafolio',
    title: 'Proyectos destacados',
    description:
      'Dos sistemas que resuelven un problema concreto y cargan la decisión técnica que me interesa defender.',
    pastLabel: 'Trabajos anteriores',
    pastTitle: 'Lo que vino antes',
    viewLive: 'Ver en vivo',
    viewCode: 'Código',
    closedSource: 'Código cerrado',
    liveAria: 'Abrir demostración de',
    codeAria: 'Ver código de',
    items: {
      'cofre-de-gastos': {
        summary:
          'Control de gastos personales a partir de extractos bancarios, que funciona por completo en el navegador. Ningún dato sale de la máquina de quien lo usa.',
        highlights: [
          'Deriva una clave de comercio desde la descripción del extracto, quitando fecha, cuota y código de tienda, de modo que categorizar una vez vale para todo el historial y para las importaciones futuras',
          'Importa OFX, CSV, XLSX y PDF de factura con detección por contenido, deduplica la reimportación y separa las transferencias entre cuentas propias, que no son gasto',
          'Cifra en AES-256-GCM sobre IndexedDB, con clave derivada por PBKDF2 en 600 mil iteraciones y clave de datos envuelta, lo que permite cambiar la contraseña sin recifrar el historial',
          'La política de seguridad declara connect-src none: ni una biblioteca comprometida lograría enviar los datos hacia afuera',
        ],
      },
      'bot-de-emprego': {
        summary:
          'Automatización que rastrea vacantes de desarrollador en cuatro plataformas, filtra por relevancia real y sigue cada postulación hasta el registro.',
        highlights: [
          'Cuatro plataformas sobre una abstracción común, donde cada integración implementa solo inicio de sesión, búsqueda y procesamiento de vacante',
          'Motor de respuestas con cerca de 140 reglas por palabra clave, con normalización de acentos y respaldo por tipo de campo',
          'Cuando encuentra una pregunta desconocida, se detiene y consulta por Telegram; la respuesta queda aprendida para las próximas vacantes',
          'Filtros en capas por ubicación, título y stack, selección automática del currículum según el perfil de la vacante, y panel web local para seguir la ejecución',
        ],
      },
      colorashin: {
        summary:
          'Convierte cualquier imagen en una página para colorear, con procesamiento en el servidor y pago integrado.',
      },
      mentech: {
        summary:
          'Plataforma para profesionales de Terapia Cognitivo-Conductual que gestionan pacientes, anamnesis y evolución clínica.',
      },
      'chat-jp': {
        summary:
          'Interfaz de conversación en React que consume la API de OpenAI, hecha para estudiar el streaming de respuesta y el estado de los mensajes.',
      },
    },
  },
  status: {
    active: 'Activo',
    evolving: 'En evolución',
    maintenance: 'En mantenimiento',
    archived: 'Archivado',
  },
  github: {
    label: 'GitHub en vivo',
    title: 'Repositorios recientes',
    description:
      'Lista consultada directamente en la API pública de GitHub, ordenada por la actualización más reciente.',
    gridLabel: 'Repositorios de GitHub',
    errorMessage: 'No fue posible cargar los repositorios ahora.',
    errorLink: 'Ver el perfil en GitHub',
    viewProfile: 'Ver perfil completo',
    noDescription: 'Sin descripción.',
    repoAria: 'Abrir repositorio',
  },
  contact: {
    label: 'Contacto',
    title: 'Hablemos',
    description:
      'Abierto a oportunidades. Si tienes un problema técnico interesante que resolver, escríbeme.',
    sendEmail: 'Enviar correo',
    openQuickContact: 'Abrir contacto rápido',
    closeQuickContact: 'Cerrar contacto rápido',
    channels: {
      email: 'Correo',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      phone: 'Teléfono',
      lattes: 'Lattes',
    },
    lattesValue: 'Currículum académico',
  },
  footer: {
    backToTop: 'Volver al inicio',
  },
  terms: {
    'es-modules': 'Módulos ES',
    'relational-modeling': 'Modelado relacional',
  },
  time: {
    today: 'hoy',
    yesterday: 'ayer',
    days: (value) => `hace ${value} días`,
    months: (value) => `hace ${value} meses`,
    years: (value) => `hace ${value} años`,
  },
}
