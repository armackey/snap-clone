angular
  .module('app')
    .controller('loginCtrl', ['$http', 'AuthToken', '$state', '$rootScope',
      function ($http, AuthToken, $state, $rootScope) {

      this.user = {};

    
      
    // gets info if person is logged in
    
    // self.loggedIn = Auth.isLoggedIn();

    
    // // check to see if user is logged in on every request
    // $rootScope.$on('$routeChangeStart', function () {
    //   self.loggedIn = Auth.isLoggedIn();
    //   Auth.getUser().success(function (data) {
    //     self.user = data;
    //   });
    // });
    this.signIn = function(){
        var self = this;

        console.log(self.user);
        $http.post('/signup', self.user).success(function(data){
          console.log(data.token);
          // add token to our local storage
          AuthToken.setToken(data.token);
          $state.go('home');
          return data;
        });
      };
    this.logIn = function(){
      var self = this;
      $http.post('/login', self.user).success(function(data, status){
        console.log(data.token);
        // add token to our local storage
        AuthToken.setToken(data.token);
        $state.go('home');
      });
    };

    this.logout = function() {
      var self =  this;
      $http.get('/logout').success(function(){
        // will clear token
        AuthToken.setToken();
        $state.go('login');
      });
    };
}]);
