var blogApp = angular.module('blogApp', ['ngRoute', 'initialValue', 'blogAppControllers'])

.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $routeProvider.
        when('/posts', {
          templateUrl: 'partials/index',
          controller: 'postController'
        }).
        when('/posts/create', {
          templateUrl: 'partials/create_post.jade',
          controller: 'postController' }).
        when('/posts/manage', {
          templateUrl: 'partials/manage.jade',
          controller: 'postController' }).
        when('/posts/:postID', {
          templateUrl: 'partials/view_post.jade',
          controller: 'postController' }).
        when('/posts/:postID/edit', {
          templateUrl: 'partials/edit_post.jade',
          controller: 'postController' }).
        otherwise({ redirectTo: '/posts' });
    }
  ]
);
