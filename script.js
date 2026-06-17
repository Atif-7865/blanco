document.addEventListener('DOMContentLoaded', () => {

    // --- LENIS SMOOTH SCROLLING ---
    const lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- Header Scroll Transition Logic ---
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Full Screen Overlay Menu Logic ---
    const menuTrigger = document.getElementById('menu-trigger');
    const navOverlay = document.getElementById('nav-overlay');
    const overlayLinks = document.querySelectorAll('.overlay-link');

    const toggleMenu = () => {
        menuTrigger.classList.toggle('active');
        navOverlay.classList.toggle('open');
        
        if (navOverlay.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    menuTrigger.addEventListener('click', toggleMenu);

    overlayLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navOverlay.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // --- THEME TOGGLE LOGIC (Light / Dark Mode) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('blanco-theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('blanco-theme', newTheme);
        });
    }

    // --- EXACT REACT CURSOR LOGIC (Translated to Vanilla JS) ---
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursorDot = document.getElementById('cursor-dot');
        const cursorRing = document.getElementById('cursor-ring');
        
        let mx = window.innerWidth / 2, my = window.innerHeight / 2;
        let rx = mx, ry = my;
        let raf = 0;

        const onMove = (e) => {
            mx = e.clientX; 
            my = e.clientY;
            
            cursorDot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
            
            const t = e.target;
            const interactive = t.closest("a, button, [data-cursor]");
            const hover = !!interactive;
            const label = interactive ? interactive.getAttribute("data-cursor") : null;
            
            if (hover) {
                const size = label ? '64px' : '40px';
                cursorRing.style.width = size;
                cursorRing.style.height = size;
                cursorRing.style.backgroundColor = 'rgba(222, 161, 147, 0.1)'; 
                cursorRing.textContent = label || '';
            } else {
                cursorRing.style.width = '24px';
                cursorRing.style.height = '24px';
                cursorRing.style.backgroundColor = 'transparent';
                cursorRing.textContent = '';
            }
        };

        const loop = () => {
            rx += (mx - rx) * 0.15;
            ry += (my - ry) * 0.15;
            cursorRing.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
            raf = requestAnimationFrame(loop);
        };

        window.addEventListener("mousemove", onMove);
        raf = requestAnimationFrame(loop);
    }

    // --- GSAP SCROLL ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);

    const heroTimeline = gsap.timeline();
    heroTimeline
        .fromTo('.hero-title', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 })
        .fromTo('.hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, "-=0.8");

    // --- LOGO SCROLL ANIMATION ---
    gsap.to('.blanco-text', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '150px top',
            scrub: 1
        },
        x: 50,
        opacity: 0,
        ease: "none"
    });

    gsap.to('.logo-lines', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '100px top',
            scrub: 1
        },
        opacity: 0,
        ease: "none"
    });

    gsap.to('.b-monogram', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '150px top',
            scrub: 1
        },
        x: 250, /* Move right to center */
        ease: "power1.inOut"
    });

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(element => {
        gsap.fromTo(element, 
            { y: 60, opacity: 0, autoAlpha: 0 }, 
            {
                scrollTrigger: { trigger: element, start: "top 85%", toggleActions: "play none none reverse" },
                y: 0, opacity: 1, autoAlpha: 1, duration: 1.2, ease: "power3.out"
            }
        );
    });

    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach(img => {
        gsap.to(img, {
            scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true },
            y: 50, ease: "none"
        });
    });
});
