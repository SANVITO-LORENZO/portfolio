/* ==========================================================================
   LORENZO SANVITO — 3D WEBGL PORTFOLIO ENGINE (MOBILE-CALIBRATED v8.1)
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
        "%c⚡ LORENZO SANVITO | 3D WEBGL PORTFOLIO %c\nProtected intellectual property. Crafting clean software @ Milano-Bicocca.",
        "color: #0ea5e9; font-size: 16px; font-weight: 800;",
        "color: #94a3b8; font-size: 12px;"
    );

    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('dragstart', (e) => e.preventDefault());
    document.addEventListener('keydown', (e) => {
        const key = (e.key || '').toLowerCase();
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(key)) ||
            (e.ctrlKey && ['u', 's'].includes(key))
        ) {
            e.preventDefault();
            return false;
        }
    });

    /* ---------------------------------------------------------------------- */
    /*  02. THREE.JS 3D WEBGL ENGINE (MOBILE-OPTIMIZED POSITIONING)           */
    /* ---------------------------------------------------------------------- */
    let webglController = null;

    const initWebGLEngine = () => {
        if (typeof THREE === 'undefined') return null;

        let canvas = document.getElementById('webgl-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'webgl-canvas';
            canvas.setAttribute('aria-hidden', 'true');
            document.body.prepend(canvas);
        }

        const isProjectPage = Boolean(document.querySelector('.project-detail'));
        const isHomePage = !isProjectPage;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x04060a, isProjectPage ? 0.085 : 0.065);

        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0.2, 5.4);

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: window.devicePixelRatio < 2,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // 02.A: Main Cyber-Core Group (Elevated on Mobile so it sits above the title)
        const coreGroup = new THREE.Group();
        const isDesktop = window.innerWidth > 960;
        coreGroup.position.set(isDesktop ? 2.15 : 0, isDesktop ? 0.25 : 1.35, 0);
        coreGroup.visible = isHomePage;
        scene.add(coreGroup);

        const geometries = [
            new THREE.IcosahedronGeometry(1.18, 1),
            new THREE.TorusKnotGeometry(0.78, 0.23, 100, 16),
            new THREE.OctahedronGeometry(1.26, 2),
            new THREE.DodecahedronGeometry(1.16, 1)
        ];

        // Cohesive Cool-Tech Spectrums (Cyan, Royal Blue, Indigo) that never clash with text
        const sectionSpectrums = [
            { primary: 0x0ea5e9, secondary: 0x3b82f6, core: 0x1e3a8a },
            { primary: 0x38bdf8, secondary: 0x6366f1, core: 0x1e40af },
            { primary: 0x6366f1, secondary: 0x0ea5e9, core: 0x312e81 },
            { primary: 0x06b6d4, secondary: 0x3b82f6, core: 0x155e75 }
        ];

        let activeStageIndex = 0;
        let isHoveringCard = false;

        const wireMaterial = new THREE.MeshBasicMaterial({
            color: 0x0ea5e9,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });

        const innerSolidMaterial = new THREE.MeshStandardMaterial({
            color: 0x1e3a8a,
            emissive: 0x0ea5e9,
            emissiveIntensity: 0.4,
            roughness: 0.15,
            metalness: 0.88,
            flatShading: true,
            transparent: true,
            opacity: 0.9
        });

        const wireMesh = new THREE.Mesh(geometries[0], wireMaterial);
        const innerMesh = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.74, 0),
            innerSolidMaterial
        );
        coreGroup.add(wireMesh, innerMesh);

        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.38
        });
        const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.68, 0.012, 16, 100), ringMat);
        const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.98, 0.009, 16, 100), ringMat);
        const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.28, 0.006, 16, 100), ringMat);
        ring1.rotation.x = Math.PI / 3;
        ring2.rotation.y = Math.PI / 4;
        ring3.rotation.z = Math.PI / 6;
        coreGroup.add(ring1, ring2, ring3);

        // 02.B: Peripheral 3D Shards
        const shardsGroup = new THREE.Group();
        scene.add(shardsGroup);
        const shardGeo = new THREE.OctahedronGeometry(0.11, 0);
        const shardMat = new THREE.MeshStandardMaterial({
            color: 0x38bdf8,
            wireframe: true,
            transparent: true,
            opacity: isProjectPage ? 0.18 : 0.35
        });

        const shards = [];
        const shardCount = window.innerWidth < 768 ? 6 : isProjectPage ? 10 : 16;
        for (let i = 0; i < shardCount; i++) {
            const mesh = new THREE.Mesh(shardGeo, shardMat);
            const angle = (i / shardCount) * Math.PI * 2;
            const minRadius = isProjectPage ? 4.8 : 3.6;
            const radius = minRadius + Math.random() * 4.0;
            mesh.position.set(
                Math.cos(angle) * radius,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 5 - 2.0
            );
            mesh.scale.setScalar(0.5 + Math.random() * 1.2);
            shardsGroup.add(mesh);
            shards.push({
                mesh,
                rotSpeedX: (Math.random() - 0.5) * 0.015,
                rotSpeedY: (Math.random() - 0.5) * 0.015,
                floatOffset: Math.random() * Math.PI * 2
            });
        }

        // 02.C: Undulating 3D Cyber-Terrain
        const planeGeo = new THREE.PlaneGeometry(28, 18, 32, 20);
        const planeMat = new THREE.MeshBasicMaterial({
            color: 0x0ea5e9,
            wireframe: true,
            transparent: true,
            opacity: isProjectPage ? 0.05 : 0.11
        });
        const terrainMesh = new THREE.Mesh(planeGeo, planeMat);
        terrainMesh.rotation.x = -Math.PI / 2.15;
        terrainMesh.position.set(0, isProjectPage ? -3.6 : -2.95, -2.5);
        scene.add(terrainMesh);

        const planePosAttr = planeGeo.attributes.position;
        const baseVertices = new Float32Array(planePosAttr.array.length);
        baseVertices.set(planePosAttr.array);

        // 02.D: Soft 3D Starfield
        const particleCount = window.innerWidth < 768 ? 420 : isProjectPage ? 700 : 1200;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 24;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 26;
        }
        const particlesGeo = new THREE.BufferGeometry();
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMat = new THREE.PointsMaterial({
            color: 0x38bdf8,
            size: isProjectPage ? 0.028 : 0.034,
            transparent: true,
            opacity: isProjectPage ? 0.4 : 0.6
        });
        const starField = new THREE.Points(particlesGeo, particlesMat);
        scene.add(starField);

        // 02.E: Dynamic Point Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
        const pointLight1 = new THREE.PointLight(0x0ea5e9, 2.6, 20);
        pointLight1.position.set(4, 4, 4);
        const pointLight2 = new THREE.PointLight(0x3b82f6, 1.8, 20);
        pointLight2.position.set(-4, -3, 2);
        scene.add(ambientLight, pointLight1, pointLight2);

        const applyColorHex = (primaryHex, secondaryHex = 0x3b82f6, coreHex = null) => {
            wireMaterial.color.setHex(primaryHex);
            innerSolidMaterial.emissive.setHex(primaryHex);
            if (coreHex !== null) innerSolidMaterial.color.setHex(coreHex);
            ringMat.color.setHex(secondaryHex);
            planeMat.color.setHex(primaryHex);
            particlesMat.color.setHex(primaryHex);
            shardMat.color.setHex(primaryHex);
            pointLight1.color.setHex(primaryHex);
        };

        if (isProjectPage) {
            const path = window.location.pathname.toLowerCase();
            if (path.includes('ringsync')) applyColorHex(0xec4899, 0x8b5cf6);
            else if (path.includes('water-bot')) applyColorHex(0x0ea5e9, 0x3b82f6);
            else if (path.includes('oltre')) applyColorHex(0x10b981, 0x0ea5e9);
            else if (path.includes('word-swipe')) applyColorHex(0x38bdf8, 0x3b82f6);
        }

        let targetMouseX = 0;
        let targetMouseY = 0;
        let smoothMouseX = 0;
        let smoothMouseY = 0;
        let scrollProgress = 0;
        let pulseBoost = 0;

        window.addEventListener('mousemove', (e) => {
            targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
        }, { passive: true });

        const updateScrollChoreography = () => {
            const maxScroll = Math.max(
                1,
                document.documentElement.scrollHeight - window.innerHeight
            );
            scrollProgress = (window.scrollY || window.pageYOffset) / maxScroll;

            if (!isHomePage) return;

            const newStage = Math.min(
                geometries.length - 1,
                Math.floor(scrollProgress * geometries.length)
            );

            if (newStage !== activeStageIndex) {
                activeStageIndex = newStage;
                wireMesh.geometry = geometries[activeStageIndex];
                pulseBoost = 0.85;

                if (!isHoveringCard) {
                    const spec = sectionSpectrums[activeStageIndex];
                    applyColorHex(spec.primary, spec.secondary, spec.core);
                }
            }
        };
        window.addEventListener('scroll', updateScrollChoreography, { passive: true });
        updateScrollChoreography();

        document.getElementById('hero-3d-trigger')?.addEventListener('click', () => {
            if (!isHomePage) return;
            activeStageIndex = (activeStageIndex + 1) % geometries.length;
            wireMesh.geometry = geometries[activeStageIndex];
            const spec = sectionSpectrums[activeStageIndex];
            applyColorHex(spec.primary, spec.secondary, spec.core);
            pulseBoost = 1.25;
        });

        // Desktop-only hover color sync on project cards
        document.querySelectorAll('[data-3d-color]').forEach((card) => {
            card.addEventListener('mouseenter', () => {
                if (window.innerWidth <= 960) return;
                const hex = Number(card.getAttribute('data-3d-color'));
                if (!Number.isNaN(hex)) {
                    isHoveringCard = true;
                    applyColorHex(hex, hex);
                    pulseBoost = 0.5;
                }
            });
            card.addEventListener('mouseleave', () => {
                if (window.innerWidth <= 960) return;
                isHoveringCard = false;
                const spec = sectionSpectrums[activeStageIndex];
                applyColorHex(spec.primary, spec.secondary, spec.core);
            });
        });

        const setThemePalette = (isLight) => {
            scene.fog.color.setHex(isLight ? 0xf1f5f9 : 0x04060a);
            planeMat.opacity = isProjectPage
                ? (isLight ? 0.04 : 0.05)
                : (isLight ? 0.07 : 0.11);
        };

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // 60FPS Render Loop
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();

            smoothMouseX += (targetMouseX - smoothMouseX) * 0.06;
            smoothMouseY += (targetMouseY - smoothMouseY) * 0.06;
            pulseBoost += (0 - pulseBoost) * 0.06;

            const speedMult = 1 + pulseBoost * 4.0;

            if (isHomePage) {
                const wideScreen = window.innerWidth > 960;

                wireMesh.rotation.y += 0.005 * speedMult;
                wireMesh.rotation.x += 0.003 * speedMult;
                innerMesh.rotation.y -= 0.008 * speedMult;

                ring1.rotation.z = elapsed * 0.4 + scrollProgress * Math.PI;
                ring2.rotation.x = elapsed * 0.3 - scrollProgress * Math.PI;
                ring3.rotation.y = elapsed * 0.22 + smoothMouseX * 0.5;

                // Dim & push back the 3D Core when scrolling over text sections
                const inReadingZone = scrollProgress > 0.12;
                const isLight = document.body.classList.contains('light-mode');
                const targetWireOpacity = inReadingZone
                    ? (isLight ? 0.12 : 0.16)
                    : (isLight ? 0.4 : 0.58);
                const targetInnerOpacity = inReadingZone ? 0.22 : 0.88;
                const targetRingOpacity = inReadingZone ? 0.08 : 0.36;
                const targetZ = inReadingZone ? -2.4 : 0;

                wireMaterial.opacity += (targetWireOpacity - wireMaterial.opacity) * 0.06;
                innerSolidMaterial.opacity += (targetInnerOpacity - innerSolidMaterial.opacity) * 0.06;
                ringMat.opacity += (targetRingOpacity - ringMat.opacity) * 0.06;
                coreGroup.position.z += (targetZ - coreGroup.position.z) * 0.05;

                // Compact scale on mobile (0.64) so it fits cleanly above the status pill
                const baseScale = wideScreen ? 1.0 : 0.64;
                const scaleWave = baseScale + Math.sin(elapsed * 2.2) * 0.03 + pulseBoost * 0.2;
                coreGroup.scale.setScalar(scaleWave);

                const targetGroupX = wideScreen
                    ? Math.cos(scrollProgress * Math.PI * 1.5) * 2.35
                    : 0;
                // On mobile, keep the sphere in the upper slot (y = 1.38) in the Hero
                const targetGroupY = wideScreen
                    ? 0.25 + Math.sin(scrollProgress * Math.PI * 2) * 0.35
                    : 1.38 - scrollProgress * 1.1;

                coreGroup.position.x += (targetGroupX + smoothMouseX * 0.35 - coreGroup.position.x) * 0.05;
                coreGroup.position.y += (targetGroupY + smoothMouseY * 0.35 - coreGroup.position.y) * 0.05;
            }

            // Animate 3D Terrain Wave Vertices
            const arr = planePosAttr.array;
            const waveAmp = isProjectPage ? 0.14 : 0.24;
            for (let i = 0; i < arr.length; i += 3) {
                const vx = baseVertices[i];
                const vy = baseVertices[i + 1];
                arr[i + 2] =
                    Math.sin(vx * 0.45 + elapsed * 1.2) * waveAmp +
                    Math.cos(vy * 0.45 + elapsed * 0.9) * waveAmp;
            }
            planePosAttr.needsUpdate = true;

            shards.forEach((s) => {
                s.mesh.rotation.x += s.rotSpeedX * speedMult;
                s.mesh.rotation.y += s.rotSpeedY * speedMult;
                s.mesh.position.y += Math.sin(elapsed * 1.4 + s.floatOffset) * 0.0025;
            });
            shardsGroup.rotation.y = smoothMouseX * 0.1;
            shardsGroup.rotation.x = -smoothMouseY * 0.06;

            starField.rotation.y = elapsed * 0.02 + smoothMouseX * 0.1;
            starField.rotation.x = smoothMouseY * 0.1;
            starField.position.z = (scrollProgress * 7) % 6;

            camera.position.z = 5.4 - scrollProgress * 0.9;
            renderer.render(scene, camera);
        };
        animate();

        return { setThemePalette };
    };

    if (typeof THREE !== 'undefined') {
        webglController = initWebGLEngine();
    } else {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = () => {
            webglController = initWebGLEngine();
            webglController?.setThemePalette(document.body.classList.contains('light-mode'));
        };
        document.head.appendChild(script);
    }

    /* ---------------------------------------------------------------------- */
    /*  03. HIGH-CONTRAST DUAL CURSOR (AUTO-INJECTED & FAIL-SAFE)             */
    /* ---------------------------------------------------------------------- */
    let cursorRing = document.querySelector('.custom-cursor');
    if (!cursorRing) {
        cursorRing = document.createElement('div');
        cursorRing.className = 'custom-cursor';
        document.body.appendChild(cursorRing);
    }

    let cursorDot = document.querySelector('.custom-cursor-dot');
    if (!cursorDot) {
        cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';
        document.body.appendChild(cursorDot);
    }

    let isTouch = false;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('touchstart', () => {
        isTouch = true;
        document.body.classList.remove('cursor-ready');
        cursorRing.style.display = 'none';
        cursorDot.style.display = 'none';
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
        if (isTouch) return;
        document.body.classList.add('cursor-ready');
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorRing.style.display = 'block';
        cursorDot.style.display = 'block';
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    }, { passive: true });

    window.addEventListener('mousedown', () => {
        if (!isTouch) cursorRing.classList.add('clicking');
    });
    window.addEventListener('mouseup', () => {
        if (!isTouch) cursorRing.classList.remove('clicking');
    });

    const renderCursor = () => {
        if (!isTouch) {
            ringX += (mouseX - ringX) * 0.24;
            ringY += (mouseY - ringY) * 0.24;
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
        }
        requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    document.querySelectorAll('a, button, .glow-card, .switch, #hero-3d-trigger').forEach((el) => {
        el.addEventListener('mouseenter', () => {
            if (!isTouch) cursorRing.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            if (!isTouch) cursorRing.classList.remove('hover');
        });
    });

    /* ---------------------------------------------------------------------- */
    /*  04. TYPEWRITER ENGINE                                                 */
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
    /*  05. PAGE TRANSITION & RAF SCROLL PROGRESS                             */
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
    /*  06. RADIAL SPOTLIGHT & MAGNETIC HOVER                                 */
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
    /*  08. THEME MANAGEMENT (DARK / LIGHT + 3D SHADER SYNC)                  */
    /* ---------------------------------------------------------------------- */
    const isLightInit = localStorage.getItem('theme') === 'light';
    if (isLightInit) {
        document.body.classList.add('light-mode');
        themeIcon?.classList.replace('fa-moon', 'fa-sun');
    }
    webglController?.setThemePalette(isLightInit);

    themeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        themeIcon?.classList.replace(isLight ? 'fa-moon' : 'fa-sun', isLight ? 'fa-sun' : 'fa-moon');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        webglController?.setThemePalette(isLight);
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
    /*  10. PROJECT FILTER & CLIPBOARD TOAST                                  */
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