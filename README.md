# Portfólio — João Pedro Amaral Rosa

Portfólio pessoal em React, com tema duplo, três idiomas e dados do GitHub consultados ao vivo.

**Desenvolvedor Fullstack** · Java, Spring Boot, React e ServiceNow · Brasília, DF

[linkedin.com/in/joaopedroamaralrosa](https://www.linkedin.com/in/joaopedroamaralrosa/) ·
[github.com/JoaoPedroAmaral](https://github.com/JoaoPedroAmaral)

---

## O que o sistema faz

| Recurso | Comportamento |
|---|---|
| **Tema duplo** | Escuro e claro, com escuro como padrão. A escolha persiste e é aplicada antes da primeira pintura, por um script síncrono no `head`, de modo que o tema errado nunca pisca. Sem escolha salva, respeita o `prefers-color-scheme` do sistema |
| **Três idiomas** | Português, inglês e espanhol. Detecta o idioma do navegador na primeira visita, cai para português quando não há suporte, persiste a escolha e atualiza `lang`, `title` e `description` do documento |
| **GitHub ao vivo** | Perfil e repositórios vêm da API pública numa única passagem. Descarta bifurcações e o repositório de perfil, ordena pela atualização mais recente, mostra esqueleto enquanto carrega e degrada para um aviso com link quando a API falha ou excede o limite |
| **Contato rápido** | Acionador fixo no canto que abre os canais em bolhas escalonadas, acessível de qualquer ponto da página, sem rolagem. Fecha com clique fora ou Escape |
| **Movimento** | Entradas por rolagem, parallax de cursor no hero e barra de progresso de leitura. Sob `prefers-reduced-motion`, a camada de animação não é montada e o conteúdo renderiza em estado final |
| **Navegação** | Âncoras com rolagem suave e marcação da seção visível, que se desmarca ao voltar ao topo. Em tela estreita vira menu alternável |

## Stack

| Camada | Tecnologias |
|---|---|
| Interface | React 18, Tailwind CSS 4, Framer Motion, lucide-react |
| Build | Vite 5 |
| Testes | Vitest, Testing Library, jsdom |
| Qualidade | ESLint |

Tipografia: **Fraunces** no display, **Inter** no texto e **JetBrains Mono** em rótulos e metadados.

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Serve o build gerado |
| `npm run lint` | ESLint, sem tolerância a aviso |
| `npm test` | Testes em modo observação |
| `npm run test:run` | Testes em passagem única |

## Arquitetura

Três camadas, com uma regra de dependência: `components` consome `constants`, `hooks`, `context` e
`i18n`; nenhuma dessas importa de `components`.

```
src/
  constants/        dados e configuração, sem apresentação
    site.js           identidade, navegação, canais sociais
    projects.js       projetos em destaque e anteriores
    experience.js     trajetória, com períodos em YYYY-MM
    skills.js         grupos da stack
    certifications.js credenciais
    motion.js         durações, atrasos e variantes compartilhadas

  i18n/             idiomas
    locales/          pt, en, es, com a mesma estrutura de chaves
    LanguageProvider  detecção, persistência e troca

  context/          estado compartilhado
    ThemeProvider     tema, persistência e View Transitions
    GitHubProvider    uma consulta à API, consumida por hero e listagem

  hooks/
    useGitHubProfile  perfil e repositórios numa passagem
    useActiveSection  seção visível para a navegação
    usePointerGlow    brilho e parallax do cursor

  components/
    layout/           navbar, rodapé, tema, idioma, progresso, contato rápido
    sections/         hero, sobre, experiência, stack, projetos, repositórios
    ui/               primitivas reutilizáveis

  utils/
    date.js           tempo relativo e períodos formatados por idioma
```

### Sistema de design

A cor nunca aparece literal em componente. Os tokens crus ficam em `:root`, são espelhados por
`[data-theme="dark"]`, `[data-theme="light"]` e `prefers-color-scheme`, e são expostos ao Tailwind
pelo bloco `@theme inline`. Trocar o tema é trocar um atributo no elemento raiz.

Todos os pares de texto e fundo atingem no mínimo contraste AA nos dois temas, conferido por cálculo
da razão de contraste sobre os tokens reais.

### Testes

A suíte verifica **regra de negócio e comportamento observável**, nunca arquivo ou implementação. As
consultas são por papel acessível, rótulo e texto visível; a API do GitHub é tratada como fronteira e
simulada. Uma refatoração que preserve os requisitos mantém a suíte passando.

```
 Test Files  9 passed (9)
      Tests  74 passed (74)
```

Cobertura por área: tema, idiomas, projetos em destaque, projetos anteriores, integração com GitHub,
contato rápido, navegação, acessibilidade, movimento reduzido e consistência dos dados de perfil.

### Acessibilidade

Marcos semânticos, atalho para o conteúdo, foco sempre visível, alvos de toque de 44px, `rel` seguro
em todo link externo, texto alternativo e dimensões declaradas nas imagens, e layout sem rolagem
horizontal a partir de 320px.

## Projetos em destaque

| Projeto | O que é | Links |
|---|---|---|
| **Cofre de Gastos** | Controle de gastos a partir de extratos bancários, rodando inteiro no navegador. Cifra em AES-256-GCM no IndexedDB, com chave derivada por PBKDF2, e declara `connect-src 'none'` na política de segurança, o que torna a exfiltração impossível em vez de improvável | [demonstração](https://cofre-de-gastos.pages.dev/) · [código](https://github.com/JoaoPedroAmaral/Cofre-de-gastos) |
| **Bot de Emprego** | Automação de candidaturas em quatro plataformas sobre uma abstração comum, com motor de respostas por palavra-chave, seleção de currículo por perfil da vaga e controle remoto por Telegram | código fechado |
