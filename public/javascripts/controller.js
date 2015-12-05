var blogAppControllers = angular.module('blogAppControllers', []);

blogAppControllers.controller('postController', ['$scope','$http',"$routeParams", function($scope, $http, $routeParams) {

	$scope.postID = $routeParams.postID;
	$scope.formData = {};
	$scope.postData = {};

	
	// Read posts
	if($routeParams.postID){
	    //Get one post
	    $http.get('/api/posts/' + $scope.postID)
	        .success(function(data) {
	            $scope.postsData = data;
	            console.log("$routeParams.postID: " + $routeParams.postID);
	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });
	} else {
		// Get all posts
		$http.get('/api/posts')
		    .success(function(data) {
		        $scope.postsData = data;
		        console.log(data);
		    })
		    .error(function(error) {
		        console.log('Error: ' + error);
		    }); 
	}

	// Create post
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
/*
	// Update post
	$scope.updatePost = function(postID) {
        $http.post('/api/posts/' + postID, $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.postData = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };
*/
	// Delete post
	$scope.deletePost = function(postID) {
	    $http.delete('/api/posts/' + postID)
	        .success(function(data) {
	            $scope.postData = data;
	            console.log(data);
	            console.log(postID);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });
	};

}]);