/* === HAMBURGUESA ============================================= */
const mainNav   = document.getElementById('mainNav');
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu= document.getElementById('mobileMenu');

burgerBtn.addEventListener('click', () => {
  const open = mainNav.getAttribute('data-open') === 'true';
  mainNav.setAttribute('data-open', String(!open));
  burgerBtn.setAttribute('aria-expanded', String(!open));
  mobileMenu.setAttribute('aria-hidden', String(open));
});

// Cerrar al hacer click en link del menu movil
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mainNav.setAttribute('data-open','false');
    burgerBtn.setAttribute('aria-expanded','false');
    mobileMenu.setAttribute('aria-hidden','true');
  });
});

// Cerrar al redimensionar a desktop
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    mainNav.setAttribute('data-open','false');
    burgerBtn.setAttribute('aria-expanded','false');
    mobileMenu.setAttribute('aria-hidden','true');
  }
});

/* === SELECTOR DE TEMAS ======================================= */
const themeBtn   = document.getElementById('themeBtn');
const themePanel = document.getElementById('themePanel');
const themeLbl   = document.getElementById('themeLbl');
const toastEl    = document.getElementById('toast');
const htmlEl     = document.documentElement;
const themeNames = {dark:'Dark',light:'Light',sunset:'Sunset',ocean:'Ocean',forest:'Forest',candy:'Candy'};

// Cargar tema guardado
const saved = localStorage.getItem('css-project-theme') || 'dark';
applyTheme(saved);

// Toggle panel
themeBtn.addEventListener('click', e => {
  e.stopPropagation();
  themePanel.classList.toggle('open');
});

// Cerrar al click fuera
document.addEventListener('click', e => {
  if (!themePanel.contains(e.target) && e.target !== themeBtn)
    themePanel.classList.remove('open');
});

// Cerrar con Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    themePanel.classList.remove('open');
    mainNav.setAttribute('data-open','false');
  }
});

// Cambiar tema
document.querySelectorAll('.theme-option').forEach(btn => {
  btn.addEventListener('click', () => {
    const t = btn.getAttribute('data-t');
    applyTheme(t);
    localStorage.setItem('css-project-theme', t);
    themePanel.classList.remove('open');
    showToast('Tema: ' + themeNames[t]);
  });
});

function applyTheme(t) {
  htmlEl.setAttribute('data-theme', t);
  document.querySelectorAll('.theme-option').forEach(b =>
    b.classList.toggle('active', b.getAttribute('data-t') === t)
  );
  themeLbl.textContent = themeNames[t] || 'Tema';
}

/* === TOAST =================================================== */
let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}