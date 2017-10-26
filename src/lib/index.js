"use strict";

/**
 * Auto module export for lib objects
 * @description Recursevely iterate on folder and push all functions in the module.exports object.
 * @author Emerson Mellado
 * @since 25/10/2017
 */

var fs = require('fs');
var files = fs.readdirSync(__dirname);

module.exports = [];
files.forEach(function(file){
  if(file !== 'index.js')
    module.exports.push(require('./' + file));
});
