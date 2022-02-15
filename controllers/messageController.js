var Message = require('../models/message');
var User = require('../models/user');
const { body, validationResult } = require('express-validator');
var async = require('async');

exports.message_list_get = function (req, res, next) {

            console.log('anything?')
    res.render('message-view', { title: 'Messages...' });
        };

exports.message_list_post = function (req, res, next) {
    res.redirect('/members/message-view');
}