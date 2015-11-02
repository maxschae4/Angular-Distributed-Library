mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://maxschae4:5fddq3at@ds049104.mongolab.com:49104/dist-lib');

var models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
  }
})