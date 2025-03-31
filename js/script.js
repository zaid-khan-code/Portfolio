// Loading Screen
let loadingProgress = 0;
let progressBar;
let totalResources = 0;
let loadedResources = 0;

// Track resource loading
const resourceTypes = ['img', 'script', 'link', 'audio', 'video', 'iframe'];
let resourcesLoaded = false;

// Track total resources to load
resourceTypes.forEach(type => {
    const elements = document.getElementsByTagName(type);
    totalResources += elements.length;
});

// Add a minimum number of resources to simulate other assets loading
totalResources = Math.max(totalResources, 10);

// Simulate loading progress if no resources are tracked
const progressInterval = setInterval(() => {
    // If we're still waiting for resources to load, increment slowly
    if (!resourcesLoaded) {
        loadingProgress += Math.random() * 5;

        // Don't go past 75% until all resources are loaded
        if (loadingProgress > 75) loadingProgress = 75;

        // Update loading progress bar
        if (progressBar) {
            progressBar.style.width = `${loadingProgress}%`;
        }
    }
}, 200);

// Track actual resource loading
function trackResourceLoad() {
    loadedResources++;
    const percent = Math.min((loadedResources / totalResources) * 100, 100);

    // Only update if it's a higher percentage than we have
    if (percent > loadingProgress) {
        loadingProgress = percent;
        if (progressBar) {
            progressBar.style.width = `${loadingProgress}%`;
        }
    }

    // Mark resources as loaded when all are done
    if (loadedResources >= totalResources) {
        resourcesLoaded = true;
    }
}

// Add event listeners to track resource loading
resourceTypes.forEach(type => {
    const elements = document.getElementsByTagName(type);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].complete) {
            trackResourceLoad();
        } else {
            elements[i].addEventListener('load', trackResourceLoad);
            elements[i].addEventListener('error', trackResourceLoad); // Count errors as loaded
        }
    }
});

window.addEventListener('load', () => {
    // When everything is loaded, ensure progress is 100%
    loadingProgress = 100;
    if (progressBar) {
        progressBar.style.width = '100%';
    }
    clearInterval(progressInterval);

    // Hide the loader with a small delay to ensure animations complete
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // Get loading progress bar element
    progressBar = document.getElementById('loading-progress');

    // Get elements
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const hamburger = menuToggle.querySelector('.hamburger');
    const nav = document.getElementById('nav');
    const themeToggle = document.getElementById('theme-toggle');
    const scrollTopBtn = document.getElementById('scroll-top');
    const skillBars = document.querySelectorAll('.skill-progress');
    const contactForm = document.getElementById('contact-form');
    const currentYearSpan = document.getElementById('current-year');

    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();

    // Menu toggle
    menuToggle.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (
            !nav.contains(e.target) &&
            !menuToggle.contains(e.target) &&
            nav.classList.contains('active')
        ) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    });

    // Close menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Theme toggle
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        }
    });

    // Scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }

        // Header shadow on scroll
        if (window.scrollY > 0) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        // Animate skill bars on scroll
        animateOnScroll();
    });

    // Animate elements when they come into view
    function animateOnScroll() {
        const elements = document.querySelectorAll('.section-title, .about-info, .skills-group, .project-card, .contact-info, .contact-form');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });

        // Animate skill bars
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (barPosition < screenPosition) {
                const width = bar.parentElement.parentElement.querySelector('.skill-percentage').textContent;
                bar.style.width = width;
            }
        });
    }

    // Contact form handling
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show an alert
            alert(`Thank you for your message, ${name}! This is a demo form, so no message was actually sent.`);

            // Reset form
            contactForm.reset();
        });
    }

    // Initialize animations
    animateOnScroll();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
}); 