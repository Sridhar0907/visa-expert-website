// Sample reviews to demonstrate the sharing functionality
const sampleReviews = [
    {
        name: "Priya Sharma",
        business: "H1B Visa Consultation",
        rating: 5,
        text: "Amazing service! No advance payment required - paid only after I was satisfied with their consultation. Got my H1B approved!",
        date: "12/15/2024"
    },
    {
        name: "Raj Patel",
        business: "F1 Refused Consultation",
        rating: 5,
        text: "After my F1 was refused twice, their risk-free consultation helped me understand my mistakes. No upfront payment - totally trustworthy!",
        date: "12/14/2024"
    },
    {
        name: "Anita Kumar",
        business: "H4 Visa Consultation",
        rating: 4,
        text: "Great family consultation service. Loved that I could pay after the consultation. Very transparent and helpful process.",
        date: "12/13/2024"
    },
    {
        name: "David Chen",
        business: "B1/B2 Tourist Consultation",
        rating: 5,
        text: "Excellent consultation for my tourist visa. No advance payment policy shows they truly care about client satisfaction first.",
        date: "12/12/2024"
    }
];

// Initialize with sample reviews if no reviews exist
function initializeSampleReviews() {
    try {
        const existingReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        if (existingReviews.length === 0) {
            localStorage.setItem('reviews', JSON.stringify(sampleReviews));
        }
    } catch (error) {
        console.error('Error initializing sample reviews:', error);
        localStorage.setItem('reviews', JSON.stringify(sampleReviews));
    }
}