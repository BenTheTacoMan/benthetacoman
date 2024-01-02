window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const home = document.getElementById('home');
    const linksContainer = document.getElementById('links-container');
    const tacoImage = document.getElementById('taco-image');

    // Get the scroll position
    let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // When the user scrolls down, animate elements
    if (scrollPosition > home.offsetHeight / 2) {
        navbar.classList.remove('hidden');
        linksContainer.style.opacity = '0';
        linksContainer.style.transform = 'translateY(-100%)';
        tacoImage.style.transform = 'translateY(500%) translateX(-200%)';
    } else {
        navbar.classList.add('hidden');
        linksContainer.style.opacity = '1';
        linksContainer.style.transform = 'translateY(0)';
        tacoImage.style.transform = 'translateY(0) translateX(0)';
    }
});
