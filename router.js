const router = require('express').Router();
const { userController, postController } = require('./controllers');

router.post('/users/:uid', userController.addNewUser);
router.get('/users/:uid', userController.getUserData);

router.patch('/users/:uid', userController.editUserData);

router.get('/users/messages/:uid', userController.getUserMessageData);
router.patch('/users/notifcations/reset/:uid', userController.resetUserNotifications);
router.post('/users/messages/:uid/:uid2', userController.addUserMessage);

router.post('/posts', postController.addNewPost);
router.get('/posts', postController.getRecentPost);
router.patch('/posts/:postid', postController.likePost);
router.delete('/posts/:postid', postController.deletePost);
router.post('/posts/comments/:uid', postController.addComment);

module.exports = router;