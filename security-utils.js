// Security utilities for input validation and sanitization

// Enhanced input sanitization
function sanitizeHTML(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone number
function isValidPhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Rate limiting for form submissions
const rateLimiter = {
    submissions: new Map(),
    isAllowed: function(identifier, maxAttempts = 3, timeWindow = 300000) { // 5 minutes
        const now = Date.now();
        const userSubmissions = this.submissions.get(identifier) || [];
        
        // Remove old submissions outside time window
        const recentSubmissions = userSubmissions.filter(time => now - time < timeWindow);
        
        if (recentSubmissions.length >= maxAttempts) {
            return false;
        }
        
        recentSubmissions.push(now);
        this.submissions.set(identifier, recentSubmissions);
        return true;
    }
};

// Secure localStorage wrapper
const secureStorage = {
    set: function(key, value) {
        try {
            const sanitizedValue = typeof value === 'string' ? sanitizeHTML(value) : value;
            localStorage.setItem(key, JSON.stringify(sanitizedValue));
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    },
    
    get: function(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage retrieval error:', error);
            return defaultValue;
        }
    }
};