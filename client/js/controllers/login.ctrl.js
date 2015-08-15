angular.module('app').controller('loginCtrl', loginCtrl);
loginCtrl.$inject = ['$http', 'AuthToken', '$state'];

function loginCtrl($http, AuthToken, $state){

    this.user = {};

    this.signIn = function(){
        var self = this;

        console.log(self.user);
        $http.post('/signup', self.user).success(function(data){
          console.log(data);
          AuthToken.setToken(data.token);
          $state.go('home');
          return data;
        });
      };
    this.logIn = function(){
      var self = this;
      $http.post('/login',self.user).success(function(data, status){
        console.log(data);
        AuthToken.setToken(data.token);
        $state.go('home');
      });
    };
}
