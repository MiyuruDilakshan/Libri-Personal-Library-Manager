const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');

// @desc    Get user books
// @route   GET /api/library
// @access  Private
const getBooks = asyncHandler(async (req, res) => {
    const books = await Book.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.status(200).json(books);
});

// @desc    Add book to library
// @route   POST /api/library
// @access  Private
const addBook = asyncHandler(async (req, res) => {
    console.log("AddBook Request Body:", req.body);
    console.log("AddBook User:", req.user._id);

    const { googleBookId, title, authors, thumbnail } = req.body;

    if (!googleBookId || !title) {
        res.status(400);
        throw new Error('Please include book details');
    }
    
    // Check if book already exists for user
    const bookExists = await Book.findOne({ user: req.user.id, googleBookId });
    if(bookExists) {
        console.log("Book already exists for user");
        res.status(400);
        throw new Error('Book already in library');
    }

    const book = await Book.create({
        user: req.user.id,
        googleBookId,
        title,
        authors,
        thumbnail,
        status: 'Want to Read'
    });
    
    console.log("Book created:", book);

    res.status(200).json(book);
});

// @desc    Update book (status/review)
// @route   PUT /api/library/:id
// @access  Private
const updateBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(404);
        throw new Error('Book not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the book user
    if (book.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedBook);
});

// @desc    Delete book
// @route   DELETE /api/library/:id
// @access  Private
const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(404);
        throw new Error('Book not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the book user
    if (book.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await book.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getBooks,
    addBook,
    updateBook,
    deleteBook,
};