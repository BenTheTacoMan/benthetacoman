document.addEventListener('DOMContentLoaded', (event) => {
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        const scrollY = window.scrollY;

        // Adjust the '120' value to control when the navbar appears
        if (scrollY > 120) {
            navbar.style.top = '0'; // Show navbar
        } else {
            navbar.style.top = '-60px'; // Hide navbar
        }

        // Add additional scroll-triggered animations here
    });
});
