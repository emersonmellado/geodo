"use strict";

/**
 * @description Todo Model
 * @author Emerson Mellado
 * @since 19/10/2017
 */

var mongoose = require('mongoose');

module.exports.todo = mongoose.model('todo',
    mongoose.Schema({
        title: String,
        description: String,
        done: Boolean,
        location: {
            type: [Number], // [<longitude>, <latitude>]
            index: '2d' // create the geospatial index
        }
    })
);