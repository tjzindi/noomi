// --- Animate on Scroll with Fancy Effects ---
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target); // only animate once
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // --- Animate Hero Elements on Load with Stagger ---
    const heroElements = [
        document.querySelector('.hero-title'),
        document.querySelector('.hero-subtitle'),
        document.querySelector('.hero-cta')
    ];

    heroElements.forEach((el, i) => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px) scale(0.98)';
            setTimeout(() => {
                el.classList.add('animate-in');
            }, 300 + i * 300);
        }
    });

    // --- Observe Sections for Animation ---
    const animatedElements = document.querySelectorAll('.process-step, .feature-card, .support-text');
    animatedElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.95)';
        observer.observe(el);
    });
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

// --- Navbar Background on Scroll ---
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.background = window.scrollY > 100
            ? 'rgba(255, 255, 255, 0.98)'
            : 'rgba(255, 255, 255, 0.95)';
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

