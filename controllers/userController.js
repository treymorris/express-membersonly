var User = require('../models/user');
var Message = require('../models/message');
var async = require('async');
const { body, validationResult } = require('express-validator');

exports.index = function(req, res) {

    // async.parallel({
    //     user_count: function(callback) {
    //         User.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
    //     },
    //     message_count: function(callback) {
    //         Message.countDocuments({}, callback);
    //     }
       
        res.render('index', { title: 'Members Only',  });
    
};

// Display Product create form on GET.
exports.user_create_get = function(req, res, next) {

    
        res.render('sign-up-form', { title: 'Sign Up Form' });
    

};