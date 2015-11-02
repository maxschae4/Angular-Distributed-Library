var Book = mongoose.model('Book');

module.exports = (function() {
	return {
		index: function(request, response) {
			// console.log('server / ctrl / book - index');
			Book.find({}, function(err, books){
				if(err) {
					// console.log(err);
					response.json([{error: 'error'}]);
				}
				else {
					// console.log('sending books to client');
					response.json(books);
				}
			})
		},
		create: function (request, response){
			// console.log('server/ctrl/ books - create');
			var book = new Book;
			book.author = request.body.author;
			book.title = request.body.title;
			book.owner = request.body.owner;
			book.holder = request.body.holder;
			book.save(function(err){
				if (err) {
					response.json({status: false});
				} else {
					response.json({status: true});
				}
			})
		},
		update: function(request, response){
			Book.findOneAndUpdate({_id: request.params.id}, request.body, function(err, record) {
					if(err) {
						// console.log(err);
						response.json({status: false});
					} else {
						// console.log('updated book _id',request.params.id);
						response.json({status: true});
					}
			})
		},
		destroy: function(request, response){
			Book.remove({_id: request.params.id}, function(err) {
				if(err) {
					// console.log(err);
					response.json({status: false});
				} else {
					// console.log('removed book _id', request.params.id);
					response.json({status: true});
				}
			})
		}
	}
})();