angular
  .module('app')
    .controller('userCtrl', ['userService', '$scope', '$http', '$stateParams', '$resource', 
      function (userService, $scope, $http, $stateParams, $resource) {
        // we injected userService and allowed to search for all users/one specific user with the query object
        //  set it equal to this.users so we have access to it in view
        
        this.users = userService.query();
        $scope.user = userService.get({id: $stateParams.id});
        
        // have to use a callback to recieve the object else the promise object returns
        // $scope.user.$promise.then(function(data) {
        //   // this is the room number of selected user
        //   $scope.roomNumber = data.room; 
        // });
      
      
  }]);