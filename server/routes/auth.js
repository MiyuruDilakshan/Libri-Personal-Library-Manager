const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updateProfile, googleLogin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;