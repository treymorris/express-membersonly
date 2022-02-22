var User = require('../models/user');
var Message = require('../models/message');
var async = require('async');
const { body, validationResult } = require('express-validator');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

exports.index = function (req, res) {
        async.parallel({
                user_count: function (callback) {
                        User.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
                },
                message_count: function (callback) {
                        Message.countDocuments({}, callback);
                }
        }, function (err, results) {
                res.render('index', { title: 'Members Only', error: err, data: results });
        });
};
// Display User sign-up form on GET.
exports.user_create_get = function(req, res, next) {
        res.render('sign-up-form', { title: 'Sign Up Form', user: req.user });
};

// Handle User sign-up form on POST
exports.user_create_post = [
        //Validate and sanitize fields
        body('firstname', 'Please enter your first name!').trim().isLength({ min: 1 }).escape(),
        body('lastname', 'Please enter your last name!').trim().isLength({ min: 1 }).escape(),
        body('username', 'Please enter a username!').trim().isLength({ min: 3 }).escape(),
        body('password', 'Password must be at least 5 characters.').trim().isLength({ min: 5 }).escape(),
        //Process request after val & san
        (req, res, next) => {
                //Extract errors from request
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        res.render('sign-up-form', {
                                errors: errors.array()
                        });
                } else {
                        bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
                                if (err) {
                                        res.redirect("/");
                                } else {
                                        //Create new object with escaped and trimmed data
                                        var user = new User(
                                                {
                                                        firstname: req.body.firstname,
                                                        lastname: req.body.lastname,
                                                        username: req.body.username,
                                                        password: hashedPass,
                                                        membership: false
                                                }).save((err) => {
                                                        if (err) {
                                                                return next(err)
                                                        };
                                                        passport.authenticate('local')(req, res, () => {
                                                                return res.redirect("/");
                                                        });
                                                });
                                };
                        });
                }
        }
]

// Display Log-In page GET
exports.user_login_get = function (req, res, next) {
        res.render('login-form', { title: 'Log In', user: req.user });
};

// Handle Log In on POST
exports.user_login_post = [
        // Validate and sanitize
        body('username', 'Enter a username!').trim().isLength({ min: 1 }).escape(),
        body('password', 'Enter a password!').trim().isLength({ min: 5 }).escape(),
        (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        res.render('login-form', { errors: errors.array() });
                        return;
                } else
                next();
        },
        passport.authenticate("local", {
                //successRedirect: "/members/members-pass",
                successRedirect: "/members/message-view",
                failureRedirect: "/members/login", 
                failureFlash: true
        }),
];

// Display Members Sign In GET
exports.user_member_get = function (req, res, next) {
        res.render('members-pass', { title: 'Member Pass Code' });
};

// Handle Member sign in POST
exports.user_member_post = [
        body('secretcode', 'Enter the code!')
                .trim()
                .isLength({ min: 1 })
                .custom((value) => {
                        if (value === '12345') {
                                return true;
                        } else {
                                return false;
                        }
                })
                .escape(),
        
        (req, res, next) => {
                const errors = validationResult(req);


                if (!errors.isEmpty()) {
                        res.render('members-pass', { errors: errors.array({ onlyFirstError: true }) });
                        return;
                } else
                        //next();
                        User.findByIdAndUpdate(req.user._id, {$set:{"membership": true}}, {}, function (err) {
                                if (err) { return next(err); }
                                res.redirect('/members/message-view')
                        });
                
        },
];  

// Display Admin Log-In page
exports.user_admin_login_get = function (req, res, next) {
        res.render('admin-login-form', { title: 'Admin Log In', user: req.user });
};

//Handle Admin Log In Request
exports.user_admin_post = [
        body('username', 'Enter a valid username!').trim().isLength({ min: 5 }).escape(),
        body('password', 'Enter the correct password!')
        .trim()
        .isLength({ min: 1 })
        .custom((value) => {
                if (value === '12345') {
                        return true;
                } else {
                        return false;
                }
        })
        .escape(),

        (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
                res.render('admin-login-form', { errors: errors.array({ onlyFirstError: true }) });
                return;
        } else
                //next();
                User.findByIdAndUpdate(req.user._id, {$set:{"admin": true}}, {}, function (err) {
                        if (err) { return next(err); }
                        res.redirect('/members/message-view')
                });
        },
]

// Log Out Request
exports.logout = (req, res) => {
        req.logout();
        res.redirect('/');
      };