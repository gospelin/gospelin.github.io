// Theme Toggle
const html = document.documentElement;
const themeToggle = document.querySelector('#themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';

const updateToggleIcons = (theme) => {
    const iconClass = theme === 'light' ? 'fa-moon' : 'fa-sun';
    themeToggle.querySelector('i').className = `fas ${iconClass}`;
};

const toggleTheme = () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcons(newTheme);
};

html.setAttribute('data-theme', savedTheme);
updateToggleIcons(savedTheme);
themeToggle.addEventListener('click', toggleTheme);

// Set dynamic copyright year
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// Mobile Menu
const mobileMenu = document.querySelector('#mobileMenu');
const mobileNav = document.querySelector('#mobileNav');
const mobileNavOverlay = document.querySelector('#mobileNavOverlay');
const mobileNavClose = document.querySelector('#mobileNavClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

const toggleMobileMenu = () => {
    const isExpanded = mobileMenu.getAttribute('aria-expanded') === 'true';
    mobileMenu.setAttribute('aria-expanded', !isExpanded);
    mobileNav.setAttribute('aria-hidden', isExpanded);
    mobileNavOverlay.setAttribute('aria-hidden', isExpanded);
    mobileNav.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = isExpanded ? '' : 'hidden';
};

mobileMenu.addEventListener('click', toggleMobileMenu);
mobileNavClose.addEventListener('click', toggleMobileMenu);
mobileNavOverlay.addEventListener('click', toggleMobileMenu);
mobileNavLinks.forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Back to Top Button
const backToTop = document.querySelector('#backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .section-title, .about-content, .skills-grid, .education-timeline, .experience-timeline, .projects-grid, .testimonials-grid, .contact-content').forEach(element => {
    element.classList.add('animate-out');
    observer.observe(element);
});

// CSS for animations
const style = document.createElement('style');
style.innerHTML = `
            .animate-out {
                opacity: 0;
                transform: translateY(50px);
                transition: var(--transition-slow);
            }
            .animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            `;
document.head.appendChild(style);


const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const message = contactForm.querySelector('#message').value.trim();
    if (name && email && message) {
        contactForm.submit();
        alert('Message sent successfully!');
    } else {
        alert('Please fill out all fields.');
    }
});

const carousel = document.querySelector('.testimonials-carousel');
let isDragging = false, startX, scrollLeft;
carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});
carousel.addEventListener('mouseleave', () => isDragging = false);
carousel.addEventListener('mouseup', () => isDragging = false);
carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
});
