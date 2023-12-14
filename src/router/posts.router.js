const express = require('express');
const router = express.Router();

const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const authenticateToken = require('../middleware/auth.middleware')
const postController = require('../controller/post.controller');

router.get('/get-feed', authenticateToken,awaitHandlerFactory(postController.getUserFeed))
router.post('/post-message',authenticateToken, awaitHandlerFactory(postController.createNewPost))
router.post('/follow-user',authenticateToken, awaitHandlerFactory(postController.followUser))
router.post('/unfollow-user',authenticateToken, awaitHandlerFactory(postController.unFollowUser))

module.exports = router;