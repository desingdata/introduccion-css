(function () {

  /* ── ELEMENTOS ── */
  const html         = document.documentElement;
  const hamburger    = document.getElementById('hamburger');
  const navLinks     = document.getElementById('navLinks');
  const themeToggle  = document.getElementById('themeToggle');
  const themeDropdown= document.getElementById('themeDropdown');
  const themeOptions = document.querySelectorAll('.theme-option');
  const themeLabel   = document.getElementById('themeLabel');
  const heroBadge    = document.getElementById('heroBadge');
  const scrollTopBtn = document.getElementById('scrollTop');

  /* Etiquetas legibles para cada tema */
  const themeNames = {
    noche:  'Noche',
    aurora: 'Aurora',
    fuego:  'Fuego',
    oceano: 'Océano',
    rosa:   'Rosa',
    claro:  'Claro'
  };

  /* ── 1. HAMBURGUESA — abre/cierra el menú en móvil ── */
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);

    // Si se abre el nav, cierra el dropdown de temas
    if (isOpen) themeDropdown.classList.remove('open');
  });

  // Cerrar nav al hacer clic en cualquier enlace del menú
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  /* ── 2. SELECTOR DE TEMA — abre/cierra el panel ── */
  themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = themeDropdown.classList.toggle('open');
    themeToggle.setAttribute('aria-expanded', isOpen);

    // Si se abre el dropdown de temas, cierra el nav en móvil
    if (isOpen) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    }
  });

  /* Aplicar tema al hacer clic en una opción */
  themeOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
      themeDropdown.classList.remove('open');
      themeToggle.setAttribute('aria-expanded', false);
    });
  });

  /* Función central de aplicación de tema */
  function applyTheme(theme) {
    // 1. Actualiza el atributo en <html> — los selectores CSS reaccionan
    html.setAttribute('data-theme', theme);

    // 2. Marca el botón activo
    themeOptions.forEach(b => b.classList.toggle('active', b.dataset.theme === theme));

    // 3. Actualiza las etiquetas de texto
    const name = themeNames[theme] || theme;
    themeLabel.textContent = name;
    heroBadge.textContent  = name;

    // 4. Persiste la elección en localStorage para próximas visitas
    try { localStorage.setItem('css-demo-theme', theme); } catch(e) {}
  }

  /* ── 3. CERRAR DROPDOWNS al hacer clic fuera ── */
  document.addEventListener('click', (e) => {
    // Cerrar dropdown de temas
    if (!document.getElementById('themePicker').contains(e.target)) {
      themeDropdown.classList.remove('open');
      themeToggle.setAttribute('aria-expanded', false);
    }
    // Cerrar nav móvil
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    }
  });

  /* ── 4. SCROLL-TO-TOP ── */
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── 5. RESTAURAR TEMA GUARDADO ── */
  try {
    const saved = localStorage.getItem('css-demo-theme');
    if (saved && themeNames[saved]) {
      applyTheme(saved);
    }
  } catch(e) {}

})();