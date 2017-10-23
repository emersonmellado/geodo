"use strict";

/**
 * GeoDo App
 * @description server for GeoDo app
 * @author Emerson Mellado
 * @since 18/10/2017
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    config = require('./config'),
    db = require('./db'),
    routes = require('./routes'),
    app = express();

process.env.SECRET_KEY = "mykey";

app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(methodOverride());

db(config.database.uri).connect();

routes(app).register();

app.start = function() {
    app.listen(config.server.port, config.server.host, function() {
        console.log('app running on http://' + config.server.host + ':' + config.server.port)
    });
};

module.exports = app;