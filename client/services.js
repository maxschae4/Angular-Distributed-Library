angular.module('myApp').factory('AuthService', 
	['$q', '$timeout', '$http',
		function ($q, $timeout, $http) {

			// initialize user variable
			var user = null;

			// return available functions to controller
			return ({
				isLoggedIn: isLoggedIn,
				getUserStatus: getUserStatus,
				login: login,
				logout: logout,
				register: register
			});

			function isLoggedIn() {
				if(user) {
					return true;
				} else {
					return false;
				}
			}

			function getUserStatus() {
				return user;
			}

			function login(username, password) {
				// initialize deferred
				var deferred = $q.defer();

				// post login
				$http.post('/user/login', {username: username, password: password})
					// if success
					.success(function (data, status) {
						if(status === 200 && data.status) {
							user = username;
							deferred.resolve();
						} else {
							user = false;
							deferred.reject();
						}
					})

					// if error
					.error(function (data) {
						user = false;
						deferred.reject();
					});

				// return promise
				return deferred.promise;
			}

			function logout() {
				// initialize deferred
				var deferred = $q.defer();

				// get logout
				$http.get('/user/logout')
					// if success
					.success(function (data) {
						user = false;
						deferred.resolve();
					})
					// if error (still set user to false)
					.error(function (data) {
						user = false;
						deferred.reject();
					});

				// return promise
				return deferred.promise;
			}

			function register(username, password) {
				// initialize deferred
				var deferred = $q.defer();

				// post new user details
				$http.post('/user/register', {username: username, password: password})
					// if success
					.success(function (data, status) {
						if(status===200 && data.status) {
							deferred.resolve();
						} else {
							deferred.reject();
						}
					})
					// if error
					.error(function (data) {
						deferred.reject();
					});

				// return promise
				return deferred.promise;
			}

		}
	]
);