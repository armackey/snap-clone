angular.module('app')
  .controller('userCtrl', ['$http', function ($http) {
    $http.get('/users').success(function (data) {
      this.users = data;
    });
  }]);