/**
 * Portfolio — João Pedro Amaral
 * Vanilla JS: nav, project filter, scroll reveal, GitHub API
 */

// ---- CONFIG ----
const GITHUB_USERNAME = 'JoaoPedroAmaral';
// Optional: add a fine-grained personal token here (read:public_repo scope only)
// to increase rate limit from 60 to 5000 requests/hour.
const GITHUB_TOKEN = '';
const GITHUB_MAX_REPOS = 6;

// ---- LANGUAGE COLORS ----
const LANG_CLASS = {
  Java: 'lang-Java',
  JavaScript: 'lang-JavaScript',
  TypeScript: 'lang-TypeScript',
  Python: 'lang-Python',
  CSS: 'lang-CSS',
  HTML: 'lang-HTML',
};

function getLangClass(lang) {
  return LANG_CLASS[lang] ?? 'lang-default';
}

// ---- FORMAT DATE ----
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
}


// ================================================================
// NAV — scroll class + mobile toggle
// ================================================================
(function initNav() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  // Add scrolled class when page scrolls past 64px
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 64);
    highlightActiveLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile hamburger toggle
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();


// ================================================================
// NAV ACTIVE LINK — highlights the section currently in view
// ================================================================
function highlightActiveLink() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const scrollPos = window.scrollY + 120;

  let current = '';
  sections.forEach(section => {
    if (section.offsetTop <= scrollPos) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}


// ================================================================
// SCROLL REVEAL — Intersection Observer
// ================================================================
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-section');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();


// ================================================================
// PROJECT FILTER — pure JS, no jQuery/Isotope
// ================================================================
(function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards   = document.querySelectorAll('.project-card');

  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide cards
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });
})();


// ================================================================
// GITHUB API — fetch repos + aggregate stats
// ================================================================
(function initGithub() {
  const reposContainer = document.getElementById('githubRepos');
  const errorEl        = document.getElementById('githubError');

  const headers = {};
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  function fetchJson(url) {
    return fetch(url, { headers }).then(res => {
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      return res.json();
    });
  }

  // Fetch user data (followers count) + repos in parallel
  Promise.all([
    fetchJson(`https://api.github.com/users/${GITHUB_USERNAME}`),
    fetchJson(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`)
  ])
    .then(([user, repos]) => {
      // ---- Hero stats ----
      const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
      setStatNumber('statRepos', user.public_repos);
      setStatNumber('statFollowers', user.followers);
      setStatNumber('statStars', totalStars);

      // ---- Repos grid ----
      const displayRepos = repos
        .filter(r => !r.fork)
        .slice(0, GITHUB_MAX_REPOS);

      renderRepos(displayRepos);
    })
    .catch(err => {
      console.warn('GitHub API:', err.message);
      reposContainer.innerHTML = '';
      errorEl.hidden = false;

      // Show placeholder dashes in hero stats
      ['statRepos', 'statFollowers', 'statStars'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '—';
      });
    });

  function setStatNumber(elementId, value) {
    const el = document.getElementById(elementId);
    if (!el) return;
    animateCounter(el, value);
  }

  function renderRepos(repos) {
    reposContainer.innerHTML = '';

    if (!repos.length) {
      reposContainer.innerHTML = '<p style="color:var(--text-muted)">Nenhum repositório encontrado.</p>';
      return;
    }

    repos.forEach((repo, i) => {
      const card = buildRepoCard(repo);
      // Staggered entrance
      card.style.animationDelay = `${i * 80}ms`;
      card.style.animationFillMode = 'both';
      card.style.animation = `heroReveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 80}ms both`;
      reposContainer.appendChild(card);
    });
  }

  function buildRepoCard(repo) {
    const card = document.createElement('a');
    card.href    = repo.html_url;
    card.target  = '_blank';
    card.rel     = 'noopener noreferrer';
    card.className = 'repo-card';
    card.setAttribute('aria-label', `Repositório ${repo.name}`);

    const langDotClass = getLangClass(repo.language);
    const langLabel    = repo.language ?? '—';
    const description  = repo.description ?? 'Sem descrição.';
    const updated      = formatDate(repo.updated_at);

    card.innerHTML = `
      <span class="repo-name">${escapeHtml(repo.name)}</span>
      <p class="repo-desc">${escapeHtml(description)}</p>
      <div class="repo-meta">
        <span class="repo-meta-item">
          <span class="repo-lang-dot ${langDotClass}"></span>
          ${escapeHtml(langLabel)}
        </span>
        <span class="repo-meta-item">
          <i class="las la-star" aria-hidden="true"></i>
          ${repo.stargazers_count}
        </span>
        <span class="repo-meta-item">
          <i class="las la-code-branch" aria-hidden="true"></i>
          ${repo.forks_count}
        </span>
      </div>
      <span class="repo-updated">Atualizado: ${updated}</span>
    `;

    return card;
  }
})();


// ================================================================
// COUNTER ANIMATION — smooth number increment
// ================================================================
function animateCounter(el, target, duration = 900) {
  const start     = performance.now();
  const startVal  = 0;

  function tick(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(startVal + (target - startVal) * eased);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}


// ================================================================
// UTILITY — escape HTML to prevent XSS from API data
// ================================================================
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
