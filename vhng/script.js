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
    '.value-card, .audience-card, .rarity-card, .interpretation-card, .specs-list li'
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
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Form handling
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Show success state
        const button = form.querySelector('.submit-button');
        const originalHTML = button.innerHTML;

        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Inquiry Sent!</span>
        `;
        button.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

        // Reset after 3 seconds
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
            form.reset();
        }, 3000);

        // Log submission (in production, this would send to a server)
        console.log('Form submitted:', data);
    });
}

// Letter hover effect
const letters = document.querySelectorAll('.domain-name .letter');
letters.forEach(letter => {
    letter.addEventListener('mouseenter', () => {
        letter.style.transform = 'translateY(-15px) scale(1.1)';
    });
    letter.addEventListener('mouseleave', () => {
        letter.style.transform = '';
    });
});

// Add cursor glow effect on hero
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        hero.style.setProperty('--mouse-x', `${x}%`);
        hero.style.setProperty('--mouse-y', `${y}%`);
    });
}

// Counter animation for rarity numbers
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    };

    requestAnimationFrame(updateCounter);
};

// Trigger counter animation when rarity section is visible
const raritySection = document.querySelector('.rarity-section');
if (raritySection) {
    const rarityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const firstNumber = document.querySelector('.rarity-card:first-child .rarity-number');
                if (firstNumber && firstNumber.textContent === '456,976') {
                    // Temporarily set to 0 and animate
                    firstNumber.textContent = '0';
                    animateCounter(firstNumber, 456976, 2500);
                }
                rarityObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    rarityObserver.observe(raritySection);
}

// Typing effect for interpretation words
const interpretationCards = document.querySelectorAll('.interpretation-card');
interpretationCards.forEach(card => {
    const words = card.querySelectorAll('.interpretation-words span');

    card.addEventListener('mouseenter', () => {
        words.forEach((word, index) => {
            word.style.transition = 'all 0.3s ease';
            word.style.transitionDelay = `${index * 0.05}s`;
            word.style.color = '#fff';
            word.style.transform = 'translateX(5px)';
        });
    });

    card.addEventListener('mouseleave', () => {
        words.forEach((word) => {
            word.style.color = '';
            word.style.transform = '';
        });
    });
});
