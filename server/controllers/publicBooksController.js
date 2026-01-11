const axios = require('axios');

// @desc    Search books from Google Books API
// @route   GET /api/books/search
// @access  Public
const searchBooks = async (req, res) => {
    try {
        const { q, startIndex = 0, maxResults = 10, printType = 'all', filter } = req.query;

        if (!q) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        const baseUrl = 'https://www.googleapis.com/books/v1/volumes';

        // Construct query parameters
        const params = {
            q,
            startIndex,
            maxResults,
            printType,
            key: apiKey
        };

        if (filter) {
            params.filter = filter; // e.g., 'free-ebooks'
        }

        const response = await axios.get(baseUrl, { params });

        res.json(response.data);
    } catch (error) {
        console.error('Google Books API Error:', error.message);
        res.status(500).json({ 
            message: 'Error fetching data from Google Books API', 
            error: error.message 
        });
    }
};

module.exports = {
    searchBooks
};
