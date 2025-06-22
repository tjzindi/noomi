// Your custom JS here
console.log('Frontend loaded');

// --- Animate on Scroll with Fancy Effects ---
const scrollObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Micro-interaction: bounce in on reveal
            entry.target.animate([
                { transform: 'translateY(40px) scale(0.98)', opacity: 0 },
                { transform: 'translateY(-8px) scale(1.03)', opacity: 1, offset: 0.7 },
                { transform: 'none', opacity: 1 }
            ], {
                duration: 700,
                easing: 'cubic-bezier(.4,2,.6,1)'
            }); // <-- Add missing closing brace here
            scrollAnimationObserver.unobserve(entry.target); // only animate once
        }
}, scrollObserverOptions);

let lastScrollY = window.scrollY;
let navbarHeight = 80; // Default height, will be updated on DOMContentLoaded

document.addEventListener('DOMContentLoaded', () => {
    // Determine actual navbar height for scroll calculations
    const navbarForHeight = document.querySelector('.navbar');
    if (navbarForHeight) {
        navbarHeight = navbarForHeight.offsetHeight;
    }

    // --- Animate Hero Elements on Load with Stagger ---
    const heroElements = [
        document.querySelector('.hero-title'),
        document.querySelector('.hero-subtitle'),
        document.querySelector('.hero-cta')
    ];

    heroElements.forEach((el, i) => {
        if (el) {
            el.style.opacity = '0';
            // Enhanced hero animation: added rotateX and adjusted translateY/scale
            el.style.transform = 'translateY(60px) scale(0.95) rotateX(-20deg)'; // Current hero animation
            setTimeout(() => {
                el.classList.add('animate-in');
            }, 300 + i * 300);
        }

    });

    // --- Animate Logo on Load ---
    const logoImgOnLoad = document.querySelector('.logo-img');
    if (logoImgOnLoad) {
        logoImgOnLoad.style.opacity = '0';
        logoImgOnLoad.style.transform = 'scale(0.9) translateY(-5px)'; // Initial state: slightly smaller and up
        setTimeout(() => {
            logoImgOnLoad.classList.add('animate-in'); // Use existing animate-in class
        }, 150); // Short delay for the animation to kick in
    }

    // --- Observe Sections for Animation ---
    // Select elements with data-scroll-animation attribute for scroll animations
    const animatedScrollElements = document.querySelectorAll('[data-scroll-animation]');
    animatedScrollElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.willChange = 'transform, opacity'; // Add will-change here

        const animationType = el.dataset.scrollAnimation;
        switch (animationType) {
            case 'slide-up':
                el.style.transform = 'translateY(50px) scale(0.95)';
                break;
            case 'slide-from-left': // Element starts to the left, slides right
                el.style.transform = 'translateX(-50px) scale(0.95)';
                break;
            case 'slide-from-right': // Element starts to the right, slides left
                el.style.transform = 'translateX(50px) scale(0.95)';
                break;
            case 'fade-scale':
                el.style.transform = 'scale(0.9)';
                break;
            case 'rotate-in': // New: Element rotates and scales in
                el.style.transform = 'scale(0.8) rotate(-15deg)';
                break;
            case 'zoom-in': // New: Element zooms in from a smaller scale
                el.style.transform = 'scale(0.7)';
                break;
            default: // Default to a simple slide-up
                el.style.transform = 'translateY(40px) scale(0.98)'; // Adjusted default for a bit more subtlety
        }
        scrollAnimationObserver.observe(el);
    });

    // Micro-interaction: nav-cta pulse on hover
    document.querySelectorAll('.nav-cta, .hero-cta, .contact-cta').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.07)' },
                { transform: 'scale(1)' }
            ], {
                duration: 320,
                easing: 'cubic-bezier(.4,2,.6,1)'
            });
        });
    });

    // Micro-interaction: logo wiggle on hover
    const logoImgHover = document.querySelector('.logo-img');
    if (logoImgHover) {
        logoImgHover.addEventListener('mouseenter', () => {
            logoImgHover.animate([
                { transform: 'scale(1) rotate(0deg)' },
                { transform: 'scale(1.08) rotate(-6deg)' },
                { transform: 'scale(1) rotate(0deg)' }
            ], {
                duration: 400,
                easing: 'cubic-bezier(.4,2,.6,1)'
            });
        });
    }

    // Subtle nav link color animation on hover (for keyboard users)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('focus', () => {
            link.classList.add('nav-link-focus');
        });
        link.addEventListener('blur', () => {
            link.classList.remove('nav-link-focus');
        });
    });

    // Hamburger menu toggle for mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('nav-open');
        });
    }
});

// --- Smooth Scroll for Anchor Links ---
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

// Close the DOMContentLoaded event listener here
});

// --- Navbar Scroll Logic (Hide/Show & Background) ---
const navbar = document.querySelector('.navbar'); // Query navbar once

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (navbar) {
        if (currentScrollY > 10) {
            // 50% transparent and blurred while scrolling
            navbar.style.background = 'rgba(255, 255, 255, 0.5)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.webkitBackdropFilter = 'blur(10px)';
        } else {
            // Solid white at the top
            navbar.style.background = 'rgba(255, 255, 255, 1)';
            navbar.style.backdropFilter = 'none';
            navbar.style.webkitBackdropFilter = 'none';
        }

        // Hide/show navbar based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > navbarHeight) {
            navbar.classList.add('navbar--hidden');
        } else if (currentScrollY < lastScrollY || currentScrollY <= 10) {
            navbar.classList.remove('navbar--hidden');
        }
    }
    lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
});
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('nav-open');
        });
    }
});
// --- Button Click Handler ---
// Open Google Form in Lightbox
const modal = document.getElementById('googleFormModal');
const closeModal = document.getElementById('closeModal');

document.querySelectorAll('.hero-cta, .nav-cta, .contact-cta').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('show');       // add animation class
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('show');
  modal.style.display = 'none';
  document.body.style.overflow = '';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// --- CSS for Navbar Menu State ---
const style = document.createElement('style');
style.textContent = `
.nav-menu.nav-open {
    display: flex !important;
}
`;
document.head.append(style);

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
