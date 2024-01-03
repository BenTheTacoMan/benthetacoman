document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const stickyNav = document.createElement('nav');
    stickyNav.classList.add('sticky-nav');
    stickyNav.innerHTML = navLinks.innerHTML; // Clone the navigation links
    document.body.appendChild(stickyNav);
  
    const logo = document.querySelector('.logo-img');
    const headerHeight = logo.offsetHeight; // Assuming the logo is fully visible initially
  
    // Function to update nav position
    function updateNavPosition(scrollY) {
      const scrollRatio = scrollY / headerHeight;
  
      // Check if we should show or hide the original nav links
      if (scrollRatio < 1) {
        // User has scrolled back up
        navLinks.style.transform = `translateX(${100 * scrollRatio}vw)`;
        navLinks.style.opacity = 1 - scrollRatio;
        navLinks.style.visibility = 'visible';
  
        // Hide the sticky navigation
        stickyNav.style.opacity = 0;
        stickyNav.style.visibility = 'hidden';
      } else {
        // User has scrolled down
        navLinks.style.visibility = 'hidden';
  
        // Show the sticky navigation
        stickyNav.style.opacity = 1;
        stickyNav.style.visibility = 'visible';
      }
    }
  
    // Initial update
    updateNavPosition(0);
  
    // Listen for scroll events
    window.addEventListener('scroll', () => {
      updateNavPosition(window.scrollY);
    });
  });
  