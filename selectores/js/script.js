/* ================================================================
   MAIN.JS — Hamburguesa + Cambio de tema
   ================================================================ */

// ── REFERENCIAS AL DOM ──
const hamburgerBtn = document.getElementById('hamburger-btn');
const mainNav = document.getElementById('main-nav');
const navOverlay = document.getElementById('nav-overlay');
const themeBtns = document.querySelectorAll('.theme-btn');
const htmlEl = document.documentElement;

/* ────────────────────────────────────────────────────────────────
   MENÚ HAMBURGUESA
   - Agrega/elimina la clase .open en el nav y en el botón.
   - Actualiza aria-expanded para accesibilidad.
   - El overlay cierra el menú al hacer clic fuera.
──────────────────────────────────────────────────────────────── */
function toggleMenu(forceClose = false) {
    const isOpen = mainNav.classList.contains('open');

    if (forceClose || isOpen) {
        mainNav.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        navOverlay.classList.remove('visible');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.setAttribute('aria-label', 'Abrir menú');
        document.body.style.overflow = '';
    } else {
        mainNav.classList.add('open');
        hamburgerBtn.classList.add('open');
        navOverlay.classList.add('visible');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        hamburgerBtn.setAttribute('aria-label', 'Cerrar menú');
        document.body.style.overflow = 'hidden'; // evita scroll al fondo mientras el menú está abierto
    }
}

hamburgerBtn.addEventListener('click', () => toggleMenu());
navOverlay.addEventListener('click', () => toggleMenu(true));

// Cerrar al hacer clic en cualquier enlace del nav (móvil)
mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
});

// Cerrar con tecla Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(true);
});


/* ────────────────────────────────────────────────────────────────
   CAMBIO DE TEMA
   - Actualiza data-theme en <html> para que las variables CSS
     definidas por tema cambien toda la paleta de color.
   - Guarda la preferencia en localStorage para persistirla.
──────────────────────────────────────────────────────────────── */
function applyTheme(themeName) {
    htmlEl.setAttribute('data-theme', themeName);
    localStorage.setItem('css-demo-theme', themeName);

    // Marca el botón activo
    themeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === themeName);
    });
}

// Cargar tema guardado o usar el default
const savedTheme = localStorage.getItem('css-demo-theme') || 'dark-blue';
applyTheme(savedTheme);

// Escuchar clics en los botones de tema
themeBtns.forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
});


/* ────────────────────────────────────────────────────────────────
   RESPONSIVE: cerrar menú si la ventana se ensancha (≥768px)
   Evita el menú colgado al rotar el dispositivo.
──────────────────────────────────────────────────────────────── */
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) toggleMenu(true);
});


/* ────────────────────────────────────────────────────────────────
   SMOOTH SCROLL con offset para el header fijo
──────────────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const headerH = document.querySelector('.site-header').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});