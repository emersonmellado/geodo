"use strict";

/**
 * GeoDo App Routes
 * @description Definition of basic routes for App
 * @author Emerson Mellado
 * @since 19/10/2017
 */

var restful = require('node-restful'),
    config = require('./config'),
    mongoose = restful.mongoose,
    auth = require('./controllers/authenticate-controller'),
    todo = require('./controllers/todo-controller'),
    users = require('./controllers/users-controller');

mongoose.connect(config.database.uri, {
    useMongoClient: true
});

var routes = function(server) {
    server.todo = todo;
    server.users = users;
    server.get('/authenticate', auth);
    todo.register(server, '/todos');
    users.register(server, '/users');
}

module.exports = routes;