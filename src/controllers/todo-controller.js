"use strict";

/**
 * @description Todo Controller
 * @author Emerson Mellado
 * @since 19/10/2017
 */

var restful = require('node-restful'),
    config = require('../config'),
    mongoose = restful.mongoose,
    auth = require('./authenticate-controller'),
    todo = require('../models/todo-model'),
    safeCopy = require('../lib/safe-copy.js');

var Todo = restful.model('todo', todo.schema)
    .methods(['post', 'put', 'delete'])
    .before('get', auth.verifyToken)
    .before('post', auth.verifyToken)
    .before('delete', auth.verifyToken)
    .before('put', auth.verifyToken)
    .route('near', near)
    .route('get', filterbyAuth)
    .after('get', safeCopy);

function filterbyAuth(req, res, next) {
    Todo.find({user:req.userId})
    .exec(function(err, todos) {
        if (err) {
            return res.json(500, err);
        }

        res.json(200, todos);
    });;
}

function near(req, res, next) {
	var limit = req.query.limit || 10;
    var maxDistance = req.query.distance || 8;
	
	// we need to convert the distance to radians
    // the raduis of Earth is approximately 6371 kilometers
    maxDistance /= 6371;
    var coords = [];
    coords[0] = req.query.longitude || 0;
    coords[1] = req.query.latitude || 0;

    Todo.find({
        location: {
            $near: coords,
            $maxDistance: maxDistance
        }
    }).limit(limit).exec(function(err, locations) {
        if (err) {
            return res.json(500, err);
        }

        res.json(200, locations);
    });
}

module.exports = Todo;