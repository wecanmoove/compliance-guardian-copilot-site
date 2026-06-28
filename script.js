// Défilement fluide pour les liens de navigation
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

// Soumission du formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Obtenir les données du formulaire
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Ici, vous enverriez généralement les données à un service backend
        console.log('Formulaire soumis :', data);
        
        // Afficher le message de succès
        alert('Merci pour votre message ! Nous vous recontacterons bientôt.');
        
        // Réinitialiser le formulaire
        this.reset();
    });
}

// Actions des boutons CTA
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function (e) {
        const buttonText = this.textContent.toLowerCase();
        
        if (buttonText.includes('commencer')) {
            // Accédez à la démo/inscription
            console.log('Navigation vers l\'inscription...');
            // window.location.href = '/signup';
        } else if (buttonText.includes('démo')) {
            // Ouvrir une modal de démo ou naviguer
            console.log('Demande de démo...');
            // Vous pourriez ouvrir une modal ici
        } else if (buttonText.includes('envoyer')) {
            // Le formulaire gérera ceci
        }
    });
});

// Intersection Observer pour les animations de fondu
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

// Observer toutes les cartes de fonctionnalités et les éléments de capacité
document.querySelectorAll('.feature-card, .capability, .benefit-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Mise en évidence active des liens de navigation
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

// Fonction de débounce pour les événements de défilement
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

// Animation des compteurs pour les statistiques
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

// Effet de parallaxe pour la section héros
window.addEventListener('scroll', debounce(() => {
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual && window.innerWidth > 768) {
        const scrollPosition = window.scrollY;
        heroVisual.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
}, 10));

// Ajouter un effet d'ondulation aux boutons
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

// Basculer le menu mobile (si nécessaire à l'avenir)
function setupMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Créer un bouton de menu
    if (window.innerWidth <= 768 && !document.querySelector('.menu-button')) {
        const menuButton = document.createElement('button');
        menuButton.classList.add('menu-button');
        menuButton.innerHTML = '☰';
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Insérer le bouton de menu avant les liens de navigation
        navbar.querySelector('.container').appendChild(menuButton);
    }
}

// Initialiser lors du chargement du document
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    
    // Ajouter des écouteurs d'événements pour les animations
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Gérer le redimensionnement de la fenêtre
window.addEventListener('resize', debounce(() => {
    setupMobileMenu();
}, 250));

// Enregistrer lorsque la page est entièrement chargée
window.addEventListener('load', () => {
    console.log('Site Web Compliance Guardian chargé avec succès');
});
