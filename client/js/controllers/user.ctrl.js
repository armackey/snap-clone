angular.module('app')
  .controller('userCtrl', ['userService',
    function (userService) {
      // we injected userService and allowed to search for all users/one specific user with the query object
      //  set it equal to this.users so we have access to it in view
      this.users = userService.query();
      // this.user = userService.get({id: this.id});
  }]);