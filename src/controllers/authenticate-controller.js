"use strict";

/**
 * GeoDo App Auth with JTW
 * @description Definition of basic routes for App
 * @author Emerson Mellado
 * @since 19/10/2017
 */

var jwt = require('jsonwebtoken'),
    config = require('config'),
    User = require('../models/user-model'),
    errors = require('../lib/errors-code').getErrorsCode();

var authenticate = function(req, res, next) {
    var auth = req.body;
    if (!auth) {
        res.status(401).send(errors.AUTHENTICATION_FAILED.errorCode + ': ' + errors.AUTHENTICATION_FAILED.message);
    }
    User.findOne({
        email: auth.email
    }).then(function(user) {
        if (!user || !auth.password) {
            res.status(401).send(errors.AUTHENTICATION_FAILED.errorCode + ': ' + errors.AUTHENTICATION_FAILED.message);
        }
        if (!user.validatePassword(auth.password)) {
            res.status(403).send(errors.AUTHENTICATION_FAILED.errorCode + ': ' + errors.AUTHENTICATION_FAILED.message);
        }


        try {
            var token = jwt.sign(user.safeCopy(),
                config.get('TOKEN.SECRET'), {
                    expiresIn: config.get('TOKEN.EXPIRES_IN')
                }
            );

            res({
                success: true,
                token: token,
                user: user.safeCopy()
            });

        } catch (err) {
            return res.status(500).send(err);
        }
    });
}

authenticate.verifyToken = function(req, res, next) {
    var token = req.body.token || req.headers['token'];
    if (token) {
        jwt.verify(token, config.get('TOKEN.SECRET'), function(err, decode) {
            if (err) {
                res.status(500).send(errors.INVALID_TOKEN.errorCode +': '+errors.INVALID_TOKEN.message);
            } else {
                next();
            }
        });
    } else {
        res.status(405).send(errors.MISSING_TOKEN.errorCode + ': ' + errors.MISSING_TOKEN.message);
    }
}

module.exports = authenticate;