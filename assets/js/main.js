// ===================================

let currentSlide = 0;
let slideInterval;
const SLIDE_DURATION = 5000; // 5 seconds per slide

// Initialize Hero Slider when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure AOS doesn't interfere
    setTimeout(initHeroSlider, 100);
});

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    // Remove all AOS attributes from slides to prevent conflicts
    slides.forEach(slide => {
        const heroContent = slide.querySelector('.hero-content');
        if (heroContent) {
            const elements = heroContent.querySelectorAll('[data-aos]');
            elements.forEach(el => {
                el.removeAttribute('data-aos');
                el.removeAttribute('data-aos-delay');
            });
        }
    });
    
    // Set first slide as active
    slides[0].classList.add('active');
    if (dots.length > 0) {
        dots[0].classList.add('active');
    }
    
    // Start automatic sliding
    startAutoSlide();
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
    });
    
    // Pause slider on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', pauseAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slideIndex === currentSlide) return;
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].classList.add('prev');
    
    // Remove prev class after animation
    setTimeout(() => {
        slides[currentSlide].classList.remove('prev');
    }, 1000);
    
    // Update current slide index
    currentSlide = slideIndex;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function nextSlide() {
    const slides = document.querySelectorAll('.hero-slide');
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
}

function previousSlide() {
    const slides = document.querySelectorAll('.hero-slide');
    const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(prevIndex);
}

function startAutoSlide() {
    clearInterval(slideInterval); // Clear any existing interval
    slideInterval = setInterval(nextSlide, SLIDE_DURATION);
}

function pauseAutoSlide() {
    clearInterval(slideInterval);
}

function resetAutoSlide() {
    pauseAutoSlide();
    startAutoSlide();
}

function handleKeyboardNavigation(e) {
    const slides = document.querySelectorAll('.hero-slide');
    
    if (slides.length === 0) return;
    
    // Left arrow - previous slide
    if (e.key === 'ArrowLeft') {
        previousSlide();
        resetAutoSlide();
    }
    
    // Right arrow - next slide
    if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoSlide();
    }
}

// ===================================
// ANIMATION INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
window.addEventListener('scroll', function() {
    const header = document.getElementById('navbar');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===================================
// MOBILE MENU TOGGLE - FIXED VERSION
// ===================================
const burger = document.getElementById('burger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle menu on burger click
burger.addEventListener('click', function(e) {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    
    // Animate burger icon
    const icon = burger.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const icon = burger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnBurger = burger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnBurger && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = burger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ===================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// FORM VALIDATION & SUBMISSION
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();
    
    // Validation flags
    let isValid = true;
    let errorMessage = '';
    
    // Validate name
    if (name.length < 2) {
        isValid = false;
        errorMessage += 'Please enter a valid name.\n';
    }
    
    // Validate phone (basic Moroccan phone validation)
    const phoneRegex = /^(\+212|0)[5-7]\d{8}$/;
    if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
        isValid = false;
        errorMessage += 'Please enter a valid Moroccan phone number (e.g., 0612345678 or +212612345678).\n';
    }
    
    // Validate email (if provided)
    if (email.length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
        }
    }
    
    // Validate service selection
    if (service === '') {
        isValid = false;
        errorMessage += 'Please select a service type.\n';
    }
    
    // If validation fails, show error
    if (!isValid) {
        alert(errorMessage);
        return;
    }
    
    // If validation passes, simulate form submission
    // In production, you would send this data to your server
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call with setTimeout
    setTimeout(function() {
        // Success message
        alert('Thank you for contacting us! We will get back to you within 24 hours.');
        
        // Reset form
        contactForm.reset();
        
        // Restore button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        // In a real application, you would handle the form data here
        // Example: Send to WhatsApp, Email API, or your backend
        console.log('Form Data:', {
            name: name,
            phone: phone,
            email: email,
            service: service,
            message: message
        });
        
    }, 1500);
});

// ===================================
// REAL-TIME FORM FIELD VALIDATION
// ===================================
const nameField = document.getElementById('name');
const phoneField = document.getElementById('phone');
const emailField = document.getElementById('email');

// Add visual feedback for valid/invalid fields
function addValidationFeedback(field, isValid) {
    if (isValid) {
        field.style.borderColor = '#2ec4b6';
    } else {
        field.style.borderColor = '#e94560';
    }
}

nameField.addEventListener('blur', function() {
    const isValid = this.value.trim().length >= 2;
    addValidationFeedback(this, isValid);
});

phoneField.addEventListener('blur', function() {
    const phoneRegex = /^(\+212|0)[5-7]\d{8}$/;
    const isValid = phoneRegex.test(this.value.replace(/[\s-]/g, ''));
    addValidationFeedback(this, isValid);
});

emailField.addEventListener('blur', function() {
    if (this.value.trim().length === 0) {
        this.style.borderColor = '';
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(this.value);
    addValidationFeedback(this, isValid);
});

// Reset border color on focus
[nameField, phoneField, emailField].forEach(field => {
    field.addEventListener('focus', function() {
        this.style.borderColor = '';
    });
});

// ===================================
// WHATSAPP INTEGRATION (OPTIONAL)
// ===================================
// Update the WhatsApp button to include pre-filled message
const whatsappButton = document.querySelector('.whatsapp-float');
if (whatsappButton) {
    whatsappButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Your WhatsApp business number (replace with actual number)
        const phoneNumber = '212XXXXXXXXX'; // Format: country code + number without + or spaces
        
        // Pre-filled message
        const message = encodeURIComponent('Hello! I would like to inquire about your pest control services.');
        
        // WhatsApp URL
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
    });
}

// ===================================
// SCROLL TO TOP FUNCTIONALITY
// ===================================
let scrollToTopButton;

// Create scroll to top button (optional enhancement)
function createScrollToTopButton() {
    scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #0f3460, #16213e);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 5px 20px rgba(15, 52, 96, 0.3);
        transition: all 0.3s ease;
        z-index: 998;
    `;
    
    document.body.appendChild(scrollToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopButton.style.display = 'flex';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.background = 'linear-gradient(135deg, #e94560, #d63447)';
    });
    
    scrollToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.background = 'linear-gradient(135deg, #0f3460, #16213e)';
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// ===================================
// PERFORMANCE: LAZY LOADING IMAGES
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ===================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section link
            const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// ===================================
// CONSOLE MESSAGE (OPTIONAL)
// ===================================
console.log('%c🛡️ Home Shield - Pest Control Services', 'color: #0f3460; font-size: 20px; font-weight: bold;');
console.log('%cWebsite developed with modern web technologies', 'color: #666; font-size: 12px;');












