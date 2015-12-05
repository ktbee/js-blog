var blogApp = angular.module('blogApp', ['ngRoute', 'blogAppControllers']).

config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $routeProvider
        .when('/posts', {
          templateUrl: 'partials/index',
          controller: 'postController'
        }).
        when('/posts/create', {
          templateUrl: 'partials/create.jade',
          controller: 'postController' }).
        when('/posts/manage', {
          templateUrl: 'partials/manage.jade',
          controller: 'postController' })
        .otherwise({ redirectTo: '/' });
    }
  ]
);