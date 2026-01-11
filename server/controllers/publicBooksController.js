const axios = require('axios');

// @desc    Search books from Google Books API
// @route   GET /api/books/search
// @access  Public
const searchBooks = async (req, res) => {
    try {
        const { q, startIndex = 0, maxResults = 10, printType = 'all', filter, orderBy } = req.query;

        console.log(`[Backend] Searching for: "${q}", Start: ${startIndex}, Type: ${printType}, Filter: ${filter}, OrderBy: ${orderBy}`);

        if (!q) {
            console.log('[Backend] Missing query parameter');
            return res.status(400).json({ message: 'Search query is required' });
        }

        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        if (!apiKey) {
            console.error('[Backend] Error: GOOGLE_BOOKS_API_KEY is missing');
            return res.status(500).json({ message: 'Server configuration error: API Key missing' });
        }

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
        
        if (orderBy) {
            params.orderBy = orderBy; // e.g. 'newest'
        }

        console.log('[Backend] Sending request to Google Books API...');
        const response = await axios.get(baseUrl, { params });
        console.log(`[Backend] Google Books API Response Status: ${response.status}`);
        console.log(`[Backend] Items found: ${response.data.totalItems}`);

        // Filter out items with missing image or description or unavailable
        if (response.data.items) {
            response.data.items = response.data.items.filter(item => {
                const info = item.volumeInfo;
                const access = item.accessInfo;
                const sale = item.saleInfo;

                // Basic Checks
                const hasImage = info.imageLinks && (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail);
                const hasDescription = info.description && info.description.length > 0;
                
                // Availability Check
                // Google Books "No eBook available" often maps to no viewability or not for sale.
                // However, the user said "book name shows, but it not available".
                // We'll filter strictly on having content we can show.
                // If we strictly filter to 'isEbook', we might lose physical books found.
                // But generally, having an image and description is the bar for "valid listing" in this app.
                
                return hasImage && hasDescription;
            });
        }

        res.json(response.data);
    } catch (error) {
        console.error('[Backend] Google Books API Error:', error.message);
        if (error.response) {
             console.error('[Backend] Error Details:', error.response.data);
        }
        res.status(500).json({ 
            message: 'Error fetching data from Google Books API', 
            error: error.message 
        });
    }
};

module.exports = {
    searchBooks
};
