// REQUIREMENTS AND SETUP:
var express = require('express');										// require express
var app = express();													// set express to app
var path = require('path');												// require path
var bodyParser = require('body-parser');								// require body parser
app.use(bodyParser.json());


app.use(express.static(__dirname + '/client'));							// establish folder for static content
require('./server/config/mongoose.js');									// require our mongoose connection file (this file also links all our models!)
require('./server/config/routes.js')(app);								// require our routes file in ./server/config/routes and passes app (express())


app.listen(80, function() {
	console.log('listening on 30000!');
});
