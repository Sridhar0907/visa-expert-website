// Star rating functionality with error handling
const stars = document.querySelectorAll('.star');
const ratingInput = document.getElementById('rating');

// Exit early if required elements don't exist
if (stars.length === 0 || !ratingInput) {
    console.warn('Rating elements not found');
}

if (stars.length > 0 && ratingInput) {
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            const rating = index + 1;
            ratingInput.value = rating;
            updateStarDisplay(rating);
        });
        
        star.addEventListener('mouseover', () => {
            updateStarDisplay(index + 1);
        });
    });
}

const starRating = document.querySelector('.star-rating');
if (starRating && ratingInput) {
    starRating.addEventListener('mouseleave', () => {
        updateStarDisplay(ratingInput.value || 0);
    });
}

function updateStarDisplay(rating) {
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < rating);
    });
}

// Input sanitization function
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Review form submission with validation
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const businessInput = document.getElementById('business');
        const ratingInput = document.getElementById('rating');
        const reviewInput = document.getElementById('review');
        
        if (!nameInput || !businessInput || !ratingInput || !reviewInput) {
            console.error('Form elements not found');
            return;
        }
        
        const name = nameInput.value.trim();
        const business = businessInput.value.trim();
        const rating = ratingInput.value;
        const reviewText = reviewInput.value.trim();
        
        // Validate inputs
        if (!name || !business || !reviewText) {
            showNotification('Please fill in all required fields');
            return;
        }
        
        if (!rating) {
            showNotification('Please select a rating');
            return;
        }
    
        const review = {
            name: sanitizeInput(name),
            business: sanitizeInput(business),
            rating: parseInt(rating),
            text: sanitizeInput(reviewText),
            date: new Date().toLocaleDateString()
        };
        
        addReview(review);
        this.reset();
        ratingInput.value = '';
        updateStarDisplay(0);
    });
}

// Notification function to replace alert
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = 'position:fixed;top:20px;right:20px;background:#dc3545;color:white;padding:1rem;border-radius:5px;z-index:9999';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Create review element safely
function createReviewElement(review) {
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review-item';
    
    const starDisplay = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    
    // Create elements safely without innerHTML
    const header = document.createElement('div');
    header.className = 'review-header';
    
    const headerLeft = document.createElement('div');
    const reviewerName = document.createElement('span');
    reviewerName.className = 'reviewer-name';
    reviewerName.textContent = review.name;
    
    const businessName = document.createElement('span');
    businessName.className = 'business-name';
    businessName.textContent = `reviewed ${review.business}`;
    
    headerLeft.appendChild(reviewerName);
    headerLeft.appendChild(businessName);
    
    const ratingDisplay = document.createElement('div');
    ratingDisplay.className = 'rating-display';
    ratingDisplay.textContent = starDisplay;
    
    header.appendChild(headerLeft);
    header.appendChild(ratingDisplay);
    
    const reviewText = document.createElement('div');
    reviewText.className = 'review-text';
    reviewText.textContent = review.text;
    
    const reviewDate = document.createElement('div');
    reviewDate.className = 'review-date';
    reviewDate.textContent = review.date;
    
    reviewElement.appendChild(header);
    reviewElement.appendChild(reviewText);
    reviewElement.appendChild(reviewDate);
    
    return reviewElement;
}

// Add review to display
function addReview(review) {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) {
        console.error('Reviews list element not found');
        return;
    }
    
    const reviewElement = createReviewElement(review);
    reviewsList.insertBefore(reviewElement, reviewsList.firstChild);
    
    // Save to localStorage
    saveReview(review);
}

// Save review to localStorage with error handling
function saveReview(review) {
    try {
        let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviews.unshift(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
    } catch (error) {
        console.error('Error saving review:', error);
    }
}

// Load reviews from localStorage with error handling
function loadReviews() {
    try {
        const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        const reviewsList = document.getElementById('reviewsList');
        
        if (!reviewsList) {
            console.error('Reviews list element not found');
            return;
        }
        
        reviews.forEach(review => {
            const reviewElement = createReviewElement(review);
            reviewsList.appendChild(reviewElement);
        });
    } catch (error) {
        console.error('Error loading reviews:', error);
    }
}

// Load reviews when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeSampleReviews();
    loadReviews();
});