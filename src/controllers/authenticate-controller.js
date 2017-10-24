"use strict";

/**
 * GeoDo App Auth with JTW
 * @description Definition of basic routes for App
 * @author Emerson Mellado
 * @since 19/10/2017
 */

var jwt = require('jsonwebtoken'),
    config = require('config'),
    User = require('../models/user-model');

var authenticate = function(req, res, next) {
    var auth = req.body;
    User.findOne({
        email: auth.email
    }).then(function(user) {
        if (!user) {
            res.status(401).send("Authentication failed");
        }
        if (!user.validatePassword(auth.password)) {
            res.status(403).send("Authentication failed");
        }

        var token = jwt.sign(user.safeCopy(),
            config.get('TOKEN.SECRET'), {
                expiresIn: config.get('TOKEN.EXPIRES_IN')
            }
        );

        res.json({
            success: true,
            token: token
        });
    });
}

authenticate.verifyToken = function(req, res, next) {
    var token = req.body.token || req.headers['token'];
    if (token) {
        jwt.verify(token, config.get('TOKEN.SECRET'), function(err, decode) {
            if (err) {
                res.status(500).send("Invalid Token");
            } else {
                next();
            }
        });
    } else {
        res.send("Missing authentication token");
    }
}

module.exports = authenticate;