var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new Schema({
    firstName: { type: String},
    lastName: {type: String},
    email: {type: String, required: true, unique: true, uniqueCaseInsensitive: true},
    password: {type: String, required: true}
    
});
//Use the unique validator plug in for for making sure that email is unique
UserSchema.plugin(uniqueValidator);
var User = mongoose.model('User', UserSchema);

module.exports = User;