 angular.module('app')
  .factory('userService', ['$resource', 
    function ($resource) { 
    // resource replaces all of our http requests. 
      return $resource('/users/:id', 
        {id: '@_id'}, 
        { get: {method:'GET'}, params: {id: 'me'}}); 
    }]);