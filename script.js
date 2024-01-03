document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const stickyNav = document.createElement('nav');
    const logo = document.querySelector('.logo-img');
    const header = document.querySelector('header');
  
    stickyNav.classList.add('sticky-nav');
    stickyNav.innerHTML = navLinks.innerHTML; // Clone the navigation links
    document.body.appendChild(stickyNav);
  
    function updateNavPosition() {
      const scrollY = window.scrollY;
      const headerBottom = header.offsetTop + header.offsetHeight;
      const logoBottom = logo.offsetTop + logo.offsetHeight;
      const stickyVisible = scrollY >= logoBottom;
  
      if (stickyVisible) {
        // When the logo is off the screen, make the sticky nav fully visible
        stickyNav.style.opacity = 1;
        stickyNav.style.visibility = 'visible';
        navLinks.style.visibility = 'hidden';
      } else {
        // Calculate the scroll ratio based on the logo's visibility
        const scrollRatio = Math.min(scrollY / logoBottom, 1);
        navLinks.style.transform = `translateX(${scrollRatio * 100}%)`;
        navLinks.style.opacity = 1 - scrollRatio;
        stickyNav.style.opacity = scrollRatio;
        stickyNav.style.visibility = scrollRatio > 0 ? 'visible' : 'hidden';
        navLinks.style.visibility = 'visible';
      }
    }
  
    // Initial update based on the current scroll position
    updateNavPosition();
  
    // Listen for scroll events
    window.addEventListener('scroll', updateNavPosition);
  });
  