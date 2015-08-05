angular.module('app').controller('loginCtrl',loginCtrl);
loginCtrl.$inject = ['$http'];

function loginCtrl($http){

    this.user = {};

    this.signIn = function(){
        var that = this;

        console.log(that.user);
        $http.post('/signin', that.user).success(function(data){
          console.log('thank you for signing up');
        });
      }
    this.logIn = function(){
      var that = this;
      $http.post('/login',that.user).success(function(data,status){
        document.cookie = "access_token=" + data.access_token;
      });
    }
}
