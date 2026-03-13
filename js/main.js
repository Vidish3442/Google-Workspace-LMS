// ============================================================
// main.js — Shared utilities across all pages
// Dark mode, navigation, search, toast, scroll animations
// ============================================================

// ── Dark Mode ────────────────────────────────────────────────
const DarkMode = {
  init() {
    const saved = localStorage.getItem('gw-theme') || 'light';
    this.apply(saved);
    document.querySelectorAll('.dark-mode-toggle').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },
  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gw-theme', theme);
    document.querySelectorAll('.dark-mode-toggle').forEach(btn => {
      btn.innerHTML = theme === 'dark'
        ? '<i class="bi bi-sun-fill"></i>'
        : '<i class="bi bi-moon-stars-fill"></i>';
      btn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    });
  },
  toggle() {
    const current = localStorage.getItem('gw-theme') || 'light';
    this.apply(current === 'dark' ? 'light' : 'dark');
  }
};

// ── Toast Notifications ──────────────────────────────────────
const Toast = {
  show(message, type = 'info', duration = 3500) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const icons = { success: 'bi-check-circle-fill', error: 'bi-x-circle-fill', warning: 'bi-exclamation-circle-fill', info: 'bi-info-circle-fill' };
    const colors = { success: '#34a853', error: '#ea4335', warning: '#fbbc04', info: '#1a73e8' };

    const toast = document.createElement('div');
    toast.className = `toast-msg ${type}`;
    toast.innerHTML = `
      <i class="bi ${icons[type] || icons.info}" style="color:${colors[type]};font-size:1.1rem;flex-shrink:0;margin-top:1px;"></i>
      <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

// ── Search ───────────────────────────────────────────────────
const Search = {
  init() {
    const input = document.getElementById('navbarSearch');
    const dropdown = document.getElementById('searchDropdown');
    if (!input || !dropdown) return;

    input.addEventListener('input', () => this.handleSearch(input.value, dropdown));
    input.addEventListener('focus', () => { if (input.value.trim()) dropdown.classList.add('show'); });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar-search')) dropdown.classList.remove('show');
    });
  },

  handleSearch(query, dropdown) {
    query = query.trim().toLowerCase();
    if (!query) { dropdown.classList.remove('show'); return; }

    const results = [];
    GWData.modules.forEach(mod => {
      mod.lessons.forEach(lesson => {
        if (lesson.title.toLowerCase().includes(query) || mod.title.toLowerCase().includes(query)) {
          results.push({ type: 'lesson', title: lesson.title, sub: `${mod.badge} — ${mod.title}`, color: mod.color, icon: lesson.icon, href: `lesson.html?module=${mod.id}&lesson=${lesson.id}` });
        }
      });
      if (mod.title.toLowerCase().includes(query)) {
        results.push({ type: 'module', title: mod.title, sub: `Module — ${mod.badge}`, color: mod.color, icon: mod.icon, href: `courses.html#${mod.id}` });
      }
    });

    // Also search quiz and resources
    if ('quiz'.includes(query) || 'test'.includes(query)) {
      results.push({ type: 'page', title: 'Take a Quiz', sub: 'Test your knowledge', color: '#9c27b0', icon: 'bi-question-circle', href: 'quiz.html?module=module1' });
    }
    if ('resource'.includes(query) || 'download'.includes(query)) {
      results.push({ type: 'page', title: 'Resources', sub: 'Templates & guides', color: '#00897b', icon: 'bi-download', href: 'resources.html' });
    }

    dropdown.innerHTML = results.length
      ? results.slice(0, 6).map(r => `
          <a href="${r.href}" class="search-result-item">
            <div class="result-icon" style="background:${r.color}20;color:${r.color}">
              <i class="bi ${r.icon}"></i>
            </div>
            <div>
              <div class="result-title">${r.title}</div>
              <div class="result-sub">${r.sub}</div>
            </div>
          </a>`).join('')
      : `<div class="search-result-item"><div class="result-sub" style="width:100%;text-align:center;padding:0.5rem 0;">No results for "${query}"</div></div>`;

    dropdown.classList.add('show');
  }
};

// ── Navigation: Active Link ───────────────────────────────────
function setActiveNavLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ── Auth-aware Navigation ─────────────────────────────────────
function updateNavAuth() {
  const user = Auth.getUser();
  // Class-based pattern (used by shared renderNavbar)
  document.querySelectorAll('.nav-login-btn').forEach(btn => {
    btn.style.display = user ? 'none' : '';
  });
  document.querySelectorAll('.nav-user-menu').forEach(menu => {
    if (user) {
      menu.style.display = '';
      const avatar = menu.querySelector('.nav-avatar');
      if (avatar) avatar.textContent = user.name.charAt(0).toUpperCase();
      const nameEl = menu.querySelector('.nav-user-name');
      if (nameEl) nameEl.textContent = user.name;
    } else {
      menu.style.display = 'none';
    }
  });

  // ID-based pattern (used by current static HTML pages)
  const loginBtn = document.getElementById('nav-login-btn');
  const userMenu = document.getElementById('nav-user-menu');
  const avatarEl = document.getElementById('navUserAvatar');
  const nameEl = document.getElementById('navUserName');

  if (loginBtn) loginBtn.style.display = user ? 'none' : '';
  if (userMenu) {
    if (user) {
      userMenu.classList.remove('d-none');
      if (avatarEl) avatarEl.textContent = user.name.charAt(0).toUpperCase();
      // Keep trigger compact: show avatar only (full name can appear in page content)
      if (nameEl) {
        nameEl.textContent = '';
        nameEl.style.display = 'none';
      }
    } else {
      userMenu.classList.add('d-none');
      if (nameEl) {
        nameEl.textContent = '';
        nameEl.style.display = 'none';
      }
    }
  }
}

// ── Scroll Animations (Intersection Observer) ─────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}

// ── Progress Bar Animations ───────────────────────────────────
function animateProgressBars() {
  document.querySelectorAll('.progress-bar-fill').forEach(bar => {
    const target = bar.getAttribute('data-width') || bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => { bar.style.width = target; }, 200);
  });
}

// ── Utility: Format date ──────────────────────────────────────
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date instanceof Date ? date : new Date(date));
}

// ── Initialize all shared features ───────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  DarkMode.init();
  Search.init();
  setActiveNavLink();
  updateNavAuth();
  initScrollAnimations();
  animateProgressBars();

  // Logout buttons
  document.querySelectorAll('.logout-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      Auth.logout();
      Toast.show('You have been logged out.', 'info');
      setTimeout(() => { window.location.href = 'index.html'; }, 800);
    });
  });
});

// ── Shared Navbar HTML ─────────────────────────────────────────
// Injected by each page (via data-navbar) for DRY consistency
function renderNavbar(activePage) {
  return `
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container">
      <a class="navbar-brand" href="index.html">
        <div class="brand-logo"><i class="bi bi-mortarboard-fill"></i></div>
        <span>GW Training</span>
      </a>

      <div class="d-flex align-items-center gap-2 order-lg-last">
        <button class="btn-navbar-icon dark-mode-toggle" title="Toggle dark mode">
          <i class="bi bi-moon-stars-fill"></i>
        </button>
        <div class="nav-login-btn">
          <a href="login.html" class="btn-outline-gw" style="text-decoration:none;padding:0.4rem 1rem;font-size:0.85rem;">Login</a>
        </div>
        <div class="nav-user-menu dropdown" style="display:none;">
          <div class="nav-avatar dropdown-toggle" data-bs-toggle="dropdown" title="Account menu"></div>
          <ul class="dropdown-menu dropdown-menu-end" style="min-width:200px;padding:0.5rem;">
            <li><span class="nav-user-name px-3 py-2 d-block fw-bold" style="font-size:0.9rem;"></span></li>
            <li><hr class="dropdown-divider my-1"></li>
            <li><a class="dropdown-item" href="dashboard.html"><i class="bi bi-speedometer2 me-2"></i>Dashboard</a></li>
            <li><a class="dropdown-item" href="certificate.html"><i class="bi bi-award me-2"></i>Certificate</a></li>
            <li><hr class="dropdown-divider my-1"></li>
            <li><a class="dropdown-item logout-btn text-danger" href="#"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
          </ul>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav mx-auto gap-1">
          <li class="nav-item"><a class="nav-link ${activePage==='home'?'active':''}" href="index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link ${activePage==='courses'?'active':''}" href="courses.html">Courses</a></li>
          <li class="nav-item"><a class="nav-link ${activePage==='dashboard'?'active':''}" href="dashboard.html">Dashboard</a></li>
          <li class="nav-item"><a class="nav-link ${activePage==='resources'?'active':''}" href="resources.html">Resources</a></li>
          <li class="nav-item"><a class="nav-link ${activePage==='contact'?'active':''}" href="contact.html">Contact</a></li>
        </ul>
        <div class="navbar-search position-relative d-none d-lg-flex align-items-center">
          <i class="bi bi-search search-icon"></i>
          <input type="text" id="navbarSearch" placeholder="Search lessons…" autocomplete="off">
          <div class="search-results-dropdown" id="searchDropdown"></div>
        </div>
      </div>
    </div>
  </nav>`;
}
