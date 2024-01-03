document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const stickyNav = document.createElement('nav');
    const logo = document.querySelector('.logo-img');
    const header = document.querySelector('header');
    const aboutImg = document.querySelector('.about-img');
    const aboutSection = document.getElementById('about');
    const aboutHeader = document.querySelector('.about-header'); // Selector for your header
    const aboutText = document.querySelector('.about-text'); // Selector for your text

    stickyNav.classList.add('sticky-nav');
    stickyNav.innerHTML = navLinks.innerHTML; // Clone the navigation links
    document.body.appendChild(stickyNav);

    function updateContent(scrollY) {
        const headerBottom = header.offsetTop + header.offsetHeight;
        const logoBottom = logo.offsetTop + logo.offsetHeight;
        const stickyVisible = scrollY >= logoBottom;
        const aboutTop = aboutSection.offsetTop;

        // Handle sticky nav visibility
        if (stickyVisible) {
            stickyNav.style.opacity = 1;
            stickyNav.style.visibility = 'visible';
            navLinks.style.visibility = 'hidden';
        } else {
            const scrollRatio = Math.min(scrollY / logoBottom, 1);
            navLinks.style.transform = `translateX(${scrollRatio * 200}%)`;
            navLinks.style.opacity = 1 - scrollRatio;
            stickyNav.style.opacity = scrollRatio;
            stickyNav.style.visibility = scrollRatio > 0 ? 'visible' : 'hidden';
            navLinks.style.visibility = 'visible';
        }

        // Handle about section visibility and image animation
        if (scrollY > aboutTop - window.innerHeight * 1.5 && scrollY < aboutTop - window.innerHeight / 2) {
            // When user is approaching the about section, show text with some transparency
            aboutHeader.style.opacity = 0.5;
            aboutText.style.opacity = 0.5;
        } else if (scrollY >= aboutTop - window.innerHeight / 2) {
            // As the user scrolls past the about section, make text fully opaque
            aboutHeader.style.opacity = 1;
            aboutText.style.opacity = 1;
            // And move the image in from the left
            aboutImg.style.opacity = 1;
            aboutImg.style.left = '25%';
        } else {
            // Reset styles if the about section is not in view
            aboutHeader.style.opacity = 0;
            aboutText.style.opacity = 0;
            aboutImg.style.opacity = 0;
            aboutImg.style.left = '-100%'; // Start off-screen to the left
        }
    }

    // Initial update based on the current scroll position
    updateContent(window.scrollY);

    // Listen for scroll events
    window.addEventListener('scroll', () => {
        updateContent(window.scrollY);
    });
});
