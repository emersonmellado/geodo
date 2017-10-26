"use strict";

/**
 * GeoDo App Database
 * @description Db Connection
 * @author Emerson Mellado
 * @since 19/10/2017
 */

var mongoose = require('mongoose')

var db = function(uri, opts) {

    var _connect = function(){
        mongoose.connect(uri, opts || {
            useMongoClient: true
        });
    }

    return {
        connect: _connect
    }
}

module.exports = db;