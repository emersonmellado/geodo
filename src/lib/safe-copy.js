"use strict";

/**
 * @description Tries to call safe copy from model, if not a function returns the entire object
 * @author Emerson Mellado
 * @since 22/10/2017
 */

var _ = require('underscore');

var safeCopy = function (req, res, next) {
    var bundle = res.locals.bundle || [];
    console.log("bundle", bundle);
    if (typeof bundle === "array" && bundle.length > 0) {
        res.locals.bundle = _.map(bundle, execSafearray);
    } else {
        res.locals.bundle = execSafearray(bundle);
    }
    next();
}

function execSafearray(obj){
    if (typeof obj.safeCopy === "function") {
        return obj.safeCopy();
    } else {
        return obj;
    }
}

module.exports = safeCopy;