angular
  .module('app')
    .controller('loginCtrl', ['$http', 'AuthToken', '$state', '$rootScope', 'Auth', '$scope',
      function ($http, AuthToken, $state, $rootScope, Auth, $scope) {

      this.user = {};
      var self = this;
    // gets info if person is logged in
    // toggles true/false and we'll use this to get info on current user 
    this.isLoggedIn = Auth.isLoggedIn();
    console.log(this.isLoggedIn);
    // check to see if user is logged in on every request
    $rootScope.$on('$routeChangeStart', function () {
    
      Auth.getUser().then(function (data) {
        console.log('get user');
        console.log(data);
        self.user = data;
      });
    });

    this.signUp = function() {
      $http.post('/signup', self.user).success(function(data){
        // add token to our local storage
        AuthToken.setToken(data.token);
        Auth.setCurrentUser();
        $state.go('home');
        return data;
      });
    };

    this.logIn = function() {
      $http.post('/login', self.user).success(function(data) {
        // add token to our local storage
        AuthToken.setToken(data.token);
        Auth.setCurrentUser();
        $state.go('home');
      });
    };


}]);
