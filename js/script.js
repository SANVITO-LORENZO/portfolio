document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // ==========================================
    // 1. TYPEWRITER EFFECT (Effetto Macchina da Scrivere)
    // ==========================================
    const typewriterEl = document.getElementById('typewriter-element');
    let typingTimeout;

    const startTyping = (isEn) => {
        if (!typewriterEl) return;
        clearTimeout(typingTimeout);
        typewriterEl.textContent = ''; 
        
        const textToType = isEn 
            ? "Software Developer & Digital Solutions" 
            : "Sviluppatore Software & Soluzioni Digitali";
        
        let i = 0;
        const type = () => {
            if (i < textToType.length) {
                typewriterEl.textContent += textToType.charAt(i);
                i++;
                typingTimeout = setTimeout(type, 50); 
            }
        };
        setTimeout(type, 300); 
    };

    // ==========================================
    // 2. PAGE TRANSITION (Tendina Blu Iniziale)
    // ==========================================
    const transitionEl = document.querySelector('.page-transition');
    if (transitionEl) {
        setTimeout(() => {
            transitionEl.classList.add('is-active');
        }, 100); 
    }

    // ==========================================
    // 3. SCROLL PROGRESS BAR (Neon)
    // ==========================================
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // ==========================================
    // 4. GLOW EFFECT SULLE CARD (Effetto Torcia)
    // ==========================================
    const handleGlow = (e, card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    document.querySelectorAll('.glow-card, .sidebar-box').forEach(card => {
        card.addEventListener('mousemove', (e) => handleGlow(e, card));
    });

    // ==========================================
    // 5. CUSTOM CURSOR (Smart Touch Detection)
    // ==========================================
    const cursor = document.querySelector('.custom-cursor');
    
    if (cursor) {
        let isUsingTouch = false;

        document.addEventListener('touchstart', () => {
            isUsingTouch = true;
            cursor.style.display = 'none'; 
        });

        document.addEventListener('mousemove', (e) => {
            if (isUsingTouch) return; 
            
            cursor.style.display = 'block';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        document.querySelectorAll('a, button, .glow-card').forEach(link => {
            link.addEventListener('mouseenter', () => {
                if (!isUsingTouch) cursor.classList.add('hover');
            });
            link.addEventListener('mouseleave', () => {
                if (!isUsingTouch) cursor.classList.remove('hover');
            });
        });

        document.addEventListener('mouseout', () => {
            if (!isUsingTouch) cursor.style.display = 'none';
        });
    }

    // ==========================================
    // 6. PARTICLES.JS (Solo nella Home)
    // ==========================================
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#0ea5e9" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#0ea5e9", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 2 }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" } },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } } }
            },
            "retina_detect": true
        });
    }

    // ==========================================
    // 7. GESTIONE LINGUA E CV
    // ==========================================
    const updateCVLink = (isEn) => {
        document.querySelectorAll('.cv-link').forEach(link => {
            let currentHref = link.getAttribute('href');
            if (!currentHref) return;
            if (isEn && !currentHref.includes('-en.pdf')) {
                link.setAttribute('href', currentHref.replace('.pdf', '-en.pdf'));
            } else if (!isEn && currentHref.includes('-en.pdf')) {
                link.setAttribute('href', currentHref.replace('-en.pdf', '.pdf'));
            }
        });
    };

    const savedLang = localStorage.getItem('language');
    const isEnInit = savedLang === 'en';
    if (isEnInit) {
        document.body.classList.add('english-mode');
        if (langToggle) langToggle.checked = true;
    }
    updateCVLink(isEnInit);
    startTyping(isEnInit); 

    langToggle?.addEventListener('change', () => {
        const isEn = langToggle.checked;
        document.body.classList.toggle('english-mode', isEn);
        localStorage.setItem('language', isEn ? 'en' : 'it');
        updateCVLink(isEn);
        startTyping(isEn); 
    });

    // ==========================================
    // 8. GESTIONE TEMA
    // ==========================================
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon?.classList.replace('fa-moon', 'fa-sun');
    }
    themeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        themeIcon?.classList.replace(isLight ? 'fa-moon' : 'fa-sun', isLight ? 'fa-sun' : 'fa-moon');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // ==========================================
    // 9. MENU MOBILE
    // ==========================================
    menuToggle?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-xmark');
    });

    // ==========================================
    // 10. ANIMAZIONI REVEAL ALLO SCROLL E TEXT REVEAL
    // ==========================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal, .text-reveal').forEach(el => observer.observe(el));
});