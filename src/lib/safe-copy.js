"use strict";

/**
 * @description Tries to call safe copy from model, if not a function returns the entire object
 * @author Emerson Mellado
 * @since 22/10/2017
 */

var _ = require('underscore');

var safeCopy = function(req, res, next) {
    var users = res.locals.bundle || [];
    res.locals.bundle = _.map(users, function(u) {
        if (typeof u.safeCopy === "function") {
            return u.safeCopy();
        } else {
            return u;
        }
    })
    next();
}

module.exports = safeCopy;