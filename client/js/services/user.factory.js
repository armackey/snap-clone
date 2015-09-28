 angular.module('user.service', [])
  .factory('userService', ['$resource', 
    function ($resource) { 
    // resource replaces all of our http requests. 
      return $resource('/users/:id', {id: '@id'}, 
        { 'get': {method:'GET'}}); 
    }]);