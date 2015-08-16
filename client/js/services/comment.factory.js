angular
  .module('comment.service', [])
    .factory('Comment', ['$resource', 
      function ($resource) {
        // resource replaces our http object
        // getting all comments
        return $resource('/comments');
    }]);