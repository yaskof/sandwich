// ========================================
// SANDWICH DURAĞI - RESTAURANT TEMPLATE JS
// Based on SonyaYazilim Design
// ========================================

'use strict';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initSlider();
    initGalleryLightbox();
    initSmoothScroll();
    initMenuTabs();
});

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
    const toggle = document.getElementById('navbarToggle');
    const menu = document.getElementById('navbarMenu');
    const links = menu.querySelectorAll('.navbar-link');

    toggle.addEventListener('click', function () {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', function () {
            menu.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('active')) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// HERO SLIDER - ENHANCED
// ========================================
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const progressBar = document.getElementById('sliderProgress');

    let currentSlide = 0;
    const slideInterval = 6000; // 6 seconds
    let autoSlideTimer;
    let progressTimer;

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // Reset and start progress bar
        resetProgressBar();
        startProgressBar();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function previousSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startProgressBar() {
        if (!progressBar) return;
        progressBar.style.width = '0%';
        let width = 0;
        progressTimer = setInterval(() => {
            width += (100 / (slideInterval / 50));
            progressBar.style.width = width + '%';
            if (width >= 100) {
                clearInterval(progressTimer);
            }
        }, 50);
    }

    function resetProgressBar() {
        clearInterval(progressTimer);
        if (progressBar) {
            progressBar.style.width = '0%';
        }
    }

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        resetProgressBar();
        autoSlideTimer = setInterval(nextSlide, slideInterval);
        startProgressBar();
    }

    // Auto slide
    autoSlideTimer = setInterval(nextSlide, slideInterval);
    startProgressBar();

    // Arrow navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            previousSlide();
            resetAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            currentSlide = index;
            showSlide(currentSlide);
            resetAutoSlide();
        });
    });

    // Pause on hover
    const sliderContainer = document.querySelector('.hero-slider');
    sliderContainer.addEventListener('mouseenter', function () {
        clearInterval(autoSlideTimer);
        clearInterval(progressTimer);
    });

    sliderContainer.addEventListener('mouseleave', function () {
        resetAutoSlide();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            previousSlide();
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        }
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
            resetAutoSlide();
        }
        if (touchEndX > touchStartX + 50) {
            previousSlide();
            resetAutoSlide();
        }
    }
}

// ========================================
// GALLERY LIGHTBOX
// ========================================
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');

    // Open lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const imgSrc = this.getAttribute('data-img');
            lightboxImage.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImage.src = '';
        }, 300);
    }

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // ESC key to close
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.pageYOffset + window.innerHeight;

        if (scrollPosition > sectionTop + 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// ========================================
// PARALLAX EFFECT FOR MENU SECTION
// ========================================
window.addEventListener('scroll', function () {
    const menuSection = document.querySelector('.menu-section');
    if (menuSection) {
        const scrolled = window.pageYOffset;
        const parallax = menuSection.querySelector('.menu-section');
        if (parallax) {
            const offset = scrolled * 0.5;
            parallax.style.backgroundPositionY = offset + 'px';
        }
    }
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// MENU TABS
// ========================================
function initMenuTabs() {
    const tabs = document.querySelectorAll('.menu-tab');
    const categories = document.querySelectorAll('.menu-category');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const targetCategory = this.getAttribute('data-category');

            // Remove active class from all tabs and categories
            tabs.forEach(t => t.classList.remove('active'));
            categories.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Show target category
            const targetElement = document.getElementById(targetCategory);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
}
