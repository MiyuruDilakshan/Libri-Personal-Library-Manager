const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    googleBookId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    authors: [String],
    thumbnail: String,
    previewLink: String,
    status: {
        type: String,
        enum: ['Reading', 'Completed', 'Want to Read'],
        default: 'Want to Read'
    },
    userRating: {
        type: Number,
        default: 0
    },
    userReview: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Prevent duplicate books for the same user
bookSchema.index({ user: 1, googleBookId: 1 }, { unique: true });

module.exports = mongoose.model('Book', bookSchema);