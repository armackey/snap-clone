angular
  .module('userService', [])
    .factory('userService', 
      function ($http, $resource) {
      
      return $resource('/users/:user_id');

    });