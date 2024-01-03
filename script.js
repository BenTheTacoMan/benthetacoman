document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const stickyNav = document.createElement('nav');
    const logo = document.querySelector('.logo-img');
    const header = document.querySelector('header');
    const aboutImg = document.querySelector('.about-img');
    const aboutSection = document.getElementById('about');
    const aboutHeader = document.querySelector('.about-header');
    const aboutText = document.querySelector('.about-text');

    stickyNav.classList.add('sticky-nav');
    stickyNav.innerHTML = navLinks.innerHTML;
    document.body.appendChild(stickyNav);

    function updateContent(scrollY) {
        const headerBottom = header.offsetTop + header.offsetHeight;
        const logoBottom = logo.offsetTop + logo.offsetHeight;
        const stickyVisible = scrollY >= logoBottom;
        const aboutTop = aboutSection.getBoundingClientRect().top + scrollY;
        const aboutBottom = aboutTop + aboutSection.offsetHeight;
        const windowHeight = window.innerHeight;

        // Handle sticky nav visibility
        if (stickyVisible) {
            stickyNav.style.opacity = 1;
            stickyNav.style.visibility = 'visible';
            navLinks.style.visibility = 'hidden';
        } else {
            const scrollRatio = Math.min(scrollY / logoBottom, 1);
            navLinks.style.transform = `translateX(${scrollRatio * 100}%)`;
            navLinks.style.opacity = 1 - scrollRatio;
            stickyNav.style.opacity = scrollRatio;
            stickyNav.style.visibility = scrollRatio > 0 ? 'visible' : 'hidden';
            navLinks.style.visibility = 'visible';
        }

        // Calculate the ratio of how much the about section is visible
        const aboutVisibilityRatio = Math.max(0, Math.min(1, (scrollY + windowHeight - aboutTop) / windowHeight));

        // Update the taco image based on the visibility ratio
        if (scrollY < aboutBottom && aboutVisibilityRatio > 0) {
            aboutImg.style.opacity = aboutVisibilityRatio;
            aboutImg.style.left = `${14- (1 - aboutVisibilityRatio) * 100}%`;
        } else {
            aboutImg.style.opacity = 0;
            aboutImg.style.left = '-100%';
        }

        // Update the text based on the visibility ratio
        if (scrollY + windowHeight > aboutTop) {
            aboutHeader.style.opacity = Math.min(1, (scrollY + windowHeight - aboutTop) / 100);
            aboutHeader.style.transform = 'translateY(0)';
            aboutText.style.opacity = Math.min(1, (scrollY + windowHeight - aboutTop) / 100);
            aboutText.style.transform = 'translateY(0)';
        } else {
            aboutHeader.style.opacity = 0;
            aboutHeader.style.transform = 'translateY(20px)';
            aboutText.style.opacity = 0;
            aboutText.style.transform = 'translateY(20px)';
        }
    }

    // Initial update based on the current scroll position
    updateContent(window.scrollY);

    // Listen for scroll events
    window.addEventListener('scroll', () => {
        updateContent(window.scrollY);
    });
});
