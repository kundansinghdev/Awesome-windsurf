// Advanced UI/UX Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize animations
    initAnimations();
    
    // Initialize dark mode
    initDarkMode();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize skill bars
    initSkillBars();
    
    console.log('Welcome to Kundan Singh\'s Personal Website!');
});

// Smooth scroll implementation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Scroll animations using Intersection Observer
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate').forEach(el => observer.observe(el));
}

// Dark mode toggle with smooth transition
function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.body.classList.add('dark-mode');
        }

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
        });
    }
}

// Typing effect for hero section
function initTypingEffect() {
    const phrases = ['Web Developer', 'UI/UX Designer', 'Problem Solver'];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-text');
    
    if (typingElement) {
        function type() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }
            
            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                setTimeout(() => isDeleting = true, 1500);
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            }
            
            const typingSpeed = isDeleting ? 100 : 200;
            setTimeout(type, typingSpeed);
        }
        
        type();
    }
}

// Animated skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        const progress = bar.querySelector('.progress');
        
        if (progress) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        progress.style.width = `${percentage}%`;
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(bar);
        }
    });
}

// Parallax effect for hero section
document.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Smooth state updates
function updatePageState(newState) {
    const content = document.querySelector('.content');
    if (content) {
        content.style.opacity = '0';
        setTimeout(() => {
            // Update content here
            content.style.opacity = '1';
        }, 300);
    }
}

// Project filter animation
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        const projectCategory = project.getAttribute('data-category');
        if (category === 'all' || projectCategory === category) {
            project.style.display = 'block';
            setTimeout(() => project.style.opacity = '1', 10);
        } else {
            project.style.opacity = '0';
            setTimeout(() => project.style.display = 'none', 300);
        }
    });
}
