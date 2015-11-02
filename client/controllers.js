// Welcome Controller
app.controller('welcomeController', function ($scope, $rootScope, $location) {
	// console.log('welcome');
	this.form = {
		username: ''
	}
	this.setUsername = function(form) {
		// console.log(form.username);
		$rootScope.username = form.username;
		$location.path('/books');
	}
})

// Books Controller
app.controller('booksController', function ($location, $rootScope, $sce, BookFactory) {
			// console.log('bookscontroller');
			var that = this;
			if(!$rootScope.username) {
				$location.path('/');
			}
			this.username = $rootScope.username;

			var getBooks = function() {
				BookFactory.getBooks(that.username, function(books) {
					// console.log('got books from factory', books);
					that.books = books;
				})
			}
			getBooks();
			
			this.bookForm = {
				title: '',
				author: ''
			}

			this.addBook = function(book) {
				// console.log('adding book');
				book.owner = that.username;
				book.holder = that.username;
				BookFactory.addBook(book, function() {
					// console.log('added book');
					getBooks();
				})
			}

			this.checkout = function(book) {
				// console.log('checkout', book);
				BookFactory.checkout(book, that.username, function() {
					// console.log('book checked out');
				})
				getBooks();
			}

			this.bookReturn = function(book) {
				// console.log('return', book);
				BookFactory.bookReturn(book, function() {
					// console.log('returned book');
				})
				getBooks();
			}

			this.destroy = function(book) {
				// console.log('removing book', book);
				BookFactory.destroy(book, function() {
					// console.log('removed book');
				})
				getBooks();
			}
		}
);