/**
 * CSS LAYOUTS - FUNCIONALIDAD INTERACTIVA
 * - Navbar hamburguesa responsive
 * - Cambio de tema (claro/oscuro)
 * - Persistencia en localStorage
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const hamburgers = document.querySelectorAll('.hamburger');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    const html = document.documentElement;

    // ============================================
    // NAVBAR HAMBURGUESA
    // ============================================

    navToggle.addEventListener('click', () => {
        // Toggle clase active en el menú
        navMenu.classList.toggle('active');

        // Animar hamburguesa a X
        hamburgers.forEach(hamburger => {
            hamburger.classList.toggle('active');
        });

        // Cambiar aria-label para accesibilidad
        const isOpen = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    // Cerrar menú al hacer clic en un enlace (mobile)
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                hamburgers.forEach(hamburger => {
                    hamburger.classList.remove('active');
                });
            }
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburgers.forEach(hamburger => {
                hamburger.classList.remove('active');
            });
        }
    });

    // ============================================
    // CAMBIO DE TEMA (CLARO/OSCURO)
    // ============================================

    // Detectar preferencia guardada o preferencia del sistema
    const getPreferredTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme;
        }
        // Detectar preferencia del sistema
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Aplicar tema
    const setTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    };

    // Actualizar icono según tema
    const updateThemeIcon = (theme) => {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    };

    // Toggle tema
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Escuchar cambios en preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Inicializar tema
    setTheme(getPreferredTheme());

    // ============================================
    // ANCHOR POSITIONING API DEMO
    // ============================================

    // Verificar soporte para Anchor Positioning
    const supportsAnchorPositioning = CSS.supports('anchor-name', '--anchor');

    if (supportsAnchorPositioning) {
        console.log('✅ CSS Anchor Positioning API soportada');

        // Configurar ancla dinámicamente si es necesario
        const anchorBtn = document.getElementById('anchorBtn');
        if (anchorBtn) {
            anchorBtn.style.anchorName = '--anchor-el';
        }
    } else {
        console.log('⚠️ CSS Anchor Positioning API no soportada - usando fallback');
    }

    // ============================================
    // SCROLL SUAVE PARA ANCLAS
    // ============================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ANIMACIONES AL SCROLL (Intersection Observer)
    // ============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animación a subsecciones
    document.querySelectorAll('.subsection').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(section);
    });
});