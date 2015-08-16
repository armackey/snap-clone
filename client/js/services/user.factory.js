angular
  .module('user.service', [])
    .factory('userService', ['$resource',
      function ($resource) {
        // resource replaces all of our http requests.
        return $resource('/users/:user_id', {id: '@id'}, {});
    }]);

