angular.module('blogPost', [])

.controller('postController', function($scope, $http) {

    $scope.formData = {};
    $scope.postData = {};

    // Get all posts
    $http.get('/posts')
        .success(function(data) {
            $scope.postsData = data;
            //console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });

    // Create a new post
    $scope.createDraft = function(postID) {
        $http.post('/posts', $scope.formData)
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
        $http.delete('/posts/' + postID)
            .success(function(data) {
                $scope.postData = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});