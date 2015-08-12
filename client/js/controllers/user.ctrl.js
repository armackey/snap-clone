angular.module('app')
  .controller('userCtrl', ['$http', '$scope', 'userService', '$stateParams', 
    function ($http, $scope, userService, $stateParams) {

  var self = this;

  this.users = userService.query();
  

  }]);