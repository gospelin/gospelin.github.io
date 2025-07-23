/* Typewriter Effect for Hero Subtitle */
const typewriterText = [
    "Software Engineer",
    "Full-Stack Software Developer",
    "Tech Facilitator",
    "AI Enthusiast"
];
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter");

const type = () => {
    if (!typewriterElement) return;

    const currentText = typewriterText[currentTextIndex];
    typewriterElement.textContent = currentText.substring(0, currentCharIndex + (isDeleting ? -1 : 1));
    currentCharIndex += isDeleting ? -1 : 1;

    if (!isDeleting && currentCharIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2500);
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typewriterText.length;
        setTimeout(type, 200);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
};

/* Theme Toggle Functionality */
const html = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");

const updateToggleIcons = (theme) => {
    if (!themeToggle) return;
    themeToggle.querySelector("i").className = `fas fa-${theme === "light" ? "moon" : "sun"}`;
};

const toggleTheme = () => {
    const currentTheme = html.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateToggleIcons(newTheme);
};

if (themeToggle) {
    const savedTheme = localStorage.getItem("theme") || "dark";
    html.setAttribute("data-theme", savedTheme);
    updateToggleIcons(savedTheme);
    themeToggle.addEventListener("click", toggleTheme);
}

/* Dynamic Copyright Year */
const updateCopyrightYear = () => {
    const copyrightElement = document.getElementById("copyright-year");
    if (copyrightElement) {
        copyrightElement.textContent = new Date().getFullYear();
    }
};

/* Mobile Menu Functionality */
const mobileMenu = document.querySelector("#mobileMenu");
const mobileNav = document.querySelector("#mobileNav");
const mobileNavOverlay = document.querySelector("#mobileNavOverlay");
const mobileNavClose = document.querySelector("#mobileNavClose");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

const toggleMobileMenu = () => {
    if (!mobileMenu || !mobileNav || !mobileNavOverlay) return;

    const isExpanded = mobileMenu.getAttribute("aria-expanded") === "true";
    mobileMenu.setAttribute("aria-expanded", !isExpanded);
    mobileNav.setAttribute("aria-hidden", isExpanded);
    mobileNavOverlay.setAttribute("aria-hidden", isExpanded);
    mobileNav.classList.toggle("active");
    mobileNavOverlay.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = isExpanded ? "" : "hidden";
};

if (mobileMenu && mobileNavClose && mobileNavOverlay) {
    mobileMenu.addEventListener("click", toggleMobileMenu);
    mobileNavClose.addEventListener("click", toggleMobileMenu);
    mobileNavOverlay.addEventListener("click", toggleMobileMenu);
    mobileNavLinks.forEach(link => link.addEventListener("click", toggleMobileMenu));
}

/* Navbar Scroll Effect */
const navbar = document.querySelector(".navbar");
if (navbar) {
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
}

/* Back to Top Button */
const backToTop = document.querySelector("#backToTop");
if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("visible", window.scrollY > 300);
    });
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* Smooth Scroll for Anchor Links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

/* Intersection Observer for Animations */
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(".section, .section-title, .about-content, .skills-grid, .education-timeline, .experience-timeline, .projects-grid, .testimonials-carousel, .contact-content").forEach(element => {
    element.classList.add("animate-out");
    observer.observe(element);
});

/* Animation CSS */
const style = document.createElement("style");
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

/* Contact Form Submission */
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = contactForm.querySelector("#name")?.value.trim();
        const email = contactForm.querySelector("#email")?.value.trim();
        const message = contactForm.querySelector("#message")?.value.trim();

        if (name && email && message) {
            contactForm.submit();
            alert("Message sent successfully!");
        } else {
            alert("Please fill out all fields.");
        }
    });
}

/* Testimonials Carousel Auto-Scroll */
const testimonialsCarousel = document.querySelector(".testimonials-carousel");
let scrollAmount = 0;

const autoScrollTestimonials = () => {
    if (!testimonialsCarousel) return;

    scrollAmount += 1;
    testimonialsCarousel.scrollLeft += 1;

    if (scrollAmount >= testimonialsCarousel.scrollWidth - testimonialsCarousel.clientWidth) {
        scrollAmount = 0;
        testimonialsCarousel.scrollLeft = 0;
    }
};

if (testimonialsCarousel) {
    setInterval(autoScrollTestimonials, 50);
}

/* Progress Bars Animation */
const progressBars = document.querySelectorAll(".progress-bar");
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            bar.classList.add("active");
            bar.style.setProperty("--progress", `${bar.dataset.progress}%`);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => progressObserver.observe(bar));

/* Initialize on Page Load */
document.addEventListener("DOMContentLoaded", () => {
    if (typewriterElement) type();
    updateCopyrightYear();

    // Keyboard Navigation Enhancements
    document.querySelectorAll("a, button, input, textarea").forEach(element => {
        element.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                element.click();
            }
        });
    });
});

/* Loading Spinner */
const loadingSpinner = document.querySelector("#loadingSpinner");
const mainContent = document.querySelectorAll("nav, section, footer, .back-to-top");

const hideLoadingSpinner = () => {
    if (loadingSpinner) {
        loadingSpinner.classList.add("hidden");
        mainContent.forEach(element => {
            element.classList.add("visible");
        });
    }
};

/* Scroll Progress Bar */
const scrollProgress = document.querySelector("#scrollProgress");

const updateScrollProgress = () => {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
};

// Debounce function to optimize scroll performance
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(null, args), wait);
    };
};

if (scrollProgress) {
    window.addEventListener("scroll", debounce(updateScrollProgress, 10));
}

/* Initialize on Page Load */
document.addEventListener("DOMContentLoaded", () => {
    // Initialize loading spinner
    if (loadingSpinner && mainContent.length) {
        mainContent.forEach(element => {
            element.classList.add("hidden-content");
        });
        setTimeout(hideLoadingSpinner, 3000);
    }

    // Existing initialization
    if (typewriterElement) type();
    updateCopyrightYear();

    // Keyboard Navigation Enhancements
    document.querySelectorAll("a, button, input, textarea").forEach(element => {
        element.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                element.click();
            }
        });
    });
});