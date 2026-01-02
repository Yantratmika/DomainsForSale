// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
    '.value-card, .audience-card, .name-card, .stat-item'
);

animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    el.style.transitionDelay = `${(index % 6) * 0.1}s`;
    observer.observe(el);
});

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Parallax effect on hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    const stars = document.querySelector('.hero-stars');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }

    if (stars && scrolled < window.innerHeight) {
        stars.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Magic sparkle effect on mouse move in hero
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const sparkle = document.createElement('div');
        sparkle.className = 'magic-sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #fbbf24;
            border-radius: 50%;
            pointer-events: none;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            box-shadow: 0 0 10px #fbbf24, 0 0 20px #fbbf24;
            z-index: 1000;
            animation: sparkleAnim 1s ease-out forwards;
        `;

        heroSection.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    });

    // Add sparkle animation
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkleAnim {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0) translateY(-20px);
            }
        }
    `;
    document.head.appendChild(sparkleStyle);
}

// Form handling
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Show success state with magical effect
        const button = form.querySelector('.submit-button');
        const originalHTML = button.innerHTML;

        button.innerHTML = `
            <span class="btn-icon">&#10003;</span>
            <span>Magic Sent!</span>
        `;
        button.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

        // Add sparkle burst effect
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            const angle = (i / 8) * Math.PI * 2;
            const distance = 50;

            sparkle.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: #fbbf24;
                border-radius: 50%;
                pointer-events: none;
                left: 50%;
                top: 50%;
                box-shadow: 0 0 10px #fbbf24;
                animation: burstSparkle 0.6s ease-out forwards;
                --tx: ${Math.cos(angle) * distance}px;
                --ty: ${Math.sin(angle) * distance}px;
            `;

            button.style.position = 'relative';
            button.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 600);
        }

        // Add burst animation
        if (!document.querySelector('#burst-style')) {
            const burstStyle = document.createElement('style');
            burstStyle.id = 'burst-style';
            burstStyle.textContent = `
                @keyframes burstSparkle {
                    0% {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);
                    }
                }
            `;
            document.head.appendChild(burstStyle);
        }

        // Reset after 3 seconds
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
            form.reset();
        }, 3000);

        console.log('Form submitted:', data);
    });
}

// Orb glow effect on scroll
const orb = document.querySelector('.magic-orb');
if (orb) {
    const orbObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                orb.classList.add('orb-active');
            }
        });
    }, { threshold: 0.5 });

    orbObserver.observe(orb);

    // Add orb active styles
    const orbStyle = document.createElement('style');
    orbStyle.textContent = `
        .magic-orb.orb-active .orb-inner {
            animation: orbPulse 3s ease-in-out infinite;
        }

        @keyframes orbPulse {
            0%, 100% {
                box-shadow:
                    0 0 60px rgba(147, 51, 234, 0.4),
                    inset 0 0 40px rgba(251, 191, 36, 0.1);
            }
            50% {
                box-shadow:
                    0 0 80px rgba(147, 51, 234, 0.6),
                    0 0 120px rgba(251, 191, 36, 0.3),
                    inset 0 0 60px rgba(251, 191, 36, 0.2);
            }
        }
    `;
    document.head.appendChild(orbStyle);
}

// Wiz text shimmer effect
const wizText = document.querySelector('.wiz');
if (wizText) {
    setInterval(() => {
        wizText.style.filter = 'brightness(1.3)';
        setTimeout(() => {
            wizText.style.filter = '';
        }, 200);
    }, 3000);
}

// Value card number animation
const valueCards = document.querySelectorAll('.value-card');
valueCards.forEach(card => {
    const number = card.querySelector('.value-number');
    if (number) {
        card.addEventListener('mouseenter', () => {
            number.style.transform = 'scale(1.1)';
            number.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            number.style.transform = '';
        });
    }
});

// Stats counter animation
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValues = entry.target.querySelectorAll('.stat-value');
                statValues.forEach(stat => {
                    stat.style.animation = 'countUp 0.8s ease-out forwards';
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);

    // Add count animation
    const countStyle = document.createElement('style');
    countStyle.textContent = `
        @keyframes countUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(countStyle);
}
