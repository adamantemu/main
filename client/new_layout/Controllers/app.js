var app = angular.module('emuAttack', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl : '/views/login.html',
			controller : 'loginCtrl'
		})
		.when('/register', {
			templateUrl : '/views/register.html',
			controller : 'registerCtrl'
		})
		.when('/post', {
			resolve : {
				"check" : function($location, $rootScope){
					if (!$rootScope.userId){
						$location.path("/");
					}
				}
			},
			templateUrl:'/views/post.html',
			controller : 'postCtrl'
		})
		.when('/search', {
			templateUrl : '/views/search.html',
			controller : 'searchCtrl'
		})
		.when('/dashboard', {
			resolve : {
				"check" : function($location, $rootScope){
					if (!$rootScope.userId){
						console.log("no iD");
						$location.path("/");
					}
				}
			},
			templateUrl:'/views/dashboard.html',
			controller : 'dashboardCtrl'
		})
		.otherwise({
			redirectTo : '/'
		})
});
