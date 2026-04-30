document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // FUNZIONE PER CAMBIARE IL FILE DEL CV
    const updateCVLink = (isEn) => {
        document.querySelectorAll('.cv-link').forEach(link => {
            let currentHref = link.getAttribute('href');
            if (!currentHref) return; // Sicurezza extra
            
            if (isEn && !currentHref.includes('-en.pdf')) {
                // Aggiunge "-en" prima di ".pdf"
                link.setAttribute('href', currentHref.replace('.pdf', '-en.pdf'));
            } else if (!isEn && currentHref.includes('-en.pdf')) {
                // Rimuove "-en" per tornare all'italiano
                link.setAttribute('href', currentHref.replace('-en.pdf', '.pdf'));
            }
        });
    };

    // 1. GESTIONE LINGUA
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'en') {
        document.body.classList.add('english-mode');
        if (langToggle) langToggle.checked = true;
        updateCVLink(true); // Aggiorna il CV all'avvio se era inglese
    } else {
        updateCVLink(false); // Assicura che all'avvio sia in italiano
    }

    langToggle?.addEventListener('change', () => {
        const isEn = langToggle.checked;
        document.body.classList.toggle('english-mode', isEn);
        localStorage.setItem('language', isEn ? 'en' : 'it');
        updateCVLink(isEn); // Aggiorna il CV al click
    });

    // 2. GESTIONE TEMA
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

    // 3. MENU MOBILE
    menuToggle?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-xmark');
    });

    // 4. ANIMAZIONI ALLO SCROLL
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
