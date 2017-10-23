"use strict";

/**
 * @description Users Controller
 * @author Emerson Mellado
 * @since 19/10/2017
 */

var restful = require('node-restful'),
    config = require('../config'),
    mongoose = restful.mongoose,
    auth = require('./authenticate-controller');

var schema = {
        username: String,
        password: String,
        active: Boolean
    };

var user = restful.model('user', mongoose.Schema(schema))
    .methods(['get', 'post', 'put', 'delete'])
    .before('get', auth.verifyToken)
    .before('post', auth.verifyToken)
    .before('delete', auth.verifyToken)
    .before('put', auth.verifyToken);

module.exports = user;