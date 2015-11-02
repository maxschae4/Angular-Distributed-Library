var myApp = angular.module('myApp', ['ngRoute']);

myApp.run(function ($rootScope, $location, $route, AuthService, BookFactory) {
	$rootScope.$on('$routeChangeStart', function (event, next, current) {
		if (next.access.restricted && AuthService.isLoggedIn() === false) {
			$location.path('/');
			$route.reload();
		}
	});
});

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
    	templateUrl: '/partials/welcome.html',
    	controller: 'welcomeController',
    	access: {restricted: false}
    })
    .when('/login', {
    	templateUrl: '/partials/login.html', 
    	controller: 'loginController',
    	access: {restricted: false}
	})
    .when('/logout', {
    	controller: 'logoutController',
    	access: {restricted: false}
    })
    .when('/register', {
    	templateUrl: '/partials/register.html', 
    	controller: 'registrationController',
    	access: {restricted: false}
    })
    .when('/home', {
    	templateUrl: '/partials/home.html', 
    	controller: 'homeController', 
    	access: {restricted: true}
    })
    .when('/MyBooks', {
    	templateUrl: '/partials/myBooks.html',
    	controller: 'booksController',
    	access: {restricted: true}
    })
    .otherwise({redirectTo: '/'});
});

