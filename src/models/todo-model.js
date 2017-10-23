"use strict";

/**
 * @description Todo Model
 * @author Emerson Mellado
 * @since 19/10/2017
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./user-model');

var Todo = new Schema({
    title: String,
    description: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    done: {
        type: Boolean,
        default: false
    },
    location: {
        type: [Number], // [<longitude>, <latitude>]
        index: '2d' // create the geospatial index
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', Todo);