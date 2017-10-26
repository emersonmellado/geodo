"use strict";

/**
 * GeoDo App Routes
 * @description Definition of basic routes for App
 * @author Emerson Mellado
 * @since 19/10/2017
 */

var authenticate = require('./controllers/authenticate-controller'),
    todo = require('./controllers/todo-controller'),
    users = require('./controllers/users-controller');

var routes = function(app) {

    return (function(){
        app.todo = todo;
        app.users = users;
        app.post('/authenticate', authenticate);
        todo.register(app, '/todos');
        users.register(app, '/users');
    })();
}

module.exports = routes;