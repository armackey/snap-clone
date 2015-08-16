angular
  .module('auth.factory', [])
    .factory('Auth', ['AuthToken', '$http', '$q', function (AuthToken, $http, $q) {
      
      var self = this;

      // check if a user is logged in
      self.isLoggedIn = function () {
        if (AuthToken.getToken())
          return true;
        else
          return false;
      };

      // current user information and route.
      self.getUser = function() { 
        if (AuthToken.getToken())
          return $http.get('/me'); 
        else
          return $q.reject({ message: 'User has no token.' }); 
      };

      return self;

}]);