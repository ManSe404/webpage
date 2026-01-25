document.documentElement.classList.add('js');

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    const revealItems = document.querySelectorAll('.reveal');
    if (revealItems.length) {
        revealItems.forEach((item, index) => {
            if (!item.style.getPropertyValue('--delay')) {
                const delay = Math.min(index * 0.05, 0.4);
                item.style.setProperty('--delay', `${delay}s`);
            }
        });

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -10% 0px'
            });

            revealItems.forEach(item => observer.observe(item));
        } else {
            revealItems.forEach(item => item.classList.add('is-visible'));
        }
    }

    const countUps = document.querySelectorAll('.count-up');
    if (countUps.length) {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const animateCount = (el) => {
            const target = Number.parseInt(el.dataset.target, 10) || 0;
            const suffix = el.dataset.suffix || '';
            const duration = Number.parseInt(el.dataset.duration, 10) || 2200;

            if (prefersReduced) {
                el.textContent = `${target}${suffix}`;
                return;
            }

            const start = window.performance.now();
            const step = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const value = Math.round(progress * target);
                el.textContent = `${value}${suffix}`;
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    el.textContent = `${target}${suffix}`;
                }
            };

            window.requestAnimationFrame(step);
        };

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCount(entry.target);
                        obs.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.6
            });

            countUps.forEach(item => observer.observe(item));
        } else {
            countUps.forEach(item => animateCount(item));
        }
    }
});
