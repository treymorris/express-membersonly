var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, minlength: 5 },
        messages: { type: Schema.Types.ObjectId, ref: 'Message' },
        admin: { type: Boolean, default: false },
        membership: { type: Boolean, required: true}
    }
);

//Virtual for user's URL
UserSchema
    .virtual('url')
    .get(function () {
        return '/members/user' + this.id;
    });

//Export model
module.exports = mongoose.model('User', UserSchema);

