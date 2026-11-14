/* ==========================================================================
   LORENZO SANVITO — PORTFOLIO ENGINE
   Author: Lorenzo Sanvito (https://github.com/SANVITO-LORENZO)
   Notice: Proprietary source code. Unauthorized reproduction is prohibited.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    /* ---------------------------------------------------------------------- */
    /*  01. SOURCE PROTECTION & ANTI-CLONE GUARD                              */
    /* ---------------------------------------------------------------------- */
    console.log(
        "%c⚡ LORENZO SANVITO | PORTFOLIO %c\nProtected intellectual property. Crafting clean software @ Milano-Bicocca.",
        "color: #0ea5e9; font-size: 16px; font-weight: 800;",
        "color: #94a3b8; font-size: 12px;"
    );

    // Block context menu and image dragging
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('dragstart', (e) => e.preventDefault());

    // Intercept inspection and page-saving hotkeys
    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        const isDevShortcut =
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(key)) ||
            (e.ctrlKey && ['u', 's'].includes(key));

        if (isDevShortcut) {
            e.preventDefault();
            return false;
        }
    });

    /* ---------------------------------------------------------------------- */
    /*  02. TYPEWRITER ENGINE                                                 */
    /* ---------------------------------------------------------------------- */
    const typewriterEl = document.getElementById('typewriter-element');
    let typingTimeout;

    const startTyping = (isEn) => {
        if (!typewriterEl) return;
        clearTimeout(typingTimeout);
        typewriterEl.textContent = '';

        const textToType = isEn
            ? "Software Developer & Digital Solutions"
            : "Sviluppatore Software & Soluzioni Digitali";

        let idx = 0;
        const typeNextChar = () => {
            if (idx < textToType.length) {
                typewriterEl.textContent += textToType.charAt(idx);
                idx++;
                typingTimeout = setTimeout(typeNextChar, 42);
            }
        };
        setTimeout(typeNextChar, 260);
    };

    /* ---------------------------------------------------------------------- */
    /*  03. PAGE TRANSITION & RAF SCROLL PROGRESS                             */
    /* ---------------------------------------------------------------------- */
    const transitionEl = document.querySelector('.page-transition');
    if (transitionEl) {
        requestAnimationFrame(() => {
            setTimeout(() => transitionEl.classList.add('is-active'), 80);
        });
    }

    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);

    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
                progressBar.style.width = `${scrolled}%`;
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    /* ---------------------------------------------------------------------- */
    /*  04. RADIAL SPOTLIGHT & MAGNETIC HOVER                                 */
    /* ---------------------------------------------------------------------- */
    document.querySelectorAll('.glow-card, .sidebar-box').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    document.querySelectorAll('.magnetic').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const offsetX = (e.clientX - rect.left - rect.width / 2) * 0.18;
            const offsetY = (e.clientY - rect.top - rect.height / 2) * 0.18;
            btn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    /* ---------------------------------------------------------------------- */
    /*  05. DUAL-RING LERP CURSOR (SMART TOUCH DETECTION)                     */
    /* ---------------------------------------------------------------------- */
    const cursorRing = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    if (cursorRing) {
        let isTouch = false;
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        document.addEventListener('touchstart', () => {
            isTouch = true;
            cursorRing.style.display = 'none';
            if (cursorDot) cursorDot.style.display = 'none';
        }, { passive: true });

        document.addEventListener('mousemove', (e) => {
            if (isTouch) return;
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorRing.style.display = 'block';
            if (cursorDot) {
                cursorDot.style.display = 'block';
                cursorDot.style.left = `${mouseX}px`;
                cursorDot.style.top = `${mouseY}px`;
            }
        }, { passive: true });

        // Smooth interpolation loop for outer ring
        const renderCursor = () => {
            if (!isTouch) {
                ringX += (mouseX - ringX) * 0.22;
                ringY += (mouseY - ringY) * 0.22;
                cursorRing.style.left = `${ringX}px`;
                cursorRing.style.top = `${ringY}px`;
            }
            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);

        document.querySelectorAll('a, button, .glow-card, .switch').forEach((el) => {
            el.addEventListener('mouseenter', () => {
                if (!isTouch) cursorRing.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                if (!isTouch) cursorRing.classList.remove('hover');
            });
        });
    }

    /* ---------------------------------------------------------------------- */
    /*  06. PARTICLES INITIALIZATION                                          */
    /* ---------------------------------------------------------------------- */
    const initParticles = (isLight) => {
        if (!document.getElementById('particles-js') || typeof particlesJS === 'undefined') return;
        const particleColor = isLight ? '#0284c7' : '#0ea5e9';

        particlesJS('particles-js', {
            particles: {
                number: { value: 38, density: { enable: true, value_area: 850 } },
                color: { value: particleColor },
                shape: { type: 'circle' },
                opacity: { value: 0.45, random: false },
                size: { value: 2.8, random: true },
                line_linked: {
                    enable: true,
                    distance: 145,
                    color: particleColor,
                    opacity: 0.18,
                    width: 1
                },
                move: { enable: true, speed: 1.6 }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'grab' } },
                modes: { grab: { distance: 140, line_linked: { opacity: 0.75 } } }
            },
            retina_detect: true
        });
    };

    /* ---------------------------------------------------------------------- */
    /*  07. LOCALIZATION (IT / EN) & DYNAMIC CV ROUTING                       */
    /* ---------------------------------------------------------------------- */
    const updateCVLink = (isEn) => {
        document.querySelectorAll('.cv-link').forEach((link) => {
            const href = link.getAttribute('href');
            if (!href) return;
            if (isEn && !href.includes('-en.pdf')) {
                link.setAttribute('href', href.replace('.pdf', '-en.pdf'));
            } else if (!isEn && href.includes('-en.pdf')) {
                link.setAttribute('href', href.replace('-en.pdf', '.pdf'));
            }
        });
    };

    const syncLanguage = (isEn) => {
        document.body.classList.toggle('english-mode', isEn);
        document.documentElement.setAttribute('lang', isEn ? 'en' : 'it');
        localStorage.setItem('language', isEn ? 'en' : 'it');
        updateCVLink(isEn);
        startTyping(isEn);

        const srTitle = document.getElementById('sr-title');
        if (srTitle) {
            srTitle.textContent = isEn
                ? 'Software Developer & Digital Solutions'
                : 'Sviluppatore Software & Soluzioni Digitali';
        }
    };

    const isEnInit = localStorage.getItem('language') === 'en';
    if (langToggle) langToggle.checked = isEnInit;
    syncLanguage(isEnInit);

    langToggle?.addEventListener('change', () => {
        syncLanguage(langToggle.checked);
    });

    /* ---------------------------------------------------------------------- */
    /*  08. THEME MANAGEMENT (DARK / LIGHT)                                   */
    /* ---------------------------------------------------------------------- */
    const isLightInit = localStorage.getItem('theme') === 'light';
    if (isLightInit) {
        document.body.classList.add('light-mode');
        themeIcon?.classList.replace('fa-moon', 'fa-sun');
    }
    initParticles(isLightInit);

    themeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        themeIcon?.classList.replace(isLight ? 'fa-moon' : 'fa-sun', isLight ? 'fa-sun' : 'fa-moon');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        initParticles(isLight);
    });

    /* ---------------------------------------------------------------------- */
    /*  09. MOBILE NAVIGATION DRAWER                                          */
    /* ---------------------------------------------------------------------- */
    const closeMobileMenu = () => {
        if (!navMenu?.classList.contains('active')) return;
        navMenu.classList.remove('active');
        menuToggle?.setAttribute('aria-expanded', 'false');
        const icon = menuToggle?.querySelector('i');
        icon?.classList.replace('fa-xmark', 'fa-bars');
    };

    menuToggle?.addEventListener('click', () => {
        const isActive = navMenu?.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', String(Boolean(isActive)));
        const icon = menuToggle.querySelector('i');
        icon?.classList.toggle('fa-bars');
        icon?.classList.toggle('fa-xmark');
    });

    navMenu?.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMobileMenu);
    });

    /* ---------------------------------------------------------------------- */
    /*  10. PROJECT CATEGORY FILTER & CLIPBOARD TOAST                         */
    /* ---------------------------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-item');

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            projectCards.forEach((card) => {
                const categories = card.getAttribute('data-category') || '';
                const matches = filter === 'all' || categories.includes(filter);
                card.style.display = matches ? '' : 'none';
            });
        });
    });

    // Quick-copy email button with floating toast
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        document.body.appendChild(toast);

        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-email') || 'lorenzo.sanvito.dev@gmail.com';
            navigator.clipboard?.writeText(email);
            const isEn = document.body.classList.contains('english-mode');
            toast.textContent = isEn ? '✓ Email copied to clipboard!' : '✓ Email copiata negli appunti!';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2600);
        });
    }

    /* ---------------------------------------------------------------------- */
    /*  11. INTERSECTION OBSERVER (SCROLL REVEAL)                             */
    /* ---------------------------------------------------------------------- */
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .text-reveal').forEach((el) => observer.observe(el));
});