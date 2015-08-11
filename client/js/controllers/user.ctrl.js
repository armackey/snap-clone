angular.module('app')
  .controller('userCtrl', ['$http', '$scope', function ($http, $scope) {
    $http.get('/users').success(function (data) {
      console.log(data);
      $scope.users = data;
    });
  }]);