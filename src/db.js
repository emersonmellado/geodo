"use strict";

/**
 * GeoDo App Database
 * @description Db Connection
 * @author Emerson Mellado
 * @since 19/10/2017
 */

var mongoose = require('mongoose')

var db = function(uri, opts) {

    var _connectToDb = function(){
        mongoose.connect(uri, opts || {
            useMongoClient: true
        });
    }

    return {
        connect: _connectToDb
    }
}

module.exports = db;