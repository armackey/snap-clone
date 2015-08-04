angular.module('app').controller('homeController', ['$http','$scope', function ($http, $scope){
  $scope.newMessage = {};
  $scope.newMessage.username = "";
  $scope.newMessage.message = "";
  $scope.newMessage.date= Date.now();

  
  $http.get('/comments').success(function (data) {
     console.log(data);
     $scope.data = data;

  });
  //form information gets sent to server and post the new message to page
  $http.post('/comments', $scope.newMessage).success(function (data) {
    
  });
}]);
