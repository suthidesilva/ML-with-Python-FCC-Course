// Change the title when the user leaves the tab
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        document.title = "Come back! 💬";
    } else {
        document.title = "SMS Classification Visualizer";
    }
});


// AI analysis for user input
document.getElementById('analyze-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    const resultDiv = document.getElementById('analysis-result');

    if (!userInput.trim()) {
        resultDiv.textContent = 'Please type a message to analyze.';
        resultDiv.style.color = '#f44336'; // Red for error
        return;
    }

    try {
        // List of spam-related keywords
        const spamKeywords = [
            'winner', 'win', 'cash', 'prize', 'award', 'claim', 'congratulations', 'bonus',
            'offer', 'sale', 'discount', 'coupon', 'deal', 'gift', 'limited time', 'exclusive',
            'urgent', 'act now', 'hurry', 'last chance', 'today only',
            'click here', 'visit', 'http://', 'www.', 'link', 'verify',
            'subscription', 'free trial', 'unsubscribe', 'service',
            'alert', 'notice', 'important',
            'loan', 'insurance', 'marketing', 'congratulations',
            'lottery', 'bank', 'credit card', 'account', 'verify', 'security',
            'guaranteed', 'no cost', 'zero fees'
        ];

        const isSpam = spamKeywords.some(keyword => userInput.toLowerCase().includes(keyword));
        const result = isSpam ? 'spam' : 'ham';
        resultDiv.textContent = `The message is classified as: ${result.toUpperCase()}`;
        resultDiv.style.color = isSpam ? '#f44336' : '#4caf50';
    } catch (error) {
        console.error('Error analyzing message:', error);
        resultDiv.textContent = 'Error analyzing message.';
        resultDiv.style.color = '#f44336';
    }
});

// Load data on page load
window.addEventListener("load", fetchAndDisplayData);