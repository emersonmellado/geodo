"use strict";

/**
 * @description Hash password
 * @author Emerson Mellado
 * @since 23/10/2017
 */

var _ = require('underscore'),
    bcrypt = require('bcryptjs');

var hash = function(req, res, next) {
    var user = req.body || {};
    console.log("req.body", req.body);
    req.body.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
    console.log("req.body", req.body);
    next();
}

module.exports = hash;