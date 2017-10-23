"use strict";

/**
 * GeoDo App Routes
 * @description Definition of basic routes for App
 * @author Emerson Mellado
 * @since 19/10/2017
 */

var auth = require('./controllers/authenticate-controller'),
    todo = require('./controllers/todo-controller'),
    users = require('./controllers/users-controller');

var routes = function(app) {

    var _registerRoutes = function(){
        app.todo = todo;
        app.users = users;
        app.get('/authenticate', auth);
        todo.register(app, '/todos');
        users.register(app, '/users');
    }

    return {
        register: _registerRoutes
    }
}

module.exports = routes;