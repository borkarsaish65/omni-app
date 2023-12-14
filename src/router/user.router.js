const express = require('express');
const router = express.Router();

const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const authenticateToken = require('../middleware/auth.middleware')
const userController = require('../controller/user.controller');

const rateLimit = require('express-rate-limit');

const signupLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 1000, // limit to 1000 requests per minute
    message: 'Too many signup requests from this IP, please try again later',
});

// Login route rate limiter
const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 1000, // limit to 1000 requests per minute
    message: 'Too many login requests from this IP, please try again later',
});


//adding limiter to open routes to prevent abuse
router.post('/sign-up',signupLimiter,awaitHandlerFactory(userController.signUp))
router.post('/login',loginLimiter,awaitHandlerFactory(userController.login))
router.get('/get-all-user', authenticateToken, awaitHandlerFactory(userController.getAllUsers))

module.exports = router;