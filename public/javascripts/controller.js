var blogAppControllers = angular.module('blogAppControllers', []);

blogAppControllers.controller('postController', ['$scope','$http',"$routeParams", function($scope, $http, $routeParams) {

	$scope.postID = $routeParams.postID;
	$scope.formData = {};

	
	// Read posts
	if($routeParams.postID){
	    //Get one post
	    $http.get('/api/posts/' + $scope.postID)
	        .success(function(data) {
	            $scope.postsData = data;
	            //console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });
	} else {
		// Get all posts
		$http.get('/api/posts')
		    .success(function(data) {
		        $scope.postsData = data;
		        //console.log(data);
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
	            $scope.postsData = data;
	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + error);
	        });
	};

	// Update post
	$scope.updatePost = function(post) {
        console.log(post);
        $scope.formData = angular.copy(post);
        
        $http.put('/api/posts/' + $scope.postID, $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.postsData = data;
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };

	// Delete post
	$scope.deletePost = function(postID) {
	    $http.delete('/api/posts/' + postID)
	        .success(function(data) {
	            $scope.postsData = data;
	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });
	};

}]);
