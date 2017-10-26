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
    config = require('config'),
    db = require('./db'),
    routes = require('./routes'),
    app = express();

app.start = function() {

    app.use(bodyParser.urlencoded({
        'extended': 'true'
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.json({
        type: 'application/vnd.api+json'
    }));
    app.use(methodOverride());

    db(config.get('DATABASE.URI')).connect();

    routes(app);

    app.listen(config.get('SERVER.PORT'), config.get('SERVER.HOST'), function() {
        console.log('app running on http://' + config.get('SERVER.HOST') + ':' + config.get('SERVER.PORT'))
    });
};

module.exports = app;