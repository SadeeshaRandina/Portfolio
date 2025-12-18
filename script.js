// DOM Elements
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const scrollToTopBtn = document.getElementById('scrollToTop');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('section');
const themeToggle = document.getElementById('themeToggle');

// ===== PARTICLE ANIMATION =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to get particle color based on theme
function getParticleColor(opacity) {
    const isLightMode = document.body.classList.contains('light-mode');
    if (isLightMode) {
        return `rgba(37, 99, 235, ${opacity * 0.8})`; // More visible in light mode
    }
    return `rgba(37, 99, 235, ${opacity})`;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = getParticleColor(this.opacity);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particlesArray = [];
const numberOfParticles = 100;

function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function connectParticles() {
    const isLightMode = document.body.classList.contains('light-mode');
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const opacity = (1 - distance / 100) * (isLightMode ? 0.4 : 0.3);
                ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    
    connectParticles();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===== CODE RAIN EFFECT =====
const codeRain = document.querySelector('.code-rain');
const characters = '01';

function createCodeRain() {
    codeRain.innerHTML = '';
    const isLightMode = document.body.classList.contains('light-mode');
    
    for (let i = 0; i < 50; i++) {
        const span = document.createElement('span');
        span.textContent = characters[Math.floor(Math.random() * characters.length)];
        span.style.position = 'absolute';
        span.style.left = Math.random() * 100 + '%';
        span.style.top = Math.random() * -100 + '%';
        span.style.color = isLightMode ? 'rgba(37, 99, 235, 0.4)' : 'rgba(37, 99, 235, 0.3)';
        span.style.fontSize = '14px';
        span.style.fontFamily = 'monospace';
        span.style.animation = `fall ${Math.random() * 10 + 10}s linear infinite`;
        span.style.animationDelay = Math.random() * 5 + 's';
        codeRain.appendChild(span);
    }
}

// Add CSS animation for falling code
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(-100%);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(100vh);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

createCodeRain();

// ===== THEME TOGGLE FUNCTIONALITY =====
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    }
    
    // Recreate code rain with updated colors when theme changes
    createCodeRain();
});

// Window Load Event
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sticky header
window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('active');
    } else {
        scrollToTopBtn.classList.remove('active');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Project Filtering with animation
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            card.style.animation = 'none';
            
            setTimeout(() => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.5s ease both';
                    }, 10);
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.animation = 'fadeInUp 0.5s ease both';
                        }, 10);
                    } else {
                        card.style.display = 'none';
                    }
                }
            }, 100);
        });
    });
});

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill in all required fields.');
        return;
    }
    
    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
    contactForm.reset();
});

// Typing animation for home section
document.addEventListener('DOMContentLoaded', function() {
    const jobTitleElement = document.querySelector('.home-text h2');
    const jobTitles = ['Software Engineering Undergraduate', 'Problem Solver', 'Web Developer', 'Tech Enthusiast'];
    let currentIndex = 0;
    
    function updateJobTitle() {
        const currentTitle = jobTitles[currentIndex];
        let charIndex = 0;
        jobTitleElement.textContent = '';
        
        const typingInterval = setInterval(() => {
            if (charIndex < currentTitle.length) {
                jobTitleElement.textContent += currentTitle.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typingInterval);
                
                setTimeout(() => {
                    const erasingInterval = setInterval(() => {
                        if (jobTitleElement.textContent.length > 0) {
                            jobTitleElement.textContent = jobTitleElement.textContent.slice(0, -1);
                        } else {
                            clearInterval(erasingInterval);
                            currentIndex = (currentIndex + 1) % jobTitles.length;
                            setTimeout(updateJobTitle, 500);
                        }
                    }, 50);
                }, 2000);
            }
        }, 100);
    }
    
    updateJobTitle();
});

// Animation on scroll with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease both';
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.skill-category, .project-card, .contact-item, .about-content, .info-box').forEach(el => {
    observer.observe(el);
});

// Add staggered animation to skill badges
document.addEventListener('DOMContentLoaded', () => {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach((category, catIndex) => {
        const badges = category.querySelectorAll('.skill-badge');
        badges.forEach((badge, badgeIndex) => {
            badge.style.animationDelay = `${catIndex * 0.1 + badgeIndex * 0.05}s`;
        });
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
});

// Mouse parallax effect for home image
const homeImg = document.querySelector('.home-img img');
if (homeImg) {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        
        homeImg.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

// Smooth reveal for sections
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.skill-category, .project-card, .contact-item');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
});