"use strict";

/**
 * GeoDo App Routes
 * @description Definition of basic routes for App
 * @author Emerson Mellado
 * @since 19/10/2017
 */

var restful = require('node-restful'),
    mongoose = restful.mongoose;

var routes = restful.model('todo', mongoose.Schema({
    title: String,
    description: String,
    done: Boolean,
    location: {
      type: [Number],  // [<longitude>, <latitude>]
      index: '2d'      // create the geospatial index
    }
  }))
  .methods(['get', 'post', 'put', 'delete']);

routes.init = function(server){
  server.todo = routes;
  routes.register(server, '/todos');
}

// var maxDistance = req.query.distance || 8; 
// var coords = [];  
// coords[0] = req.query.longitude || 0;  
// coords[1] = req.query.latitude || 0;  

// Todo.find({  
//     location: {
//         $near: coords,
//         $maxDistance: maxDistance
//     }
// }).limit(limit).exec(function(err, locations) {
//     if (err) {
//         return res.json(500, err);
//     }

//     res.json(200, locations);
// });


module.exports = routes;