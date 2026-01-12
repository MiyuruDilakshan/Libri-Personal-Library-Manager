const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const axios = require('axios');
const User = require('../models/User');

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password handled in Model Middleware

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
   
        if (req.body.email && req.body.email !== user.email) {
             const emailExists = await User.findOne({ email: req.body.email });
             if (emailExists && emailExists._id.toString() !== user._id.toString()) {
                 res.status(400);
                 throw new Error('Email already in use');
             }
             user.email = req.body.email;
        }

        if (req.body.newPassword) {
            if (req.body.currentPassword) {
                 if (await user.matchPassword(req.body.currentPassword)) {
                     user.password = req.body.newPassword;
                 } else {
                     res.status(401); 
                     throw new Error('Invalid current password');
                 }
            } else {
                 res.status(400);
                 throw new Error('Please provide current password to change password');
            }
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: generateToken(updatedUser._id)
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Google Login/Signup
// @route   POST /api/auth/google
// @access  Public
const googleLogin = asyncHandler(async (req, res) => {
    const { accessToken } = req.body;

    // Get user info from Google
    const googleResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    const { name, email, sub } = googleResponse.data;

    if (!email) {
        res.status(400);
        throw new Error('Google account does not have an email');
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
        // User exists - Log them in
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        // User does not exist - Register them
        // Create a random password since they are using Google
        const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        
        user = await User.create({
            name,
            email,
            password: randomPassword
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data received from Google');
        }
    }
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateProfile,
    googleLogin
};