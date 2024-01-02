document.addEventListener('DOMContentLoaded', (event) => {
    const navLinks = document.getElementById('nav-links');
    const logoContainer = document.querySelector('.logo-container');
    const headerContainer = document.querySelector('.header-container');
    const stickyNavThreshold = 150; // Adjust the scroll threshold as needed

    window.addEventListener('scroll', () => {
        if (window.scrollY > stickyNavThreshold) {
            navLinks.classList.add('sticky-nav');
            logoContainer.classList.add('hide-logo');
        } else {
            navLinks.classList.remove('sticky-nav');
            logoContainer.classList.remove('hide-logo');
        }

        // Animate header container height to zero to slide up the navigation
        if (window.scrollY > stickyNavThreshold * 2) {
            headerContainer.style.transform = 'translateY(-100%)';
        } else {
            headerContainer.style.transform = 'translateY(0)';
        }
    });
});