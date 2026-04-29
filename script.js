document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Number Counter Animation
    const yearsStat = document.getElementById('years-stat');
    if (yearsStat) {
        let countStarted = false;
        const targetNumber = parseInt(yearsStat.getAttribute('data-target'), 10);
        
        const countObserver = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !countStarted) {
                countStarted = true;
                
                // Aguarda a animação do CSS (reveal-up) para começar a contar
                setTimeout(() => {
                    let current = 0;
                    const duration = 2000; // 2 seconds
                    const stepTime = Math.abs(Math.floor(duration / targetNumber));
                    
                    const timer = setInterval(() => {
                        current += 1;
                        yearsStat.textContent = '+' + current;
                        if (current >= targetNumber) {
                            clearInterval(timer);
                        }
                    }, stepTime);
                }, 400); // 400ms delay
            }
        }, { threshold: 0.5 });
        
        countObserver.observe(yearsStat);
    }

    // Drag-to-scroll Marquee
    const marqueeWrapper = document.querySelector('.marquee-wrapper');
    const marquee = document.querySelector('.marquee');

    if (marqueeWrapper && marquee) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let scrollPos = 0;
        let isDragging = false;

        function autoScroll() {
            if (!isDragging) {
                scrollPos += 1;
                if (scrollPos >= marquee.scrollWidth / 2) {
                    scrollPos = 0;
                }
                marqueeWrapper.scrollLeft = scrollPos;
            }
            requestAnimationFrame(autoScroll);
        }

        marqueeWrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            isDragging = true;
            marqueeWrapper.style.cursor = 'grabbing';
            startX = e.pageX - marqueeWrapper.offsetLeft;
            scrollLeft = marqueeWrapper.scrollLeft;
        });

        marqueeWrapper.addEventListener('mouseleave', () => {
            isDown = false;
            isDragging = false;
            marqueeWrapper.style.cursor = 'grab';
        });

        marqueeWrapper.addEventListener('mouseup', () => {
            isDown = false;
            setTimeout(() => isDragging = false, 50);
            marqueeWrapper.style.cursor = 'grab';
        });

        marqueeWrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - marqueeWrapper.offsetLeft;
            const walk = (x - startX) * 2;
            marqueeWrapper.scrollLeft = scrollLeft - walk;
            scrollPos = marqueeWrapper.scrollLeft;
        });

        // Touch events
        marqueeWrapper.addEventListener('touchstart', (e) => {
            isDown = true;
            isDragging = true;
            startX = e.touches[0].pageX - marqueeWrapper.offsetLeft;
            scrollLeft = marqueeWrapper.scrollLeft;
        }, {passive: true});

        marqueeWrapper.addEventListener('touchend', () => {
            isDown = false;
            setTimeout(() => isDragging = false, 50);
        });

        marqueeWrapper.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - marqueeWrapper.offsetLeft;
            const walk = (x - startX) * 2;
            marqueeWrapper.scrollLeft = scrollLeft - walk;
            scrollPos = marqueeWrapper.scrollLeft;
        }, {passive: true});

        requestAnimationFrame(autoScroll);
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('open');
            mobileMenuBtn.classList.toggle('active');
        });

        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
});
