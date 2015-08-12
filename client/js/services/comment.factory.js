angular
  .module('comment.service', [])
    .factory('Comment', ['$resource', 
      function ($resource) {
        return $resource('/comments', {});
    }]);