angular
  .module('user.service', [])
    .factory('userService', ['$resource',
      function ($resource) {
        return $resource('/users/:user_id', {id: '@id'}, {});
    }]);

