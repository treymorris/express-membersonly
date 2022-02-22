var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controllers/userController');
var message_controller = require('../controllers/messageController');

/// User ROUTES ///
// GET home page.
router.get('/', user_controller.index);

// GET request for signing up user. NOTE This must come before routes that display product (uses id).
router.get('/sign-up', user_controller.user_create_get);

// POST request for creating user.
router.post('/sign-up', user_controller.user_create_post);

// GET request for log in.
router.get('/login', user_controller.user_login_get);

// POST request to login user.
router.post('/login', user_controller.user_login_post);

// Get request for Log Out
router.get('/logout', user_controller.logout);

// GET request for admin log in.
router.get('/admin-login', user_controller.user_admin_login_get);

//POST Request for Admin Login.
router.post('/admin-login', user_controller.user_admin_post);

// GET request for member sign in.
router.get('/members-pass', user_controller.user_member_get);

// POST request for member sign in
router.post('/members-pass', user_controller.user_member_post)

// // GET request for list of all users.
// router.get('/user', user_controller.user_list_get);


// Message ROUTES 
// GET request for creating a Message. NOTE This must come before route that displays message (uses id).
router.get('/message-form', message_controller.message_create_get);

// POST request for creating message.
router.post('/message-form', message_controller.message_create_post);

// // GET request to delete message.
router.get('/message-delete/:id', message_controller.message_delete_get);

// // POST request to delete message.
router.post('/message-delete/:id', message_controller.message_delete_post);

// // GET request to update one message.
// router.get('/message-update/:id', message_controller.message_update_get);

// GET request for list of all messages.
router.get('/message-view', message_controller.message_list);

router.get('members/error', message_controller.error_list);

module.exports = router;