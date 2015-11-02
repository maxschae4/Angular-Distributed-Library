module.exports = function(app) {
  	var books = require('../controllers/books.js');
	app

	// - - - books - - - 
	.get('/books', function (request, response) {
		books.index(request, response);
	})
	.post('/books', function (request, response) {
		// console.log('/books .post');
		books.create(request, response);
	})
	.put('/books/update/:id', function (request, response) {
		// console.log(request.params.id);
		books.update(request, response);
	})
	.delete('/books/:id', function (request, response) {
		// console.log(request.params.id);
		books.destroy(request, response);
	})
};