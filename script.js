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

// ===== THEME TOGGLE FUNCTIONALITY =====
// Check for saved theme preference or default to 'dark' mode
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply the saved theme on page load
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    // Update icon based on current theme
    if (document.body.classList.contains('light-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// Window Load Event
window.addEventListener('load', () => {
    // Add fade-in animation to page
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

// Project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            // Show all projects if filter is "all"
            if (filterValue === 'all') {
                card.style.display = 'block';
            } else {
                // Show only projects with matching category
                if (card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple form validation
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Simulating form submission
    // In a real application, you would send this data to a server
    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
    
    // Reset form fields
    contactForm.reset();
});

// Typing animation for home section
document.addEventListener('DOMContentLoaded', function() {
    const jobTitleElement = document.querySelector('.home-text h2');
    const jobTitles = ['Software Engineering Undergraduate', 'Problem Solver', 'Web Developer', 'Tech Enthusiast'];
    let currentIndex = 0;
    
    // Function to update the job title with typing effect
    function updateJobTitle() {
        const currentTitle = jobTitles[currentIndex];
        let charIndex = 0;
        jobTitleElement.textContent = '';
        
        // Typing effect
        const typingInterval = setInterval(() => {
            if (charIndex < currentTitle.length) {
                jobTitleElement.textContent += currentTitle.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typingInterval);
                
                // Wait before erasing
                setTimeout(() => {
                    // Erasing effect
                    const erasingInterval = setInterval(() => {
                        if (jobTitleElement.textContent.length > 0) {
                            jobTitleElement.textContent = jobTitleElement.textContent.slice(0, -1);
                        } else {
                            clearInterval(erasingInterval);
                            
                            // Move to next job title
                            currentIndex = (currentIndex + 1) % jobTitles.length;
                            
                            // Start typing the next title after a delay
                            setTimeout(updateJobTitle, 500);
                        }
                    }, 50);
                }, 2000);
            }
        }, 100);
    }
    
    // Start the typing animation
    updateJobTitle();
});

// Animation on scroll
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

// Add CSS animation class to elements
document.addEventListener('DOMContentLoaded', () => {
    const skillCategories = document.querySelectorAll('.skill-category');
    const projectCards = document.querySelectorAll('.project-card');
    const contactItems = document.querySelectorAll('.contact-item');
    
    // Add animation classes
    skillCategories.forEach((category, index) => {
        category.style.animationDelay = `${index * 0.2}s`;
    });
    
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
});