"use strict";

/**
 * @description Users Controller
 * @author Emerson Mellado
 * @since 22/10/2017
 */

var restful = require('node-restful'),
    auth = require('./authenticate-controller'),
    user = require('../models/user-model'),
    safeCopy = require('../lib/safe-copy'),
    doHash = require('../lib/hash-password');

var User = restful.model('user', user.schema)
    .methods(['get', 'post', 'put', 'delete'])
    .before('get', auth.verifyToken)
    .before('post', auth.verifyToken)
    .before('delete', auth.verifyToken)
    .before('put', auth.verifyToken)
    .after('get', safeCopy)
    .before('post', doHash);


module.exports = User;