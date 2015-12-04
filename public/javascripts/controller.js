var blogAppControllers = angular.module('blogAppControllers', []);

blogAppControllers.controller('postController', function($scope, $http) {

	$scope.formData = {};
	$scope.postData = {};

	// Get all posts
	$http.get('/api/posts')
	    .success(function(data) {
	        $scope.postsData = data;
	        console.log(data);
	    })
	    .error(function(error) {
	        console.log('Error: ' + error);
	    });

	// Create a new post
	$scope.createDraft = function(postID) {
	    $http.post('/api/posts', $scope.formData)
	        .success(function(data) {
	            $scope.formData = {};
	            $scope.postData = data;
	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + error);
	        });
	};

	// Delete a post
	$scope.deletePost = function(postID) {
	    $http.delete('/api/posts/' + postID)
	        .success(function(data) {
	            $scope.postData = data;
	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });
	};

});