const images = [
    'static/1.jpeg',
    'static/2.jpeg',
    'static/3.jpeg',
    'static/4.jpeg',
    'static/5.jpeg',
    'static/6.jpeg',
    'static/7.jpeg',
    'static/8.jpeg',
    'static/9.jpeg'
];

let currentIndex = 1;
const track = document.getElementById('carouselTrack');
const indicatorsContainer = document.getElementById('carouselIndicators');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function initCarousel() {
    images.forEach((src, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.setAttribute('data-index', index);
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Gallery image ${index + 1}`;
        item.appendChild(img);
        track.appendChild(item);

        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        indicator.setAttribute('data-index', index);
        indicator.addEventListener('click', function() {
            goToSlide(index);
        });
        indicatorsContainer.appendChild(indicator);
    });

    updateCarousel();
}

function updateCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicator');

    items.forEach((item, index) => {
        item.classList.remove('center', 'side');
        item.style.display = 'none';
        
        if (index === currentIndex) {
            item.classList.add('center');
            item.style.display = 'block';
        }
        else if (index === (currentIndex - 1 + images.length) % images.length) {
            item.classList.add('side');
            item.style.display = 'block';
        }
        else if (index === (currentIndex + 1) % images.length) {
            item.classList.add('side');
            item.style.display = 'block';
        }
    });

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function scrollCarousel(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

prevBtn.addEventListener('click', function() {
    scrollCarousel(-1);
});

nextBtn.addEventListener('click', function() {
    scrollCarousel(1);
});

initCarousel();

// Hamburger Menu Toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.querySelector('.nav-links');

hamburgerBtn.addEventListener('click', function() {
    hamburgerBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinkItems = document.querySelectorAll('.nav-links a');
navLinkItems.forEach(link => {
    link.addEventListener('click', function() {
        hamburgerBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = navLinks.contains(event.target);
    const isClickOnHamburger = hamburgerBtn.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
        hamburgerBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
