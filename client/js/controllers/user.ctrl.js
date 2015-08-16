angular.module('app')
  .controller('userCtrl', ['userService',
    function (userService) {
      var self = this;
      this.users = userService.query();
      // this.user = userService.get({id: this.id});
  }]);