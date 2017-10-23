"use strict";

/**
 * @description User Model
 * @author Emerson Mellado
 * @since 19/10/2017
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uniqueValidator = require('mongoose-unique-validator'),
    _ = require('underscore');

var User = new Schema({
    name: String,
    password: String,
    email: {
        type: String,
        required: '{PATH} is required!',
        unique: true
    },    
    active: {
        type: Boolean,
        default: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date    
}, {
    timestamps: true
});

User.plugin(uniqueValidator, {
    message: 'Expected {PATH}: {VALUE} to be unique.'
});

/**
 * Generating password hashed
 * @param pwd
 * @returns {*}
 */
User.methods.doHash = function(pwd) {
    return bcrypt.hashSync(pwd, bcrypt.genSaltSync(8), null);
};
User.methods.doHashAsync = function(value, cb) {
    bcrypt.genSalt(8, function(err, salt) {
        bcrypt.hash(value, salt, function(err, hash) {
            cb(err, hash);
        });
    });
};
User.methods.doHashReset = function(cb) {
    crypto.randomBytes(256, function(err, buf) {
        console.log(buf.toString('hex'));
        cb(err, buf.toString('hex'));
    });
};
/**
 * Validating password
 * @param pwd
 * @returns {*}
 */
User.methods.validatePassword = function(pwd) {
    return bcrypt.compareSync(pwd, this.password);
};

/**
 * Returns a "safe copy" of the user object. It will remove properties that
 * should not be exposed (like passwords).
 *
 * @returns {User}
 */
User.methods.safeCopy = function() {
    return _.omit(this.toObject(), ['password', '__v', 'resetPasswordToken', 'resetPasswordExpires']);
};

module.exports = mongoose.model('User', User);