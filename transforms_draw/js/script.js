/* ── Hamburger / Menú móvil ────────────────────────
       Toggle de clase .open en botón y drawer.
       Cierre automático al navegar o hacer clic fuera. */
const btn = document.getElementById('hamburger');
const menu = document.getElementById('mobileMenu');

btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
});

document.querySelectorAll('.ml').forEach(a =>
    a.addEventListener('click', () => {
        menu.classList.remove('open'); btn.classList.remove('open');
        btn.setAttribute('aria-expanded', false); menu.setAttribute('aria-hidden', true);
    })
);

document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove('open'); btn.classList.remove('open');
        btn.setAttribute('aria-expanded', false); menu.setAttribute('aria-hidden', true);
    }
});

/* ── Selector de tema ──────────────────────────────
   1. Cambia data-theme en <html>
   2. Sincroniza el estado .active en TODOS los botones
   3. Persiste en localStorage */
const html = document.documentElement;

function applyTheme(t) {
    html.setAttribute('data-theme', t);
    document.querySelectorAll('.theme-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.theme === t)
    );
    localStorage.setItem('css-demo-theme', t);
}

document.querySelectorAll('.theme-btn').forEach(b =>
    b.addEventListener('click', () => applyTheme(b.dataset.theme))
);

/* Restaurar tema guardado al cargar */
const saved = localStorage.getItem('css-demo-theme');
if (saved) applyTheme(saved);