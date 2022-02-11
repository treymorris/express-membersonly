var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
    {
        title: { type: String, required: true },
        message: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User' }
    }
);

//Virtual for Messages URL
MessageSchema
    .virtual('url')
    .get(function () {
        return '/members/message/' + this.id;
    });

//Export model
module.exports = mongoose.model('Message', MessageSchema);