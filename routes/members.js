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

// // POST request for creating user.
router.post('/sign-up', user_controller.user_create_post);

// // GET request for log in.
router.get('/login', user_controller.user_login_get);

// // POST request to delete user.
router.post('/login', user_controller.user_login_post);

// Get request for Log Out
router.get('/logout', user_controller.logout);

// GET request for admin log in.
 router.get('/admin-login', user_controller.user_admin_login_get);

// // POST request to update user.
// router.post('/products/:id/update', product_controller.product_update_post);

// // GET request for one user.
router.get('/members-pass', user_controller.user_member_get);

// // GET request for list of all users.
// router.get('/products', product_controller.product_list);


// Message ROUTES 

// GET request for creating a Message. NOTE This must come before route that displays message (uses id).
// router.get('/categories/create', category_controller.category_create_get);

// //POST request for creating message.
// router.post('/categories/create', category_controller.category_create_post);

// // GET request to delete message.
// router.get('/categories/:id/delete', category_controller.category_delete_get);

// // POST request to delete message.
// router.post('/categories/:id/delete', category_controller.category_delete_post);

// // GET request for one message.
// router.get('/categories/:id', category_controller.category_detail);

// // GET request for list of all messages.
// router.get('/categories', category_controller.category_list);



module.exports = router;