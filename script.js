// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send data to a backend service
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// CTA button actions
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function (e) {
        const buttonText = this.textContent.toLowerCase();
        
        if (buttonText.includes('get started')) {
            // Navigate to demo/signup
            console.log('Navigating to sign up...');
            // window.location.href = '/signup';
        } else if (buttonText.includes('demo')) {
            // Open demo modal or navigate
            console.log('Requesting demo...');
            // You could open a modal here
        } else if (buttonText.includes('send')) {
            // Form will handle this
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and capability items
document.querySelectorAll('.feature-card, .capability, .benefit-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = 'var(--text-secondary)';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        }
    });
});

// Debounce function for scroll events
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

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let count = 0;
        
        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count);
                setTimeout(updateCount, 10);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCount();
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', debounce(() => {
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual && window.innerWidth > 768) {
        const scrollPosition = window.scrollY;
        heroVisual.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
}, 10));

// Add ripple effect to buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Mobile menu toggle (if needed in future)
function setupMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Create menu button
    if (window.innerWidth <= 768 && !document.querySelector('.menu-button')) {
        const menuButton = document.createElement('button');
        menuButton.classList.add('menu-button');
        menuButton.innerHTML = '☰';
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Insert menu button before nav-links
        navbar.querySelector('.container').appendChild(menuButton);
    }
}

// Initialize on document ready
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    
    // Add event listeners for animations
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    setupMobileMenu();
}, 250));

// Log when page is fully loaded
window.addEventListener('load', () => {
    console.log('Compliance Guardian website loaded successfully');
});
