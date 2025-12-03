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
    '.value-card, .audience-card, .name-card, .menu-item'
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

// Plate rotation effect
const plate = document.querySelector('.plate');
if (plate) {
    const plateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                plate.style.animation = 'plateAppear 1s ease-out forwards';
                plateObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    plateObserver.observe(plate);

    // Add plate animation
    const plateStyle = document.createElement('style');
    plateStyle.textContent = `
        @keyframes plateAppear {
            0% {
                opacity: 0;
                transform: scale(0.8) rotate(-10deg);
            }
            100% {
                opacity: 1;
                transform: scale(1) rotate(0deg);
            }
        }
    `;
    document.head.appendChild(plateStyle);

    // Subtle hover rotation
    plate.addEventListener('mouseenter', () => {
        plate.style.transition = 'transform 0.5s ease';
        plate.style.transform = 'rotate(5deg) scale(1.02)';
    });

    plate.addEventListener('mouseleave', () => {
        plate.style.transform = 'rotate(0deg) scale(1)';
    });
}

// Menu card animation
const menuCard = document.querySelector('.menu-card');
if (menuCard) {
    const menuObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                menuCard.style.animation = 'menuSlide 0.8s ease-out forwards';
                menuObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    menuObserver.observe(menuCard);

    const menuStyle = document.createElement('style');
    menuStyle.textContent = `
        @keyframes menuSlide {
            0% {
                opacity: 0;
                transform: translateY(40px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(menuStyle);
}

// Menu items typewriter effect
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.15}s`;
});

// Name card icons float effect
const nameIcons = document.querySelectorAll('.name-icon');
nameIcons.forEach((icon, index) => {
    icon.style.animation = `iconFloat 3s ease-in-out ${index * 0.5}s infinite`;
});

const iconStyle = document.createElement('style');
iconStyle.textContent = `
    @keyframes iconFloat {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-8px);
        }
    }
`;
document.head.appendChild(iconStyle);

// Value number animation
const valueCards = document.querySelectorAll('.value-card');
valueCards.forEach(card => {
    const number = card.querySelector('.value-number');
    if (number) {
        card.addEventListener('mouseenter', () => {
            number.style.transform = 'scale(1.15)';
            number.style.transition = 'transform 0.3s ease';
            number.style.opacity = '1';
        });
        card.addEventListener('mouseleave', () => {
            number.style.transform = 'scale(1)';
            number.style.opacity = '0.7';
        });
    }
});

// Rukky text shimmer effect
const rukkyText = document.querySelector('.rukky');
if (rukkyText) {
    setInterval(() => {
        rukkyText.style.filter = 'brightness(1.3)';
        setTimeout(() => {
            rukkyText.style.filter = '';
            rukkyText.style.transition = 'filter 0.3s ease';
        }, 200);
    }, 4000);
}

// CTA button ripple effect
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Scroll-triggered ornament animation
const ornaments = document.querySelectorAll('.menu-ornament, .footer-ornament');
ornaments.forEach(ornament => {
    const ornamentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                ornament.style.animation = 'ornamentSpin 1s ease-out forwards';
            }
        });
    }, { threshold: 0.5 });

    ornamentObserver.observe(ornament);
});

const ornamentStyle = document.createElement('style');
ornamentStyle.textContent = `
    @keyframes ornamentSpin {
        0% {
            opacity: 0;
            transform: rotate(-180deg);
        }
        100% {
            opacity: 1;
            transform: rotate(0deg);
        }
    }
`;
document.head.appendChild(ornamentStyle);

// Console branding
console.log('%cRukkyRestaurant.com', 'font-family: Georgia, serif; font-size: 24px; font-weight: bold; color: #c19a6b;');
console.log('%cPremium Domain For Sale', 'font-size: 12px; color: #666;');
