/* ============================================================
     TEMA
     Cambiar data-theme en <html> actualiza todas las CSS vars
     en cascada al instante. Se persiste en localStorage.
  ============================================================ */
  const html            = document.documentElement;
  const themeToggleBtn  = document.getElementById('themeToggleBtn');
  const themePanel      = document.getElementById('themePanel');
  const themeOptions    = document.querySelectorAll('.theme-option');

  // Abrir / cerrar panel
  themeToggleBtn.addEventListener('click', e => {
    e.stopPropagation();
    const open = themePanel.classList.toggle('open');
    themeToggleBtn.setAttribute('aria-expanded', open);
  });

  // Cerrar al clic fuera
  document.addEventListener('click', () => {
    themePanel.classList.remove('open');
    themeToggleBtn.setAttribute('aria-expanded', false);
  });
  themePanel.addEventListener('click', e => e.stopPropagation());

  // Aplicar tema seleccionado
  themeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const t = opt.dataset.theme;
      html.setAttribute('data-theme', t);          // CSS vars se actualizan
      themeOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      themePanel.classList.remove('open');
      themeToggleBtn.setAttribute('aria-expanded', false);
      try { localStorage.setItem('css-ui-theme', t); } catch(e) {}
    });
  });

  // Restaurar tema guardado
  try {
    const saved = localStorage.getItem('css-ui-theme');
    if (saved) {
      html.setAttribute('data-theme', saved);
      themeOptions.forEach(o => o.classList.toggle('active', o.dataset.theme === saved));
    }
  } catch(e) {}

  /* ============================================================
     HAMBURGUESA
     Toggle de clases en hamburguesa (.active) y nav-links (.open).
     La animacion CSS usa max-height + opacity (ver CSS arriba).
  ============================================================ */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Cerrar al navegar
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  /* ============================================================
     ENLACE ACTIVO EN EL NAV
     IntersectionObserver detecta la seccion visible y marca
     el enlace correspondiente con .active-link.
  ============================================================ */
  const sections = document.querySelectorAll('main section[id]');
  const links    = navLinks.querySelectorAll('a');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active-link'));
        const a = navLinks.querySelector(`a[href="#${e.target.id}"]`);
        if (a) a.classList.add('active-link');
      }
    });
  }, { rootMargin: '-15% 0px -70% 0px' });

  sections.forEach(s => io.observe(s));