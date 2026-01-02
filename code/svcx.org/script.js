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
    '.value-card, .audience-card, .meaning-card, .stat-item, .tech-list li'
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
    const grid = document.querySelector('.hero-grid-bg');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }

    if (grid && scrolled < window.innerHeight) {
        grid.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Letter hover effect
const letters = document.querySelectorAll('.domain-name .letter');
letters.forEach((letter, index) => {
    letter.addEventListener('mouseenter', () => {
        letter.style.transform = 'translateY(-10px) scale(1.1)';
        letter.style.transition = 'transform 0.3s ease';
    });
    letter.addEventListener('mouseleave', () => {
        letter.style.transform = '';
    });
});

// Tag hover effect
const tags = document.querySelectorAll('.tag');
tags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tags.forEach(t => {
            if (t !== tag) {
                t.style.opacity = '0.5';
            }
        });
    });
    tag.addEventListener('mouseleave', () => {
        tags.forEach(t => {
            t.style.opacity = '';
        });
    });
});

// Domain card glow effect
const domainCard = document.querySelector('.domain-card');
if (domainCard) {
    domainCard.addEventListener('mousemove', (e) => {
        const rect = domainCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        domainCard.style.background = `
            radial-gradient(
                circle at ${x}px ${y}px,
                rgba(16, 185, 129, 0.15) 0%,
                transparent 50%
            ),
            linear-gradient(135deg, #0f172a 0%, #1e293b 100%)
        `;
    });

    domainCard.addEventListener('mouseleave', () => {
        domainCard.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
    });
}

// Stats counter animation
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItems = entry.target.querySelectorAll('.stat-item');
                statItems.forEach((item, index) => {
                    item.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
}

// Meaning card letter animation
const meaningLetters = document.querySelector('.meaning-letters');
if (meaningLetters) {
    const spans = meaningLetters.querySelectorAll('span');
    spans.forEach((span, index) => {
        span.style.animationDelay = `${index * 0.1}s`;
    });

    const meaningObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                spans.forEach((span, index) => {
                    span.style.animation = `letterBounce 0.5s ease-out ${index * 0.1}s forwards`;
                });
                meaningObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    meaningObserver.observe(meaningLetters);

    // Add letter bounce animation
    const bounceStyle = document.createElement('style');
    bounceStyle.textContent = `
        @keyframes letterBounce {
            0% {
                opacity: 0;
                transform: translateY(-20px);
            }
            60% {
                transform: translateY(5px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(bounceStyle);
}

// Grid background animation on scroll
const heroGridBg = document.querySelector('.hero-grid-bg');
if (heroGridBg) {
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.pageYOffset;
        const direction = currentScrollY > lastScrollY ? 1 : -1;

        if (currentScrollY < window.innerHeight) {
            heroGridBg.style.backgroundPosition = `${direction * currentScrollY * 0.1}px ${currentScrollY * 0.1}px`;
        }

        lastScrollY = currentScrollY;
    });
}

// Value card icon animation
const valueCards = document.querySelectorAll('.value-card');
valueCards.forEach(card => {
    const icon = card.querySelector('.value-icon');
    if (icon) {
        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            icon.style.transform = '';
        });
    }
});

// Add fadeInUp animation for stats
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeInUp {
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
document.head.appendChild(fadeStyle);

// Console branding
console.log('%cSVCX.org', 'font-size: 24px; font-weight: bold; color: #10b981;');
console.log('%cPremium 4-Letter Domain For Sale', 'font-size: 12px; color: #64748b;');
