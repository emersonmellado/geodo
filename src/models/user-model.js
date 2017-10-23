"use strict";

/**
 * @description User Model
 * @author Emerson Mellado
 * @since 19/10/2017
 */

var mongoose = require('mongoose');

module.exports.user = mongoose.model('user',
    mongoose.Schema({
        username: String,
        password: String,
        active: Boolean
    })
);