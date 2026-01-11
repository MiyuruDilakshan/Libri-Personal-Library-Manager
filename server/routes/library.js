const express = require('express');
const router = express.Router();
const { getBooks, addBook, updateBook, deleteBook } = require('../controllers/libraryController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/').get(getBooks).post(addBook);
router.route('/:id').put(updateBook).delete(deleteBook);

module.exports = router;