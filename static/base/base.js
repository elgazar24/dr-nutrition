


document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileNav.classList.add('open');
            body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            mobileNav.classList.remove('open');
            body.style.overflow = ''; // Re-enable scrolling
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animation on scroll
    const animatedElements = document.querySelectorAll('.slide-in');
    
    const animateOnScroll = function() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            }
        });
    };
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (mobileNav.classList.contains('open')) {
                        mobileNav.classList.remove('open');
                        body.style.overflow = '';
                    }
                    
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Card hover effect
    const cards = document.querySelectorAll('.benefit-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.benefit-icon');
            
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.benefit-icon');
            
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Testimonial carousel (if added later)
    /* 
    Note: Add this when testimonial section is implemented
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.style.transform = `translateX(${100 * (i - index)}%)`;
        });
    }
    
    if (testimonialSlides.length > 0 && prevButton && nextButton) {
        // Initialize
        showSlide(currentSlide);
        
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        });
        
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        });
    }
    */

    // // Form validation (for contact/booking forms when added)
    // const forms = document.querySelectorAll('form');
    
    // forms.forEach(form => {
    //     form.addEventListener('submit', function(e) {
    //         let isValid = true;
    //         const requiredFields = form.querySelectorAll('[required]');
            
    //         requiredFields.forEach(field => {
    //             if (!field.value.trim()) {
    //                 isValid = false;
                    
    //                 // Create or update error message
    //                 let errorMsg = field.parentNode.querySelector('.error-message');
                    
    //                 if (!errorMsg) {
    //                     errorMsg = document.createElement('span');
    //                     errorMsg.classList.add('error-message');
    //                     errorMsg.style.color = 'var(--error)';
    //                     errorMsg.style.fontSize = 'var(--small-size)';
    //                     errorMsg.style.display = 'block';
    //                     errorMsg.style.marginTop = '5px';
    //                     field.parentNode.appendChild(errorMsg);
    //                 }
                    
    //                 errorMsg.textContent = 'This field is required';
                    
    //                 // Highlight field
    //                 field.style.borderColor = 'var(--error)';
    //             } else {
    //                 // Clear error styling
    //                 const errorMsg = field.parentNode.querySelector('.error-message');
    //                 if (errorMsg) {
    //                     errorMsg.remove();
    //                 }
    //                 field.style.borderColor = '';
    //             }
    //         });
            
    //         // Email validation if applicable
    //         const emailFields = form.querySelectorAll('input[type="email"]');
    //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
    //         emailFields.forEach(field => {
    //             if (field.value.trim() && !emailRegex.test(field.value)) {
    //                 isValid = false;
                    
    //                 // Create or update error message
    //                 let errorMsg = field.parentNode.querySelector('.error-message');
                    
    //                 if (!errorMsg) {
    //                     errorMsg = document.createElement('span');
    //                     errorMsg.classList.add('error-message');
    //                     errorMsg.style.color = 'var(--error)';
    //                     errorMsg.style.fontSize = 'var(--small-size)';
    //                     errorMsg.style.display = 'block';
    //                     errorMsg.style.marginTop = '5px';
    //                     field.parentNode.appendChild(errorMsg);
    //                 }
                    
    //                 errorMsg.textContent = 'Please enter a valid email address';
                    
    //                 // Highlight field
    //                 field.style.borderColor = 'var(--error)';
    //             }
    //         });
            
    //         if (!isValid) {
    //             e.preventDefault();
    //         }
    //     });
    // });

    // // Add loading indicator for form submissions
    // forms.forEach(form => {
    //     form.addEventListener('submit', function(e) {
    //         if (this.checkValidity()) {
    //             const submitBtn = this.querySelector('button[type="submit"]');
                
    //             if (submitBtn) {
    //                 const originalText = submitBtn.innerHTML;
    //                 submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    //                 submitBtn.disabled = true;
                    
    //                 // Restore button state if form submission fails
    //                 // This is just for demo, actual forms would have proper server handling
    //                 setTimeout(() => {
    //                     submitBtn.innerHTML = originalText;
    //                     submitBtn.disabled = false;
    //                 }, 3000);
    //             }
    //         }
    //     });
    // });

    // Add scroll-to-top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    // Add styles for scroll-to-top button
    const scrollTopStyle = document.createElement('style');
    scrollTopStyle.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.3s ease;
            z-index: 99;
            box-shadow: var(--shadow-md);
        }
        
        .scroll-top-btn:hover {
            background-color: var(--primary-dark);
        }
        
        .scroll-top-btn.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        @media (max-width: 768px) {
            .scroll-top-btn {
                width: 40px;
                height: 40px;
                font-size: 1rem;
            }
        }
    `;
    document.head.appendChild(scrollTopStyle);

    // Show/hide scroll-to-top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on button click
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            const heroHeight = hero.offsetHeight;
            
            if (scrollTop < heroHeight) {
                const parallaxOffset = scrollTop * 0.4;
                hero.style.backgroundPositionY = `-${parallaxOffset}px`;
            }
        });
    }

    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // Theme switcher (light/dark mode) - Optional feature
    
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            themeToggle.innerHTML = newTheme === 'light' ? 
                '<i class="fas fa-moon"></i>' : 
                '<i class="fas fa-sun"></i>';
        });
    }
    

    // Preloader
    const preloader = document.createElement('div');
    preloader.classList.add('preloader');
    preloader.innerHTML = `
        <div class="spinner">
            <i class="fas fa-apple-alt fa-spin"></i>
        </div>
    `;
    document.body.appendChild(preloader);

    // Add styles for preloader
    const preloaderStyle = document.createElement('style');
    preloaderStyle.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        .spinner {
            font-size: 3rem;
            color: var(--primary-color);
            animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
        
        .preloader.fade-out {
            opacity: 0;
            visibility: hidden;
        }
    `;
    document.head.appendChild(preloaderStyle);

    // Hide preloader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            
            // Remove preloader from DOM after animation
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    });
});