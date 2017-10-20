"use strict";

/**
 * GeoDo App
 * @description Server for GeoDo app
 * @author Emerson Mellado
 * @since 18/10/2017
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    restful = require('node-restful'),
    mongoose = restful.mongoose,
    config = require('./config'),
    routes = require('./routes'),
    server = express();

server.use(bodyParser.urlencoded({'extended':'true'}));
server.use(bodyParser.json());
server.use(bodyParser.json({type:'application/vnd.api+json'}));
server.use(methodOverride());

mongoose.connect(config.database.uri, {
  useMongoClient: true
});

routes.init(server);

//console.log("routes", routes);

server.start = function(){
  return server.listen(config.server.port, config.server.host, function(){
      console.log('Server running on http://' + config.server.host + ':' + config.server.port)
  });
}

module.exports = server;