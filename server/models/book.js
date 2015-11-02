var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://maxschae4:5fddq3at@ds049104.mongolab.com:49104/dist-lib");

autoIncrement.initialize(connection);

var BookSchema = new mongoose.Schema({
	bookID: { type: Number },
	owner: { type: String, trim: true },
	author: { type: String, trim: true },
	title: { type: String, trim: true },
	holder: { type: String, trim: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

BookSchema.plugin(autoIncrement.plugin, { model: 'Book', field: 'bookID'});

mongoose.model('Book', BookSchema);