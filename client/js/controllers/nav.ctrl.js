angular.module('app')
  .controller('navCtrl', ['$scope', '$state', 'Auth', function ($scope, $state, Auth) {
    
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.currentUser = Auth.currentUser;
    // if (!$scope.currentUser)
    //     $scope.currentUser = 'guest';
      
    $scope.logout = function () {
      console.log('logout');
      Auth.logout();
    };

    // $scope.isActive = function(route) {
    //   return route === $state.path();
    // };
  }]);