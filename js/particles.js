document.addEventListener('DOMContentLoaded', () => {
    const particleContainer = document.querySelector('.floating-particles');
    if (!particleContainer) return;

    const createParticle = () => {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random size between 12px and 16px
        const size = Math.random() * 12 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random position within the hero section
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random animation properties
        const translateX = (Math.random() - 0.5) * 100; // Random X movement (-50px to 50px)
        const translateY = (Math.random() - 0.5) * 100; // Random Y movement (-50px to 50px)
        particle.style.setProperty('--translate-x', `${translateX}px`);
        particle.style.setProperty('--translate-y', `${translateY}px`);
        particle.style.animationDuration = `${Math.random() * 5 + 5}s`; // 5s to 10s
        particle.style.animationDelay = `${Math.random() * 2}s`; // 0s to 2s delay

        particleContainer.appendChild(particle);

        // Remove particle after animation to prevent DOM bloat
        setTimeout(() => {
            particle.remove();
        }, 10000); // Matches max animation duration
    };

    // Create 20 particles
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    // Continuously spawn new particles
    setInterval(createParticle, 500); // Spawn a new particle every 0.5s
});