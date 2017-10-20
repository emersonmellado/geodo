"use strict";

/**
 * GeoDo App Auth with JTW
 * @description Definition of basic routes for App
 * @author Emerson Mellado
 * @since 19/10/2017
 */

var jwt = require('jsonwebtoken');

var authenticate = function(req, res){
  var user = {
    username: "test",
    email: "test@test.com"
  }
  var token = jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: '1d'
  });
  res.json({
    success: true,
    token: token
  })
}

authenticate.verifyToken = function (req, res, next) {
  var token = req.body.token || req.headers['token'];
  if (token){
    jwt.verify(token, process.env.SECRET_KEY, function(err, decode){
      //console.log("decode", decode);
      if (err){
        res.status(500).send("Invalid Token");      
      } else {
        next();
      }
    });     
  }else{
    res.send("Missing authentication token");
  }
}

module.exports = authenticate;