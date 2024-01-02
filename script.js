// Get the nav element
const navLinks = document.querySelector('.nav-links');

// Function to be called when user scrolls
function onScroll() {
    // Define a threshold as a fraction of the window height
    // For example, this sets the threshold at half the window height
    const threshold = window.innerHeight / 4;

    // Check if the window has been scrolled past the threshold
    if (window.scrollY > threshold) {
        // Add sticky class if scrolled past threshold
        navLinks.classList.add('sticky-nav');
    } else {
        // Remove sticky class if scrolled back above threshold
        navLinks.classList.remove('sticky-nav');
    }
}

// Listen for scroll events
window.addEventListener('scroll', onScroll);
