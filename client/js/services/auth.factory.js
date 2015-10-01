angular
  .module('app')
    .factory('Auth', ['AuthToken', '$http', '$q', 'userService', '$state', function (AuthToken, $http, $q, userService, $state) {
      
      var self = this;
      self.currentUser = {};
      
      self.logout = function () {
        $http.get('/logout').success(function(){
          // will clear token
          AuthToken.setToken();
          // send to login page
          currentUser = {};
          $state.go('login');
        });
      };
      
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

      self.setCurrentUser = function () {
        // grabbing and setting current user
        // lol if you look close enough we're just calling the function we just defined L OH Flippin L!!
        self.getUser().then(function (user) {
          self.currentUser = user.data.username;
        });
      };

      return self;

}]);