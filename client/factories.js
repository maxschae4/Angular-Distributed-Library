app.factory('BookFactory', function ($http, $location, $sce) {
	return {
		addBook: function(book, callback) {
			// console.log('sending book to server', book);
			$http.post('/books', book).success(function(response) {
				callback(response);
			})
		},
		getBooks: function(username, callback) {
			// console.log('getting books from server', username);
			$http.get('/books').success(function(response) {
				for(index in response) {
					if ( (response[index].holder === response[index].owner) && (response[index].owner === username) ){
						response[index].status = 'In';
						response[index].owner = '<button ng-click="bc.destroy(book)" class="btn btn-xs btn-danger">Remove Book</button>';
					} else if (response[index].holder === response[index].owner) {
						response[index].status = '<button ng-click="bc.checkout(book)" class="btn btn-xs btn-primary">Checkout</button>';
					} else if ( (response[index].holder === username) && !(response[index].owner === username) ) {
						response[index].status = '<button ng-click="bc.bookReturn(book)" class="btn btn-xs btn-default">Return</button>'
					}
					else {
						response[index].status = 'Out';
					}
				}
				callback(response);
			})
		},
		setBook: function(book, callback) {
			this.book = book;
			callback();
		},
		getBook: function() {
			if(!this.recipe) {
				$location.path('/MyBooks');
			}
			return this.book;
		},
		update: function(book) {
			$http.put('/books/checkout'+book.bookID, book).success(function(response) {
				$location.path('/books');
			})
		},
		checkout: function(book, username, callback) {
			book.holder = username;
			book.updatedAt = Date.now();
			$http.put('/books/update/'+book._id, book).success(function(response) {
				callback();
			})
		},
		bookReturn: function(book, callback) {
			book.holder = book.owner;
			book.updatedAt = Date.now();
			$http.put('/books/update/'+book._id, book).success(function(response) {
				callback();
			})
		},
		destroy: function(book, callback) {
			$http.delete('/books/'+book._id).success(function(response) {
				callback();
			})
		}
	}
})