var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { DateTime } = require('luxon');

var MessageSchema = new Schema(
    {
        title: { type: String, required: true },
        message: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now}
    }
);

// Virtual for date formatting
MessageSchema
    .virtual('date-formatted')
    .get(function() {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED);
    });

    //Virtual for user's URL
MessageSchema
    .virtual('url')
    .get(function () {
    return '/members/message-delete/' + this._id;
});

//Export model
module.exports = mongoose.model('Message', MessageSchema);