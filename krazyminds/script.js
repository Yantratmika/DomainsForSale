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
document.querySelectorAll('.value-card, .audience-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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

// Stagger animations for grid items
document.querySelectorAll('.value-grid, .audience-grid, .stats-grid').forEach(grid => {
    const items = grid.querySelectorAll('.value-card, .audience-card, .stat-item');
    items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Form handling
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Create mailto link with form data
        const subject = encodeURIComponent('Inquiry for KrazyMinds.com');
        const body = encodeURIComponent(
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n` +
            `Offer: ${data.offer || 'Not specified'}\n\n` +
            `Message:\n${data.message || 'No message provided'}`
        );

        // Show success message
        const button = form.querySelector('.submit-button');
        const originalText = button.textContent;
        button.textContent = 'Thank you!';
        button.style.background = 'linear-gradient(135deg, #4ecdc4, #44a08d)';

        // Reset after 3 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            form.reset();
        }, 3000);

        // Log submission (in production, this would send to a server)
        console.log('Form submitted:', data);
    });
}

// Parallax effect on hero (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add typing effect to tagline (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        setTimeout(() => {
            typeWriter(tagline, text, 40);
        }, 800);
    }
});
