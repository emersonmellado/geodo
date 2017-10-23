"use strict";

/**
 * GeoDo App Auth with JTW
 * @description Definition of basic routes for App
 * @author Emerson Mellado
 * @since 19/10/2017
 */

var jwt = require('jsonwebtoken'),
    config = require('config');

var authenticate = function(req, res) {
    var user = {
        username: "test",
        email: "test@test.com"
    }
    var token = jwt.sign(user,
        config.get('TOKEN.SECRET'), {
            expiresIn: config.get('TOKEN.OPTIONS.EXPIRES_IN')
        }
    );
    res.json({
        success: true,
        token: token
    })
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