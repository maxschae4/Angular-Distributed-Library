mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://heroku_qh6w49dp:7k39n68jk216et5895nq41jka8@ds049084.mongolab.com:49084/heroku_qh6w49dp');

var models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
  }
})