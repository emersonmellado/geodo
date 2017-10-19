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
    server = express();

server.use(bodyParser.urlencoded({'extended':'true'}));
server.use(bodyParser.json());
server.use(bodyParser.json({type:'application/vnd.api+json'}));
server.use(methodOverride());

mongoose.connect(config.database.uri, {
  useMongoClient: true
});

var Todo = server.todo = restful.model('todo', mongoose.Schema({
    title: String,
    description: String,
    done: Boolean,
    location: {
      type: [Number],  // [<longitude>, <latitude>]
      index: '2d'      // create the geospatial index
    }
  }))
  .methods(['get', 'post', 'put', 'delete']);

Todo.register(server, '/todos');

var maxDistance = req.query.distance || 8; 
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


server.start = function(){
  return server.listen(config.server.port, config.server.host, function(){
      console.log('Server running on http://' + config.server.host + ':' + config.server.port)
  });
}

module.exports = server;