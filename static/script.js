/**
 * Nutrition Doctor Website - Main JavaScript
 * Author: Claude
 * Date: April 22, 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPageData();
    initNavigation();
    initAnimations();
    initSubscriptionSlider();
    initTestimonialCarousel();
    initContactForm();
    // fetchData();
});

// =======================================
// Navigation and UI Components
// =======================================

function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-menu') && !event.target.closest('.menu-toggle') && navMenu?.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle?.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu?.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle?.classList.remove('active');
                }
            }
        });
    });
}

// =======================================
// Animation Functions
// =======================================

function initAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in').forEach(el => {
        observer.observe(el);
    });
}

// =======================================
// Carousel/Slider Functions
// =======================================

function initSubscriptionSlider() {
    const sliderContainer = document.querySelector('.subscription-cards');
    const prevButton = document.querySelector('.slider-controls .prev');
    const nextButton = document.querySelector('.slider-controls .next');
    const dots = document.querySelectorAll('.slider-dots .dot');
    
    if (!sliderContainer || !prevButton || !nextButton) return;
    
    let currentIndex = 0;
    let cardWidth = 0;
    let visibleCards = 3;
    
    // Calculate visible cards based on screen width
    function updateVisibleCards() {
        if (window.innerWidth < 768) {
            visibleCards = 1;
        } else if (window.innerWidth < 992) {
            visibleCards = 2;
        } else {
            visibleCards = 3;
        }
        
        const cards = sliderContainer.querySelectorAll('.subscription-card');
        if (cards.length > 0) {
            cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight);
        }
    }
    
    // Update on resize
    window.addEventListener('resize', updateVisibleCards);
    updateVisibleCards();
    
    // Navigation handlers
    function goToSlide(index) {
        const totalCards = sliderContainer.querySelectorAll('.subscription-card').length;
        const maxIndex = Math.max(0, totalCards - visibleCards);
        
        // Clamp index to valid range
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        
        // Calculate scroll position
        const scrollPos = currentIndex * cardWidth;
        
        // Smooth scroll to position
        sliderContainer.scrollTo({
            left: scrollPos,
            behavior: 'smooth'
        });
        
        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));
    
    // Add dot click handlers
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goToSlide(i));
    });
    
    // Handle touch/swipe events
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    sliderContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            goToSlide(currentIndex + 1); // Swipe left, go next
        } else if (touchEndX - touchStartX > swipeThreshold) {
            goToSlide(currentIndex - 1); // Swipe right, go prev
        }
    }
}

function initTestimonialCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.testimonial-controls .prev');
    const nextButton = document.querySelector('.testimonial-controls .next');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (!slides.length || !prevButton || !nextButton) return;
    
    let currentIndex = 0;
    let autoplayInterval;
    
    function showSlide(index) {
        // Update currentIndex with wrapping
        currentIndex = (index + slides.length) % slides.length;
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        slides[currentIndex].classList.add('active');
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function nextSlide() {
        showSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        showSlide(currentIndex - 1);
    }
    
    // Set up click handlers
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });
    
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });
    
    // Set up dot click handlers
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            resetAutoplay();
        });
    });
    
    // Set up autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Initialize
    startAutoplay();
    
    // Pause autoplay when user hovers over carousel
    const carouselContainer = document.querySelector('.testimonial-carousel');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        startAutoplay();
    });
}

// =======================================
// Form Handling
// =======================================

function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        
        // Basic validation
        if (!validateForm(nameField, emailField, subjectField, messageField)) {
            return;
        }
        
        // Prepare data for submission
        const formData = {
            name: nameField.value.trim(),
            email: emailField.value.trim(),
            topic: subjectField.value,
            message: messageField.value.trim()
        };
        
        try {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Submit form data
            const response = await submitContactRequest(formData);

            
            // Reset form on success
            contactForm.reset();
            
            // Show success message
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('There was an error sending your message. Please try again later.', 'error');
        } finally {
            // Reset button state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
        }
    });
    
    // Add input validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
}

function validateForm(nameField, emailField, subjectField, messageField) {
    let isValid = true;
    
    // Validate each field
    if (!validateInput(nameField)) isValid = false;
    if (!validateInput(emailField)) isValid = false;
    if (!validateInput(subjectField)) isValid = false;
    if (!validateInput(messageField)) isValid = false;
    
    return isValid;
}

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    
    // Remove existing error message
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Check if empty
    if (value === '') {
        showInputError(input, 'This field is required');
        isValid = false;
    } 
    // Check email format
    else if (input.type === 'email' && !validateEmail(value)) {
        showInputError(input, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Highlight input based on validation
    input.classList.toggle('invalid', !isValid);
    input.classList.toggle('valid', isValid);
    
    return isValid;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showInputError(input, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    input.parentElement.appendChild(errorElement);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('span');
    closeBtn.className = 'notification-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    };
    notification.appendChild(closeBtn);
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show with animation (reduce timeout for better UX)
    setTimeout(() => {
        notification.classList.add('show');
    }, 10); // Much shorter delay for better responsiveness
    
    // Auto-remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}
// =======================================
// Data Fetching Functions
// =======================================

async function fetchTopSubscriptionPackages() {
    try {
        showLoadingState('.subscription-slider', true);
        
        console.log("Fetching subscription packages...");
        const response = await fetch('/api/subscription-packages?limit=3', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch subscription packages: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Fetched data:", data);
        
        renderSubscriptionPackages(data);
    } catch (error) {
        console.error('Error fetching subscription packages:', error);
        renderErrorState('.subscription-slider', 'Could not load subscription packages');
    } finally {
        showLoadingState('.subscription-slider', false);
    }
}

async function fetchTestimonials() {
    try {
        showLoadingState('.testimonials-wrapper', true);
        
        const response = await fetch('/api/testimonials');
        if (!response.ok) throw new Error('Failed to fetch testimonials');
        
        const data = await response.json();
        renderTestimonials(data);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        renderErrorState('.testimonials-wrapper', 'Could not load testimonials');
    } finally {
        showLoadingState('.testimonials-wrapper', false);
    }
}

async function fetchArticles(limit = 3, topicId = null) {
    try {
        showLoadingState('.articles-grid', true);
        
        let url = `/api/articles?limit=${limit}`;
        if (topicId) url += `&topic_id=${topicId}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch articles');
        
        const data = await response.json();
        renderArticles(data);
    } catch (error) {
        console.error('Error fetching articles:', error);
        renderErrorState('.articles-grid', 'Could not load articles');
    } finally {
        showLoadingState('.articles-grid', false);
    }
}

async function fetchTopics() {
    try {
        const response = await fetch('/api/topics');
        if (!response.ok) throw new Error('Failed to fetch topics');
        
        const data = await response.json();


        const select = document.getElementById('subject');
    
        data.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.topic_id;
        option.textContent = subject.topic_name;
        select.appendChild(option);
    });
        
        // Render topics in topic filter dropdown if it exists
        const topicFilter = document.querySelector('.topic-filter');
        if (topicFilter) {
            topicFilter.innerHTML = '<option value="">All Topics</option>';
            
            data.forEach(topic => {
                const option = document.createElement('option');
                option.value = topic.topic_id;
                option.textContent = topic.topic_name;
                topicFilter.appendChild(option);
            });
            
            // Add event listener to filter articles
            topicFilter.addEventListener('change', function() {
                fetchArticles(3, this.value);
            });
        }
    } catch (error) {
        console.error('Error fetching topics:', error);
    }
}

async function fetchArticleBySlug(slug) {
    try {
        const articleContent = document.querySelector('.article-content');
        if (!articleContent) return;
        
        showLoadingState('.article-content', true);
        
        const response = await fetch(`/api/articles/${slug}`);
        if (!response.ok) {
            if (response.status === 404) {
                articleContent.innerHTML = '<div class="not-found"><h2>Article Not Found</h2><p>The article you\'re looking for doesn\'t exist or has been removed.</p></div>';
            } else {
                throw new Error('Failed to fetch article');
            }
            return;
        }
        
        const article = await response.json();
        
        // Render article content
        articleContent.innerHTML = `
            <div class="article-header">
                <div class="article-meta">
                    <span class="category">${article.topic_name}</span>
                    <span class="date">${new Date(article.published_at).toLocaleDateString()}</span>
                </div>
                <h1>${article.article_title}</h1>
                <div class="author">By ${article.author_name}</div>
            </div>
            <div class="article-feature-image">
                <img src="${article.article_image_url}" alt="${article.article_title}">
            </div>
            <div class="article-body">
                ${article.article_text}
            </div>
        `;
        
        // Update page title
        document.title = `${article.article_title} | Nutrition Doctor`;
        
    } catch (error) {
        console.error('Error fetching article:', error);
        const articleContent = document.querySelector('.article-content');
        if (articleContent) {
            articleContent.innerHTML = '<div class="error"><h2>Error Loading Article</h2><p>There was a problem loading this article. Please try again later.</p></div>';
        }
    } finally {
        showLoadingState('.article-content', false);
    }
}

async function submitContactRequest(formData) {
    const response = await fetch('/api/contact-requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit contact request');
    }
    
    return response.json();
}

// Initialize the page based on current path
function initPageData() {
    const path = window.location.pathname;
    
    // Common data for all pages
    fetchTopics();
    
    // Home page
    if (path === '/' || path === '/index.html') {
        fetchTopSubscriptionPackages();
        fetchTestimonials();
        fetchArticles(3);
    }

}

// =======================================
// Render Functions
// =======================================

function renderSubscriptionPackages(packages) {
    const container = document.querySelector('.subscription-cards');
    if (!container) return;
    
    // Clear any existing content (except loading indicators)
    container.querySelectorAll('.subscription-card:not(.skeleton)').forEach(el => el.remove());
    
    // Update dots for pagination
    updateSliderDots('.slider-dots', packages.length);
    
    // Render each package
    packages.forEach((pkg, index) => {
        const card = createSubscriptionCard(pkg, index);
        container.appendChild(card);
    });
    
    // Re-initialize the slider after adding new content
    initSubscriptionSlider();
}
function createSubscriptionCard(packageData, index) {
    const { 
        subscription_name, 
        subscription_price, 
        currency_code, 
        subscription_duration,
        subscription_discount,
        subscription_image_url,
        features,
        is_popular
    } = packageData;
    
    const card = document.createElement('div');
    card.className = `subscription-card fade-in${index > 0 ? ' delay-' + index : ''}`;
    
    // Add popular badge if applicable
    if (is_popular) {
        const badge = document.createElement('div');
        badge.className = 'subscription-badge';
        badge.textContent = 'Best Value';
        card.appendChild(badge);
    }
    
    // Add discount badge if available
    if (subscription_discount > 0) {
        const discountBadge = document.createElement('div');
        discountBadge.className = 'subscription-badge discount-badge';
        discountBadge.innerHTML = `<strong>${subscription_discount}% OFF</strong><br>Limited Time`;
        card.appendChild(discountBadge);
    }

    // // Add background image if available
    // if (subscription_image_url) {
    //     card.style.backgroundImage = `url('${subscription_image_url}')`;
    //     card.style.backgroundSize = 'cover';
    //     card.style.backgroundPosition = 'center';
    //     card.classList.add('has-bg-image');
    // }
    
    // Package name
    const name = document.createElement('h3');
    name.textContent = subscription_name;
    card.appendChild(name);
    
    // Price display
    const priceContainer = document.createElement('div');
    priceContainer.className = 'subscription-price';
    
    const price = document.createElement('span');
    price.className = 'price';
    
    // Apply discount if available
    if (subscription_discount > 0) {
        const originalPrice = document.createElement('span');
        originalPrice.className = 'original-price';
        originalPrice.textContent = `${currency_code}${subscription_price}`;
        priceContainer.appendChild(originalPrice);
        
        // Calculate discounted price
        const discountedPrice = subscription_price * (1 - subscription_discount/100);
        price.textContent = `${currency_code}${discountedPrice.toFixed(2)}`;
    } else {
        price.textContent = `${currency_code}${subscription_price}`;
    }
    
    priceContainer.appendChild(price);
    
    const duration = document.createElement('span');
    duration.className = 'duration';
    const durationText = subscription_duration === 1 ? '/month' : 
                         subscription_duration === 3 ? '/3 months' : 
                         subscription_duration === 6 ? '/6 months' : 
                         subscription_duration === 12 ? '/year' : 
                         `/${subscription_duration} months`;
    duration.textContent = durationText;
    priceContainer.appendChild(duration);
    
    card.appendChild(priceContainer);
    
    // Features list
    const featuresList = document.createElement('ul');
    featuresList.className = 'subscription-features';
    
    features.forEach(feature => {
        const li = document.createElement('li');
        const icon = document.createElement('i');
        icon.className = 'fas fa-check-circle';
        li.appendChild(icon);
        li.appendChild(document.createTextNode(` ${feature.feature_name}`));
        featuresList.appendChild(li);
    });
    
    card.appendChild(featuresList);
    
    // CTA button
    const cta = document.createElement('a');
    cta.href = '#';
    cta.className = is_popular ? 'btn btn-primary' : 'btn btn-outline';
    cta.textContent = 'Get Started';
    cta.dataset.packageId = packageData.subscription_type_id;
    card.appendChild(cta);
    
    return card;
}


function renderTestimonials(testimonials) {
    const container = document.querySelector('.testimonial-carousel');
    if (!container) return;
    
    // Clear existing testimonials
    container.querySelectorAll('.testimonial-slide:not(.skeleton)').forEach(el => el.remove());
    
    // Update dots for pagination
    updateSliderDots('.testimonial-dots', testimonials.length);
    
    // Render each testimonial
    testimonials.forEach((testimonial, index) => {
        const slide = createTestimonialSlide(testimonial, index === 0);
        container.appendChild(slide);
    });
    
    // Re-initialize the carousel
    initTestimonialCarousel();
}

function createTestimonialSlide(testimonial, isActive) {
    const { 
        full_name, 
        image_url, 
        subscription_name, 
        comment, 
        rating,
        stats
    } = testimonial;
    
    const slide = document.createElement('div');
    slide.className = `testimonial-slide${isActive ? ' active' : ''}`;
    
    slide.innerHTML = `
        <div class="testimonial-content">
            <div class="testimonial-image">
                <img src="${image_url}" alt="${full_name}'s transformation">
                <div class="testimonial-stats">
                    ${stats.map(stat => `
                        <div class="stat">
                            <span class="stat-value">${stat.value}</span>
                            <span class="stat-label">${stat.label}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="testimonial-text">
                <div class="testimonial-rating">
                    ${Array(5).fill().map((_, i) => 
                        `<i class="fas fa-star${i < rating ? '' : '-empty'}"></i>`
                    ).join('')}
                </div>
                <p>"${comment}"</p>
                <div class="testimonial-author">
                    <h4>${full_name}</h4>
                    <span>${subscription_name}</span>
                </div>
            </div>
        </div>
    `;
    
    return slide;
}

function renderArticles(articles) {
    const container = document.querySelector('.articles-grid');
    if (!container) return;
    
    // Clear existing articles
    container.querySelectorAll('.article-card:not(.skeleton)').forEach(el => el.remove());
    
    // Render each article
    articles.forEach((article, index) => {
        const card = createArticleCard(article, index);
        container.appendChild(card);
    });
}

function createArticleCard(article, index) {
    const { 
        article_id,
        article_title, 
        article_image_url, 
        topic_name,
        article_text,
        view_count,
        published_at,
        slug
    } = article;
    
    // Format date
    const date = new Date(published_at);
    const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
    
    // Get excerpt from article text
    const excerpt = article_text.length > 120 
        ? article_text.substring(0, 120) + '...' 
        : article_text;
    
    const card = document.createElement('div');
    card.className = `article-card slide-in${index > 0 ? ' delay-' + index : ''}`;
    
    card.innerHTML = `
        <div class="article-image">
            <img src="${article_image_url}" alt="${article_title}">
            <div class="article-category">${topic_name}</div>
        </div>
        <div class="article-content">
            <h3>${article_title}</h3>
            <p>${excerpt}</p>
            <div class="article-meta">
                <span><i class="far fa-calendar"></i> ${formattedDate}</span>
                <span><i class="far fa-eye"></i> ${view_count || 0} views</span>
            </div>
            <a href="/articles/${slug}" class="btn btn-outline">Read More</a>
        </div>
    `;
    
    return card;
}

// =======================================
// UI Helper Functions
// =======================================

function showLoadingState(containerSelector, isLoading) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    // If loading state is turning on
    if (isLoading) {
        // Check if we already have loading skeletons
        if (container.querySelector('.skeleton')) return;
        
        // Depending on container type, create different skeletons
        if (containerSelector.includes('subscription')) {
            // Create subscription card skeletons
            for (let i = 0; i < 3; i++) {
                const skeleton = document.createElement('div');
                skeleton.className = 'subscription-card skeleton';
                container.appendChild(skeleton);
            }
        } else if (containerSelector.includes('testimonial')) {
            // Create testimonial skeleton
            const skeleton = document.createElement('div');
            skeleton.className = 'testimonial-slide skeleton active';
            skeleton.style.height = '400px';
            container.appendChild(skeleton);
        } else if (containerSelector.includes('articles')) {
            // Create article card skeletons
            for (let i = 0; i < 3; i++) {
                const skeleton = document.createElement('div');
                skeleton.className = 'article-card skeleton';
                container.appendChild(skeleton);
            }
        }
    } else {
        // Remove skeletons when loading is complete
        container.querySelectorAll('.skeleton').forEach(el => el.remove());
    }
}

function renderErrorState(containerSelector, message) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <p>${message}</p>
        <button class="btn btn-outline retry-btn">Retry</button>
    `;
    
    // Clear container and append error
    container.innerHTML = '';
    container.appendChild(errorDiv);
    
    // Add retry functionality
    const retryBtn = errorDiv.querySelector('.retry-btn');
    retryBtn.addEventListener('click', () => {
        // Remove error message
        errorDiv.remove();
        
        // Re-fetch data based on container type
        if (containerSelector.includes('subscription')) {
            fetchTopSubscriptionPackages();
        } else if (containerSelector.includes('testimonial')) {
            fetchTestimonials();
        } else if (containerSelector.includes('articles')) {
            fetchArticles();
        }
    });
}

function updateSliderDots(dotsContainerSelector, itemCount) {
    const dotsContainer = document.querySelector(dotsContainerSelector);
    if (!dotsContainer) return;
    
    // Clear existing dots
    dotsContainer.innerHTML = '';
    
    // Create new dots based on item count
    for (let i = 0; i < itemCount ; i++) {
        const dot = document.createElement('span');
        dot.className = `dot${i === 0 ? ' active' : ''}`;
        dotsContainer.appendChild(dot);
    }
}