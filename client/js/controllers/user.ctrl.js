angular.module('app')
  .controller('userCtrl', ['$http', '$scope', '$stateParams', 'userService',
    function ($http, $scope, $stateParams, userService) {
      var self = this;
      this.users = userService.query();
      // this.user = userService.get({id: this.id});
  }]);