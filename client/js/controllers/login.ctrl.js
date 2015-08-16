angular
  .module('app')
    .controller('loginCtrl', ['$http', 'AuthToken', '$state', '$rootScope', 'Auth',
      function ($http, AuthToken, $state, $rootScope, Auth) {

      this.user = {};
      var _this = this;
   
    // gets info if person is logged in
    // toggles true/false and we'll use this to get info on current user 
    _this.loggedIn = Auth.isLoggedIn();

    console.log(_this.loggedIn);
    // check to see if user is logged in on every request
    $rootScope.$on('$routeChangeStart', function () {
      _this.loggedIn = Auth.isLoggedIn();
      Auth.getUser().success(function (data) {
        _this.user = data;
      });
    });

    this.signIn = function(){
        var self = this;
        $http.post('/signup', self.user).success(function(data){
          // add token to our local storage
          AuthToken.setToken(data.token);
          $state.go('home');
          return data;
        });
      };

    this.logIn = function(){
      var self = this;
      $http.post('/login', self.user).success(function(data) {
        // add token to our local storage
        AuthToken.setToken(data.token);
        $state.go('home');
      });
    };

    this.logout = function() {
      $http.get('/logout').success(function(){
        // will clear token
        AuthToken.setToken();
        // send to login page
        $state.go('login');
      });
    };
}]);
