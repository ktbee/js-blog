var blogApp = angular.module('blogApp', ['ngRoute', 'blogAppControllers']).

config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $routeProvider
        .when('/', {
          templateUrl: 'partials/index',
          controller: 'postController'
        }).
        when('/post/create', {
          templateUrl: 'partials/create.jade',
          controller: 'postController' })
        .otherwise({ redirectTo: '/' });
    }
  ]
);