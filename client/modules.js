var app = angular.module('app', ['ngRoute']);

// routing
app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		controller: 'welcomeController',
		controllerAs: 'wc',
		templateUrl: '/partials/welcome.html'
	})
	.when('/books', {
		controller: 'booksController',
		controllerAs: 'bc',
		templateUrl: '/partials/books.html'
	})
	.otherwise('/')
})

// directives
app.directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          // watch the 'compile' expression for changes
          return scope.$eval(attrs.compile);
        },
        function(value) {
          // when the 'compile' expression changes
          // assign it into the current DOM
          element.html(value);

          // compile the new DOM and link it to the current
          // scope.
          // NOTE: we only compile .childNodes so that
          // we don't get into infinite loop compiling ourselves
          $compile(element.contents())(scope);
        }
    );
  };
}]);