var Message = require('../models/message');
var User = require('../models/user');
const { body, validationResult } = require('express-validator');
var async = require('async');

exports.message_list = function (req, res, next) {
    
    Message.find({}, 'title message user date ')
      .sort({name : 1})
      .populate('user')
      .exec(function (err, list_messages) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('message-view', { title: 'Messages...', messages_list: list_messages, user: req.user, date: req.date, });
      });
    

};

exports.message_create_get = function (req, res, next) {

    res.render('message-form', { title: 'Create New Message' });
        };

exports.message_create_post = [
    
    body('title', 'Enter a title for your message!').trim().isLength({ min: 1 }).escape(),
    body('message', 'Enter a messsage!').trim().isLength({ min: 1 }).escape(),

    (req, res, next) => {
        
        const errors = validationResult(req);

        var message = new Message(
            {
                title: req.body.title,
                message: req.body.message,
                user: req.user._id
            }
        );

        if (!errors.isEmpty()) {
            res.render('message-view', {
                errors: errors.array()
            });
            return;
        }
        else {
            message.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/members/message-view');
            });
        };
    }
];

exports.error_list = function (err, req, res, next) {
    res.render('error', { error: err })
}

exports.message_delete_get = function (req, res, next) {
    console.log('help')
    async.parallel(
        {
          message: function (callback) {
            Message.findById(req.params.id)
              .populate('user')
              .exec(callback);
          },
        },
        function (err, results) {
          if (err) {
            return next(err);
          }
          if (results.message == null) {
            // No results.
            var err = new Error("Item not found");
            err.status = 404;
            return next(err);
          }
          res.render("message-delete", {
            title: "Delete Message - Members Only",
            message: results.message,
            
          });
        }
      );
}
        
    


exports.message_delete_post = function (req, res, next) {
    Message.findByIdAndRemove(req.params.id, function deleteMessage(err) {
        if (err) { return next(err); }
        res.redirect('/members/message-view');
    });
};

    
