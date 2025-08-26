  // Theme Toggle
        function toggleTheme() {
            const body = document.body;
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            
            // Update theme toggle button
            const themeToggle = document.querySelector('.theme-toggle');
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌓';
            
            // Save theme preference
            try {
                localStorage.setItem('theme', newTheme);
            } catch (e) {
                // Handle case where localStorage is not available
                console.log('Theme preference could not be saved');
            }
        }

        // Initialize theme
        function initTheme() {
            let savedTheme = 'light';
            try {
                savedTheme = localStorage.getItem('theme') || 'light';
            } catch (e) {
                console.log('Could not access localStorage for theme');
            }
            
            document.body.setAttribute('data-theme', savedTheme);
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) {
                themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌓';
            }
        }

        // Mobile Menu Toggle
        function toggleMobileMenu() {
            const navMenu = document.querySelector('.nav-menu');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            
            navMenu.classList.toggle('active');
            mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        }

        // Smooth Scrolling for Navigation Links
        function initSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const headerOffset = 80;
                        const elementPosition = target.offsetTop;
                        const offsetPosition = elementPosition - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        const navMenu = document.querySelector('.nav-menu');
                        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                        if (navMenu.classList.contains('active')) {
                            navMenu.classList.remove('active');
                            mobileMenuBtn.textContent = '☰';
                        }
                    }
                });
            });
        }

        // Active Navigation Link
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        // Header Scroll Effect
        function handleHeaderScroll() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Intersection Observer for Animations
        function initScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            // Add fade-in-up class to elements that should animate
            const animateElements = document.querySelectorAll('.section-title, .section-subtitle, .project-card, .service-card, .blog-card, .skill-item');
            animateElements.forEach(el => {
                el.classList.add('fade-in-up');
                observer.observe(el);
            });
        }

        // Form Submission
        function handleFormSubmit(event) {
            event.preventDefault();
            
            const formData = new FormData(event.target);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simulate form submission
            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`Thank you ${name}! Your message has been sent. I'll get back to you soon.`);
                event.target.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }

        // Typing Animation for Hero Title
        function initTypingAnimation() {
            const heroTitle = document.querySelector('.hero-title');
            if (!heroTitle) return;
            
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            // Start typing animation after a short delay
            setTimeout(typeWriter, 500);
        }

        // Parallax Effect for Hero Section
        function handleParallax() {
            const hero = document.querySelector('.hero');
            if (!hero) return;
            
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.hero-content');
            
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        }

        // Initialize all functions when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            initTheme();
            initSmoothScrolling();
            initScrollAnimations();
            initTypingAnimation();
            
            // Scroll event listeners
            window.addEventListener('scroll', () => {
                updateActiveNavLink();
                handleHeaderScroll();
                handleParallax();
            });
            
            // Initial calls
            updateActiveNavLink();
            handleHeaderScroll();
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            // Close mobile menu on resize
            const navMenu = document.querySelector('.nav-menu');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            }
        });

        // Add some interactive effects
        document.addEventListener('DOMContentLoaded', function() {
            // Add hover effect to project cards
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(-10px) scale(1)';
                });
            });
            
            // Add click effect to buttons
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        pointer-events: none;
                    `;
                    
                    this.style.position = 'relative';
                    this.style.overflow = 'hidden';
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        });

        // Add CSS for ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);