const express = require('express');
const router = express.Router();
const { searchBooks } = require('../controllers/publicBooksController');

router.get('/search', searchBooks);

module.exports = router;
